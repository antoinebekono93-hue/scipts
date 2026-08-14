-- Migration Nhost pour Marketplace de Scripts (Abonnement et Liens)

-- 1. Table user_profiles pour suivre l'abonnement
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY,
  has_active_subscription BOOLEAN DEFAULT false,
  subscription_end_date TIMESTAMPTZ,
  subscription_plan TEXT DEFAULT 'free' CHECK (subscription_plan IN ('free', 'quarterly', 'annual')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Si la table existe déjà, on ajoute/maj les colonnes :
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS has_active_subscription BOOLEAN DEFAULT false;
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS subscription_end_date TIMESTAMPTZ;
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS subscription_plan TEXT DEFAULT 'free';

-- Ajouter contrainte CHECK pour les plans valides
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.check_constraints 
    WHERE constraint_name = 'user_profiles_subscription_plan_check'
  ) THEN
    ALTER TABLE public.user_profiles 
    ADD CONSTRAINT user_profiles_subscription_plan_check 
    CHECK (subscription_plan IN ('free', 'quarterly', 'annual'));
  END IF;
END $$;

-- Index pour webhook renewal / cron job expiration
CREATE INDEX IF NOT EXISTS idx_user_profiles_sub_end 
ON public.user_profiles(subscription_end_date) 
WHERE has_active_subscription = true;

-- 2. Ajouter les champs à la table products
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS is_premium boolean DEFAULT true NOT NULL,
ADD COLUMN IF NOT EXISTS file_url text;

-- 3. Mettre à jour les permissions Hasura
-- Note: Dans Hasura, vous devrez configurer les permissions pour 'user_profiles'
-- Le rôle 'public' peut lire. Le rôle 'user' peut lire son propre profil.
