-- Nhost PostgreSQL Initialization Schema for uNFT Marketplace

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table for Categories
CREATE TABLE public.categories (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (slug)
);

-- Table for Navigation Menu
CREATE TABLE public.navigation (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (slug)
);

-- Table for Products (NFTs)
CREATE TABLE public.products (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    description text,
    price numeric NOT NULL,
    count integer NOT NULL,
    color text,
    image_id uuid, -- Reference to storage.files(id) but keeping it simple
    category_id uuid REFERENCES public.categories(id),
    user_id uuid REFERENCES auth.users(id),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (slug)
);

-- Note: In the Hasura dashboard, you must track these tables and create the following relationships:
-- 1. Object relationship: product -> category (category_id)
-- 2. Object relationship: product -> user (user_id)
-- 3. Set Permissions:
--    - role "public": SELECT on all tables
--    - role "user": INSERT on products (with check user_id = X-Hasura-User-Id)
