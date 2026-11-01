import { useEffect, useMemo, useState, createContext, useContext } from "react";
import {
  BarChart3,
  Bell,
  Eye,
  EyeOff,
  Hash,
  Home,
  KeyRound,
  Lock,
  LogOut,
  Pencil,
  Printer,
  Trash2,
  UserPlus,
  UserRound,
  Users,
  MapPin,
  X,
} from "lucide-react";
import {
  addStaffFn,
  assignNumberFn,
  changeOwnPasswordFn,
  deleteInspectorFn,
  deleteStaffFn,
  listSubAdminsFn,
  loadAttendanceView,
  loadComplaintCount,
  loadComplaints,
  loadDashboard,
  loadInspectorReport,
  loadLive,
  loadMeta,
  loadNumbers,
  loadReport,
  loadStaffDay,
  loadZones,
  logoutInspectorFn,
  inspectorSessionsFn,
  markAbsentFn,
  markComplaintsSeen,
  removeNumberFn,
  removeSubAdminFn,
  replaceInspectorFn,
  resetSubPasswordFn,
  saveCouncillorFn,
  saveStaffDay,
  saveSubAdminFn,
  saveZoneFn,
  signOut,
  updateAdminPassword,
  updateNumberFn,
  clearToken,
} from "@/lib/safai/api";
import { dmy, istNow, monthStart, score2, weekStart } from "@/lib/safai/format";
import { downloadPdf, printTable } from "./print";

type Lang = "en" | "hi";
type Level = "edit" | "view" | "none";

export type Office = {
  role: "admin" | "subadmin";
  name: string;
  username: string;
  attendance: Level;
  zone: Level;
  number: Level;
  staff: Level;
  councillor: Level;
  zones: { id: number; perm: Level }[];
};

const OfficeCtx = createContext<Office>({
  role: "admin",
  name: "Admin",
  username: "ADMIN",
  attendance: "edit",
  zone: "edit",
  number: "edit",
  staff: "edit",
  councillor: "edit",
  zones: [],
});

function useOffice() {
  return useContext(OfficeCtx);
}

function zoneLv(office: Office, id: number): Level {
  if (office.role === "admin") return "edit";
  return office.zones.find((z) => z.id === id)?.perm ?? "none";
}

function zonesLocked(office: Office) {
  return office.role === "subadmin" && office.zones.every((z) => z.perm === "none");
}

function tx(lang: Lang, en: string, hi: string) {
  return lang === "hi" ? hi : en;
}

function denied(res: unknown): boolean {
  return !!res && typeof res === "object" && "ok" in res && (res as { ok: boolean }).ok === false && "unauthorized" in res;
}

function workClass(n: number) {
  if (n >= 80) return "text-emerald-300";
  if (n >= 60) return "text-amber-300";
  return "text-red-300";
}

async function circlePhoto(file: File): Promise<string> {
  const bmp = await createImageBitmap(file);
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.clip();
  const side = Math.min(bmp.width, bmp.height);
  ctx.drawImage(bmp, (bmp.width - side) / 2, (bmp.height - side) / 2, side, side, 0, 0, size, size);
  return canvas.toDataURL("image/jpeg", 0.82);
}

export function AdminApp({
  lang,
  username,
  office,
  onLang,
  onLogout,
}: {
  lang: Lang;
  username: string;
  office: Office;
  onLang: (lang: Lang) => void;
  onLogout: () => void;
}) {
  const [tab, setTab] = useState<"home" | "zones" | "reports" | "staff">("home");
  const [screen, setScreen] = useState<"main" | "assign" | "iReport" | "subs" | "pass">("main");
  const [profile, setProfile] = useState(false);
  const [bell, setBell] = useState(false);
  const [focusZone, setFocusZone] = useState<number | null>(null);
  const navLock = zonesLocked(office);

  async function logout() {
    await signOut();
    clearToken();
    onLogout();
  }

  return (
    <OfficeCtx.Provider value={office}>
    <div className={`mx-auto flex min-h-dvh w-full max-w-[430px] flex-col overflow-x-hidden bg-night text-night-fg ${bell ? "h-dvh overflow-hidden" : ""}`}>
      <div className="flex-1 pb-24">
        {screen === "assign" ? (
          <AssignScreen lang={lang} onBack={() => setScreen("main")} />
        ) : screen === "iReport" ? (
          <InspectorReport lang={lang} onBack={() => setScreen("main")} />
        ) : screen === "subs" ? (
          <SubAdmins lang={lang} onBack={() => setScreen("main")} />
        ) : screen === "pass" ? (
          <OwnPassword lang={lang} onBack={() => setScreen("main")} />
        ) : tab === "home" ? (
          <HomeScreen
            lang={lang}
            onAssign={() => setScreen("assign")}
            onZone={(id) => {
              setFocusZone(id);
              setTab("zones");
            }}
            onBell={() => setBell(true)}
          />
        ) : tab === "zones" ? (
          <ZonesScreen lang={lang} focusZone={focusZone} onBell={() => setBell(true)} />
        ) : tab === "reports" ? (
          <ReportsScreen lang={lang} onInspectors={() => setScreen("iReport")} onBell={() => setBell(true)} />
        ) : (
          <StaffScreen lang={lang} onBell={() => setBell(true)} />
        )}
      </div>
      <nav className="fixed bottom-0 left-1/2 z-30 grid w-full max-w-[430px] -translate-x-1/2 grid-cols-5 border-t border-night-line bg-night-2 px-1 py-2 text-[11px]">
        <Tab icon={<Home className="h-5 w-5" />} label={tx(lang, "Home", "होम")} on={tab === "home" && screen === "main" && !bell} onClick={() => { setBell(false); setTab("home"); setScreen("main"); }} />
        <Tab icon={<span className="relative"><MapPin className="h-5 w-5" />{navLock ? <Lock className="absolute -top-1 -right-2 h-3 w-3 text-amber-300" /> : null}</span>} label={tx(lang, "Zones", "ज़ोन")} on={tab === "zones" && screen === "main" && !bell} onClick={() => { setBell(false); setTab("zones"); setScreen("main"); }} />
        <Tab icon={<BarChart3 className="h-5 w-5" />} label={tx(lang, "Reports", "रिपोर्ट")} on={tab === "reports" && screen === "main" && !bell} onClick={() => { setBell(false); setTab("reports"); setScreen("main"); }} />
        <Tab icon={<Users className="h-5 w-5" />} label={tx(lang, "Staff", "स्टाफ")} on={tab === "staff" && screen === "main" && !bell} onClick={() => { setBell(false); setTab("staff"); setScreen("main"); }} />
        <Tab icon={<UserRound className="h-5 w-5" />} label={tx(lang, "Profile", "प्रोफ़ाइल")} on={profile} onClick={() => { setBell(false); setProfile(true); }} />
      </nav>
      {profile ? (
        <ProfileSheet
          lang={lang}
          username={username}
          onLang={onLang}
          onClose={() => setProfile(false)}
          onLogout={() => void logout()}
          onSubs={() => { setProfile(false); setScreen("subs"); }}
          onPassword={() => { setProfile(false); setScreen("pass"); }}
        />
      ) : null}
      {bell ? <ComplaintsScreen lang={lang} onBack={() => setBell(false)} /> : null}
    </div>
    </OfficeCtx.Provider>
  );
}

function BellButton({ onClick, box = "h-10 w-10 rounded-full bg-night-3" }: { onClick: () => void; box?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let stop = false;
    const pull = () => {
      void loadComplaintCount().then((res) => {
        if (!stop && res.ok) setN(res.unseen);
      });
    };
    const seen = () => setN(0);
    pull();
    const id = setInterval(pull, 8000);
    window.addEventListener("safai-complaints-seen", seen);
    return () => {
      stop = true;
      clearInterval(id);
      window.removeEventListener("safai-complaints-seen", seen);
    };
  }, []);
  return (
    <button type="button" onClick={onClick} className={`relative grid shrink-0 place-items-center ${box}`}>
      <Bell className="h-5 w-5" />
      {n > 0 ? (
        <span className="absolute -top-1 -right-1 min-w-[1.15rem] rounded-full bg-red-600 px-1 text-center text-[10px] font-extrabold leading-4 text-white">
          {n > 99 ? "99+" : n}
        </span>
      ) : null}
    </button>
  );
}

function shortType(row: { jhadu: boolean; nali: boolean; kooda: boolean }) {
  return [row.jhadu ? "झाड़ू" : "", row.nali ? "नाली" : "", row.kooda ? "कूड़ा" : ""].filter(Boolean).join("+");
}

