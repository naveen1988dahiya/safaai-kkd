import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ClipboardList, Lock } from "lucide-react";
import { istNow, dmy, monthStart, score2, shiftIso, weekStart } from "@/lib/safai/format";
import { loadInspectorHome, loadMyComplaints, loadMyReports, fileComplaint, sendEntry } from "@/lib/safai/api";
import { rememberCouncillor } from "./login";
import { BroomIcon, DrainIcon, TrashIcon } from "./icons";

type Profile = {
  id: number;
  code: string;
  name: string;
  wardNo: number | null;
  zoneName: string | null;
  councillorName: string;
  councillorPhoto: string | null;
  dateLabel: string;
  serverNow: number;
  phoneCode?: string;
};

type Entry = {
  number: number;
  jhadu: boolean;
  nali: boolean;
  kooda: boolean;
  score: number;
  status: string;
  editableUntil: number;
  serverNow: number;
  leftMs: number;
};

const ERRORS: Record<string, string> = {
  duplicate: "आज इस नंबर पर कार्य चढ़ाया जा चुका है। कृपया दूसरा नंबर डालें।",
  wrong: "गलत नंबर। कृपया सही नंबर डालें।",
  repeat: "यह नंबर कल और आज दोनों को दिया गया है। एंट्री नहीं हो सकती।",
  none: "आज की तारीख के लिए कोई नंबर assign नहीं हुआ।",
  range: "नंबर 1 से 999 के बीच होना चाहिए।",
  work: "सफाई प्रकार चुनें।",
  score: "सफाई अंक चुनें।",
};

function zoneHindi(name: string | null) {
  const clean = (name || "").trim();
  if (!clean) return "जोन";
  const num = clean.replace(/^(zone|ज़ोन|जोन)\s*/i, "").trim();
  return `जोन ${num || clean}`;
}

