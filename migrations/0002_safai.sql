create table if not exists wards (
  ward_no integer primary key,
  councillor_name text not null default '',
  councillor_photo text,
  updated_at timestamptz not null default now()
);

create table if not exists zones (
  id serial primary key,
  name text not null,
  supervisor_name text not null default '',
  supervisor_mobile text not null default '',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists zone_wards (
  zone_id integer not null references zones (id) on delete cascade,
  ward_no integer not null,
  primary key (zone_id, ward_no)
);

create table if not exists inspectors (
  id serial primary key,
  code text not null unique,
  name text not null,
  mobile text not null default '',
  ward_no integer,
  zone_id integer references zones (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists daily_numbers (
  id serial primary key,
  zone_id integer not null references zones (id) on delete cascade,
  work_date date not null,
  number integer not null,
  unique (zone_id, work_date, number)
);

create table if not exists entries (
  id serial primary key,
  inspector_id integer not null references inspectors (id) on delete cascade,
  zone_id integer not null,
  ward_no integer,
  work_date date not null,
  number integer not null,
  jhadu boolean not null default false,
  nali boolean not null default false,
  kooda boolean not null default false,
  score integer not null,
  status text not null default 'editable',
  submitted_at timestamptz not null default now(),
  final_at timestamptz,
  unique (inspector_id, work_date, number)
);

create index if not exists entries_date_idx on entries (work_date desc);
create index if not exists entries_zone_idx on entries (zone_id, work_date);

create table if not exists report_counters (
  zone_id integer primary key references zones (id) on delete cascade,
  total_all_time integer not null default 0
);

create table if not exists staff (
  id serial primary key,
  name text not null,
  mobile text not null default '',
  role text not null default '',
  zone_id integer references zones (id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists staff_attendance (
  staff_id integer not null references staff (id) on delete cascade,
  work_date date not null,
  present boolean not null,
  primary key (staff_id, work_date)
);

create table if not exists admin_account (
  id integer primary key,
  username text not null,
  password_hash text not null
);

create table if not exists app_sessions (
  token_hash text primary key,
  role text not null,
  inspector_id integer references inspectors (id) on delete cascade,
  user_agent text,
  created_at timestamptz not null default now(),
  last_seen timestamptz not null default now()
);

create index if not exists app_sessions_inspector_idx on app_sessions (inspector_id);
