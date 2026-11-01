create table if not exists sub_admins (
  id serial primary key,
  name text not null,
  username text not null unique,
  password_hash text not null,
  active boolean not null default true,
  perm_attendance text not null default 'none',
  perm_zone text not null default 'none',
  perm_number text not null default 'none',
  perm_staff text not null default 'none',
  perm_councillor text not null default 'none',
  created_at timestamptz not null default now()
);

create table if not exists sub_admin_zones (
  sub_admin_id integer not null references sub_admins (id) on delete cascade,
  zone_id integer not null references zones (id) on delete cascade,
  perm text not null default 'none',
  primary key (sub_admin_id, zone_id)
);

alter table app_sessions add column if not exists sub_admin_id integer references sub_admins (id) on delete cascade;
