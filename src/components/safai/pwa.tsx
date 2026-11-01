import { useEffect, useState } from "react";

type InstallEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

export function PwaChrome() {
  const [install, setInstall] = useState<InstallEvent | null>(null);

  useEffect(() => {
    document.getElementById("boot")?.remove();
    if ("serviceWorker" in navigator) {
      void navigator.serviceWorker.getRegistrations().then((regs) => Promise.all(regs.map((reg) => reg.unregister())));
    }
    const onPrompt = (event: Event) => {
      event.preventDefault();
      setInstall(event as InstallEvent);
    };
    const onInstalled = () => setInstall(null);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (!install) return null;
  return (
    <div className="fixed bottom-24 left-1/2 z-50 w-[min(100%-1.5rem,400px)] -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-3 text-slate-900 shadow-xl">
      <div className="flex items-center gap-3">
        <img src="/icons/icon-192.png" alt="" className="h-12 w-12 rounded-2xl" />
        <div className="min-w-0">
          <b className="block truncate">सफाई निरीक्षण</b>
          <span className="block truncate text-xs text-slate-500">नगरपालिका खरखौदा क्षेत्र</span>
        </div>
      </div>
      <button
        type="button"
        className="mt-3 w-full rounded-xl bg-[#1a56db] py-2.5 text-base font-extrabold text-white"
        onClick={() => {
          void install.prompt().finally(() => setInstall(null));
        }}
      >
        App इंस्टॉल करें
      </button>
    </div>
  );
}
