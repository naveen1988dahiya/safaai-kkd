import { createMiddleware, createServerFn } from "@tanstack/react-start";

const TOKEN_KEY = "safai.session";
const ROLE_KEY = "safai.role";
const USER_KEY = "safai.user";
const YEAR = 60 * 60 * 24 * 180;

function writeClientCookie(name: string, value: string) {
  try {
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${YEAR}; samesite=lax`;
  } catch {
    /* ignore */
  }
}

function clearClientCookie(name: string) {
  try {
    document.cookie = `${name}=; path=/; max-age=0`;
  } catch {
    /* ignore */
  }
}

export function saveSession(token: string, role: "admin" | "inspector" | "subadmin", username?: string) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(ROLE_KEY, role);
    if (username) localStorage.setItem(USER_KEY, username);
  } catch {
    /* ignore */
  }
  writeClientCookie("safai_role", role);
  if (username) writeClientCookie("safai_user", username);
  void stampInstall();
}

async function stampInstall() {
  try {
    const id = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
    localStorage.setItem("safai.install", id);
    const cache = await caches.open("safai-install");
    await cache.put("/__safai_install", new Response(id));
  } catch {
    /* ignore */
  }
}

/** Cache is wiped on uninstall. If the login is left behind without it, require login again. */
export async function installStillValid(): Promise<"ok" | "logout" | "none"> {
  const token = readToken();
  if (!token) return "none";
  let mark = "";
  try {
    mark = localStorage.getItem("safai.install") ?? "";
  } catch {
    return "ok";
  }
  let cached = "";
  try {
    const cache = await caches.open("safai-install");
    const res = await cache.match("/__safai_install");
    cached = res ? (await res.text()).trim() : "";
  } catch {
    return "ok";
  }
  if (!mark && !cached) {
    await stampInstall();
    return "ok";
  }
  if (mark && cached && mark === cached) return "ok";
  return "logout";
}

export function saveToken(token: string) {
  saveSession(token, "inspector");
}

export function clearToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem("safai.inspectorProfile");
    localStorage.removeItem("safai.install");
  } catch {
    /* ignore */
  }
  clearClientCookie("safai_role");
  clearClientCookie("safai_user");
}

function readToken(): string {
  try {
    return localStorage.getItem(TOKEN_KEY) ?? "";
  } catch {
    return "";
  }
}

const withSession = createMiddleware({ type: "function" })
  .client(async ({ next }) => next({ sendContext: { token: readToken() } }))
  .server(async ({ next, context }) => next({ context: { token: context.token as string | undefined } }));

export const readBoot = createServerFn({ method: "GET" }).handler(async () => {
  const { getCookie } = await import("@tanstack/react-start/server");
  const role = getCookie("safai_role");
  let username = "ADMIN";
  try {
    username = decodeURIComponent(getCookie("safai_user") || "ADMIN");
  } catch {
    username = "ADMIN";
  }
  if (role === "admin" || role === "inspector" || role === "subadmin") return { role, username };
  return { role: null as null, username: "ADMIN" };
});

export const fetchSession = createServerFn({ method: "GET" })
  .middleware([withSession])
  .handler(async ({ context }) => {
    const { getSession } = await import("./logic.server");
    return getSession(context.token);
  });

export const loginAdmin = createServerFn({ method: "POST" })
  .validator((input: { username: string; password: string }) => ({
    username: String(input?.username ?? ""),
    password: String(input?.password ?? ""),
  }))
  .handler(async ({ data }) => {
    const { adminLogin } = await import("./logic.server");
    return adminLogin(data);
  });

export const loginInspector = createServerFn({ method: "POST" })
  .validator((input: { code: string; password: string; phone?: string }) => ({
    code: String(input?.code ?? ""),
    password: String(input?.password ?? ""),
    phone: String(input?.phone ?? "").trim().slice(0, 12),
  }))
  .handler(async ({ data }) => {
    const { inspectorLogin } = await import("./logic.server");
    return inspectorLogin(data);
  });

export const signOut = createServerFn({ method: "POST" })
  .middleware([withSession])
  .handler(async ({ context }) => {
    const { logout } = await import("./logic.server");
    return logout(context.token);
  });

export const updateAdminPassword = createServerFn({ method: "POST" })
  .middleware([withSession])
  .validator((input: { current: string; next: string }) => ({
    current: String(input?.current ?? ""),
    next: String(input?.next ?? ""),
  }))
  .handler(async ({ data, context }) => {
    const { changeAdminPassword } = await import("./logic.server");
    return changeAdminPassword(context.token, data);
  });

export const loadInspectorHome = createServerFn({ method: "GET" })
  .middleware([withSession])
  .handler(async ({ context }) => {
    const { inspectorHome } = await import("./logic.server");
    return inspectorHome(context.token);
  });

export const sendEntry = createServerFn({ method: "POST" })
  .middleware([withSession])
  .validator((input: { number: number; jhadu: boolean; nali: boolean; kooda: boolean; score: number }) => input)
  .handler(async ({ data, context }) => {
    const { submitEntry } = await import("./logic.server");
    return submitEntry(context.token, data);
  });

export const loadMyReports = createServerFn({ method: "POST" })
  .middleware([withSession])
  .validator((input: { from: string; to: string }) => input)
  .handler(async ({ data, context }) => {
    const { myReports } = await import("./logic.server");
    return myReports(context.token, data);
  });

export const loadDashboard = createServerFn({ method: "GET" })
  .middleware([withSession])
  .handler(async ({ context }) => {
    const { adminDashboard } = await import("./logic.server");
    return adminDashboard(context.token);
  });

export const loadZones = createServerFn({ method: "GET" })
  .middleware([withSession])
  .handler(async ({ context }) => {
    const { zoneDetail } = await import("./logic.server");
    return zoneDetail(context.token);
  });

export const saveZoneFn = createServerFn({ method: "POST" })
  .middleware([withSession])
  .validator((input: {
    id?: number;
    name: string;
    wards: number[];
    supervisorName: string;
    supervisorMobile: string;
    inspectors: { id?: number; code: string; name: string; mobile: string; wardNo: number | null }[];
  }) => input)
  .handler(async ({ data, context }) => {
    const { saveZone } = await import("./logic.server");
    return saveZone(context.token, data);
  });

export const inspectorSessionsFn = createServerFn({ method: "POST" })
  .middleware([withSession])
  .validator((id: number) => Number(id))
  .handler(async ({ data, context }) => {
    const { inspectorSessions } = await import("./logic.server");
    return inspectorSessions(context.token, data);
  });

export const logoutInspectorFn = createServerFn({ method: "POST" })
  .middleware([withSession])
  .validator((input: { inspectorId: number; sessionId: string }) => ({
    inspectorId: Number(input?.inspectorId),
    sessionId: String(input?.sessionId ?? ""),
  }))
  .handler(async ({ data, context }) => {
    const { logoutInspector } = await import("./logic.server");
    return logoutInspector(context.token, data);
  });

export const replaceInspectorFn = createServerFn({ method: "POST" })
  .middleware([withSession])
  .validator((input: { inspectorId: number; name: string; mobile: string }) => input)
  .handler(async ({ data, context }) => {
    const { replaceInspector } = await import("./logic.server");
    return replaceInspector(context.token, data);
  });

export const deleteInspectorFn = createServerFn({ method: "POST" })
  .middleware([withSession])
  .validator((id: number) => Number(id))
  .handler(async ({ data, context }) => {
    const { deleteInspector } = await import("./logic.server");
    return deleteInspector(context.token, data);
  });

export const saveCouncillorFn = createServerFn({ method: "POST" })
  .middleware([withSession])
  .validator((input: { wardNo: number; name: string; photo: string | null }) => input)
  .handler(async ({ data, context }) => {
    const { saveCouncillor } = await import("./logic.server");
    return saveCouncillor(context.token, data);
  });

export const loadNumbers = createServerFn({ method: "GET" })
  .middleware([withSession])
  .handler(async ({ context }) => {
    const { dailyBoard } = await import("./logic.server");
    return dailyBoard(context.token);
  });

export const assignNumberFn = createServerFn({ method: "POST" })
  .middleware([withSession])
  .validator((input: { zoneId: number | "all"; number: number }) => ({
    zoneId: input?.zoneId === "all" ? ("all" as const) : Number(input?.zoneId),
    number: Number(input?.number),
  }))
  .handler(async ({ data, context }) => {
    const { assignNumber } = await import("./logic.server");
    return assignNumber(context.token, data);
  });

export const removeNumberFn = createServerFn({ method: "POST" })
  .middleware([withSession])
  .validator((id: number) => Number(id))
  .handler(async ({ data, context }) => {
    const { removeNumber } = await import("./logic.server");
    return removeNumber(context.token, data);
  });

export const updateNumberFn = createServerFn({ method: "POST" })
  .middleware([withSession])
  .validator((input: { id: number; number: number }) => input)
  .handler(async ({ data, context }) => {
    const { updateNumber } = await import("./logic.server");
    return updateNumber(context.token, data);
  });

export const loadLive = createServerFn({ method: "POST" })
  .middleware([withSession])
  .validator((input: { date: string; zoneId: number | null }) => input)
  .handler(async ({ data, context }) => {
    const { liveFeed } = await import("./logic.server");
    return liveFeed(context.token, data);
  });

export const loadReport = createServerFn({ method: "POST" })
  .middleware([withSession])
  .validator((input: { from: string; to: string; ward: number | null; zoneId: number | null }) => input)
  .handler(async ({ data, context }) => {
    const { reportTable } = await import("./logic.server");
    return reportTable(context.token, data);
  });

export const loadInspectorReport = createServerFn({ method: "POST" })
  .middleware([withSession])
  .validator((input: { from: string; to: string; zoneId: number | null; inspectorId: number | null }) => input)
  .handler(async ({ data, context }) => {
    const { inspectorWise } = await import("./logic.server");
    return inspectorWise(context.token, data);
  });

export const loadStaffDay = createServerFn({ method: "POST" })
  .middleware([withSession])
  .validator((input: { date: string }) => ({ date: String(input?.date ?? "") }))
  .handler(async ({ data, context }) => {
    const { staffDay } = await import("./logic.server");
    return staffDay(context.token, data.date);
  });

export const saveStaffDay = createServerFn({ method: "POST" })
  .middleware([withSession])
  .validator((input: { date: string; rows: { id: number; present: boolean; zoneId: number | null }[] }) => ({
    date: String(input?.date ?? ""),
    rows: Array.isArray(input?.rows) ? input.rows.map((row) => ({ id: Number(row.id), present: !!row.present, zoneId: row.zoneId == null ? null : Number(row.zoneId) })) : [],
  }))
  .handler(async ({ data, context }) => {
    const { saveStaffDay: save } = await import("./logic.server");
    return save(context.token, data);
  });

export const loadAttendanceView = createServerFn({ method: "GET" })
  .middleware([withSession])
  .handler(async ({ context }) => {
    const { attendanceView } = await import("./logic.server");
    return attendanceView(context.token);
  });

export const loadStaff = createServerFn({ method: "GET" })
  .middleware([withSession])
  .handler(async ({ context }) => {
    const { staffBoard } = await import("./logic.server");
    return staffBoard(context.token);
  });

export const addStaffFn = createServerFn({ method: "POST" })
  .middleware([withSession])
  .validator((input: { name: string; mobile: string; role: string }) => input)
  .handler(async ({ data, context }) => {
    const { addStaff } = await import("./logic.server");
    return addStaff(context.token, data);
  });

export const patchStaffFn = createServerFn({ method: "POST" })
  .middleware([withSession])
  .validator((input: { id: number; zoneId: number | null; present: boolean | null }) => input)
  .handler(async ({ data, context }) => {
    const { patchStaff } = await import("./logic.server");
    return patchStaff(context.token, data);
  });

export const deleteStaffFn = createServerFn({ method: "POST" })
  .middleware([withSession])
  .validator((id: number) => Number(id))
  .handler(async ({ data, context }) => {
    const { deleteStaff } = await import("./logic.server");
    return deleteStaff(context.token, data);
  });

export const markAbsentFn = createServerFn({ method: "POST" })
  .middleware([withSession])
  .validator((input: { inspectorId: number; date: string; jhadu: boolean; nali: boolean; kooda: boolean; score: number }) => ({
    inspectorId: Number(input?.inspectorId),
    date: String(input?.date ?? ""),
    jhadu: Boolean(input?.jhadu),
    nali: Boolean(input?.nali),
    kooda: Boolean(input?.kooda),
    score: Number(input?.score),
  }))
  .handler(async ({ data, context }) => {
    const { markAbsent } = await import("./logic.server");
    return markAbsent(context.token, data);
  });

export const loadMeta = createServerFn({ method: "GET" })
  .middleware([withSession])
  .handler(async ({ context }) => {
    const { metaLists } = await import("./logic.server");
    return metaLists(context.token);
  });

export const fileComplaint = createServerFn({ method: "POST" })
  .middleware([withSession])
  .validator((input: { jhadu: boolean; nali: boolean; kooda: boolean }) => ({
    jhadu: Boolean(input?.jhadu),
    nali: Boolean(input?.nali),
    kooda: Boolean(input?.kooda),
  }))
  .handler(async ({ data, context }) => {
    const { fileComplaint } = await import("./logic.server");
    return fileComplaint(context.token, data);
  });

export const loadMyComplaints = createServerFn({ method: "GET" })
  .middleware([withSession])
  .handler(async ({ context }) => {
    const { myComplaints } = await import("./logic.server");
    return myComplaints(context.token);
  });

export const loadComplaintCount = createServerFn({ method: "GET" })
  .middleware([withSession])
  .handler(async ({ context }) => {
    const { complaintCount } = await import("./logic.server");
    return complaintCount(context.token);
  });

export const loadComplaints = createServerFn({ method: "GET" })
  .middleware([withSession])
  .handler(async ({ context }) => {
    const { adminComplaints } = await import("./logic.server");
    return adminComplaints(context.token);
  });

export const markComplaintsSeen = createServerFn({ method: "POST" })
  .middleware([withSession])
  .handler(async ({ context }) => {
    const { markComplaintsSeen } = await import("./logic.server");
    return markComplaintsSeen(context.token);
  });

type LevelIn = "edit" | "view" | "none";

function asLevelIn(value: unknown): LevelIn {
  return value === "edit" || value === "view" ? value : "none";
}

export const listSubAdminsFn = createServerFn({ method: "GET" })
  .middleware([withSession])
  .handler(async ({ context }) => {
    const { listSubAdmins } = await import("./logic.server");
    return listSubAdmins(context.token);
  });

export const saveSubAdminFn = createServerFn({ method: "POST" })
  .middleware([withSession])
  .validator((input: {
    id?: number;
    name: string;
    username: string;
    password?: string;
    active?: boolean;
    attendance: LevelIn;
    zone: LevelIn;
    number: LevelIn;
    staff: LevelIn;
    councillor: LevelIn;
    zones: { id: number; perm: LevelIn }[];
  }) => ({
    id: input?.id ? Number(input.id) : undefined,
    name: String(input?.name ?? ""),
    username: String(input?.username ?? ""),
    password: String(input?.password ?? ""),
    active: input?.active !== false,
    attendance: asLevelIn(input?.attendance),
    zone: asLevelIn(input?.zone),
    number: asLevelIn(input?.number),
    staff: asLevelIn(input?.staff),
    councillor: asLevelIn(input?.councillor),
    zones: Array.isArray(input?.zones) ? input.zones.map((z) => ({ id: Number(z.id), perm: asLevelIn(z.perm) })) : [],
  }))
  .handler(async ({ data, context }) => {
    const { saveSubAdmin } = await import("./logic.server");
    return saveSubAdmin(context.token, data);
  });

export const resetSubPasswordFn = createServerFn({ method: "POST" })
  .middleware([withSession])
  .validator((input: { id: number; password: string }) => ({
    id: Number(input?.id),
    password: String(input?.password ?? ""),
  }))
  .handler(async ({ data, context }) => {
    const { resetSubPassword } = await import("./logic.server");
    return resetSubPassword(context.token, data);
  });

export const removeSubAdminFn = createServerFn({ method: "POST" })
  .middleware([withSession])
  .validator((id: number) => Number(id))
  .handler(async ({ data, context }) => {
    const { removeSubAdmin } = await import("./logic.server");
    return removeSubAdmin(context.token, data);
  });

export const changeOwnPasswordFn = createServerFn({ method: "POST" })
  .middleware([withSession])
  .validator((input: { current: string; next: string }) => ({
    current: String(input?.current ?? ""),
    next: String(input?.next ?? ""),
  }))
  .handler(async ({ data, context }) => {
    const { changeOwnPassword } = await import("./logic.server");
    return changeOwnPassword(context.token, data);
  });
