-- Migration Nhost pour Marketplace de Scripts (Abonnement et Liens)

-- 1. Table user_profiles pour suivre l'abonnement
CREATE TABLE public.user_profiles (
    id uuid NOT NULL,
    has_active_subscription boolean DEFAULT false NOT NULL,
    subscription_end_date timestamp with time zone,
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- 2. Ajouter les champs à la table products
ALTER TABLE public.products 
ADD COLUMN is_premium boolean DEFAULT true NOT NULL,
ADD COLUMN file_url text;

-- 3. Mettre à jour les permissions Hasura
-- Note: Dans Hasura, vous devrez configurer les permissions pour 'user_profiles'
-- Le rôle 'public' peut lire. Le rôle 'user' peut lire son propre profil.
