-- Plans, password-protected and expiring QR codes, city-level scan stats, team members.

-- plan: free | pro | business. plan_until: unix time the paid plan ends (null = no end date).
alter table users add column plan text not null default 'free';
alter table users add column plan_until integer;

-- password_hash: "salt:scrypt-hash" (never the password). expires_at: unix time. max_scans: stop after this many scans.
alter table qrs add column password_hash text;
alter table qrs add column expires_at integer;
alter table qrs add column max_scans integer;

-- city comes from the hosting provider's location header (Cloudflare cf-ipcity). Still no IP address.
alter table scans add column city text;

-- a team is one owner's QR codes shared with other accounts. member_id is filled in when the invited
-- email signs in, so people can be invited before they have an account.
create table team_members (
  id           integer primary key autoincrement,
  owner_id     integer not null references users(id) on delete cascade,
  member_email text not null,
  member_id    integer references users(id) on delete cascade,
  role         text not null default 'editor',
  created_at   integer not null,
  unique (owner_id, member_email)
);
create index team_members_member on team_members(member_id);
