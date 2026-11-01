alter table staff_attendance add column if not exists zone_id integer references zones (id) on delete set null;
