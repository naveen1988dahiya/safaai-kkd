import { o as __toESM } from "../_runtime.mjs";
import { _ as createFileRoute, b as require_jsx_runtime, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, q as require_react, v as createRootRoute, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, n as createMiddleware, r as createServerFn, u as __exportAll } from "./ssr.mjs";
import { a as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CX1FV30_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-2 rounded-xl bg-[#1a56db] px-4 py-2 text-sm font-bold text-white",
				onClick: () => {
					try {
						sessionStorage.removeItem("safai.chunk-reload");
					} catch {}
					("serviceWorker" in navigator ? navigator.serviceWorker.getRegistrations().then((regs) => Promise.all(regs.map((reg) => reg.unregister()))) : Promise.resolve()).then(() => "caches" in window ? caches.keys() : Promise.resolve([])).then((keys) => Promise.all(keys.filter((name) => name !== "safai-install").map((name) => caches.delete(name)))).then(() => location.reload());
				},
				children: "ऐप फिर से खोलें"
			})
		]
	});
}
/**
* Path-based preview hosts serve the dev server under `/{port_id}/` and strip
* that prefix before forwarding, so SSR sees `/` while the browser URL keeps the
* prefix. TanStack Start resets `basepath` on hydration, so a `rewrite` keeps
* client routing and generated links aligned with the public URL.
*/
var PATH_BASED_PREVIEW_HOSTS = /* @__PURE__ */ new Set([
	"preview.grok.genai.mil",
	"preview.grok.mil",
	"preview.grokgsac.com"
]);
var PORT_ID_PREFIX = /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i;
function previewPathPrefix(hostname, pathname) {
	if (!PATH_BASED_PREVIEW_HOSTS.has(hostname.toLowerCase())) return void 0;
	return PORT_ID_PREFIX.exec(pathname)?.[0];
}
function prefixRewrite(prefix) {
	return {
		input: ({ url }) => {
			if (url.pathname === prefix) url.pathname = "/";
			else if (url.pathname.startsWith(`${prefix}/`)) url.pathname = url.pathname.slice(prefix.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = `${prefix}${url.pathname}`;
			return url;
		}
	};
}
function previewPathRewrite() {
	if (typeof window === "undefined") return void 0;
	const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
	return prefix ? prefixRewrite(prefix) : void 0;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function PwaChrome() {
	const [install, setInstall] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		document.getElementById("boot")?.remove();
		if ("serviceWorker" in navigator) navigator.serviceWorker.getRegistrations().then((regs) => Promise.all(regs.map((reg) => reg.unregister())));
		const onPrompt = (event) => {
			event.preventDefault();
			setInstall(event);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed bottom-24 left-1/2 z-50 w-[min(100%-1.5rem,400px)] -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-3 text-slate-900 shadow-xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/icons/icon-192.png",
				alt: "",
				className: "h-12 w-12 rounded-2xl"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
					className: "block truncate",
					children: "सफाई निरीक्षण"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block truncate text-xs text-slate-500",
					children: "नगरपालिका खरखौदा क्षेत्र"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "mt-3 w-full rounded-xl bg-[#1a56db] py-2.5 text-base font-extrabold text-white",
			onClick: () => {
				install.prompt().finally(() => setInstall(null));
			},
			children: "App इंस्टॉल करें"
		})]
	});
}
var styles_default$1 = "/assets/styles-JeTIId2u.css";
var styles_default = "/*! tailwindcss v4.3.3 | MIT License | https://tailwindcss.com */\n@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-scale-x:1;--tw-scale-y:1;--tw-scale-z:1;--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-space-y-reverse:0;--tw-border-style:solid;--tw-gradient-position:initial;--tw-gradient-from:#0000;--tw-gradient-via:#0000;--tw-gradient-to:#0000;--tw-gradient-stops:initial;--tw-gradient-via-stops:initial;--tw-gradient-from-position:0%;--tw-gradient-via-position:50%;--tw-gradient-to-position:100%;--tw-leading:initial;--tw-font-weight:initial;--tw-ordinal:initial;--tw-slashed-zero:initial;--tw-numeric-figure:initial;--tw-numeric-spacing:initial;--tw-numeric-fraction:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-outline-style:solid;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-duration:initial;--tw-ease:initial;--tw-content:\"\"}}}@layer theme{:root,:host{--font-sans:\"Noto Sans\", \"Noto Sans Devanagari\", system-ui, sans-serif;--font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;--color-red-50:oklch(97.1% .013 17.38);--color-red-100:oklch(93.6% .032 17.717);--color-red-200:oklch(88.5% .062 18.334);--color-red-300:oklch(80.8% .114 19.571);--color-red-400:oklch(70.4% .191 22.216);--color-red-500:oklch(63.7% .237 25.331);--color-red-600:oklch(57.7% .245 27.325);--color-amber-50:oklch(98.7% .022 95.277);--color-amber-100:oklch(96.2% .059 95.617);--color-amber-200:oklch(92.4% .12 95.746);--color-amber-300:oklch(87.9% .169 91.605);--color-amber-400:oklch(82.8% .189 84.429);--color-amber-500:oklch(76.9% .188 70.08);--color-emerald-50:oklch(97.9% .021 166.113);--color-emerald-200:oklch(90.5% .093 164.15);--color-emerald-300:oklch(84.5% .143 164.978);--color-emerald-400:oklch(76.5% .177 163.223);--color-emerald-500:oklch(69.6% .17 162.48);--color-emerald-600:oklch(59.6% .145 163.225);--color-emerald-950:oklch(26.2% .051 172.552);--color-sky-200:oklch(90.1% .058 230.902);--color-sky-400:oklch(74.6% .16 232.661);--color-blue-50:oklch(97% .014 254.604);--color-blue-200:oklch(88.2% .059 254.128);--color-blue-500:oklch(62.3% .214 259.815);--color-indigo-600:oklch(51.1% .262 276.966);--color-slate-100:oklch(96.8% .007 247.896);--color-slate-200:oklch(92.9% .013 255.508);--color-slate-300:oklch(86.9% .022 252.894);--color-slate-400:oklch(70.4% .04 256.788);--color-slate-500:oklch(55.4% .046 257.417);--color-slate-600:oklch(44.6% .043 257.281);--color-slate-900:oklch(20.8% .042 265.755);--color-zinc-50:oklch(98.5% 0 none);--color-zinc-400:oklch(70.5% .015 286.067);--color-zinc-500:oklch(55.2% .016 285.938);--color-zinc-900:oklch(21% .006 285.885);--color-zinc-950:oklch(14.1% .005 285.823);--color-neutral-100:oklch(97% 0 none);--color-neutral-300:oklch(87% 0 none);--color-neutral-500:oklch(55.6% 0 none);--color-neutral-700:oklch(37.1% 0 none);--color-neutral-900:oklch(20.5% 0 none);--color-black:#000;--color-white:#fff;--spacing:.25rem;--container-sm:24rem;--container-md:28rem;--text-xs:.75rem;--text-xs--line-height:calc(1 / .75);--text-sm:.875rem;--text-sm--line-height:calc(1.25 / .875);--text-base:1rem;--text-base--line-height:calc(1.5 / 1);--text-lg:1.125rem;--text-lg--line-height:calc(1.75 / 1.125);--text-xl:1.25rem;--text-xl--line-height:calc(1.75 / 1.25);--text-2xl:1.5rem;--text-2xl--line-height:calc(2 / 1.5);--text-3xl:1.875rem;--text-3xl--line-height:calc(2.25 / 1.875);--text-4xl:2.25rem;--text-4xl--line-height:calc(2.5 / 2.25);--font-weight-medium:500;--font-weight-semibold:600;--font-weight-bold:700;--font-weight-extrabold:800;--tracking-tight:-.025em;--leading-tight:1.25;--leading-snug:1.375;--leading-normal:1.5;--leading-relaxed:1.625;--radius-xs:.125rem;--radius-sm:.25rem;--radius-md:.375rem;--radius-lg:.5rem;--radius-xl:.75rem;--radius-2xl:1rem;--radius-3xl:1.5rem;--ease-out:cubic-bezier(0, 0, .2, 1);--ease-in-out:cubic-bezier(.4, 0, .2, 1);--animate-pulse:pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono);--color-brand:#1a56db;--color-canvas:#eef3fb;--color-ink:#172033;--color-muted:#64748b;--color-line:#e2e8f0;--color-danger:#dc2626;--color-ok:#16a34a;--color-night:#0d1024;--color-night-2:#171433;--color-night-3:#211c45;--color-night-fg:#f5f7ff;--color-night-muted:#b7b3d6;--color-night-line:#332d5c;--color-accent:#7c5cff}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", \"Noto Sans\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(:not(iframe)){outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}html,body,#root{min-height:100%}body{color:var(--color-ink);font-family:var(--font-sans);background:#d7e0ee;margin:0}button:not(:disabled),[role=button]:not(:disabled){cursor:pointer}input,button,select,textarea{font-family:inherit}button:disabled{opacity:.55}}@layer components;@layer utilities{.pointer-events-none{pointer-events:none}.collapse{visibility:collapse}.invisible{visibility:hidden}.visible{visibility:visible}.absolute{position:absolute}.fixed{position:fixed}.relative{position:relative}.static{position:static}.sticky{position:sticky}.inset-0{inset:0}.-top-1{top:calc(var(--spacing) * -1)}.top-0{top:0}.top-1{top:var(--spacing)}.top-1\\/2{top:50%}.-right-1{right:calc(var(--spacing) * -1)}.-right-2{right:calc(var(--spacing) * -2)}.right-1{right:var(--spacing)}.right-2{right:calc(var(--spacing) * 2)}.right-3{right:calc(var(--spacing) * 3)}.right-4{right:calc(var(--spacing) * 4)}.bottom-0{bottom:0}.bottom-24{bottom:calc(var(--spacing) * 24)}.left-0{left:0}.left-1{left:var(--spacing)}.left-1\\/2{left:50%}.left-2{left:calc(var(--spacing) * 2)}.left-3{left:calc(var(--spacing) * 3)}.left-4{left:calc(var(--spacing) * 4)}.z-10{z-index:10}.z-20{z-index:20}.z-30{z-index:30}.z-40{z-index:40}.z-50{z-index:50}.col-span-2{grid-column:span 2/span 2}.container{width:100%}@media (width>=40rem){.container{max-width:40rem}}@media (width>=48rem){.container{max-width:48rem}}@media (width>=64rem){.container{max-width:64rem}}@media (width>=80rem){.container{max-width:80rem}}@media (width>=96rem){.container{max-width:96rem}}.mx-4{margin-inline:calc(var(--spacing) * 4)}.mx-auto{margin-inline:auto}.-mt-8{margin-top:calc(var(--spacing) * -8)}.mt-1{margin-top:var(--spacing)}.mt-2{margin-top:calc(var(--spacing) * 2)}.mt-3{margin-top:calc(var(--spacing) * 3)}.mt-4{margin-top:calc(var(--spacing) * 4)}.mt-5{margin-top:calc(var(--spacing) * 5)}.mt-6{margin-top:calc(var(--spacing) * 6)}.mt-8{margin-top:calc(var(--spacing) * 8)}.mr-1{margin-right:var(--spacing)}.mb-2{margin-bottom:calc(var(--spacing) * 2)}.mb-3{margin-bottom:calc(var(--spacing) * 3)}.mb-4{margin-bottom:calc(var(--spacing) * 4)}.ml-1{margin-left:var(--spacing)}.ml-2{margin-left:calc(var(--spacing) * 2)}.ml-px{margin-left:1px}.block{display:block}.flex{display:flex}.grid{display:grid}.hidden{display:none}.inline{display:inline}.inline-flex{display:inline-flex}.table{display:table}.size-5{width:calc(var(--spacing) * 5);height:calc(var(--spacing) * 5)}.size-10{width:calc(var(--spacing) * 10);height:calc(var(--spacing) * 10)}.h-1\\.5{height:calc(var(--spacing) * 1.5)}.h-3{height:calc(var(--spacing) * 3)}.h-3\\.5{height:calc(var(--spacing) * 3.5)}.h-4{height:calc(var(--spacing) * 4)}.h-5{height:calc(var(--spacing) * 5)}.h-6{height:calc(var(--spacing) * 6)}.h-7{height:calc(var(--spacing) * 7)}.h-8{height:calc(var(--spacing) * 8)}.h-9{height:calc(var(--spacing) * 9)}.h-10{height:calc(var(--spacing) * 10)}.h-11{height:calc(var(--spacing) * 11)}.h-12{height:calc(var(--spacing) * 12)}.h-14{height:calc(var(--spacing) * 14)}.h-16{height:calc(var(--spacing) * 16)}.h-20{height:calc(var(--spacing) * 20)}.h-24{height:calc(var(--spacing) * 24)}.h-dvh{height:100dvh}.h-full{height:100%}.max-h-\\[16rem\\]{max-height:16rem}.max-h-\\[18\\.5rem\\]{max-height:18.5rem}.max-h-\\[22rem\\]{max-height:22rem}.max-h-\\[68vh\\]{max-height:68vh}.max-h-\\[92dvh\\]{max-height:92dvh}.min-h-dvh{min-height:100dvh}.min-h-screen{min-height:100vh}.w-3{width:calc(var(--spacing) * 3)}.w-3\\.5{width:calc(var(--spacing) * 3.5)}.w-4{width:calc(var(--spacing) * 4)}.w-5{width:calc(var(--spacing) * 5)}.w-6{width:calc(var(--spacing) * 6)}.w-7{width:calc(var(--spacing) * 7)}.w-8{width:calc(var(--spacing) * 8)}.w-9{width:calc(var(--spacing) * 9)}.w-10{width:calc(var(--spacing) * 10)}.w-11{width:calc(var(--spacing) * 11)}.w-12{width:calc(var(--spacing) * 12)}.w-14{width:calc(var(--spacing) * 14)}.w-16{width:calc(var(--spacing) * 16)}.w-20{width:calc(var(--spacing) * 20)}.w-24{width:calc(var(--spacing) * 24)}.w-\\[12\\%\\]{width:12%}.w-\\[13\\%\\]{width:13%}.w-\\[14\\%\\]{width:14%}.w-\\[16\\%\\]{width:16%}.w-\\[17\\%\\]{width:17%}.w-\\[18\\%\\]{width:18%}.w-\\[20\\%\\]{width:20%}.w-\\[22\\%\\]{width:22%}.w-\\[24\\%\\]{width:24%}.w-\\[26\\%\\]{width:26%}.w-\\[34\\%\\]{width:34%}.w-\\[calc\\(100\\%-2rem\\)\\]{width:calc(100% - 2rem)}.w-\\[min\\(100\\%-1\\.5rem\\,400px\\)\\]{width:min(100% - 1.5rem,400px)}.w-fit{width:fit-content}.w-full{width:100%}.max-w-\\[6\\.5rem\\]{max-width:6.5rem}.max-w-\\[430px\\]{max-width:430px}.max-w-md{max-width:var(--container-md)}.max-w-sm{max-width:var(--container-sm)}.min-w-0{min-width:0}.min-w-\\[1\\.15rem\\]{min-width:1.15rem}.min-w-\\[92px\\]{min-width:92px}.min-w-\\[110px\\]{min-width:110px}.min-w-\\[120px\\]{min-width:120px}.flex-1{flex:1}.shrink{flex-shrink:1}.shrink-0{flex-shrink:0}.table-fixed{table-layout:fixed}.border-separate{border-collapse:separate}.border-spacing-0{--tw-border-spacing-x:0px;--tw-border-spacing-y:0px;border-spacing:var(--tw-border-spacing-x) var(--tw-border-spacing-y)}.-translate-x-1\\/2{--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-1\\/2{--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.scale-100{--tw-scale-x:100%;--tw-scale-y:100%;--tw-scale-z:100%;scale:var(--tw-scale-x) var(--tw-scale-y)}.scale-\\[0\\.25\\]{scale:.25}.transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.animate-pulse{animation:var(--animate-pulse)}.cursor-pointer{cursor:pointer}.resize{resize:both}.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.grid-cols-5{grid-template-columns:repeat(5,minmax(0,1fr))}.grid-cols-\\[1fr_2fr\\]{grid-template-columns:1fr 2fr}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.place-items-center{place-items:center}.items-center{align-items:center}.items-end{align-items:flex-end}.items-start{align-items:flex-start}.justify-between{justify-content:space-between}.justify-center{justify-content:center}.gap-1{gap:var(--spacing)}.gap-1\\.5{gap:calc(var(--spacing) * 1.5)}.gap-2{gap:calc(var(--spacing) * 2)}.gap-3{gap:calc(var(--spacing) * 3)}:where(.space-y-2>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * 2) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * 2) * calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-3>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * 3) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * 3) * calc(1 - var(--tw-space-y-reverse)))}.truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.overflow-auto{overflow:auto}.overflow-hidden{overflow:hidden}.overflow-x-hidden{overflow-x:hidden}.overflow-y-auto{overflow-y:auto}.overscroll-contain{overscroll-behavior:contain}.rounded{border-radius:.25rem}.rounded-2xl{border-radius:var(--radius-2xl)}.rounded-3xl{border-radius:var(--radius-3xl)}.rounded-\\[22px\\]{border-radius:22px}.rounded-full{border-radius:2147483647px}.rounded-lg{border-radius:var(--radius-lg)}.rounded-md{border-radius:var(--radius-md)}.rounded-xl{border-radius:var(--radius-xl)}.rounded-t-3xl{border-top-left-radius:var(--radius-3xl);border-top-right-radius:var(--radius-3xl)}.rounded-b-\\[2rem\\]{border-bottom-right-radius:2rem;border-bottom-left-radius:2rem}.border{border-style:var(--tw-border-style);border-width:1px}.border-2{border-style:var(--tw-border-style);border-width:2px}.border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.border-dashed{--tw-border-style:dashed;border-style:dashed}.border-accent{border-color:var(--color-accent)}.border-amber-300{border-color:var(--color-amber-300)}.border-amber-300\\/40{border-color:#ffd23666}@supports (color:color-mix(in lab, red, red)){.border-amber-300\\/40{border-color:color-mix(in oklab, var(--color-amber-300) 40%, transparent)}}.border-amber-400{border-color:var(--color-amber-400)}.border-blue-200{border-color:var(--color-blue-200)}.border-brand{border-color:var(--color-brand)}.border-danger{border-color:var(--color-danger)}.border-emerald-400\\/40{border-color:#00d29466}@supports (color:color-mix(in lab, red, red)){.border-emerald-400\\/40{border-color:color-mix(in oklab, var(--color-emerald-400) 40%, transparent)}}.border-line{border-color:var(--color-line)}.border-neutral-300{border-color:var(--color-neutral-300)}.border-night-line{border-color:var(--color-night-line)}.border-red-100{border-color:var(--color-red-100)}.border-red-400\\/50{border-color:#ff656880}@supports (color:color-mix(in lab, red, red)){.border-red-400\\/50{border-color:color-mix(in oklab, var(--color-red-400) 50%, transparent)}}.border-slate-200{border-color:var(--color-slate-200)}.border-white\\/5{border-color:#ffffff0d}@supports (color:color-mix(in lab, red, red)){.border-white\\/5{border-color:color-mix(in oklab, var(--color-white) 5%, transparent)}}.border-white\\/10{border-color:#ffffff1a}@supports (color:color-mix(in lab, red, red)){.border-white\\/10{border-color:color-mix(in oklab, var(--color-white) 10%, transparent)}}.\\!bg-transparent{background-color:#0000!important}.bg-\\[\\#1a56db\\]{background-color:#1a56db}.bg-\\[\\#2a2748\\]{background-color:#2a2748}.bg-\\[\\#3a3458\\]{background-color:#3a3458}.bg-\\[\\#3b82f6\\]{background-color:#3b82f6}.bg-\\[\\#241e3d\\]{background-color:#241e3d}.bg-\\[\\#12101c\\]{background-color:#12101c}.bg-\\[\\#12101f\\]{background-color:#12101f}.bg-\\[\\#17142e\\]{background-color:#17142e}.bg-accent{background-color:var(--color-accent)}.bg-accent\\/20{background-color:#7c5cff33}@supports (color:color-mix(in lab, red, red)){.bg-accent\\/20{background-color:color-mix(in oklab, var(--color-accent) 20%, transparent)}}.bg-accent\\/30{background-color:#7c5cff4d}@supports (color:color-mix(in lab, red, red)){.bg-accent\\/30{background-color:color-mix(in oklab, var(--color-accent) 30%, transparent)}}.bg-amber-50{background-color:var(--color-amber-50)}.bg-amber-400{background-color:var(--color-amber-400)}.bg-amber-400\\/20{background-color:#fcbb0033}@supports (color:color-mix(in lab, red, red)){.bg-amber-400\\/20{background-color:color-mix(in oklab, var(--color-amber-400) 20%, transparent)}}.bg-amber-500{background-color:var(--color-amber-500)}.bg-amber-500\\/10{background-color:#f99c001a}@supports (color:color-mix(in lab, red, red)){.bg-amber-500\\/10{background-color:color-mix(in oklab, var(--color-amber-500) 10%, transparent)}}.bg-amber-500\\/15{background-color:#f99c0026}@supports (color:color-mix(in lab, red, red)){.bg-amber-500\\/15{background-color:color-mix(in oklab, var(--color-amber-500) 15%, transparent)}}.bg-amber-500\\/20{background-color:#f99c0033}@supports (color:color-mix(in lab, red, red)){.bg-amber-500\\/20{background-color:color-mix(in oklab, var(--color-amber-500) 20%, transparent)}}.bg-black{background-color:var(--color-black)}.bg-black\\/10{background-color:#0000001a}@supports (color:color-mix(in lab, red, red)){.bg-black\\/10{background-color:color-mix(in oklab, var(--color-black) 10%, transparent)}}.bg-black\\/25{background-color:#00000040}@supports (color:color-mix(in lab, red, red)){.bg-black\\/25{background-color:color-mix(in oklab, var(--color-black) 25%, transparent)}}.bg-black\\/45{background-color:#00000073}@supports (color:color-mix(in lab, red, red)){.bg-black\\/45{background-color:color-mix(in oklab, var(--color-black) 45%, transparent)}}.bg-black\\/50{background-color:#00000080}@supports (color:color-mix(in lab, red, red)){.bg-black\\/50{background-color:color-mix(in oklab, var(--color-black) 50%, transparent)}}.bg-black\\/60{background-color:#0009}@supports (color:color-mix(in lab, red, red)){.bg-black\\/60{background-color:color-mix(in oklab, var(--color-black) 60%, transparent)}}.bg-blue-50{background-color:var(--color-blue-50)}.bg-blue-500{background-color:var(--color-blue-500)}.bg-brand{background-color:var(--color-brand)}.bg-canvas{background-color:var(--color-canvas)}.bg-emerald-50{background-color:var(--color-emerald-50)}.bg-emerald-300{background-color:var(--color-emerald-300)}.bg-emerald-400{background-color:var(--color-emerald-400)}.bg-emerald-500{background-color:var(--color-emerald-500)}.bg-emerald-500\\/15{background-color:#00bb7f26}@supports (color:color-mix(in lab, red, red)){.bg-emerald-500\\/15{background-color:color-mix(in oklab, var(--color-emerald-500) 15%, transparent)}}.bg-emerald-500\\/20{background-color:#00bb7f33}@supports (color:color-mix(in lab, red, red)){.bg-emerald-500\\/20{background-color:color-mix(in oklab, var(--color-emerald-500) 20%, transparent)}}.bg-emerald-600{background-color:var(--color-emerald-600)}.bg-indigo-600{background-color:var(--color-indigo-600)}.bg-night{background-color:var(--color-night)}.bg-night-2{background-color:var(--color-night-2)}.bg-night-3{background-color:var(--color-night-3)}.bg-night-line{background-color:var(--color-night-line)}.bg-ok{background-color:var(--color-ok)}.bg-red-50{background-color:var(--color-red-50)}.bg-red-500{background-color:var(--color-red-500)}.bg-red-500\\/10{background-color:#fb2c361a}@supports (color:color-mix(in lab, red, red)){.bg-red-500\\/10{background-color:color-mix(in oklab, var(--color-red-500) 10%, transparent)}}.bg-red-500\\/20{background-color:#fb2c3633}@supports (color:color-mix(in lab, red, red)){.bg-red-500\\/20{background-color:color-mix(in oklab, var(--color-red-500) 20%, transparent)}}.bg-red-600{background-color:var(--color-red-600)}.bg-slate-100{background-color:var(--color-slate-100)}.bg-slate-500{background-color:var(--color-slate-500)}.bg-slate-600{background-color:var(--color-slate-600)}.bg-transparent{background-color:#0000}.bg-white{background-color:var(--color-white)}.bg-white\\/10{background-color:#ffffff1a}@supports (color:color-mix(in lab, red, red)){.bg-white\\/10{background-color:color-mix(in oklab, var(--color-white) 10%, transparent)}}.bg-white\\/15{background-color:#ffffff26}@supports (color:color-mix(in lab, red, red)){.bg-white\\/15{background-color:color-mix(in oklab, var(--color-white) 15%, transparent)}}.bg-white\\/20{background-color:#fff3}@supports (color:color-mix(in lab, red, red)){.bg-white\\/20{background-color:color-mix(in oklab, var(--color-white) 20%, transparent)}}.bg-white\\/25{background-color:#ffffff40}@supports (color:color-mix(in lab, red, red)){.bg-white\\/25{background-color:color-mix(in oklab, var(--color-white) 25%, transparent)}}.bg-zinc-50{background-color:var(--color-zinc-50)}.bg-gradient-to-br{--tw-gradient-position:to bottom right in oklab;background-image:linear-gradient(var(--tw-gradient-stops))}.from-sky-400{--tw-gradient-from:var(--color-sky-400);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.to-brand{--tw-gradient-to:var(--color-brand);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.object-cover{object-fit:cover}.p-1{padding:var(--spacing)}.p-2{padding:calc(var(--spacing) * 2)}.p-3{padding:calc(var(--spacing) * 3)}.p-3\\.5{padding:calc(var(--spacing) * 3.5)}.p-4{padding:calc(var(--spacing) * 4)}.p-5{padding:calc(var(--spacing) * 5)}.p-6{padding:calc(var(--spacing) * 6)}.p-8{padding:calc(var(--spacing) * 8)}.p-\\[16px\\]{padding:16px}.px-1{padding-inline:var(--spacing)}.px-1\\.5{padding-inline:calc(var(--spacing) * 1.5)}.px-2{padding-inline:calc(var(--spacing) * 2)}.px-3{padding-inline:calc(var(--spacing) * 3)}.px-4{padding-inline:calc(var(--spacing) * 4)}.px-5{padding-inline:calc(var(--spacing) * 5)}.px-6{padding-inline:calc(var(--spacing) * 6)}.py-0\\.5{padding-block:calc(var(--spacing) * .5)}.py-1{padding-block:var(--spacing)}.py-1\\.5{padding-block:calc(var(--spacing) * 1.5)}.py-2{padding-block:calc(var(--spacing) * 2)}.py-2\\.5{padding-block:calc(var(--spacing) * 2.5)}.py-3{padding-block:calc(var(--spacing) * 3)}.py-3\\.5{padding-block:calc(var(--spacing) * 3.5)}.py-4{padding-block:calc(var(--spacing) * 4)}.py-6{padding-block:calc(var(--spacing) * 6)}.py-8{padding-block:calc(var(--spacing) * 8)}.pt-3{padding-top:calc(var(--spacing) * 3)}.pt-4{padding-top:calc(var(--spacing) * 4)}.pt-5{padding-top:calc(var(--spacing) * 5)}.pr-1{padding-right:var(--spacing)}.pr-3\\.5{padding-right:calc(var(--spacing) * 3.5)}.pr-10{padding-right:calc(var(--spacing) * 10)}.pr-12{padding-right:calc(var(--spacing) * 12)}.pb-4{padding-bottom:calc(var(--spacing) * 4)}.pb-5{padding-bottom:calc(var(--spacing) * 5)}.pb-8{padding-bottom:calc(var(--spacing) * 8)}.pb-16{padding-bottom:calc(var(--spacing) * 16)}.pb-24{padding-bottom:calc(var(--spacing) * 24)}.pl-4{padding-left:calc(var(--spacing) * 4)}.text-center{text-align:center}.text-left{text-align:left}.text-right{text-align:right}.align-middle{vertical-align:middle}.align-top{vertical-align:top}.text-2xl{font-size:var(--text-2xl);line-height:var(--tw-leading,var(--text-2xl--line-height))}.text-3xl{font-size:var(--text-3xl);line-height:var(--tw-leading,var(--text-3xl--line-height))}.text-4xl{font-size:var(--text-4xl);line-height:var(--tw-leading,var(--text-4xl--line-height))}.text-base{font-size:var(--text-base);line-height:var(--tw-leading,var(--text-base--line-height))}.text-lg{font-size:var(--text-lg);line-height:var(--tw-leading,var(--text-lg--line-height))}.text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.text-xl{font-size:var(--text-xl);line-height:var(--tw-leading,var(--text-xl--line-height))}.text-xs{font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height))}.text-\\[10px\\]{font-size:10px}.text-\\[11px\\]{font-size:11px}.text-\\[12px\\]{font-size:12px}.text-\\[13px\\]{font-size:13px}.text-\\[22px\\]{font-size:22px}.text-\\[34px\\]{font-size:34px}.leading-4{--tw-leading:calc(var(--spacing) * 4);line-height:calc(var(--spacing) * 4)}.leading-none{--tw-leading:1;line-height:1}.leading-relaxed{--tw-leading:var(--leading-relaxed);line-height:var(--leading-relaxed)}.leading-snug{--tw-leading:var(--leading-snug);line-height:var(--leading-snug)}.leading-tight{--tw-leading:var(--leading-tight);line-height:var(--leading-tight)}.font-bold{--tw-font-weight:var(--font-weight-bold);font-weight:var(--font-weight-bold)}.font-extrabold{--tw-font-weight:var(--font-weight-extrabold);font-weight:var(--font-weight-extrabold)}.font-medium{--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}.font-semibold{--tw-font-weight:var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.text-balance{text-wrap:balance}.text-wrap{text-wrap:wrap}.break-words{overflow-wrap:break-word}.whitespace-nowrap{white-space:nowrap}.text-accent{color:var(--color-accent)}.text-amber-100{color:var(--color-amber-100)}.text-amber-200{color:var(--color-amber-200)}.text-amber-300{color:var(--color-amber-300)}.text-amber-500{color:var(--color-amber-500)}.text-brand{color:var(--color-brand)}.text-danger{color:var(--color-danger)}.text-emerald-200{color:var(--color-emerald-200)}.text-emerald-300{color:var(--color-emerald-300)}.text-emerald-400{color:var(--color-emerald-400)}.text-emerald-500{color:var(--color-emerald-500)}.text-emerald-600{color:var(--color-emerald-600)}.text-emerald-950{color:var(--color-emerald-950)}.text-ink{color:var(--color-ink)}.text-muted{color:var(--color-muted)}.text-neutral-500{color:var(--color-neutral-500)}.text-night-fg{color:var(--color-night-fg)}.text-night-muted{color:var(--color-night-muted)}.text-ok{color:var(--color-ok)}.text-red-100{color:var(--color-red-100)}.text-red-200{color:var(--color-red-200)}.text-red-300{color:var(--color-red-300)}.text-red-400{color:var(--color-red-400)}.text-red-500{color:var(--color-red-500)}.text-red-600{color:var(--color-red-600)}.text-sky-200{color:var(--color-sky-200)}.text-sky-400{color:var(--color-sky-400)}.text-slate-100{color:var(--color-slate-100)}.text-slate-200{color:var(--color-slate-200)}.text-slate-300{color:var(--color-slate-300)}.text-slate-400{color:var(--color-slate-400)}.text-slate-500{color:var(--color-slate-500)}.text-slate-900{color:var(--color-slate-900)}.text-white{color:var(--color-white)}.text-white\\/85{color:#ffffffd9}@supports (color:color-mix(in lab, red, red)){.text-white\\/85{color:color-mix(in oklab, var(--color-white) 85%, transparent)}}.text-white\\/90{color:#ffffffe6}@supports (color:color-mix(in lab, red, red)){.text-white\\/90{color:color-mix(in oklab, var(--color-white) 90%, transparent)}}.text-zinc-500{color:var(--color-zinc-500)}.text-zinc-900{color:var(--color-zinc-900)}.tabular-nums{--tw-numeric-spacing:tabular-nums;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.underline-offset-4{text-underline-offset:4px}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.opacity-0{opacity:0}.opacity-40{opacity:.4}.opacity-70{opacity:.7}.opacity-80{opacity:.8}.opacity-90{opacity:.9}.opacity-100{opacity:1}.shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-lg{--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a), 0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-xl{--tw-shadow:0 20px 25px -5px var(--tw-shadow-color,#0000001a), 0 8px 10px -6px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.ring{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.ring-4{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.ring-accent\\/30{--tw-ring-color:#7c5cff4d}@supports (color:color-mix(in lab, red, red)){.ring-accent\\/30{--tw-ring-color:color-mix(in oklab, var(--color-accent) 30%, transparent)}}.outline,.outline-1{outline-style:var(--tw-outline-style);outline-width:1px}.-outline-offset-1{outline-offset:calc(1px * -1)}.outline-black\\/10{outline-color:#0000001a}@supports (color:color-mix(in lab, red, red)){.outline-black\\/10{outline-color:color-mix(in oklab, var(--color-black) 10%, transparent)}}.blur{--tw-blur:blur(8px);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.blur-\\[4px\\]{--tw-blur:blur(4px);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.blur-none{--tw-blur: ;filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.grayscale{--tw-grayscale:grayscale(100%);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.invert{--tw-invert:invert(100%);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.sepia{--tw-sepia:sepia(100%);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.filter{filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-\\[box-shadow\\]{transition-property:box-shadow;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-\\[opacity\\,filter\\,scale\\]{transition-property:opacity,filter,scale;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-\\[scale\\,background-color\\]{transition-property:scale,background-color;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-\\[scale\\,opacity\\,filter\\]{transition-property:scale,opacity,filter;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-transform{transition-property:transform,translate,scale,rotate;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.duration-150{--tw-duration:.15s;transition-duration:.15s}.duration-300{--tw-duration:.3s;transition-duration:.3s}.ease-\\[cubic-bezier\\(0\\.2\\,0\\,0\\,1\\)\\]{--tw-ease:cubic-bezier(.2,0,0,1);transition-timing-function:cubic-bezier(.2,0,0,1)}.ease-out{--tw-ease:var(--ease-out);transition-timing-function:var(--ease-out)}.outline-none{--tw-outline-style:none;outline-style:none}.after\\:absolute:after{content:var(--tw-content);position:absolute}.after\\:top-1\\/2:after{content:var(--tw-content);top:50%}.after\\:left-1\\/2:after{content:var(--tw-content);left:50%}.after\\:size-10:after{content:var(--tw-content);width:calc(var(--spacing) * 10);height:calc(var(--spacing) * 10)}.after\\:-translate-1\\/2:after{content:var(--tw-content);--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.last\\:border-0:last-child{border-style:var(--tw-border-style);border-width:0}@media (hover:hover){.hover\\:bg-neutral-100:hover{background-color:var(--color-neutral-100)}.hover\\:underline:hover{text-decoration-line:underline}}.focus\\:border-brand:focus{border-color:var(--color-brand)}.active\\:scale-\\[0\\.96\\]:active,.active\\:not-disabled\\:scale-\\[0\\.96\\]:active:not(:disabled){scale:.96}.disabled\\:cursor-wait:disabled{cursor:wait}.disabled\\:no-underline:disabled{text-decoration-line:none}.disabled\\:opacity-50:disabled{opacity:.5}.disabled\\:opacity-60:disabled{opacity:.6}@media (prefers-color-scheme:dark){.dark\\:border-neutral-700{border-color:var(--color-neutral-700)}.dark\\:bg-white\\/20{background-color:#fff3}@supports (color:color-mix(in lab, red, red)){.dark\\:bg-white\\/20{background-color:color-mix(in oklab, var(--color-white) 20%, transparent)}}.dark\\:bg-zinc-950{background-color:var(--color-zinc-950)}.dark\\:text-zinc-50{color:var(--color-zinc-50)}.dark\\:text-zinc-400{color:var(--color-zinc-400)}.dark\\:outline-white\\/10{outline-color:#ffffff1a}@supports (color:color-mix(in lab, red, red)){.dark\\:outline-white\\/10{outline-color:color-mix(in oklab, var(--color-white) 10%, transparent)}}@media (hover:hover){.dark\\:hover\\:bg-neutral-900:hover{background-color:var(--color-neutral-900)}}}}.g-blue{background:linear-gradient(135deg,#2563eb,#22d3ee)}.g-orange{background:linear-gradient(135deg,#fb923c,#f59e0b)}.g-pink{background:linear-gradient(135deg,#e879f9,#8b5cf6)}.g-teal{background:linear-gradient(135deg,#2dd4bf,#0ea5e9)}.g-assign{background:linear-gradient(90deg,#fb7185,#f59e0b)}.dash-zones{background:linear-gradient(160deg,#6a4dff,#7d6bff)}.dash-insp{background:linear-gradient(160deg,#2ad4c8,#49c7d8)}.dash-reports{background:linear-gradient(160deg,#e45cff,#b44bff)}.dash-avg{background:linear-gradient(160deg,#ff8d32,#ffb01a)}.dash-assign{background:linear-gradient(100deg,#ff8a1f 0%,#ff6a6a 48%,#d946ef 100%);box-shadow:0 10px 28px #ff782859}.g-login{background:linear-gradient(90deg,#6366f1,#c026d3)}.g-live{background:linear-gradient(90deg,#fb923c,#ef4444)}@media print{body{background:#fff}.no-print{display:none!important}}@property --tw-border-spacing-x{syntax:\"<length>\";inherits:false;initial-value:0}@property --tw-border-spacing-y{syntax:\"<length>\";inherits:false;initial-value:0}@property --tw-translate-x{syntax:\"*\";inherits:false;initial-value:0}@property --tw-translate-y{syntax:\"*\";inherits:false;initial-value:0}@property --tw-translate-z{syntax:\"*\";inherits:false;initial-value:0}@property --tw-scale-x{syntax:\"*\";inherits:false;initial-value:1}@property --tw-scale-y{syntax:\"*\";inherits:false;initial-value:1}@property --tw-scale-z{syntax:\"*\";inherits:false;initial-value:1}@property --tw-rotate-x{syntax:\"*\";inherits:false}@property --tw-rotate-y{syntax:\"*\";inherits:false}@property --tw-rotate-z{syntax:\"*\";inherits:false}@property --tw-skew-x{syntax:\"*\";inherits:false}@property --tw-skew-y{syntax:\"*\";inherits:false}@property --tw-space-y-reverse{syntax:\"*\";inherits:false;initial-value:0}@property --tw-border-style{syntax:\"*\";inherits:false;initial-value:solid}@property --tw-gradient-position{syntax:\"*\";inherits:false}@property --tw-gradient-from{syntax:\"<color>\";inherits:false;initial-value:#0000}@property --tw-gradient-via{syntax:\"<color>\";inherits:false;initial-value:#0000}@property --tw-gradient-to{syntax:\"<color>\";inherits:false;initial-value:#0000}@property --tw-gradient-stops{syntax:\"*\";inherits:false}@property --tw-gradient-via-stops{syntax:\"*\";inherits:false}@property --tw-gradient-from-position{syntax:\"<length-percentage>\";inherits:false;initial-value:0%}@property --tw-gradient-via-position{syntax:\"<length-percentage>\";inherits:false;initial-value:50%}@property --tw-gradient-to-position{syntax:\"<length-percentage>\";inherits:false;initial-value:100%}@property --tw-leading{syntax:\"*\";inherits:false}@property --tw-font-weight{syntax:\"*\";inherits:false}@property --tw-ordinal{syntax:\"*\";inherits:false}@property --tw-slashed-zero{syntax:\"*\";inherits:false}@property --tw-numeric-figure{syntax:\"*\";inherits:false}@property --tw-numeric-spacing{syntax:\"*\";inherits:false}@property --tw-numeric-fraction{syntax:\"*\";inherits:false}@property --tw-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:\"*\";inherits:false}@property --tw-shadow-alpha{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:\"*\";inherits:false}@property --tw-inset-shadow-alpha{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:\"*\";inherits:false}@property --tw-ring-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:\"*\";inherits:false}@property --tw-inset-ring-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:\"*\";inherits:false}@property --tw-ring-offset-width{syntax:\"<length>\";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:\"*\";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-outline-style{syntax:\"*\";inherits:false;initial-value:solid}@property --tw-blur{syntax:\"*\";inherits:false}@property --tw-brightness{syntax:\"*\";inherits:false}@property --tw-contrast{syntax:\"*\";inherits:false}@property --tw-grayscale{syntax:\"*\";inherits:false}@property --tw-hue-rotate{syntax:\"*\";inherits:false}@property --tw-invert{syntax:\"*\";inherits:false}@property --tw-opacity{syntax:\"*\";inherits:false}@property --tw-saturate{syntax:\"*\";inherits:false}@property --tw-sepia{syntax:\"*\";inherits:false}@property --tw-drop-shadow{syntax:\"*\";inherits:false}@property --tw-drop-shadow-color{syntax:\"*\";inherits:false}@property --tw-drop-shadow-alpha{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:\"*\";inherits:false}@property --tw-duration{syntax:\"*\";inherits:false}@property --tw-ease{syntax:\"*\";inherits:false}@property --tw-content{syntax:\"*\";inherits:false;initial-value:\"\"}@keyframes pulse{50%{opacity:.5}}";
var APP = "सफाई निरीक्षण – नगरपालिका खरखौदा क्षेत्र";
var SHORT = "सफाई निरीक्षण";
var Route$1 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: APP },
			{
				name: "application-name",
				content: SHORT
			},
			{
				name: "description",
				content: "नगरपालिका खरखौदा क्षेत्र का सफाई निरीक्षण फॉर्म।"
			},
			{
				name: "theme-color",
				content: "#1a56db"
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-title",
				content: SHORT
			},
			{
				name: "apple-mobile-web-app-status-bar-style",
				content: "default"
			}
		],
		links: [
			{
				rel: "icon",
				href: "/favicon.ico",
				sizes: "48x48"
			},
			{
				rel: "icon",
				type: "image/png",
				href: "/favicon.png"
			},
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: "/icons/apple-touch-icon.png"
			},
			{
				rel: "manifest",
				href: "/manifest.webmanifest"
			},
			{
				rel: "apple-touch-startup-image",
				href: "/splash/iphone-se.png",
				media: "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
			},
			{
				rel: "apple-touch-startup-image",
				href: "/splash/iphone-x.png",
				media: "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
			},
			{
				rel: "apple-touch-startup-image",
				href: "/splash/iphone-14.png",
				media: "(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3)"
			},
			{
				rel: "apple-touch-startup-image",
				href: "/splash/iphone-15.png",
				media: "(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3)"
			},
			{
				rel: "apple-touch-startup-image",
				href: "/splash/iphone-15pm.png",
				media: "(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3)"
			},
			{
				rel: "apple-touch-startup-image",
				href: "/splash/ipad.png",
				media: "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
			},
			{
				rel: "stylesheet",
				href: styles_default$1
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@500;600;700;800&family=Noto+Sans:wght@500;600;700;800&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "hi",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { dangerouslySetInnerHTML: { __html: styles_default.replace(/<\/style/gi, "<\\/style") } }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `#boot{position:fixed;inset:0;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#1a56db;text-align:center;font-family:sans-serif}#boot img{width:96px;height:96px;border-radius:28px}#boot h1{margin:16px 0 0;color:#fff !important;font-size:28px;font-weight:800}#boot p{margin:6px 0 0;color:#fff !important;font-size:16px;opacity:.92}html.desk-lock body{width:430px !important;max-width:430px !important}html.desk-lock .fixed{left:0 !important;right:auto !important;margin-left:0 !important;margin-right:0 !important;transform:none !important;width:430px !important;max-width:430px !important}html.desk-lock .fixed.bottom-0{bottom:var(--desk-bottom) !important}html.desk-lock .fixed.inset-0{top:0 !important;bottom:var(--desk-bottom) !important;height:auto !important}html.desk-lock #boot{left:0 !important;right:auto !important;width:430px !important;bottom:var(--desk-bottom) !important}` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: `(function(){var added=false;var last=0;function pin(){if(added)return;added=true;var m=document.createElement("meta");m.setAttribute("name","viewport");m.setAttribute("content","width=device-width, initial-scale=1, viewport-fit=cover");document.head.appendChild(m)}function fit(){var now=Date.now();if(now-last<350)return;last=now;var touch=navigator.maxTouchPoints>0;var w=window.innerWidth;var root=document.documentElement;if(touch&&w>700)pin();requestAnimationFrame(function(){w=window.innerWidth;if(!touch||w<700){root.classList.remove("desk-lock");root.style.zoom="";return}var scale=w/430;root.classList.add("desk-lock");root.style.zoom=String(scale);root.style.setProperty("--desk-bottom",(window.innerHeight*(1-1/scale))+"px")})}fit();window.addEventListener("resize",fit);window.addEventListener("orientationchange",fit)})();` } })
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				id: "boot",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/logo.png",
						alt: ""
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "सफाई निरीक्षण फॉर्म" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "नगरपालिका खरखौदा क्षेत्र" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PwaChrome, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var TOKEN_KEY = "safai.session";
var ROLE_KEY = "safai.role";
var USER_KEY = "safai.user";
var YEAR = 15552e3;
function writeClientCookie(name, value) {
	try {
		document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${YEAR}; samesite=lax`;
	} catch {}
}
function clearClientCookie(name) {
	try {
		document.cookie = `${name}=; path=/; max-age=0`;
	} catch {}
}
function saveSession(token, role, username) {
	try {
		localStorage.setItem(TOKEN_KEY, token);
		localStorage.setItem(ROLE_KEY, role);
		if (username) localStorage.setItem(USER_KEY, username);
	} catch {}
	writeClientCookie("safai_role", role);
	if (username) writeClientCookie("safai_user", username);
	stampInstall();
}
async function stampInstall() {
	try {
		const id = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
		localStorage.setItem("safai.install", id);
		await (await caches.open("safai-install")).put("/__safai_install", new Response(id));
	} catch {}
}
/** Cache is wiped on uninstall. If the login is left behind without it, require login again. */
async function installStillValid() {
	if (!readToken()) return "none";
	let mark = "";
	try {
		mark = localStorage.getItem("safai.install") ?? "";
	} catch {
		return "ok";
	}
	let cached = "";
	try {
		const res = await (await caches.open("safai-install")).match("/__safai_install");
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
function clearToken() {
	try {
		localStorage.removeItem(TOKEN_KEY);
		localStorage.removeItem(ROLE_KEY);
		localStorage.removeItem(USER_KEY);
		localStorage.removeItem("safai.inspectorProfile");
		localStorage.removeItem("safai.install");
	} catch {}
	clearClientCookie("safai_role");
	clearClientCookie("safai_user");
}
function readToken() {
	try {
		return localStorage.getItem(TOKEN_KEY) ?? "";
	} catch {
		return "";
	}
}
var withSession = createMiddleware({ type: "function" }).client(async ({ next }) => next({ sendContext: { token: readToken() } })).server(async ({ next, context }) => next({ context: { token: context.token } }));
var readBoot = createServerFn({ method: "GET" }).handler(createSsrRpc("2ca778c3ec41a5cc629f690da563ec9884498200d8ee067a5495ad21c7b5e476"));
var fetchSession = createServerFn({ method: "GET" }).middleware([withSession]).handler(createSsrRpc("4bad2fff7b095b0e18ec3fdc1a2eff9c8f37a53d881ddb4fc6be40bb488cccfd"));
var loginAdmin = createServerFn({ method: "POST" }).validator((input) => ({
	username: String(input?.username ?? ""),
	password: String(input?.password ?? "")
})).handler(createSsrRpc("0ccbf872184d19fa0b69845ed6dbdd0947e12a61ffb4dd9ec754dbf4c540ee5d"));
var loginInspector = createServerFn({ method: "POST" }).validator((input) => ({
	code: String(input?.code ?? ""),
	password: String(input?.password ?? ""),
	phone: String(input?.phone ?? "").trim().slice(0, 12)
})).handler(createSsrRpc("cd9c3dbc4a140fd4eeb0f1f2a81dade43941db0add9589e8ebf3af1a68c1966b"));
var signOut = createServerFn({ method: "POST" }).middleware([withSession]).handler(createSsrRpc("1a90800dc4eb5a45187750af4c131bca1aa18254f856c28271ef0a7bc505058c"));
var updateAdminPassword = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => ({
	current: String(input?.current ?? ""),
	next: String(input?.next ?? "")
})).handler(createSsrRpc("1020e9ef568649719973caac1c4db826d890549caf47dc5dd24f4e1bd6c2716a"));
var loadInspectorHome = createServerFn({ method: "GET" }).middleware([withSession]).handler(createSsrRpc("349c572328eeaccc5e1a86e1c60a6d0e5f4763598c2cc3969a801f50900b34b5"));
var sendEntry = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => input).handler(createSsrRpc("216781699567bfe9a1eeea7b793b7e6bc227a1d3e6a55bd0fb72ac6227a09426"));
var loadMyReports = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => input).handler(createSsrRpc("553263385ed5676d8c9fe30c3955ee5e5dcfff6f2c788d1a0c84d1ff96229a23"));
var loadDashboard = createServerFn({ method: "GET" }).middleware([withSession]).handler(createSsrRpc("eb8a95563e780b5a1e0aa12577d910b136586883033c914d14b026dd20a7ebd6"));
var loadZones = createServerFn({ method: "GET" }).middleware([withSession]).handler(createSsrRpc("286336d2bfd756be65c1b02aee192f7d01ae7d7b966502aa976ec03e8b138328"));
var saveZoneFn = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => input).handler(createSsrRpc("f026f0392b173e317f45f64c81b2aa9ac6eb55f7edf1f02a6466a54339c1ab08"));
var inspectorSessionsFn = createServerFn({ method: "POST" }).middleware([withSession]).validator((id) => Number(id)).handler(createSsrRpc("e8b404788587ec9dc44270bcc31c7bf7bac45539aa57472213eb31ca3efeb946"));
var logoutInspectorFn = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => ({
	inspectorId: Number(input?.inspectorId),
	sessionId: String(input?.sessionId ?? "")
})).handler(createSsrRpc("a63aa489b9e8b93bbf742327abfed8fac8d28677a61ac9e1e77bc115e898249a"));
var replaceInspectorFn = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => input).handler(createSsrRpc("9636ee0cd4e9509824acc29abe8be2f62178e50c13e459b81c5958e4c084cf11"));
var deleteInspectorFn = createServerFn({ method: "POST" }).middleware([withSession]).validator((id) => Number(id)).handler(createSsrRpc("1fc424d92db3c77ee33747e884994ecfcaa50535dbae6353b26cb52a96acabe1"));
var saveCouncillorFn = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => input).handler(createSsrRpc("bb9b713377b234b428c701364306242786faccef68f784e0da505c5b4b8ab4f1"));
var loadNumbers = createServerFn({ method: "GET" }).middleware([withSession]).handler(createSsrRpc("d5a30c32c2aa5c06b6fea8c280a28424566f49ecc81491425c190b54d26e591b"));
var assignNumberFn = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => ({
	zoneId: input?.zoneId === "all" ? "all" : Number(input?.zoneId),
	number: Number(input?.number)
})).handler(createSsrRpc("138ceb5bc259563b7006bb3b73049190830385dfa85aec5fbf372cda1ea5eaa0"));
var removeNumberFn = createServerFn({ method: "POST" }).middleware([withSession]).validator((id) => Number(id)).handler(createSsrRpc("179294c2f5cc3a8971d59abc8f8dc3da3dbfeb41623cae4f550bae6f18caef67"));
var updateNumberFn = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => input).handler(createSsrRpc("d479bf1e6fda14efaf0814fd4b49dd398ff1ed1f89bfe78e2cbdc505973a0998"));
var loadLive = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => input).handler(createSsrRpc("cbc729a02511d3b2abe18fba12f5134b15d45408c2166d09159b83aae1b49646"));
var loadReport = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => input).handler(createSsrRpc("3d1d61576d6cff549369c20559f2f4a37ee0326aa6fb8657e88d018f322721bd"));
var loadInspectorReport = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => input).handler(createSsrRpc("784521d9ea1b0d0aebba920c248adb0865ac4cf67c56ae62db03842db7d784cb"));
var loadStaffDay = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => ({ date: String(input?.date ?? "") })).handler(createSsrRpc("2b64c615bc83922a391f9a1ff9a6e32a80015ba3e0233082dff6a8203d878c0c"));
var saveStaffDay = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => ({
	date: String(input?.date ?? ""),
	rows: Array.isArray(input?.rows) ? input.rows.map((row) => ({
		id: Number(row.id),
		present: !!row.present,
		zoneId: row.zoneId == null ? null : Number(row.zoneId)
	})) : []
})).handler(createSsrRpc("b139b3e57163e3fae2b8468a22140f084b988bdc66f3c43aa57849f4ea17f4c8"));
var loadAttendanceView = createServerFn({ method: "GET" }).middleware([withSession]).handler(createSsrRpc("cecfd461bc3ac360c9fbb8ac5e55c3ff2ef08953020b48016a92570e20e73a67"));
createServerFn({ method: "GET" }).middleware([withSession]).handler(createSsrRpc("6a57eb0daecf8cfe6f43e1348f830a1ee2a610c9a91f31bce325118590e2e827"));
var addStaffFn = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => input).handler(createSsrRpc("883ea0b9da982350979794758301af961b8fe9c47f7f3649a5aa2525bb6ba10b"));
createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => input).handler(createSsrRpc("82bbbb013afc9ae867eec71e5635223f58f5a00a80c8b1cd381276bf5f541d89"));
var deleteStaffFn = createServerFn({ method: "POST" }).middleware([withSession]).validator((id) => Number(id)).handler(createSsrRpc("4d4a99976b8cc718d742ab5b8e65714be7bb38e1a56daa316335ca92824821d5"));
var markAbsentFn = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => ({
	inspectorId: Number(input?.inspectorId),
	date: String(input?.date ?? ""),
	jhadu: Boolean(input?.jhadu),
	nali: Boolean(input?.nali),
	kooda: Boolean(input?.kooda),
	score: Number(input?.score)
})).handler(createSsrRpc("2d8b7cc6ff3426c645bf3f6b35c3ccb376982043e7f824bf214f83a3fe3e8fe5"));
var loadMeta = createServerFn({ method: "GET" }).middleware([withSession]).handler(createSsrRpc("0771fc2b311b04c238d0eabda250c4b5187def3e30114b0cc2072bfb82f51edd"));
var fileComplaint = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => ({
	jhadu: Boolean(input?.jhadu),
	nali: Boolean(input?.nali),
	kooda: Boolean(input?.kooda)
})).handler(createSsrRpc("88cea3191aa65f426893eaf3a41053988debe0832c05b070da84978855ae0ae1"));
var loadMyComplaints = createServerFn({ method: "GET" }).middleware([withSession]).handler(createSsrRpc("9453572876702f849bf9bdd0cdb366098d10792770fa07c7ea66752fda673c89"));
var loadComplaintCount = createServerFn({ method: "GET" }).middleware([withSession]).handler(createSsrRpc("60fb429d913ad9da93b087e9c105e8f106c37a03c169bb083952732fe05a8cd4"));
var loadComplaints = createServerFn({ method: "GET" }).middleware([withSession]).handler(createSsrRpc("6eba97864626db114adb0a446ef387e28d9fa3f5a9e6b7303ff46175bfc079ae"));
var markComplaintsSeen = createServerFn({ method: "POST" }).middleware([withSession]).handler(createSsrRpc("314a2c5341dfcb354fa66454e7e2a74d1a5b96f24ccdc56dbe39e374515cd350"));
function asLevelIn(value) {
	return value === "edit" || value === "view" ? value : "none";
}
var listSubAdminsFn = createServerFn({ method: "GET" }).middleware([withSession]).handler(createSsrRpc("cb9bac7798f5d4f79dd929621ea76d9db20883f4b0e903e732084706aa449070"));
var saveSubAdminFn = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => ({
	id: input?.id ? Number(input.id) : void 0,
	name: String(input?.name ?? ""),
	username: String(input?.username ?? ""),
	password: String(input?.password ?? ""),
	active: input?.active !== false,
	attendance: asLevelIn(input?.attendance),
	zone: asLevelIn(input?.zone),
	number: asLevelIn(input?.number),
	staff: asLevelIn(input?.staff),
	councillor: asLevelIn(input?.councillor),
	zones: Array.isArray(input?.zones) ? input.zones.map((z) => ({
		id: Number(z.id),
		perm: asLevelIn(z.perm)
	})) : []
})).handler(createSsrRpc("f4db5a150968ff5f86bc0b33c6561769a7cf1354f848751c4a1336b686acf6cf"));
var resetSubPasswordFn = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => ({
	id: Number(input?.id),
	password: String(input?.password ?? "")
})).handler(createSsrRpc("6cf39f96dec3f8ccfd61eeb80d305badc23d94e3c75cde92305cd5ec4b9a8e34"));
var removeSubAdminFn = createServerFn({ method: "POST" }).middleware([withSession]).validator((id) => Number(id)).handler(createSsrRpc("3e18ac8da1fd16decb0b9354482a6289905c73351551be70b444bbf6460250d5"));
var changeOwnPasswordFn = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => ({
	current: String(input?.current ?? ""),
	next: String(input?.next ?? "")
})).handler(createSsrRpc("2489afbc7ff810fd55bda282de6d0e78114d8058bbbccb8c8821fcc3c58f50e7"));
var $$splitComponentImporter = () => import("./routes-g_XdEMHA.mjs");
var Route = createFileRoute("/")({
	loader: () => readBoot(),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = { IndexRoute: Route.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$1
}) };
var routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { logoutInspectorFn as A, saveSubAdminFn as B, loadMyReports as C, loadZones as D, loadStaffDay as E, replaceInspectorFn as F, updateNumberFn as G, sendEntry as H, resetSubPasswordFn as I, saveCouncillorFn as L, markComplaintsSeen as M, removeNumberFn as N, loginAdmin as O, removeSubAdminFn as P, saveSession as R, loadMyComplaints as S, loadReport as T, signOut as U, saveZoneFn as V, updateAdminPassword as W, loadDashboard as _, changeOwnPasswordFn as a, loadLive as b, deleteStaffFn as c, inspectorSessionsFn as d, installStillValid as f, loadComplaints as g, loadComplaintCount as h, assignNumberFn as i, markAbsentFn as j, loginInspector as k, fetchSession as l, loadAttendanceView as m, Route as n, clearToken as o, listSubAdminsFn as p, addStaffFn as r, deleteInspectorFn as s, router_exports as t, fileComplaint as u, loadInspectorHome as v, loadNumbers as w, loadMeta as x, loadInspectorReport as y, saveStaffDay as z };
