import type { ErrorComponentProps } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

const FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return FALLBACK_MESSAGE;
}

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main
      className={
        "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center " +
        "bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50"
      }
    >
      <span className="text-red-500" aria-hidden="true">
        <TriangleAlert className="size-10" strokeWidth={2} />
      </span>
      <h1 className="text-lg font-semibold">Something went wrong</h1>
      <p className="max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400">
        {errorMessage(error)}
      </p>
      <button
        type="button"
        className="mt-2 rounded-xl bg-[#1a56db] px-4 py-2 text-sm font-bold text-white"
        onClick={() => {
          try {
            sessionStorage.removeItem("safai.chunk-reload");
          } catch {
            /* ignore */
          }
          const wipe = "serviceWorker" in navigator
            ? navigator.serviceWorker.getRegistrations().then((regs) => Promise.all(regs.map((reg) => reg.unregister())))
            : Promise.resolve();
          void wipe
            .then(() => ("caches" in window ? caches.keys() : Promise.resolve([] as string[])))
            .then((keys) => Promise.all(keys.filter((name) => name !== "safai-install").map((name) => caches.delete(name))))
            .then(() => location.reload());
        }}
      >
        ऐप फिर से खोलें
      </button>
    </main>
  );
}
