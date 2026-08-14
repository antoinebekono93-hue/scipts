-- Hasura Cron Job : Vérification quotidienne des abonnements expirés
-- À exécuter dans Hasura Console > Data > SQL

-- 1. Créer la fonction de nettoyage
CREATE OR REPLACE FUNCTION public.expire_subscriptions()
RETURNS TRIGGER LANGUAGE plpgsql
AS $$
BEGIN
  -- Mettre à jour les abonnements expirés
  UPDATE public.user_profiles
  SET has_active_subscription = false,
      subscription_plan = 'free'
  WHERE has_active_subscription = true
    AND subscription_end_date IS NOT NULL
    AND subscription_end_date < now();
  
  RETURN NULL;
END;
$$;

-- 2. Alternative : Fonction qui retourne le nombre d'expirés (pour monitoring)
CREATE OR REPLACE FUNCTION public.get_expired_count()
RETURNS INTEGER LANGUAGE plpgsql
AS $$
DECLARE
  expired_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO expired_count
  FROM public.user_profiles
  WHERE has_active_subscription = true
    AND subscription_end_date IS NOT NULL
    AND subscription_end_date < now();
  
  RETURN expired_count;
END;
$$;

-- 3. Alternative : Fonction complète avec log
CREATE OR REPLACE FUNCTION public.expire_subscriptions_with_log()
RETURNS VOID LANGUAGE plpgsql
AS $$
DECLARE
  expired_users RECORD;
BEGIN
  FOR expired_users IN
    SELECT id, subscription_plan, subscription_end_date
    FROM public.user_profiles
    WHERE has_active_subscription = true
      AND subscription_end_date IS NOT NULL
      AND subscription_end_date < now()
  LOOP
    -- Log avant mise à jour
    RAISE NOTICE 'Expiring subscription for user %: plan=%, end_date=%', 
      expired_users.id, expired_users.subscription_plan, expired_users.subscription_end_date;
    
    UPDATE public.user_profiles
    SET has_active_subscription = false,
        subscription_plan = 'free'
    WHERE id = expired_users.id;
  END LOOP;
END;
$$;

-- 4. Dans Hasura Console > Events > Cron Triggers > Create:
-- Name: daily_subscription_expiry_check
-- Webhook: https://VOTRE-HASURA-ENDPOINT/v1/graphql (ou utilisez Scheduled Triggers)
-- Schedule: 0 2 * * * (tous les jours à 2h du matin UTC)
-- Payload:
/*
{
  "query": "mutation { expire_subscriptions_with_log() }"
}
*/

-- OU utiliser Hasura Scheduled Triggers (plus simple):
-- Settings > Scheduled Triggers > Add
-- Name: expire_subscriptions_daily
-- Cron: "0 2 * * *"
-- Webhook URL: https://VOTRE-PROJET.hasura.app/v1/graphql
-- Headers: { "x-hasura-admin-secret": "VOTRE_ADMIN_SECRET" }
-- Body:
/*
{
  "query": "mutation { expire_subscriptions_with_log() }"
}
*/

-- 5. Vérification manuelle (pour test):
-- SELECT * FROM public.expire_subscriptions_with_log();
-- SELECT public.get_expired_count();

-- 6. Index déjà créé dans migration_scripts.sql:
-- CREATE INDEX IF NOT EXISTS idx_user_profiles_sub_end 
-- ON public.user_profiles(subscription_end_date) 
-- WHERE has_active_subscription = true;