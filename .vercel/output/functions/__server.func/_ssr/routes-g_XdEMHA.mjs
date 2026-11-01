import { o as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, q as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as istNow, d as shiftIso, f as weekStart, i as dmy, s as monthStart, u as score2 } from "./format--G7lwSau.mjs";
import { _ as ClipboardList, c as Pencil, d as Lock, f as KeyRound, g as EyeOff, h as Eye, i as UserPlus, l as MapPin, m as Hash, n as Users, o as Trash2, p as House, r as UserRound, s as Printer, t as X, u as LogOut, v as ChartColumn, y as Bell } from "../_libs/lucide-react.mjs";
import { A as logoutInspectorFn, B as saveSubAdminFn, C as loadMyReports, D as loadZones, E as loadStaffDay, F as replaceInspectorFn, G as updateNumberFn, H as sendEntry, I as resetSubPasswordFn, L as saveCouncillorFn, M as markComplaintsSeen, N as removeNumberFn, O as loginAdmin, P as removeSubAdminFn, R as saveSession, S as loadMyComplaints, T as loadReport, U as signOut, V as saveZoneFn, W as updateAdminPassword, _ as loadDashboard, a as changeOwnPasswordFn, b as loadLive, c as deleteStaffFn, d as inspectorSessionsFn, f as installStillValid, g as loadComplaints, h as loadComplaintCount, i as assignNumberFn, j as markAbsentFn, k as loginInspector, l as fetchSession, m as loadAttendanceView, n as Route, o as clearToken, p as listSubAdminsFn, r as addStaffFn, s as deleteInspectorFn, u as fileComplaint, v as loadInspectorHome, w as loadNumbers, x as loadMeta, y as loadInspectorReport, z as saveStaffDay } from "./router-CX1FV30_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-g_XdEMHA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BroomIcon({ tone = "blue" }) {
	const gold = tone === "yellow";
	const handle = gold ? "#facc15" : "#e8b15a";
	const straw = gold ? "#eab308" : "#d9922e";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 48 48",
		className: "h-10 w-10",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M31.2 3.5c.8.5 1 1.6.5 2.4L26.2 22",
				stroke: handle,
				strokeWidth: "3.4",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M15.2 23.6h17.2c.9 0 1.4.8 1.2 1.6l-.8 2.4H14.8l-.8-2.4c-.2-.8.3-1.6 1.2-1.6z",
				fill: gold ? "#ca8a04" : "#b8732a"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M13.4 29.2 9.2 44",
				stroke: straw,
				strokeWidth: "2.15",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M16.8 28.4 14.2 44",
				stroke: straw,
				strokeWidth: "2.15",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M20.2 28 19.2 44",
				stroke: straw,
				strokeWidth: "2.15",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M23.6 27.8 24.2 44",
				stroke: straw,
				strokeWidth: "2.15",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M27 28.1 29.2 44",
				stroke: straw,
				strokeWidth: "2.15",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M30.4 28.6 34 44",
				stroke: straw,
				strokeWidth: "2.15",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M33.6 29.6 38.4 42.8",
				stroke: straw,
				strokeWidth: "2.15",
				strokeLinecap: "round"
			})
		]
	});
}
function DrainIcon({ tone = "blue" }) {
	const gold = tone === "yellow";
	const bar = gold ? "#eab308" : "#5aa6f6";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 48 48",
		className: "h-10 w-10",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "6",
				y: "14",
				width: "36",
				height: "5",
				rx: "2.5",
				fill: bar
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M8 24.5c3 2.2 6-2.2 9 0s6-2.2 9 0 6-2.2 9 0 6-2.2 8 0v5c-2 2.2-5-2.2-8 0s-6 2.2-9 0-6 2.2-9 0-6 2.2-9 0v-5z",
				fill: gold ? "#fde68a" : "#bfdbfe"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "6",
				y: "30",
				width: "36",
				height: "5",
				rx: "2.5",
				fill: bar
			})
		]
	});
}
function TrashIcon({ tone = "blue" }) {
	const gold = tone === "yellow";
	const heap = gold ? "#eab308" : "#3b82f6";
	const scrap = gold ? "#fde68a" : "#bfdbfe";
	const smell = gold ? "#ca8a04" : "#60a5fa";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 48 48",
		className: "h-10 w-10",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M14 20c2.4-2 2.4-4.2 0-6.2s-2.4-4.2 0-6.2",
				stroke: smell,
				strokeWidth: "1.7",
				strokeLinecap: "round",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M22 18.5c2.6-2.2 2.6-4.4 0-6.6s-2.6-4.4 0-6.6",
				stroke: smell,
				strokeWidth: "1.7",
				strokeLinecap: "round",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M30 20c2.4-2 2.4-4.2 0-6.2s-2.4-4.2 0-6.2",
				stroke: smell,
				strokeWidth: "1.7",
				strokeLinecap: "round",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M8.5 33.5c1.6-8 6.4-13 15.5-13s13.8 5 15.5 13c.8 4.2-2.2 8.5-7.2 8.5H15.7c-5 0-8-4.3-7.2-8.5z",
				fill: heap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M14 31.5c2-3.2 4.2-4.6 6.6-3.8 1 2.4 0 4.6-1.8 5.8",
				fill: scrap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "29.5",
				cy: "30.5",
				rx: "3.1",
				ry: "2.3",
				fill: scrap
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M20 35.2h8.2l-.7 4.4h-6.8z",
				fill: scrap
			})
		]
	});
}
function LogoMark({ className = "h-16 w-16" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: "/logo.png",
		alt: "",
		className: `${className} rounded-2xl object-cover`
	});
}
var REMEMBER = "safai.councillor";
function rememberedCouncillor() {
	try {
		const raw = localStorage.getItem(REMEMBER);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (!parsed.name) return null;
		return {
			name: parsed.name,
			photo: parsed.photo ?? null
		};
	} catch {
		return null;
	}
}
function rememberCouncillor(name, photo) {
	try {
		if (!name) return;
		localStorage.setItem(REMEMBER, JSON.stringify({
			name,
			photo
		}));
	} catch {}
}
function AdminLogin({ lang, onLang, onInspector, onSuccess }) {
	const hi = lang === "hi";
	const [username, setUsername] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [show, setShow] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function submit(e) {
		e.preventDefault();
		setBusy(true);
		setError("");
		const res = await loginAdmin({ data: {
			username,
			password
		} });
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
			onSuccess({
				role: "subadmin",
				username: live.username,
				name: live.name,
				perms: live.perms
			});
			return;
		}
		onSuccess({
			role: "admin",
			username: res.username
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-night px-5 pb-8 text-night-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between pt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onInspector,
				className: "rounded-full border border-night-line bg-night-3 px-3 py-2 text-left text-xs font-bold leading-tight text-night-fg",
				children: [hi ? "स्थानीय निरीक्षक" : "Login as", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block",
					children: hi ? "लॉगिन" : "Local Inspector"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onLang(hi ? "en" : "hi"),
					className: "rounded-full bg-night-3 px-3 py-1.5 text-xs font-bold",
					children: hi ? "हिंदी" : "EN"
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col items-center justify-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-4 grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-sky-400 to-brand shadow-lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						viewBox: "0 0 48 48",
						className: "h-10 w-10",
						"aria-hidden": "true",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M24 6 10 12v10c0 9 6 14 14 18 8-4 14-9 14-18V12L24 6z",
							fill: "#e0f2fe"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "m18 23 4 4 8-9",
							stroke: "#1a56db",
							strokeWidth: "3",
							fill: "none"
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-extrabold",
					children: hi ? "एडमिन लॉगिन" : "Admin Login"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-center text-sm text-night-muted",
					children: hi ? "नगरपालिका खरखौदा क्षेत्र · सफाई ऐप" : "Municipal Committee Kharkhoda Area · Safai App"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "mt-8 w-full rounded-3xl border border-night-line bg-night-2 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm text-night-muted",
							children: hi ? "यूज़रनेम" : "Username"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: username,
							onChange: (e) => setUsername(e.target.value),
							autoCapitalize: "characters",
							className: "mt-1 mb-3 w-full rounded-2xl border border-night-line bg-night-3 px-4 py-3 text-lg outline-none"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm text-night-muted",
							children: hi ? "पासवर्ड" : "Password"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: password,
								onChange: (e) => setPassword(e.target.value),
								type: show ? "text" : "password",
								className: "w-full rounded-2xl border border-night-line bg-night-3 px-4 py-3 pr-12 text-lg outline-none"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "absolute top-1/2 right-3 -translate-y-1/2 text-night-muted",
								onClick: () => setShow((v) => !v),
								children: show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-5 w-5" })
							})]
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-red-300",
							children: error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: busy,
							className: "g-login mt-4 w-full rounded-2xl py-3.5 text-lg font-bold text-white",
							children: busy ? "…" : hi ? "लॉगिन" : "Login"
						})
					]
				})
			]
		})]
	});
}
function InspectorLogin({ onBack, onSuccess }) {
	const [code, setCode] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [show, setShow] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const councillor = rememberedCouncillor();
	async function submit(e) {
		e.preventDefault();
		setBusy(true);
		setError("");
		const res = await loginInspector({ data: {
			code,
			password,
			phone
		} });
		setBusy(false);
		if (!res.ok || !res.profile) {
			setError("कोड या पासवर्ड गलत है।");
			return;
		}
		saveSession(res.token, "inspector");
		try {
			localStorage.setItem("safai.inspectorProfile", JSON.stringify(res.profile));
		} catch {}
		if (res.profile.councillorName) rememberCouncillor(res.profile.councillorName, res.profile.councillorPhoto);
		onSuccess();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto min-h-dvh w-full max-w-[430px] bg-canvas",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "rounded-b-[2rem] bg-brand px-5 pt-4 pb-16 text-white",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onBack,
					className: "mb-4 rounded-full bg-white/15 px-3 py-1.5 text-sm font-bold",
					children: "← एडमिन लॉगिन"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-extrabold leading-tight",
						children: "सफाई निरीक्षण फॉर्म"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-white/90",
						children: "नगरपालिका खरखौदा क्षेत्र"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mt-4 grid h-24 w-24 place-items-center overflow-hidden rounded-3xl bg-white/15",
					children: councillor?.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: councillor.photo,
						alt: "",
						className: "h-full w-full object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, { className: "h-20 w-20" })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "relative z-10 -mt-8 mx-4 rounded-3xl bg-white p-4 shadow-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-2xl border border-blue-200 bg-blue-50 px-3 py-3 text-lg leading-snug text-ink",
					children: councillor ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"ये सफाई अभियान ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: councillor.name }),
						" द्वारा चलाया जा रहा है। कृपया सहयोग करें।"
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ये सफाई अभियान आपके वार्ड पार्षद द्वारा चलाया जा रहा है। कृपया सहयोग करें।" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mt-4 block text-lg font-extrabold",
					children: "कोड (User Code)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: code,
					onChange: (e) => setCode(e.target.value.toUpperCase()),
					className: "mt-1 w-full rounded-2xl border-2 border-line px-4 py-3 text-2xl font-bold outline-none focus:border-brand"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mt-4 block text-lg font-extrabold",
					children: "पासवर्ड"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: password,
						onChange: (e) => setPassword(e.target.value),
						type: show ? "text" : "password",
						className: "w-full rounded-2xl border-2 border-line px-4 py-3 pr-12 text-2xl outline-none focus:border-brand"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "absolute top-1/2 right-3 -translate-y-1/2 text-muted",
						onClick: () => setShow((v) => !v),
						children: show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-4 block text-lg font-extrabold",
					children: ["फोन कोड ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-semibold text-muted",
						children: "(ज़रूरी नहीं)"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: phone,
					onChange: (e) => setPhone(e.target.value.slice(0, 12)),
					placeholder: "खाली छोड़ सकते हैं",
					className: "mt-1 w-full rounded-2xl border-2 border-line px-4 py-3 text-xl outline-none focus:border-brand"
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-base font-semibold text-danger",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: busy,
					className: "mt-5 w-full rounded-2xl bg-brand py-4 text-xl font-extrabold text-white",
					children: busy ? "…" : "आगे बढ़ें →"
				})
			]
		})]
	});
}
var ERRORS = {
	duplicate: "आज इस नंबर पर कार्य चढ़ाया जा चुका है। कृपया दूसरा नंबर डालें।",
	wrong: "गलत नंबर। कृपया सही नंबर डालें।",
	repeat: "यह नंबर कल और आज दोनों को दिया गया है। एंट्री नहीं हो सकती।",
	none: "आज की तारीख के लिए कोई नंबर assign नहीं हुआ।",
	range: "नंबर 1 से 999 के बीच होना चाहिए।",
	work: "सफाई प्रकार चुनें।",
	score: "सफाई अंक चुनें।"
};
function zoneHindi(name) {
	const clean = (name || "").trim();
	if (!clean) return "जोन";
	return `जोन ${clean.replace(/^(zone|ज़ोन|जोन)\s*/i, "").trim() || clean}`;
}
function clock(ms) {
	const s = Math.max(0, Math.ceil(ms / 1e3));
	return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}
