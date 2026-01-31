-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Plushies Table
create table public.plushies (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  image_url text not null,
  description text,
  tags text[],
  mood_log jsonb default '[]'::jsonb,
  date_added timestamp with time zone default timezone('utc'::text, now()),
  is_public boolean default true,
  "order" integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Confessions Table
create type confession_status as enum ('pending', 'approved', 'rejected');

create table public.confessions (
  id uuid default uuid_generate_v4() primary key,
  body_text varchar(500) not null,
  image_url text,
  is_anonymous boolean default true,
  status confession_status default 'pending',
  flag_reason text,
  moderator_note text,
  reactions jsonb default '{"lol": 0, "same": 0, "yikes": 0}'::jsonb,
  reports_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  reviewed_at timestamp with time zone,
  reviewed_by text
);

-- Stories Table
create table public.stories (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text not null unique,
  excerpt text,
  body_markdown text not null,
  cover_image_url text,
  gallery_urls text[],
  tags text[],
  published_at timestamp with time zone,
  is_draft boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Songs Table
create table public.songs (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  artist text,
  file_url text not null,
  cover_image_url text,
  duration_seconds integer,
  is_public boolean default true,
  "order" integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Social Links Table
create table public.social_links (
  id uuid default uuid_generate_v4() primary key,
  platform_name text not null,
  handle text not null,
  url text not null,
  display_order integer default 0
);

-- Enable Row Level Security (RLS)
alter table public.plushies enable row level security;
alter table public.confessions enable row level security;
alter table public.stories enable row level security;
alter table public.songs enable row level security;
alter table public.social_links enable row level security;

-- Create Policies (Public Read, Admin Write)

-- Allow public read access
create policy "Public can view active plushies" on public.plushies for select using (is_public = true);
create policy "Public can view approved confessions" on public.confessions for select using (status = 'approved');
create policy "Anyone can submit confession" on public.confessions for insert with check (true);
create policy "Public can view stories" on public.stories for select using (is_draft = false);
create policy "Public can view songs" on public.songs for select using (is_public = true);
create policy "Public can view social links" on public.social_links for select using (true);
