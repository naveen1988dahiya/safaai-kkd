Build a mobile-first web app (PWA) called "Safai Nirikshan – Nagarpalika Kharkhoda". It has two roles: Local Inspector (Hindi only) and Admin (English default, Hindi toggle). Match the attached design screenshots exactly (layout, colours, sizes). Use a real database and real login. Keep the number of screens to a minimum, and make lists scroll; do not add "View All" pages.

== DESIGN ==
- Inspector screens: light theme, blue #1a56db, white rounded cards. ALL text in Hindi, large (body ≥18px, inputs ≥22px), big touch targets, very simple for low-literacy users.
  - Top banner: round photo + name of the councillor of the INSPECTOR'S OWN WARD, e.g. "नवीन दहिया" / "पार्षद, वार्ड नं. 3". It comes from the Ward Councillors data, not hard-coded. If a zone covers 2–3 wards, each inspector sees only the councillor of the ward set in his inspector row. On the login screen (before login) show a generic Nagarpalika logo; after the inspector logs in on that device, show his ward councillor.
- Admin screens: modern dark indigo theme, gradient stat cards, English.
  - Bottom nav with 5 tabs: Home, Zones, Reports, Staff, Profile.
  - Profile opens as a bottom sheet, not a separate page.

== INSPECTOR (4 screens + states) ==
1. Login: title "सफाई निरीक्षण / नगरपालिका खरखौदा", Nagarpalika logo, message "ये सफाई अभियान आपके वार्ड पार्षद द्वारा चलाया जा रहा है। कृपया सहयोग करें।" (on a device where this inspector has logged in before, show his ward councillor's photo and name in this message).
   - Fields: कोड, पासवर्ड. Button: "आगे बढ़ें".
   - NO exit/logout button.
2. Form:
   - Header: name (स्थानीय निरीक्षक), "ज़ोन-3 · वार्ड 3 · कोड A12", "तारीख: DD/MM/YY", small रिपोर्ट icon at top-right.
   - Card title: "सफाई निरीक्षण फॉर्म", with sub-line "नगरपालिका खरखौदा".
   - Fields:
     - "आज का नंबर डालें *" (1–999), with hint "(सफाई कर्मचारी से पूछकर नंबर डालें)".
     - "सफाई प्रकार *": 3 big icon tiles, multi-select with tick badge. झाड़ू = broom icon, नाली = drain icon, कूड़ा उठान = garbage heap with smell lines.
     - "सफाई अंक *": number circles 1–5.
   - Button: "फ़ॉर्म जमा करें".
3. After submit (reassuring, NOT a warning; no orange/red boxes, no big timer). Top to bottom:
   - A large green tick (green circle with white ✓).
   - Bold heading "फॉर्म जमा हो गया है".
   - Summary box: आज का नंबर, सफाई प्रकार, सफाई अंक.
   - Light grey smaller text: "अगर आप चाहें तो 2 मिनट के अंदर बदलाव कर सकते हैं। इसके लिए नीचे वाला बटन दबाएं।"
   - A light, subtle outline button "बदलाव करें" (grey border, grey text, not prominent).
   - Below it, small grey text only: "समय बाकी: 1:45" (live countdown).
   - Pressing "बदलाव करें" reopens the form prefilled. At the top show only a soft light-grey strip with small grey text "बदलाव करके दोबारा जमा करें · समय बाकी: m:ss"; the button reads "दोबारा जमा करें". Directly below that button, in light grey small text: "दोबारा जमा ना करने पर पहले वाला फॉर्म ही फाइनल माना जाएगा।" and under it a small "समय बाकी: m:ss" in RED (#dc2626), same small size (live countdown). Only this edit-form timer is red; the confirmation screen timer stays small grey. The timer keeps running.
   - If the inspector re-submits before the timer ends, the new data replaces the old. Otherwise the first submission stays.
   - At 0:00 show "✅ फॉर्म फाइनल हो गया" (🔒, no edit).
   - Enforce the timer on the server.
4. Report:
   - Stat cards: कुल रिपोर्ट, औसत अंक. Filters: इस हफ़्ते / इस महीने / तारीख चुनें (custom).
   - Table: दिनांक, नंबर, झाड़ू, नाली, कूड़ा उठान, अंक.
   - Button: "नया फॉर्म भरें".

Validation errors (Hindi, red, under the number field):
- Same inspector reuses a number today: "आज इस नंबर पर कार्य चढ़ाया जा चुका है। कृपया दूसरा नंबर डालें।"
- Number not assigned to his zone today: "गलत नंबर। कृपया सही नंबर डालें।"
- No number assigned to his zone today: "आज की तारीख के लिए कोई नंबर assign नहीं हुआ।"
- Out of range: "नंबर 1 से 999 के बीच होना चाहिए।"

== ADMIN ==
1. Login.
   - Username ADMIN, default password Admin@11.
   - Fallback: username PASSWORD + password FORGET also logs in as admin. Do NOT show this on screen. No OTP.
2. Home/Dashboard: header "Admin Dashboard", "Admin - Councillor", date, bell.
   - Stats: Total Zones, Total Inspectors, "Reports This Month (Month)", "Avg Score This Month (Month)".
   - The "Reports This Month" card also shows a % chip with the same formula: month reports ÷ (total inspectors × days in month) × 100, one decimal (demo: 490 ÷ (33 × 31) = 47.9%, red). ≥60% green, <60% red.
   - One large highlighted full-width button "Assign Today's Number". There is no Add Zone button here.
   - Zone cards: name, wards, supervisor, inspector count, Total / This Month / Avg, Active badge, edit icon, View Details.
   - Next to each zone's This Month count show a % chip: % = this month's reports ÷ (inspectors in zone × days in current month) × 100, rounded. It can exceed 100% (e.g. 120%). 60% or above = green (good), below 60% = red. Show % ONLY for This Month, never on the all-time Total. Show a one-line legend above the zone list.
3. Assign Today's Number:
   - Date is auto-filled and locked. Yesterday's numbers are shown for reference only. Today's numbers are grouped by zone, with edit/✕ on each.
   - Form: Select Zone + Number + "+ Assign".
   - Rules:
     - Usually 1 number per zone per day.
     - Admin may add another number to the same zone on the same day ("+ Add another number").
     - A number can't repeat within the same zone on the same date.
     - Different zones may share the same number.
     - Numbers can repeat on later days.
4. Zones tab: zone list + Add/Edit Zone on the same screen.
   - Zone fields: Zone Name, Wards, Supervisor Name + mobile.
   - Inspectors rows: Code (e.g. A09, B21), Name, Mobile, Ward No, delete, "+ Add Inspector". Each row shows a devices-logged-in count.
   - Logout action: admin force-logs-out an inspector.
   - Replace action: same code, new name + mobile. It shows the new password.
   - "Ward Councillors" section on the same Zones screen: one row per ward with Ward No, Councillor Name, Photo upload (crop to circle, preview), Edit and Save. Changing it updates the banner for all inspectors of that ward.
5. Reports tab: toggle "Live | Reports".
   - Live: auto-updating feed (newest first), filtered by All Zones or one zone.
     - Each entry: time, zone + ward, inspector code + name, number, work chips, score, and status "Editable m:ss" or "Final".
     - Summary: today's entries, zones done.
   - Reports: filters Ward, Zone, This Week / This Month / Custom range.
     - Summary cards + ward-wise table, ONE ROW PER DATE + ZONE (no inspector Code column): Date, Zone (with its inspector count), No. (if the zone had 2+ numbers that day, list them all, e.g. "17, 64", and merge all their submissions into the same row), Jhadu %, Nali %, Kuda %, Score (avg).
     - Work % = number of inspectors of that zone who ticked that work that day ÷ zone's TOTAL inspectors × 100 (not ÷ submissions). Example: 10 inspectors, 6 submitted (4 Jhadu+Kuda, 1 Jhadu+Kuda+Nali, 1 Kuda only) → Jhadu 50%, Nali 10%, Kuda 60%. Colours: ≥80% green, 60–79% yellow, <60% red. Show a small legend above the table.
     - Small note under the table: "Last 60 days data shown".
     - Download PDF and Print.
   - No inspector dropdown on the Reports screen. Instead a "See Inspector-wise Report" button opens "Inspector Report": the same layout as the inspector's own report (stat cards Total Reports and Avg Score; This Week / This Month / Custom; table Date, No., Jhadu, Nali, Kooda Uthan, Score). It has a Zone dropdown and an Inspector dropdown (first option "All inspectors" of that zone), plus Download PDF and Print, and the note "Last 60 days data shown".
     - When Inspector = "All inspectors", the table adds a Code column: Date, Code, No., Jhadu, Nali, Kuda, Score (one row per inspector entry of that zone).
     - SORT RULE (Inspector Report / All inspectors): date latest first; within each date sort by inspector code — first the letter prefix alphabetically, then the number numerically (A9/A09 < A10 < A11 < A12 < B09). Use a natural sort (parse prefix + integer), NOT plain string sort, and NEVER by submit time.
     - SORT RULE (Live feed): unchanged — by submit time, newest first.
6. Staff tab (optional module, single screen):
   - Counts: Total / Present / Absent, plus date and search.
   - "Add Staff" inline form: Name, Mobile, Role.
   - List: each staff with zone duty dropdown, Present/Absent toggle, remove.
7. Profile sheet: Change Password, Language (English/हिंदी, admin only), Logout.

== LOGIN / AUTH RULES ==
- The inspector's ward (from his inspector row) decides which councillor photo and name he sees.
- Inspector username = code. Password changes daily = first 2 letters of name in English capitals + today's day of month (Ravi on 02/10/2026 → RA02; on 25/10/26 → RA25).
- The inspector is never logged out automatically and cannot log out himself; the session persists. Only the admin can log him out.
- One code can be logged in on multiple devices at the same time (2–4).
- The one-entry rule applies per inspector code + number + date, across all of that code's devices. Other inspectors in the same zone can each submit once with the same number.
- Replacing an inspector (same code, new name/mobile) logs out all old devices. The new password = first 2 letters of the new name + login day.

== DATA ==
- Tables: report_counters (zone, total_all_time), zones, wards (ward_no, councillor_name, councillor_photo), supervisors, inspectors (code, name, mobile, ward, zone), devices/sessions, daily_numbers (date, zone, number), entries (date, time, inspector, zone, ward, number, jhadu, nali, kooda, score, status editable/final, final_at), staff (name, mobile, role, zone_duty, attendance by date).
- Seed demo data: 3 zones.
  - Zone 1: Ward 4, supervisor Sunil Kumar.
  - Zone 2: Ward 3 & 4, supervisor Anil Sharma.
  - Zone 3: Ward 3, supervisor Ravi Kumar.
  - Inspectors: Zone 1 = 5, Zone 2 = 20, Zone 3 = 8, plus entries (demo only).
- Timezone: Asia/Kolkata. Date format: DD/MM/YY.

== REAL-TIME, SECURITY, DATA RETENTION (must implement) ==
- Real-time with no refresh: use realtime subscriptions (e.g. Supabase Realtime or Firestore onSnapshot listeners). Every inspector submission/edit appears instantly on the admin Dashboard counts and %, Reports table and Live feed without reloading the app.
- Assigned numbers are live instantly: when the admin assigns a number, it is valid for inspectors immediately. Validate the number ON THE SERVER at submit time against the current daily_numbers data (no client cache, no delay). Error messages stay the same.
- Strict data isolation: an inspector's app may only read and write rows for ITS OWN inspector code. Enforce on the server with Row-Level Security policies / security rules keyed to the logged-in inspector code (from the session/JWT claim), not only in the UI. One inspector's entries, reports or name must never appear in another inspector's app, even on a shared device. Admin can read all.
- 60-day retention: a scheduled job runs daily (e.g. pg_cron / scheduled Cloud Function, at 00:30 Asia/Kolkata) and deletes entries older than 60 days. All reports/live/inspector screens show only the last 60 days.
- All-time Total reports: keep a cumulative counter per zone (and overall) in a separate counters table, incremented on each new final entry (atomically, server side). Deletion never reduces it. Dashboard "Total" reads this counter; This Month counts and % come from live entries.
- Formulas recap: Dashboard This Month % = month reports ÷ (zone inspectors × days in month) × 100; ≥60% green, <60% red. Reports work % = inspectors who ticked the work ÷ zone total inspectors × 100; ≥80% green, 60–79% yellow, <60% red.