function denied(res) {
	return !!res && typeof res === "object" && "unauthorized" in res && res.unauthorized === true;
}
function InspectorApp({ onKicked }) {
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [offline, setOffline] = (0, import_react.useState)(false);
	const [view, setView] = (0, import_react.useState)("form");
	const [phase, setPhase] = (0, import_react.useState)("edit");
	const [number, setNumber] = (0, import_react.useState)("");
	const [jhadu, setJhadu] = (0, import_react.useState)(false);
	const [nali, setNali] = (0, import_react.useState)(false);
	const [kooda, setKooda] = (0, import_react.useState)(false);
	const [score, setScore] = (0, import_react.useState)(0);
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [entry, setEntry] = (0, import_react.useState)(null);
	const [now, setNow] = (0, import_react.useState)(Date.now());
	const [offset, setOffset] = (0, import_react.useState)(0);
	const hydrated = (0, import_react.useRef)(false);
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
			} catch {}
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
			} else hydrated.current = true;
		} catch {
			setOffline(true);
		}
	}
	(0, import_react.useLayoutEffect)(() => {
		try {
			const raw = localStorage.getItem("safai.inspectorProfile");
			if (!raw) return;
			const cached = JSON.parse(raw);
			if (cached?.code) setProfile(cached);
		} catch {}
	}, []);
	(0, import_react.useEffect)(() => {
		refresh();
		const poll = setInterval(() => void refresh(), 8e3);
		const tick = setInterval(() => setNow(Date.now()), 500);
		return () => {
			clearInterval(poll);
			clearInterval(tick);
		};
	}, []);
	const left = entry ? entry.editableUntil - (now + offset) : 0;
	(0, import_react.useEffect)(() => {
		if (phase === "done" && entry && left <= 0) setPhase("final");
		if (phase === "edit" && entry && left <= 0) setPhase("final");
	}, [
		left,
		phase,
		entry
	]);
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
		const res = await sendEntry({ data: {
			number: n,
			jhadu,
			nali,
			kooda,
			score
		} });
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
	if (!profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "mx-auto grid min-h-dvh w-full max-w-[430px] place-items-center bg-canvas px-6 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-extrabold text-brand",
				children: "सफाई निरीक्षण फॉर्म"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-base text-muted",
				children: "नगरपालिका खरखौदा क्षेत्र"
			}),
			offline ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted",
				children: "कनेक्शन नहीं हुआ। ऐप बंद करके फिर खोलें।"
			}) : null
		] })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto min-h-dvh w-full max-w-[430px] overflow-x-hidden bg-canvas pb-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "bg-brand px-4 pt-4 pb-5 text-white",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 rounded-2xl bg-white/10 p-2",
				children: [profile.councillorPhoto ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: profile.councillorPhoto,
					alt: "",
					className: "h-14 w-14 rounded-full object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-14 w-14 place-items-center rounded-full bg-white/20 text-lg font-bold",
					children: "प"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "truncate text-xl font-extrabold",
						children: profile.councillorName || "वार्ड पार्षद"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-sm text-white/85",
						children: ["पार्षद, वार्ड नं. ", profile.wardNo ?? "—"]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-2xl font-extrabold",
						children: [profile.name, profile.phoneCode ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ml-2 text-base font-bold text-white/90",
							children: ["फोन ", profile.phoneCode]
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-base text-white/90",
						children: "(स्थानीय निरीक्षक)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-base",
						children: [
							zoneHindi(profile.zoneName),
							" · वार्ड ",
							profile.wardNo ?? "—",
							" · कोड ",
							profile.code
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-base",
						children: ["तारीख: ", profile.dateLabel]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setView("report"),
					className: "grid max-w-[6.5rem] place-items-center text-center text-[11px] font-bold leading-tight",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "h-7 w-7" }), "रिपोर्ट / शिकायत"]
				})]
			})]
		}), view === "report" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportPanel, {
			onBack: () => setView("form"),
			onNew: freshForm,
			onKicked
		}) : phase === "done" && entry ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-4 mt-4 rounded-3xl bg-white p-5 text-center shadow",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid h-20 w-20 place-items-center rounded-full bg-ok text-4xl text-white",
					children: "✓"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-2xl font-extrabold",
					children: "फॉर्म जमा हो गया है"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
					number: entry.number,
					jhadu: entry.jhadu,
					nali: entry.nali,
					kooda: entry.kooda,
					score: entry.score
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm leading-relaxed text-muted",
					children: "अगर आप चाहें तो 2 मिनट के अंदर बदलाव कर सकते हैं। इसके लिए नीचे वाला बटन दबाएं।"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setPhase("edit"),
					className: "mt-3 w-full rounded-2xl border border-line py-3 text-lg font-bold text-muted",
					children: "बदलाव करें"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: ["समय बाकी: ", clock(left)]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: freshForm,
					className: "mt-4 w-full rounded-2xl bg-brand py-4 text-xl font-extrabold text-white",
					children: "नया फॉर्म भरें"
				})
			]
		}) : phase === "final" && entry ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-4 mt-4 rounded-3xl bg-white p-5 text-center shadow",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid h-24 w-24 place-items-center rounded-full bg-emerald-50",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-12 w-12 text-amber-500" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mt-3 flex items-center justify-center gap-2 text-2xl font-extrabold text-ok",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-7 w-7 place-items-center rounded-md bg-ok text-lg text-white",
						children: "✓"
					}), "फॉर्म फाइनल हो गया"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-base text-muted",
					children: "अब इसमें बदलाव नहीं हो सकता। धन्यवाद!"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
					number: entry.number,
					jhadu: entry.jhadu,
					nali: entry.nali,
					kooda: entry.kooda,
					score: entry.score
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: freshForm,
					className: "mt-4 w-full rounded-2xl bg-blue-50 px-3 py-3 text-base font-semibold text-brand",
					children: "अगला फॉर्म नए नंबर के साथ भरें।"
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-4 mt-4 rounded-3xl bg-white p-4 shadow",
			children: [
				entry && phase === "edit" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mb-3 rounded-xl bg-slate-100 px-3 py-2 text-sm text-muted",
					children: ["बदलाव करके दोबारा जमा करें · समय बाकी: ", clock(left)]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-center text-2xl font-extrabold text-brand",
					children: "सफाई निरीक्षण फॉर्म"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center text-base text-muted",
					children: "नगरपालिका खरखौदा क्षेत्र"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-3 block text-lg font-extrabold",
					children: ["आज का नंबर डालें ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-danger",
						children: "*"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "(सफाई कर्मचारी से पूछकर नंबर डालें) · 1 से 999"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					inputMode: "numeric",
					readOnly: phase === "edit" && !!entry,
					value: number,
					onChange: (e) => {
						setNumber(e.target.value.replace(/[^\d]/g, "").slice(0, 3));
						setError("");
					},
					className: `mt-1 w-full rounded-2xl border-2 px-4 py-3 text-center text-3xl font-extrabold outline-none ${error === "range" || error === "wrong" || error === "duplicate" || error === "none" || error === "repeat" ? "border-danger" : "border-line"}`
				}),
				error && ERRORS[error] && (error === "range" || error === "wrong" || error === "duplicate" || error === "none" || error === "repeat") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 rounded-xl bg-red-50 px-3 py-2 text-base font-semibold text-danger",
					children: ERRORS[error]
				}) : null,
				error && (error === "range" || error === "wrong" || error === "duplicate" || error === "none" || error === "repeat") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 rounded-2xl border border-red-100 p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-sm font-bold",
						children: "गलती होने पर दिखने वाले संदेश:"
					}), Object.entries(ERRORS).filter(([k]) => [
						"duplicate",
						"wrong",
						"repeat",
						"none",
						"range"
					].includes(k)).map(([key, text], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 rounded-xl bg-red-50 px-3 py-2 text-sm text-danger",
						children: [
							i + 1,
							". ",
							text
						]
					}, key))]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-lg font-extrabold",
					children: ["सफाई प्रकार ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-danger",
						children: "*"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 grid grid-cols-3 gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkTile, {
							label: "झाड़ू",
							on: jhadu,
							onClick: () => setJhadu((v) => !v),
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BroomIcon, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkTile, {
							label: "नाली",
							on: nali,
							onClick: () => setNali((v) => !v),
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrainIcon, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkTile, {
							label: "कूड़ा उठान",
							on: kooda,
							onClick: () => setKooda((v) => !v),
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrashIcon, {})
						})
					]
				}),
				error === "work" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-base font-semibold text-danger",
					children: ERRORS.work
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-lg font-extrabold",
					children: ["सफाई अंक ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-danger",
						children: "*"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex justify-between",
					children: [
						1,
						2,
						3,
						4,
						5
					].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setScore(n),
						className: `grid h-12 w-12 place-items-center rounded-full border-2 text-xl font-extrabold ${score === n ? "border-brand bg-brand text-white" : "border-brand text-brand"}`,
						children: n
					}, n))
				}),
				error === "score" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-base font-semibold text-danger",
					children: ERRORS.score
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: busy,
					onClick: () => void submit(),
					className: "mt-5 w-full rounded-2xl bg-brand py-4 text-xl font-extrabold text-white",
					children: busy ? "…" : entry ? "दोबारा जमा करें" : "फ़ॉर्म जमा करें"
				}),
				entry ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-center text-sm text-muted",
					children: "दोबारा जमा ना करने पर पहले वाला फॉर्म ही फाइनल माना जाएगा।"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-center text-sm font-semibold text-danger",
					children: ["समय बाकी: ", clock(left)]
				})] }) : null
			]
		})]
	});
}
function WorkTile({ label, on, onClick, icon, tone = "blue" }) {
	const selected = tone === "yellow" ? "border-amber-400 bg-amber-50" : "border-brand bg-blue-50";
	const tick = tone === "yellow" ? "bg-amber-400" : "bg-brand";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: `relative rounded-2xl border-2 px-1 py-3 ${on ? selected : "border-line bg-white"}`,
		children: [
			on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `absolute top-1 right-1 grid h-5 w-5 place-items-center rounded-full text-xs text-white ${tick}`,
				children: "✓"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto w-fit",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 text-sm font-extrabold",
				children: label
			})
		]
	});
}
function Summary({ number, jhadu, nali, kooda, score }) {
	const works = [
		jhadu ? "झाड़ू" : "",
		nali ? "नाली" : "",
		kooda ? "कूड़ा उठान" : ""
	].filter(Boolean).join(", ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 overflow-hidden rounded-2xl border border-line text-left text-lg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				k: "आज का नंबर",
				v: String(number)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				k: "सफाई प्रकार",
				v: works
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				k: "सफाई अंक",
				v: `${score} / 5`
			})
		]
	});
}
function Row({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between border-b border-line px-3 py-2 last:border-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: k }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: v })]
	});
}
function kindLabel(row) {
	return [
		row.jhadu ? "झाड़ू" : "",
		row.nali ? "नाली" : "",
		row.kooda ? "कूड़ा उठान" : ""
	].filter(Boolean).join(", ");
}
function ReportPanel({ onBack, onNew, onKicked }) {
	const today = istNow().iso;
	const [mode, setMode] = (0, import_react.useState)("month");
	const [from, setFrom] = (0, import_react.useState)(monthStart(today));
	const [to, setTo] = (0, import_react.useState)(today);
	const [rows, setRows] = (0, import_react.useState)([]);
	const [total, setTotal] = (0, import_react.useState)(0);
	const [avg, setAvg] = (0, import_react.useState)(null);
	const [complaints, setComplaints] = (0, import_react.useState)([]);
	const [filing, setFiling] = (0, import_react.useState)(false);
	const [pick, setPick] = (0, import_react.useState)({
		jhadu: false,
		nali: false,
		kooda: false
	});
	const [busy, setBusy] = (0, import_react.useState)(false);
	const range = (0, import_react.useMemo)(() => {
		if (mode === "week") return {
			from: weekStart(today),
			to: today
		};
		if (mode === "month") return {
			from: monthStart(today),
			to: today
		};
		return {
			from,
			to: to < from ? from : to
		};
	}, [
		mode,
		from,
		to,
		today
	]);
	function loadComplaints() {
		loadMyComplaints().then((res) => {
			if (denied(res)) {
				onKicked();
				return;
			}
			if (res.ok) setComplaints(res.rows);
		});
	}
	(0, import_react.useEffect)(() => {
		loadMyReports({ data: range }).then((res) => {
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
	(0, import_react.useEffect)(() => {
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
		setPick({
			jhadu: false,
			nali: false,
			kooda: false
		});
		loadComplaints();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "px-4 pt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onBack,
				className: "mb-2 text-base font-bold text-brand",
				children: "← फॉर्म"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl font-extrabold",
				children: "मेरी रिपोर्ट"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl bg-white p-4 text-center shadow",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-4xl font-extrabold text-brand",
						children: total
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "कुल रिपोर्ट" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl bg-white p-4 text-center shadow",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-4xl font-extrabold text-ok",
						children: score2(avg)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "औसत अंक" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						on: mode === "week",
						onClick: () => setMode("week"),
						children: "इस हफ़्ते"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						on: mode === "month",
						onClick: () => setMode("month"),
						children: "इस महीने"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						on: mode === "custom",
						onClick: () => setMode("custom"),
						children: "तारीख चुनें"
					})
				]
			}),
			mode === "custom" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "relative block rounded-xl border px-2 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block",
						children: from ? dmy(from) : "दिनांक चुनें"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "date",
						value: from,
						max: shiftIso(today, 0),
						onChange: (e) => setFrom(e.target.value),
						className: "absolute inset-0 opacity-0"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "relative block rounded-xl border px-2 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block",
						children: to ? dmy(to) : "दिनांक चुनें"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "date",
						value: to,
						onChange: (e) => setTo(e.target.value),
						className: "absolute inset-0 opacity-0"
					})]
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 max-h-[18.5rem] overflow-y-auto rounded-2xl bg-white shadow",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full table-fixed text-[12px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "sticky top-0 bg-white text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "w-[16%] px-1 py-2 text-left font-semibold",
								children: "दिनांक"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "w-[14%] text-left font-semibold",
								children: "नंबर"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "w-[17%] text-center font-semibold",
								children: "झाड़ू"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "w-[17%] text-center font-semibold",
								children: "नाली"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "w-[18%] text-center font-semibold",
								children: "कूड़ा"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "w-[18%] pr-1 text-right font-semibold",
								children: "अंक"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 6,
						className: "px-2 py-6 text-center text-muted",
						children: "अभी कोई रिपोर्ट नहीं।"
					}) }) : rows.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-line",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-1 py-2",
								children: r.date.slice(0, 5)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: `font-extrabold ${r.absent ? "text-amber-500" : ""}`,
								children: r.absent ? "A" : r.number
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "text-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: r.jhadu ? "text-emerald-500" : "text-slate-300",
									children: r.jhadu ? "●" : "○"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "text-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: r.nali ? "text-emerald-500" : "text-slate-300",
									children: r.nali ? "●" : "○"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "text-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: r.kooda ? "text-emerald-500" : "text-slate-300",
									children: r.kooda ? "●" : "○"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "pr-1 text-right font-extrabold text-amber-500",
								children: [r.score, "★"]
							})
						]
					}, i)) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onNew,
				className: "mt-4 w-full rounded-2xl bg-brand py-4 text-xl font-extrabold text-white",
				children: "+ नया फॉर्म भरें"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setFiling(true),
				className: "mt-3 w-full rounded-2xl bg-amber-400 py-4 text-xl font-extrabold text-slate-900",
				children: "शिकायत दर्ज करें"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-5 text-xl font-extrabold",
				children: "मेरी शिकायतें"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 max-h-[16rem] overflow-y-auto rounded-2xl bg-white shadow",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full table-fixed text-[12px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "sticky top-0 bg-white text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "w-[22%] px-1 py-2 text-left font-semibold",
								children: "दिनांक"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "w-[34%] text-left font-semibold",
								children: "प्रकार"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "w-[18%] text-left font-semibold",
								children: "स्थिति"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "w-[26%] pr-1 text-right font-semibold",
								children: "समाधान"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: complaints.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 4,
						className: "px-2 py-6 text-center text-muted",
						children: "अभी कोई शिकायत नहीं।"
					}) }) : complaints.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-line",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-1 py-2",
								children: row.date.slice(0, 5)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2",
								children: kindLabel(row)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: `py-2 font-extrabold ${row.done ? "text-emerald-600" : "text-red-600"}`,
								children: row.done ? "पूर्ण" : "अधूरी"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "pr-1 py-2 text-right",
								children: row.solved ? row.solved.slice(0, 5) : "—"
							})
						]
					}, row.id)) })]
				})
			}),
			filing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-40 flex items-end justify-center bg-black/45",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-h-[92dvh] w-full max-w-[430px] overflow-y-auto rounded-t-3xl bg-white p-4 pb-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setFiling(false),
							className: "w-full rounded-2xl border border-line py-3 text-base font-bold text-muted",
							children: "अभी कोई शिकायत नहीं"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 text-center text-xl font-extrabold",
							children: "शिकायत का प्रकार चुनें"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 grid grid-cols-3 gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkTile, {
									tone: "yellow",
									label: "झाड़ू",
									on: pick.jhadu,
									onClick: () => setPick({
										...pick,
										jhadu: !pick.jhadu
									}),
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BroomIcon, { tone: "yellow" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkTile, {
									tone: "yellow",
									label: "नाली",
									on: pick.nali,
									onClick: () => setPick({
										...pick,
										nali: !pick.nali
									}),
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrainIcon, { tone: "yellow" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkTile, {
									tone: "yellow",
									label: "कूड़ा उठान",
									on: pick.kooda,
									onClick: () => setPick({
										...pick,
										kooda: !pick.kooda
									}),
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrashIcon, { tone: "yellow" })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: busy || !pick.jhadu && !pick.nali && !pick.kooda,
							onClick: () => void submitComplaint(),
							className: "mt-5 w-full rounded-2xl bg-amber-400 py-4 text-xl font-extrabold text-slate-900 disabled:opacity-50",
							children: busy ? "…" : "जमा करें"
						})
					]
				})
			}) : null
		]
	});
}
function Chip({ on, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: `rounded-full px-4 py-2 text-base font-bold ${on ? "bg-brand text-white" : "bg-white text-ink"}`,
		children
	});
}
function escapePdf(value) {
	return value.replace(/[^\x20-\x7E]/g, " ").replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}
