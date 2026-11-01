//#region node_modules/.nitro/vite/services/ssr/assets/format--G7lwSau.js
function istNow(now = /* @__PURE__ */ new Date()) {
	const parts = new Intl.DateTimeFormat("en-GB", {
		timeZone: "Asia/Kolkata",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		weekday: "short",
		hourCycle: "h23"
	}).formatToParts(now);
	const get = (type) => parts.find((p) => p.type === type)?.value ?? "";
	const day = get("day");
	const month = get("month");
	const year = get("year");
	return {
		iso: `${year}-${month}-${day}`,
		dmy: `${day}/${month}/${year}`,
		dayNum: Number(day),
		monthNum: Number(month),
		yearNum: Number(year),
		weekday: get("weekday"),
		hm: `${get("hour")}:${get("minute")}`,
		hour: Number(get("hour")),
		minute: Number(get("minute"))
	};
}
function daysInMonth(year, month) {
	return new Date(Date.UTC(year, month, 0)).getUTCDate();
}
function shiftIso(iso, days) {
	const [y, m, d] = iso.split("-").map(Number);
	const dt = new Date(Date.UTC(y, m - 1, d));
	dt.setUTCDate(dt.getUTCDate() + days);
	return dt.toISOString().slice(0, 10);
}
function monthStart(iso) {
	return `${iso.slice(0, 8)}01`;
}
/** Monday-start week in the ISO date's calendar. */
function weekStart(iso) {
	const [y, m, d] = iso.split("-").map(Number);
	const dt = new Date(Date.UTC(y, m - 1, d));
	const weekday = dt.getUTCDay();
	const fromMonday = weekday === 0 ? 6 : weekday - 1;
	dt.setUTCDate(dt.getUTCDate() - fromMonday);
	return dt.toISOString().slice(0, 10);
}
function dmy(iso) {
	const [y, m, d] = iso.split("-");
	return `${d}/${m}/${y}`;
}
function monthName(month) {
	return [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	][month - 1] ?? "";
}
/** First two English letters + day of month, e.g. Ravi on the 21st → RA21. */
function dailyPassword(name, dayNum) {
	const prefix = (name.match(/[A-Za-z]/g)?.join("") ?? "").slice(0, 2).toUpperCase();
	if (prefix.length < 2) return null;
	return `${prefix}${String(dayNum).padStart(2, "0")}`;
}
function codeKey(code) {
	const m = code.toUpperCase().match(/^([A-Za-z]+)(\d+)$/);
	if (!m) return {
		prefix: code.toUpperCase(),
		num: 0
	};
	return {
		prefix: m[1].toUpperCase(),
		num: Number(m[2])
	};
}
function compareCodes(a, b) {
	const ka = codeKey(a);
	const kb = codeKey(b);
	if (ka.prefix !== kb.prefix) return ka.prefix < kb.prefix ? -1 : 1;
	return ka.num - kb.num;
}
function round1(n) {
	return Math.round(n * 10) / 10;
}
function round2(n) {
	return Math.round(n * 100) / 100;
}
function score2(n) {
	if (n == null || Number.isNaN(Number(n))) return "—";
	return round2(Number(n)).toFixed(2);
}
function pct(part, whole, digits = 0) {
	if (!whole) return 0;
	const raw = part / whole * 100;
	return digits === 1 ? round1(raw) : Math.round(raw);
}
//#endregion
export { istNow as a, pct as c, shiftIso as d, weekStart as f, dmy as i, round2 as l, dailyPassword as n, monthName as o, daysInMonth as r, monthStart as s, compareCodes as t, score2 as u };