function ComplaintsScreen({ lang, onBack }: { lang: Lang; onBack: () => void }) {
  const [rows, setRows] = useState<{ id: number; jhadu: boolean; nali: boolean; kooda: boolean; done: boolean; doc: string; dos: string; zone: string; code: string }[]>([]);
  useEffect(() => {
    void markComplaintsSeen().then(() => {
      window.dispatchEvent(new Event("safai-complaints-seen"));
      return loadComplaints();
    }).then((res) => {
      if (res?.ok) setRows(res.rows);
    });
  }, []);
  return (
    <div className="fixed inset-0 z-20 mx-auto flex w-full max-w-[430px] flex-col bg-night text-night-fg">
      <div className="px-4 pt-4">
        <button type="button" onClick={onBack} className="text-sm font-bold text-accent">← {tx(lang, "Back", "वापस")}</button>
        <h1 className="mt-2 text-2xl font-extrabold">{tx(lang, "Complaints", "शिकायतें")}</h1>
      </div>
      <div className="mt-3 flex-1 overflow-y-auto overscroll-contain px-2 pb-24">
        <table className="w-full table-fixed text-[10px]">
          <thead className="sticky top-0 bg-night text-night-muted">
            <tr>
              <th className="w-[24%] px-1 py-2 text-left font-semibold">DOC</th>
              <th className="w-[18%] text-left font-semibold">Type</th>
              <th className="w-[16%] text-left font-semibold">Zone</th>
              <th className="w-[12%] text-left font-semibold">Code</th>
              <th className="w-[16%] text-left font-semibold">Status</th>
              <th className="w-[14%] pr-1 text-right font-semibold">DOS</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={6} className="px-2 py-8 text-center text-sm text-night-muted">{tx(lang, "No complaints yet.", "अभी कोई शिकायत नहीं।")}</td></tr>
            ) : rows.map((row) => (
              <tr key={row.id} className="border-t border-white/10">
                <td className="truncate px-1 py-2">{row.doc}</td>
                <td className="truncate py-2">{shortType(row)}</td>
                <td className="truncate py-2">{zoneLabel(row.zone)}</td>
                <td className="truncate py-2">{row.code}</td>
                <td className={`py-2 font-extrabold ${row.done ? "text-emerald-400" : "text-red-400"}`}>{row.done ? "done" : "pending"}</td>
                <td className="truncate pr-1 py-2 text-right">{row.dos === "—" ? "—" : row.dos.slice(0, 5)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Tab({ icon, label, on, onClick }: { icon: React.ReactNode; label: string; on: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`grid place-items-center gap-1 ${on ? "text-accent" : "text-night-muted"}`}>
      {icon}
      {label}
    </button>
  );
}

function Top({ title, sub, onBell }: { title: string; sub?: string; onBell: () => void }) {
  return (
    <div className="flex items-start justify-between px-4 pt-4">
      <div>
        <h1 className="text-2xl font-extrabold">{title}</h1>
        {sub ? <p className="text-sm text-night-muted">{sub}</p> : null}
      </div>
      <BellButton onClick={onBell} />
    </div>
  );
}

function HomeScreen({ lang, onAssign, onZone, onBell }: { lang: Lang; onAssign: () => void; onZone: (id: number) => void; onBell: () => void }) {
  const office = useOffice();
  const [data, setData] = useState<Awaited<ReturnType<typeof loadDashboard>> | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const pull = () => {
      void loadDashboard()
        .then((res) => {
          setData(res);
          setFailed(false);
        })
        .catch(() => setFailed(true));
    };
    pull();
    const id = setInterval(pull, 4000);
    return () => clearInterval(id);
  }, []);
  if (failed && !data?.ok) {
    return <p className="p-6 text-night-muted">{tx(lang, "Could not load. Check the connection and open the app again.", "लोड नहीं हुआ। कनेक्शन जाँचकर ऐप फिर खोलें।")}</p>;
  }
  if (!data || !data.ok) {
    return <p className="p-6 text-night-muted">{tx(lang, "Loading…", "लोड हो रहा है…")}</p>;
  }
  const sub = office.role === "subadmin";
  const noZones = sub && data.zones.length === 0;
  const initial = (sub ? office.name : "A").trim().charAt(0).toUpperCase() || "A";
  const zoneHint = data.zones.map((z) => zoneLabel(z.name)).join(" + ");
  const inspHint = data.zones.map((z) => `${zoneLabel(z.name)} (${z.inspectors})`).join(" + ");
  return (
    <div>
      <div className="flex items-center gap-3 px-4 pt-4">
        <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl font-extrabold text-white ${sub ? "bg-[#3b82f6]" : "bg-[#3b82f6]"}`}>{initial}</div>
        <div className="min-w-0 flex-1">
          <h1 className="text-[22px] font-extrabold leading-tight">{sub ? `Sub Admin · ${office.name.split(" ")[0]}` : tx(lang, "Admin Dashboard", "एडमिन डैशबोर्ड")}</h1>
          <p className="text-sm text-night-muted">{sub ? `Sub Admin · ${office.username}` : tx(lang, "Admin · Councillor", "एडमिन · पार्षद")} · {data.dateLabel}</p>
        </div>
        <BellButton onClick={onBell} box="h-11 w-11 rounded-2xl bg-night-3" />
      </div>
      <div className="grid grid-cols-2 gap-3 px-4 pt-4">
        <Stat className="dash-zones" value={String(data.zoneCount)} label={tx(lang, "Total Zones", "कुल ज़ोन")} hint={sub && zoneHint ? zoneHint : undefined} lock={noZones} />
        <Stat className="dash-insp" value={String(data.inspectorCount)} label={tx(lang, "Total Inspectors", "कुल निरीक्षक")} hint={sub && inspHint ? inspHint : undefined} lock={noZones} />
        <div className="dash-reports rounded-[22px] p-4 text-white">
          <div className="flex items-center gap-2">
            <div className="text-[34px] font-extrabold leading-none">{data.monthReports}</div>
            <span className="rounded-full bg-black/25 px-2 py-0.5 text-xs font-bold">{Number(data.monthPct).toFixed(1)}%</span>
          </div>
          <div className="mt-2 text-sm font-semibold leading-snug">{tx(lang, `Reports This Month (${data.monthLabel})`, `इस महीने की रिपोर्ट (${data.monthLabel})`)}</div>
        </div>
        <Stat className="dash-avg" value={`${data.avg == null ? "—" : score2(data.avg)} ★`} label={tx(lang, `Avg Score This Month (${data.monthLabel})`, `इस महीने का औसत (${data.monthLabel})`)} />
      </div>
      {office.number === "none" ? null : (
        <button type="button" onClick={onAssign} className="dash-assign mx-4 mt-3 flex w-[calc(100%-2rem)] items-center gap-3 rounded-[22px] px-3 py-3 text-left text-white">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/25 text-xl font-extrabold"><Hash className="h-6 w-6" /></span>
          <span className="min-w-0 flex-1">
            <span className="block text-lg font-extrabold leading-tight">{tx(lang, "Assign Today's Number", "आज का नंबर दें")}</span>
            <span className="text-sm font-semibold opacity-90">{tx(lang, "For all zones", "सभी ज़ोन के लिए")} · {data.dateLabel}</span>
          </span>
          {office.number === "view" ? <span className="rounded-full bg-white/25 px-2 py-1 text-[11px] font-bold">View only</span> : null}
          <span className="text-2xl font-bold opacity-90">›</span>
        </button>
      )}
      <div className="px-4 pt-5">
        {noZones ? (
          <p className="flex items-center justify-center gap-2 rounded-2xl bg-night-3 px-4 py-4 text-sm text-night-muted"><Lock className="h-4 w-4 text-amber-300" /> किसी भी zone की permission नहीं है</p>
        ) : (
          <>
        <h2 className="text-lg font-extrabold">{tx(lang, "Zone List", "ज़ोन सूची")}</h2>
        <p className="mt-1 text-xs leading-relaxed text-night-muted">
          {tx(lang, "This Month % = reports ÷ (inspectors × days in month)", "इस महीने % = रिपोर्ट ÷ (निरीक्षक × महीने के दिन)")}
          {" · "}
          <span className="font-bold text-emerald-400">60%+</span>
          {" · "}
          <span className="font-bold text-red-400">{tx(lang, "below 60%", "60% से कम")}</span>
        </p>
        {data.zones.length === 0 ? (
          <p className="mt-4 rounded-2xl bg-night-3 p-4 text-sm text-night-muted">{tx(lang, "No zones yet. Add one from the Zones tab.", "अभी कोई ज़ोन नहीं। ज़ोन टैब से जोड़ें।")}</p>
        ) : (
          data.zones.map((z) => {
            const lv = zoneLv(office, z.id);
            return (
            <article key={z.id} className="mt-3 rounded-[22px] border border-white/5 bg-[#17142e] p-3.5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-lg font-extrabold">
                    {zoneLabel(z.name)}{" "}
                    <span className="ml-1 rounded-full bg-emerald-300 px-2 py-0.5 align-middle text-[11px] font-bold text-emerald-950">{tx(lang, "Active", "सक्रिय")}</span>
                  </div>
                  <p className="mt-1 text-[13px] text-night-muted">
                    {z.wards.length ? `${tx(lang, "Ward No", "वार्ड नं.")} ${z.wards.join(" & ")}` : tx(lang, "No ward", "वार्ड नहीं")}
                    {" · "}
                    {tx(lang, "Supervisor", "सुपरवाइज़र")}: {z.supervisor || "—"}
                    {" · "}
                    {z.inspectors} {tx(lang, "Inspectors", "निरीक्षक")}
                  </p>
                </div>
                {lv === "view" ? (
                  <span className="rounded-full bg-[#2a2748] px-2 py-1 text-[11px] font-bold text-slate-200">View only</span>
                ) : (
                  <button type="button" onClick={() => onZone(z.id)} aria-label="edit"><Pencil className="h-4 w-4 text-amber-300" /></button>
                )}
              </div>
              <div className="mt-3 grid grid-cols-4 gap-1.5 text-center text-xs">
                <Mini k={tx(lang, "Total", "कुल")} v={String(z.total)} />
                <Mini k={tx(lang, "This Month", "इस महीने")} v={String(z.month)} chip={`${z.monthPct}%`} good={z.monthPct >= 60} />
                <Mini k={tx(lang, "Avg", "औसत")} v={`${z.avg == null ? "—" : score2(z.avg)} ★`} />
                <button type="button" onClick={() => onZone(z.id)} className="rounded-2xl bg-[#12101f] px-1 py-2">
                  <div className="text-[10px] text-night-muted">{tx(lang, "View Details", "विवरण")}</div>
                  <div className="text-lg font-bold leading-none text-white">›</div>
                </button>
              </div>
            </article>
            );
          })
        )}
          </>
        )}
      </div>
    </div>
  );
}

function Stat({ className, value, label, hint, lock }: { className: string; value: string; label: string; hint?: string; lock?: boolean }) {
  return (
    <div className={`${className} rounded-[22px] p-4 text-white`}>
      {lock ? <Lock className="h-8 w-8 text-amber-200" /> : <div className="text-[34px] font-extrabold leading-none">{value}</div>}
      <div className="mt-2 text-sm font-semibold leading-snug">{label}</div>
      {hint ? <div className="mt-1 text-[11px] font-semibold leading-snug opacity-90">{hint}</div> : null}
    </div>
  );
}

function Mini({ k, v, chip, good }: { k: string; v: string; chip?: string; good?: boolean }) {
  return (
    <div className="rounded-2xl bg-[#12101f] px-1 py-2">
      <div className="text-xs text-night-muted">{k}</div>
      <div className="font-extrabold">
        {v} {chip ? <span className={`ml-1 rounded-full px-1.5 text-[10px] ${good ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"}`}>{chip}</span> : null}
      </div>
    </div>
  );
}

function AssignScreen({ lang, onBack }: { lang: Lang; onBack: () => void }) {
  const office = useOffice();
  const canEdit = office.number === "edit";
  const [board, setBoard] = useState<Awaited<ReturnType<typeof loadNumbers>> | null>(null);
  const [zoneId, setZoneId] = useState<number | "all" | "">("");
  const [number, setNumber] = useState("");
  const [msg, setMsg] = useState("");
  const [edit, setEdit] = useState<{ id: number; number: string } | null>(null);
  const [confirmNumber, setConfirmNumber] = useState<number | null>(null);

  async function pull() {
    const res = await loadNumbers();
    setBoard(res);
    if (res.ok && res.today[0] && zoneId === "") setZoneId("all");
  }
  useEffect(() => {
    void pull();
  }, []);

  async function assign() {
    if (!board?.ok || zoneId === "") return;
    const res = await assignNumberFn({ data: { zoneId: zoneId === "all" ? "all" : Number(zoneId), number: Number(number) } });
    if (!res.ok) setMsg("error" in res && res.error === "duplicate" ? tx(lang, "This number is already on that zone today.", "यह नंबर आज इस ज़ोन पर पहले से है।") : tx(lang, "Enter a number from 1 to 999.", "1 से 999 के बीच नंबर डालें।"));
    else {
      setMsg("");
      setNumber("");
      await pull();
    }
  }

  if (!board?.ok) return <p className="p-6">{tx(lang, "Loading…", "लोड हो रहा है…")}</p>;
  return (
    <div className="px-4 pt-4">
      <button type="button" onClick={onBack} className="text-sm font-bold text-accent">← {tx(lang, "Home", "होम")}</button>
      <div className="mt-2 flex items-start justify-between gap-2">
        <h1 className="text-2xl font-extrabold">{tx(lang, "Assign Today's Number", "आज का नंबर दें")}</h1>
        {canEdit ? null : <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-1 text-[11px] font-bold text-white"><Lock className="h-3 w-3" /> View only</span>}
      </div>
      <p className="text-sm text-night-muted">{tx(lang, "Usually 1 number per zone per day", "आमतौर पर एक ज़ोन पर दिन में एक नंबर")}</p>
      <label className="mt-4 block text-sm text-night-muted">{tx(lang, "Date (auto)", "तारीख (अपने आप)")}</label>
      <div className="mt-1 rounded-2xl border border-night-line bg-night-3 px-4 py-3">{board.dateLabel} 🔒</div>
      <label className="mt-3 block text-sm text-night-muted">{tx(lang, "Select Zone", "ज़ोन चुनें")}</label>
      <div className="relative">
        <select
          value={zoneId}
          disabled={!canEdit}
          onChange={(e) => setZoneId(e.target.value === "all" ? "all" : Number(e.target.value))}
          className={`mt-1 w-full rounded-2xl px-4 py-3 font-bold ${canEdit ? "border-2 border-accent bg-accent/20 ring-4 ring-accent/30" : "border border-night-line bg-night-3 pr-10 opacity-80"}`}
        >
          {board.today.length === 0 ? <option value="">{tx(lang, "Add a zone first", "पहले ज़ोन जोड़ें")}</option> : null}
          {board.today.length > 0 ? <option value="all">{tx(lang, "All zones", "सभी ज़ोन")}</option> : null}
          {board.today.map((z) => (
            <option key={z.id} value={z.id}>{zoneLabel(z.name)}{z.wards.length ? ` · Ward ${z.wards.join(" & ")}` : ""}</option>
          ))}
        </select>
        {canEdit ? null : <Lock className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-amber-300" />}
      </div>
      <div className="mt-3 flex gap-2">
        <input inputMode="numeric" disabled={!canEdit} value={number} onChange={(e) => setNumber(e.target.value.replace(/\D/g, "").slice(0, 3))} placeholder={tx(lang, "Number (1–999)", "नंबर (1–999)")} className="flex-1 rounded-2xl border border-night-line bg-night-3 px-4 py-3 disabled:opacity-60" />
        {canEdit ? (
          <button type="button" onClick={() => void assign()} className="rounded-2xl bg-accent px-4 font-bold">+ {tx(lang, "Assign", "जोड़ें")}</button>
        ) : (
          <button type="button" disabled className="inline-flex items-center gap-1 rounded-2xl bg-night-3 px-4 font-bold text-slate-400"><Lock className="h-3.5 w-3.5 text-amber-300" /> {tx(lang, "Assign", "जोड़ें")}</button>
        )}
      </div>
      {msg ? <p className="mt-2 text-sm text-red-300">{msg}</p> : null}
      <p className="mt-3 text-xs text-night-muted">{tx(lang, "Same number can be used in another zone. It cannot repeat inside one zone on the same day.", "दूसरे ज़ोन में वही नंबर चल सकता है। एक ज़ोन में उसी दिन दोहरा नहीं सकते।")}</p>
      <h2 className="mt-5 font-extrabold">{tx(lang, "Today's Numbers", "आज के नंबर")}</h2>
      {board.today.map((z) => (
        <div key={z.id} className="mt-2 rounded-2xl bg-night-3 p-3">
          <div className="font-bold">{zoneLabel(z.name)}</div>
          <div className="text-xs text-night-muted">{z.wards.length ? `Ward ${z.wards.join(" & ")}` : ""}</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {z.numbers.length === 0 ? <span className="rounded-full bg-red-500/20 px-2 py-1 text-xs text-red-200">{tx(lang, "Not assigned yet", "अभी नंबर नहीं")}</span> : null}
            {z.numbers.map((n) => (
              <span key={n.id} className="inline-flex items-center gap-2 rounded-full bg-night px-3 py-1">
                {edit?.id === n.id ? (
                  <input value={edit.number} onChange={(e) => setEdit({ id: n.id, number: e.target.value.replace(/\D/g, "").slice(0, 3) })} className="w-14 bg-transparent outline-none" />
                ) : n.number}
                {canEdit ? (
                  <>
                    <button type="button" onClick={() => edit?.id === n.id ? void updateNumberFn({ data: { id: n.id, number: Number(edit.number) } }).then(pull) : setEdit({ id: n.id, number: String(n.number) })}><Pencil className="h-3.5 w-3.5" /></button>
                    <button type="button" onClick={() => setConfirmNumber(n.id)}><X className="h-3.5 w-3.5" /></button>
                  </>
                ) : <Lock className="h-3.5 w-3.5 text-amber-300" />}
              </span>
            ))}
          </div>
          {z.numbers.some((n) => n.id === confirmNumber) ? (
            <ConfirmDelete
              lang={lang}
              text={tx(lang, "Delete this number?", "यह नंबर डिलीट करें?")}
              onCancel={() => setConfirmNumber(null)}
              onConfirm={() => {
                const id = confirmNumber;
                setConfirmNumber(null);
                if (id) void removeNumberFn({ data: id }).then(pull);
              }}
            />
          ) : null}
        </div>
      ))}
      <h2 className="mt-5 font-extrabold">{tx(lang, "Yesterday's Numbers", "कल के नंबर")}</h2>
      <p className="text-xs text-night-muted">{board.yesterdayLabel}</p>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {board.yesterday.map((z) => (
          <div key={z.id} className="rounded-2xl bg-night-3 p-2 text-center text-sm">
            <div className="text-night-muted">{zoneLabel(z.name)}</div>
            <div className="font-extrabold">{z.numbers.map((n) => n.number).join(", ") || "—"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

type InspectorDraft = { id?: number; code: string; name: string; mobile: string; wardNo: number | null; devices?: number; passwordToday?: string | null };

function ZonesScreen({ lang, focusZone, onBell }: { lang: Lang; focusZone: number | null; onBell: () => void }) {
  const office = useOffice();
  const [data, setData] = useState<Awaited<ReturnType<typeof loadZones>> | null>(null);
  const [open, setOpen] = useState<number | "new" | null>(focusZone);
  const [msg, setMsg] = useState("");
  const [replaceFor, setReplaceFor] = useState<number | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [confirmOut, setConfirmOut] = useState<number | null>(null);
  const [phoneSessions, setPhoneSessions] = useState<{ id: string; phoneCode: string; lastSeen: string }[]>([]);
  const [replaceName, setReplaceName] = useState("");
  const [replaceMobile, setReplaceMobile] = useState("");
  const [shownPass, setShownPass] = useState("");

  async function pull() {
    setData(await loadZones());
  }
  useEffect(() => {
    void pull();
  }, []);
  useEffect(() => {
    if (focusZone) setOpen(focusZone);
  }, [focusZone]);

  if (!data?.ok) return <p className="p-6">{tx(lang, "Loading…", "लोड हो रहा है…")}</p>;

  return (
    <div>
      <Top
        title={tx(lang, "Zones", "ज़ोन")}
        sub={office.role === "subadmin" ? `Sub Admin · ${office.username} · ${istNow().dmy}` : `${data.zones.length} ${tx(lang, "zones", "ज़ोन")} · ${data.zones.reduce((s, z) => s + z.inspectors.length, 0)} ${tx(lang, "inspectors", "निरीक्षक")}`}
        onBell={onBell}
      />
      <div className="px-4 pt-3">
        {office.zone === "none" ? null : office.zone === "view" ? (
          <button type="button" disabled className="flex w-full items-center justify-center gap-2 rounded-2xl bg-night-3 py-3 font-extrabold text-slate-400"><Lock className="h-4 w-4 text-amber-300" /> {tx(lang, "Add Zone", "ज़ोन जोड़ें")}</button>
        ) : (
          <button type="button" onClick={() => setOpen("new")} className="g-login w-full rounded-2xl py-3 font-extrabold">+ {tx(lang, "Add Zone", "ज़ोन जोड़ें")}</button>
        )}
        {data.zones.length === 0 && open !== "new" ? (
          office.role === "subadmin" ? <p className="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-night-2 px-3 py-4 text-sm text-night-muted"><Lock className="h-4 w-4 text-amber-300" /> किसी भी zone की permission नहीं है</p> : <p className="mt-3 text-sm text-night-muted">{tx(lang, "No zones yet.", "अभी कोई ज़ोन नहीं।")}</p>
        ) : null}
        {open === "new" ? (
          <ZoneForm
            lang={lang}
            initial={{ name: "", wards: [], supervisorName: "", supervisorMobile: "", inspectors: [] }}
            onCancel={() => setOpen(null)}
            onSave={async (payload) => {
              const res = await saveZoneFn({ data: payload });
              if (!res.ok) setMsg("error" in res && res.error === "english" ? tx(lang, "Inspector name needs 2 English letters for the daily password.", "पासवर्ड के लिए नाम में 2 अंग्रेज़ी अक्षर चाहिए।") : tx(lang, "Could not save. Check the code is unique.", "सेव नहीं हुआ। कोड दोहरा तो नहीं?"));
              else {
                setMsg("");
                setOpen(res.id);
                await pull();
              }
            }}
          />
        ) : null}
        {msg ? <p className="mt-2 text-sm text-red-300">{msg}</p> : null}
        {data.zones.map((z) => (
          <article key={z.id} className="mt-3 rounded-3xl bg-night-3 p-3">
            <button type="button" className="flex w-full items-center justify-between text-left" onClick={() => setOpen(open === z.id ? null : z.id)}>
              <span>
                <b>{zoneLabel(z.name)}</b> <span className="rounded-full bg-emerald-500/20 px-2 text-xs text-emerald-300">{tx(lang, "Active", "सक्रिय")}</span>
                <span className="mt-1 block text-xs text-night-muted">
                  {z.wards.map((w) => `${tx(lang, "Ward", "वार्ड")} ${w}`).join(" & ") || tx(lang, "No ward", "वार्ड नहीं")} · {z.supervisorName || "—"} · {z.inspectors.length}
                </span>
              </span>
              <span className="shrink-0">
                {zoneLv(office, z.id) === "view" ? <span className="rounded-full bg-[#2a2748] px-2 py-1 text-[11px] font-bold">View only</span> : <Pencil className="h-4 w-4" />}
              </span>
            </button>
            {open === z.id ? (
              <div className="mt-3">
                {zoneLv(office, z.id) !== "edit" ? (
                  <button type="button" disabled className="mb-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-night-2 py-3 font-extrabold text-slate-400">
                    <Lock className="h-4 w-4 text-amber-300" /> {tx(lang, "Add LI", "नया LI जोड़ें")}
                  </button>
                ) : null}
                {z.inspectors.map((ins) => {
                  const li = zoneLv(office, z.id) === "edit";
                  return (
                  <div key={ins.id} className="mb-2 rounded-2xl bg-night-2 p-3 text-sm">
                    <div className="flex justify-between gap-2">
                      <b>{ins.code} {ins.name}</b>
                      {li ? <button type="button" onClick={() => { setConfirmDelete(ins.id); setReplaceFor(null); }}><Trash2 className="h-4 w-4" /></button> : <Lock className="h-4 w-4 text-amber-300" />}
                    </div>
                    <p className="text-night-muted">{ins.mobile || "—"} · {tx(lang, "Ward", "वार्ड")} {ins.wardNo ?? "—"} · {ins.devices > 0 ? `${ins.devices} ${tx(lang, "devices", "डिवाइस")}` : tx(lang, "Logged out", "लॉगआउट")}</p>
                    {li && ins.passwordToday ? <p className="mt-1 text-xs text-amber-200">{tx(lang, "Pass today", "आज का पासवर्ड")}: {ins.passwordToday}</p> : null}
                    {li ? (
                    <div className="mt-2 flex gap-2">
                      {ins.devices > 0 ? (
                        <button type="button" className="rounded-xl bg-night-3 px-3 py-1" onClick={() => {
                          setConfirmOut(ins.id);
                          setPhoneSessions([]);
                          void inspectorSessionsFn({ data: ins.id }).then((res) => {
                            if (res.ok) setPhoneSessions(res.sessions);
                          });
                        }}>{tx(lang, "Logout", "लॉगआउट")}</button>
                      ) : (
                        <button type="button" disabled className="rounded-xl bg-night-3 px-3 py-1 opacity-40">{tx(lang, "Logged out", "लॉग आउट")}</button>
                      )}
                      <button type="button" className="rounded-xl bg-night-3 px-3 py-1" onClick={() => { setReplaceFor(ins.id); setConfirmDelete(null); setConfirmOut(null); setReplaceName(""); setReplaceMobile(ins.mobile); setShownPass(""); }}>{tx(lang, "Replace", "बदलें")}</button>
                    </div>
                    ) : null}
                    {confirmOut === ins.id && ins.devices > 0 ? (
                      <div className="mt-2 rounded-xl border border-amber-300/40 bg-amber-500/10 p-3">
                        <p className="text-sm">{tx(lang, "Choose one phone. The others stay logged in.", "जिस फोन को चुनें सिर्फ़ वही लॉगआउट होगा। बाकी चलते रहेंगे।")}</p>
                        <div className="mt-2 space-y-2">
                          {phoneSessions.map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              className="w-full rounded-xl bg-amber-500 px-3 py-2 text-left text-slate-900"
                              onClick={() => {
                                setConfirmOut(null);
                                void logoutInspectorFn({ data: { inspectorId: ins.id, sessionId: item.id } }).then(pull);
                              }}
                            >
                              <span className="block font-bold">{item.phoneCode ? `${tx(lang, "Phone", "फोन")} ${item.phoneCode}` : tx(lang, "No phone code", "फोन कोड नहीं")}</span>
                              <span className="block text-xs font-semibold">{tx(lang, "Last seen", "आखिरी बार")} {item.lastSeen}</span>
                            </button>
                          ))}
                        </div>
                        <button type="button" className="mt-2 w-full rounded-xl border border-night-line py-2" onClick={() => setConfirmOut(null)}>{tx(lang, "Cancel", "रद्द")}</button>
                      </div>
                    ) : null}
                    {confirmDelete === ins.id ? (
                      <div className="mt-2 rounded-xl border border-red-400/50 bg-red-500/10 p-3">
                        <p className="text-sm leading-relaxed text-red-100">
                          {tx(
                            lang,
                            "Deleting this inspector will erase every entry they submitted. Prefer Replace, so the reports stay.",
                            "इस निरीक्षक को डिलीट करने से उसके द्वारा की गई सारी एंट्रीज़ मिट जाएँगी। कृपया डिलीट न करके बदलें (Replace) करें।",
                          )}
                        </p>
                        <button
                          type="button"
                          className="mt-2 w-full rounded-xl bg-accent py-2 font-bold"
                          onClick={() => {
                            setConfirmDelete(null);
                            setReplaceFor(ins.id);
                            setReplaceName("");
                            setReplaceMobile(ins.mobile);
                            setShownPass("");
                          }}
                        >
                          {tx(lang, "Replace instead", "बदलें — यही बेहतर है")}
                        </button>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          <button type="button" className="rounded-xl border border-night-line py-2" onClick={() => setConfirmDelete(null)}>{tx(lang, "Cancel", "रद्द")}</button>
                          <button
                            type="button"
                            className="rounded-xl bg-red-600 py-2 font-bold"
                            onClick={() => {
                              setConfirmDelete(null);
                              void deleteInspectorFn({ data: ins.id }).then(pull);
                            }}
                          >
                            {tx(lang, "Confirm delete", "डिलीट पक्का करें")}
                          </button>
                        </div>
                      </div>
                    ) : null}
                    {replaceFor === ins.id ? (
                      <div className="mt-2 grid gap-2">
                        <input value={replaceName} onChange={(e) => setReplaceName(e.target.value)} placeholder={tx(lang, "New name (English letters)", "नया नाम (अंग्रेज़ी)")} className="rounded-xl bg-night px-3 py-2" />
                        <input value={replaceMobile} onChange={(e) => setReplaceMobile(e.target.value)} placeholder={tx(lang, "Mobile", "मोबाइल")} className="rounded-xl bg-night px-3 py-2" />
                        <button
                          type="button"
                          className="rounded-xl bg-accent py-2 font-bold"
                          onClick={() => void replaceInspectorFn({ data: { inspectorId: ins.id, name: replaceName, mobile: replaceMobile } }).then((res) => {
                            if (res.ok) {
                              setShownPass(res.password);
                              setReplaceFor(null);
                              void pull();
                            }
                          })}
                        >
                          {tx(lang, "Save replacement", "बदलाव सेव करें")}
                        </button>
                      </div>
                    ) : null}
                  </div>
                  );
                })}
                {shownPass ? <p className="mb-2 rounded-xl bg-amber-500/15 px-3 py-2 text-sm text-amber-100">{tx(lang, "New password", "नया पासवर्ड")}: {shownPass}</p> : null}
                {office.zone === "edit" || zoneLv(office, z.id) === "edit" ? (
                <ZoneForm
                  lang={lang}
                  lockMeta={office.zone !== "edit"}
                  lockPeople={zoneLv(office, z.id) !== "edit"}
                  initial={{
                    id: z.id,
                    name: z.name,
                    wards: z.wards,
                    supervisorName: z.supervisorName,
                    supervisorMobile: z.supervisorMobile,
                    inspectors: z.inspectors.map((i) => ({ id: i.id, code: i.code, name: i.name, mobile: i.mobile, wardNo: i.wardNo })),
                  }}
                  onCancel={() => setOpen(null)}
                  onSave={async (payload) => {
                    const res = await saveZoneFn({ data: payload });
                    if (!res.ok) setMsg(tx(lang, "Could not save zone.", "ज़ोन सेव नहीं हुआ।"));
                    else {
                      setMsg("");
                      await pull();
                    }
                  }}
                />
                ) : null}
              </div>
            ) : null}
          </article>
        ))}
        <Councillors lang={lang} rows={data.councillors} onSaved={() => void pull()} />
      </div>
    </div>
  );
}

function ZoneForm({
  lang,
  initial,
  onSave,
  onCancel,
  lockMeta = false,
  lockPeople = false,
}: {
  lang: Lang;
  initial: { id?: number; name: string; wards: number[]; supervisorName: string; supervisorMobile: string; inspectors: InspectorDraft[] };
  onSave: (payload: { id?: number; name: string; wards: number[]; supervisorName: string; supervisorMobile: string; inspectors: InspectorDraft[] }) => Promise<void>;
  onCancel: () => void;
  lockMeta?: boolean;
  lockPeople?: boolean;
}) {
  const [name, setName] = useState(initial.name);
  const [wardText, setWardText] = useState("");
  const [wards, setWards] = useState<number[]>(initial.wards);
  const [supervisorName, setSupervisorName] = useState(initial.supervisorName);
  const [supervisorMobile, setSupervisorMobile] = useState(initial.supervisorMobile);
  const [inspectors, setInspectors] = useState<InspectorDraft[]>(initial.inspectors);
  const [dropId, setDropId] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);

  function addWard() {
    const n = Number(wardText);
    if (Number.isInteger(n) && n > 0 && !wards.includes(n)) setWards([...wards, n]);
    setWardText("");
  }

  return (
    <div className="mt-3 grid gap-2 rounded-2xl border border-night-line p-3">
      <Field label={tx(lang, "Zone Name", "ज़ोन का नाम")} value={name} onChange={setName} disabled={lockMeta} />
      <label className="text-xs text-night-muted">{tx(lang, "Wards", "वार्ड")}</label>
      <div className="flex flex-wrap gap-2">
        {wards.map((w) => (
          <button key={w} type="button" disabled={lockMeta} onClick={() => { if (!lockMeta) setWards(wards.filter((x) => x !== w)); }} className="rounded-full bg-accent/30 px-3 py-1 text-sm disabled:opacity-60">
            {tx(lang, "Ward", "वार्ड")} {w}{lockMeta ? "" : " ×"}
          </button>
        ))}
      </div>
      {lockMeta ? null : (
      <div className="flex gap-2">
        <input value={wardText} onChange={(e) => setWardText(e.target.value.replace(/\D/g, ""))} placeholder={tx(lang, "Ward no.", "वार्ड नं.")} className="flex-1 rounded-xl bg-night px-3 py-2" />
        <button type="button" onClick={addWard} className="rounded-xl bg-night-2 px-3">{tx(lang, "Add ward", "वार्ड जोड़ें")}</button>
      </div>
      )}
      <Field label={tx(lang, "Supervisor Name", "सुपरवाइज़र")} value={supervisorName} onChange={setSupervisorName} disabled={lockMeta} />
      <Field label={tx(lang, "Supervisor Mobile", "मोबाइल")} value={supervisorMobile} onChange={setSupervisorMobile} disabled={lockMeta} />
      <div className="mt-1 flex items-center justify-between">
        <b className="text-sm">{tx(lang, "Inspectors", "निरीक्षक")}</b>
        {lockPeople ? <span className="inline-flex items-center gap-1 text-sm text-slate-400"><Lock className="h-3.5 w-3.5 text-amber-300" /> {tx(lang, "Add LI", "नया LI जोड़ें")}</span> : (
          <button type="button" className="text-sm font-bold text-accent" onClick={() => setInspectors([...inspectors, { code: "", name: "", mobile: "", wardNo: wards[0] ?? null }])}>+ {tx(lang, "Add LI", "नया LI जोड़ें")}</button>
        )}
      </div>
      {inspectors.map((ins, index) => (
        <div key={index} className="grid grid-cols-2 gap-2 rounded-xl bg-night p-2">
          <input disabled={lockPeople} value={ins.code} onChange={(e) => update(index, { code: e.target.value.toUpperCase() })} placeholder={tx(lang, "Code", "कोड")} className="rounded-lg bg-night-2 px-2 py-2 disabled:opacity-60" />
          <input disabled={lockPeople} value={ins.name} onChange={(e) => update(index, { name: e.target.value })} placeholder={tx(lang, "Name", "नाम")} className="rounded-lg bg-night-2 px-2 py-2 disabled:opacity-60" />
          <input disabled={lockPeople} value={ins.mobile} onChange={(e) => update(index, { mobile: e.target.value })} placeholder={tx(lang, "Mobile", "मोबाइल")} className="rounded-lg bg-night-2 px-2 py-2 disabled:opacity-60" />
          <select disabled={lockPeople} value={ins.wardNo ?? ""} onChange={(e) => update(index, { wardNo: e.target.value ? Number(e.target.value) : null })} className="rounded-lg bg-night-2 px-2 py-2 disabled:opacity-60">
            <option value="">{tx(lang, "Ward", "वार्ड")}</option>
            {wards.map((w) => <option key={w} value={w}>{w}</option>)}
          </select>
          {lockPeople ? null : (
          <button
            type="button"
            className="col-span-2 text-left text-xs text-red-300"
            onClick={() => {
              if (ins.id) setDropId(ins.id);
              else setInspectors(inspectors.filter((_, i) => i !== index));
            }}
          >
            {tx(lang, "Remove row", "हटाएँ")}
          </button>
          )}
          {dropId === ins.id ? (
            <div className="col-span-2 rounded-xl border border-red-400/50 bg-red-500/10 p-3 text-sm text-red-100">
              <p>{tx(lang, "Removing this inspector and saving the zone will erase every entry they submitted. Prefer Replace on the inspector card.", "इसे हटाकर ज़ोन सेव करने से इसकी सारी एंट्रीज़ मिट जाएँगी। बेहतर है कार्ड पर बदलें (Replace) करें।")}</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button type="button" className="rounded-xl border border-night-line py-2 text-white" onClick={() => setDropId(null)}>{tx(lang, "Cancel", "रद्द")}</button>
                <button
                  type="button"
                  className="rounded-xl bg-red-600 py-2 font-bold text-white"
                  onClick={() => {
                    setInspectors(inspectors.filter((row) => row.id !== ins.id));
                    setDropId(null);
                  }}
                >
                  {tx(lang, "Confirm delete", "डिलीट पक्का करें")}
                </button>
              </div>
            </div>
          ) : null}
        </div>
      ))}
      <div className="flex gap-2">
        <button type="button" onClick={onCancel} className="flex-1 rounded-xl border border-night-line py-2">{tx(lang, "Cancel", "रद्द")}</button>
        <button
          type="button"
          disabled={busy}
          className="g-login flex-1 rounded-xl py-2 font-bold"
          onClick={() => {
            setBusy(true);
            void onSave({ id: initial.id, name, wards, supervisorName, supervisorMobile, inspectors }).finally(() => setBusy(false));
          }}
        >
          {tx(lang, "Save Zone", "ज़ोन सेव")}
        </button>
      </div>
    </div>
  );

  function update(index: number, patch: Partial<InspectorDraft>) {
    setInspectors(inspectors.map((row, i) => (i === index ? { ...row, ...patch } : row)));
  }
}

function Field({ label, value, onChange, disabled }: { label: string; value: string; onChange: (v: string) => void; disabled?: boolean }) {
  return (
    <label className="block text-xs text-night-muted">
      {label}
      <input disabled={disabled} value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full rounded-xl bg-night px-3 py-2 text-base text-night-fg disabled:opacity-60" />
    </label>
  );
}

function Councillors({ lang, rows, onSaved }: { lang: Lang; rows: { wardNo: number; name: string; photo: string | null }[]; onSaved: () => void }) {
  const office = useOffice();
  const [wardNo, setWardNo] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [editing, setEditing] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editPhoto, setEditPhoto] = useState<string | null>(null);

  return (
    <section className="mt-6 mb-4">
      {office.councillor === "none" ? null : (
      <>
      <h2 className="flex items-center gap-2 text-lg font-extrabold">{tx(lang, "Ward Councillors", "वार्ड पार्षद")} {office.councillor === "view" ? <span className="rounded-full bg-[#2a2748] px-2 py-0.5 text-[11px] font-bold">View only</span> : null}</h2>
      <p className="text-xs text-night-muted">{tx(lang, "Inspectors see their own ward councillor's photo and name.", "निरीक्षक को अपने वार्ड के पार्षद का फोटो और नाम दिखेगा।")}</p>
      {rows.length === 0 ? <p className="mt-2 text-sm text-night-muted">{tx(lang, "No councillors yet.", "अभी कोई पार्षद नहीं।")}</p> : null}
      {rows.map((row) => (
        <div key={row.wardNo} className="mt-2 flex items-center gap-3 rounded-2xl bg-night-3 p-3">
          {row.photo ? <img src={row.photo} alt="" className="h-12 w-12 rounded-full object-cover" /> : <div className="grid h-12 w-12 place-items-center rounded-full bg-night text-xs">Ward {row.wardNo}</div>}
          <div className="min-w-0 flex-1">
            <div className="text-xs text-night-muted">{tx(lang, "Ward", "वार्ड")} {row.wardNo}</div>
            {editing === row.wardNo ? (
              <input value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full rounded-lg bg-night px-2 py-1" />
            ) : (
              <b>{row.name || tx(lang, "Councillor name", "पार्षद का नाम")}</b>
            )}
          </div>
          {office.councillor === "edit" && editing === row.wardNo ? (
            <button
              type="button"
              className="rounded-xl bg-accent px-3 py-1 text-sm font-bold"
              onClick={() => void saveCouncillorFn({ data: { wardNo: row.wardNo, name: editName, photo: editPhoto } }).then(() => { setEditing(null); onSaved(); })}
            >
              {tx(lang, "Save", "सेव")}
            </button>
          ) : office.councillor === "edit" ? (
            <button type="button" onClick={() => { setEditing(row.wardNo); setEditName(row.name); setEditPhoto(null); }}><Pencil className="h-4 w-4" /></button>
          ) : <Lock className="h-4 w-4 text-amber-300" />}
          {editing === row.wardNo ? (
            <label className="text-xs text-accent">
              {tx(lang, "Photo", "फोटो")}
              <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void circlePhoto(file).then(setEditPhoto);
              }} />
            </label>
          ) : null}
        </div>
      ))}
      {office.councillor === "edit" ? (
      <div className="mt-3 grid gap-2 rounded-2xl border border-dashed border-night-line p-3">
        <div className="flex gap-2">
          <input value={wardNo} onChange={(e) => setWardNo(e.target.value.replace(/\D/g, ""))} placeholder={tx(lang, "Ward no.", "वार्ड नं.")} className="w-24 rounded-xl bg-night px-3 py-2" />
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder={tx(lang, "Councillor name", "पार्षद का नाम")} className="flex-1 rounded-xl bg-night px-3 py-2" />
        </div>
        <label className="text-sm text-accent">
          {tx(lang, "Upload photo", "फोटो अपलोड")}
          <input type="file" accept="image/*" className="hidden" onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void circlePhoto(file).then(setPhoto);
          }} />
        </label>
        {photo ? <img src={photo} alt="" className="h-12 w-12 rounded-full object-cover" /> : null}
        <button
          type="button"
          className="rounded-xl bg-accent py-2 font-bold"
          onClick={() => void saveCouncillorFn({ data: { wardNo: Number(wardNo), name, photo } }).then((res) => {
            if (res.ok) {
              setWardNo("");
              setName("");
              setPhoto(null);
              onSaved();
            }
          })}
        >
          {tx(lang, "Save councillor", "पार्षद सेव")}
        </button>
      </div>
      ) : (
        <button type="button" disabled className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-night-3 py-3 font-bold text-slate-400"><Lock className="h-4 w-4 text-amber-300" /> + {tx(lang, "Add councillor", "पार्षद जोड़ें")}</button>
      )}
      </>
      )}
    </section>
  );
}

function ReportsScreen({ lang, onInspectors, onBell }: { lang: Lang; onInspectors: () => void; onBell: () => void }) {
  const office = useOffice();
  const today = istNow().iso;
  const [mode, setMode] = useState<"live" | "reports">("live");
  const [range, setRange] = useState<"week" | "month" | "custom">("month");
  const [from, setFrom] = useState(monthStart(today));
  const [to, setTo] = useState(today);
  const [zoneId, setZoneId] = useState<number | null>(null);
  const [ward, setWard] = useState<number | null>(null);
  const [meta, setMeta] = useState<{ zones: { id: number; name: string }[]; wards: number[] }>({ zones: [], wards: [] });
  const [table, setTable] = useState<Awaited<ReturnType<typeof loadReport>> | null>(null);
  const [live, setLive] = useState<Awaited<ReturnType<typeof loadLive>> | null>(null);
  const [liveDate, setLiveDate] = useState(today);
  const span = useMemo(() => {
    if (range === "week") return { from: weekStart(today), to: today };
    if (range === "month") return { from: monthStart(today), to: today };
    return { from, to };
  }, [range, from, to, today]);

  useEffect(() => {
    void loadMeta().then((res) => {
      if (res.ok) setMeta({ zones: res.zones, wards: res.wards });
    });
  }, []);
  useEffect(() => {
    void loadReport({ data: { ...span, ward, zoneId } }).then(setTable);
  }, [span, ward, zoneId]);
  useEffect(() => {
    if (mode !== "live") return;
    const pull = () => void loadLive({ data: { date: liveDate, zoneId } }).then(setLive);
    pull();
    const id = setInterval(pull, 4000);
    return () => clearInterval(id);
  }, [mode, liveDate, zoneId]);

  function exportRows() {
    if (!table?.ok) return [];
    return table.table.map((r) => [r.date, r.ward, zoneLabel(r.zone), String(r.inspectors), String(r.numbers), `${r.jhadu}%`, `${r.nali}%`, `${r.kooda}%`, score2(r.score)]);
  }

  return (
    <div>
      <Top title={tx(lang, "Reports", "रिपोर्ट")} sub={office.role === "subadmin" ? `Sub Admin · ${office.username} · ${dmy(today)}` : `${tx(lang, "Admin · Councillor", "एडमिन · पार्षद")} · ${dmy(today)}`} onBell={onBell} />
      <div className="mx-4 mt-3 grid grid-cols-2 gap-2 rounded-2xl bg-night-3 p-1">
        <button type="button" onClick={() => setMode("live")} className={`rounded-xl py-2 font-bold ${mode === "live" ? "g-live text-white" : ""}`}>{tx(lang, "Live", "लाइव")}</button>
        <button type="button" onClick={() => setMode("reports")} className={`rounded-xl py-2 font-bold ${mode === "reports" ? "bg-accent text-white" : ""}`}>{tx(lang, "Reports", "रिपोर्ट")}</button>
      </div>
      {mode === "live" ? (
        <div className="px-4 pt-3">
          <div className="flex gap-2">
            <DateField value={liveDate} onChange={setLiveDate} />
            <select value={zoneId ?? ""} onChange={(e) => setZoneId(e.target.value ? Number(e.target.value) : null)} className="flex-1 rounded-xl bg-night-3 px-3 py-2">
              <option value="">{office.role === "subadmin" ? "My Zones" : tx(lang, "All Zones", "सभी ज़ोन")}</option>
              {meta.zones.map((z) => <option key={z.id} value={z.id}>{zoneLabel(z.name)}</option>)}
            </select>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="g-pink rounded-2xl p-3"><b className="text-2xl">{live?.ok ? live.entries : 0}</b><div className="text-sm">{tx(lang, "Today's entries", "आज की एंट्री")}</div></div>
            <div className="rounded-2xl bg-emerald-600 p-3"><b className="text-2xl">{live?.ok ? `${live.zonesDone}/${live.zoneTotal}` : "0/0"}</b><div className="text-sm">{tx(lang, "Zones done", "ज़ोन पूरे")}</div></div>
          </div>
          <p className="mt-3 text-xs text-red-300">LIVE · {tx(lang, "Updates automatically · newest first", "अपने आप अपडेट · नया पहले")}</p>
          {live?.ok && live.feed.length === 0 ? <p className="mt-3 text-sm text-night-muted">{tx(lang, "No entries yet.", "अभी कोई एंट्री नहीं।")}</p> : null}
          {live?.ok ? live.feed.map((item) => (
            <article key={item.id} className="mt-2 rounded-2xl border border-night-line bg-night-3 p-3">
              <div className="flex justify-between text-sm">
                <b>{item.time} · {zoneLabel(item.zone ?? "")}{item.wardNo ? ` · Ward ${item.wardNo}` : ""}</b>
                <span className={`rounded-full px-2 text-xs ${item.status === "editable" ? "bg-amber-500/20 text-amber-200" : "bg-emerald-500/20 text-emerald-200"}`}>
                  {item.status === "editable" ? `Editable ${Math.ceil(item.leftMs / 1000)}s` : "Final"}
                </span>
              </div>
              <p className="mt-1 text-sm">{item.code} {item.name} · No. {item.number} · {item.score}★</p>
              <p className="text-xs text-night-muted">{[item.jhadu ? "Jhadu" : "", item.nali ? "Nali" : "", item.kooda ? "Kooda Uthan" : ""].filter(Boolean).join(" · ")}</p>
            </article>
          )) : null}
        </div>
      ) : (
        <div className="px-4 pt-3">
          <div className="grid grid-cols-2 gap-2">
            <select value={ward ?? ""} onChange={(e) => setWard(e.target.value ? Number(e.target.value) : null)} className="rounded-xl bg-night-3 px-3 py-2">
              <option value="">{tx(lang, "All wards", "सभी वार्ड")}</option>
              {meta.wards.map((w) => <option key={w} value={w}>{tx(lang, "Ward", "वार्ड")} {w}</option>)}
            </select>
            <select value={zoneId ?? ""} onChange={(e) => setZoneId(e.target.value ? Number(e.target.value) : null)} className="rounded-xl bg-night-3 px-3 py-2">
              <option value="">{office.role === "subadmin" ? "My Zones" : tx(lang, "All zones", "सभी ज़ोन")}</option>
              {meta.zones.map((z) => <option key={z.id} value={z.id}>{zoneLabel(z.name)}</option>)}
            </select>
          </div>
          <button type="button" onClick={onInspectors} className="mt-3 w-full rounded-2xl bg-night-3 py-3 font-bold text-accent">{tx(lang, "See Inspector-wise Report", "निरीक्षक की रिपोर्ट देखें")} →</button>
          <div className="mt-3 flex gap-2">
            <MiniBtn on={range === "week"} onClick={() => setRange("week")}>{tx(lang, "This Week", "इस हफ़्ते")}</MiniBtn>
            <MiniBtn on={range === "month"} onClick={() => setRange("month")}>{tx(lang, "This Month", "इस महीने")}</MiniBtn>
            <MiniBtn on={range === "custom"} onClick={() => setRange("custom")}>{tx(lang, "Custom", "तारीख")}</MiniBtn>
          </div>
          {range === "custom" ? (
            <div className="mt-2 grid grid-cols-2 gap-2">
              <DateField value={from} onChange={setFrom} />
              <DateField value={to} onChange={setTo} />
            </div>
          ) : null}
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="g-pink rounded-2xl p-3"><b className="text-2xl">{table?.ok ? table.total : 0}</b><div className="text-xs">{tx(lang, "Reports", "रिपोर्ट")}</div></div>
            <div className="g-orange rounded-2xl p-3"><b className="text-2xl">{table?.ok ? score2(table.avg) : "—"}</b><div className="text-xs">{tx(lang, "Avg Score", "औसत")}</div></div>
            <div className="g-teal rounded-2xl p-3"><b className="text-2xl">{table?.ok ? table.inspectors : 0}</b><div className="text-xs">{tx(lang, "Inspectors", "निरीक्षक")}</div></div>
          </div>
          <p className="mt-2 text-[11px] text-night-muted">{tx(lang, "Work % = inspectors who ticked that work ÷ zone's total inspectors. ≥80% green, 60–79% yellow, below 60% red.", "काम % = जिन्होंने वह काम चुना ÷ ज़ोन के कुल निरीक्षक। 80%+ हरा, 60–79% पीला, कम लाल।")}</p>
          <div className="mt-2 max-h-[22rem] overflow-y-auto rounded-2xl border border-white/10 bg-night-3">
            <table className="w-full table-fixed text-[11px]">
              <thead className="sticky top-0 bg-night-3 text-night-muted">
                <tr>
                  <th className="w-[14%] px-1 py-2 text-left font-medium">Date</th>
                  <th className="w-[16%] text-left font-medium">Zone</th>
                  <th className="w-[20%] text-left font-medium">No.</th>
                  <th className="w-[13%] text-center font-medium">Jhadu</th>
                  <th className="w-[12%] text-center font-medium">Nali</th>
                  <th className="w-[12%] text-center font-medium">Kuda</th>
                  <th className="w-[13%] pr-1 text-right font-medium">Score</th>
                </tr>
              </thead>
              <tbody>
                {table?.ok && table.table.length === 0 ? (
                  <tr><td colSpan={7} className="px-2 py-6 text-center text-night-muted">{tx(lang, "No reports in this range.", "इस अवधि में रिपोर्ट नहीं।")}</td></tr>
                ) : null}
                {table?.ok ? table.table.map((r) => (
                  <tr key={`${r.iso}-${r.zoneId}`} className="border-t border-white/10">
                    <td className="px-1 py-2">{r.date.slice(0, 5)}</td>
                    <td className="truncate">{zoneLabel(r.zone)} ({r.inspectors})</td>
                    <td className="truncate font-bold"><NumCell value={r.numbers} /></td>
                    <td className={`text-center font-bold ${workClass(r.jhadu)}`}>{r.jhadu}%</td>
                    <td className={`text-center font-bold ${workClass(r.nali)}`}>{r.nali}%</td>
                    <td className={`text-center font-bold ${workClass(r.kooda)}`}>{r.kooda}%</td>
                    <td className="pr-1 text-right font-bold text-amber-300">{score2(r.score)}★</td>
                  </tr>
                )) : null}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-center text-xs text-night-muted">{tx(lang, "Last 60 days data shown", "पिछले 60 दिन का डेटा")}</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button type="button" className="rounded-2xl bg-accent py-3 font-bold" onClick={() => downloadPdf("safai-report.pdf", "Zone Report", ["Date", "Ward", "Zone", "Inspectors", "No.", "Jhadu", "Nali", "Kuda", "Score"], exportRows())}>{tx(lang, "Download PDF", "PDF")}</button>
            <button type="button" className="rounded-2xl bg-night-3 py-3 font-bold" onClick={() => printTable("Zone Report", ["Date", "Ward", "Zone", "Inspectors", "No.", "Jhadu", "Nali", "Kuda", "Score"], exportRows())}><Printer className="mr-1 inline h-4 w-4" />{tx(lang, "Print", "प्रिंट")}</button>
          </div>
        </div>
      )}
    </div>
  );
}

function NumCell({ value }: { value: string }) {
  const parts = value.split(", ");
  return (
    <>
      {parts.map((part, index) => (
        <span key={`${part}-${index}`} className={part === "A" ? "font-extrabold text-amber-300" : ""}>
          {index ? ", " : ""}
          {part}
        </span>
      ))}
    </>
  );
}

function MiniBtn({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button type="button" onClick={onClick} className={`rounded-full px-3 py-1.5 text-sm font-bold ${on ? "bg-accent text-white" : "bg-night-3"}`}>{children}</button>;
}

function InspectorReport({ lang, onBack }: { lang: Lang; onBack: () => void }) {
  const office = useOffice();
  const today = istNow().iso;
  const [range, setRange] = useState<"week" | "month" | "custom">("month");
  const [from, setFrom] = useState(monthStart(today));
  const [to, setTo] = useState(today);
  const [zoneId, setZoneId] = useState<number | null>(null);
  const [inspectorId, setInspectorId] = useState<number | null>(null);
  const [meta, setMeta] = useState<{ id: number; name: string }[]>([]);
  const [data, setData] = useState<Awaited<ReturnType<typeof loadInspectorReport>> | null>(null);
  const [absentOpen, setAbsentOpen] = useState(false);
  const [absDate, setAbsDate] = useState(today);
  const [absWork, setAbsWork] = useState({ jhadu: false, nali: false, kooda: false });
  const [absScore, setAbsScore] = useState(1);
  const [absNote, setAbsNote] = useState("");
  const span = range === "week" ? { from: weekStart(today), to: today } : range === "month" ? { from: monthStart(today), to: today } : { from, to };
  useEffect(() => { void loadMeta().then((res) => { if (res.ok) setMeta(res.zones); }); }, []);
  useEffect(() => {
    void loadInspectorReport({ data: { ...span, zoneId, inspectorId } }).then(setData);
  }, [span.from, span.to, zoneId, inspectorId]);
  const all = inspectorId == null;
  const pdfRows = data?.ok
    ? data.rows.map((r) => [r.date, String(r.ward), r.zone, r.code, r.name, r.absent ? "A" : String(r.number), r.jhadu ? "●" : "○", r.nali ? "●" : "○", r.kooda ? "●" : "○", String(r.score)])
    : [];
  return (
    <div className="px-4 pt-4">
      <button type="button" onClick={onBack} className="text-sm font-bold text-accent">← {tx(lang, "Reports", "रिपोर्ट")}</button>
      <h1 className="mt-2 text-2xl font-extrabold">{tx(lang, "Inspector Report", "निरीक्षक रिपोर्ट")}</h1>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <select value={zoneId ?? ""} onChange={(e) => { setZoneId(e.target.value ? Number(e.target.value) : null); setInspectorId(null); }} className="rounded-xl bg-night-3 px-3 py-2">
          <option value="">{office.role === "subadmin" ? "My Zones" : tx(lang, "All zones", "सभी ज़ोन")}</option>
          {meta.map((z) => <option key={z.id} value={z.id}>{zoneLabel(z.name)}</option>)}
        </select>
        <select value={inspectorId ?? ""} onChange={(e) => setInspectorId(e.target.value ? Number(e.target.value) : null)} className="rounded-xl bg-night-3 px-3 py-2">
          <option value="">{tx(lang, "All inspectors", "सभी निरीक्षक")}</option>
          {data?.ok ? data.inspectors.map((p) => <option key={p.id} value={p.id}>{p.code} · {p.name}</option>) : null}
        </select>
      </div>
      <div className="mt-3 flex gap-2">
        <MiniBtn on={range === "week"} onClick={() => setRange("week")}>{tx(lang, "This Week", "इस हफ़्ते")}</MiniBtn>
        <MiniBtn on={range === "month"} onClick={() => setRange("month")}>{tx(lang, "This Month", "इस महीने")}</MiniBtn>
        <MiniBtn on={range === "custom"} onClick={() => setRange("custom")}>{tx(lang, "Custom", "तारीख")}</MiniBtn>
      </div>
      {range === "custom" ? (
        <div className="mt-2 grid grid-cols-2 gap-2">
          <DateField value={from} onChange={setFrom} />
          <DateField value={to} onChange={setTo} />
        </div>
      ) : null}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-2xl bg-indigo-600 p-3"><b className="text-3xl">{data?.ok ? data.total : 0}</b><div>{tx(lang, "Total Reports", "कुल रिपोर्ट")}</div></div>
        <div className="g-orange rounded-2xl p-3"><b className="text-3xl">{data?.ok ? score2(data.avg) : "—"}</b><div>{tx(lang, "Avg Score", "औसत")}</div></div>
      </div>
      <div className="mt-3 max-h-[22rem] overflow-y-auto rounded-2xl border border-white/10 bg-night-3">
        <table className="w-full table-fixed text-[11px]">
          <thead className="sticky top-0 bg-night-3 text-night-muted">
            <tr>
              <th className="w-[16%] px-1 py-2 text-left font-medium">Date</th>
              {all ? <th className="w-[14%] text-left font-medium">Code</th> : null}
              <th className="text-left font-medium">No.</th>
              <th className="w-[14%] text-center font-medium">Jhadu</th>
              <th className="w-[14%] text-center font-medium">Nali</th>
              <th className="w-[14%] text-center font-medium">Kuda</th>
              <th className="w-[14%] pr-1 text-right font-medium">Score</th>
            </tr>
          </thead>
          <tbody>
            {data?.ok && data.rows.length === 0 ? (
              <tr><td colSpan={7} className="px-2 py-6 text-center text-night-muted">{tx(lang, "No rows.", "कोई पंक्ति नहीं।")}</td></tr>
            ) : null}
            {data?.ok ? data.rows.map((r, i) => (
              <tr key={i} className="border-t border-white/10">
                <td className="px-1 py-2">{r.date.slice(0, 5)}</td>
                {all ? <td className="truncate font-bold">{r.code}</td> : null}
                <td className={`truncate font-bold ${r.absent ? "text-amber-300" : ""}`}>{r.absent ? "A" : r.number}</td>
                <td className="text-center"><span className={r.jhadu ? "text-emerald-400" : "text-slate-500"}>{r.jhadu ? "●" : "○"}</span></td>
                <td className="text-center"><span className={r.nali ? "text-emerald-400" : "text-slate-500"}>{r.nali ? "●" : "○"}</span></td>
                <td className="text-center"><span className={r.kooda ? "text-emerald-400" : "text-slate-500"}>{r.kooda ? "●" : "○"}</span></td>
                <td className="pr-1 text-right font-bold text-amber-300">{r.score}★</td>
              </tr>
            )) : null}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-center text-xs text-night-muted">{tx(lang, "Last 60 days data shown. All inspectors: newest date, then code A9, A10, A11…", "पिछले 60 दिन। सभी निरीक्षक: नई तारीख पहले, फिर कोड।")}</p>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <button type="button" className="rounded-2xl bg-accent py-3 font-bold" onClick={() => downloadPdf("inspector-report.pdf", "Inspector Report", ["Date", "Ward", "Zone", "Code", "Name", "No.", "Jhadu", "Nali", "Kuda", "Score"], pdfRows)}>{tx(lang, "Download PDF", "PDF")}</button>
        <button type="button" className="rounded-2xl bg-night-3 py-3 font-bold" onClick={() => printTable("Inspector Report", ["Date", "Ward", "Zone", "Code", "Name", "No.", "Jhadu", "Nali", "Kuda", "Score"], pdfRows)}>{tx(lang, "Print", "प्रिंट")}</button>
      </div>
      {inspectorId != null && (office.role === "admin" || zoneLv(office, (data?.ok ? data.inspectors.find((p) => p.id === inspectorId)?.zoneId : null) ?? -1) === "edit") ? (
        <button type="button" onClick={() => { setAbsentOpen(true); setAbsDate(today); setAbsNote(""); }} className="mt-3 w-full rounded-2xl bg-amber-400 py-3 font-extrabold text-slate-900">
          {tx(lang, "Mark LI unavailable", "LI अनुपस्थित करें")}
        </button>
      ) : null}
      {absentOpen && inspectorId != null ? (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/50">
          <div className="w-full max-w-[430px] rounded-t-3xl bg-night-2 p-4 pb-8">
            <h2 className="text-lg font-extrabold">{tx(lang, "Mark LI unavailable", "LI अनुपस्थित करें")}</h2>
            <label className="mt-3 block text-sm text-night-muted">{tx(lang, "Date", "तारीख")}</label>
            <DateField value={absDate} onChange={setAbsDate} className="mt-1" />
            <p className="mt-3 text-sm text-night-muted">{tx(lang, "Cleaning type", "सफाई प्रकार")}</p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {([
                ["jhadu", "Jhadu", "झाड़ू"],
                ["nali", "Nali", "नाली"],
                ["kooda", "Kuda", "कूड़ा"],
              ] as const).map(([key, en, hi]) => (
                <button key={key} type="button" onClick={() => setAbsWork({ ...absWork, [key]: !absWork[key] })} className={`rounded-xl border py-2 text-sm font-bold ${absWork[key] ? "border-amber-300 bg-amber-400/20 text-amber-200" : "border-night-line"}`}>
                  {tx(lang, en, hi)}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm text-night-muted">{tx(lang, "Score", "सफाई अंक")}</p>
            <div className="mt-2 flex justify-between">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" onClick={() => setAbsScore(n)} className={`grid h-10 w-10 place-items-center rounded-full border font-extrabold ${absScore === n ? "border-amber-300 bg-amber-400 text-slate-900" : "border-night-line"}`}>{n}</button>
              ))}
            </div>
            {absNote ? <p className="mt-2 text-sm text-red-300">{absNote}</p> : null}
            <button
              type="button"
              className="mt-4 w-full rounded-2xl bg-amber-400 py-3 font-extrabold text-slate-900"
              onClick={() => {
                void markAbsentFn({ data: { inspectorId, date: absDate, ...absWork, score: absScore } }).then((res) => {
                  if (!res.ok) {
                    setAbsNote(tx(lang, "Could not save. Pick a type.", "सेव नहीं हुआ। प्रकार चुनें।"));
                    return;
                  }
                  setAbsentOpen(false);
                  setAbsWork({ jhadu: false, nali: false, kooda: false });
                  void loadInspectorReport({ data: { ...span, zoneId, inspectorId } }).then(setData);
                });
              }}
            >
              {tx(lang, "Mark absentee", "अनुपस्थित दर्ज करें")}
            </button>
            <button type="button" className="mt-2 w-full rounded-2xl border border-night-line py-2" onClick={() => setAbsentOpen(false)}>{tx(lang, "Cancel", "रद्द")}</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function StaffScreen({ lang, onBell }: { lang: Lang; onBell: () => void }) {
  const office = useOffice();
  const [date, setDate] = useState(istNow().iso);
  const [data, setData] = useState<Awaited<ReturnType<typeof loadStaffDay>> | null>(null);
  const [draft, setDraft] = useState<Record<number, { present: boolean; zoneId: number | null }>>({});
  const [q, setQ] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [view, setView] = useState(false);
  const [confirmStaff, setConfirmStaff] = useState<number | null>(null);

  async function pull(next = date) {
    const res = await loadStaffDay({ data: { date: next } });
    setData(res);
    if (!res.ok) return;
    const rows: Record<number, { present: boolean; zoneId: number | null }> = {};
    for (const person of res.staff) rows[person.id] = { present: person.present !== false, zoneId: person.zoneId };
    setDraft(rows);
  }

  useEffect(() => {
    void pull(date);
  }, [date]);

  if (view) {
    return <AttendanceView lang={lang} onBack={() => setView(false)} onEdit={(iso) => { setDate(iso); setView(false); }} />;
  }
  if (!data?.ok) return <p className="p-6">{tx(lang, "Loading…", "लोड हो रहा है…")}</p>;
  const list = data.staff.filter((s) => `${s.name} ${s.mobile} ${s.role}`.toLowerCase().includes(q.toLowerCase()));
  const presentCount = list.filter((s) => draft[s.id]?.present !== false).length;
  const absentCount = list.length - presentCount;
  const attEdit = office.attendance === "edit";
  const staffEdit = office.staff === "edit";

  async function submit() {
    setBusy(true);
    setNote("");
    const rows = data && data.ok ? data.staff.map((s) => ({ id: s.id, present: draft[s.id]?.present !== false, zoneId: draft[s.id]?.zoneId ?? null })) : [];
    const res = await saveStaffDay({ data: { date, rows } });
    setBusy(false);
    setNote(res.ok ? tx(lang, "Attendance saved.", "हाजिरी सेव हो गई।") : tx(lang, "Could not save.", "सेव नहीं हुई।"));
    if (res.ok) void pull(date);
  }

  return (
    <div>
      <Top title={tx(lang, "Staff", "स्टाफ")} sub={`${tx(lang, "Date-wise attendance", "तारीख के हिसाब से हाजिरी")} · ${data.dateLabel}${office.role === "subadmin" ? ` · Sub Admin · ${office.username}` : ""}`} onBell={onBell} />
      <div className="grid grid-cols-3 gap-2 px-4 pt-3">
        <div className="rounded-2xl bg-indigo-600 p-3"><b className="text-2xl">{data.total}</b><div className="text-xs">{tx(lang, "Total", "कुल")}</div></div>
        <div className="rounded-2xl bg-emerald-600 p-3"><b className="text-2xl">{presentCount}</b><div className="text-xs">{tx(lang, "Present", "हाज़िर")}</div></div>
        <div className="rounded-2xl bg-red-600 p-3"><b className="text-2xl">{absentCount}</b><div className="text-xs">{tx(lang, "Absent", "अनुपस्थित")}</div></div>
      </div>
      <div className="px-4 pb-4">
        <div className="mt-3 grid gap-2 rounded-2xl bg-night-3 p-3">
          <b>{tx(lang, "Add Staff", "स्टाफ जोड़ें")}</b>
          <input disabled={!staffEdit} value={name} onChange={(e) => setName(e.target.value)} placeholder={tx(lang, "Name", "नाम")} className="rounded-xl bg-night px-3 py-2 disabled:opacity-50" />
          <input disabled={!staffEdit} value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder={tx(lang, "Mobile", "मोबाइल")} className="rounded-xl bg-night px-3 py-2 disabled:opacity-50" />
          <input disabled={!staffEdit} value={role} onChange={(e) => setRole(e.target.value)} placeholder={tx(lang, "Role", "काम")} className="rounded-xl bg-night px-3 py-2 disabled:opacity-50" />
          {staffEdit ? (
            <button type="button" className="rounded-xl bg-accent py-2 font-bold" onClick={() => void addStaffFn({ data: { name, mobile, role } }).then(() => { setName(""); setMobile(""); setRole(""); void pull(date); })}>{tx(lang, "Save", "सेव")}</button>
          ) : (
            <button type="button" disabled className="inline-flex items-center justify-center gap-2 rounded-xl bg-night py-2 font-bold text-slate-400"><Lock className="h-4 w-4 text-amber-300" /> {tx(lang, "Save", "सेव")}</button>
          )}
        </div>
        <div className="mt-3 flex gap-2">
          <DateField value={date} onChange={setDate} className="min-w-0 flex-1" />
          {office.attendance === "none" ? (
            <button type="button" disabled className="inline-flex items-center gap-1 rounded-xl bg-night-3 px-3 py-2 text-sm font-bold text-slate-400"><Lock className="h-3.5 w-3.5 text-amber-300" /> {tx(lang, "View Attendance", "हाजिरी देखें")}</button>
          ) : (
            <button type="button" onClick={() => setView(true)} className="rounded-xl bg-accent px-3 py-2 text-sm font-bold">{tx(lang, "View Attendance", "हाजिरी देखें")}</button>
          )}
        </div>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={tx(lang, "Search staff…", "स्टाफ खोजें…")} className="mt-3 w-full rounded-2xl bg-night-3 px-4 py-3" />
        {list.length === 0 ? <p className="mt-3 text-sm text-night-muted">{tx(lang, "No staff yet.", "अभी स्टाफ नहीं।")}</p> : null}
        {list.map((s) => {
          const row = draft[s.id] ?? { present: true, zoneId: null };
          return (
            <article key={s.id} className="mt-2 rounded-2xl bg-night-3 p-3">
              <div className="flex justify-between">
                <div><b>{s.name}</b><div className="text-xs text-night-muted">{s.role || "—"} · {s.mobile || "—"}</div></div>
                {staffEdit ? <button type="button" onClick={() => setConfirmStaff(s.id)}><Trash2 className="h-4 w-4" /></button> : <Lock className="h-4 w-4 text-amber-300" />}
              </div>
              {confirmStaff === s.id ? (
                <ConfirmDelete
                  lang={lang}
                  text={tx(lang, "This staff member and all their attendance will be deleted.", "यह स्टाफ और उसकी सारी हाजिरी मिट जाएगी।")}
                  onCancel={() => setConfirmStaff(null)}
                  onConfirm={() => {
                    setConfirmStaff(null);
                    void deleteStaffFn({ data: s.id }).then(() => pull(date));
                  }}
                />
              ) : null}
              <select
                disabled={!attEdit}
                value={row.zoneId ?? ""}
                onChange={(e) => setDraft({ ...draft, [s.id]: { ...row, zoneId: e.target.value ? Number(e.target.value) : null } })}
                className="mt-2 w-full rounded-xl bg-night px-3 py-2 disabled:opacity-50"
              >
                <option value="">{tx(lang, "Duty zone", "आज का ड्यूटी ज़ोन")}</option>
                {data.zones.map((z) => <option key={z.id} value={z.id}>{zoneLabel(z.name)}</option>)}
              </select>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button type="button" disabled={!attEdit} onClick={() => setDraft({ ...draft, [s.id]: { ...row, present: true } })} className={`rounded-xl py-2 font-bold disabled:opacity-50 ${row.present ? "bg-emerald-600" : "bg-night"}`}>{tx(lang, "Present", "हाज़िर")}</button>
                <button type="button" disabled={!attEdit} onClick={() => setDraft({ ...draft, [s.id]: { ...row, present: false } })} className={`rounded-xl py-2 font-bold disabled:opacity-50 ${row.present ? "bg-night" : "bg-red-600"}`}>{tx(lang, "Absent", "अनुपस्थित")}</button>
              </div>
            </article>
          );
        })}
        {note ? <p className="mt-3 text-center text-sm text-emerald-300">{note}</p> : null}
        {attEdit ? (
          <button type="button" disabled={busy || list.length === 0} onClick={() => void submit()} className="mt-4 w-full rounded-2xl bg-accent py-4 text-lg font-extrabold disabled:opacity-50">
            {tx(lang, "Submit attendance", "हाजिरी जमा करें")}
          </button>
        ) : (
          <button type="button" disabled className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-night-3 py-4 text-lg font-extrabold text-slate-400">
            <Lock className="h-4 w-4 text-amber-300" /> {tx(lang, "Submit attendance", "हाजिरी जमा करें")}
          </button>
        )}
      </div>
    </div>
  );
}

function AttendanceView({ lang, onBack, onEdit }: { lang: Lang; onBack: () => void; onEdit: (iso: string) => void }) {
  const office = useOffice();
  const [data, setData] = useState<Awaited<ReturnType<typeof loadAttendanceView>> | null>(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  useEffect(() => { void loadAttendanceView().then(setData); }, []);
  if (!data?.ok) return <p className="p-6">{tx(lang, "Loading…", "लोड हो रहा है…")}</p>;
  const ranged = Boolean(from && to);
  const lo = from > to ? to : from;
  const hi = from > to ? from : to;
  const shown = ranged ? data.rows.filter((row) => row.iso >= lo && row.iso <= hi) : data.rows;
  function stats(staffId: number) {
    let days = 0;
    let present = 0;
    const scores: number[] = [];
    for (const row of shown) {
      const cell = row.cells.find((item) => item.staffId === staffId);
      if (!cell) continue;
      days += 1;
      if (cell.present) present += 1;
      if (cell.avg != null) scores.push(cell.avg);
    }
    const pct = days ? Math.round((present / days) * 100) : 0;
    const avg = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : null;
    return { days, present, pct, avg };
  }
  return (
    <div className="px-4 pt-4">
      <button type="button" onClick={onBack} className="text-sm font-bold text-accent">← {tx(lang, "Staff", "स्टाफ")}</button>
      <h1 className="mt-2 text-2xl font-extrabold">{tx(lang, "View Attendance", "हाजिरी देखें")}</h1>
      <p className="text-xs text-night-muted">{tx(lang, "Scroll down for dates. Scroll sideways for staff.", "तारीख के लिए नीचे स्क्रॉल करें। स्टाफ के नाम दाएँ-बाएँ।")}</p>
      <div className="mt-3 flex items-center gap-2 rounded-2xl border border-night-line bg-night-2 p-2">
        <DateField value={from} onChange={setFrom} label="From" className="min-w-0 flex-1 !bg-transparent" />
        <DateField value={to} onChange={setTo} label="To" className="min-w-0 flex-1 !bg-transparent" />
        {from || to ? <button type="button" aria-label="clear" onClick={() => { setFrom(""); setTo(""); }} className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-night-3"><X className="h-4 w-4" /></button> : null}
      </div>
      {data.rows.length === 0 ? <p className="mt-4 text-sm text-night-muted">{tx(lang, "No attendance saved yet.", "अभी हाजिरी सेव नहीं हुई।")}</p> : null}
      {data.rows.length > 0 ? (
        <div className="mt-3 max-h-[68vh] overflow-auto rounded-2xl border border-white/10">
          <table className="border-separate border-spacing-0 text-xs">
            <thead>
              <tr className="text-night-muted">
                <th className="sticky top-0 left-0 z-30 min-w-[92px] bg-night-2 px-2 py-2 text-left">{tx(lang, "Date", "तारीख")}</th>
                {data.staff.map((person) => {
                  const stat = stats(person.id);
                  return (
                    <th key={person.id} className="sticky top-0 z-20 min-w-[120px] bg-night-3 px-2 py-2 text-left align-top">
                      <div>{person.name}</div>
                      <div className="mt-1 inline-flex flex-col rounded-xl border border-emerald-400/40 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-extrabold leading-tight text-emerald-300">
                        {ranged ? <><span>कुल हाजिरी</span><span>{stat.present}/{stat.days} दिन</span></> : <span>हाजिरी {stat.pct}%</span>}
                      </div>
                      <div className="mt-1 text-[11px] font-bold text-amber-300">औसत {stat.avg == null ? "—" : `${score2(stat.avg)}★`}</div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {shown.map((row) => (
                <tr key={row.iso}>
                  <td className="sticky left-0 z-10 min-w-[92px] border-t border-white/10 bg-night-2 px-2 py-2 align-top">
                    <div>{row.date}</div>
                    {office.attendance === "edit" ? <button type="button" className="mt-1 text-[11px] font-bold text-accent" onClick={() => onEdit(row.iso)}>{tx(lang, "Edit", "बदलाव")}</button> : null}
                  </td>
                  {data.staff.map((person) => {
                    const cell = row.cells.find((item) => item.staffId === person.id);
                    return (
                      <td key={person.id} className="min-w-[110px] border-t border-white/10 bg-night-3 px-2 py-2 align-top">
                        {!cell ? "—" : (
                          <div>
                            <div className={cell.present ? "font-bold text-emerald-300" : "text-red-300"}>{cell.present ? tx(lang, "Present", "हाज़िर") : tx(lang, "Absent", "अनुपस्थित")}</div>
                            <div className="whitespace-nowrap text-[10px] leading-tight text-slate-400">
                              {zoneLabel(cell.zone)}{" "}
                              {cell.present ? <span className="text-[11px] font-bold text-amber-300">{cell.avg == null ? "—" : `${score2(cell.avg)}★`}</span> : null}
                            </div>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}

function ConfirmDelete({ lang, text, onCancel, onConfirm }: { lang: Lang; text: string; onCancel: () => void; onConfirm: () => void }) {
  return (
    <div className="mt-2 rounded-xl border border-red-400/50 bg-red-500/10 p-3">
      <p className="text-sm leading-relaxed text-red-100">{text}</p>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <button type="button" className="rounded-xl border border-night-line py-2" onClick={onCancel}>{tx(lang, "Cancel", "रद्द")}</button>
        <button type="button" className="rounded-xl bg-red-600 py-2 font-bold" onClick={onConfirm}>{tx(lang, "Confirm delete", "डिलीट पक्का करें")}</button>
      </div>
    </div>
  );
}

function zoneLabel(name: string) {
  const clean = name.trim();
  if (!clean || clean === "—") return "—";
  if (/^zone/i.test(clean) || /^ज़ोन/.test(clean)) return clean;
  return `Zone ${clean}`;
}

function ProfileSheet({
  lang,
  username,
  onLang,
  onClose,
  onLogout,
  onSubs,
  onPassword,
}: {
  lang: Lang;
  username: string;
  onLang: (lang: Lang) => void;
  onClose: () => void;
  onLogout: () => void;
  onSubs: () => void;
  onPassword: () => void;
}) {
  const office = useOffice();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    if (office.role !== "admin") return;
    void listSubAdminsFn().then((res) => {
      if (res.ok) setCount(res.rows.length);
    });
  }, [office.role]);
  const sub = office.role === "subadmin";
  const initial = (sub ? office.name : "A").trim().charAt(0).toUpperCase() || "A";
  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/50" onClick={onClose}>
      <div className="w-full max-w-[430px] rounded-t-3xl bg-night-2 p-4" onClick={(e) => e.stopPropagation()}>
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-night-line" />
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-xl font-extrabold">{initial}</div>
          <div>
            <b>{sub ? "Sub Admin" : "Admin"}</b>
            <div className="text-sm text-night-muted">{sub ? `Sub Admin · ${office.username}` : `${tx(lang, "Councillor", "पार्षद")} · ${tx(lang, "Username", "यूज़रनेम")}: ${username}`}</div>
          </div>
        </div>
        {sub ? null : (
          <button type="button" className="mt-4 flex w-full items-center justify-between rounded-2xl bg-night-3 px-3 py-3" onClick={onSubs}>
            <span className="flex items-center gap-2"><UserPlus className="h-4 w-4" /> {tx(lang, "Sub Admins", "Sub Admin")}</span>
            <span>{count ?? "·"} ›</span>
          </button>
        )}
        <button type="button" className="mt-3 flex w-full items-center gap-2 rounded-2xl bg-night-3 px-3 py-3" onClick={() => (sub ? onPassword() : setOpen((v) => !v))}>
          <KeyRound className="h-4 w-4" /> {tx(lang, "Change Password", "पासवर्ड बदलें")}
        </button>
        {!sub && open ? (
          <div className="mt-2 grid gap-2">
            <input type="password" value={current} onChange={(e) => setCurrent(e.target.value)} placeholder={tx(lang, "Current password", "पुराना पासवर्ड")} className="rounded-xl bg-night px-3 py-2" />
            <input type="password" value={next} onChange={(e) => setNext(e.target.value)} placeholder={tx(lang, "New password", "नया पासवर्ड")} className="rounded-xl bg-night px-3 py-2" />
            <button
              type="button"
              className="rounded-xl bg-accent py-2 font-bold"
              onClick={() => void updateAdminPassword({ data: { current, next } }).then((res) => setMsg(res.ok ? tx(lang, "Password updated.", "पासवर्ड बदल गया।") : tx(lang, "Could not update.", "नहीं बदला।")))}
            >
              {tx(lang, "Save", "सेव")}
            </button>
            {msg ? <p className="text-sm text-night-muted">{msg}</p> : null}
          </div>
        ) : null}
        <div className="mt-3 flex items-center justify-between rounded-2xl bg-night-3 px-3 py-3">
          <span>{tx(lang, "Language", "भाषा")}</span>
          <span className="flex gap-2">
            <button type="button" onClick={() => onLang("en")} className={`rounded-full px-3 py-1 ${lang === "en" ? "bg-accent" : "bg-night"}`}>English</button>
            <button type="button" onClick={() => onLang("hi")} className={`rounded-full px-3 py-1 ${lang === "hi" ? "bg-accent" : "bg-night"}`}>हिंदी</button>
          </span>
        </div>
        <button type="button" onClick={onLogout} className="mt-3 flex w-full items-center gap-2 rounded-2xl bg-night-3 px-3 py-3 text-red-300">
          <LogOut className="h-4 w-4" /> {tx(lang, "Logout", "लॉगआउट")}
        </button>
      </div>
    </div>
  );
}

function DateField({ value, onChange, className = "", label }: { value: string; onChange: (iso: string) => void; className?: string; label?: string }) {
  return (
    <label className={`relative block overflow-hidden rounded-xl bg-night-3 px-3 py-2 ${className}`}>
      {label ? <span className="block text-[10px] text-night-muted">{label}</span> : null}
      <span className={`block ${value ? "text-night-fg" : "text-night-muted"}`}>{value ? dmy(value) : "दिनांक चुनें"}</span>
      <input type="date" value={value} onChange={(e) => onChange(e.target.value)} className="absolute inset-0 cursor-pointer opacity-0" />
    </label>
  );
}

function Tri({ value, onChange, editLabel = "Edit" }: { value: Level | null; onChange: (level: Level) => void; editLabel?: string }) {
  const opts: { id: Level; label: string; on: string }[] = [
    { id: "edit", label: editLabel, on: "bg-emerald-500 text-white" },
    { id: "view", label: "View", on: "bg-blue-500 text-white" },
    { id: "none", label: "None", on: "bg-slate-500 text-white" },
  ];
  return (
    <div className="grid grid-cols-3 gap-1 rounded-2xl bg-[#12101c] p-1">
      {opts.map((opt) => (
        <button key={opt.id} type="button" onClick={() => onChange(opt.id)} className={`rounded-xl py-2 text-sm font-bold ${value === opt.id ? opt.on : "text-slate-400"}`}>{opt.label}</button>
      ))}
    </div>
  );
}

function permClass(level: Level) {
  return level === "edit" ? "font-bold text-emerald-400" : level === "view" ? "font-bold text-sky-400" : "text-slate-500";
}

function liRollup(zones: { perm: Level }[]): Level {
  if (zones.some((z) => z.perm === "edit")) return "edit";
  if (zones.some((z) => z.perm === "view")) return "view";
  return "none";
}

type SubRow = {
  id: number;
  name: string;
  username: string;
  active: boolean;
  attendance: Level;
  zone: Level;
  number: Level;
  staff: Level;
  councillor: Level;
  zones: { id: number; perm: Level }[];
};

function SubAdmins({ lang, onBack }: { lang: Lang; onBack: () => void }) {
  const [rows, setRows] = useState<SubRow[]>([]);
  const [editing, setEditing] = useState<SubRow | "new" | null>(null);
  const [resetFor, setResetFor] = useState<SubRow | null>(null);
  const [removeFor, setRemoveFor] = useState<SubRow | null>(null);
  async function pull() {
    const res = await listSubAdminsFn();
    if (res.ok) setRows(res.rows);
  }
  useEffect(() => { void pull(); }, []);
  if (editing) return <SubAdminForm lang={lang} row={editing === "new" ? null : editing} onBack={() => { setEditing(null); void pull(); }} />;
  return (
    <div className="px-4 pt-4">
      <button type="button" onClick={onBack} className="text-sm font-bold text-accent">← {tx(lang, "Back", "वापस")}</button>
      <h1 className="mt-2 text-3xl font-extrabold">Sub Admins</h1>
      <p className="text-sm text-night-muted">Admin · {tx(lang, "Councillor", "पार्षद")} · {istNow().dmy}</p>
      <button type="button" onClick={() => setEditing("new")} className="mt-3 w-full rounded-2xl bg-accent py-3 text-lg font-extrabold">+ {tx(lang, "Add Sub Admin", "Sub Admin जोड़ें")}</button>
      {rows.length === 0 ? <p className="mt-4 text-sm text-night-muted">{tx(lang, "No sub admins yet.", "अभी कोई Sub Admin नहीं।")}</p> : null}
      {rows.map((row) => {
        const li = liRollup(row.zones);
        return (
          <article key={row.id} className="mt-3 rounded-3xl border border-white/5 bg-night-3 p-3">
            <div className="flex items-start justify-between gap-2">
              <b className="text-lg">{row.name}</b>
              <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${row.active ? "bg-emerald-400 text-emerald-950" : "bg-slate-600 text-slate-100"}`}>{row.active ? "Active" : "Inactive"}</span>
            </div>
            <p className="text-sm text-night-muted">Username: {row.username}</p>
            <p className="mt-2 text-xs leading-relaxed">
              Attendance <span className={permClass(row.attendance)}>{row.attendance === "edit" ? "Edit" : row.attendance === "view" ? "View" : "None"}</span>
              {" · "}Zone <span className={permClass(row.zone)}>{row.zone === "edit" ? "Edit" : row.zone === "view" ? "View" : "None"}</span>
              {" · "}Zone LI <span className={permClass(li)}>{li === "edit" ? "Edit" : li === "view" ? "View" : "None"}</span>
            </p>
            <p className="text-xs">
              Today's Number <span className={permClass(row.number)}>{row.number === "edit" ? "Edit" : row.number === "view" ? "View" : "None"}</span>
              {" · "}Add Staff <span className={permClass(row.staff)}>{row.staff === "edit" ? "Edit" : row.staff === "view" ? "View" : "None"}</span>
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs font-bold">
              <button type="button" onClick={() => setEditing(row)} className="inline-flex items-center justify-center gap-1 rounded-xl bg-night px-2 py-2"><Pencil className="h-3.5 w-3.5" /> Edit</button>
              <button type="button" onClick={() => setResetFor(row)} className="inline-flex items-center justify-center gap-1 rounded-xl bg-night px-1 py-2 text-[10px] leading-tight"><KeyRound className="h-3.5 w-3.5 shrink-0 text-amber-300" /> Reset Password</button>
              <button type="button" onClick={() => setRemoveFor(row)} className="inline-flex items-center justify-center gap-1 rounded-xl bg-night px-2 py-2 text-red-300"><Trash2 className="h-3.5 w-3.5" /> Remove</button>
            </div>
          </article>
        );
      })}
      {resetFor ? <ResetSheet lang={lang} row={resetFor} onClose={() => setResetFor(null)} /> : null}
      {removeFor ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 px-6">
          <div className="w-full max-w-sm rounded-3xl bg-[#241e3d] p-5 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-red-500/20"><Trash2 className="h-6 w-6 text-sky-200" /></div>
            <h2 className="mt-3 text-xl font-extrabold">Sub Admin हटाएं?</h2>
            <p className="mt-2 text-sm"><b>{removeFor.name}</b> ({removeFor.username}) को हटाने पर वह login नहीं कर पाएगा।</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button type="button" onClick={() => setRemoveFor(null)} className="rounded-2xl bg-[#3a3458] py-3 font-bold">रद्द करें</button>
              <button type="button" className="rounded-2xl bg-red-500 py-3 font-extrabold" onClick={() => void removeSubAdminFn({ data: removeFor.id }).then(() => { setRemoveFor(null); void pull(); })}>हाँ, हटाएं</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ResetSheet({ lang, row, onClose }: { lang: Lang; row: SubRow; onClose: () => void }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50" onClick={onClose}>
      <div className="w-full max-w-[430px] rounded-t-3xl bg-night-2 p-4 pb-8" onClick={(e) => e.stopPropagation()}>
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-night-line" />
        <h2 className="text-2xl font-extrabold">Reset Password</h2>
        <p className="text-sm text-night-muted">{row.name} · Username: {row.username}</p>
        <label className="mt-3 block text-sm text-night-muted">New Password</label>
        <div className="relative mt-1">
          <input type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password" className="w-full rounded-2xl bg-night px-3 py-3 pr-10" />
          <button type="button" className="absolute top-1/2 right-3 -translate-y-1/2 text-night-muted" onClick={() => setShow((v) => !v)}>{show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
        </div>
        <label className="mt-3 block text-sm text-night-muted">Confirm Password</label>
        <div className="relative mt-1">
          <input type={show ? "text" : "password"} value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Confirm password" className="w-full rounded-2xl bg-night px-3 py-3 pr-10" />
          <button type="button" className="absolute top-1/2 right-3 -translate-y-1/2 text-night-muted" onClick={() => setShow((v) => !v)}>{show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
        </div>
        {msg ? <p className="mt-2 text-sm text-red-300">{msg}</p> : null}
        <div className="mt-4 grid grid-cols-[1fr_2fr] gap-2">
          <button type="button" onClick={onClose} className="rounded-2xl bg-night-3 py-3 font-bold">{tx(lang, "Cancel", "रद्द")}</button>
          <button
            type="button"
            className="rounded-2xl bg-accent py-3 font-extrabold"
            onClick={() => {
              if (password.length < 6) { setMsg(tx(lang, "Minimum 6 characters.", "कम से कम 6 अक्षर।")); return; }
              if (password !== confirm) { setMsg(tx(lang, "Passwords do not match.", "पासवर्ड मिलान नहीं हुआ।")); return; }
              void resetSubPasswordFn({ data: { id: row.id, password } }).then((res) => {
                if (!res.ok) { setMsg(tx(lang, "Could not reset.", "रीसेट नहीं हुआ।")); return; }
                onClose();
              });
            }}
          >
            {tx(lang, "Save", "सेव")}
          </button>
        </div>
      </div>
    </div>
  );
}

function SubAdminForm({ lang, row, onBack }: { lang: Lang; row: SubRow | null; onBack: () => void }) {
  const [name, setName] = useState(row?.name ?? "");
  const [username, setUsername] = useState(row?.username ?? "");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(row?.active ?? true);
  const [attendance, setAttendance] = useState<Level>(row?.attendance ?? "none");
  const [zone, setZone] = useState<Level>(row?.zone ?? "none");
  const [number, setNumber] = useState<Level>(row?.number ?? "none");
  const [staff, setStaff] = useState<Level>(row?.staff ?? "none");
  const [councillor, setCouncillor] = useState<Level>(row?.councillor ?? "none");
  const [zones, setZones] = useState<{ id: number; name: string; inspectors: number; perm: Level }[]>([]);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    void loadZones().then((res) => {
      if (!res.ok) return;
      setZones(res.zones.map((z) => ({
        id: z.id,
        name: z.name,
        inspectors: z.inspectors.length,
        perm: row?.zones.find((item) => item.id === z.id)?.perm ?? "none",
      })));
    });
  }, [row]);
  const allSame = zones.length > 0 && zones.every((z) => z.perm === zones[0].perm) ? zones[0].perm : null;
  return (
    <div className="px-4 pt-4 pb-8">
      <button type="button" onClick={onBack} className="text-sm font-bold text-accent">← {tx(lang, "Back", "वापस")}</button>
      <h1 className="mt-2 text-2xl font-extrabold">{row ? tx(lang, "Edit Sub Admin", "Sub Admin बदलें") : tx(lang, "Add Sub Admin", "Sub Admin जोड़ें")}</h1>
      <div className="mt-3 grid gap-2 rounded-3xl border border-white/10 bg-night-3 p-3">
        <Field label={tx(lang, "Name", "नाम")} value={name} onChange={setName} />
        <Field label={tx(lang, "Username", "यूज़रनेम")} value={username} onChange={(v) => setUsername(v.toUpperCase())} />
        <label className="block text-xs text-night-muted">
          {tx(lang, "Password", "पासवर्ड")}
          <span className="relative mt-1 block">
            <input type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={row ? tx(lang, "Leave blank to keep", "खाली छोड़ें") : tx(lang, "Minimum 6 characters", "कम से कम 6")} className="w-full rounded-xl bg-night px-3 py-2 pr-10 text-base text-night-fg" />
            <button type="button" className="absolute top-1/2 right-3 -translate-y-1/2 text-night-muted" onClick={() => setShow((v) => !v)}>{show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
          </span>
        </label>
        <button type="button" onClick={() => setActive((v) => !v)} className="flex items-center justify-between rounded-xl bg-night px-3 py-2 text-sm">
          <span>{active ? "Active" : "Inactive"}</span>
          <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${active ? "bg-emerald-400 text-emerald-950" : "bg-slate-600"}`}>{active ? "ON" : "OFF"}</span>
        </button>
      </div>
      <div className="mt-3 rounded-3xl border border-white/10 bg-night-3 p-3">
        <h2 className="text-lg font-extrabold">Permissions</h2>
        <p className="text-xs text-night-muted">Edit = बदल सकता है · View = सिर्फ देख सकता है · None = कुछ नहीं</p>
        <div className="mt-3 border-t border-white/10 pt-3">
          <b>Staff Attendance</b>
          <p className="text-xs text-night-muted">Mark Present/Absent</p>
          <div className="mt-2"><Tri value={attendance} onChange={setAttendance} /></div>
        </div>
        <div className="mt-3 border-t border-white/10 pt-3">
          <b>Create Zone</b>
          <p className="text-xs text-night-muted">New zone / edit zone</p>
          <div className="mt-2"><Tri value={zone} onChange={setZone} /></div>
        </div>
        <div className="mt-3 border-t border-white/10 pt-3">
          <b>Zone LI (Add / Remove / Replace)</b>
          <p className="text-xs text-night-muted">हर zone की अलग permission</p>
          <p className="mt-2 text-sm font-bold">Zones चुनें</p>
          <p className="mt-2 text-xs text-night-muted">सभी zones</p>
          <Tri value={allSame} onChange={(level) => setZones(zones.map((z) => ({ ...z, perm: level })))} />
          {zones.map((z) => (
            <div key={z.id} className="mt-2 rounded-2xl bg-night p-2">
              <div className="mb-2 text-sm font-bold">{zoneLabel(z.name)} <span className="font-medium text-night-muted">· {z.inspectors} Inspectors</span></div>
              <Tri value={z.perm} onChange={(level) => setZones(zones.map((item) => item.id === z.id ? { ...item, perm: level } : item))} />
            </div>
          ))}
        </div>
        <div className="mt-3 border-t border-white/10 pt-3">
          <b>Zone – Ward Councillor (वार्ड पार्षद)</b>
          <p className="text-xs text-night-muted">पार्षद जोड़ना / नाम-फोटो बदलना</p>
          <div className="mt-2"><Tri value={councillor} onChange={setCouncillor} editLabel="Edit (Add)" /></div>
        </div>
        <div className="mt-3 border-t border-white/10 pt-3">
          <b>Assign Today's Number</b>
          <p className="text-xs text-night-muted">For all zones</p>
          <div className="mt-2"><Tri value={number} onChange={setNumber} /></div>
        </div>
        <div className="mt-3 border-t border-white/10 pt-3">
          <b>Add Staff</b>
          <p className="text-xs text-night-muted">Add new staff member</p>
          <div className="mt-2"><Tri value={staff} onChange={setStaff} /></div>
        </div>
      </div>
      {msg ? <p className="mt-3 text-sm text-red-300">{msg}</p> : null}
      <button
        type="button"
        disabled={busy}
        className="mt-4 w-full rounded-2xl bg-accent py-3 text-lg font-extrabold disabled:opacity-50"
        onClick={() => {
          if (!name.trim() || username.trim().length < 3) { setMsg(tx(lang, "Name and username (3+ letters) are required.", "नाम और यूज़रनेम (3 अक्षर) ज़रूरी हैं।")); return; }
          if (!row && password.trim().length < 6) { setMsg(tx(lang, "Password must be at least 6 characters.", "पासवर्ड कम से कम 6 अक्षर।")); return; }
          if (password && password.trim().length < 6) { setMsg(tx(lang, "Password must be at least 6 characters.", "पासवर्ड कम से कम 6 अक्षर।")); return; }
          setBusy(true);
          void saveSubAdminFn({
            data: {
              id: row?.id,
              name,
              username,
              password,
              active,
              attendance,
              zone,
              number,
              staff,
              councillor,
              zones: zones.map((z) => ({ id: z.id, perm: z.perm })),
            },
          }).then((res) => {
            setBusy(false);
            if (!res.ok) { setMsg(tx(lang, "Could not save. Username may already exist.", "सेव नहीं हुआ। यूज़रनेम पहले से हो सकता है।")); return; }
            onBack();
          });
        }}
      >
        {tx(lang, "Save", "सेव")}
      </button>
    </div>
  );
}

function OwnPassword({ lang, onBack }: { lang: Lang; onBack: () => void }) {
  const office = useOffice();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const [ok, setOk] = useState(false);
  return (
    <div className="px-4 pt-4">
      <button type="button" onClick={onBack} className="text-sm font-bold text-accent">← {tx(lang, "Back", "वापस")}</button>
      <h1 className="mt-2 text-3xl font-extrabold">Change Password</h1>
      <p className="text-sm text-night-muted">Sub Admin · {office.name} · {office.username}</p>
      <div className="mt-4 grid gap-3 rounded-3xl border border-white/10 bg-night-3 p-3">
        {([
          ["Current Password", "Current password", current, setCurrent],
          ["New Password", "New password", next, setNext],
          ["Confirm New Password", "Confirm new password", confirm, setConfirm],
        ] as const).map(([label, placeholder, value, set]) => (
          <label key={label} className="text-sm text-night-muted">
            {label}
            <span className="relative mt-1 block">
              <input type={show ? "text" : "password"} value={value} onChange={(e) => set(e.target.value)} placeholder={placeholder} className="w-full rounded-2xl bg-night px-3 py-3 pr-10 text-night-fg" />
              <button type="button" className="absolute top-1/2 right-3 -translate-y-1/2" onClick={() => setShow((v) => !v)}>{show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
            </span>
          </label>
        ))}
        <p className="text-xs text-night-muted">Minimum 6 characters</p>
        {msg ? <p className={`text-sm ${ok ? "text-emerald-300" : "text-red-300"}`}>{msg}</p> : null}
        <button
          type="button"
          className="rounded-2xl bg-accent py-3 font-extrabold"
          onClick={() => {
            if (next.length < 6) { setOk(false); setMsg("Minimum 6 characters"); return; }
            if (next !== confirm) { setOk(false); setMsg(tx(lang, "Passwords do not match.", "पासवर्ड मिलान नहीं हुआ।")); return; }
            void changeOwnPasswordFn({ data: { current, next } }).then((res) => {
              if (!res.ok) { setOk(false); setMsg(tx(lang, "Current password is wrong.", "पुराना पासवर्ड गलत है।")); return; }
              setOk(true);
              setMsg(tx(lang, "Password updated.", "पासवर्ड बदल गया।"));
              setCurrent("");
              setNext("");
              setConfirm("");
            });
          }}
        >
          {tx(lang, "Save", "सेव")}
        </button>
      </div>
    </div>
  );
}