function colWidths(labels, total) {
	const weight = labels.map((label) => {
		if (/ward|date|code/i.test(label)) return 1.15;
		if (/zone|name|no/i.test(label)) return 1.55;
		return 1;
	});
	const sum = weight.reduce((a, b) => a + b, 0);
	return weight.map((w) => w / sum * total);
}
function clip(value, width, size) {
	const max = Math.max(1, Math.floor((width - 10) / (size * .52)));
	const clean = escapePdf(value);
	return clean.length > max ? `${clean.slice(0, max - 1)}.` : clean;
}
function downloadPdf(filename, title, columns, rows) {
	const pageW = 595;
	const pageH = 842;
	const margin = 22;
	const tableW = 551;
	const widths = colWidths(columns, tableW);
	const rowH = 18;
	const headH = 22;
	const perPage = 34;
	const chunks = [];
	const source = rows.length ? rows : [];
	for (let i = 0; i < Math.max(source.length, 1); i += perPage) chunks.push(source.slice(i, i + perPage));
	const objects = [];
	const kids = [];
	let id = 1;
	const fontId = id++;
	const boldId = id++;
	objects[fontId] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";
	objects[boldId] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>";
	chunks.forEach((pageRows, pageIndex) => {
		const pageId = id++;
		const contentId = id++;
		kids.push(`${pageId} 0 R`);
		const ops = [];
		ops.push(`0.08 0.16 0.42 rg 0 764 ${pageW} 78 re f`);
		ops.push(`0.13 0.72 0.55 rg 0 758 ${pageW} 6 re f`);
		ops.push(`1 1 1 rg BT /F2 18 Tf 1 0 0 1 22 808 Tm (Safai Nirikshan) Tj ET`);
		ops.push(`0.82 0.88 1 rg BT /F1 10 Tf 1 0 0 1 22 790 Tm (Nagarpalika Kharkhoda Kshetra) Tj ET`);
		ops.push(`1 1 1 rg BT /F2 11 Tf 1 0 0 1 390 798 Tm (${escapePdf(title)}) Tj ET`);
		let y = 724;
		let x = margin;
		ops.push(`0.20 0.32 0.62 rg ${margin} ${y} ${tableW} ${headH} re f`);
		columns.forEach((label, i) => {
			ops.push(`1 1 1 rg BT /F2 8 Tf 1 0 0 1 ${x + 3} ${y + 7} Tm (${clip(label, widths[i], 8)}) Tj ET`);
			x += widths[i];
		});
		y -= rowH;
		if (!pageRows.length) {
			ops.push(`0.96 0.97 0.99 rg ${margin} ${y} ${tableW} ${rowH} re f`);
			ops.push(`0.35 0.4 0.5 rg BT /F1 10 Tf 1 0 0 1 30 ${y + 7} Tm (No reports in this range.) Tj ET`);
		}
		pageRows.forEach((row, rowIndex) => {
			const bg = rowIndex % 2 === 0 ? "0.96 0.97 0.99" : "1 1 1";
			ops.push(`${bg} rg ${margin} ${y} ${tableW} ${rowH} re f`);
			ops.push(`0.86 0.89 0.93 RG 0.4 w ${margin} ${y} m 573 ${y} l S`);
			let cx = margin;
			row.forEach((cell, i) => {
				if (cell === "●" || cell === "○") {
					const cx0 = cx + widths[i] / 2;
					const cy = y + rowH / 2;
					if (cell === "●") ops.push(`0.13 0.65 0.38 rg ${cx0} ${cy} 5 0 360 arc f`);
					else ops.push(`0.62 0.68 0.76 RG 1.2 w ${cx0} ${cy} 4.5 0 360 arc S`);
				} else {
					const percent = /^(\d+(?:\.\d+)?)%$/.exec(cell);
					const tone = percent ? Number(percent[1]) >= 80 ? "0.10 0.55 0.32" : Number(percent[1]) >= 60 ? "0.72 0.48 0.05" : "0.75 0.18 0.18" : "0.12 0.16 0.28";
					ops.push(`${tone} rg BT /F1 8 Tf 1 0 0 1 ${cx + 3} ${y + 5} Tm (${clip(cell, widths[i], 8)}) Tj ET`);
				}
				cx += widths[i];
			});
			y -= rowH;
		});
		ops.push(`0.45 0.5 0.6 rg BT /F1 8 Tf 1 0 0 1 22 24 Tm (Nagarpalika Kharkhoda Kshetra  ·  Safai Nirikshan  ·  Last 60 days) Tj ET`);
		ops.push(`0.45 0.5 0.6 rg BT /F1 8 Tf 1 0 0 1 500 24 Tm (Page ${pageIndex + 1} / ${chunks.length}) Tj ET`);
		const stream = ops.join("\n");
		objects[contentId] = `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`;
		objects[pageId] = `<< /Type /Page /Parent PAGES 0 R /MediaBox [0 0 ${pageW} ${pageH}] /Contents ${contentId} 0 R /Resources << /Font << /F1 ${fontId} 0 R /F2 ${boldId} 0 R >> >> >>`;
	});
	const pagesId = id++;
	objects[pagesId] = `<< /Type /Pages /Count ${kids.length} /Kids [${kids.join(" ")}] >>`;
	const catalogId = id++;
	objects[catalogId] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`;
	let pdf = "%PDF-1.4\n";
	const offsets = [];
	for (let i = 1; i <= catalogId; i++) {
		offsets[i] = pdf.length;
		pdf += `${i} 0 obj\n${(objects[i] ?? "").replaceAll("PAGES", String(pagesId))} \nendobj\n`;
	}
	const xref = pdf.length;
	pdf += `xref\n0 ${catalogId + 1}\n0000000000 65535 f \n`;
	for (let i = 1; i <= catalogId; i++) pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
	pdf += `trailer << /Size ${catalogId + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xref}\n%%EOF`;
	const blob = new Blob([pdf], { type: "application/pdf" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}
function escapeHtml(value) {
	return value.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">");
}
function printTable(title, columns, rows) {
	const head = columns.map((c) => `<th>${escapeHtml(c)}</th>`).join("");
	const body = rows.map((row) => `<tr>${row.map((cell) => {
		if (cell === "●") return `<td class="yes">●</td>`;
		if (cell === "○") return `<td class="no">○</td>`;
		return `<td>${escapeHtml(cell)}</td>`;
	}).join("")}</tr>`).join("");
	const html = `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(title)}</title>
    <style>
      body{font-family:sans-serif;padding:24px;color:#14203a;background:#fff}
      h1{margin:0;font-size:22px}
      p{margin:4px 0 16px;color:#5b6b86}
      table{border-collapse:collapse;width:100%}
      th{background:#243f86;color:#fff;padding:8px;font-size:12px;text-align:left}
      td{border-bottom:1px solid #e4e8f0;padding:8px;font-size:12px}
      tr:nth-child(even) td{background:#f6f8fc}
      td.yes{color:#149447;font-size:16px;text-align:center}
      td.no{color:#b7bfcc;font-size:16px;text-align:center}
      .back{margin-top:16px;border:0;border-radius:12px;background:#243f86;color:#fff;padding:12px 16px;font-size:16px}
      @media print { .back{display:none} }
    </style></head><body>
    <h1>Safai Nirikshan</h1><p>Nagarpalika Kharkhoda Kshetra · ${escapeHtml(title)}</p>
    <table><thead><tr>${head}</tr></thead><tbody>${body || "<tr><td>No reports</td></tr>"}</tbody></table>
    <button class="back" type="button" onclick="window.close()">बंद करें</button>
    <script>window.addEventListener("load",function(){setTimeout(function(){window.print()},400)})<\/script>
    </body></html>`;
	const blob = new Blob([html], { type: "text/html" });
	const url = URL.createObjectURL(blob);
	if (!window.open(url, "_blank")) {
		const frame = document.createElement("iframe");
		frame.style.cssText = "position:fixed;inset:0;width:100%;height:100%;border:0;background:#fff;z-index:9999";
		document.body.appendChild(frame);
		frame.src = url;
		frame.onload = () => setTimeout(() => frame.contentWindow?.print(), 400);
	}
	setTimeout(() => URL.revokeObjectURL(url), 6e4);
}
var OfficeCtx = (0, import_react.createContext)({
	role: "admin",
	name: "Admin",
	username: "ADMIN",
	attendance: "edit",
	zone: "edit",
	number: "edit",
	staff: "edit",
	councillor: "edit",
	zones: []
});
function useOffice() {
	return (0, import_react.useContext)(OfficeCtx);
}
function zoneLv(office, id) {
	if (office.role === "admin") return "edit";
	return office.zones.find((z) => z.id === id)?.perm ?? "none";
}
function zonesLocked(office) {
	return office.role === "subadmin" && office.zones.every((z) => z.perm === "none");
}
function tx(lang, en, hi) {
	return lang === "hi" ? hi : en;
}
function workClass(n) {
	if (n >= 80) return "text-emerald-300";
	if (n >= 60) return "text-amber-300";
	return "text-red-300";
}
async function circlePhoto(file) {
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
	return canvas.toDataURL("image/jpeg", .82);
}
function AdminApp({ lang, username, office, onLang, onLogout }) {
	const [tab, setTab] = (0, import_react.useState)("home");
	const [screen, setScreen] = (0, import_react.useState)("main");
	const [profile, setProfile] = (0, import_react.useState)(false);
	const [bell, setBell] = (0, import_react.useState)(false);
	const [focusZone, setFocusZone] = (0, import_react.useState)(null);
	const navLock = zonesLocked(office);
	async function logout() {
		await signOut();
		clearToken();
		onLogout();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfficeCtx.Provider, {
		value: office,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `mx-auto flex min-h-dvh w-full max-w-[430px] flex-col overflow-x-hidden bg-night text-night-fg ${bell ? "h-dvh overflow-hidden" : ""}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 pb-24",
					children: screen === "assign" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssignScreen, {
						lang,
						onBack: () => setScreen("main")
					}) : screen === "iReport" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InspectorReport, {
						lang,
						onBack: () => setScreen("main")
					}) : screen === "subs" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubAdmins, {
						lang,
						onBack: () => setScreen("main")
					}) : screen === "pass" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OwnPassword, {
						lang,
						onBack: () => setScreen("main")
					}) : tab === "home" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeScreen, {
						lang,
						onAssign: () => setScreen("assign"),
						onZone: (id) => {
							setFocusZone(id);
							setTab("zones");
						},
						onBell: () => setBell(true)
					}) : tab === "zones" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZonesScreen, {
						lang,
						focusZone,
						onBell: () => setBell(true)
					}) : tab === "reports" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportsScreen, {
						lang,
						onInspectors: () => setScreen("iReport"),
						onBell: () => setBell(true)
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaffScreen, {
						lang,
						onBell: () => setBell(true)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "fixed bottom-0 left-1/2 z-30 grid w-full max-w-[430px] -translate-x-1/2 grid-cols-5 border-t border-night-line bg-night-2 px-1 py-2 text-[11px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tab, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "h-5 w-5" }),
							label: tx(lang, "Home", "होम"),
							on: tab === "home" && screen === "main" && !bell,
							onClick: () => {
								setBell(false);
								setTab("home");
								setScreen("main");
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tab, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-5 w-5" }), navLock ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute -top-1 -right-2 h-3 w-3 text-amber-300" }) : null]
							}),
							label: tx(lang, "Zones", "ज़ोन"),
							on: tab === "zones" && screen === "main" && !bell,
							onClick: () => {
								setBell(false);
								setTab("zones");
								setScreen("main");
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tab, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "h-5 w-5" }),
							label: tx(lang, "Reports", "रिपोर्ट"),
							on: tab === "reports" && screen === "main" && !bell,
							onClick: () => {
								setBell(false);
								setTab("reports");
								setScreen("main");
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tab, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-5 w-5" }),
							label: tx(lang, "Staff", "स्टाफ"),
							on: tab === "staff" && screen === "main" && !bell,
							onClick: () => {
								setBell(false);
								setTab("staff");
								setScreen("main");
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tab, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "h-5 w-5" }),
							label: tx(lang, "Profile", "प्रोफ़ाइल"),
							on: profile,
							onClick: () => {
								setBell(false);
								setProfile(true);
							}
						})
					]
				}),
				profile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileSheet, {
					lang,
					username,
					onLang,
					onClose: () => setProfile(false),
					onLogout: () => void logout(),
					onSubs: () => {
						setProfile(false);
						setScreen("subs");
					},
					onPassword: () => {
						setProfile(false);
						setScreen("pass");
					}
				}) : null,
				bell ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComplaintsScreen, {
					lang,
					onBack: () => setBell(false)
				}) : null
			]
		})
	});
}
function BellButton({ onClick, box = "h-10 w-10 rounded-full bg-night-3" }) {
	const [n, setN] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		let stop = false;
		const pull = () => {
			loadComplaintCount().then((res) => {
				if (!stop && res.ok) setN(res.unseen);
			});
		};
		const seen = () => setN(0);
		pull();
		const id = setInterval(pull, 8e3);
		window.addEventListener("safai-complaints-seen", seen);
		return () => {
			stop = true;
			clearInterval(id);
			window.removeEventListener("safai-complaints-seen", seen);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: `relative grid shrink-0 place-items-center ${box}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-5 w-5" }), n > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute -top-1 -right-1 min-w-[1.15rem] rounded-full bg-red-600 px-1 text-center text-[10px] font-extrabold leading-4 text-white",
			children: n > 99 ? "99+" : n
		}) : null]
	});
}
function shortType(row) {
	return [
		row.jhadu ? "झाड़ू" : "",
		row.nali ? "नाली" : "",
		row.kooda ? "कूड़ा" : ""
	].filter(Boolean).join("+");
}
function ComplaintsScreen({ lang, onBack }) {
	const [rows, setRows] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		markComplaintsSeen().then(() => {
			window.dispatchEvent(new Event("safai-complaints-seen"));
			return loadComplaints();
		}).then((res) => {
			if (res?.ok) setRows(res.rows);
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-20 mx-auto flex w-full max-w-[430px] flex-col bg-night text-night-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-4 pt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onBack,
				className: "text-sm font-bold text-accent",
				children: ["← ", tx(lang, "Back", "वापस")]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-2xl font-extrabold",
				children: tx(lang, "Complaints", "शिकायतें")
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 flex-1 overflow-y-auto overscroll-contain px-2 pb-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full table-fixed text-[10px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "sticky top-0 bg-night text-night-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "w-[24%] px-1 py-2 text-left font-semibold",
							children: "DOC"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "w-[18%] text-left font-semibold",
							children: "Type"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "w-[16%] text-left font-semibold",
							children: "Zone"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "w-[12%] text-left font-semibold",
							children: "Code"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "w-[16%] text-left font-semibold",
							children: "Status"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "w-[14%] pr-1 text-right font-semibold",
							children: "DOS"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					colSpan: 6,
					className: "px-2 py-8 text-center text-sm text-night-muted",
					children: tx(lang, "No complaints yet.", "अभी कोई शिकायत नहीं।")
				}) }) : rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-white/10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "truncate px-1 py-2",
							children: row.doc
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "truncate py-2",
							children: shortType(row)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "truncate py-2",
							children: zoneLabel(row.zone)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "truncate py-2",
							children: row.code
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: `py-2 font-extrabold ${row.done ? "text-emerald-400" : "text-red-400"}`,
							children: row.done ? "done" : "pending"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "truncate pr-1 py-2 text-right",
							children: row.dos === "—" ? "—" : row.dos.slice(0, 5)
						})
					]
				}, row.id)) })]
			})
		})]
	});
}
function Tab({ icon, label, on, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: `grid place-items-center gap-1 ${on ? "text-accent" : "text-night-muted"}`,
		children: [icon, label]
	});
}
function Top({ title, sub, onBell }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start justify-between px-4 pt-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-extrabold",
			children: title
		}), sub ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-night-muted",
			children: sub
		}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BellButton, { onClick: onBell })]
	});
}
function HomeScreen({ lang, onAssign, onZone, onBell }) {
	const office = useOffice();
	const [data, setData] = (0, import_react.useState)(null);
	const [failed, setFailed] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const pull = () => {
			loadDashboard().then((res) => {
				setData(res);
				setFailed(false);
			}).catch(() => setFailed(true));
		};
		pull();
		const id = setInterval(pull, 4e3);
		return () => clearInterval(id);
	}, []);
	if (failed && !data?.ok) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "p-6 text-night-muted",
		children: tx(lang, "Could not load. Check the connection and open the app again.", "लोड नहीं हुआ। कनेक्शन जाँचकर ऐप फिर खोलें।")
	});
	if (!data || !data.ok) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "p-6 text-night-muted",
		children: tx(lang, "Loading…", "लोड हो रहा है…")
	});
	const sub = office.role === "subadmin";
	const noZones = sub && data.zones.length === 0;
	const initial = (sub ? office.name : "A").trim().charAt(0).toUpperCase() || "A";
	const zoneHint = data.zones.map((z) => zoneLabel(z.name)).join(" + ");
	const inspHint = data.zones.map((z) => `${zoneLabel(z.name)} (${z.inspectors})`).join(" + ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 px-4 pt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl font-extrabold text-white ${sub ? "bg-[#3b82f6]" : "bg-[#3b82f6]"}`,
					children: initial
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-[22px] font-extrabold leading-tight",
						children: sub ? `Sub Admin · ${office.name.split(" ")[0]}` : tx(lang, "Admin Dashboard", "एडमिन डैशबोर्ड")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-night-muted",
						children: [
							sub ? `Sub Admin · ${office.username}` : tx(lang, "Admin · Councillor", "एडमिन · पार्षद"),
							" · ",
							data.dateLabel
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BellButton, {
					onClick: onBell,
					box: "h-11 w-11 rounded-2xl bg-night-3"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-3 px-4 pt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					className: "dash-zones",
					value: String(data.zoneCount),
					label: tx(lang, "Total Zones", "कुल ज़ोन"),
					hint: sub && zoneHint ? zoneHint : void 0,
					lock: noZones
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					className: "dash-insp",
					value: String(data.inspectorCount),
					label: tx(lang, "Total Inspectors", "कुल निरीक्षक"),
					hint: sub && inspHint ? inspHint : void 0,
					lock: noZones
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "dash-reports rounded-[22px] p-4 text-white",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[34px] font-extrabold leading-none",
							children: data.monthReports
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded-full bg-black/25 px-2 py-0.5 text-xs font-bold",
							children: [Number(data.monthPct).toFixed(1), "%"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 text-sm font-semibold leading-snug",
						children: tx(lang, `Reports This Month (${data.monthLabel})`, `इस महीने की रिपोर्ट (${data.monthLabel})`)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					className: "dash-avg",
					value: `${data.avg == null ? "—" : score2(data.avg)} ★`,
					label: tx(lang, `Avg Score This Month (${data.monthLabel})`, `इस महीने का औसत (${data.monthLabel})`)
				})
			]
		}),
		office.number === "none" ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: onAssign,
			className: "dash-assign mx-4 mt-3 flex w-[calc(100%-2rem)] items-center gap-3 rounded-[22px] px-3 py-3 text-left text-white",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/25 text-xl font-extrabold",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hash, { className: "h-6 w-6" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-lg font-extrabold leading-tight",
						children: tx(lang, "Assign Today's Number", "आज का नंबर दें")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm font-semibold opacity-90",
						children: [
							tx(lang, "For all zones", "सभी ज़ोन के लिए"),
							" · ",
							data.dateLabel
						]
					})]
				}),
				office.number === "view" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-white/25 px-2 py-1 text-[11px] font-bold",
					children: "View only"
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-2xl font-bold opacity-90",
					children: "›"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-4 pt-5",
			children: noZones ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-center justify-center gap-2 rounded-2xl bg-night-3 px-4 py-4 text-sm text-night-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4 text-amber-300" }), " किसी भी zone की permission नहीं है"]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-extrabold",
					children: tx(lang, "Zone List", "ज़ोन सूची")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-xs leading-relaxed text-night-muted",
					children: [
						tx(lang, "This Month % = reports ÷ (inspectors × days in month)", "इस महीने % = रिपोर्ट ÷ (निरीक्षक × महीने के दिन)"),
						" · ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-emerald-400",
							children: "60%+"
						}),
						" · ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-red-400",
							children: tx(lang, "below 60%", "60% से कम")
						})
					]
				}),
				data.zones.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 rounded-2xl bg-night-3 p-4 text-sm text-night-muted",
					children: tx(lang, "No zones yet. Add one from the Zones tab.", "अभी कोई ज़ोन नहीं। ज़ोन टैब से जोड़ें।")
				}) : data.zones.map((z) => {
					const lv = zoneLv(office, z.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "mt-3 rounded-[22px] border border-white/5 bg-[#17142e] p-3.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-lg font-extrabold",
									children: [
										zoneLabel(z.name),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "ml-1 rounded-full bg-emerald-300 px-2 py-0.5 align-middle text-[11px] font-bold text-emerald-950",
											children: tx(lang, "Active", "सक्रिय")
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-[13px] text-night-muted",
									children: [
										z.wards.length ? `${tx(lang, "Ward No", "वार्ड नं.")} ${z.wards.join(" & ")}` : tx(lang, "No ward", "वार्ड नहीं"),
										" · ",
										tx(lang, "Supervisor", "सुपरवाइज़र"),
										": ",
										z.supervisor || "—",
										" · ",
										z.inspectors,
										" ",
										tx(lang, "Inspectors", "निरीक्षक")
									]
								})]
							}), lv === "view" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-[#2a2748] px-2 py-1 text-[11px] font-bold text-slate-200",
								children: "View only"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => onZone(z.id),
								"aria-label": "edit",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4 text-amber-300" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 grid grid-cols-4 gap-1.5 text-center text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
									k: tx(lang, "Total", "कुल"),
									v: String(z.total)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
									k: tx(lang, "This Month", "इस महीने"),
									v: String(z.month),
									chip: `${z.monthPct}%`,
									good: z.monthPct >= 60
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
									k: tx(lang, "Avg", "औसत"),
									v: `${z.avg == null ? "—" : score2(z.avg)} ★`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => onZone(z.id),
									className: "rounded-2xl bg-[#12101f] px-1 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] text-night-muted",
										children: tx(lang, "View Details", "विवरण")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-lg font-bold leading-none text-white",
										children: "›"
									})]
								})
							]
						})]
					}, z.id);
				})
			] })
		})
	] });
}
function Stat({ className, value, label, hint, lock }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `${className} rounded-[22px] p-4 text-white`,
		children: [
			lock ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-8 w-8 text-amber-200" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[34px] font-extrabold leading-none",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 text-sm font-semibold leading-snug",
				children: label
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 text-[11px] font-semibold leading-snug opacity-90",
				children: hint
			}) : null
		]
	});
}
function Mini({ k, v, chip, good }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-[#12101f] px-1 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs text-night-muted",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "font-extrabold",
			children: [
				v,
				" ",
				chip ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `ml-1 rounded-full px-1.5 text-[10px] ${good ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"}`,
					children: chip
				}) : null
			]
		})]
	});
}
function AssignScreen({ lang, onBack }) {
	const canEdit = useOffice().number === "edit";
	const [board, setBoard] = (0, import_react.useState)(null);
	const [zoneId, setZoneId] = (0, import_react.useState)("");
	const [number, setNumber] = (0, import_react.useState)("");
	const [msg, setMsg] = (0, import_react.useState)("");
	const [edit, setEdit] = (0, import_react.useState)(null);
	const [confirmNumber, setConfirmNumber] = (0, import_react.useState)(null);
	async function pull() {
		const res = await loadNumbers();
		setBoard(res);
		if (res.ok && res.today[0] && zoneId === "") setZoneId("all");
	}
	(0, import_react.useEffect)(() => {
		pull();
	}, []);
	async function assign() {
		if (!board?.ok || zoneId === "") return;
		const res = await assignNumberFn({ data: {
			zoneId: zoneId === "all" ? "all" : Number(zoneId),
			number: Number(number)
		} });
		if (!res.ok) setMsg("error" in res && res.error === "duplicate" ? tx(lang, "This number is already on that zone today.", "यह नंबर आज इस ज़ोन पर पहले से है।") : tx(lang, "Enter a number from 1 to 999.", "1 से 999 के बीच नंबर डालें।"));
		else {
			setMsg("");
			setNumber("");
			await pull();
		}
	}
	if (!board?.ok) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "p-6",
		children: tx(lang, "Loading…", "लोड हो रहा है…")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-4 pt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onBack,
				className: "text-sm font-bold text-accent",
				children: ["← ", tx(lang, "Home", "होम")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-extrabold",
					children: tx(lang, "Assign Today's Number", "आज का नंबर दें")
				}), canEdit ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1 rounded-full bg-accent px-2 py-1 text-[11px] font-bold text-white",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-3 w-3" }), " View only"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-night-muted",
				children: tx(lang, "Usually 1 number per zone per day", "आमतौर पर एक ज़ोन पर दिन में एक नंबर")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "mt-4 block text-sm text-night-muted",
				children: tx(lang, "Date (auto)", "तारीख (अपने आप)")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 rounded-2xl border border-night-line bg-night-3 px-4 py-3",
				children: [board.dateLabel, " 🔒"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "mt-3 block text-sm text-night-muted",
				children: tx(lang, "Select Zone", "ज़ोन चुनें")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: zoneId,
					disabled: !canEdit,
					onChange: (e) => setZoneId(e.target.value === "all" ? "all" : Number(e.target.value)),
					className: `mt-1 w-full rounded-2xl px-4 py-3 font-bold ${canEdit ? "border-2 border-accent bg-accent/20 ring-4 ring-accent/30" : "border border-night-line bg-night-3 pr-10 opacity-80"}`,
					children: [
						board.today.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: tx(lang, "Add a zone first", "पहले ज़ोन जोड़ें")
						}) : null,
						board.today.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "all",
							children: tx(lang, "All zones", "सभी ज़ोन")
						}) : null,
						board.today.map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: z.id,
							children: [zoneLabel(z.name), z.wards.length ? ` · Ward ${z.wards.join(" & ")}` : ""]
						}, z.id))
					]
				}), canEdit ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-amber-300" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					inputMode: "numeric",
					disabled: !canEdit,
					value: number,
					onChange: (e) => setNumber(e.target.value.replace(/\D/g, "").slice(0, 3)),
					placeholder: tx(lang, "Number (1–999)", "नंबर (1–999)"),
					className: "flex-1 rounded-2xl border border-night-line bg-night-3 px-4 py-3 disabled:opacity-60"
				}), canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => void assign(),
					className: "rounded-2xl bg-accent px-4 font-bold",
					children: ["+ ", tx(lang, "Assign", "जोड़ें")]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					disabled: true,
					className: "inline-flex items-center gap-1 rounded-2xl bg-night-3 px-4 font-bold text-slate-400",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-3.5 w-3.5 text-amber-300" }),
						" ",
						tx(lang, "Assign", "जोड़ें")
					]
				})]
			}),
			msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-red-300",
				children: msg
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-night-muted",
				children: tx(lang, "Same number can be used in another zone. It cannot repeat inside one zone on the same day.", "दूसरे ज़ोन में वही नंबर चल सकता है। एक ज़ोन में उसी दिन दोहरा नहीं सकते।")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-5 font-extrabold",
				children: tx(lang, "Today's Numbers", "आज के नंबर")
			}),
			board.today.map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 rounded-2xl bg-night-3 p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-bold",
						children: zoneLabel(z.name)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-night-muted",
						children: z.wards.length ? `Ward ${z.wards.join(" & ")}` : ""
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex flex-wrap gap-2",
						children: [z.numbers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-red-500/20 px-2 py-1 text-xs text-red-200",
							children: tx(lang, "Not assigned yet", "अभी नंबर नहीं")
						}) : null, z.numbers.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2 rounded-full bg-night px-3 py-1",
							children: [edit?.id === n.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: edit.number,
								onChange: (e) => setEdit({
									id: n.id,
									number: e.target.value.replace(/\D/g, "").slice(0, 3)
								}),
								className: "w-14 bg-transparent outline-none"
							}) : n.number, canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => edit?.id === n.id ? void updateNumberFn({ data: {
									id: n.id,
									number: Number(edit.number)
								} }).then(pull) : setEdit({
									id: n.id,
									number: String(n.number)
								}),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setConfirmNumber(n.id),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-3.5 w-3.5 text-amber-300" })]
						}, n.id))]
					}),
					z.numbers.some((n) => n.id === confirmNumber) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDelete, {
						lang,
						text: tx(lang, "Delete this number?", "यह नंबर डिलीट करें?"),
						onCancel: () => setConfirmNumber(null),
						onConfirm: () => {
							const id = confirmNumber;
							setConfirmNumber(null);
							if (id) removeNumberFn({ data: id }).then(pull);
						}
					}) : null
				]
			}, z.id)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-5 font-extrabold",
				children: tx(lang, "Yesterday's Numbers", "कल के नंबर")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-night-muted",
				children: board.yesterdayLabel
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 grid grid-cols-3 gap-2",
				children: board.yesterday.map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-night-3 p-2 text-center text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-night-muted",
						children: zoneLabel(z.name)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-extrabold",
						children: z.numbers.map((n) => n.number).join(", ") || "—"
					})]
				}, z.id))
			})
		]
	});
}
function ZonesScreen({ lang, focusZone, onBell }) {
	const office = useOffice();
	const [data, setData] = (0, import_react.useState)(null);
	const [open, setOpen] = (0, import_react.useState)(focusZone);
	const [msg, setMsg] = (0, import_react.useState)("");
	const [replaceFor, setReplaceFor] = (0, import_react.useState)(null);
	const [confirmDelete, setConfirmDelete] = (0, import_react.useState)(null);
	const [confirmOut, setConfirmOut] = (0, import_react.useState)(null);
	const [phoneSessions, setPhoneSessions] = (0, import_react.useState)([]);
	const [replaceName, setReplaceName] = (0, import_react.useState)("");
	const [replaceMobile, setReplaceMobile] = (0, import_react.useState)("");
	const [shownPass, setShownPass] = (0, import_react.useState)("");
	async function pull() {
		setData(await loadZones());
	}
	(0, import_react.useEffect)(() => {
		pull();
	}, []);
	(0, import_react.useEffect)(() => {
		if (focusZone) setOpen(focusZone);
	}, [focusZone]);
	if (!data?.ok) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "p-6",
		children: tx(lang, "Loading…", "लोड हो रहा है…")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Top, {
		title: tx(lang, "Zones", "ज़ोन"),
		sub: office.role === "subadmin" ? `Sub Admin · ${office.username} · ${istNow().dmy}` : `${data.zones.length} ${tx(lang, "zones", "ज़ोन")} · ${data.zones.reduce((s, z) => s + z.inspectors.length, 0)} ${tx(lang, "inspectors", "निरीक्षक")}`,
		onBell
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-4 pt-3",
		children: [
			office.zone === "none" ? null : office.zone === "view" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				disabled: true,
				className: "flex w-full items-center justify-center gap-2 rounded-2xl bg-night-3 py-3 font-extrabold text-slate-400",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4 text-amber-300" }),
					" ",
					tx(lang, "Add Zone", "ज़ोन जोड़ें")
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setOpen("new"),
				className: "g-login w-full rounded-2xl py-3 font-extrabold",
				children: ["+ ", tx(lang, "Add Zone", "ज़ोन जोड़ें")]
			}),
			data.zones.length === 0 && open !== "new" ? office.role === "subadmin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 flex items-center justify-center gap-2 rounded-2xl bg-night-2 px-3 py-4 text-sm text-night-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4 text-amber-300" }), " किसी भी zone की permission नहीं है"]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-night-muted",
				children: tx(lang, "No zones yet.", "अभी कोई ज़ोन नहीं।")
			}) : null,
			open === "new" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoneForm, {
				lang,
				initial: {
					name: "",
					wards: [],
					supervisorName: "",
					supervisorMobile: "",
					inspectors: []
				},
				onCancel: () => setOpen(null),
				onSave: async (payload) => {
					const res = await saveZoneFn({ data: payload });
					if (!res.ok) setMsg("error" in res && res.error === "english" ? tx(lang, "Inspector name needs 2 English letters for the daily password.", "पासवर्ड के लिए नाम में 2 अंग्रेज़ी अक्षर चाहिए।") : tx(lang, "Could not save. Check the code is unique.", "सेव नहीं हुआ। कोड दोहरा तो नहीं?"));
					else {
						setMsg("");
						setOpen(res.id);
						await pull();
					}
				}
			}) : null,
			msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-red-300",
				children: msg
			}) : null,
			data.zones.map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "mt-3 rounded-3xl bg-night-3 p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "flex w-full items-center justify-between text-left",
					onClick: () => setOpen(open === z.id ? null : z.id),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: zoneLabel(z.name) }),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-emerald-500/20 px-2 text-xs text-emerald-300",
							children: tx(lang, "Active", "सक्रिय")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-1 block text-xs text-night-muted",
							children: [
								z.wards.map((w) => `${tx(lang, "Ward", "वार्ड")} ${w}`).join(" & ") || tx(lang, "No ward", "वार्ड नहीं"),
								" · ",
								z.supervisorName || "—",
								" · ",
								z.inspectors.length
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0",
						children: zoneLv(office, z.id) === "view" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-[#2a2748] px-2 py-1 text-[11px] font-bold",
							children: "View only"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" })
					})]
				}), open === z.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3",
					children: [
						zoneLv(office, z.id) !== "edit" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: true,
							className: "mb-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-night-2 py-3 font-extrabold text-slate-400",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4 text-amber-300" }),
								" ",
								tx(lang, "Add LI", "नया LI जोड़ें")
							]
						}) : null,
						z.inspectors.map((ins) => {
							const li = zoneLv(office, z.id) === "edit";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2 rounded-2xl bg-night-2 p-3 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
											ins.code,
											" ",
											ins.name
										] }), li ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												setConfirmDelete(ins.id);
												setReplaceFor(null);
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4 text-amber-300" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-night-muted",
										children: [
											ins.mobile || "—",
											" · ",
											tx(lang, "Ward", "वार्ड"),
											" ",
											ins.wardNo ?? "—",
											" · ",
											ins.devices > 0 ? `${ins.devices} ${tx(lang, "devices", "डिवाइस")}` : tx(lang, "Logged out", "लॉगआउट")
										]
									}),
									li && ins.passwordToday ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-xs text-amber-200",
										children: [
											tx(lang, "Pass today", "आज का पासवर्ड"),
											": ",
											ins.passwordToday
										]
									}) : null,
									li ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 flex gap-2",
										children: [ins.devices > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "rounded-xl bg-night-3 px-3 py-1",
											onClick: () => {
												setConfirmOut(ins.id);
												setPhoneSessions([]);
												inspectorSessionsFn({ data: ins.id }).then((res) => {
													if (res.ok) setPhoneSessions(res.sessions);
												});
											},
											children: tx(lang, "Logout", "लॉगआउट")
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											disabled: true,
											className: "rounded-xl bg-night-3 px-3 py-1 opacity-40",
											children: tx(lang, "Logged out", "लॉग आउट")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "rounded-xl bg-night-3 px-3 py-1",
											onClick: () => {
												setReplaceFor(ins.id);
												setConfirmDelete(null);
												setConfirmOut(null);
												setReplaceName("");
												setReplaceMobile(ins.mobile);
												setShownPass("");
											},
											children: tx(lang, "Replace", "बदलें")
										})]
									}) : null,
									confirmOut === ins.id && ins.devices > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 rounded-xl border border-amber-300/40 bg-amber-500/10 p-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm",
												children: tx(lang, "Choose one phone. The others stay logged in.", "जिस फोन को चुनें सिर्फ़ वही लॉगआउट होगा। बाकी चलते रहेंगे।")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-2 space-y-2",
												children: phoneSessions.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													type: "button",
													className: "w-full rounded-xl bg-amber-500 px-3 py-2 text-left text-slate-900",
													onClick: () => {
														setConfirmOut(null);
														logoutInspectorFn({ data: {
															inspectorId: ins.id,
															sessionId: item.id
														} }).then(pull);
													},
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "block font-bold",
														children: item.phoneCode ? `${tx(lang, "Phone", "फोन")} ${item.phoneCode}` : tx(lang, "No phone code", "फोन कोड नहीं")
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "block text-xs font-semibold",
														children: [
															tx(lang, "Last seen", "आखिरी बार"),
															" ",
															item.lastSeen
														]
													})]
												}, item.id))
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												className: "mt-2 w-full rounded-xl border border-night-line py-2",
												onClick: () => setConfirmOut(null),
												children: tx(lang, "Cancel", "रद्द")
											})
										]
									}) : null,
									confirmDelete === ins.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 rounded-xl border border-red-400/50 bg-red-500/10 p-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm leading-relaxed text-red-100",
												children: tx(lang, "Deleting this inspector will erase every entry they submitted. Prefer Replace, so the reports stay.", "इस निरीक्षक को डिलीट करने से उसके द्वारा की गई सारी एंट्रीज़ मिट जाएँगी। कृपया डिलीट न करके बदलें (Replace) करें।")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												className: "mt-2 w-full rounded-xl bg-accent py-2 font-bold",
												onClick: () => {
													setConfirmDelete(null);
													setReplaceFor(ins.id);
													setReplaceName("");
													setReplaceMobile(ins.mobile);
													setShownPass("");
												},
												children: tx(lang, "Replace instead", "बदलें — यही बेहतर है")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-2 grid grid-cols-2 gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													className: "rounded-xl border border-night-line py-2",
													onClick: () => setConfirmDelete(null),
													children: tx(lang, "Cancel", "रद्द")
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													className: "rounded-xl bg-red-600 py-2 font-bold",
													onClick: () => {
														setConfirmDelete(null);
														deleteInspectorFn({ data: ins.id }).then(pull);
													},
													children: tx(lang, "Confirm delete", "डिलीट पक्का करें")
												})]
											})
										]
									}) : null,
									replaceFor === ins.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 grid gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: replaceName,
												onChange: (e) => setReplaceName(e.target.value),
												placeholder: tx(lang, "New name (English letters)", "नया नाम (अंग्रेज़ी)"),
												className: "rounded-xl bg-night px-3 py-2"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: replaceMobile,
												onChange: (e) => setReplaceMobile(e.target.value),
												placeholder: tx(lang, "Mobile", "मोबाइल"),
												className: "rounded-xl bg-night px-3 py-2"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												className: "rounded-xl bg-accent py-2 font-bold",
												onClick: () => void replaceInspectorFn({ data: {
													inspectorId: ins.id,
													name: replaceName,
													mobile: replaceMobile
												} }).then((res) => {
													if (res.ok) {
														setShownPass(res.password);
														setReplaceFor(null);
														pull();
													}
												}),
												children: tx(lang, "Save replacement", "बदलाव सेव करें")
											})
										]
									}) : null
								]
							}, ins.id);
						}),
						shownPass ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mb-2 rounded-xl bg-amber-500/15 px-3 py-2 text-sm text-amber-100",
							children: [
								tx(lang, "New password", "नया पासवर्ड"),
								": ",
								shownPass
							]
						}) : null,
						office.zone === "edit" || zoneLv(office, z.id) === "edit" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoneForm, {
							lang,
							lockMeta: office.zone !== "edit",
							lockPeople: zoneLv(office, z.id) !== "edit",
							initial: {
								id: z.id,
								name: z.name,
								wards: z.wards,
								supervisorName: z.supervisorName,
								supervisorMobile: z.supervisorMobile,
								inspectors: z.inspectors.map((i) => ({
									id: i.id,
									code: i.code,
									name: i.name,
									mobile: i.mobile,
									wardNo: i.wardNo
								}))
							},
							onCancel: () => setOpen(null),
							onSave: async (payload) => {
								if (!(await saveZoneFn({ data: payload })).ok) setMsg(tx(lang, "Could not save zone.", "ज़ोन सेव नहीं हुआ।"));
								else {
									setMsg("");
									await pull();
								}
							}
						}) : null
					]
				}) : null]
			}, z.id)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Councillors, {
				lang,
				rows: data.councillors,
				onSaved: () => void pull()
			})
		]
	})] });
}
function ZoneForm({ lang, initial, onSave, onCancel, lockMeta = false, lockPeople = false }) {
	const [name, setName] = (0, import_react.useState)(initial.name);
	const [wardText, setWardText] = (0, import_react.useState)("");
	const [wards, setWards] = (0, import_react.useState)(initial.wards);
	const [supervisorName, setSupervisorName] = (0, import_react.useState)(initial.supervisorName);
	const [supervisorMobile, setSupervisorMobile] = (0, import_react.useState)(initial.supervisorMobile);
	const [inspectors, setInspectors] = (0, import_react.useState)(initial.inspectors);
	const [dropId, setDropId] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	function addWard() {
		const n = Number(wardText);
		if (Number.isInteger(n) && n > 0 && !wards.includes(n)) setWards([...wards, n]);
		setWardText("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3 grid gap-2 rounded-2xl border border-night-line p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: tx(lang, "Zone Name", "ज़ोन का नाम"),
				value: name,
				onChange: setName,
				disabled: lockMeta
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "text-xs text-night-muted",
				children: tx(lang, "Wards", "वार्ड")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: wards.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					disabled: lockMeta,
					onClick: () => {
						if (!lockMeta) setWards(wards.filter((x) => x !== w));
					},
					className: "rounded-full bg-accent/30 px-3 py-1 text-sm disabled:opacity-60",
					children: [
						tx(lang, "Ward", "वार्ड"),
						" ",
						w,
						lockMeta ? "" : " ×"
					]
				}, w))
			}),
			lockMeta ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: wardText,
					onChange: (e) => setWardText(e.target.value.replace(/\D/g, "")),
					placeholder: tx(lang, "Ward no.", "वार्ड नं."),
					className: "flex-1 rounded-xl bg-night px-3 py-2"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: addWard,
					className: "rounded-xl bg-night-2 px-3",
					children: tx(lang, "Add ward", "वार्ड जोड़ें")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: tx(lang, "Supervisor Name", "सुपरवाइज़र"),
				value: supervisorName,
				onChange: setSupervisorName,
				disabled: lockMeta
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: tx(lang, "Supervisor Mobile", "मोबाइल"),
				value: supervisorMobile,
				onChange: setSupervisorMobile,
				disabled: lockMeta
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
					className: "text-sm",
					children: tx(lang, "Inspectors", "निरीक्षक")
				}), lockPeople ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1 text-sm text-slate-400",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-3.5 w-3.5 text-amber-300" }),
						" ",
						tx(lang, "Add LI", "नया LI जोड़ें")
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "text-sm font-bold text-accent",
					onClick: () => setInspectors([...inspectors, {
						code: "",
						name: "",
						mobile: "",
						wardNo: wards[0] ?? null
					}]),
					children: ["+ ", tx(lang, "Add LI", "नया LI जोड़ें")]
				})]
			}),
			inspectors.map((ins, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2 rounded-xl bg-night p-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						disabled: lockPeople,
						value: ins.code,
						onChange: (e) => update(index, { code: e.target.value.toUpperCase() }),
						placeholder: tx(lang, "Code", "कोड"),
						className: "rounded-lg bg-night-2 px-2 py-2 disabled:opacity-60"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						disabled: lockPeople,
						value: ins.name,
						onChange: (e) => update(index, { name: e.target.value }),
						placeholder: tx(lang, "Name", "नाम"),
						className: "rounded-lg bg-night-2 px-2 py-2 disabled:opacity-60"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						disabled: lockPeople,
						value: ins.mobile,
						onChange: (e) => update(index, { mobile: e.target.value }),
						placeholder: tx(lang, "Mobile", "मोबाइल"),
						className: "rounded-lg bg-night-2 px-2 py-2 disabled:opacity-60"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						disabled: lockPeople,
						value: ins.wardNo ?? "",
						onChange: (e) => update(index, { wardNo: e.target.value ? Number(e.target.value) : null }),
						className: "rounded-lg bg-night-2 px-2 py-2 disabled:opacity-60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: tx(lang, "Ward", "वार्ड")
						}), wards.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: w,
							children: w
						}, w))]
					}),
					lockPeople ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "col-span-2 text-left text-xs text-red-300",
						onClick: () => {
							if (ins.id) setDropId(ins.id);
							else setInspectors(inspectors.filter((_, i) => i !== index));
						},
						children: tx(lang, "Remove row", "हटाएँ")
					}),
					dropId === ins.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "col-span-2 rounded-xl border border-red-400/50 bg-red-500/10 p-3 text-sm text-red-100",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: tx(lang, "Removing this inspector and saving the zone will erase every entry they submitted. Prefer Replace on the inspector card.", "इसे हटाकर ज़ोन सेव करने से इसकी सारी एंट्रीज़ मिट जाएँगी। बेहतर है कार्ड पर बदलें (Replace) करें।") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 grid grid-cols-2 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "rounded-xl border border-night-line py-2 text-white",
								onClick: () => setDropId(null),
								children: tx(lang, "Cancel", "रद्द")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "rounded-xl bg-red-600 py-2 font-bold text-white",
								onClick: () => {
									setInspectors(inspectors.filter((row) => row.id !== ins.id));
									setDropId(null);
								},
								children: tx(lang, "Confirm delete", "डिलीट पक्का करें")
							})]
						})]
					}) : null
				]
			}, index)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onCancel,
					className: "flex-1 rounded-xl border border-night-line py-2",
					children: tx(lang, "Cancel", "रद्द")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: busy,
					className: "g-login flex-1 rounded-xl py-2 font-bold",
					onClick: () => {
						setBusy(true);
						onSave({
							id: initial.id,
							name,
							wards,
							supervisorName,
							supervisorMobile,
							inspectors
						}).finally(() => setBusy(false));
					},
					children: tx(lang, "Save Zone", "ज़ोन सेव")
				})]
			})
		]
	});
	function update(index, patch) {
		setInspectors(inspectors.map((row, i) => i === index ? {
			...row,
			...patch
		} : row));
	}
}
function Field({ label, value, onChange, disabled }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block text-xs text-night-muted",
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			disabled,
			value,
			onChange: (e) => onChange(e.target.value),
			className: "mt-1 w-full rounded-xl bg-night px-3 py-2 text-base text-night-fg disabled:opacity-60"
		})]
	});
}
function Councillors({ lang, rows, onSaved }) {
	const office = useOffice();
	const [wardNo, setWardNo] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [photo, setPhoto] = (0, import_react.useState)(null);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [editName, setEditName] = (0, import_react.useState)("");
	const [editPhoto, setEditPhoto] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mt-6 mb-4",
		children: office.councillor === "none" ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "flex items-center gap-2 text-lg font-extrabold",
				children: [
					tx(lang, "Ward Councillors", "वार्ड पार्षद"),
					" ",
					office.councillor === "view" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-[#2a2748] px-2 py-0.5 text-[11px] font-bold",
						children: "View only"
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-night-muted",
				children: tx(lang, "Inspectors see their own ward councillor's photo and name.", "निरीक्षक को अपने वार्ड के पार्षद का फोटो और नाम दिखेगा।")
			}),
			rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-night-muted",
				children: tx(lang, "No councillors yet.", "अभी कोई पार्षद नहीं।")
			}) : null,
			rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex items-center gap-3 rounded-2xl bg-night-3 p-3",
				children: [
					row.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: row.photo,
						alt: "",
						className: "h-12 w-12 rounded-full object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid h-12 w-12 place-items-center rounded-full bg-night text-xs",
						children: ["Ward ", row.wardNo]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-night-muted",
							children: [
								tx(lang, "Ward", "वार्ड"),
								" ",
								row.wardNo
							]
						}), editing === row.wardNo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: editName,
							onChange: (e) => setEditName(e.target.value),
							className: "w-full rounded-lg bg-night px-2 py-1"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: row.name || tx(lang, "Councillor name", "पार्षद का नाम") })]
					}),
					office.councillor === "edit" && editing === row.wardNo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "rounded-xl bg-accent px-3 py-1 text-sm font-bold",
						onClick: () => void saveCouncillorFn({ data: {
							wardNo: row.wardNo,
							name: editName,
							photo: editPhoto
						} }).then(() => {
							setEditing(null);
							onSaved();
						}),
						children: tx(lang, "Save", "सेव")
					}) : office.councillor === "edit" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setEditing(row.wardNo);
							setEditName(row.name);
							setEditPhoto(null);
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" })
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4 text-amber-300" }),
					editing === row.wardNo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-xs text-accent",
						children: [tx(lang, "Photo", "फोटो"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							accept: "image/*",
							className: "hidden",
							onChange: (e) => {
								const file = e.target.files?.[0];
								if (file) circlePhoto(file).then(setEditPhoto);
							}
						})]
					}) : null
				]
			}, row.wardNo)),
			office.councillor === "edit" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid gap-2 rounded-2xl border border-dashed border-night-line p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: wardNo,
							onChange: (e) => setWardNo(e.target.value.replace(/\D/g, "")),
							placeholder: tx(lang, "Ward no.", "वार्ड नं."),
							className: "w-24 rounded-xl bg-night px-3 py-2"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: name,
							onChange: (e) => setName(e.target.value),
							placeholder: tx(lang, "Councillor name", "पार्षद का नाम"),
							className: "flex-1 rounded-xl bg-night px-3 py-2"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm text-accent",
						children: [tx(lang, "Upload photo", "फोटो अपलोड"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							accept: "image/*",
							className: "hidden",
							onChange: (e) => {
								const file = e.target.files?.[0];
								if (file) circlePhoto(file).then(setPhoto);
							}
						})]
					}),
					photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: photo,
						alt: "",
						className: "h-12 w-12 rounded-full object-cover"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "rounded-xl bg-accent py-2 font-bold",
						onClick: () => void saveCouncillorFn({ data: {
							wardNo: Number(wardNo),
							name,
							photo
						} }).then((res) => {
							if (res.ok) {
								setWardNo("");
								setName("");
								setPhoto(null);
								onSaved();
							}
						}),
						children: tx(lang, "Save councillor", "पार्षद सेव")
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				disabled: true,
				className: "mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-night-3 py-3 font-bold text-slate-400",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4 text-amber-300" }),
					" + ",
					tx(lang, "Add councillor", "पार्षद जोड़ें")
				]
			})
		] })
	});
}
function ReportsScreen({ lang, onInspectors, onBell }) {
	const office = useOffice();
	const today = istNow().iso;
	const [mode, setMode] = (0, import_react.useState)("live");
	const [range, setRange] = (0, import_react.useState)("month");
	const [from, setFrom] = (0, import_react.useState)(monthStart(today));
	const [to, setTo] = (0, import_react.useState)(today);
	const [zoneId, setZoneId] = (0, import_react.useState)(null);
	const [ward, setWard] = (0, import_react.useState)(null);
	const [meta, setMeta] = (0, import_react.useState)({
		zones: [],
		wards: []
	});
	const [table, setTable] = (0, import_react.useState)(null);
	const [live, setLive] = (0, import_react.useState)(null);
	const [liveDate, setLiveDate] = (0, import_react.useState)(today);
	const span = (0, import_react.useMemo)(() => {
		if (range === "week") return {
			from: weekStart(today),
			to: today
		};
		if (range === "month") return {
			from: monthStart(today),
			to: today
		};
		return {
			from,
			to
		};
	}, [
		range,
		from,
		to,
		today
	]);
	(0, import_react.useEffect)(() => {
		loadMeta().then((res) => {
			if (res.ok) setMeta({
				zones: res.zones,
				wards: res.wards
			});
		});
	}, []);
	(0, import_react.useEffect)(() => {
		loadReport({ data: {
			...span,
			ward,
			zoneId
		} }).then(setTable);
	}, [
		span,
		ward,
		zoneId
	]);
	(0, import_react.useEffect)(() => {
		if (mode !== "live") return;
		const pull = () => void loadLive({ data: {
			date: liveDate,
			zoneId
		} }).then(setLive);
		pull();
		const id = setInterval(pull, 4e3);
		return () => clearInterval(id);
	}, [
		mode,
		liveDate,
		zoneId
	]);
	function exportRows() {
		if (!table?.ok) return [];
		return table.table.map((r) => [
			r.date,
			r.ward,
			zoneLabel(r.zone),
			String(r.inspectors),
			String(r.numbers),
			`${r.jhadu}%`,
			`${r.nali}%`,
			`${r.kooda}%`,
			score2(r.score)
		]);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Top, {
			title: tx(lang, "Reports", "रिपोर्ट"),
			sub: office.role === "subadmin" ? `Sub Admin · ${office.username} · ${dmy(today)}` : `${tx(lang, "Admin · Councillor", "एडमिन · पार्षद")} · ${dmy(today)}`,
			onBell
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-4 mt-3 grid grid-cols-2 gap-2 rounded-2xl bg-night-3 p-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setMode("live"),
				className: `rounded-xl py-2 font-bold ${mode === "live" ? "g-live text-white" : ""}`,
				children: tx(lang, "Live", "लाइव")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setMode("reports"),
				className: `rounded-xl py-2 font-bold ${mode === "reports" ? "bg-accent text-white" : ""}`,
				children: tx(lang, "Reports", "रिपोर्ट")
			})]
		}),
		mode === "live" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-4 pt-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateField, {
						value: liveDate,
						onChange: setLiveDate
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: zoneId ?? "",
						onChange: (e) => setZoneId(e.target.value ? Number(e.target.value) : null),
						className: "flex-1 rounded-xl bg-night-3 px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: office.role === "subadmin" ? "My Zones" : tx(lang, "All Zones", "सभी ज़ोन")
						}), meta.zones.map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: z.id,
							children: zoneLabel(z.name)
						}, z.id))]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "g-pink rounded-2xl p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
							className: "text-2xl",
							children: live?.ok ? live.entries : 0
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm",
							children: tx(lang, "Today's entries", "आज की एंट्री")
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-emerald-600 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
							className: "text-2xl",
							children: live?.ok ? `${live.zonesDone}/${live.zoneTotal}` : "0/0"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm",
							children: tx(lang, "Zones done", "ज़ोन पूरे")
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-xs text-red-300",
					children: ["LIVE · ", tx(lang, "Updates automatically · newest first", "अपने आप अपडेट · नया पहले")]
				}),
				live?.ok && live.feed.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-night-muted",
					children: tx(lang, "No entries yet.", "अभी कोई एंट्री नहीं।")
				}) : null,
				live?.ok ? live.feed.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "mt-2 rounded-2xl border border-night-line bg-night-3 p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
								item.time,
								" · ",
								zoneLabel(item.zone ?? ""),
								item.wardNo ? ` · Ward ${item.wardNo}` : ""
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `rounded-full px-2 text-xs ${item.status === "editable" ? "bg-amber-500/20 text-amber-200" : "bg-emerald-500/20 text-emerald-200"}`,
								children: item.status === "editable" ? `Editable ${Math.ceil(item.leftMs / 1e3)}s` : "Final"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm",
							children: [
								item.code,
								" ",
								item.name,
								" · No. ",
								item.number,
								" · ",
								item.score,
								"★"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-night-muted",
							children: [
								item.jhadu ? "Jhadu" : "",
								item.nali ? "Nali" : "",
								item.kooda ? "Kooda Uthan" : ""
							].filter(Boolean).join(" · ")
						})
					]
				}, item.id)) : null
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-4 pt-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: ward ?? "",
						onChange: (e) => setWard(e.target.value ? Number(e.target.value) : null),
						className: "rounded-xl bg-night-3 px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: tx(lang, "All wards", "सभी वार्ड")
						}), meta.wards.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: w,
							children: [
								tx(lang, "Ward", "वार्ड"),
								" ",
								w
							]
						}, w))]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: zoneId ?? "",
						onChange: (e) => setZoneId(e.target.value ? Number(e.target.value) : null),
						className: "rounded-xl bg-night-3 px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: office.role === "subadmin" ? "My Zones" : tx(lang, "All zones", "सभी ज़ोन")
						}), meta.zones.map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: z.id,
							children: zoneLabel(z.name)
						}, z.id))]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: onInspectors,
					className: "mt-3 w-full rounded-2xl bg-night-3 py-3 font-bold text-accent",
					children: [tx(lang, "See Inspector-wise Report", "निरीक्षक की रिपोर्ट देखें"), " →"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniBtn, {
							on: range === "week",
							onClick: () => setRange("week"),
							children: tx(lang, "This Week", "इस हफ़्ते")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniBtn, {
							on: range === "month",
							onClick: () => setRange("month"),
							children: tx(lang, "This Month", "इस महीने")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniBtn, {
							on: range === "custom",
							onClick: () => setRange("custom"),
							children: tx(lang, "Custom", "तारीख")
						})
					]
				}),
				range === "custom" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateField, {
						value: from,
						onChange: setFrom
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateField, {
						value: to,
						onChange: setTo
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid grid-cols-3 gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "g-pink rounded-2xl p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
								className: "text-2xl",
								children: table?.ok ? table.total : 0
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs",
								children: tx(lang, "Reports", "रिपोर्ट")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "g-orange rounded-2xl p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
								className: "text-2xl",
								children: table?.ok ? score2(table.avg) : "—"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs",
								children: tx(lang, "Avg Score", "औसत")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "g-teal rounded-2xl p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
								className: "text-2xl",
								children: table?.ok ? table.inspectors : 0
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs",
								children: tx(lang, "Inspectors", "निरीक्षक")
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-[11px] text-night-muted",
					children: tx(lang, "Work % = inspectors who ticked that work ÷ zone's total inspectors. ≥80% green, 60–79% yellow, below 60% red.", "काम % = जिन्होंने वह काम चुना ÷ ज़ोन के कुल निरीक्षक। 80%+ हरा, 60–79% पीला, कम लाल।")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 max-h-[22rem] overflow-y-auto rounded-2xl border border-white/10 bg-night-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full table-fixed text-[11px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "sticky top-0 bg-night-3 text-night-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "w-[14%] px-1 py-2 text-left font-medium",
									children: "Date"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "w-[16%] text-left font-medium",
									children: "Zone"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "w-[20%] text-left font-medium",
									children: "No."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "w-[13%] text-center font-medium",
									children: "Jhadu"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "w-[12%] text-center font-medium",
									children: "Nali"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "w-[12%] text-center font-medium",
									children: "Kuda"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "w-[13%] pr-1 text-right font-medium",
									children: "Score"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [table?.ok && table.table.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 7,
							className: "px-2 py-6 text-center text-night-muted",
							children: tx(lang, "No reports in this range.", "इस अवधि में रिपोर्ट नहीं।")
						}) }) : null, table?.ok ? table.table.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-white/10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-1 py-2",
									children: r.date.slice(0, 5)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "truncate",
									children: [
										zoneLabel(r.zone),
										" (",
										r.inspectors,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "truncate font-bold",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumCell, { value: r.numbers })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: `text-center font-bold ${workClass(r.jhadu)}`,
									children: [r.jhadu, "%"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: `text-center font-bold ${workClass(r.nali)}`,
									children: [r.nali, "%"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: `text-center font-bold ${workClass(r.kooda)}`,
									children: [r.kooda, "%"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "pr-1 text-right font-bold text-amber-300",
									children: [score2(r.score), "★"]
								})
							]
						}, `${r.iso}-${r.zoneId}`)) : null] })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-center text-xs text-night-muted",
					children: tx(lang, "Last 60 days data shown", "पिछले 60 दिन का डेटा")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "rounded-2xl bg-accent py-3 font-bold",
						onClick: () => downloadPdf("safai-report.pdf", "Zone Report", [
							"Date",
							"Ward",
							"Zone",
							"Inspectors",
							"No.",
							"Jhadu",
							"Nali",
							"Kuda",
							"Score"
						], exportRows()),
						children: tx(lang, "Download PDF", "PDF")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "rounded-2xl bg-night-3 py-3 font-bold",
						onClick: () => printTable("Zone Report", [
							"Date",
							"Ward",
							"Zone",
							"Inspectors",
							"No.",
							"Jhadu",
							"Nali",
							"Kuda",
							"Score"
						], exportRows()),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "mr-1 inline h-4 w-4" }), tx(lang, "Print", "प्रिंट")]
					})]
				})
			]
		})
	] });
}
function NumCell({ value }) {
	const parts = value.split(", ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: parts.map((part, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: part === "A" ? "font-extrabold text-amber-300" : "",
		children: [index ? ", " : "", part]
	}, `${part}-${index}`)) });
}
function MiniBtn({ on, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: `rounded-full px-3 py-1.5 text-sm font-bold ${on ? "bg-accent text-white" : "bg-night-3"}`,
		children
	});
}
function InspectorReport({ lang, onBack }) {
	const office = useOffice();
	const today = istNow().iso;
	const [range, setRange] = (0, import_react.useState)("month");
	const [from, setFrom] = (0, import_react.useState)(monthStart(today));
	const [to, setTo] = (0, import_react.useState)(today);
	const [zoneId, setZoneId] = (0, import_react.useState)(null);
	const [inspectorId, setInspectorId] = (0, import_react.useState)(null);
	const [meta, setMeta] = (0, import_react.useState)([]);
	const [data, setData] = (0, import_react.useState)(null);
	const [absentOpen, setAbsentOpen] = (0, import_react.useState)(false);
	const [absDate, setAbsDate] = (0, import_react.useState)(today);
	const [absWork, setAbsWork] = (0, import_react.useState)({
		jhadu: false,
		nali: false,
		kooda: false
	});
	const [absScore, setAbsScore] = (0, import_react.useState)(1);
	const [absNote, setAbsNote] = (0, import_react.useState)("");
	const span = range === "week" ? {
		from: weekStart(today),
		to: today
	} : range === "month" ? {
		from: monthStart(today),
		to: today
	} : {
		from,
		to
	};
	(0, import_react.useEffect)(() => {
		loadMeta().then((res) => {
			if (res.ok) setMeta(res.zones);
		});
	}, []);
	(0, import_react.useEffect)(() => {
		loadInspectorReport({ data: {
			...span,
			zoneId,
			inspectorId
		} }).then(setData);
	}, [
		span.from,
		span.to,
		zoneId,
		inspectorId
	]);
	const all = inspectorId == null;
	const pdfRows = data?.ok ? data.rows.map((r) => [
		r.date,
		String(r.ward),
		r.zone,
		r.code,
		r.name,
		r.absent ? "A" : String(r.number),
		r.jhadu ? "●" : "○",
		r.nali ? "●" : "○",
		r.kooda ? "●" : "○",
		String(r.score)
	]) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-4 pt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onBack,
				className: "text-sm font-bold text-accent",
				children: ["← ", tx(lang, "Reports", "रिपोर्ट")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-2xl font-extrabold",
				children: tx(lang, "Inspector Report", "निरीक्षक रिपोर्ट")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: zoneId ?? "",
					onChange: (e) => {
						setZoneId(e.target.value ? Number(e.target.value) : null);
						setInspectorId(null);
					},
					className: "rounded-xl bg-night-3 px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: office.role === "subadmin" ? "My Zones" : tx(lang, "All zones", "सभी ज़ोन")
					}), meta.map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: z.id,
						children: zoneLabel(z.name)
					}, z.id))]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: inspectorId ?? "",
					onChange: (e) => setInspectorId(e.target.value ? Number(e.target.value) : null),
					className: "rounded-xl bg-night-3 px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: tx(lang, "All inspectors", "सभी निरीक्षक")
					}), data?.ok ? data.inspectors.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: p.id,
						children: [
							p.code,
							" · ",
							p.name
						]
					}, p.id)) : null]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniBtn, {
						on: range === "week",
						onClick: () => setRange("week"),
						children: tx(lang, "This Week", "इस हफ़्ते")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniBtn, {
						on: range === "month",
						onClick: () => setRange("month"),
						children: tx(lang, "This Month", "इस महीने")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniBtn, {
						on: range === "custom",
						onClick: () => setRange("custom"),
						children: tx(lang, "Custom", "तारीख")
					})
				]
			}),
			range === "custom" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateField, {
					value: from,
					onChange: setFrom
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateField, {
					value: to,
					onChange: setTo
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-indigo-600 p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
						className: "text-3xl",
						children: data?.ok ? data.total : 0
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: tx(lang, "Total Reports", "कुल रिपोर्ट") })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "g-orange rounded-2xl p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
						className: "text-3xl",
						children: data?.ok ? score2(data.avg) : "—"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: tx(lang, "Avg Score", "औसत") })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 max-h-[22rem] overflow-y-auto rounded-2xl border border-white/10 bg-night-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full table-fixed text-[11px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "sticky top-0 bg-night-3 text-night-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "w-[16%] px-1 py-2 text-left font-medium",
								children: "Date"
							}),
							all ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "w-[14%] text-left font-medium",
								children: "Code"
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-left font-medium",
								children: "No."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "w-[14%] text-center font-medium",
								children: "Jhadu"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "w-[14%] text-center font-medium",
								children: "Nali"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "w-[14%] text-center font-medium",
								children: "Kuda"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "w-[14%] pr-1 text-right font-medium",
								children: "Score"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [data?.ok && data.rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 7,
						className: "px-2 py-6 text-center text-night-muted",
						children: tx(lang, "No rows.", "कोई पंक्ति नहीं।")
					}) }) : null, data?.ok ? data.rows.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-white/10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-1 py-2",
								children: r.date.slice(0, 5)
							}),
							all ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "truncate font-bold",
								children: r.code
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: `truncate font-bold ${r.absent ? "text-amber-300" : ""}`,
								children: r.absent ? "A" : r.number
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "text-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: r.jhadu ? "text-emerald-400" : "text-slate-500",
									children: r.jhadu ? "●" : "○"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "text-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: r.nali ? "text-emerald-400" : "text-slate-500",
									children: r.nali ? "●" : "○"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "text-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: r.kooda ? "text-emerald-400" : "text-slate-500",
									children: r.kooda ? "●" : "○"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "pr-1 text-right font-bold text-amber-300",
								children: [r.score, "★"]
							})
						]
					}, i)) : null] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-center text-xs text-night-muted",
				children: tx(lang, "Last 60 days data shown. All inspectors: newest date, then code A9, A10, A11…", "पिछले 60 दिन। सभी निरीक्षक: नई तारीख पहले, फिर कोड।")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "rounded-2xl bg-accent py-3 font-bold",
					onClick: () => downloadPdf("inspector-report.pdf", "Inspector Report", [
						"Date",
						"Ward",
						"Zone",
						"Code",
						"Name",
						"No.",
						"Jhadu",
						"Nali",
						"Kuda",
						"Score"
					], pdfRows),
					children: tx(lang, "Download PDF", "PDF")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "rounded-2xl bg-night-3 py-3 font-bold",
					onClick: () => printTable("Inspector Report", [
						"Date",
						"Ward",
						"Zone",
						"Code",
						"Name",
						"No.",
						"Jhadu",
						"Nali",
						"Kuda",
						"Score"
					], pdfRows),
					children: tx(lang, "Print", "प्रिंट")
				})]
			}),
			inspectorId != null && (office.role === "admin" || zoneLv(office, (data?.ok ? data.inspectors.find((p) => p.id === inspectorId)?.zoneId : null) ?? -1) === "edit") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => {
					setAbsentOpen(true);
					setAbsDate(today);
					setAbsNote("");
				},
				className: "mt-3 w-full rounded-2xl bg-amber-400 py-3 font-extrabold text-slate-900",
				children: tx(lang, "Mark LI unavailable", "LI अनुपस्थित करें")
			}) : null,
			absentOpen && inspectorId != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-40 flex items-end justify-center bg-black/50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-[430px] rounded-t-3xl bg-night-2 p-4 pb-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-extrabold",
							children: tx(lang, "Mark LI unavailable", "LI अनुपस्थित करें")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mt-3 block text-sm text-night-muted",
							children: tx(lang, "Date", "तारीख")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateField, {
							value: absDate,
							onChange: setAbsDate,
							className: "mt-1"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-night-muted",
							children: tx(lang, "Cleaning type", "सफाई प्रकार")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 grid grid-cols-3 gap-2",
							children: [
								[
									"jhadu",
									"Jhadu",
									"झाड़ू"
								],
								[
									"nali",
									"Nali",
									"नाली"
								],
								[
									"kooda",
									"Kuda",
									"कूड़ा"
								]
							].map(([key, en, hi]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setAbsWork({
									...absWork,
									[key]: !absWork[key]
								}),
								className: `rounded-xl border py-2 text-sm font-bold ${absWork[key] ? "border-amber-300 bg-amber-400/20 text-amber-200" : "border-night-line"}`,
								children: tx(lang, en, hi)
							}, key))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-night-muted",
							children: tx(lang, "Score", "सफाई अंक")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex justify-between",
							children: [
								1,
								2,
								3,
								4,
								5
							].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setAbsScore(n),
								className: `grid h-10 w-10 place-items-center rounded-full border font-extrabold ${absScore === n ? "border-amber-300 bg-amber-400 text-slate-900" : "border-night-line"}`,
								children: n
							}, n))
						}),
						absNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-red-300",
							children: absNote
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-4 w-full rounded-2xl bg-amber-400 py-3 font-extrabold text-slate-900",
							onClick: () => {
								markAbsentFn({ data: {
									inspectorId,
									date: absDate,
									...absWork,
									score: absScore
								} }).then((res) => {
									if (!res.ok) {
										setAbsNote(tx(lang, "Could not save. Pick a type.", "सेव नहीं हुआ। प्रकार चुनें।"));
										return;
									}
									setAbsentOpen(false);
									setAbsWork({
										jhadu: false,
										nali: false,
										kooda: false
									});
									loadInspectorReport({ data: {
										...span,
										zoneId,
										inspectorId
									} }).then(setData);
								});
							},
							children: tx(lang, "Mark absentee", "अनुपस्थित दर्ज करें")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-2 w-full rounded-2xl border border-night-line py-2",
							onClick: () => setAbsentOpen(false),
							children: tx(lang, "Cancel", "रद्द")
						})
					]
				})
			}) : null
		]
	});
}
function StaffScreen({ lang, onBell }) {
	const office = useOffice();
	const [date, setDate] = (0, import_react.useState)(istNow().iso);
	const [data, setData] = (0, import_react.useState)(null);
	const [draft, setDraft] = (0, import_react.useState)({});
	const [q, setQ] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [mobile, setMobile] = (0, import_react.useState)("");
	const [role, setRole] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [view, setView] = (0, import_react.useState)(false);
	const [confirmStaff, setConfirmStaff] = (0, import_react.useState)(null);
	async function pull(next = date) {
		const res = await loadStaffDay({ data: { date: next } });
		setData(res);
		if (!res.ok) return;
		const rows = {};
		for (const person of res.staff) rows[person.id] = {
			present: person.present !== false,
			zoneId: person.zoneId
		};
		setDraft(rows);
	}
	(0, import_react.useEffect)(() => {
		pull(date);
	}, [date]);
	if (view) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttendanceView, {
		lang,
		onBack: () => setView(false),
		onEdit: (iso) => {
			setDate(iso);
			setView(false);
		}
	});
	if (!data?.ok) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "p-6",
		children: tx(lang, "Loading…", "लोड हो रहा है…")
	});
	const list = data.staff.filter((s) => `${s.name} ${s.mobile} ${s.role}`.toLowerCase().includes(q.toLowerCase()));
	const presentCount = list.filter((s) => draft[s.id]?.present !== false).length;
	const absentCount = list.length - presentCount;
	const attEdit = office.attendance === "edit";
	const staffEdit = office.staff === "edit";
	async function submit() {
		setBusy(true);
		setNote("");
		const rows = data && data.ok ? data.staff.map((s) => ({
			id: s.id,
			present: draft[s.id]?.present !== false,
			zoneId: draft[s.id]?.zoneId ?? null
		})) : [];
		const res = await saveStaffDay({ data: {
			date,
			rows
		} });
		setBusy(false);
		setNote(res.ok ? tx(lang, "Attendance saved.", "हाजिरी सेव हो गई।") : tx(lang, "Could not save.", "सेव नहीं हुई।"));
		if (res.ok) pull(date);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Top, {
			title: tx(lang, "Staff", "स्टाफ"),
			sub: `${tx(lang, "Date-wise attendance", "तारीख के हिसाब से हाजिरी")} · ${data.dateLabel}${office.role === "subadmin" ? ` · Sub Admin · ${office.username}` : ""}`,
			onBell
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-3 gap-2 px-4 pt-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-indigo-600 p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
						className: "text-2xl",
						children: data.total
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs",
						children: tx(lang, "Total", "कुल")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-emerald-600 p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
						className: "text-2xl",
						children: presentCount
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs",
						children: tx(lang, "Present", "हाज़िर")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-red-600 p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
						className: "text-2xl",
						children: absentCount
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs",
						children: tx(lang, "Absent", "अनुपस्थित")
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-4 pb-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid gap-2 rounded-2xl bg-night-3 p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: tx(lang, "Add Staff", "स्टाफ जोड़ें") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							disabled: !staffEdit,
							value: name,
							onChange: (e) => setName(e.target.value),
							placeholder: tx(lang, "Name", "नाम"),
							className: "rounded-xl bg-night px-3 py-2 disabled:opacity-50"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							disabled: !staffEdit,
							value: mobile,
							onChange: (e) => setMobile(e.target.value),
							placeholder: tx(lang, "Mobile", "मोबाइल"),
							className: "rounded-xl bg-night px-3 py-2 disabled:opacity-50"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							disabled: !staffEdit,
							value: role,
							onChange: (e) => setRole(e.target.value),
							placeholder: tx(lang, "Role", "काम"),
							className: "rounded-xl bg-night px-3 py-2 disabled:opacity-50"
						}),
						staffEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "rounded-xl bg-accent py-2 font-bold",
							onClick: () => void addStaffFn({ data: {
								name,
								mobile,
								role
							} }).then(() => {
								setName("");
								setMobile("");
								setRole("");
								pull(date);
							}),
							children: tx(lang, "Save", "सेव")
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: true,
							className: "inline-flex items-center justify-center gap-2 rounded-xl bg-night py-2 font-bold text-slate-400",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4 text-amber-300" }),
								" ",
								tx(lang, "Save", "सेव")
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateField, {
						value: date,
						onChange: setDate,
						className: "min-w-0 flex-1"
					}), office.attendance === "none" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: true,
						className: "inline-flex items-center gap-1 rounded-xl bg-night-3 px-3 py-2 text-sm font-bold text-slate-400",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-3.5 w-3.5 text-amber-300" }),
							" ",
							tx(lang, "View Attendance", "हाजिरी देखें")
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setView(true),
						className: "rounded-xl bg-accent px-3 py-2 text-sm font-bold",
						children: tx(lang, "View Attendance", "हाजिरी देखें")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: tx(lang, "Search staff…", "स्टाफ खोजें…"),
					className: "mt-3 w-full rounded-2xl bg-night-3 px-4 py-3"
				}),
				list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-night-muted",
					children: tx(lang, "No staff yet.", "अभी स्टाफ नहीं।")
				}) : null,
				list.map((s) => {
					const row = draft[s.id] ?? {
						present: true,
						zoneId: null
					};
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "mt-2 rounded-2xl bg-night-3 p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: s.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-night-muted",
									children: [
										s.role || "—",
										" · ",
										s.mobile || "—"
									]
								})] }), staffEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setConfirmStaff(s.id),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4 text-amber-300" })]
							}),
							confirmStaff === s.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDelete, {
								lang,
								text: tx(lang, "This staff member and all their attendance will be deleted.", "यह स्टाफ और उसकी सारी हाजिरी मिट जाएगी।"),
								onCancel: () => setConfirmStaff(null),
								onConfirm: () => {
									setConfirmStaff(null);
									deleteStaffFn({ data: s.id }).then(() => pull(date));
								}
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								disabled: !attEdit,
								value: row.zoneId ?? "",
								onChange: (e) => setDraft({
									...draft,
									[s.id]: {
										...row,
										zoneId: e.target.value ? Number(e.target.value) : null
									}
								}),
								className: "mt-2 w-full rounded-xl bg-night px-3 py-2 disabled:opacity-50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: tx(lang, "Duty zone", "आज का ड्यूटी ज़ोन")
								}), data.zones.map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: z.id,
									children: zoneLabel(z.name)
								}, z.id))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									disabled: !attEdit,
									onClick: () => setDraft({
										...draft,
										[s.id]: {
											...row,
											present: true
										}
									}),
									className: `rounded-xl py-2 font-bold disabled:opacity-50 ${row.present ? "bg-emerald-600" : "bg-night"}`,
									children: tx(lang, "Present", "हाज़िर")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									disabled: !attEdit,
									onClick: () => setDraft({
										...draft,
										[s.id]: {
											...row,
											present: false
										}
									}),
									className: `rounded-xl py-2 font-bold disabled:opacity-50 ${row.present ? "bg-night" : "bg-red-600"}`,
									children: tx(lang, "Absent", "अनुपस्थित")
								})]
							})
						]
					}, s.id);
				}),
				note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-center text-sm text-emerald-300",
					children: note
				}) : null,
				attEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: busy || list.length === 0,
					onClick: () => void submit(),
					className: "mt-4 w-full rounded-2xl bg-accent py-4 text-lg font-extrabold disabled:opacity-50",
					children: tx(lang, "Submit attendance", "हाजिरी जमा करें")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					disabled: true,
					className: "mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-night-3 py-4 text-lg font-extrabold text-slate-400",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4 text-amber-300" }),
						" ",
						tx(lang, "Submit attendance", "हाजिरी जमा करें")
					]
				})
			]
		})
	] });
}
function AttendanceView({ lang, onBack, onEdit }) {
	const office = useOffice();
	const [data, setData] = (0, import_react.useState)(null);
	const [from, setFrom] = (0, import_react.useState)("");
	const [to, setTo] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		loadAttendanceView().then(setData);
	}, []);
	if (!data?.ok) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "p-6",
		children: tx(lang, "Loading…", "लोड हो रहा है…")
	});
	const ranged = Boolean(from && to);
	const lo = from > to ? to : from;
	const hi = from > to ? from : to;
	const shown = ranged ? data.rows.filter((row) => row.iso >= lo && row.iso <= hi) : data.rows;
	function stats(staffId) {
		let days = 0;
		let present = 0;
		const scores = [];
		for (const row of shown) {
			const cell = row.cells.find((item) => item.staffId === staffId);
			if (!cell) continue;
			days += 1;
			if (cell.present) present += 1;
			if (cell.avg != null) scores.push(cell.avg);
		}
		const pct = days ? Math.round(present / days * 100) : 0;
		const avg = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : null;
		return {
			days,
			present,
			pct,
			avg
		};
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-4 pt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onBack,
				className: "text-sm font-bold text-accent",
				children: ["← ", tx(lang, "Staff", "स्टाफ")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-2xl font-extrabold",
				children: tx(lang, "View Attendance", "हाजिरी देखें")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-night-muted",
				children: tx(lang, "Scroll down for dates. Scroll sideways for staff.", "तारीख के लिए नीचे स्क्रॉल करें। स्टाफ के नाम दाएँ-बाएँ।")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-center gap-2 rounded-2xl border border-night-line bg-night-2 p-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateField, {
						value: from,
						onChange: setFrom,
						label: "From",
						className: "min-w-0 flex-1 !bg-transparent"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateField, {
						value: to,
						onChange: setTo,
						label: "To",
						className: "min-w-0 flex-1 !bg-transparent"
					}),
					from || to ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "clear",
						onClick: () => {
							setFrom("");
							setTo("");
						},
						className: "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-night-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					}) : null
				]
			}),
			data.rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-night-muted",
				children: tx(lang, "No attendance saved yet.", "अभी हाजिरी सेव नहीं हुई।")
			}) : null,
			data.rows.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 max-h-[68vh] overflow-auto rounded-2xl border border-white/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "border-separate border-spacing-0 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "text-night-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "sticky top-0 left-0 z-30 min-w-[92px] bg-night-2 px-2 py-2 text-left",
							children: tx(lang, "Date", "तारीख")
						}), data.staff.map((person) => {
							const stat = stats(person.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
								className: "sticky top-0 z-20 min-w-[120px] bg-night-3 px-2 py-2 text-left align-top",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: person.name }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 inline-flex flex-col rounded-xl border border-emerald-400/40 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-extrabold leading-tight text-emerald-300",
										children: ranged ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "कुल हाजिरी" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											stat.present,
											"/",
											stat.days,
											" दिन"
										] })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											"हाजिरी ",
											stat.pct,
											"%"
										] })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 text-[11px] font-bold text-amber-300",
										children: ["औसत ", stat.avg == null ? "—" : `${score2(stat.avg)}★`]
									})
								]
							}, person.id);
						})]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: shown.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "sticky left-0 z-10 min-w-[92px] border-t border-white/10 bg-night-2 px-2 py-2 align-top",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: row.date }), office.attendance === "edit" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-1 text-[11px] font-bold text-accent",
							onClick: () => onEdit(row.iso),
							children: tx(lang, "Edit", "बदलाव")
						}) : null]
					}), data.staff.map((person) => {
						const cell = row.cells.find((item) => item.staffId === person.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "min-w-[110px] border-t border-white/10 bg-night-3 px-2 py-2 align-top",
							children: !cell ? "—" : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cell.present ? "font-bold text-emerald-300" : "text-red-300",
								children: cell.present ? tx(lang, "Present", "हाज़िर") : tx(lang, "Absent", "अनुपस्थित")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "whitespace-nowrap text-[10px] leading-tight text-slate-400",
								children: [
									zoneLabel(cell.zone),
									" ",
									cell.present ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-bold text-amber-300",
										children: cell.avg == null ? "—" : `${score2(cell.avg)}★`
									}) : null
								]
							})] })
						}, person.id);
					})] }, row.iso)) })]
				})
			}) : null
		]
	});
}
function ConfirmDelete({ lang, text, onCancel, onConfirm }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-2 rounded-xl border border-red-400/50 bg-red-500/10 p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm leading-relaxed text-red-100",
			children: text
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 grid grid-cols-2 gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "rounded-xl border border-night-line py-2",
				onClick: onCancel,
				children: tx(lang, "Cancel", "रद्द")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "rounded-xl bg-red-600 py-2 font-bold",
				onClick: onConfirm,
				children: tx(lang, "Confirm delete", "डिलीट पक्का करें")
			})]
		})]
	});
}
function zoneLabel(name) {
	const clean = name.trim();
	if (!clean || clean === "—") return "—";
	if (/^zone/i.test(clean) || /^ज़ोन/.test(clean)) return clean;
	return `Zone ${clean}`;
}
function ProfileSheet({ lang, username, onLang, onClose, onLogout, onSubs, onPassword }) {
	const office = useOffice();
	const [current, setCurrent] = (0, import_react.useState)("");
	const [next, setNext] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [msg, setMsg] = (0, import_react.useState)("");
	const [count, setCount] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (office.role !== "admin") return;
		listSubAdminsFn().then((res) => {
			if (res.ok) setCount(res.rows.length);
		});
	}, [office.role]);
	const sub = office.role === "subadmin";
	const initial = (sub ? office.name : "A").trim().charAt(0).toUpperCase() || "A";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 flex items-end justify-center bg-black/50",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-[430px] rounded-t-3xl bg-night-2 p-4",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mb-3 h-1.5 w-12 rounded-full bg-night-line" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-12 w-12 place-items-center rounded-2xl bg-accent text-xl font-extrabold",
						children: initial
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: sub ? "Sub Admin" : "Admin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm text-night-muted",
						children: sub ? `Sub Admin · ${office.username}` : `${tx(lang, "Councillor", "पार्षद")} · ${tx(lang, "Username", "यूज़रनेम")}: ${username}`
					})] })]
				}),
				sub ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "mt-4 flex w-full items-center justify-between rounded-2xl bg-night-3 px-3 py-3",
					onClick: onSubs,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-4 w-4" }),
							" ",
							tx(lang, "Sub Admins", "Sub Admin")
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [count ?? "·", " ›"] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "mt-3 flex w-full items-center gap-2 rounded-2xl bg-night-3 px-3 py-3",
					onClick: () => sub ? onPassword() : setOpen((v) => !v),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "h-4 w-4" }),
						" ",
						tx(lang, "Change Password", "पासवर्ड बदलें")
					]
				}),
				!sub && open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 grid gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "password",
							value: current,
							onChange: (e) => setCurrent(e.target.value),
							placeholder: tx(lang, "Current password", "पुराना पासवर्ड"),
							className: "rounded-xl bg-night px-3 py-2"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "password",
							value: next,
							onChange: (e) => setNext(e.target.value),
							placeholder: tx(lang, "New password", "नया पासवर्ड"),
							className: "rounded-xl bg-night px-3 py-2"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "rounded-xl bg-accent py-2 font-bold",
							onClick: () => void updateAdminPassword({ data: {
								current,
								next
							} }).then((res) => setMsg(res.ok ? tx(lang, "Password updated.", "पासवर्ड बदल गया।") : tx(lang, "Could not update.", "नहीं बदला।"))),
							children: tx(lang, "Save", "सेव")
						}),
						msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-night-muted",
							children: msg
						}) : null
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex items-center justify-between rounded-2xl bg-night-3 px-3 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tx(lang, "Language", "भाषा") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => onLang("en"),
							className: `rounded-full px-3 py-1 ${lang === "en" ? "bg-accent" : "bg-night"}`,
							children: "English"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => onLang("hi"),
							className: `rounded-full px-3 py-1 ${lang === "hi" ? "bg-accent" : "bg-night"}`,
							children: "हिंदी"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: onLogout,
					className: "mt-3 flex w-full items-center gap-2 rounded-2xl bg-night-3 px-3 py-3 text-red-300",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }),
						" ",
						tx(lang, "Logout", "लॉगआउट")
					]
				})
			]
		})
	});
}
function DateField({ value, onChange, className = "", label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: `relative block overflow-hidden rounded-xl bg-night-3 px-3 py-2 ${className}`,
		children: [
			label ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-[10px] text-night-muted",
				children: label
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `block ${value ? "text-night-fg" : "text-night-muted"}`,
				children: value ? dmy(value) : "दिनांक चुनें"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "date",
				value,
				onChange: (e) => onChange(e.target.value),
				className: "absolute inset-0 cursor-pointer opacity-0"
			})
		]
	});
}
function Tri({ value, onChange, editLabel = "Edit" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-3 gap-1 rounded-2xl bg-[#12101c] p-1",
		children: [
			{
				id: "edit",
				label: editLabel,
				on: "bg-emerald-500 text-white"
			},
			{
				id: "view",
				label: "View",
				on: "bg-blue-500 text-white"
			},
			{
				id: "none",
				label: "None",
				on: "bg-slate-500 text-white"
			}
		].map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onChange(opt.id),
			className: `rounded-xl py-2 text-sm font-bold ${value === opt.id ? opt.on : "text-slate-400"}`,
			children: opt.label
		}, opt.id))
	});
}
function permClass(level) {
	return level === "edit" ? "font-bold text-emerald-400" : level === "view" ? "font-bold text-sky-400" : "text-slate-500";
}
function liRollup(zones) {
	if (zones.some((z) => z.perm === "edit")) return "edit";
	if (zones.some((z) => z.perm === "view")) return "view";
	return "none";
}
function SubAdmins({ lang, onBack }) {
	const [rows, setRows] = (0, import_react.useState)([]);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [resetFor, setResetFor] = (0, import_react.useState)(null);
	const [removeFor, setRemoveFor] = (0, import_react.useState)(null);
	async function pull() {
		const res = await listSubAdminsFn();
		if (res.ok) setRows(res.rows);
	}
	(0, import_react.useEffect)(() => {
		pull();
	}, []);
	if (editing) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubAdminForm, {
		lang,
		row: editing === "new" ? null : editing,
		onBack: () => {
			setEditing(null);
			pull();
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-4 pt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onBack,
				className: "text-sm font-bold text-accent",
				children: ["← ", tx(lang, "Back", "वापस")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-3xl font-extrabold",
				children: "Sub Admins"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-night-muted",
				children: [
					"Admin · ",
					tx(lang, "Councillor", "पार्षद"),
					" · ",
					istNow().dmy
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setEditing("new"),
				className: "mt-3 w-full rounded-2xl bg-accent py-3 text-lg font-extrabold",
				children: ["+ ", tx(lang, "Add Sub Admin", "Sub Admin जोड़ें")]
			}),
			rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-night-muted",
				children: tx(lang, "No sub admins yet.", "अभी कोई Sub Admin नहीं।")
			}) : null,
			rows.map((row) => {
				const li = liRollup(row.zones);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "mt-3 rounded-3xl border border-white/5 bg-night-3 p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
								className: "text-lg",
								children: row.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `rounded-full px-2 py-0.5 text-xs font-bold ${row.active ? "bg-emerald-400 text-emerald-950" : "bg-slate-600 text-slate-100"}`,
								children: row.active ? "Active" : "Inactive"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-night-muted",
							children: ["Username: ", row.username]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xs leading-relaxed",
							children: [
								"Attendance ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: permClass(row.attendance),
									children: row.attendance === "edit" ? "Edit" : row.attendance === "view" ? "View" : "None"
								}),
								" · ",
								"Zone ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: permClass(row.zone),
									children: row.zone === "edit" ? "Edit" : row.zone === "view" ? "View" : "None"
								}),
								" · ",
								"Zone LI ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: permClass(li),
									children: li === "edit" ? "Edit" : li === "view" ? "View" : "None"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs",
							children: [
								"Today's Number ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: permClass(row.number),
									children: row.number === "edit" ? "Edit" : row.number === "view" ? "View" : "None"
								}),
								" · ",
								"Add Staff ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: permClass(row.staff),
									children: row.staff === "edit" ? "Edit" : row.staff === "view" ? "View" : "None"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 grid grid-cols-3 gap-2 text-xs font-bold",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setEditing(row),
									className: "inline-flex items-center justify-center gap-1 rounded-xl bg-night px-2 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" }), " Edit"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setResetFor(row),
									className: "inline-flex items-center justify-center gap-1 rounded-xl bg-night px-1 py-2 text-[10px] leading-tight",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "h-3.5 w-3.5 shrink-0 text-amber-300" }), " Reset Password"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setRemoveFor(row),
									className: "inline-flex items-center justify-center gap-1 rounded-xl bg-night px-2 py-2 text-red-300",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), " Remove"]
								})
							]
						})
					]
				}, row.id);
			}),
			resetFor ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResetSheet, {
				lang,
				row: resetFor,
				onClose: () => setResetFor(null)
			}) : null,
			removeFor ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 grid place-items-center bg-black/60 px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-sm rounded-3xl bg-[#241e3d] p-5 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto grid h-14 w-14 place-items-center rounded-full bg-red-500/20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-6 w-6 text-sky-200" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 text-xl font-extrabold",
							children: "Sub Admin हटाएं?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: removeFor.name }),
								" (",
								removeFor.username,
								") को हटाने पर वह login नहीं कर पाएगा।"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 grid grid-cols-2 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setRemoveFor(null),
								className: "rounded-2xl bg-[#3a3458] py-3 font-bold",
								children: "रद्द करें"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "rounded-2xl bg-red-500 py-3 font-extrabold",
								onClick: () => void removeSubAdminFn({ data: removeFor.id }).then(() => {
									setRemoveFor(null);
									pull();
								}),
								children: "हाँ, हटाएं"
							})]
						})
					]
				})
			}) : null
		]
	});
}
function ResetSheet({ lang, row, onClose }) {
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)("");
	const [show, setShow] = (0, import_react.useState)(false);
	const [msg, setMsg] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-end justify-center bg-black/50",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-[430px] rounded-t-3xl bg-night-2 p-4 pb-8",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mb-3 h-1.5 w-12 rounded-full bg-night-line" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-extrabold",
					children: "Reset Password"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-night-muted",
					children: [
						row.name,
						" · Username: ",
						row.username
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mt-3 block text-sm text-night-muted",
					children: "New Password"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: show ? "text" : "password",
						value: password,
						onChange: (e) => setPassword(e.target.value),
						placeholder: "New password",
						className: "w-full rounded-2xl bg-night px-3 py-3 pr-10"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "absolute top-1/2 right-3 -translate-y-1/2 text-night-muted",
						onClick: () => setShow((v) => !v),
						children: show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mt-3 block text-sm text-night-muted",
					children: "Confirm Password"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: show ? "text" : "password",
						value: confirm,
						onChange: (e) => setConfirm(e.target.value),
						placeholder: "Confirm password",
						className: "w-full rounded-2xl bg-night px-3 py-3 pr-10"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "absolute top-1/2 right-3 -translate-y-1/2 text-night-muted",
						onClick: () => setShow((v) => !v),
						children: show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
					})]
				}),
				msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-red-300",
					children: msg
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid grid-cols-[1fr_2fr] gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						className: "rounded-2xl bg-night-3 py-3 font-bold",
						children: tx(lang, "Cancel", "रद्द")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "rounded-2xl bg-accent py-3 font-extrabold",
						onClick: () => {
							if (password.length < 6) {
								setMsg(tx(lang, "Minimum 6 characters.", "कम से कम 6 अक्षर।"));
								return;
							}
							if (password !== confirm) {
								setMsg(tx(lang, "Passwords do not match.", "पासवर्ड मिलान नहीं हुआ।"));
								return;
							}
							resetSubPasswordFn({ data: {
								id: row.id,
								password
							} }).then((res) => {
								if (!res.ok) {
									setMsg(tx(lang, "Could not reset.", "रीसेट नहीं हुआ।"));
									return;
								}
								onClose();
							});
						},
						children: tx(lang, "Save", "सेव")
					})]
				})
			]
		})
	});
}
function SubAdminForm({ lang, row, onBack }) {
	const [name, setName] = (0, import_react.useState)(row?.name ?? "");
	const [username, setUsername] = (0, import_react.useState)(row?.username ?? "");
	const [password, setPassword] = (0, import_react.useState)("");
	const [show, setShow] = (0, import_react.useState)(false);
	const [active, setActive] = (0, import_react.useState)(row?.active ?? true);
	const [attendance, setAttendance] = (0, import_react.useState)(row?.attendance ?? "none");
	const [zone, setZone] = (0, import_react.useState)(row?.zone ?? "none");
	const [number, setNumber] = (0, import_react.useState)(row?.number ?? "none");
	const [staff, setStaff] = (0, import_react.useState)(row?.staff ?? "none");
	const [councillor, setCouncillor] = (0, import_react.useState)(row?.councillor ?? "none");
	const [zones, setZones] = (0, import_react.useState)([]);
	const [msg, setMsg] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		loadZones().then((res) => {
			if (!res.ok) return;
			setZones(res.zones.map((z) => ({
				id: z.id,
				name: z.name,
				inspectors: z.inspectors.length,
				perm: row?.zones.find((item) => item.id === z.id)?.perm ?? "none"
			})));
		});
	}, [row]);
	const allSame = zones.length > 0 && zones.every((z) => z.perm === zones[0].perm) ? zones[0].perm : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-4 pt-4 pb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onBack,
				className: "text-sm font-bold text-accent",
				children: ["← ", tx(lang, "Back", "वापस")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-2xl font-extrabold",
				children: row ? tx(lang, "Edit Sub Admin", "Sub Admin बदलें") : tx(lang, "Add Sub Admin", "Sub Admin जोड़ें")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid gap-2 rounded-3xl border border-white/10 bg-night-3 p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: tx(lang, "Name", "नाम"),
						value: name,
						onChange: setName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: tx(lang, "Username", "यूज़रनेम"),
						value: username,
						onChange: (v) => setUsername(v.toUpperCase())
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-xs text-night-muted",
						children: [tx(lang, "Password", "पासवर्ड"), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "relative mt-1 block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: show ? "text" : "password",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								placeholder: row ? tx(lang, "Leave blank to keep", "खाली छोड़ें") : tx(lang, "Minimum 6 characters", "कम से कम 6"),
								className: "w-full rounded-xl bg-night px-3 py-2 pr-10 text-base text-night-fg"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "absolute top-1/2 right-3 -translate-y-1/2 text-night-muted",
								onClick: () => setShow((v) => !v),
								children: show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setActive((v) => !v),
						className: "flex items-center justify-between rounded-xl bg-night px-3 py-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: active ? "Active" : "Inactive" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `rounded-full px-2 py-0.5 text-xs font-bold ${active ? "bg-emerald-400 text-emerald-950" : "bg-slate-600"}`,
							children: active ? "ON" : "OFF"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 rounded-3xl border border-white/10 bg-night-3 p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-extrabold",
						children: "Permissions"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-night-muted",
						children: "Edit = बदल सकता है · View = सिर्फ देख सकता है · None = कुछ नहीं"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 border-t border-white/10 pt-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Staff Attendance" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-night-muted",
								children: "Mark Present/Absent"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tri, {
									value: attendance,
									onChange: setAttendance
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 border-t border-white/10 pt-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Create Zone" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-night-muted",
								children: "New zone / edit zone"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tri, {
									value: zone,
									onChange: setZone
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 border-t border-white/10 pt-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Zone LI (Add / Remove / Replace)" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-night-muted",
								children: "हर zone की अलग permission"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm font-bold",
								children: "Zones चुनें"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-night-muted",
								children: "सभी zones"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tri, {
								value: allSame,
								onChange: (level) => setZones(zones.map((z) => ({
									...z,
									perm: level
								})))
							}),
							zones.map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 rounded-2xl bg-night p-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-2 text-sm font-bold",
									children: [
										zoneLabel(z.name),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-medium text-night-muted",
											children: [
												"· ",
												z.inspectors,
												" Inspectors"
											]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tri, {
									value: z.perm,
									onChange: (level) => setZones(zones.map((item) => item.id === z.id ? {
										...item,
										perm: level
									} : item))
								})]
							}, z.id))
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 border-t border-white/10 pt-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Zone – Ward Councillor (वार्ड पार्षद)" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-night-muted",
								children: "पार्षद जोड़ना / नाम-फोटो बदलना"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tri, {
									value: councillor,
									onChange: setCouncillor,
									editLabel: "Edit (Add)"
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 border-t border-white/10 pt-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Assign Today's Number" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-night-muted",
								children: "For all zones"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tri, {
									value: number,
									onChange: setNumber
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 border-t border-white/10 pt-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Add Staff" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-night-muted",
								children: "Add new staff member"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tri, {
									value: staff,
									onChange: setStaff
								})
							})
						]
					})
				]
			}),
			msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-red-300",
				children: msg
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: busy,
				className: "mt-4 w-full rounded-2xl bg-accent py-3 text-lg font-extrabold disabled:opacity-50",
				onClick: () => {
					if (!name.trim() || username.trim().length < 3) {
						setMsg(tx(lang, "Name and username (3+ letters) are required.", "नाम और यूज़रनेम (3 अक्षर) ज़रूरी हैं।"));
						return;
					}
					if (!row && password.trim().length < 6) {
						setMsg(tx(lang, "Password must be at least 6 characters.", "पासवर्ड कम से कम 6 अक्षर।"));
						return;
					}
					if (password && password.trim().length < 6) {
						setMsg(tx(lang, "Password must be at least 6 characters.", "पासवर्ड कम से कम 6 अक्षर।"));
						return;
					}
					setBusy(true);
					saveSubAdminFn({ data: {
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
						zones: zones.map((z) => ({
							id: z.id,
							perm: z.perm
						}))
					} }).then((res) => {
						setBusy(false);
						if (!res.ok) {
							setMsg(tx(lang, "Could not save. Username may already exist.", "सेव नहीं हुआ। यूज़रनेम पहले से हो सकता है।"));
							return;
						}
						onBack();
					});
				},
				children: tx(lang, "Save", "सेव")
			})
		]
	});
}
function OwnPassword({ lang, onBack }) {
	const office = useOffice();
	const [current, setCurrent] = (0, import_react.useState)("");
	const [next, setNext] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)("");
	const [show, setShow] = (0, import_react.useState)(false);
	const [msg, setMsg] = (0, import_react.useState)("");
	const [ok, setOk] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-4 pt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onBack,
				className: "text-sm font-bold text-accent",
				children: ["← ", tx(lang, "Back", "वापस")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-3xl font-extrabold",
				children: "Change Password"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-night-muted",
				children: [
					"Sub Admin · ",
					office.name,
					" · ",
					office.username
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 rounded-3xl border border-white/10 bg-night-3 p-3",
				children: [
					[
						[
							"Current Password",
							"Current password",
							current,
							setCurrent
						],
						[
							"New Password",
							"New password",
							next,
							setNext
						],
						[
							"Confirm New Password",
							"Confirm new password",
							confirm,
							setConfirm
						]
					].map(([label, placeholder, value, set]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm text-night-muted",
						children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "relative mt-1 block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: show ? "text" : "password",
								value,
								onChange: (e) => set(e.target.value),
								placeholder,
								className: "w-full rounded-2xl bg-night px-3 py-3 pr-10 text-night-fg"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "absolute top-1/2 right-3 -translate-y-1/2",
								onClick: () => setShow((v) => !v),
								children: show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
							})]
						})]
					}, label)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-night-muted",
						children: "Minimum 6 characters"
					}),
					msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `text-sm ${ok ? "text-emerald-300" : "text-red-300"}`,
						children: msg
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "rounded-2xl bg-accent py-3 font-extrabold",
						onClick: () => {
							if (next.length < 6) {
								setOk(false);
								setMsg("Minimum 6 characters");
								return;
							}
							if (next !== confirm) {
								setOk(false);
								setMsg(tx(lang, "Passwords do not match.", "पासवर्ड मिलान नहीं हुआ।"));
								return;
							}
							changeOwnPasswordFn({ data: {
								current,
								next
							} }).then((res) => {
								if (!res.ok) {
									setOk(false);
									setMsg(tx(lang, "Current password is wrong.", "पुराना पासवर्ड गलत है।"));
									return;
								}
								setOk(true);
								setMsg(tx(lang, "Password updated.", "पासवर्ड बदल गया।"));
								setCurrent("");
								setNext("");
								setConfirm("");
							});
						},
						children: tx(lang, "Save", "सेव")
					})
				]
			})
		]
	});
}
function adminOffice(username) {
	return {
		role: "admin",
		name: "Admin",
		username,
		attendance: "edit",
		zone: "edit",
		number: "edit",
		staff: "edit",
		councillor: "edit",
		zones: []
	};
}
function Home() {
	const boot = Route.useLoaderData();
	const [role, setRole] = (0, import_react.useState)(boot.role);
	const [username, setUsername] = (0, import_react.useState)(boot.username);
	const [office, setOffice] = (0, import_react.useState)(boot.role === "admin" ? adminOffice(boot.username) : null);
	const [gate, setGate] = (0, import_react.useState)("admin");
	const [lang, setLang] = (0, import_react.useState)("en");
	const [booting, setBooting] = (0, import_react.useState)(boot.role === "subadmin");
	(0, import_react.useLayoutEffect)(() => {
		const saved = localStorage.getItem("safai.lang");
		if (saved === "hi" || saved === "en") setLang(saved);
		if (!localStorage.getItem("safai.session")) {
			clearToken();
			setRole(null);
			setOffice(null);
			setGate("admin");
			setBooting(false);
			return;
		}
		const savedRole = localStorage.getItem("safai.role");
		if (savedRole === "admin" || savedRole === "inspector" || savedRole === "subadmin") {
			setRole(savedRole);
			const savedUser = localStorage.getItem("safai.user");
			if (savedUser) setUsername(savedUser);
			if (savedRole === "admin") setOffice(adminOffice(savedUser || "ADMIN"));
			if (savedRole === "subadmin") setBooting(true);
			document.cookie = `safai_role=${savedRole}; path=/; max-age=15552000; samesite=lax`;
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (!localStorage.getItem("safai.session")) {
			setBooting(false);
			return;
		}
		installStillValid().then((state) => {
			if (state === "logout") {
				clearToken();
				signOut();
				setRole(null);
				setOffice(null);
				setGate("admin");
				setBooting(false);
				return;
			}
			if (state === "none") {
				clearToken();
				setRole(null);
				setOffice(null);
				setGate("admin");
				return;
			}
			fetchSession().then((res) => {
				if (res.role === "admin") {
					setRole("admin");
					setUsername(res.username);
					setOffice(adminOffice(res.username));
					localStorage.setItem("safai.role", "admin");
					localStorage.setItem("safai.user", res.username);
					document.cookie = "safai_role=admin; path=/; max-age=15552000; samesite=lax";
				} else if (res.role === "subadmin") {
					setRole("subadmin");
					setUsername(res.username);
					setOffice({
						role: "subadmin",
						name: res.name,
						username: res.username,
						attendance: res.perms.attendance,
						zone: res.perms.zone,
						number: res.perms.number,
						staff: res.perms.staff,
						councillor: res.perms.councillor,
						zones: res.perms.zones
					});
					localStorage.setItem("safai.role", "subadmin");
					localStorage.setItem("safai.user", res.username);
					document.cookie = "safai_role=subadmin; path=/; max-age=15552000; samesite=lax";
				} else if (res.role === "inspector") {
					setRole("inspector");
					localStorage.setItem("safai.role", "inspector");
					document.cookie = "safai_role=inspector; path=/; max-age=15552000; samesite=lax";
				} else {
					clearToken();
					setRole(null);
					setOffice(null);
					setGate("admin");
				}
				setBooting(false);
			}).catch(() => setBooting(false));
		});
	}, []);
	function chooseLang(next) {
		setLang(next);
		localStorage.setItem("safai.lang", next);
	}
	if (booting && (!role || role === "subadmin" && !office)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "mx-auto grid min-h-dvh w-full max-w-[430px] place-items-center bg-canvas px-6 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-extrabold text-brand",
			children: "सफाई निरीक्षण फॉर्म"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-base text-muted",
			children: "नगरपालिका खरखौदा क्षेत्र"
		})] })
	});
	if (role === "inspector") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InspectorApp, { onKicked: () => {
		clearToken();
		setRole(null);
		setGate("admin");
	} });
	if (role === "admin" || role === "subadmin" && office) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminApp, {
		lang,
		username,
		office: office ?? adminOffice(username),
		onLang: chooseLang,
		onLogout: () => {
			setRole(null);
			setOffice(null);
			setGate("admin");
		}
	});
	if (gate === "inspector") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InspectorLogin, {
		onBack: () => setGate("admin"),
		onSuccess: () => setRole("inspector")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLogin, {
		lang,
		onLang: chooseLang,
		onInspector: () => setGate("inspector"),
		onSuccess: (session) => {
			setUsername(session.username);
			if (session.role === "subadmin" && session.perms) {
				setOffice({
					role: "subadmin",
					name: session.name || session.username,
					username: session.username,
					...session.perms
				});
				setRole("subadmin");
				return;
			}
			setOffice(adminOffice(session.username));
			setRole("admin");
		}
	});
}
//#endregion
export { Home as component };
