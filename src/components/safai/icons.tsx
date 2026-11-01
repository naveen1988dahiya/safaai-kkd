export function BroomIcon({ tone = "blue" }: { tone?: "blue" | "yellow" }) {
  const gold = tone === "yellow";
  const handle = gold ? "#facc15" : "#e8b15a";
  const straw = gold ? "#eab308" : "#d9922e";
  const band = gold ? "#ca8a04" : "#b8732a";
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden="true">
      <path d="M31.2 3.5c.8.5 1 1.6.5 2.4L26.2 22" stroke={handle} strokeWidth="3.4" strokeLinecap="round" />
      <path d="M15.2 23.6h17.2c.9 0 1.4.8 1.2 1.6l-.8 2.4H14.8l-.8-2.4c-.2-.8.3-1.6 1.2-1.6z" fill={band} />
      <path d="M13.4 29.2 9.2 44" stroke={straw} strokeWidth="2.15" strokeLinecap="round" />
      <path d="M16.8 28.4 14.2 44" stroke={straw} strokeWidth="2.15" strokeLinecap="round" />
      <path d="M20.2 28 19.2 44" stroke={straw} strokeWidth="2.15" strokeLinecap="round" />
      <path d="M23.6 27.8 24.2 44" stroke={straw} strokeWidth="2.15" strokeLinecap="round" />
      <path d="M27 28.1 29.2 44" stroke={straw} strokeWidth="2.15" strokeLinecap="round" />
      <path d="M30.4 28.6 34 44" stroke={straw} strokeWidth="2.15" strokeLinecap="round" />
      <path d="M33.6 29.6 38.4 42.8" stroke={straw} strokeWidth="2.15" strokeLinecap="round" />
    </svg>
  );
}

export function DrainIcon({ tone = "blue" }: { tone?: "blue" | "yellow" }) {
  const gold = tone === "yellow";
  const bar = gold ? "#eab308" : "#5aa6f6";
  const water = gold ? "#fde68a" : "#bfdbfe";
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden="true">
      <rect x="6" y="14" width="36" height="5" rx="2.5" fill={bar} />
      <path d="M8 24.5c3 2.2 6-2.2 9 0s6-2.2 9 0 6-2.2 9 0 6-2.2 8 0v5c-2 2.2-5-2.2-8 0s-6 2.2-9 0-6 2.2-9 0-6 2.2-9 0v-5z" fill={water} />
      <rect x="6" y="30" width="36" height="5" rx="2.5" fill={bar} />
    </svg>
  );
}

export function TrashIcon({ tone = "blue" }: { tone?: "blue" | "yellow" }) {
  const gold = tone === "yellow";
  const heap = gold ? "#eab308" : "#3b82f6";
  const scrap = gold ? "#fde68a" : "#bfdbfe";
  const smell = gold ? "#ca8a04" : "#60a5fa";
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden="true">
      <path d="M14 20c2.4-2 2.4-4.2 0-6.2s-2.4-4.2 0-6.2" stroke={smell} strokeWidth="1.7" strokeLinecap="round" fill="none" />
      <path d="M22 18.5c2.6-2.2 2.6-4.4 0-6.6s-2.6-4.4 0-6.6" stroke={smell} strokeWidth="1.7" strokeLinecap="round" fill="none" />
      <path d="M30 20c2.4-2 2.4-4.2 0-6.2s-2.4-4.2 0-6.2" stroke={smell} strokeWidth="1.7" strokeLinecap="round" fill="none" />
      <path d="M8.5 33.5c1.6-8 6.4-13 15.5-13s13.8 5 15.5 13c.8 4.2-2.2 8.5-7.2 8.5H15.7c-5 0-8-4.3-7.2-8.5z" fill={heap} />
      <path d="M14 31.5c2-3.2 4.2-4.6 6.6-3.8 1 2.4 0 4.6-1.8 5.8" fill={scrap} />
      <ellipse cx="29.5" cy="30.5" rx="3.1" ry="2.3" fill={scrap} />
      <path d="M20 35.2h8.2l-.7 4.4h-6.8z" fill={scrap} />
    </svg>
  );
}

export function LogoMark({ className = "h-16 w-16" }: { className?: string }) {
  return <img src="/logo.png" alt="" className={`${className} rounded-2xl object-cover`} />;
}
