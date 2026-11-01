import { c as getRequest, l as setCookie$1, o as deleteCookie$1, s as getCookie } from "./ssr.mjs";
import { a as istNow, c as pct, d as shiftIso, i as dmy, l as round2, n as dailyPassword, o as monthName, r as daysInMonth, s as monthStart, t as compareCodes } from "./format--G7lwSau.mjs";
import { createHash, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
//#region node_modules/.nitro/vite/services/ssr/assets/logic.server-CvCihTqS.js
var _0002_safai_default = "create table if not exists wards (\n  ward_no integer primary key,\n  councillor_name text not null default '',\n  councillor_photo text,\n  updated_at timestamptz not null default now()\n);\n\ncreate table if not exists zones (\n  id serial primary key,\n  name text not null,\n  supervisor_name text not null default '',\n  supervisor_mobile text not null default '',\n  active boolean not null default true,\n  created_at timestamptz not null default now()\n);\n\ncreate table if not exists zone_wards (\n  zone_id integer not null references zones (id) on delete cascade,\n  ward_no integer not null,\n  primary key (zone_id, ward_no)\n);\n\ncreate table if not exists inspectors (\n  id serial primary key,\n  code text not null unique,\n  name text not null,\n  mobile text not null default '',\n  ward_no integer,\n  zone_id integer references zones (id) on delete cascade,\n  created_at timestamptz not null default now()\n);\n\ncreate table if not exists daily_numbers (\n  id serial primary key,\n  zone_id integer not null references zones (id) on delete cascade,\n  work_date date not null,\n  number integer not null,\n  unique (zone_id, work_date, number)\n);\n\ncreate table if not exists entries (\n  id serial primary key,\n  inspector_id integer not null references inspectors (id) on delete cascade,\n  zone_id integer not null,\n  ward_no integer,\n  work_date date not null,\n  number integer not null,\n  jhadu boolean not null default false,\n  nali boolean not null default false,\n  kooda boolean not null default false,\n  score integer not null,\n  status text not null default 'editable',\n  submitted_at timestamptz not null default now(),\n  final_at timestamptz,\n  unique (inspector_id, work_date, number)\n);\n\ncreate index if not exists entries_date_idx on entries (work_date desc);\ncreate index if not exists entries_zone_idx on entries (zone_id, work_date);\n\ncreate table if not exists report_counters (\n  zone_id integer primary key references zones (id) on delete cascade,\n  total_all_time integer not null default 0\n);\n\ncreate table if not exists staff (\n  id serial primary key,\n  name text not null,\n  mobile text not null default '',\n  role text not null default '',\n  zone_id integer references zones (id) on delete set null,\n  created_at timestamptz not null default now()\n);\n\ncreate table if not exists staff_attendance (\n  staff_id integer not null references staff (id) on delete cascade,\n  work_date date not null,\n  present boolean not null,\n  primary key (staff_id, work_date)\n);\n\ncreate table if not exists admin_account (\n  id integer primary key,\n  username text not null,\n  password_hash text not null\n);\n\ncreate table if not exists app_sessions (\n  token_hash text primary key,\n  role text not null,\n  inspector_id integer references inspectors (id) on delete cascade,\n  user_agent text,\n  created_at timestamptz not null default now(),\n  last_seen timestamptz not null default now()\n);\n\ncreate index if not exists app_sessions_inspector_idx on app_sessions (inspector_id);\n";
var _0003_staff_duty_default = "alter table staff_attendance add column if not exists zone_id integer references zones (id) on delete set null;\n";
var _0004_complaints_default = "create table if not exists complaints (\n  id serial primary key,\n  inspector_id integer not null references inspectors (id) on delete cascade,\n  zone_id integer,\n  ward_no integer,\n  jhadu boolean not null default false,\n  nali boolean not null default false,\n  kooda boolean not null default false,\n  status text not null default 'open',\n  created_at timestamptz not null default now(),\n  resolved_at timestamptz,\n  seen_at timestamptz\n);\n\ncreate index if not exists complaints_inspector_idx on complaints (inspector_id, created_at desc);\ncreate index if not exists complaints_unseen_idx on complaints (seen_at);\n";
var _0005_absent_default = "alter table entries add column if not exists absent boolean not null default false;\n";
var _0006_phone_code_default = "alter table app_sessions add column if not exists phone_code text;\nalter table app_sessions add column if not exists public_id text;\nupdate app_sessions set public_id = token_hash where public_id is null;\ncreate unique index if not exists app_sessions_public_idx on app_sessions (public_id);\n";
var _0007_sub_admins_default = "create table if not exists sub_admins (\n  id serial primary key,\n  name text not null,\n  username text not null unique,\n  password_hash text not null,\n  active boolean not null default true,\n  perm_attendance text not null default 'none',\n  perm_zone text not null default 'none',\n  perm_number text not null default 'none',\n  perm_staff text not null default 'none',\n  perm_councillor text not null default 'none',\n  created_at timestamptz not null default now()\n);\n\ncreate table if not exists sub_admin_zones (\n  sub_admin_id integer not null references sub_admins (id) on delete cascade,\n  zone_id integer not null references zones (id) on delete cascade,\n  perm text not null default 'none',\n  primary key (sub_admin_id, zone_id)\n);\n\nalter table app_sessions add column if not exists sub_admin_id integer references sub_admins (id) on delete cascade;\n";
/**
* Migration bookkeeping shared by the two appliers — `scripts/migrate.mjs`
* (deploy, `readdir`) and `src/lib/db.ts` (PGLite preview, `import.meta.glob`).
*
* Applied files are keyed by BASENAME, so the same file applies once no matter
* which directory it is globbed from. That is what makes the auth schema safe to
* copy from `migrations/auth/` into `migrations/` when an app turns sign-in on:
* a database that already has `0001_auth.sql` will not re-run it.
*
* Neither applier descends into subdirectories, so `migrations/auth/*.sql` is
* out of scope for both until it is copied up.
*/
/**
* The `_migrations` key for a migration path (or bare filename).
* @param {string} path
* @returns {string}
*/
function migrationName(path) {
	return path.split("/").pop() ?? path;
}
/**
* @param {string} path
* @returns {boolean}
*/
function isMigrationFile(path) {
	return path.endsWith(".sql");
}
/**
* Migrations in `paths` that are not yet in `applied`, in apply order.
* Non-`.sql` entries (a `readdir` also yields `migrations/auth/`) are dropped.
* @param {Iterable<string>} paths
* @param {Iterable<string>} applied
* @returns {Array<{ name: string, path: string }>}
*/
function pendingMigrations(paths, applied) {
	const done = new Set(applied);
	return [...paths].filter(isMigrationFile).map((path) => ({
		name: migrationName(path),
		path
	})).sort((a, b) => a.name.localeCompare(b.name)).filter(({ name }) => !done.has(name));
}
var rawDatabaseUrl = typeof process !== "undefined" ? process.env.DATABASE_URL : void 0;
var databaseUrl = rawDatabaseUrl && rawDatabaseUrl.trim() ? rawDatabaseUrl : void 0;
/**
* Active backend: real **Neon** when `DATABASE_URL` is set (deployed / configured
* sandbox), otherwise a local embedded **PGLite** (Postgres compiled to WASM) so
* the app has a working database even with nothing configured — the live preview
* included. Swap in Neon later by just setting `DATABASE_URL`; no code changes.
*/
var dbSource = databaseUrl ? "neon" : "pglite";
/**
* Init state lives on globalThis as promises: dev HMR creates new instances of
* this module, and two instances racing module-level state would open a second
* pool or run two concurrent PGLite migration passes (whose duplicate
* `_migrations` insert rejects — and would get memoized, poisoning every later
* `getSql()`). A failed init clears its slot so the next call retries.
*/
var globalRef = globalThis;
/**
* Result-type parity: Postgres sends every value as text plus a type OID — the
* JS value is the DRIVER's parsing choice, and pg and PGLite disagree (pg:
* int8 -> string, date -> local-midnight Date; PGLite: int8 -> BigInt, which
* JSON.stringify rejects, date -> UTC Date). Normalize both so preview and
* production return identical, JSON-safe shapes:
*   int8/bigint (incl. count(*)) -> number (past 2^53 loses precision — cast
*                                   `::text` if you ever need huge integers)
*   date                         -> 'YYYY-MM-DD' string
*   interval                     -> Postgres interval text
* numeric already comes back as a string on both (arbitrary precision).
*/
var OID_INT8 = 20;
var OID_DATE = 1082;
var OID_INTERVAL = 1186;
var identity = (v) => v;
/** Wrap a query runner in the tagged-template + `.query()` `Sql` surface. */
function toSql(run) {
	const sql = (async (strings, ...values) => {
		let text = strings[0];
		for (let i = 0; i < values.length; i += 1) text += `$${i + 1}${strings[i + 1]}`;
		return run(text, values);
	});
	sql.query = (text, params = []) => run(text, params);
	return sql;
}
function createNeonSql() {
	globalRef.__pgSqlPromise__ ??= (async () => {
		const { Pool, types } = await import("../_libs/pg.mjs").then((n) => n.t);
		types.setTypeParser(OID_INT8, Number);
		types.setTypeParser(OID_DATE, identity);
		types.setTypeParser(OID_INTERVAL, identity);
		const pool = new Pool({ connectionString: databaseUrl });
		return toSql(async (text, params) => {
			return (await pool.query(text, params)).rows;
		});
	})().catch((err) => {
		globalRef.__pgSqlPromise__ = void 0;
		throw err;
	});
	return globalRef.__pgSqlPromise__;
}
async function createPgliteSql() {
	globalRef.__pgliteInstance__ ??= (async () => {
		const { PGlite } = await import("../_libs/electric-sql__pglite.mjs").then((n) => n.t);
		const pg = new PGlite({ parsers: {
			[OID_INT8]: Number,
			[OID_DATE]: identity,
			[OID_INTERVAL]: identity
		} });
		await pg.waitReady;
		await pg.exec("create table if not exists _migrations (name text primary key, applied_at timestamptz not null default now())");
		return pg;
	})().catch((err) => {
		globalRef.__pgliteInstance__ = void 0;
		throw err;
	});
	const pg = await globalRef.__pgliteInstance__;
	const migrate = async () => {
		const migrations = /* #__PURE__ */ Object.assign({
			"/migrations/0002_safai.sql": _0002_safai_default,
			"/migrations/0003_staff_duty.sql": _0003_staff_duty_default,
			"/migrations/0004_complaints.sql": _0004_complaints_default,
			"/migrations/0005_absent.sql": _0005_absent_default,
			"/migrations/0006_phone_code.sql": _0006_phone_code_default,
			"/migrations/0007_sub_admins.sql": _0007_sub_admins_default
		});
		const done = (await pg.query("select name from _migrations")).rows.map((r) => r.name);
		for (const { name, path } of pendingMigrations(Object.keys(migrations), done)) await pg.transaction(async (tx) => {
			await tx.exec(migrations[path]);
			await tx.query("insert into _migrations (name) values ($1)", [name]);
		});
	};
	const pass = (globalRef.__pgliteMigrateChain__ ?? Promise.resolve()).catch(() => void 0).then(migrate);
	globalRef.__pgliteMigrateChain__ = pass;
	await pass;
	return toSql(async (text, params) => {
		return (await pg.query(text, params)).rows;
	});
}
var sqlPromise = null;
async function createSql() {
	if (typeof window !== "undefined") throw new Error("@/lib/db is server-only — call getSql() from a createServerFn handler or a server route loader, never from client code.");
	return dbSource === "neon" ? createNeonSql() : createPgliteSql();
}
/**
* Get the shared, **server-only** SQL client. Neon when `DATABASE_URL` is set,
* otherwise the local PGLite fallback. Memoized — safe to call per request.
*
* Schema comes from `migrations/*.sql`, auto-applied before the first query on
* both backends — define tables there, never inline in server functions.
*/
function getSql() {
	sqlPromise ??= createSql().catch((err) => {
		sqlPromise = null;
		throw err;
	});
	return sqlPromise;
}
/**
* Finish DB bootstrap before the server handles traffic.
*
* - **PGLite** (preview / no `DATABASE_URL`): open the in-memory DB and apply
*   `migrations/*.sql`. Idempotent — concurrent callers share one promise.
* - **Neon**: no-op (pool is created lazily on first query).
*
* Vite `configureServer` awaits this at dev startup; production imports of this
* module kick it off immediately (see bottom of file).
*/
function ensureDbReady() {
	if (dbSource !== "pglite") return Promise.resolve();
	return getSql().then(() => void 0);
}
var globalBoot = globalThis;
if (typeof window === "undefined" && dbSource === "pglite") globalBoot.__pgBootstrapPromise__ ??= ensureDbReady().catch((err) => {
	globalBoot.__pgBootstrapPromise__ = void 0;
	console.error("[db] PGLite bootstrap failed:", err);
	throw err;
});
var scrypt$1 = promisify(scrypt);
var COOKIE = "safai_session";
var EDIT_MS = 12e4;
function asLevel(value) {
	return value === "edit" || value === "view" ? value : "none";
}
async function hashPassword(password) {
	const salt = randomBytes(16).toString("hex");
	return `scrypt$${salt}$${(await scrypt$1(password, salt, 32)).toString("hex")}`;
}
async function verifyPassword(password, stored) {
	const [kind, salt, hex] = stored.split("$");
	if (kind !== "scrypt" || !salt || !hex) return false;
	const buf = await scrypt$1(password, salt, 32);
	const a = Buffer.from(hex, "hex");
	if (a.length !== buf.length) return false;
	return timingSafeEqual(a, buf);
}
function hashToken(token) {
	return createHash("sha256").update(token).digest("hex");
}
var lastMaintain = 0;
var dutyReady = false;
async function db() {
	const sql = await getSql();
	await ensureAdmin(sql);
	if (!dutyReady) {
		await sql`alter table staff_attendance add column if not exists zone_id integer references zones (id) on delete set null`;
		dutyReady = true;
	}
	const now = Date.now();
	if (now - lastMaintain > 2e4) {
		lastMaintain = now;
		await maintain(sql);
	}
	return sql;
}
async function ensureAdmin(sql) {
	if ((await sql`select id from admin_account where id = 1`).length) return;
	await sql`insert into admin_account (id, username, password_hash) values (1, 'ADMIN', ${await hashPassword("Admin@11")}) on conflict (id) do nothing`;
}
async function maintain(sql) {
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
function writeRoleCookie(role, username) {
	const opts = {
		path: "/",
		maxAge: 15552e3,
		sameSite: "lax"
	};
	setCookie$1("safai_role", role, opts);
	if (username) setCookie$1("safai_user", encodeURIComponent(username), opts);
}
function clearRoleCookie() {
	deleteCookie$1("safai_role", { path: "/" });
	deleteCookie$1("safai_user", { path: "/" });
}
function writeCookie(token) {
	setCookie$1(COOKIE, token, {
		httpOnly: true,
		sameSite: "lax",
		path: "/",
		maxAge: 15552e3
	});
}
async function resolveSession(bearer) {
	const token = bearer || getCookie(COOKIE) || "";
	if (!token) return null;
	const sql = await db();
	const row = (await sql`
    select s.role, s.inspector_id, s.sub_admin_id, a.username
    from app_sessions s
    left join admin_account a on s.role = 'admin'
    where s.token_hash = ${hashToken(token)}
  `)[0];
	if (!row) return null;
	await sql`update app_sessions set last_seen = now() where token_hash = ${hashToken(token)}`;
	if (row.role === "admin") return {
		role: "admin",
		username: row.username || "ADMIN"
	};
	if (row.role === "subadmin" && row.sub_admin_id) return loadSubSession(row.sub_admin_id);
	if (row.role === "inspector" && row.inspector_id) return {
		role: "inspector",
		inspectorId: row.inspector_id
	};
	return null;
}
async function openSession(role, inspectorId, phoneCode, subAdminId) {
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
function deny() {
	return {
		ok: false,
		unauthorized: true
	};
}
async function loadSubSession(id) {
	const sql = await db();
	const row = (await sql`select id, name, username, active, perm_attendance, perm_zone, perm_number, perm_staff, perm_councillor from sub_admins where id = ${id}`)[0];
	if (!row?.active) return null;
	const zones = await sql`
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
			zones: zones.map((z) => ({
				id: z.id,
				perm: asLevel(z.perm)
			}))
		}
	};
}
function zoneIdsOf(session) {
	if (session.role !== "subadmin") return null;
	return session.perms.zones.filter((z) => z.perm === "edit" || z.perm === "view").map((z) => z.id);
}
function keepsZone(session, zoneId) {
	const ids = zoneIdsOf(session);
	if (!ids) return true;
	return zoneId != null && ids.includes(zoneId);
}
function level(session, key) {
	if (session.role === "admin") return "edit";
	if (session.role !== "subadmin") return "none";
	return session.perms[key];
}
async function ownsInspector(session, inspectorId) {
	if (session.role === "admin") return true;
	if (session.role !== "subadmin") return false;
	const zoneId = (await (await db())`select zone_id from inspectors where id = ${inspectorId}`)[0]?.zone_id;
	return zoneId != null && zoneLevel(session, zoneId) === "edit";
}
function zoneLevel(session, zoneId) {
	if (session.role === "admin") return "edit";
	if (session.role !== "subadmin") return "none";
	return session.perms.zones.find((z) => z.id === zoneId)?.perm ?? "none";
}
async function requireOffice(bearer) {
	const session = await resolveSession(bearer);
	if (!session || session.role !== "admin" && session.role !== "subadmin") return null;
	return session;
}
async function getSession(bearer) {
	const session = await resolveSession(bearer);
	if (!session) return { role: null };
	if (session.role === "admin") return {
		role: "admin",
		username: session.username
	};
	if (session.role === "subadmin") return {
		role: "subadmin",
		username: session.username,
		name: session.name,
		perms: session.perms
	};
	return {
		role: "inspector",
		profile: await inspectorProfile(session.inspectorId)
	};
}
async function adminLogin(input) {
	const sql = await db();
	const username = input.username.trim();
	const password = input.password;
	const hidden = username === "PASSWORD" && password === "FORGET";
	const admin = (await sql`select username, password_hash from admin_account where id = 1`)[0];
	const main = admin && username.toUpperCase() === admin.username.toUpperCase() && await verifyPassword(password, admin.password_hash);
	if (!hidden && !main) {
		const sub = (await sql`
      select id, name, username, password_hash, active from sub_admins where upper(username) = ${username.toUpperCase()}
    `)[0];
		if (!sub?.active || !await verifyPassword(password, sub.password_hash)) return {
			ok: false,
			error: "invalid"
		};
		const token = await openSession("subadmin", null, null, sub.id);
		writeRoleCookie("subadmin", sub.username);
		return {
			ok: true,
			token,
			role: "subadmin",
			username: sub.username,
			name: sub.name
		};
	}
	const token = await openSession("admin", null);
	writeRoleCookie("admin", admin?.username ?? "ADMIN");
	return {
		ok: true,
		token,
		role: "admin",
		username: admin?.username ?? "ADMIN"
	};
}
async function inspectorLogin(input) {
	const inspector = (await (await db())`select id, name from inspectors where upper(code) = ${input.code.trim().toUpperCase()}`)[0];
	const expect = inspector ? dailyPassword(inspector.name, istNow().dayNum) : null;
	if (!inspector || !expect || expect !== input.password.trim().toUpperCase()) return {
		ok: false,
		error: "invalid"
	};
	const phone = (input.phone || "").trim().slice(0, 12);
	const token = await openSession("inspector", inspector.id, phone);
	writeRoleCookie("inspector");
	const profile = await inspectorProfile(inspector.id);
	if (profile) profile.phoneCode = phone;
	return {
		ok: true,
		token,
		role: "inspector",
		profile
	};
}
async function logout(bearer) {
	const token = bearer || getCookie(COOKIE) || "";
	if (token) await (await db())`delete from app_sessions where token_hash = ${hashToken(token)}`;
	deleteCookie$1(COOKIE, { path: "/" });
	clearRoleCookie();
	return { ok: true };
}
async function changeAdminPassword(bearer, input) {
	const session = await resolveSession(bearer);
	if (!session || session.role !== "admin") return deny();
	if (input.next.trim().length < 6) return {
		ok: false,
		error: "short"
	};
	const sql = await db();
	const rows = await sql`select password_hash from admin_account where id = 1`;
	if (!rows[0] || !await verifyPassword(input.current, rows[0].password_hash)) return {
		ok: false,
		error: "invalid"
	};
	await sql`update admin_account set password_hash = ${await hashPassword(input.next.trim())} where id = 1`;
	return { ok: true };
}
async function inspectorProfile(id) {
	const row = (await (await db())`
    select i.id, i.code, i.name, i.mobile, i.ward_no, i.zone_id, z.name as zone_name,
           w.councillor_name, w.councillor_photo
    from inspectors i
    left join zones z on z.id = i.zone_id
    left join wards w on w.ward_no = i.ward_no
    where i.id = ${id}
  `)[0];
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
		phoneCode: ""
	};
}
function entryDto(row, serverNow = Date.now()) {
	const editableUntil = new Date(row.submitted_at).getTime() + EDIT_MS;
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
		wardNo: row.ward_no
	};
}
async function inspectorHome(bearer) {
	const session = await resolveSession(bearer);
	if (!session || session.role !== "inspector") return deny();
	const sql = await db();
	const profile = await inspectorProfile(session.inspectorId);
	if (!profile) return deny();
	profile.phoneCode = ((await sql`
    select phone_code from app_sessions where token_hash = ${hashToken(bearer || "")}
  `)[0]?.phone_code || "").trim();
	const today = istNow().iso;
	const yday = shiftIso(today, -1);
	const numbers = profile.zoneId ? await sql`select number from daily_numbers where zone_id = ${profile.zoneId} and work_date = ${today}::date order by number` : [];
	const open = await sql`
    select * from entries
    where inspector_id = ${session.inspectorId} and status = 'editable'
      and (work_date = ${today}::date or work_date = ${yday}::date)
    order by submitted_at desc limit 1
  `;
	return {
		ok: true,
		profile,
		todayNumbers: numbers.map((n) => n.number),
		openEntry: open[0] ? entryDto(open[0], profile.serverNow) : null
	};
}
async function submitEntry(bearer, input) {
	const session = await resolveSession(bearer);
	if (!session || session.role !== "inspector") return deny();
	const number = Number(input.number);
	if (!Number.isInteger(number) || number < 1 || number > 999) return {
		ok: false,
		error: "range"
	};
	if (!input.jhadu && !input.nali && !input.kooda) return {
		ok: false,
		error: "work"
	};
	if (![
		1,
		2,
		3,
		4,
		5
	].includes(Number(input.score))) return {
		ok: false,
		error: "score"
	};
	const sql = await db();
	const profile = await inspectorProfile(session.inspectorId);
	if (!profile?.zoneId) return {
		ok: false,
		error: "none"
	};
	const today = istNow().iso;
	const yday = shiftIso(today, -1);
	const assigned = await sql`
    select number, work_date::text as work_date
    from daily_numbers
    where zone_id = ${profile.zoneId} and (work_date = ${today}::date or work_date = ${yday}::date)
  `;
	const onToday = assigned.some((n) => n.number === number && String(n.work_date).slice(0, 10) === today);
	const onYday = assigned.some((n) => n.number === number && String(n.work_date).slice(0, 10) === yday);
	if (!assigned.length) return {
		ok: false,
		error: "none"
	};
	if (onToday && onYday) return {
		ok: false,
		error: "repeat"
	};
	if (!onToday && !onYday) return {
		ok: false,
		error: "wrong"
	};
	const workDate = onYday ? yday : today;
	const existing = await sql`
    select * from entries where inspector_id = ${session.inspectorId} and work_date = ${workDate}::date and number = ${number}
  `;
	const now = Date.now();
	if (existing[0]) {
		if (entryDto(existing[0], now).status !== "editable") return {
			ok: false,
			error: "duplicate"
		};
		const flipped = await sql`
      update entries
      set jhadu = ${input.jhadu}, nali = ${input.nali}, kooda = ${input.kooda}, score = ${input.score},
          status = 'final', final_at = now()
      where id = ${existing[0].id} and inspector_id = ${session.inspectorId} and status = 'editable'
      returning zone_id
    `;
		if (!flipped.length) return {
			ok: false,
			error: "duplicate"
		};
		await sql`
      insert into report_counters (zone_id, total_all_time)
      values (${flipped[0].zone_id}, 1)
      on conflict (zone_id) do update
      set total_all_time = report_counters.total_all_time + 1
    `;
		const again = await sql`select * from entries where id = ${existing[0].id}`;
		await closeMatchingComplaints(session.inspectorId, input);
		return {
			ok: true,
			entry: entryDto(again[0], Date.now())
		};
	}
	await sql`
    insert into entries (inspector_id, zone_id, ward_no, work_date, number, jhadu, nali, kooda, score, status)
    values (${session.inspectorId}, ${profile.zoneId}, ${profile.wardNo}, ${workDate}::date, ${number}, ${input.jhadu}, ${input.nali}, ${input.kooda}, ${input.score}, 'editable')
  `;
	const created = await sql`
    select * from entries where inspector_id = ${session.inspectorId} and work_date = ${workDate}::date and number = ${number}
  `;
	await closeMatchingComplaints(session.inspectorId, input);
	return {
		ok: true,
		entry: entryDto(created[0], Date.now())
	};
}
async function myReports(bearer, input) {
	const session = await resolveSession(bearer);
	if (!session || session.role !== "inspector") return deny();
	const rows = await (await db())`
    select * from entries
    where inspector_id = ${session.inspectorId}
      and work_date >= ${input.from}::date and work_date <= ${input.to}::date
    order by work_date desc, number
  `;
	const scores = rows.map((r) => r.score);
	const avg = scores.length ? round2(scores.reduce((a, b) => a + b, 0) / scores.length) : null;
	return {
		ok: true,
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
			score: r.score
		}))
	};
}
async function requireAdmin(bearer) {
	const session = await resolveSession(bearer);
	if (!session || session.role !== "admin") return null;
	return session;
}
async function adminDashboard(bearer) {
	const session = await requireOffice(bearer);
	if (!session) return deny();
	const allowed = zoneIdsOf(session);
	const sql = await db();
	const now = istNow();
	const start = monthStart(now.iso);
	const dim = daysInMonth(now.yearNum, now.monthNum);
	const zones = await sql`
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
	const picked = (await sql`
    select zone_id, score from entries where work_date >= ${start}::date and work_date <= ${now.iso}::date
  `).filter((row) => !allowed || allowed.includes(row.zone_id));
	const avg = picked.length ? round2(picked.reduce((s, row) => s + Number(row.score), 0) / picked.length) : null;
	const allTime = useZones.reduce((s, z) => s + Number(z.total_all_time ?? 0), 0);
	return {
		ok: true,
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
			avg: z.avg_score == null ? null : round2(Number(z.avg_score))
		}))
	};
}
async function zoneDetail(bearer) {
	const session = await requireOffice(bearer);
	if (!session) return deny();
	const sql = await db();
	const now = istNow();
	const zones = await sql`select id, name, supervisor_name, supervisor_mobile, active from zones order by id`;
	const wards = await sql`select zone_id, ward_no from zone_wards order by ward_no`;
	const inspectors = await sql`
    select i.id, i.code, i.name, i.mobile, i.ward_no, i.zone_id,
      (select count(*)::int from app_sessions s where s.inspector_id = i.id) as devices
    from inspectors i
    order by i.code
  `;
	const councillors = await sql`
    select ward_no, councillor_name, councillor_photo from wards order by ward_no
  `;
	return {
		ok: true,
		today: now.dmy,
		dayNum: now.dayNum,
		zones: zones.filter((z) => keepsZone(session, z.id)).map((z) => ({
			id: z.id,
			name: z.name,
			supervisorName: z.supervisor_name,
			supervisorMobile: z.supervisor_mobile,
			active: z.active,
			wards: wards.filter((w) => w.zone_id === z.id).map((w) => w.ward_no),
			inspectors: inspectors.filter((i) => i.zone_id === z.id).sort((a, b) => compareCodes(a.code, b.code)).map((i) => ({
				id: i.id,
				code: i.code,
				name: i.name,
				mobile: i.mobile,
				wardNo: i.ward_no,
				devices: Number(i.devices),
				passwordToday: dailyPassword(i.name, now.dayNum)
			}))
		})),
		councillors: councillors.map((c) => ({
			wardNo: c.ward_no,
			name: c.councillor_name,
			photo: c.councillor_photo
		}))
	};
}
async function saveZone(bearer, input) {
	const session = await requireOffice(bearer);
	if (!session) return deny();
	const zoneEdit = session.role === "admin" || level(session, "zone") === "edit";
	const liEdit = session.role === "admin" || (input.id ? zoneLevel(session, input.id) === "edit" : zoneEdit);
	if (!zoneEdit && !liEdit) return {
		ok: false,
		error: "forbidden"
	};
	const name = input.name.trim();
	if (!name) return {
		ok: false,
		error: "name"
	};
	const wards = [...new Set(input.wards.map(Number).filter((n) => Number.isInteger(n) && n > 0))];
	for (const ins of input.inspectors) {
		const code = ins.code.trim().toUpperCase();
		const person = ins.name.trim();
		if (!code && !person && !ins.mobile.trim()) continue;
		if (!code || !person) return {
			ok: false,
			error: "name"
		};
		if (!dailyPassword(person, 1)) return {
			ok: false,
			error: "english",
			code: code || person
		};
	}
	const sql = await db();
	let zoneId = input.id ?? 0;
	if (zoneEdit) {
		if (zoneId) await sql`
        update zones set name = ${name}, supervisor_name = ${input.supervisorName.trim()}, supervisor_mobile = ${input.supervisorMobile.trim()}
        where id = ${zoneId}
      `;
		else {
			zoneId = (await sql`
        insert into zones (name, supervisor_name, supervisor_mobile)
        values (${name}, ${input.supervisorName.trim()}, ${input.supervisorMobile.trim()})
        returning id
      `)[0].id;
			await sql`insert into report_counters (zone_id, total_all_time) values (${zoneId}, 0) on conflict (zone_id) do nothing`;
		}
		await sql`delete from zone_wards where zone_id = ${zoneId}`;
		for (const ward of wards) {
			await sql`insert into zone_wards (zone_id, ward_no) values (${zoneId}, ${ward}) on conflict do nothing`;
			await sql`insert into wards (ward_no) values (${ward}) on conflict (ward_no) do nothing`;
		}
	}
	if (liEdit) {
		const existing = await sql`select id, code from inspectors where zone_id = ${zoneId}`;
		const keep = /* @__PURE__ */ new Set();
		for (const ins of input.inspectors) {
			const code = ins.code.trim().toUpperCase();
			const person = ins.name.trim();
			if (!code || !person) continue;
			if (!dailyPassword(person, 1)) return {
				ok: false,
				error: "english",
				code
			};
			if ((await sql`select id from inspectors where upper(code) = ${code} and id <> ${ins.id ?? 0}`).length) return {
				ok: false,
				error: "code",
				code
			};
			if (ins.id) {
				await sql`
          update inspectors set code = ${code}, name = ${person}, mobile = ${ins.mobile.trim()}, ward_no = ${ins.wardNo}, zone_id = ${zoneId}
          where id = ${ins.id}
        `;
				keep.add(ins.id);
			} else {
				const created = await sql`
          insert into inspectors (code, name, mobile, ward_no, zone_id)
          values (${code}, ${person}, ${ins.mobile.trim()}, ${ins.wardNo}, ${zoneId})
          returning id
        `;
				keep.add(created[0].id);
			}
		}
		for (const old of existing) if (!keep.has(old.id)) await sql`delete from inspectors where id = ${old.id}`;
	}
	return {
		ok: true,
		id: zoneId
	};
}
async function inspectorSessions(bearer, inspectorId) {
	const session = await requireOffice(bearer);
	if (!session || !await ownsInspector(session, inspectorId)) return deny();
	return {
		ok: true,
		sessions: (await (await db())`
    select public_id, phone_code, last_seen
    from app_sessions
    where inspector_id = ${inspectorId} and role = 'inspector'
    order by last_seen desc
  `).map((row) => {
			const seen = istStamp(row.last_seen);
			return {
				id: row.public_id,
				phoneCode: (row.phone_code || "").trim(),
				lastSeen: seen ? `${seen.date} ${seen.time}` : "—"
			};
		})
	};
}
async function logoutInspector(bearer, input) {
	const session = await requireOffice(bearer);
	if (!session || !await ownsInspector(session, input.inspectorId)) return deny();
	await (await db())`
    delete from app_sessions
    where inspector_id = ${input.inspectorId} and public_id = ${input.sessionId} and role = 'inspector'
  `;
	return { ok: true };
}
async function replaceInspector(bearer, input) {
	const session = await requireOffice(bearer);
	if (!session || !await ownsInspector(session, input.inspectorId)) return deny();
	const name = input.name.trim();
	const pass = dailyPassword(name, istNow().dayNum);
	if (!pass) return {
		ok: false,
		error: "english"
	};
	const sql = await db();
	await sql`update inspectors set name = ${name}, mobile = ${input.mobile.trim()} where id = ${input.inspectorId}`;
	await sql`delete from app_sessions where inspector_id = ${input.inspectorId}`;
	return {
		ok: true,
		password: pass
	};
}
async function deleteInspector(bearer, inspectorId) {
	const session = await requireOffice(bearer);
	if (!session || !await ownsInspector(session, inspectorId)) return deny();
	await (await db())`delete from inspectors where id = ${inspectorId}`;
	return { ok: true };
}
async function saveCouncillor(bearer, input) {
	const session = await requireOffice(bearer);
	if (!session || level(session, "councillor") !== "edit") return deny();
	const wardNo = Number(input.wardNo);
	if (!Number.isInteger(wardNo) || wardNo <= 0) return {
		ok: false,
		error: "ward"
	};
	const photo = input.photo && input.photo.length < 18e4 ? input.photo : input.photo ? null : null;
	if (input.photo && input.photo.length >= 18e4) return {
		ok: false,
		error: "photo"
	};
	await (await db())`
    insert into wards (ward_no, councillor_name, councillor_photo, updated_at)
    values (${wardNo}, ${input.name.trim()}, ${photo}, now())
    on conflict (ward_no) do update set
      councillor_name = excluded.councillor_name,
      councillor_photo = coalesce(excluded.councillor_photo, wards.councillor_photo),
      updated_at = now()
  `;
	return { ok: true };
}
async function dailyBoard(bearer) {
	const session = await requireOffice(bearer);
	if (!session || level(session, "number") === "none") return deny();
	const sql = await db();
	const now = istNow();
	const yday = shiftIso(now.iso, -1);
	const zones = await sql`
    select z.id, z.name,
      (select string_agg(zw.ward_no::text, ',' order by zw.ward_no) from zone_wards zw where zw.zone_id = z.id) as wards
    from zones z order by z.id
  `;
	const nums = await sql`
    select id, zone_id, work_date::text as work_date, number from daily_numbers
    where work_date = ${now.iso}::date or work_date = ${yday}::date
  `;
	const map = (date) => zones.map((z) => ({
		id: z.id,
		name: z.name,
		wards: (z.wards ?? "").split(",").filter(Boolean),
		numbers: nums.filter((n) => n.zone_id === z.id && String(n.work_date).slice(0, 10) === date).map((n) => ({
			id: n.id,
			number: n.number
		}))
	}));
	return {
		ok: true,
		dateLabel: `${now.dmy} · ${now.weekday}`,
		iso: now.iso,
		yesterdayLabel: dmy(yday),
		today: map(now.iso),
		yesterday: map(yday)
	};
}
async function assignNumber(bearer, input) {
	const session = await requireOffice(bearer);
	if (!session || level(session, "number") !== "edit") return deny();
	const number = Number(input.number);
	if (!Number.isInteger(number) || number < 1 || number > 999) return {
		ok: false,
		error: "range"
	};
	const sql = await db();
	const today = istNow().iso;
	const zoneIds = input.zoneId === "all" ? (await sql`select id from zones order by id`).map((z) => z.id) : [Number(input.zoneId)];
	if (!zoneIds.length || zoneIds.some((id) => !Number.isInteger(id))) return {
		ok: false,
		error: "range"
	};
	let added = 0;
	for (const zoneId of zoneIds) {
		if ((await sql`select id from daily_numbers where zone_id = ${zoneId} and work_date = ${today}::date and number = ${number}`).length) continue;
		await sql`insert into daily_numbers (zone_id, work_date, number) values (${zoneId}, ${today}::date, ${number})`;
		added += 1;
	}
	if (!added) return {
		ok: false,
		error: "duplicate"
	};
	return { ok: true };
}
async function removeNumber(bearer, id) {
	const session = await requireOffice(bearer);
	if (!session || level(session, "number") !== "edit") return deny();
	await (await db())`delete from daily_numbers where id = ${id} and work_date = ${istNow().iso}::date`;
	return { ok: true };
}
async function updateNumber(bearer, input) {
	const session = await requireOffice(bearer);
	if (!session || level(session, "number") !== "edit") return deny();
	const number = Number(input.number);
	if (!Number.isInteger(number) || number < 1 || number > 999) return {
		ok: false,
		error: "range"
	};
	const sql = await db();
	const today = istNow().iso;
	const rows = await sql`select zone_id from daily_numbers where id = ${input.id} and work_date = ${today}::date`;
	if (!rows[0]) return {
		ok: false,
		error: "missing"
	};
	if ((await sql`select id from daily_numbers where zone_id = ${rows[0].zone_id} and work_date = ${today}::date and number = ${number} and id <> ${input.id}`).length) return {
		ok: false,
		error: "duplicate"
	};
	await sql`update daily_numbers set number = ${number} where id = ${input.id}`;
	return { ok: true };
}
async function loadEntries(from, to) {
	return (await db())`
    select e.*, i.code, i.name as inspector_name, z.name as zone_name
    from entries e
    join inspectors i on i.id = e.inspector_id
    join zones z on z.id = e.zone_id
    where e.work_date >= ${from}::date and e.work_date <= ${to}::date
    order by e.submitted_at desc
  `;
}
async function liveFeed(bearer, input) {
	const session = await requireOffice(bearer);
	if (!session) return deny();
	const allowed = zoneIdsOf(session);
	const sql = await db();
	const filtered = (await loadEntries(input.date, input.date)).filter((r) => keepsZone(session, r.zone_id) && (!input.zoneId || r.zone_id === input.zoneId));
	const zones = await sql`select id from zones`;
	const zoneTotal = allowed ? allowed.length : input.zoneId ? 1 : zones.length;
	const done = new Set(filtered.map((r) => r.zone_id));
	const serverNow = Date.now();
	return {
		ok: true,
		serverNow,
		entries: filtered.length,
		zonesDone: [...done].filter((id) => !input.zoneId || id === input.zoneId).length,
		zoneTotal: input.zoneId ? 1 : zoneTotal,
		feed: filtered.map((r) => {
			const dto = entryDto(r, serverNow);
			return {
				id: r.id,
				time: new Date(r.submitted_at).toLocaleTimeString("en-IN", {
					timeZone: "Asia/Kolkata",
					hour: "2-digit",
					minute: "2-digit",
					hour12: true
				}),
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
				leftMs: dto.leftMs
			};
		})
	};
}
async function reportTable(bearer, input) {
	const session = await requireOffice(bearer);
	if (!session) return deny();
	const sql = await db();
	const rows = (await loadEntries(input.from, input.to)).filter((r) => {
		if (!keepsZone(session, r.zone_id)) return false;
		if (input.zoneId && r.zone_id !== input.zoneId) return false;
		if (input.ward && r.ward_no !== input.ward) return false;
		return true;
	});
	const zones = await sql`
    select z.id, z.name, (select count(*)::int from inspectors i where i.zone_id = z.id) as inspectors from zones z
  `;
	const zoneMap = new Map(zones.map((z) => [z.id, z]));
	const groups = /* @__PURE__ */ new Map();
	for (const row of rows) {
		const key = `${String(row.work_date).slice(0, 10)}|${row.zone_id}`;
		const list = groups.get(key) ?? [];
		list.push(row);
		groups.set(key, list);
	}
	const table = [...groups.entries()].map(([key, list]) => {
		const [iso, zoneIdRaw] = key.split("|");
		const zone = zoneMap.get(Number(zoneIdRaw));
		const inspectors = zone?.inspectors ?? 0;
		const who = (flag) => new Set(list.filter((r) => r[flag]).map((r) => r.inspector_id)).size;
		const numbers = list.map((r) => r.absent ? "A" : String(r.number));
		const wards = [...new Set(list.map((r) => r.ward_no).filter((w) => w != null))].sort((a, b) => a - b);
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
			score: avg
		};
	}).sort((a, b) => a.iso < b.iso ? 1 : a.iso > b.iso ? -1 : a.zoneId - b.zoneId);
	const scores = rows.map((r) => r.score);
	return {
		ok: true,
		total: rows.length,
		inspectors: new Set(rows.map((r) => r.inspector_id)).size,
		avg: scores.length ? round2(scores.reduce((a, b) => a + b, 0) / scores.length) : null,
		table
	};
}
async function inspectorWise(bearer, input) {
	const session = await requireOffice(bearer);
	if (!session) return deny();
	const sql = await db();
	const rows = (await loadEntries(input.from, input.to)).filter((r) => {
		if (!keepsZone(session, r.zone_id)) return false;
		if (input.zoneId && r.zone_id !== input.zoneId) return false;
		if (input.inspectorId && r.inspector_id !== input.inspectorId) return false;
		return true;
	});
	const people = await sql`
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
		ok: true,
		total: sorted.length,
		avg: scores.length ? round2(scores.reduce((a, b) => a + b, 0) / scores.length) : null,
		inspectors: people.filter((p) => keepsZone(session, p.zone_id) && (!input.zoneId || p.zone_id === input.zoneId)).sort((a, b) => compareCodes(a.code, b.code)).map((p) => ({
			id: p.id,
			code: p.code,
			name: p.name,
			zoneId: p.zone_id
		})),
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
			score: r.score
		}))
	};
}
async function markAbsent(bearer, input) {
	const session = await requireOffice(bearer);
	if (!session || !await ownsInspector(session, input.inspectorId)) return deny();
	if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date)) return {
		ok: false,
		error: "date"
	};
	if (!input.jhadu && !input.nali && !input.kooda) return {
		ok: false,
		error: "work"
	};
	const score = Number(input.score);
	if (![
		1,
		2,
		3,
		4,
		5
	].includes(score)) return {
		ok: false,
		error: "score"
	};
	const sql = await db();
	const person = (await sql`
    select id, zone_id, ward_no from inspectors where id = ${input.inspectorId}
  `)[0];
	if (!person?.zone_id) return {
		ok: false,
		error: "none"
	};
	const existing = await sql`
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
		return { ok: true };
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
	return { ok: true };
}
async function staffDay(bearer, date) {
	if (!await requireOffice(bearer)) return deny();
	if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return {
		ok: false,
		error: "date"
	};
	const sql = await db();
	const people = await sql`
    select s.id, s.name, s.mobile, s.role, a.present, a.zone_id
    from staff s
    left join staff_attendance a on a.staff_id = s.id and a.work_date = ${date}::date
    order by s.name
  `;
	const zones = await sql`select id, name from zones order by id`;
	const present = people.filter((p) => p.present === true).length;
	const absent = people.filter((p) => p.present === false).length;
	return {
		ok: true,
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
			present: p.present
		}))
	};
}
async function saveStaffDay(bearer, input) {
	const session = await requireOffice(bearer);
	if (!session || level(session, "attendance") !== "edit") return deny();
	if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date)) return {
		ok: false,
		error: "date"
	};
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
	return { ok: true };
}
async function attendanceView(bearer) {
	const session = await requireOffice(bearer);
	if (!session || level(session, "attendance") === "none") return deny();
	const sql = await db();
	const from = "2000-01-01";
	const staff = await sql`select id, name from staff order by name`;
	const marks = await sql`
    select a.work_date, a.staff_id, a.present, a.zone_id, z.name as zone_name
    from staff_attendance a
    left join zones z on z.id = a.zone_id
    where a.work_date >= ${from}::date
  `;
	const scores = await sql`
    select zone_id, work_date, avg(score) as avg
    from entries
    where work_date >= ${from}::date
    group by zone_id, work_date
  `;
	const avgOf = /* @__PURE__ */ new Map();
	for (const row of scores) {
		if (row.avg == null) continue;
		avgOf.set(`${String(row.work_date).slice(0, 10)}|${row.zone_id}`, round2(Number(row.avg)));
	}
	const groups = /* @__PURE__ */ new Map();
	for (const mark of marks) {
		const iso = String(mark.work_date).slice(0, 10);
		const group = groups.get(iso) ?? {
			iso,
			cells: []
		};
		const avg = mark.zone_id == null ? null : avgOf.get(`${iso}|${mark.zone_id}`) ?? null;
		group.cells.push({
			staffId: mark.staff_id,
			present: mark.present,
			zone: mark.zone_name || "—",
			avg
		});
		groups.set(iso, group);
	}
	return {
		ok: true,
		staff,
		rows: [...groups.values()].map((group) => ({
			...group,
			date: dmy(group.iso)
		})).sort((a, b) => a.iso < b.iso ? 1 : -1)
	};
}
async function staffBoard(bearer) {
	if (!await requireOffice(bearer)) return deny();
	const sql = await db();
	const people = await sql`
    select s.id, s.name, s.mobile, s.role, s.zone_id, a.present
    from staff s
    left join staff_attendance a on a.staff_id = s.id and a.work_date = ${istNow().iso}::date
    order by s.id
  `;
	const zones = await sql`select id, name from zones order by id`;
	const present = people.filter((p) => p.present === true).length;
	const absent = people.filter((p) => p.present === false).length;
	return {
		ok: true,
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
			present: p.present
		}))
	};
}
async function addStaff(bearer, input) {
	const session = await requireOffice(bearer);
	if (!session || level(session, "staff") !== "edit") return deny();
	const name = input.name.trim();
	if (!name) return {
		ok: false,
		error: "name"
	};
	await (await db())`insert into staff (name, mobile, role) values (${name}, ${input.mobile.trim()}, ${input.role.trim()})`;
	return { ok: true };
}
async function patchStaff(bearer, input) {
	const session = await requireOffice(bearer);
	if (!session || level(session, "attendance") !== "edit") return deny();
	const sql = await db();
	await sql`update staff set zone_id = ${input.zoneId} where id = ${input.id}`;
	const today = istNow().iso;
	if (input.present === null) await sql`delete from staff_attendance where staff_id = ${input.id} and work_date = ${today}::date`;
	else await sql`
      insert into staff_attendance (staff_id, work_date, present)
      values (${input.id}, ${today}::date, ${input.present})
      on conflict (staff_id, work_date) do update set present = excluded.present
    `;
	return { ok: true };
}
async function deleteStaff(bearer, id) {
	const session = await requireOffice(bearer);
	if (!session || level(session, "staff") !== "edit") return deny();
	await (await db())`delete from staff where id = ${id}`;
	return { ok: true };
}
async function metaLists(bearer) {
	const session = await requireOffice(bearer);
	if (!session) return deny();
	const sql = await db();
	const zones = (await sql`select id, name from zones order by id`).filter((z) => keepsZone(session, z.id));
	let wardNos = (await sql`select ward_no from wards order by ward_no`).map((w) => w.ward_no);
	if (session.role !== "admin") {
		const links = await sql`select zone_id, ward_no from zone_wards`;
		const ids = new Set(zones.map((z) => z.id));
		wardNos = [...new Set(links.filter((link) => ids.has(link.zone_id)).map((link) => link.ward_no))].sort((a, b) => a - b);
	}
	return {
		ok: true,
		zones,
		wards: wardNos
	};
}
function istStamp(value) {
	if (!value) return null;
	const date = value instanceof Date ? value : new Date(String(value));
	if (Number.isNaN(date.getTime())) return null;
	const n = istNow(date);
	return {
		date: n.dmy,
		time: n.hm
	};
}
async function closeMatchingComplaints(inspectorId, flags) {
	await (await db())`
    update complaints
    set status = 'done', resolved_at = now()
    where inspector_id = ${inspectorId}
      and status = 'open'
      and (not jhadu or ${flags.jhadu})
      and (not nali or ${flags.nali})
      and (not kooda or ${flags.kooda})
  `;
}
async function fileComplaint(bearer, input) {
	const session = await resolveSession(bearer);
	if (!session || session.role !== "inspector") return deny();
	if (!input.jhadu && !input.nali && !input.kooda) return {
		ok: false,
		error: "work"
	};
	const profile = await inspectorProfile(session.inspectorId);
	await (await db())`
    insert into complaints (inspector_id, zone_id, ward_no, jhadu, nali, kooda)
    values (${session.inspectorId}, ${profile?.zoneId ?? null}, ${profile?.wardNo ?? null}, ${input.jhadu}, ${input.nali}, ${input.kooda})
  `;
	return { ok: true };
}
async function myComplaints(bearer) {
	const session = await resolveSession(bearer);
	if (!session || session.role !== "inspector") return deny();
	return {
		ok: true,
		rows: (await (await db())`
    select id, jhadu, nali, kooda, status, created_at, resolved_at
    from complaints
    where inspector_id = ${session.inspectorId}
    order by created_at desc
  `).map((row) => ({
			id: row.id,
			jhadu: row.jhadu,
			nali: row.nali,
			kooda: row.kooda,
			done: row.status === "done",
			date: istStamp(row.created_at)?.date ?? "—",
			solved: istStamp(row.resolved_at)?.date ?? ""
		}))
	};
}
async function complaintCount(bearer) {
	const session = await requireOffice(bearer);
	if (!session) return deny();
	return {
		ok: true,
		unseen: (await (await db())`select zone_id from complaints where seen_at is null`).filter((row) => keepsZone(session, row.zone_id)).length
	};
}
async function adminComplaints(bearer) {
	const session = await requireOffice(bearer);
	if (!session) return deny();
	return {
		ok: true,
		rows: (await (await db())`
    select c.id, c.jhadu, c.nali, c.kooda, c.status, c.created_at, c.resolved_at, c.zone_id,
           i.code, z.name as zone_name
    from complaints c
    join inspectors i on i.id = c.inspector_id
    left join zones z on z.id = c.zone_id
    order by c.created_at desc
    limit 300
  `).filter((row) => keepsZone(session, row.zone_id)).map((row) => {
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
				code: row.code
			};
		})
	};
}
async function markComplaintsSeen(bearer) {
	const session = await requireOffice(bearer);
	if (!session) return deny();
	const sql = await db();
	const allowed = zoneIdsOf(session);
	if (!allowed) await sql`update complaints set seen_at = now() where seen_at is null`;
	else if (allowed.length) {
		const open = await sql`select id, zone_id from complaints where seen_at is null`;
		for (const row of open) if (row.zone_id != null && allowed.includes(row.zone_id)) await sql`update complaints set seen_at = now() where id = ${row.id}`;
	}
	return { ok: true };
}
async function listSubAdmins(bearer) {
	if (!await requireAdmin(bearer)) return deny();
	const sql = await db();
	const rows = await sql`select id, name, username, active, perm_attendance, perm_zone, perm_number, perm_staff, perm_councillor from sub_admins order by id`;
	const perms = await sql`select sub_admin_id, zone_id, perm from sub_admin_zones`;
	return {
		ok: true,
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
			zones: perms.filter((item) => item.sub_admin_id === row.id).map((item) => ({
				id: item.zone_id,
				perm: asLevel(item.perm)
			}))
		}))
	};
}
async function saveSubAdmin(bearer, input) {
	if (!await requireAdmin(bearer)) return deny();
	const name = input.name.trim();
	const username = input.username.trim().toUpperCase();
	if (!name || username.length < 3) return {
		ok: false,
		error: "name"
	};
	if (username === "ADMIN" || username === "PASSWORD") return {
		ok: false,
		error: "name"
	};
	const password = (input.password || "").trim();
	if (!input.id && password.length < 6) return {
		ok: false,
		error: "password"
	};
	if (password && password.length < 6) return {
		ok: false,
		error: "password"
	};
	const sql = await db();
	if ((await sql`select id from sub_admins where upper(username) = ${username} and id <> ${input.id ?? 0}`).length) return {
		ok: false,
		error: "name"
	};
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
		if (password) await sql`update sub_admins set password_hash = ${await hashPassword(password)} where id = ${id}`;
		if (!active) await sql`delete from app_sessions where sub_admin_id = ${id}`;
	} else id = (await sql`
      insert into sub_admins (name, username, password_hash, active, perm_attendance, perm_zone, perm_number, perm_staff, perm_councillor)
      values (${name}, ${username}, ${await hashPassword(password)}, ${active}, ${asLevel(input.attendance)}, ${asLevel(input.zone)}, ${asLevel(input.number)}, ${asLevel(input.staff)}, ${asLevel(input.councillor)})
      returning id
    `)[0].id;
	await sql`delete from sub_admin_zones where sub_admin_id = ${id}`;
	for (const zone of input.zones) {
		if (asLevel(zone.perm) === "none") continue;
		await sql`insert into sub_admin_zones (sub_admin_id, zone_id, perm) values (${id}, ${zone.id}, ${asLevel(zone.perm)})`;
	}
	return {
		ok: true,
		id
	};
}
async function resetSubPassword(bearer, input) {
	if (!await requireAdmin(bearer)) return deny();
	const password = input.password.trim();
	if (password.length < 6) return {
		ok: false,
		error: "password"
	};
	const sql = await db();
	await sql`update sub_admins set password_hash = ${await hashPassword(password)} where id = ${input.id}`;
	await sql`delete from app_sessions where sub_admin_id = ${input.id}`;
	return { ok: true };
}
async function removeSubAdmin(bearer, id) {
	if (!await requireAdmin(bearer)) return deny();
	await (await db())`delete from sub_admins where id = ${id}`;
	return { ok: true };
}
async function changeOwnPassword(bearer, input) {
	const session = await resolveSession(bearer);
	if (!session || session.role !== "subadmin") return deny();
	const next = input.next.trim();
	if (next.length < 6) return {
		ok: false,
		error: "password"
	};
	const sql = await db();
	const rows = await sql`select password_hash from sub_admins where id = ${session.subAdminId} and active = true`;
	if (!rows[0] || !await verifyPassword(input.current, rows[0].password_hash)) return {
		ok: false,
		error: "current"
	};
	await sql`update sub_admins set password_hash = ${await hashPassword(next)} where id = ${session.subAdminId}`;
	return { ok: true };
}
//#endregion
export { addStaff, adminComplaints, adminDashboard, adminLogin, assignNumber, attendanceView, changeAdminPassword, changeOwnPassword, complaintCount, dailyBoard, deleteInspector, deleteStaff, fileComplaint, getSession, inspectorHome, inspectorLogin, inspectorSessions, inspectorWise, listSubAdmins, liveFeed, logout, logoutInspector, markAbsent, markComplaintsSeen, metaLists, myComplaints, myReports, patchStaff, removeNumber, removeSubAdmin, replaceInspector, reportTable, resetSubPassword, saveCouncillor, saveStaffDay, saveSubAdmin, saveZone, staffBoard, staffDay, submitEntry, updateNumber, zoneDetail };