function clock(ms: number) {
  const s = Math.max(0, Math.ceil(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function denied(res: unknown): boolean {
  return !!res && typeof res === "object" && "unauthorized" in res && (res as { unauthorized?: boolean }).unauthorized === true;
}

export function InspectorApp({ onKicked }: { onKicked: () => void }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [offline, setOffline] = useState(false);
  const [view, setView] = useState<"form" | "report">("form");
  const [phase, setPhase] = useState<"edit" | "done" | "final">("edit");
  const [number, setNumber] = useState("");
  const [jhadu, setJhadu] = useState(false);
  const [nali, setNali] = useState(false);
  const [kooda, setKooda] = useState(false);
  const [score, setScore] = useState(0);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [entry, setEntry] = useState<Entry | null>(null);
  const [now, setNow] = useState(Date.now());
  const [offset, setOffset] = useState(0);
  const hydrated = useRef(false);

  async function refresh() {
    try {
      const res = await loadInspectorHome();
      if (denied(res)) {
        onKicked();
        return;
      }
      if (!res || !("profile" in res) || !res.profile) {
        setOffline(true);
        return;
      }
      setOffline(false);
      setProfile(res.profile);
      try {
        localStorage.setItem("safai.inspectorProfile", JSON.stringify(res.profile));
      } catch {
        /* ignore */
      }
      setOffset(res.profile.serverNow - Date.now());
      if (res.profile.councillorName) rememberCouncillor(res.profile.councillorName, res.profile.councillorPhoto);
      if (!hydrated.current && res.openEntry && res.openEntry.status === "editable" && res.openEntry.leftMs > 0) {
        hydrated.current = true;
        setEntry(res.openEntry);
        setPhase("done");
        setView("form");
        setNumber(String(res.openEntry.number));
        setJhadu(res.openEntry.jhadu);
        setNali(res.openEntry.nali);
        setKooda(res.openEntry.kooda);
        setScore(res.openEntry.score);
      } else {
        hydrated.current = true;
      }
    } catch {
      setOffline(true);
    }
  }

  useLayoutEffect(() => {
    try {
      const raw = localStorage.getItem("safai.inspectorProfile");
      if (!raw) return;
      const cached = JSON.parse(raw) as Profile;
      if (cached?.code) setProfile(cached);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    void refresh();
    const poll = setInterval(() => void refresh(), 8000);
    const tick = setInterval(() => setNow(Date.now()), 500);
    return () => {
      clearInterval(poll);
      clearInterval(tick);
    };
    // refresh identity is stable enough for this screen
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const left = entry ? entry.editableUntil - (now + offset) : 0;
  useEffect(() => {
    if (phase === "done" && entry && left <= 0) setPhase("final");
    if (phase === "edit" && entry && left <= 0) setPhase("final");
  }, [left, phase, entry]);

  async function submit() {
    setError("");
    const n = Number(number);
    if (!Number.isInteger(n) || n < 1 || n > 999) {
      setError("range");
      return;
    }
    if (!jhadu && !nali && !kooda) {
      setError("work");
      return;
    }
    if (!score) {
      setError("score");
      return;
    }
    setBusy(true);
    const res = await sendEntry({ data: { number: n, jhadu, nali, kooda, score } });
    setBusy(false);
    if (denied(res)) {
      onKicked();
      return;
    }
    if (!res.ok) {
      setError("error" in res ? res.error : "");
      return;
    }
    setEntry(res.entry);
    setOffset(res.entry.serverNow - Date.now());
    setPhase(res.entry.status === "final" ? "final" : "done");
    setView("form");
  }

  function freshForm() {
    setPhase("edit");
    setEntry(null);
    setNumber("");
    setJhadu(false);
    setNali(false);
    setKooda(false);
    setScore(0);
    setError("");
    setView("form");
  }

  if (!profile) {
    return (
      <main className="mx-auto grid min-h-dvh w-full max-w-[430px] place-items-center bg-canvas px-6 text-center">
        <div>
          <h1 className="text-3xl font-extrabold text-brand">सफाई निरीक्षण फॉर्म</h1>
          <p className="mt-1 text-base text-muted">नगरपालिका खरखौदा क्षेत्र</p>
          {offline ? <p className="mt-4 text-sm text-muted">कनेक्शन नहीं हुआ। ऐप बंद करके फिर खोलें।</p> : null}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-dvh w-full max-w-[430px] overflow-x-hidden bg-canvas pb-8">
      <header className="bg-brand px-4 pt-4 pb-5 text-white">
        <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-2">
          {profile.councillorPhoto ? (
            <img src={profile.councillorPhoto} alt="" className="h-14 w-14 rounded-full object-cover" />
          ) : (
            <div className="grid h-14 w-14 place-items-center rounded-full bg-white/20 text-lg font-bold">प</div>
          )}
          <div className="min-w-0">
            <div className="truncate text-xl font-extrabold">{profile.councillorName || "वार्ड पार्षद"}</div>
            <div className="text-sm text-white/85">पार्षद, वार्ड नं. {profile.wardNo ?? "—"}</div>
          </div>
        </div>
        <div className="mt-3 flex items-start justify-between gap-3">
          <div>
            <div className="text-2xl font-extrabold">
              {profile.name}
              {profile.phoneCode ? <span className="ml-2 text-base font-bold text-white/90">फोन {profile.phoneCode}</span> : null}
            </div>
            <div className="text-base text-white/90">(स्थानीय निरीक्षक)</div>
            <div className="text-base">
              {zoneHindi(profile.zoneName)} · वार्ड {profile.wardNo ?? "—"} · कोड {profile.code}
            </div>
            <div className="text-base">तारीख: {profile.dateLabel}</div>
          </div>
          <button type="button" onClick={() => setView("report")} className="grid max-w-[6.5rem] place-items-center text-center text-[11px] font-bold leading-tight">
            <ClipboardList className="h-7 w-7" />
            रिपोर्ट / शिकायत
          </button>
        </div>
      </header>

      {view === "report" ? (
        <ReportPanel onBack={() => setView("form")} onNew={freshForm} onKicked={onKicked} />
      ) : phase === "done" && entry ? (
        <section className="mx-4 mt-4 rounded-3xl bg-white p-5 text-center shadow">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-ok text-4xl text-white">✓</div>
          <h2 className="mt-3 text-2xl font-extrabold">फॉर्म जमा हो गया है</h2>
          <Summary number={entry.number} jhadu={entry.jhadu} nali={entry.nali} kooda={entry.kooda} score={entry.score} />
          <p className="mt-4 text-sm leading-relaxed text-muted">
            अगर आप चाहें तो 2 मिनट के अंदर बदलाव कर सकते हैं। इसके लिए नीचे वाला बटन दबाएं।
          </p>
          <button
            type="button"
            onClick={() => setPhase("edit")}
            className="mt-3 w-full rounded-2xl border border-line py-3 text-lg font-bold text-muted"
          >
            बदलाव करें
          </button>
          <p className="mt-2 text-sm text-muted">समय बाकी: {clock(left)}</p>
          <button type="button" onClick={freshForm} className="mt-4 w-full rounded-2xl bg-brand py-4 text-xl font-extrabold text-white">
            नया फॉर्म भरें
          </button>
        </section>
      ) : phase === "final" && entry ? (
        <section className="mx-4 mt-4 rounded-3xl bg-white p-5 text-center shadow">
          <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-emerald-50">
            <Lock className="h-12 w-12 text-amber-500" />
          </div>
          <h2 className="mt-3 flex items-center justify-center gap-2 text-2xl font-extrabold text-ok">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-ok text-lg text-white">✓</span>
            फॉर्म फाइनल हो गया
          </h2>
          <p className="mt-1 text-base text-muted">अब इसमें बदलाव नहीं हो सकता। धन्यवाद!</p>
          <Summary number={entry.number} jhadu={entry.jhadu} nali={entry.nali} kooda={entry.kooda} score={entry.score} />
          <button type="button" onClick={freshForm} className="mt-4 w-full rounded-2xl bg-blue-50 px-3 py-3 text-base font-semibold text-brand">
            अगला फॉर्म नए नंबर के साथ भरें।
          </button>
        </section>
      ) : (
        <section className="mx-4 mt-4 rounded-3xl bg-white p-4 shadow">
          {entry && phase === "edit" ? (
            <p className="mb-3 rounded-xl bg-slate-100 px-3 py-2 text-sm text-muted">
              बदलाव करके दोबारा जमा करें · समय बाकी: {clock(left)}
            </p>
          ) : null}
          <h2 className="text-center text-2xl font-extrabold text-brand">सफाई निरीक्षण फॉर्म</h2>
          <p className="text-center text-base text-muted">नगरपालिका खरखौदा क्षेत्र</p>
          <label className="mt-3 block text-lg font-extrabold">
            आज का नंबर डालें <span className="text-danger">*</span>
          </label>
          <p className="text-sm text-muted">(सफाई कर्मचारी से पूछकर नंबर डालें) · 1 से 999</p>
          <input
            inputMode="numeric"
            readOnly={phase === "edit" && !!entry}
            value={number}
            onChange={(e) => {
              setNumber(e.target.value.replace(/[^\d]/g, "").slice(0, 3));
              setError("");
            }}
            className={`mt-1 w-full rounded-2xl border-2 px-4 py-3 text-center text-3xl font-extrabold outline-none ${error === "range" || error === "wrong" || error === "duplicate" || error === "none" || error === "repeat" ? "border-danger" : "border-line"}`}
          />
          {error && ERRORS[error] && (error === "range" || error === "wrong" || error === "duplicate" || error === "none" || error === "repeat") ? (
            <p className="mt-2 rounded-xl bg-red-50 px-3 py-2 text-base font-semibold text-danger">{ERRORS[error]}</p>
          ) : null}
          {error && (error === "range" || error === "wrong" || error === "duplicate" || error === "none" || error === "repeat") ? (
            <div className="mt-3 rounded-2xl border border-red-100 p-3">
              <p className="mb-2 text-sm font-bold">गलती होने पर दिखने वाले संदेश:</p>
              {Object.entries(ERRORS)
                .filter(([k]) => ["duplicate", "wrong", "repeat", "none", "range"].includes(k))
                .map(([key, text], i) => (
                  <p key={key} className="mt-2 rounded-xl bg-red-50 px-3 py-2 text-sm text-danger">
                    {i + 1}. {text}
                  </p>
                ))}
            </div>
          ) : null}

          <p className="mt-4 text-lg font-extrabold">
            सफाई प्रकार <span className="text-danger">*</span>
          </p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            <WorkTile label="झाड़ू" on={jhadu} onClick={() => setJhadu((v) => !v)} icon={<BroomIcon />} />
            <WorkTile label="नाली" on={nali} onClick={() => setNali((v) => !v)} icon={<DrainIcon />} />
            <WorkTile label="कूड़ा उठान" on={kooda} onClick={() => setKooda((v) => !v)} icon={<TrashIcon />} />
          </div>
          {error === "work" ? <p className="mt-2 text-base font-semibold text-danger">{ERRORS.work}</p> : null}

          <p className="mt-4 text-lg font-extrabold">
            सफाई अंक <span className="text-danger">*</span>
          </p>
          <div className="mt-2 flex justify-between">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setScore(n)}
                className={`grid h-12 w-12 place-items-center rounded-full border-2 text-xl font-extrabold ${score === n ? "border-brand bg-brand text-white" : "border-brand text-brand"}`}
              >
                {n}
              </button>
            ))}
          </div>
          {error === "score" ? <p className="mt-2 text-base font-semibold text-danger">{ERRORS.score}</p> : null}

          <button type="button" disabled={busy} onClick={() => void submit()} className="mt-5 w-full rounded-2xl bg-brand py-4 text-xl font-extrabold text-white">
            {busy ? "…" : entry ? "दोबारा जमा करें" : "फ़ॉर्म जमा करें"}
          </button>
          {entry ? (
            <>
              <p className="mt-2 text-center text-sm text-muted">दोबारा जमा ना करने पर पहले वाला फॉर्म ही फाइनल माना जाएगा।</p>
              <p className="text-center text-sm font-semibold text-danger">समय बाकी: {clock(left)}</p>
            </>
          ) : null}
        </section>
      )}
    </main>
  );
}

function WorkTile({ label, on, onClick, icon, tone = "blue" }: { label: string; on: boolean; onClick: () => void; icon: React.ReactNode; tone?: "blue" | "yellow" }) {
  const selected = tone === "yellow" ? "border-amber-400 bg-amber-50" : "border-brand bg-blue-50";
  const tick = tone === "yellow" ? "bg-amber-400" : "bg-brand";
  return (
    <button type="button" onClick={onClick} className={`relative rounded-2xl border-2 px-1 py-3 ${on ? selected : "border-line bg-white"}`}>
      {on ? <span className={`absolute top-1 right-1 grid h-5 w-5 place-items-center rounded-full text-xs text-white ${tick}`}>✓</span> : null}
      <div className="mx-auto w-fit">{icon}</div>
      <div className="mt-1 text-sm font-extrabold">{label}</div>
    </button>
  );
}

function Summary({ number, jhadu, nali, kooda, score }: { number: number; jhadu: boolean; nali: boolean; kooda: boolean; score: number }) {
  const works = [jhadu ? "झाड़ू" : "", nali ? "नाली" : "", kooda ? "कूड़ा उठान" : ""].filter(Boolean).join(", ");
  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-line text-left text-lg">
      <Row k="आज का नंबर" v={String(number)} />
      <Row k="सफाई प्रकार" v={works} />
      <Row k="सफाई अंक" v={`${score} / 5`} />
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between border-b border-line px-3 py-2 last:border-0">
      <span>{k}</span>
      <b>{v}</b>
    </div>
  );
}

function kindLabel(row: { jhadu: boolean; nali: boolean; kooda: boolean }) {
  return [row.jhadu ? "झाड़ू" : "", row.nali ? "नाली" : "", row.kooda ? "कूड़ा उठान" : ""].filter(Boolean).join(", ");
}

function ReportPanel({ onBack, onNew, onKicked }: { onBack: () => void; onNew: () => void; onKicked: () => void }) {
  const today = istNow().iso;
  const [mode, setMode] = useState<"week" | "month" | "custom">("month");
  const [from, setFrom] = useState(monthStart(today));
  const [to, setTo] = useState(today);
  const [rows, setRows] = useState<{ date: string; number: number; absent?: boolean; jhadu: boolean; nali: boolean; kooda: boolean; score: number }[]>([]);
  const [total, setTotal] = useState(0);
  const [avg, setAvg] = useState<number | null>(null);
  const [complaints, setComplaints] = useState<{ id: number; jhadu: boolean; nali: boolean; kooda: boolean; done: boolean; date: string; solved: string }[]>([]);
  const [filing, setFiling] = useState(false);
  const [pick, setPick] = useState({ jhadu: false, nali: false, kooda: false });
  const [busy, setBusy] = useState(false);

  const range = useMemo(() => {
    if (mode === "week") return { from: weekStart(today), to: today };
    if (mode === "month") return { from: monthStart(today), to: today };
    return { from, to: to < from ? from : to };
  }, [mode, from, to, today]);

  function loadComplaints() {
    void loadMyComplaints().then((res) => {
      if (denied(res)) {
        onKicked();
        return;
      }
      if (res.ok) setComplaints(res.rows);
    });
  }

  useEffect(() => {
    void loadMyReports({ data: range }).then((res) => {
      if (denied(res)) {
        onKicked();
        return;
      }
      if (!res.ok) return;
      setRows(res.rows);
      setTotal(res.total);
      setAvg(res.avg);
    });
  }, [range, onKicked]);

  useEffect(() => {
    loadComplaints();
  }, [onKicked]);

  async function submitComplaint() {
    if (!pick.jhadu && !pick.nali && !pick.kooda) return;
    setBusy(true);
    const res = await fileComplaint({ data: pick });
    setBusy(false);
    if (denied(res)) {
      onKicked();
      return;
    }
    if (!res.ok) return;
    setFiling(false);
    setPick({ jhadu: false, nali: false, kooda: false });
    loadComplaints();
  }

  return (
    <section className="px-4 pt-4">
      <button type="button" onClick={onBack} className="mb-2 text-base font-bold text-brand">
        ← फॉर्म
      </button>
      <h2 className="text-2xl font-extrabold">मेरी रिपोर्ट</h2>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="rounded-3xl bg-white p-4 text-center shadow">
          <div className="text-4xl font-extrabold text-brand">{total}</div>
          <div>कुल रिपोर्ट</div>
        </div>
        <div className="rounded-3xl bg-white p-4 text-center shadow">
          <div className="text-4xl font-extrabold text-ok">{score2(avg)}</div>
          <div>औसत अंक</div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <Chip on={mode === "week"} onClick={() => setMode("week")}>इस हफ़्ते</Chip>
        <Chip on={mode === "month"} onClick={() => setMode("month")}>इस महीने</Chip>
        <Chip on={mode === "custom"} onClick={() => setMode("custom")}>तारीख चुनें</Chip>
      </div>
      {mode === "custom" ? (
        <div className="mt-2 grid grid-cols-2 gap-2">
          <label className="relative block rounded-xl border px-2 py-2">
            <span className="block">{from ? dmy(from) : "दिनांक चुनें"}</span>
            <input type="date" value={from} max={shiftIso(today, 0)} onChange={(e) => setFrom(e.target.value)} className="absolute inset-0 opacity-0" />
          </label>
          <label className="relative block rounded-xl border px-2 py-2">
            <span className="block">{to ? dmy(to) : "दिनांक चुनें"}</span>
            <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="absolute inset-0 opacity-0" />
          </label>
        </div>
      ) : null}
      <div className="mt-3 max-h-[18.5rem] overflow-y-auto rounded-2xl bg-white shadow">
        <table className="w-full table-fixed text-[12px]">
          <thead className="sticky top-0 bg-white text-muted">
            <tr>
              <th className="w-[16%] px-1 py-2 text-left font-semibold">दिनांक</th>
              <th className="w-[14%] text-left font-semibold">नंबर</th>
              <th className="w-[17%] text-center font-semibold">झाड़ू</th>
              <th className="w-[17%] text-center font-semibold">नाली</th>
              <th className="w-[18%] text-center font-semibold">कूड़ा</th>
              <th className="w-[18%] pr-1 text-right font-semibold">अंक</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={6} className="px-2 py-6 text-center text-muted">अभी कोई रिपोर्ट नहीं।</td></tr>
            ) : (
              rows.map((r, i) => (
                <tr key={i} className="border-t border-line">
                  <td className="px-1 py-2">{r.date.slice(0, 5)}</td>
                  <td className={`font-extrabold ${r.absent ? "text-amber-500" : ""}`}>{r.absent ? "A" : r.number}</td>
                  <td className="text-center"><span className={r.jhadu ? "text-emerald-500" : "text-slate-300"}>{r.jhadu ? "●" : "○"}</span></td>
                  <td className="text-center"><span className={r.nali ? "text-emerald-500" : "text-slate-300"}>{r.nali ? "●" : "○"}</span></td>
                  <td className="text-center"><span className={r.kooda ? "text-emerald-500" : "text-slate-300"}>{r.kooda ? "●" : "○"}</span></td>
                  <td className="pr-1 text-right font-extrabold text-amber-500">{r.score}★</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <button type="button" onClick={onNew} className="mt-4 w-full rounded-2xl bg-brand py-4 text-xl font-extrabold text-white">
        + नया फॉर्म भरें
      </button>
      <button type="button" onClick={() => setFiling(true)} className="mt-3 w-full rounded-2xl bg-amber-400 py-4 text-xl font-extrabold text-slate-900">
        शिकायत दर्ज करें
      </button>
      <h3 className="mt-5 text-xl font-extrabold">मेरी शिकायतें</h3>
      <div className="mt-2 max-h-[16rem] overflow-y-auto rounded-2xl bg-white shadow">
        <table className="w-full table-fixed text-[12px]">
          <thead className="sticky top-0 bg-white text-muted">
            <tr>
              <th className="w-[22%] px-1 py-2 text-left font-semibold">दिनांक</th>
              <th className="w-[34%] text-left font-semibold">प्रकार</th>
              <th className="w-[18%] text-left font-semibold">स्थिति</th>
              <th className="w-[26%] pr-1 text-right font-semibold">समाधान</th>
            </tr>
          </thead>
          <tbody>
            {complaints.length === 0 ? (
              <tr><td colSpan={4} className="px-2 py-6 text-center text-muted">अभी कोई शिकायत नहीं।</td></tr>
            ) : (
              complaints.map((row) => (
                <tr key={row.id} className="border-t border-line">
                  <td className="px-1 py-2">{row.date.slice(0, 5)}</td>
                  <td className="py-2">{kindLabel(row)}</td>
                  <td className={`py-2 font-extrabold ${row.done ? "text-emerald-600" : "text-red-600"}`}>{row.done ? "पूर्ण" : "अधूरी"}</td>
                  <td className="pr-1 py-2 text-right">{row.solved ? row.solved.slice(0, 5) : "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {filing ? (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/45">
          <div className="max-h-[92dvh] w-full max-w-[430px] overflow-y-auto rounded-t-3xl bg-white p-4 pb-8">
            <button type="button" onClick={() => setFiling(false)} className="w-full rounded-2xl border border-line py-3 text-base font-bold text-muted">
              अभी कोई शिकायत नहीं
            </button>
            <h2 className="mt-4 text-center text-xl font-extrabold">शिकायत का प्रकार चुनें</h2>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <WorkTile tone="yellow" label="झाड़ू" on={pick.jhadu} onClick={() => setPick({ ...pick, jhadu: !pick.jhadu })} icon={<BroomIcon tone="yellow" />} />
              <WorkTile tone="yellow" label="नाली" on={pick.nali} onClick={() => setPick({ ...pick, nali: !pick.nali })} icon={<DrainIcon tone="yellow" />} />
              <WorkTile tone="yellow" label="कूड़ा उठान" on={pick.kooda} onClick={() => setPick({ ...pick, kooda: !pick.kooda })} icon={<TrashIcon tone="yellow" />} />
            </div>
            <button type="button" disabled={busy || (!pick.jhadu && !pick.nali && !pick.kooda)} onClick={() => void submitComplaint()} className="mt-5 w-full rounded-2xl bg-amber-400 py-4 text-xl font-extrabold text-slate-900 disabled:opacity-50">
              {busy ? "…" : "जमा करें"}
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} className={`rounded-full px-4 py-2 text-base font-bold ${on ? "bg-brand text-white" : "bg-white text-ink"}`}>
      {children}
    </button>
  );
}
