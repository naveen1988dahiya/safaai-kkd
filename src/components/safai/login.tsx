import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { loginAdmin, loginInspector, saveSession, fetchSession } from "@/lib/safai/api";
import { LogoMark } from "./icons";

const REMEMBER = "safai.councillor";

export function rememberedCouncillor(): { name: string; photo: string | null } | null {
  try {
    const raw = localStorage.getItem(REMEMBER);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { name?: string; photo?: string | null };
    if (!parsed.name) return null;
    return { name: parsed.name, photo: parsed.photo ?? null };
  } catch {
    return null;
  }
}

export function rememberCouncillor(name: string, photo: string | null) {
  try {
    if (!name) return;
    localStorage.setItem(REMEMBER, JSON.stringify({ name, photo }));
  } catch {
    /* ignore */
  }
}

export function AdminLogin({
  lang,
  onLang,
  onInspector,
  onSuccess,
}: {
  lang: "en" | "hi";
  onLang: (lang: "en" | "hi") => void;
  onInspector: () => void;
  onSuccess: (session: {
    role: "admin" | "subadmin";
    username: string;
    name?: string;
    perms?: {
      attendance: "edit" | "view" | "none";
      zone: "edit" | "view" | "none";
      number: "edit" | "view" | "none";
      staff: "edit" | "view" | "none";
      councillor: "edit" | "view" | "none";
      zones: { id: number; perm: "edit" | "view" | "none" }[];
    };
  }) => void;
}) {
  const hi = lang === "hi";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await loginAdmin({ data: { username, password } });
    setBusy(false);
    if (!res.ok) {
      setError(hi ? "यूज़रनेम या पासवर्ड गलत है।" : "Wrong username or password.");
      return;
    }
    saveSession(res.token, res.role, res.username);
    if (res.role === "subadmin") {
      const live = await fetchSession();
      if (live.role !== "subadmin") {
        setError(hi ? "यूज़रनेम या पासवर्ड गलत है।" : "Wrong username or password.");
        return;
      }
      onSuccess({ role: "subadmin", username: live.username, name: live.name, perms: live.perms });
      return;
    }
    onSuccess({ role: "admin", username: res.username });
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-night px-5 pb-8 text-night-fg">
      <div className="flex items-start justify-between pt-4">
        <button
          type="button"
          onClick={onInspector}
          className="rounded-full border border-night-line bg-night-3 px-3 py-2 text-left text-xs font-bold leading-tight text-night-fg"
        >
          {hi ? "स्थानीय निरीक्षक" : "Login as"}
          <span className="block">{hi ? "लॉगिन" : "Local Inspector"}</span>
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onLang(hi ? "en" : "hi")}
            className="rounded-full bg-night-3 px-3 py-1.5 text-xs font-bold"
          >
            {hi ? "हिंदी" : "EN"}
          </button>
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="mb-4 grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-sky-400 to-brand shadow-lg">
          <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden="true">
            <path d="M24 6 10 12v10c0 9 6 14 14 18 8-4 14-9 14-18V12L24 6z" fill="#e0f2fe" />
            <path d="m18 23 4 4 8-9" stroke="#1a56db" strokeWidth="3" fill="none" />
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold">{hi ? "एडमिन लॉगिन" : "Admin Login"}</h1>
        <p className="mt-1 text-center text-sm text-night-muted">
          {hi ? "नगरपालिका खरखौदा क्षेत्र · सफाई ऐप" : "Municipal Committee Kharkhoda Area · Safai App"}
        </p>
        <form onSubmit={submit} className="mt-8 w-full rounded-3xl border border-night-line bg-night-2 p-4">
          <label className="text-sm text-night-muted">{hi ? "यूज़रनेम" : "Username"}</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoCapitalize="characters"
            className="mt-1 mb-3 w-full rounded-2xl border border-night-line bg-night-3 px-4 py-3 text-lg outline-none"
          />
          <label className="text-sm text-night-muted">{hi ? "पासवर्ड" : "Password"}</label>
          <div className="relative mt-1">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={show ? "text" : "password"}
              className="w-full rounded-2xl border border-night-line bg-night-3 px-4 py-3 pr-12 text-lg outline-none"
            />
            <button type="button" className="absolute top-1/2 right-3 -translate-y-1/2 text-night-muted" onClick={() => setShow((v) => !v)}>
              {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {error ? <p className="mt-3 text-sm text-red-300">{error}</p> : null}
          <button type="submit" disabled={busy} className="g-login mt-4 w-full rounded-2xl py-3.5 text-lg font-bold text-white">
            {busy ? "…" : hi ? "लॉगिन" : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}

export function InspectorLogin({
  onBack,
  onSuccess,
}: {
  onBack: () => void;
  onSuccess: () => void;
}) {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const councillor = rememberedCouncillor();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await loginInspector({ data: { code, password, phone } });
    setBusy(false);
    if (!res.ok || !res.profile) {
      setError("कोड या पासवर्ड गलत है।");
      return;
    }
    saveSession(res.token, "inspector");
    try {
      localStorage.setItem("safai.inspectorProfile", JSON.stringify(res.profile));
    } catch {
      /* ignore */
    }
    if (res.profile.councillorName) rememberCouncillor(res.profile.councillorName, res.profile.councillorPhoto);
    onSuccess();
  }

  return (
    <main className="mx-auto min-h-dvh w-full max-w-[430px] bg-canvas">
      <header className="rounded-b-[2rem] bg-brand px-5 pt-4 pb-16 text-white">
        <button type="button" onClick={onBack} className="mb-4 rounded-full bg-white/15 px-3 py-1.5 text-sm font-bold">
          ← एडमिन लॉगिन
        </button>
        <div className="text-center">
          <h1 className="text-3xl font-extrabold leading-tight">सफाई निरीक्षण फॉर्म</h1>
          <p className="mt-1 text-sm text-white/90">नगरपालिका खरखौदा क्षेत्र</p>
        </div>
        <div className="mx-auto mt-4 grid h-24 w-24 place-items-center overflow-hidden rounded-3xl bg-white/15">
          {councillor?.photo ? (
            <img src={councillor.photo} alt="" className="h-full w-full object-cover" />
          ) : (
            <LogoMark className="h-20 w-20" />
          )}
        </div>
      </header>
      <form onSubmit={submit} className="relative z-10 -mt-8 mx-4 rounded-3xl bg-white p-4 shadow-lg">
        <div className="rounded-2xl border border-blue-200 bg-blue-50 px-3 py-3 text-lg leading-snug text-ink">
          {councillor ? (
            <span>
              ये सफाई अभियान <b>{councillor.name}</b> द्वारा चलाया जा रहा है। कृपया सहयोग करें।
            </span>
          ) : (
            <span>ये सफाई अभियान आपके वार्ड पार्षद द्वारा चलाया जा रहा है। कृपया सहयोग करें।</span>
          )}
        </div>
        <label className="mt-4 block text-lg font-extrabold">कोड (User Code)</label>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          className="mt-1 w-full rounded-2xl border-2 border-line px-4 py-3 text-2xl font-bold outline-none focus:border-brand"
        />
        <label className="mt-4 block text-lg font-extrabold">पासवर्ड</label>
        <div className="relative mt-1">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            className="w-full rounded-2xl border-2 border-line px-4 py-3 pr-12 text-2xl outline-none focus:border-brand"
          />
          <button type="button" className="absolute top-1/2 right-3 -translate-y-1/2 text-muted" onClick={() => setShow((v) => !v)}>
            {show ? <EyeOff /> : <Eye />}
          </button>
        </div>
        <label className="mt-4 block text-lg font-extrabold">फोन कोड <span className="text-sm font-semibold text-muted">(ज़रूरी नहीं)</span></label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value.slice(0, 12))}
          placeholder="खाली छोड़ सकते हैं"
          className="mt-1 w-full rounded-2xl border-2 border-line px-4 py-3 text-xl outline-none focus:border-brand"
        />
        {error ? <p className="mt-3 text-base font-semibold text-danger">{error}</p> : null}
        <button type="submit" disabled={busy} className="mt-5 w-full rounded-2xl bg-brand py-4 text-xl font-extrabold text-white">
          {busy ? "…" : "आगे बढ़ें →"}
        </button>
      </form>
    </main>
  );
}
