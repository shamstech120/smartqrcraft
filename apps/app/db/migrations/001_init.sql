-- SmartQRCraft app database (SQLite). The same SQL runs on Cloudflare D1 later.

create table users (
  id            integer primary key autoincrement,
  email         text not null unique,
  created_at    integer not null,
  last_login_at integer,
  is_admin      integer not null default 0,
  banned        integer not null default 0
);

-- one-time sign-in links (only a hash of the token is stored)
create table login_tokens (
  token_hash text primary key,
  email      text not null,
  expires_at integer not null,
  used       integer not null default 0
);

create table sessions (
  token_hash text primary key,
  user_id    integer not null references users(id) on delete cascade,
  created_at integer not null,
  expires_at integer not null
);
create index sessions_user on sessions(user_id);

-- dynamic QR codes: the printed QR always points to /r/<slug>, the destination can change
create table qrs (
  id          integer primary key autoincrement,
  user_id     integer not null references users(id) on delete cascade,
  slug        text not null unique,
  label       text not null default '',
  destination text not null,
  active      integer not null default 1,
  created_at  integer not null,
  updated_at  integer not null
);
create index qrs_user on qrs(user_id);

-- no IP address is stored: only country and device class
create table scans (
  id     integer primary key autoincrement,
  qr_id  integer not null references qrs(id) on delete cascade,
  ts     integer not null,
  country text,
  device  text,
  is_bot  integer not null default 0
);
create index scans_qr_ts on scans(qr_id, ts);

-- rate limiting for sign-in requests
create table auth_attempts (
  id  integer primary key autoincrement,
  key text not null,
  ts  integer not null
);
create index auth_attempts_key_ts on auth_attempts(key, ts);

-- destinations that must never be used (scams, phishing)
create table blocked_domains (
  domain     text primary key,
  reason     text,
  created_at integer not null
);

create table audit_log (
  id       integer primary key autoincrement,
  ts       integer not null,
  admin_id integer,
  action   text not null,
  target   text
);
