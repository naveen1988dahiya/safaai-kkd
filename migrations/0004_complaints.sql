create table if not exists complaints (
  id serial primary key,
  inspector_id integer not null references inspectors (id) on delete cascade,
  zone_id integer,
  ward_no integer,
  jhadu boolean not null default false,
  nali boolean not null default false,
  kooda boolean not null default false,
  status text not null default 'open',
  created_at timestamptz not null default now(),
  resolved_at timestamptz,
  seen_at timestamptz
);

create index if not exists complaints_inspector_idx on complaints (inspector_id, created_at desc);
create index if not exists complaints_unseen_idx on complaints (seen_at);
