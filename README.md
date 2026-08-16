# Script Marketplace

Marketplace de scripts PHP, templates HTML, plugins WordPress, modules WHMCS et applications web. Backend **Nhost** (PostgreSQL + GraphQL + Storage + Auth), paiements par abonnement **Flutterwave**, checkout **Stripe** pour les achats unitaires, déployé sur **Vercel**.

## Fonctionnalités

- Catalogue de produits filtrable (recherche, couleur, prix, catégorie)
- Abonnement 3 niveaux : Gratuit / Trimestriel 16$ / Annuel 25$ (Flutterwave)
- Téléchargements protégés : `/api/download/[slug]` vérifie le token + l'abonnement actif avant de servir le fichier (streaming, proxy des URLs)
- Panier + checkout Stripe
- Page produit avec galerie d'images
- Admin `/admin/products` : CRUD produits, upload d'images (redimensionnement + filigrane côté client), galerie multi-images, badge Premium/Gratuit
- Auth Nhost (email/password), cron d'expiration des abonnements (Vercel)

## Stack

- [Next.js](https://nextjs.org/) 14 (App Router / Pages Router)
- [Nhost](https://nhost.io/) : GraphQL, Auth, Storage
- [Flutterwave](https://www.flutterwave.com/) : abonnements
- [Stripe](https://stripe.com/) : checkout panier
- [sharp](https://sharp.pixelplumbing.com/), Sass, react-slick, react-hot-toast

## Démarrage

```bash
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

### Variables d'environnement

Copiez `.env.example` vers `.env.local` et remplissez les valeurs :

```bash
# .env.local
NEXT_PUBLIC_NHOST_SUBDOMAIN=dspprxgtnymanbtxneyo
NEXT_PUBLIC_NHOST_REGION=us-east-1
NHOST_ADMIN_SECRET=ton_admin_secret_nhost   # requis pour l'admin et les webhooks

NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=
CRON_SECRET=

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
```

- **Nhost** : dashboard Nhost → Settings → Secrets & Keys
- **Flutterwave** : dashboard → Settings → API keys (clé publique)
- **Stripe** : dashboard → Developers → API keys

## Base de données

- `init_schema.sql` : schéma initial (tables `products`, `categories`, `user_profiles`)
- `migration_scripts.sql` : migrations et permissions Hasura
- `hasura_cron_subscription_check.sql` : cron d'expiration des abonnements (option Hasura)
- `scripts/generate-products-seed.js` → `seed/seed_products.sql` : 200 produits de démo

## Déploiement sur Vercel

1. Poussez le repo sur GitHub
2. Importez-le dans [Vercel](https://vercel.com)
3. Ajoutez les variables d'environnement ci-dessus (projet → Settings → Environment Variables)
4. Le cron `/api/cron/expire-subscriptions` est déjà déclaré dans `vercel.json` (02:00 UTC)

## Licences

[MIT](LICENSE)
