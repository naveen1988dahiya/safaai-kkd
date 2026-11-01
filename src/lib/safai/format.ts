/** Asia/Kolkata calendar helpers. Safe on client and server. */

export type IstNow = {
  iso: string;
  dmy: string;
  dayNum: number;
  monthNum: number;
  yearNum: number;
  weekday: string;
  hm: string;
  hour: number;
  minute: number;
};

export function istNow(now = new Date()): IstNow {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
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
    minute: Number(get("minute")),
  };
}

export function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

export function shiftIso(iso: string, days: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + days);
  return dt.toISOString().slice(0, 10);
}

export function monthStart(iso: string): string {
  return `${iso.slice(0, 8)}01`;
}

/** Monday-start week in the ISO date's calendar. */
export function weekStart(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  const weekday = dt.getUTCDay();
  const fromMonday = weekday === 0 ? 6 : weekday - 1;
  dt.setUTCDate(dt.getUTCDate() - fromMonday);
  return dt.toISOString().slice(0, 10);
}

export function dmy(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export function monthName(month: number): string {
  return [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ][month - 1] ?? "";
}

/** First two English letters + day of month, e.g. Ravi on the 21st → RA21. */
export function dailyPassword(name: string, dayNum: number): string | null {
  const letters = name.match(/[A-Za-z]/g)?.join("") ?? "";
  const prefix = letters.slice(0, 2).toUpperCase();
  if (prefix.length < 2) return null;
  return `${prefix}${String(dayNum).padStart(2, "0")}`;
}

export function codeKey(code: string): { prefix: string; num: number } {
  const m = code.toUpperCase().match(/^([A-Za-z]+)(\d+)$/);
  if (!m) return { prefix: code.toUpperCase(), num: 0 };
  return { prefix: m[1].toUpperCase(), num: Number(m[2]) };
}

export function compareCodes(a: string, b: string): number {
  const ka = codeKey(a);
  const kb = codeKey(b);
  if (ka.prefix !== kb.prefix) return ka.prefix < kb.prefix ? -1 : 1;
  return ka.num - kb.num;
}

export function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

export function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function score2(n: number | null | undefined): string {
  if (n == null || Number.isNaN(Number(n))) return "—";
  return round2(Number(n)).toFixed(2);
}

export function pct(part: number, whole: number, digits: 0 | 1 = 0): number {
  if (!whole) return 0;
  const raw = (part / whole) * 100;
  return digits === 1 ? round1(raw) : Math.round(raw);
}
