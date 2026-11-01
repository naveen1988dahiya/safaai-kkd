alter table app_sessions add column if not exists phone_code text;
alter table app_sessions add column if not exists public_id text;
update app_sessions set public_id = token_hash where public_id is null;
create unique index if not exists app_sessions_public_idx on app_sessions (public_id);
