-- ============================================================
-- SEED: 200 produits premium ThemeForest/Codecanyon
-- Catégories: wordpress (50), whmcs (50), scripts (50), applications (50)
-- Généré le 2026-08-15T00:06:43.797Z
-- Exécuter dans Hasura Console > Data > SQL
-- ============================================================

-- ================== WORDPRESS ==================
-- Avada
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Avada', 'avada', 'Thème WordPress polyvalent avec builder', 69, 3.8, '#e74c3c', c.id, NULL, true, NULL, '{"demo_url":"https://avada.theme-fusion.com/","is_premium":true,"sales":850000,"rating":4.8,"version":"9.3.1","last_updated":"2026-01-15","tags":["wordpress","premium","avada"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- X Theme
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'X Theme', 'x-theme', 'Thème WordPress ultime avec Stack Builder', 59, 3.2, '#3498db', c.id, NULL, true, NULL, '{"demo_url":"https://theme.co/x/","is_premium":true,"sales":320000,"rating":4.7,"version":"10.1.0","last_updated":"2026-01-15","tags":["wordpress","premium","x-theme"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Bridge
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Bridge', 'bridge', 'Thème WordPress créatif multi-concept', 59, 2.9, '#9b59b6', c.id, NULL, true, NULL, '{"demo_url":"https://bridge.qodeinteractive.com/","is_premium":true,"sales":450000,"rating":4.6,"version":"30.2.1","last_updated":"2026-01-15","tags":["wordpress","premium","bridge"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Enfold
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Enfold', 'enfold', 'Thème WordPress responsive intuitif', 59, 2.4, '#2ecc71', c.id, NULL, true, NULL, '{"demo_url":"https://kriesi.at/themes/enfold/","is_premium":true,"sales":280000,"rating":4.7,"version":"5.6.5","last_updated":"2026-01-15","tags":["wordpress","premium","enfold"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Jupiter
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Jupiter', 'jupiter', 'Thème WordPress multipurpose pro', 59, 2.2, '#f39c12', c.id, NULL, true, NULL, '{"demo_url":"https://jupiter.artbees.net/","is_premium":true,"sales":190000,"rating":4.5,"version":"6.10.6","last_updated":"2026-01-15","tags":["wordpress","premium","jupiter"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- The7
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'The7', 'the7', 'Thème WordPress pour entreprises', 39, 1.8, '#1abc9c', c.id, NULL, true, NULL, '{"demo_url":"https://the7.io/","is_premium":true,"sales":150000,"rating":4.6,"version":"12.2.1","last_updated":"2026-01-15","tags":["wordpress","premium","the7"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- WoodMart
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WoodMart', 'woodmart', 'Thème WordPress WooCommerce', 59, 2.5, '#e67e22', c.id, NULL, true, NULL, '{"demo_url":"https://woodmart.xtemos.com/","is_premium":true,"sales":210000,"rating":4.8,"version":"8.1.2","last_updated":"2026-01-15","tags":["wordpress","premium","woodmart"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Kleo
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Kleo', 'kleo', 'Thème WordPress communauté sociale', 59, 1.6, '#e74c3c', c.id, NULL, true, NULL, '{"demo_url":"https://demo2wpopal.b-cdn.net/kleo/","is_premium":true,"sales":90000,"rating":4.4,"version":"5.3.2","last_updated":"2026-01-15","tags":["wordpress","premium","kleo"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Salient
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Salient', 'salient', 'Thème WordPress créatif avec Nectar Slider', 60, 3, '#3498db', c.id, NULL, true, NULL, '{"demo_url":"https://themenectar.com/salient/","is_premium":true,"sales":130000,"rating":4.7,"version":"17.2.0","last_updated":"2026-01-15","tags":["wordpress","premium","salient"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Flavor
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Flavor', 'flavor', 'Thème WordPress restaurant & food', 49, 1.4, '#e74c3c', c.id, NULL, true, NULL, '{"demo_url":"https://flavor.groovydev.com/","is_premium":true,"sales":45000,"rating":4.5,"version":"2.8.0","last_updated":"2026-01-15","tags":["wordpress","premium","flavor"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- BeTheme
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'BeTheme', 'betheme', 'Thème WordPress multipurpose 600+ démos', 59, 3.5, '#8e44ad', c.id, NULL, true, NULL, '{"demo_url":"https://themes.muffingroup.com/be/medicenter/","is_premium":true,"sales":260000,"rating":4.6,"version":"27.4.1","last_updated":"2026-01-15","tags":["wordpress","premium","betheme"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Divi
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Divi', 'divi', 'Thème WordPress builder drag & drop', 89, 4.2, '#2ecc71', c.id, NULL, true, NULL, '{"demo_url":"https://www.elegantthemes.com/demo/","is_premium":true,"sales":890000,"rating":4.7,"version":"4.27.4","last_updated":"2026-01-15","tags":["wordpress","premium","divi"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Newspaper
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Newspaper', 'newspaper', 'Thème WordPress journal & magazine', 59, 2.7, '#c0392b', c.id, NULL, true, NULL, '{"demo_url":"https://newspaper.tagdiv.com/","is_premium":true,"sales":310000,"rating":4.5,"version":"12.6.9","last_updated":"2026-01-15","tags":["wordpress","premium","newspaper"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Uncode
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Uncode', 'uncode', 'Thème WordPress créatif WooCommerce', 59, 2.1, '#16a085', c.id, NULL, true, NULL, '{"demo_url":"https://www.undsgn.com/uncode/","is_premium":true,"sales":75000,"rating":4.6,"version":"2.9.4","last_updated":"2026-01-15","tags":["wordpress","premium","uncode"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Betheme
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Betheme', 'betheme-2', 'Thème WordPress avec 700+ pré-fabriqués', 59, 3.4, '#d35400', c.id, NULL, true, NULL, '{"demo_url":"https://themes.muffingroup.com/be/creator/","is_premium":true,"sales":240000,"rating":4.6,"version":"27.3.2","last_updated":"2026-01-15","tags":["wordpress","premium","betheme"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Impreza
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Impreza', 'impreza', 'Thème WordPress rapide et flexible', 59, 1.9, '#34495e', c.id, NULL, true, NULL, '{"demo_url":"https://impreza.us-themes.com/","is_premium":true,"sales":98000,"rating":4.7,"version":"8.36.1","last_updated":"2026-01-15","tags":["wordpress","premium","impreza"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Stockholm
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Stockholm', 'stockholm', 'Thème WordPress élégant et moderne', 59, 1.5, '#7f8c8d', c.id, NULL, true, NULL, '{"demo_url":"https://stockholm.qodeinteractive.com/","is_premium":true,"sales":62000,"rating":4.4,"version":"5.7.6","last_updated":"2026-01-15","tags":["wordpress","premium","stockholm"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Kalium
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Kalium', 'kalium', 'Thème WordPress créatif portfolio', 59, 1.7, '#e84393', c.id, NULL, true, NULL, '{"demo_url":"https://kalium.laborator.co/","is_premium":true,"sales":85000,"rating":4.6,"version":"3.10.1","last_updated":"2026-01-15","tags":["wordpress","premium","kalium"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Listingo
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Listingo', 'listingo', 'Thème WordPress annuaire d entreprises', 59, 1.3, '#27ae60', c.id, NULL, true, NULL, '{"demo_url":"https://listingo.wpbeaveraddons.com/","is_premium":true,"sales":38000,"rating":4.3,"version":"4.0.4","last_updated":"2026-01-15","tags":["wordpress","premium","listingo"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Seyo
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Seyo', 'seyo', 'Thème WordPress annuaire et listing', 49, 1.2, '#f1c40f', c.id, NULL, true, NULL, '{"demo_url":"https://seyo.wpdesk.net/","is_premium":true,"sales":28000,"rating":4.3,"version":"1.9.0","last_updated":"2026-01-15","tags":["wordpress","premium","seyo"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- MasterStudy
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'MasterStudy', 'masterstudy', 'Thème WordPress LMS éducation', 59, 1.8, '#8e44ad', c.id, NULL, true, NULL, '{"demo_url":"https://masterstudy.stylemixthemes.com/","is_premium":true,"sales":54000,"rating":4.5,"version":"4.8.6","last_updated":"2026-01-15","tags":["wordpress","premium","masterstudy"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Edumy
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Edumy', 'edumy', 'Thème WordPress éducation en ligne', 59, 1.1, '#2c3e50', c.id, NULL, true, NULL, '{"demo_url":"https://edumy.demo.utheme.net/","is_premium":true,"sales":22000,"rating":4.2,"version":"5.0.0","last_updated":"2026-01-15","tags":["wordpress","premium","edumy"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Doctor Directory
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Doctor Directory', 'doctor-directory', 'Thème WordPress médecin santé', 59, 1.2, '#16a085', c.id, NULL, true, NULL, '{"demo_url":"https://doctordirectory.demo-3.designinvento.net/","is_premium":true,"sales":25000,"rating":4.3,"version":"3.5.0","last_updated":"2026-01-15","tags":["wordpress","premium","doctor-directory"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Housico
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Housico', 'housico', 'Thème WordPress immobilier', 59, 1, '#e67e22', c.id, NULL, true, NULL, '{"demo_url":"https://housico.wpcontent.net/","is_premium":true,"sales":19000,"rating":4.2,"version":"2.6.0","last_updated":"2026-01-15","tags":["wordpress","premium","housico"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Rey
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Rey', 'rey', 'Thème WordPress WooCommerce avancé', 59, 1.6, '#d35400', c.id, NULL, true, NULL, '{"demo_url":"https://reytheme.com/","is_premium":true,"sales":48000,"rating":4.7,"version":"3.4.1","last_updated":"2026-01-15","tags":["wordpress","premium","rey"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Ozean
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Ozean', 'ozean', 'Thème WordPress booking hôtel', 59, 1, '#3498db', c.id, NULL, true, NULL, '{"demo_url":"https://ozean.qodeinteractive.com/","is_premium":true,"sales":21000,"rating":4.4,"version":"2.9.0","last_updated":"2026-01-15","tags":["wordpress","premium","ozean"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Sydney
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Sydney', 'sydney', 'Thème WordPress entreprise gratos pro', 59, 1.4, '#f39c12', c.id, NULL, true, NULL, '{"demo_url":"https://demo.athemes.com/sydney/","is_premium":true,"sales":67000,"rating":4.5,"version":"2.3.1","last_updated":"2026-01-15","tags":["wordpress","premium","sydney"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Consulting
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Consulting', 'consulting', 'Thème WordPress conseil & finance', 59, 1.5, '#2c3e50', c.id, NULL, true, NULL, '{"demo_url":"https://consulting.stylemixthemes.com/","is_premium":true,"sales":45000,"rating":4.4,"version":"7.2.3","last_updated":"2026-01-15","tags":["wordpress","premium","consulting"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Classima
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Classima', 'classima', 'Thème WordPress petites annonces', 59, 1.2, '#c0392b', c.id, NULL, true, NULL, '{"demo_url":"https://classima.wp-royal-themes.com/","is_premium":true,"sales":33000,"rating":4.4,"version":"1.7.2","last_updated":"2026-01-15","tags":["wordpress","premium","classima"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Golf Club
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Golf Club', 'golf-club', 'Thème WordPress golf sport', 49, 0.8, '#27ae60', c.id, NULL, true, NULL, '{"demo_url":"https://golfclub.qodeinteractive.com/","is_premium":true,"sales":9000,"rating":4.3,"version":"2.6.1","last_updated":"2026-01-15","tags":["wordpress","premium","golf-club"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Lawyer
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Lawyer', 'lawyer', 'Thème WordPress cabinet juridique', 49, 0.9, '#7f8c8d', c.id, NULL, true, NULL, '{"demo_url":"https://lawyer.demo-15.designinvento.net/","is_premium":true,"sales":14000,"rating":4.2,"version":"3.1.0","last_updated":"2026-01-15","tags":["wordpress","premium","lawyer"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Bosto
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Bosto', 'bosto', 'Thème WordPress blog créatif', 49, 1.1, '#e84393', c.id, NULL, true, NULL, '{"demo_url":"https://bosto.qodeinteractive.com/","is_premium":true,"sales":26000,"rating":4.4,"version":"2.5.2","last_updated":"2026-01-15","tags":["wordpress","premium","bosto"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Banca
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Banca', 'banca', 'Thème WordPress banque & finance', 49, 0.9, '#16a085', c.id, NULL, true, NULL, '{"demo_url":"https://banca.theme9.com/","is_premium":true,"sales":15000,"rating":4.3,"version":"3.2.0","last_updated":"2026-01-15","tags":["wordpress","premium","banca"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- AutoZone
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'AutoZone', 'autozone', 'Thème WordPress garage auto', 49, 0.8, '#d35400', c.id, NULL, true, NULL, '{"demo_url":"https://autozone.wp-content.net/","is_premium":true,"sales":18000,"rating":4.2,"version":"3.4.1","last_updated":"2026-01-15","tags":["wordpress","premium","autozone"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Futurio
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Futurio', 'futurio', 'Thème WordPress blog & ecommerce', 49, 1.3, '#3498db', c.id, NULL, true, NULL, '{"demo_url":"https://futurio.futurethemes.com/","is_premium":true,"sales":31000,"rating":4.5,"version":"1.6.1","last_updated":"2026-01-15","tags":["wordpress","premium","futurio"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Hotel Master
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Hotel Master', 'hotel-master', 'Thème WordPress hôtellerie', 59, 1.2, '#e67e22', c.id, NULL, true, NULL, '{"demo_url":"https://hotelmaster.wpdesk.net/","is_premium":true,"sales":27000,"rating":4.3,"version":"4.7.0","last_updated":"2026-01-15","tags":["wordpress","premium","hotel-master"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Mayer
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Mayer', 'mayer', 'Thème WordPress magazine mode', 49, 0.9, '#c0392b', c.id, NULL, true, NULL, '{"demo_url":"https://mayer.qodeinteractive.com/","is_premium":true,"sales":12000,"rating":4.2,"version":"2.4.0","last_updated":"2026-01-15","tags":["wordpress","premium","mayer"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Parking
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Parking', 'parking', 'Thème WordPress parking gestion', 49, 0.7, '#34495e', c.id, NULL, true, NULL, '{"demo_url":"https://parking.wp-content.net/","is_premium":true,"sales":6000,"rating":4.1,"version":"2.2.0","last_updated":"2026-01-15","tags":["wordpress","premium","parking"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Eventure
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Eventure', 'eventure', 'Thème WordPress événementiel', 59, 1.1, '#9b59b6', c.id, NULL, true, NULL, '{"demo_url":"https://eventure.demo.gavias.com/","is_premium":true,"sales":23000,"rating":4.3,"version":"3.5.0","last_updated":"2026-01-15","tags":["wordpress","premium","eventure"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Melody
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Melody', 'melody', 'Thème WordPress musique audio', 49, 0.8, '#8e44ad', c.id, NULL, true, NULL, '{"demo_url":"https://melody.qodeinteractive.com/","is_premium":true,"sales":11000,"rating":4.2,"version":"2.3.0","last_updated":"2026-01-15","tags":["wordpress","premium","melody"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Craft
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Craft', 'craft', 'Thème WordPress portfolio créatif', 49, 1, '#2ecc71', c.id, NULL, true, NULL, '{"demo_url":"https://craft.demo-5.designinvento.net/","is_premium":true,"sales":20000,"rating":4.4,"version":"3.1.1","last_updated":"2026-01-15","tags":["wordpress","premium","craft"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Ziston
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Ziston', 'ziston', 'Thème WordPress jeux vidéo', 59, 0.9, '#e74c3c', c.id, NULL, true, NULL, '{"demo_url":"https://ziston.qodeinteractive.com/","is_premium":true,"sales":8000,"rating":4.1,"version":"2.7.0","last_updated":"2026-01-15","tags":["wordpress","premium","ziston"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Invetex
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Invetex', 'invetex', 'Thème WordPress finance trading', 59, 0.8, '#1abc9c', c.id, NULL, true, NULL, '{"demo_url":"https://invetex.qodeinteractive.com/","is_premium":true,"sales":7000,"rating":4.2,"version":"2.5.0","last_updated":"2026-01-15","tags":["wordpress","premium","invetex"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Medical
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Medical', 'medical', 'Thème WordPress clinique médicale', 49, 1, '#16a085', c.id, NULL, true, NULL, '{"demo_url":"https://medical.stylemixthemes.com/","is_premium":true,"sales":29000,"rating":4.3,"version":"3.8.1","last_updated":"2026-01-15","tags":["wordpress","premium","medical"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Emag
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Emag', 'emag', 'Thème WordPress ecommerce multimarché', 59, 0.8, '#f39c12', c.id, NULL, true, NULL, '{"demo_url":"https://emag.wp-content.net/","is_premium":true,"sales":5000,"rating":4.1,"version":"2.4.0","last_updated":"2026-01-15","tags":["wordpress","premium","emag"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Travel Tour
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Travel Tour', 'travel-tour', 'Thème WordPress agence voyage', 49, 1.1, '#3498db', c.id, NULL, true, NULL, '{"demo_url":"https://traveltour.wp-content.net/","is_premium":true,"sales":24000,"rating":4.3,"version":"3.2.0","last_updated":"2026-01-15","tags":["wordpress","premium","travel-tour"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Ultimate Addons Elementor
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Ultimate Addons Elementor', 'ultimate-addons-elementor', 'Plugin 60+ widgets Elementor', 59, 3.6, '#e84393', c.id, NULL, true, NULL, '{"demo_url":"https://ultimateelementor.com/","is_premium":true,"sales":52000,"rating":4.6,"version":"1.38.1","last_updated":"2026-01-15","tags":["wordpress","premium","ultimate-addons-elementor"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- MasterSlider
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'MasterSlider', 'masterslider', 'Plugin slider professionnel', 24, 1.2, '#27ae60', c.id, NULL, true, NULL, '{"demo_url":"https://masterslider.com/","is_premium":true,"sales":78000,"rating":4.5,"version":"3.9.0","last_updated":"2026-01-15","tags":["wordpress","premium","masterslider"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- LayerSlider
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'LayerSlider', 'layerslider', 'Plugin slider animation premium', 25, 1.5, '#8e44ad', c.id, NULL, true, NULL, '{"demo_url":"https://layerslider.com/","is_premium":true,"sales":98000,"rating":4.6,"version":"7.11.3","last_updated":"2026-01-15","tags":["wordpress","premium","layerslider"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- Flavor Restaurant
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Flavor Restaurant', 'flavor-restaurant', 'Plugin réservation restaurant', 19, 0.5, '#e74c3c', c.id, NULL, true, NULL, '{"demo_url":"https://flavor.groovydev.com/","is_premium":true,"sales":4500,"rating":4,"version":"1.6.0","last_updated":"2026-01-15","tags":["wordpress","premium","flavor-restaurant"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'wordpress';

-- ================== WHMCS ==================
-- WHMCS Client Area
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS Client Area', 'whmcs-client-area', 'Module espace client moderne pour WHMCS', 49, 2.1, '#3498db', c.id, NULL, true, NULL, '{"demo_url":"https://whmcs.visual-lines.com/","is_premium":true,"sales":12000,"rating":4.5,"version":"3.2.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-client-area"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS Clean Theme
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS Clean Theme', 'whmcs-clean-theme', 'Thème client propre et responsive', 39, 1.8, '#2ecc71', c.id, NULL, true, NULL, '{"demo_url":"https://whmcs.weeblr.com/","is_premium":true,"sales":8900,"rating":4.4,"version":"2.9.1","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-clean-theme"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS DirectAdmin
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS DirectAdmin', 'whmcs-directadmin', 'Module DirectAdmin pour WHMCS', 59, 1.6, '#e67e22', c.id, NULL, true, NULL, '{"demo_url":"https://directadmin.com/whmcs/","is_premium":true,"sales":7600,"rating":4.5,"version":"2.8.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-directadmin"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS cPanel Manager
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS cPanel Manager', 'whmcs-cpanel-manager', 'Gestion avancée cPanel dans WHMCS', 65, 1.9, '#c0392b', c.id, NULL, true, NULL, '{"demo_url":"https://cpanelmanager.com/","is_premium":true,"sales":9800,"rating":4.6,"version":"3.5.1","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-cpanel-manager"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS VPS Manager
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS VPS Manager', 'whmcs-vps-manager', 'Module gestion serveurs VPS', 69, 1.7, '#8e44ad', c.id, NULL, true, NULL, '{"demo_url":"https://vpsmanager.com/whmcs/","is_premium":true,"sales":6700,"rating":4.4,"version":"3.1.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-vps-manager"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS Plesk Module
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS Plesk Module', 'whmcs-plesk-module', 'Module Plesk extension pour WHMCS', 59, 1.5, '#16a085', c.id, NULL, true, NULL, '{"demo_url":"https://plesk.com/whmcs/","is_premium":true,"sales":5400,"rating":4.3,"version":"2.6.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-plesk-module"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS Fraud Protection
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS Fraud Protection', 'whmcs-fraud-protection', 'Module anti-fraude et vérification', 49, 1.4, '#e74c3c', c.id, NULL, true, NULL, '{"demo_url":"https://fraud.whmcsmodules.com/","is_premium":true,"sales":6200,"rating":4.2,"version":"2.4.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-fraud-protection"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS Ticket Fusion
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS Ticket Fusion', 'whmcs-ticket-fusion', 'Module fusion tickets support', 39, 1.2, '#f39c12', c.id, NULL, true, NULL, '{"demo_url":"https://ticketfusion.com/","is_premium":true,"sales":4100,"rating":4.3,"version":"1.9.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-ticket-fusion"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS Cron Manager
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS Cron Manager', 'whmcs-cron-manager', 'Module gestion cron jobs avancée', 29, 1.1, '#1abc9c', c.id, NULL, true, NULL, '{"demo_url":"https://cronmanager.com/","is_premium":true,"sales":3500,"rating":4.1,"version":"1.7.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-cron-manager"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS SMS Gateway
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS SMS Gateway', 'whmcs-sms-gateway', 'Module SMS notifications & OTP', 45, 1.6, '#2c3e50', c.id, NULL, true, NULL, '{"demo_url":"https://smsgateway.whmcs/","is_premium":true,"sales":8900,"rating":4.5,"version":"3.4.2","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-sms-gateway"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS WhatsApp Module
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS WhatsApp Module', 'whmcs-whatsapp-module', 'Module notification WhatsApp', 39, 1.3, '#27ae60', c.id, NULL, true, NULL, '{"demo_url":"https://whatsapp.whmcsmodules.com/","is_premium":true,"sales":7200,"rating":4.4,"version":"2.8.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-whatsapp-module"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS Invoice Designer
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS Invoice Designer', 'whmcs-invoice-designer', 'Module factures personnalisées', 35, 1.4, '#d35400', c.id, NULL, true, NULL, '{"demo_url":"https://invoicedesigner.com/","is_premium":true,"sales":5100,"rating":4.3,"version":"3.2.1","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-invoice-designer"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS WhatsApp Client
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS WhatsApp Client', 'whmcs-whatsapp-client', 'Espace client WhatsApp intégré', 42, 1.1, '#e84393', c.id, NULL, true, NULL, '{"demo_url":"https://whatsappclient.com/","is_premium":true,"sales":4800,"rating":4.2,"version":"2.5.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-whatsapp-client"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS SolusVM
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS SolusVM', 'whmcs-solusvm', 'Module SolusVM provisionnement', 55, 1.3, '#9b59b6', c.id, NULL, true, NULL, '{"demo_url":"https://solusvm.whmcsmodules/","is_premium":true,"sales":4300,"rating":4.3,"version":"2.7.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-solusvm"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS Hosting Module
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS Hosting Module', 'whmcs-hosting-module', 'Module plan hébergement avancé', 59, 1.7, '#3498db', c.id, NULL, true, NULL, '{"demo_url":"https://hostingmodule.com/","is_premium":true,"sales":5600,"rating":4.4,"version":"3.3.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-hosting-module"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS Domain Reseller
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS Domain Reseller', 'whmcs-domain-reseller', 'Module revendeur domaines', 65, 1.5, '#e67e22', c.id, NULL, true, NULL, '{"demo_url":"https://domainreseller.com/","is_premium":true,"sales":3800,"rating":4.2,"version":"2.9.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-domain-reseller"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS SSL Manager
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS SSL Manager', 'whmcs-ssl-manager', 'Module gestion certificats SSL', 49, 1.2, '#16a085', c.id, NULL, true, NULL, '{"demo_url":"https://sslmanager.whmcs/","is_premium":true,"sales":6700,"rating":4.3,"version":"3.0.1","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-ssl-manager"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS Backup Module
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS Backup Module', 'whmcs-backup-module', 'Module sauvegarde automatique', 45, 1.3, '#2ecc71', c.id, NULL, true, NULL, '{"demo_url":"https://backupmodule.com/","is_premium":true,"sales":4900,"rating":4.4,"version":"2.6.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-backup-module"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS Server Monitor
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS Server Monitor', 'whmcs-server-monitor', 'Module monitoring serveurs temps réel', 39, 1.1, '#c0392b', c.id, NULL, true, NULL, '{"demo_url":"https://servermonitor.whmcs/","is_premium":true,"sales":3300,"rating":4.1,"version":"1.8.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-server-monitor"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS Email Template
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS Email Template', 'whmcs-email-template', 'Pack templates emails professionnels', 29, 1, '#f39c12', c.id, NULL, true, NULL, '{"demo_url":"https://emailtemplates.com/","is_premium":true,"sales":5200,"rating":4.2,"version":"2.2.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-email-template"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS SEO Module
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS SEO Module', 'whmcs-seo-module', 'Module SEO automatique pages client', 42, 1.2, '#8e44ad', c.id, NULL, true, NULL, '{"demo_url":"https://seomodule.whmcs/","is_premium":true,"sales":2900,"rating":4.1,"version":"1.9.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-seo-module"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS Multi Language
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS Multi Language', 'whmcs-multi-language', 'Module multi-langues avancé', 35, 1.4, '#1abc9c', c.id, NULL, true, NULL, '{"demo_url":"https://multilang.com/","is_premium":true,"sales":6100,"rating":4.4,"version":"3.1.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-multi-language"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS Affiliate Pro
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS Affiliate Pro', 'whmcs-affiliate-pro', 'Module programme affiliation avancé', 49, 1.3, '#e84393', c.id, NULL, true, NULL, '{"demo_url":"https://affiliatepro.com/","is_premium":true,"sales":4400,"rating":4.3,"version":"2.7.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-affiliate-pro"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS API Gateway
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS API Gateway', 'whmcs-api-gateway', 'Module passerelle API personnalisée', 55, 1.1, '#d35400', c.id, NULL, true, NULL, '{"demo_url":"https://apigateway.whmcs/","is_premium":true,"sales":3700,"rating":4.2,"version":"2.4.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-api-gateway"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS Rate Limiter
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS Rate Limiter', 'whmcs-rate-limiter', 'Module protection contre les abus', 29, 0.9, '#2c3e50', c.id, NULL, true, NULL, '{"demo_url":"https://ratelimiter.com/","is_premium":true,"sales":3100,"rating":4,"version":"1.6.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-rate-limiter"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS 2FA Pro
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS 2FA Pro', 'whmcs-2fa-pro', 'Module double authentification avancée', 39, 1.5, '#27ae60', c.id, NULL, true, NULL, '{"demo_url":"https://2fapro.com/","is_premium":true,"sales":8400,"rating":4.6,"version":"3.5.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-2fa-pro"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS Ticket Priority
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS Ticket Priority', 'whmcs-ticket-priority', 'Module priorisation intelligente tickets', 32, 1, '#3498db', c.id, NULL, true, NULL, '{"demo_url":"https://ticketpriority.com/","is_premium":true,"sales":2600,"rating":4.1,"version":"1.7.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-ticket-priority"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS Knowledgebase Pro
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS Knowledgebase Pro', 'whmcs-knowledgebase-pro', 'Module base de connaissance avancée', 45, 1.2, '#e74c3c', c.id, NULL, true, NULL, '{"demo_url":"https://knowledgebasepro.com/","is_premium":true,"sales":3400,"rating":4.2,"version":"2.5.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-knowledgebase-pro"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS Order Form Designer
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS Order Form Designer', 'whmcs-order-form-designer', 'Module formulaire commande drag-drop', 42, 1.1, '#f39c12', c.id, NULL, true, NULL, '{"demo_url":"https://orderformdesigner.com/","is_premium":true,"sales":2800,"rating":4.1,"version":"2.3.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-order-form-designer"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS Mobile App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS Mobile App', 'whmcs-mobile-app', 'Application mobile client WHMCS', 79, 1.3, '#16a085', c.id, NULL, true, NULL, '{"demo_url":"https://mobileapp.whmcs/","is_premium":true,"sales":3200,"rating":4.3,"version":"2.8.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-mobile-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS Admin Theme
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS Admin Theme', 'whmcs-admin-theme', 'Thème interface admin moderne', 35, 1.2, '#8e44ad', c.id, NULL, true, NULL, '{"demo_url":"https://admintheme.com/","is_premium":true,"sales":4700,"rating":4.3,"version":"2.6.1","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-admin-theme"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS Fraud Checker
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS Fraud Checker', 'whmcs-fraud-checker', 'Module vérification carte anti-fraude', 49, 1, '#c0392b', c.id, NULL, true, NULL, '{"demo_url":"https://fraudchecker.com/","is_premium":true,"sales":3900,"rating":4.2,"version":"2.2.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-fraud-checker"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS Invoice PDF
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS Invoice PDF', 'whmcs-invoice-pdf', 'Module PDF factures personnalisées', 29, 1.1, '#2ecc71', c.id, NULL, true, NULL, '{"demo_url":"https://invoicepdf.com/","is_premium":true,"sales":5400,"rating":4.4,"version":"2.9.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-invoice-pdf"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS Subscription Module
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS Subscription Module', 'whmcs-subscription-module', 'Module abonnements récurrents', 55, 1.4, '#e67e22', c.id, NULL, true, NULL, '{"demo_url":"https://subscriptionmodule.com/","is_premium":true,"sales":4800,"rating":4.4,"version":"3.0.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-subscription-module"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS Cron Status
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS Cron Status', 'whmcs-cron-status', 'Module statut cron jobs tableau', 25, 0.8, '#1abc9c', c.id, NULL, true, NULL, '{"demo_url":"https://cronstatus.com/","is_premium":true,"sales":2100,"rating":4,"version":"1.5.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-cron-status"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS Language Packs
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS Language Packs', 'whmcs-language-packs', 'Pack 20 langues pour WHMCS', 19, 0.9, '#3498db', c.id, NULL, true, NULL, '{"demo_url":"https://languagepacks.com/","is_premium":true,"sales":5800,"rating":4.1,"version":"2.4.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-language-packs"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS LiveChat Module
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS LiveChat Module', 'whmcs-livechat-module', 'Module chat en direct pour clients', 45, 1.3, '#e84393', c.id, NULL, true, NULL, '{"demo_url":"https://livechatmodule.com/","is_premium":true,"sales":4300,"rating":4.3,"version":"2.7.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-livechat-module"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS Notification Hub
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS Notification Hub', 'whmcs-notification-hub', 'Module notifications centralisées', 35, 1, '#2c3e50', c.id, NULL, true, NULL, '{"demo_url":"https://notificationhub.com/","is_premium":true,"sales":2700,"rating":4.1,"version":"1.8.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-notification-hub"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS Domain Checker
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS Domain Checker', 'whmcs-domain-checker', 'Module vérificateur domaines amélioré', 39, 1.2, '#27ae60', c.id, NULL, true, NULL, '{"demo_url":"https://domainchecker.com/","is_premium":true,"sales":3600,"rating":4.2,"version":"2.5.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-domain-checker"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS Renewal Manager
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS Renewal Manager', 'whmcs-renewal-manager', 'Module gestion renouvellements auto', 49, 1.3, '#d35400', c.id, NULL, true, NULL, '{"demo_url":"https://renewalmanager.com/","is_premium":true,"sales":4200,"rating":4.3,"version":"2.6.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-renewal-manager"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS Dark Theme
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS Dark Theme', 'whmcs-dark-theme', 'Thème client mode sombre', 25, 0.8, '#34495e', c.id, NULL, true, NULL, '{"demo_url":"https://darktheme.whmcs/","is_premium":true,"sales":6800,"rating":4.4,"version":"2.1.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-dark-theme"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS Speed Optimizer
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS Speed Optimizer', 'whmcs-speed-optimizer', 'Module optimisation vitesse pages', 35, 1.1, '#1abc9c', c.id, NULL, true, NULL, '{"demo_url":"https://speedoptimizer.com/","is_premium":true,"sales":3100,"rating":4.2,"version":"1.9.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-speed-optimizer"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS API Docs Module
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS API Docs Module', 'whmcs-api-docs-module', 'Module documentation API automatique', 29, 0.7, '#8e44ad', c.id, NULL, true, NULL, '{"demo_url":"https://apidocsmodule.com/","is_premium":true,"sales":1900,"rating":4,"version":"1.4.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-api-docs-module"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS Client Export
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS Client Export', 'whmcs-client-export', 'Module export données clients', 25, 0.8, '#e67e22', c.id, NULL, true, NULL, '{"demo_url":"https://clientexport.com/","is_premium":true,"sales":2400,"rating":4,"version":"1.6.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-client-export"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS Cron Optimizer
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS Cron Optimizer', 'whmcs-cron-optimizer', 'Module optimisation des cron jobs', 32, 1, '#c0392b', c.id, NULL, true, NULL, '{"demo_url":"https://cronoptimizer.com/","is_premium":true,"sales":2900,"rating":4.1,"version":"1.7.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-cron-optimizer"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS Reseller Panel
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS Reseller Panel', 'whmcs-reseller-panel', 'Module panneau revendeur complet', 69, 1.5, '#3498db', c.id, NULL, true, NULL, '{"demo_url":"https://resellerpanel.com/","is_premium":true,"sales":3400,"rating":4.3,"version":"2.8.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-reseller-panel"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS Ticket Alerts
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS Ticket Alerts', 'whmcs-ticket-alerts', 'Module alertes tickets temps réel', 29, 0.9, '#2ecc71', c.id, NULL, true, NULL, '{"demo_url":"https://ticketalerts.com/","is_premium":true,"sales":3800,"rating":4.2,"version":"2.3.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-ticket-alerts"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS Domain Branding
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS Domain Branding', 'whmcs-domain-branding', 'Module branding domaines personnalisé', 35, 0.8, '#e84393', c.id, NULL, true, NULL, '{"demo_url":"https://domainbranding.com/","is_premium":true,"sales":2100,"rating":4,"version":"1.5.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-domain-branding"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS Payment Links
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS Payment Links', 'whmcs-payment-links', 'Module liens de paiement directs', 32, 1.1, '#27ae60', c.id, NULL, true, NULL, '{"demo_url":"https://paymentlinks.com/","is_premium":true,"sales":4500,"rating":4.3,"version":"2.4.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-payment-links"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- WHMCS Global Search
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'WHMCS Global Search', 'whmcs-global-search', 'Module recherche globale admin', 25, 0.7, '#f39c12', c.id, NULL, true, NULL, '{"demo_url":"https://globalsearch.com/","is_premium":true,"sales":2600,"rating":4.1,"version":"1.6.0","last_updated":"2026-01-15","tags":["whmcs","premium","whmcs-global-search"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'whmcs';

-- ================== SCRIPTS ==================
-- Bookly
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Bookly', 'bookly', 'Script WordPress réservation rendez-vous', 69, 3.9, '#3498db', c.id, NULL, true, NULL, '{"demo_url":"https://booking-wp-plugin.com/","is_premium":true,"sales":89000,"rating":4.6,"version":"24.0","last_updated":"2026-01-15","tags":["scripts","premium","bookly"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Laravel CRM
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Laravel CRM', 'laravel-crm', 'Système CRM complet Laravel', 59, 2.1, '#2ecc71', c.id, NULL, true, NULL, '{"demo_url":"https://laravelcrm.demo/","is_premium":true,"sales":32000,"rating":4.4,"version":"3.5.1","last_updated":"2026-01-15","tags":["scripts","premium","laravel-crm"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- InvoicePlane
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'InvoicePlane', 'invoiceplane', 'Script facturation open source', 39, 1.8, '#e67e22', c.id, NULL, true, NULL, '{"demo_url":"https://invoiceplane.com/","is_premium":true,"sales":45000,"rating":4.3,"version":"2.8.0","last_updated":"2026-01-15","tags":["scripts","premium","invoiceplane"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Easy!Appointments
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Easy!Appointments', 'easy-appointments', 'Script gestion rendez-vous PHP', 49, 2.4, '#16a085', c.id, NULL, true, NULL, '{"demo_url":"https://easyappointments.org/","is_premium":true,"sales":38000,"rating":4.4,"version":"3.2.1","last_updated":"2026-01-15","tags":["scripts","premium","easy-appointments"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Selio
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Selio', 'selio', 'Script annonces classées Laravel', 59, 1.9, '#c0392b', c.id, NULL, true, NULL, '{"demo_url":"https://selio.weblify.net/","is_premium":true,"sales":27000,"rating":4.5,"version":"4.7.0","last_updated":"2026-01-15","tags":["scripts","premium","selio"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Jobboard
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Jobboard', 'jobboard', 'Script site d emploi Laravel', 59, 1.6, '#8e44ad', c.id, NULL, true, NULL, '{"demo_url":"https://jobboard.weblify.net/","is_premium":true,"sales":19000,"rating":4.4,"version":"3.9.0","last_updated":"2026-01-15","tags":["scripts","premium","jobboard"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Hotel Booking
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Hotel Booking', 'hotel-booking', 'Script réservation hôtelière PHP', 69, 2.2, '#f39c12', c.id, NULL, true, NULL, '{"demo_url":"https://hotelbooking.demo/","is_premium":true,"sales":26000,"rating":4.5,"version":"5.2.0","last_updated":"2026-01-15","tags":["scripts","premium","hotel-booking"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- POS System
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'POS System', 'pos-system', 'Script point de vente restaurant', 59, 1.8, '#e74c3c', c.id, NULL, true, NULL, '{"demo_url":"https://possystem.demo/","is_premium":true,"sales":31000,"rating":4.4,"version":"4.1.0","last_updated":"2026-01-15","tags":["scripts","premium","pos-system"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Taskify
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Taskify', 'taskify', 'Script gestion tâches Kanban', 39, 1.4, '#1abc9c', c.id, NULL, true, NULL, '{"demo_url":"https://taskify.demo/","is_premium":true,"sales":14000,"rating":4.3,"version":"2.6.0","last_updated":"2026-01-15","tags":["scripts","premium","taskify"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Chat App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Chat App', 'chat-app', 'Script messagerie temps réel', 49, 1.7, '#3498db', c.id, NULL, true, NULL, '{"demo_url":"https://chatapp.demo/","is_premium":true,"sales":22000,"rating":4.3,"version":"3.4.0","last_updated":"2026-01-15","tags":["scripts","premium","chat-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Directory Script
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Directory Script', 'directory-script', 'Script annuaire professionnel', 55, 1.5, '#2c3e50', c.id, NULL, true, NULL, '{"demo_url":"https://directoryscript.demo/","is_premium":true,"sales":17000,"rating":4.2,"version":"3.0.0","last_updated":"2026-01-15","tags":["scripts","premium","directory-script"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Classified Ads
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Classified Ads', 'classified-ads', 'Script petites annonces PHP', 49, 1.6, '#27ae60', c.id, NULL, true, NULL, '{"demo_url":"https://classifiedads.demo/","is_premium":true,"sales":21000,"rating":4.3,"version":"4.2.0","last_updated":"2026-01-15","tags":["scripts","premium","classified-ads"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Elearning LMS
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Elearning LMS', 'elearning-lms', 'Script plateforme e-learning', 69, 2, '#e84393', c.id, NULL, true, NULL, '{"demo_url":"https://elearninglms.demo/","is_premium":true,"sales":24000,"rating":4.5,"version":"5.1.0","last_updated":"2026-01-15","tags":["scripts","premium","elearning-lms"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Fitness Gym
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Fitness Gym', 'fitness-gym', 'Script gestion salle de sport', 49, 1.3, '#d35400', c.id, NULL, true, NULL, '{"demo_url":"https://fitnessgym.demo/","is_premium":true,"sales":12000,"rating":4.2,"version":"2.8.0","last_updated":"2026-01-15","tags":["scripts","premium","fitness-gym"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Rental Script
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Rental Script', 'rental-script', 'Script location voitures & matériel', 59, 1.7, '#8e44ad', c.id, NULL, true, NULL, '{"demo_url":"https://rentalscript.demo/","is_premium":true,"sales":15000,"rating":4.3,"version":"3.5.0","last_updated":"2026-01-15","tags":["scripts","premium","rental-script"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Quiz Builder
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Quiz Builder', 'quiz-builder', 'Script création quiz en ligne', 39, 1.2, '#3498db', c.id, NULL, true, NULL, '{"demo_url":"https://quizbuilder.demo/","is_premium":true,"sales":18000,"rating":4.2,"version":"2.7.0","last_updated":"2026-01-15","tags":["scripts","premium","quiz-builder"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Event Ticketing
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Event Ticketing', 'event-ticketing', 'Script billetterie événements', 55, 1.5, '#e74c3c', c.id, NULL, true, NULL, '{"demo_url":"https://eventticketing.demo/","is_premium":true,"sales":16000,"rating":4.3,"version":"3.2.0","last_updated":"2026-01-15","tags":["scripts","premium","event-ticketing"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Marketplace Script
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Marketplace Script', 'marketplace-script', 'Script marketplace multi-vendeurs', 79, 2.3, '#2ecc71', c.id, NULL, true, NULL, '{"demo_url":"https://marketplacescript.demo/","is_premium":true,"sales":20000,"rating":4.5,"version":"6.0.0","last_updated":"2026-01-15","tags":["scripts","premium","marketplace-script"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Food Delivery
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Food Delivery', 'food-delivery', 'Script livraison de repas', 69, 1.9, '#f39c12', c.id, NULL, true, NULL, '{"demo_url":"https://fooddelivery.demo/","is_premium":true,"sales":28000,"rating":4.4,"version":"4.8.0","last_updated":"2026-01-15","tags":["scripts","premium","food-delivery"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Fleet Management
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Fleet Management', 'fleet-management', 'Script gestion de flotte', 65, 1.4, '#16a085', c.id, NULL, true, NULL, '{"demo_url":"https://fleetmanagement.demo/","is_premium":true,"sales":9000,"rating":4.2,"version":"3.1.0","last_updated":"2026-01-15","tags":["scripts","premium","fleet-management"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Pharmacy Management
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Pharmacy Management', 'pharmacy-management', 'Script gestion pharmacie', 49, 1.3, '#c0392b', c.id, NULL, true, NULL, '{"demo_url":"https://pharmacymgmt.demo/","is_premium":true,"sales":11000,"rating":4.2,"version":"2.9.0","last_updated":"2026-01-15","tags":["scripts","premium","pharmacy-management"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Loan Management
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Loan Management', 'loan-management', 'Script gestion prêts financiers', 65, 1.6, '#8e44ad', c.id, NULL, true, NULL, '{"demo_url":"https://loanmgmt.demo/","is_premium":true,"sales":8000,"rating":4.3,"version":"3.4.0","last_updated":"2026-01-15","tags":["scripts","premium","loan-management"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Inventory System
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Inventory System', 'inventory-system', 'Script gestion stock inventaire', 55, 1.7, '#1abc9c', c.id, NULL, true, NULL, '{"demo_url":"https://inventorysystem.demo/","is_premium":true,"sales":19000,"rating":4.3,"version":"4.5.0","last_updated":"2026-01-15","tags":["scripts","premium","inventory-system"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- School ERP
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'School ERP', 'school-erp', 'Script gestion école ERP', 69, 1.8, '#3498db', c.id, NULL, true, NULL, '{"demo_url":"https://schoolerp.demo/","is_premium":true,"sales":14000,"rating":4.4,"version":"5.0.0","last_updated":"2026-01-15","tags":["scripts","premium","school-erp"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Laundry Booking
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Laundry Booking', 'laundry-booking', 'Script réservation blanchisserie', 39, 1, '#27ae60', c.id, NULL, true, NULL, '{"demo_url":"https://laundrybooking.demo/","is_premium":true,"sales":6000,"rating":4.1,"version":"2.2.0","last_updated":"2026-01-15","tags":["scripts","premium","laundry-booking"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Real Estate Script
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Real Estate Script', 'real-estate-script', 'Script immobilier complet', 69, 2.1, '#e67e22', c.id, NULL, true, NULL, '{"demo_url":"https://realestatescript.demo/","is_premium":true,"sales":23000,"rating":4.4,"version":"5.3.0","last_updated":"2026-01-15","tags":["scripts","premium","real-estate-script"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Blog Script
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Blog Script', 'blog-script', 'Script blog premium PHP', 35, 1.2, '#2c3e50', c.id, NULL, true, NULL, '{"demo_url":"https://blogscript.demo/","is_premium":true,"sales":15000,"rating":4.1,"version":"2.6.0","last_updated":"2026-01-15","tags":["scripts","premium","blog-script"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Social Network Script
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Social Network Script', 'social-network-script', 'Script réseau social PHP', 79, 2, '#e84393', c.id, NULL, true, NULL, '{"demo_url":"https://socialnetworkscript.demo/","is_premium":true,"sales":17000,"rating":4.3,"version":"4.0.0","last_updated":"2026-01-15","tags":["scripts","premium","social-network-script"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Email Marketing
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Email Marketing', 'email-marketing', 'Script marketing par email', 59, 1.5, '#d35400', c.id, NULL, true, NULL, '{"demo_url":"https://emailmarketing.demo/","is_premium":true,"sales":13000,"rating":4.3,"version":"3.3.0","last_updated":"2026-01-15","tags":["scripts","premium","email-marketing"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Helpdesk Script
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Helpdesk Script', 'helpdesk-script', 'Script helpdesk support', 49, 1.6, '#8e44ad', c.id, NULL, true, NULL, '{"demo_url":"https://helpdeskscript.demo/","is_premium":true,"sales":12000,"rating":4.2,"version":"3.8.0","last_updated":"2026-01-15","tags":["scripts","premium","helpdesk-script"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Car Service Booking
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Car Service Booking', 'car-service-booking', 'Script réservation auto services', 49, 1.1, '#16a085', c.id, NULL, true, NULL, '{"demo_url":"https://carservice.demo/","is_premium":true,"sales":7500,"rating":4.2,"version":"2.5.0","last_updated":"2026-01-15","tags":["scripts","premium","car-service-booking"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Doctor Booking
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Doctor Booking', 'doctor-booking', 'Script réservation médecins', 55, 1.4, '#2ecc71', c.id, NULL, true, NULL, '{"demo_url":"https://doctorbooking.demo/","is_premium":true,"sales":14000,"rating":4.3,"version":"3.6.0","last_updated":"2026-01-15","tags":["scripts","premium","doctor-booking"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- News Script
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'News Script', 'news-script', 'Script site actualités', 45, 1.3, '#c0392b', c.id, NULL, true, NULL, '{"demo_url":"https://newsscript.demo/","is_premium":true,"sales":10000,"rating":4.1,"version":"2.9.0","last_updated":"2026-01-15","tags":["scripts","premium","news-script"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Portfolio Builder
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Portfolio Builder', 'portfolio-builder', 'Script portfolio professionnel', 35, 0.9, '#f39c12', c.id, NULL, true, NULL, '{"demo_url":"https://portfoliobuilder.demo/","is_premium":true,"sales":7000,"rating":4.1,"version":"2.1.0","last_updated":"2026-01-15","tags":["scripts","premium","portfolio-builder"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Finance Tracker
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Finance Tracker', 'finance-tracker', 'Script suivi finances personnelles', 45, 1.2, '#1abc9c', c.id, NULL, true, NULL, '{"demo_url":"https://financetracker.demo/","is_premium":true,"sales":9000,"rating":4.2,"version":"2.7.0","last_updated":"2026-01-15","tags":["scripts","premium","finance-tracker"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Salon Booking
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Salon Booking', 'salon-booking', 'Script réservation salon beauté', 49, 1.3, '#e84393', c.id, NULL, true, NULL, '{"demo_url":"https://salonbooking.demo/","is_premium":true,"sales":13000,"rating":4.3,"version":"3.2.0","last_updated":"2026-01-15","tags":["scripts","premium","salon-booking"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Taxi Booking
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Taxi Booking', 'taxi-booking', 'Script réservation taxi Uber-like', 69, 1.7, '#3498db', c.id, NULL, true, NULL, '{"demo_url":"https://taxibooking.demo/","is_premium":true,"sales":18000,"rating":4.4,"version":"4.5.0","last_updated":"2026-01-15","tags":["scripts","premium","taxi-booking"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Wedding Planner
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Wedding Planner', 'wedding-planner', 'Script organisation mariages', 45, 1, '#d35400', c.id, NULL, true, NULL, '{"demo_url":"https://weddingplanner.demo/","is_premium":true,"sales":5000,"rating":4.1,"version":"2.3.0","last_updated":"2026-01-15","tags":["scripts","premium","wedding-planner"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Logistics Script
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Logistics Script', 'logistics-script', 'Script gestion logistique', 65, 1.4, '#2c3e50', c.id, NULL, true, NULL, '{"demo_url":"https://logisticsscript.demo/","is_premium":true,"sales":6500,"rating":4.2,"version":"3.0.0","last_updated":"2026-01-15","tags":["scripts","premium","logistics-script"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Video Streaming
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Video Streaming', 'video-streaming', 'Script plateforme streaming vidéo', 75, 1.8, '#8e44ad', c.id, NULL, true, NULL, '{"demo_url":"https://videostreaming.demo/","is_premium":true,"sales":15000,"rating":4.4,"version":"4.2.0","last_updated":"2026-01-15","tags":["scripts","premium","video-streaming"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Music Download
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Music Download', 'music-download', 'Script téléchargement musique', 55, 1.5, '#e74c3c', c.id, NULL, true, NULL, '{"demo_url":"https://musicdownload.demo/","is_premium":true,"sales":12000,"rating":4.2,"version":"3.1.0","last_updated":"2026-01-15","tags":["scripts","premium","music-download"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Sports Betting
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Sports Betting', 'sports-betting', 'Script paris sportifs', 79, 1.6, '#f39c12', c.id, NULL, true, NULL, '{"demo_url":"https://sportsbetting.demo/","is_premium":true,"sales":8500,"rating":4.3,"version":"4.0.0","last_updated":"2026-01-15","tags":["scripts","premium","sports-betting"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Language Learning
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Language Learning', 'language-learning', 'Script apprentissage langues', 55, 1.2, '#16a085', c.id, NULL, true, NULL, '{"demo_url":"https://languagelearning.demo/","is_premium":true,"sales":7000,"rating":4.2,"version":"2.9.0","last_updated":"2026-01-15","tags":["scripts","premium","language-learning"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Vehicle Tracking
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Vehicle Tracking', 'vehicle-tracking', 'Script suivi véhicules GPS', 65, 1.3, '#27ae60', c.id, NULL, true, NULL, '{"demo_url":"https://vehicletracking.demo/","is_premium":true,"sales":6000,"rating":4.1,"version":"3.3.0","last_updated":"2026-01-15","tags":["scripts","premium","vehicle-tracking"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Water Refilling
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Water Refilling', 'water-refilling', 'Script gestion eau livraison', 39, 0.8, '#3498db', c.id, NULL, true, NULL, '{"demo_url":"https://waterrefilling.demo/","is_premium":true,"sales":4000,"rating":4,"version":"2.0.0","last_updated":"2026-01-15","tags":["scripts","premium","water-refilling"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Barbershop Booking
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Barbershop Booking', 'barbershop-booking', 'Script réservation barbier', 39, 1.1, '#2c3e50', c.id, NULL, true, NULL, '{"demo_url":"https://barbershop.demo/","is_premium":true,"sales":9500,"rating":4.2,"version":"2.4.0","last_updated":"2026-01-15","tags":["scripts","premium","barbershop-booking"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Property Listing
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Property Listing', 'property-listing', 'Script listing propriétés', 55, 1.4, '#e67e22', c.id, NULL, true, NULL, '{"demo_url":"https://propertylisting.demo/","is_premium":true,"sales":11000,"rating":4.2,"version":"3.5.0","last_updated":"2026-01-15","tags":["scripts","premium","property-listing"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Attendance System
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Attendance System', 'attendance-system', 'Script pointage employés', 45, 1.2, '#8e44ad', c.id, NULL, true, NULL, '{"demo_url":"https://attendancesystem.demo/","is_premium":true,"sales":8500,"rating":4.1,"version":"2.8.0","last_updated":"2026-01-15","tags":["scripts","premium","attendance-system"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Online Exam
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Online Exam', 'online-exam', 'Script examens en ligne', 49, 1.3, '#1abc9c', c.id, NULL, true, NULL, '{"demo_url":"https://onlineexam.demo/","is_premium":true,"sales":13000,"rating":4.2,"version":"3.4.0","last_updated":"2026-01-15","tags":["scripts","premium","online-exam"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- Ecommerce Script
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Ecommerce Script', 'ecommerce-script', 'Script e-commerce complet', 65, 2, '#e84393', c.id, NULL, true, NULL, '{"demo_url":"https://ecommercescript.demo/","is_premium":true,"sales":25000,"rating":4.4,"version":"5.5.0","last_updated":"2026-01-15","tags":["scripts","premium","ecommerce-script"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'scripts';

-- ================== APPLICATIONS ==================
-- Flutter Food Delivery App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Flutter Food Delivery App', 'flutter-food-delivery-app', 'Application livraison repas Flutter', 79, 2.2, '#e74c3c', c.id, NULL, true, NULL, '{"demo_url":"https://flutterfood.demo/","is_premium":true,"sales":21000,"rating":4.4,"version":"4.6.0","last_updated":"2026-01-15","tags":["applications","premium","flutter-food-delivery-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Laravel Hotel App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Laravel Hotel App', 'laravel-hotel-app', 'Application hôtel Laravel + Vue', 69, 1.8, '#3498db', c.id, NULL, true, NULL, '{"demo_url":"https://laravelhotel.demo/","is_premium":true,"sales":15000,"rating":4.3,"version":"3.8.0","last_updated":"2026-01-15","tags":["applications","premium","laravel-hotel-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- React Native Chat
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'React Native Chat', 'react-native-chat', 'Application chat React Native', 59, 1.6, '#2ecc71', c.id, NULL, true, NULL, '{"demo_url":"https://reactchat.demo/","is_premium":true,"sales":17000,"rating":4.3,"version":"3.5.0","last_updated":"2026-01-15","tags":["applications","premium","react-native-chat"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Android POS
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Android POS', 'android-pos', 'Application point de vente Android', 65, 1.7, '#f39c12', c.id, NULL, true, NULL, '{"demo_url":"https://androidpos.demo/","is_premium":true,"sales":14000,"rating":4.3,"version":"4.2.0","last_updated":"2026-01-15","tags":["applications","premium","android-pos"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Flutter Dating App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Flutter Dating App', 'flutter-dating-app', 'Application rencontre Flutter', 75, 1.9, '#e84393', c.id, NULL, true, NULL, '{"demo_url":"https://flutterdating.demo/","is_premium":true,"sales":18000,"rating":4.4,"version":"4.0.0","last_updated":"2026-01-15","tags":["applications","premium","flutter-dating-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Flutter Fitness App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Flutter Fitness App', 'flutter-fitness-app', 'Application fitness & santé', 69, 1.5, '#16a085', c.id, NULL, true, NULL, '{"demo_url":"https://flutterfitness.demo/","is_premium":true,"sales":12000,"rating":4.3,"version":"3.6.0","last_updated":"2026-01-15","tags":["applications","premium","flutter-fitness-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Booking App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Booking App', 'booking-app', 'Application réservation universelle', 65, 1.7, '#8e44ad', c.id, NULL, true, NULL, '{"demo_url":"https://bookingapp.demo/","is_premium":true,"sales":13000,"rating":4.3,"version":"4.1.0","last_updated":"2026-01-15","tags":["applications","premium","booking-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Taxi App Flutter
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Taxi App Flutter', 'taxi-app-flutter', 'Application taxi Flutter + Laravel', 79, 2, '#d35400', c.id, NULL, true, NULL, '{"demo_url":"https://taxiappfl.demo/","is_premium":true,"sales":16000,"rating":4.4,"version":"4.5.0","last_updated":"2026-01-15","tags":["applications","premium","taxi-app-flutter"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Ecommerce App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Ecommerce App', 'ecommerce-app', 'Application e-commerce React Native', 69, 1.8, '#2c3e50', c.id, NULL, true, NULL, '{"demo_url":"https://ecommerceapp.demo/","is_premium":true,"sales":19000,"rating":4.4,"version":"5.0.0","last_updated":"2026-01-15","tags":["applications","premium","ecommerce-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- ChatBot App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'ChatBot App', 'chatbot-app', 'Application chatbot intelligence', 65, 1.5, '#27ae60', c.id, NULL, true, NULL, '{"demo_url":"https://chatbotapp.demo/","is_premium":true,"sales":9000,"rating":4.2,"version":"3.3.0","last_updated":"2026-01-15","tags":["applications","premium","chatbot-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Fitness Tracker
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Fitness Tracker', 'fitness-tracker', 'Application suivi fitness Wear OS', 59, 1.3, '#c0392b', c.id, NULL, true, NULL, '{"demo_url":"https://fitnesstracker.demo/","is_premium":true,"sales":8000,"rating":4.2,"version":"3.0.0","last_updated":"2026-01-15","tags":["applications","premium","fitness-tracker"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Education App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Education App', 'education-app', 'Application cours en ligne mobile', 65, 1.6, '#3498db', c.id, NULL, true, NULL, '{"demo_url":"https://educationapp.demo/","is_premium":true,"sales":14000,"rating":4.3,"version":"4.2.0","last_updated":"2026-01-15","tags":["applications","premium","education-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Payment App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Payment App', 'payment-app', 'Application paiement mobile', 75, 1.8, '#2ecc71', c.id, NULL, true, NULL, '{"demo_url":"https://paymentapp.demo/","is_premium":true,"sales":12000,"rating":4.4,"version":"3.9.0","last_updated":"2026-01-15","tags":["applications","premium","payment-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Grocery App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Grocery App', 'grocery-app', 'Application courses épicerie', 69, 1.7, '#e67e22', c.id, NULL, true, NULL, '{"demo_url":"https://groceryapp.demo/","is_premium":true,"sales":16000,"rating":4.3,"version":"4.3.0","last_updated":"2026-01-15","tags":["applications","premium","grocery-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Hospital App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Hospital App', 'hospital-app', 'Application hôpital patients', 65, 1.4, '#16a085', c.id, NULL, true, NULL, '{"demo_url":"https://hospitalapp.demo/","is_premium":true,"sales":8500,"rating":4.2,"version":"3.5.0","last_updated":"2026-01-15","tags":["applications","premium","hospital-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Banking App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Banking App', 'banking-app', 'Application banque mobile', 85, 1.9, '#8e44ad', c.id, NULL, true, NULL, '{"demo_url":"https://bankingapp.demo/","is_premium":true,"sales":11000,"rating":4.4,"version":"4.1.0","last_updated":"2026-01-15","tags":["applications","premium","banking-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Property App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Property App', 'property-app', 'Application immobilière mobile', 69, 1.6, '#f39c12', c.id, NULL, true, NULL, '{"demo_url":"https://propertyapp.demo/","is_premium":true,"sales":13000,"rating":4.3,"version":"3.8.0","last_updated":"2026-01-15","tags":["applications","premium","property-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Delivery App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Delivery App', 'delivery-app', 'Application livraison colis', 65, 1.5, '#e74c3c', c.id, NULL, true, NULL, '{"demo_url":"https://deliveryapp.demo/","is_premium":true,"sales":11000,"rating":4.2,"version":"3.6.0","last_updated":"2026-01-15","tags":["applications","premium","delivery-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Salon App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Salon App', 'salon-app', 'Application salon de beauté', 59, 1.3, '#e84393', c.id, NULL, true, NULL, '{"demo_url":"https://salonapp.demo/","is_premium":true,"sales":9500,"rating":4.2,"version":"3.2.0","last_updated":"2026-01-15","tags":["applications","premium","salon-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Restaurant App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Restaurant App', 'restaurant-app', 'Application restaurant commandes', 65, 1.6, '#d35400', c.id, NULL, true, NULL, '{"demo_url":"https://restaurantapp.demo/","is_premium":true,"sales":14000,"rating":4.3,"version":"4.0.0","last_updated":"2026-01-15","tags":["applications","premium","restaurant-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Laundry App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Laundry App', 'laundry-app', 'Application blanchisserie mobile', 49, 1.1, '#27ae60', c.id, NULL, true, NULL, '{"demo_url":"https://laundryapp.demo/","is_premium":true,"sales":6000,"rating":4.1,"version":"2.8.0","last_updated":"2026-01-15","tags":["applications","premium","laundry-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Medicine App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Medicine App', 'medicine-app', 'Application pharmacie livraison', 65, 1.4, '#c0392b', c.id, NULL, true, NULL, '{"demo_url":"https://medicineapp.demo/","is_premium":true,"sales":9000,"rating":4.2,"version":"3.4.0","last_updated":"2026-01-15","tags":["applications","premium","medicine-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Rent App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Rent App', 'rent-app', 'Application location matériel', 59, 1.3, '#3498db', c.id, NULL, true, NULL, '{"demo_url":"https://rentapp.demo/","is_premium":true,"sales":7500,"rating":4.2,"version":"3.1.0","last_updated":"2026-01-15","tags":["applications","premium","rent-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Parking App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Parking App', 'parking-app', 'Application stationnement mobile', 55, 1.2, '#2c3e50', c.id, NULL, true, NULL, '{"demo_url":"https://parkingapp.demo/","is_premium":true,"sales":7000,"rating":4.1,"version":"2.9.0","last_updated":"2026-01-15","tags":["applications","premium","parking-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Event App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Event App', 'event-app', 'Application événements mobile', 59, 1.4, '#8e44ad', c.id, NULL, true, NULL, '{"demo_url":"https://eventapp.demo/","is_premium":true,"sales":8500,"rating":4.2,"version":"3.5.0","last_updated":"2026-01-15","tags":["applications","premium","event-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Hotel Booking App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Hotel Booking App', 'hotel-booking-app', 'Application booking hôtels mobile', 69, 1.7, '#e67e22', c.id, NULL, true, NULL, '{"demo_url":"https://hotelbookingapp.demo/","is_premium":true,"sales":12000,"rating":4.3,"version":"4.2.0","last_updated":"2026-01-15","tags":["applications","premium","hotel-booking-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- News App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'News App', 'news-app', 'Application actualités mobile', 55, 1.3, '#1abc9c', c.id, NULL, true, NULL, '{"demo_url":"https://newsapp.demo/","is_premium":true,"sales":9800,"rating":4.2,"version":"3.0.0","last_updated":"2026-01-15","tags":["applications","premium","news-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Job Search App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Job Search App', 'job-search-app', 'Application recherche emploi', 65, 1.5, '#e84393', c.id, NULL, true, NULL, '{"demo_url":"https://jobsearchapp.demo/","is_premium":true,"sales":10500,"rating":4.3,"version":"3.7.0","last_updated":"2026-01-15","tags":["applications","premium","job-search-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Portfolio App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Portfolio App', 'portfolio-app', 'Application portfolio créatif', 49, 1, '#f39c12', c.id, NULL, true, NULL, '{"demo_url":"https://portfolioapp.demo/","is_premium":true,"sales":7000,"rating":4.1,"version":"2.6.0","last_updated":"2026-01-15","tags":["applications","premium","portfolio-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Social Media App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Social Media App', 'social-media-app', 'Application réseau social mobile', 79, 1.8, '#2ecc71', c.id, NULL, true, NULL, '{"demo_url":"https://socialapp.demo/","is_premium":true,"sales":13000,"rating":4.4,"version":"4.4.0","last_updated":"2026-01-15","tags":["applications","premium","social-media-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Video App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Video App', 'video-app', 'Application streaming vidéo mobile', 75, 1.7, '#e74c3c', c.id, NULL, true, NULL, '{"demo_url":"https://videoapp.demo/","is_premium":true,"sales":9500,"rating":4.3,"version":"3.8.0","last_updated":"2026-01-15","tags":["applications","premium","video-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Music Player App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Music Player App', 'music-player-app', 'Application lecteur musique', 55, 1.2, '#8e44ad', c.id, NULL, true, NULL, '{"demo_url":"https://musicplayerapp.demo/","is_premium":true,"sales":8500,"rating":4.2,"version":"2.9.0","last_updated":"2026-01-15","tags":["applications","premium","music-player-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Weather App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Weather App', 'weather-app', 'Application météo mobile', 45, 1, '#3498db', c.id, NULL, true, NULL, '{"demo_url":"https://weatherapp.demo/","is_premium":true,"sales":7800,"rating":4.1,"version":"2.5.0","last_updated":"2026-01-15","tags":["applications","premium","weather-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- QR Scanner App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'QR Scanner App', 'qr-scanner-app', 'Application scan QR codes', 39, 0.9, '#2c3e50', c.id, NULL, true, NULL, '{"demo_url":"https://qrscannerapp.demo/","is_premium":true,"sales":6500,"rating":4,"version":"2.3.0","last_updated":"2026-01-15","tags":["applications","premium","qr-scanner-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Expense App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Expense App', 'expense-app', 'Application suivi dépenses', 45, 1.1, '#27ae60', c.id, NULL, true, NULL, '{"demo_url":"https://expenseapp.demo/","is_premium":true,"sales":8800,"rating":4.2,"version":"2.8.0","last_updated":"2026-01-15","tags":["applications","premium","expense-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Water Delivery App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Water Delivery App', 'water-delivery-app', 'Application livraison eau', 49, 1, '#16a085', c.id, NULL, true, NULL, '{"demo_url":"https://waterdeliveryapp.demo/","is_premium":true,"sales":4500,"rating":4.1,"version":"2.4.0","last_updated":"2026-01-15","tags":["applications","premium","water-delivery-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Crypto Trading App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Crypto Trading App', 'crypto-trading-app', 'Application trading crypto', 79, 1.7, '#f39c12', c.id, NULL, true, NULL, '{"demo_url":"https://cryptotradingapp.demo/","is_premium":true,"sales":11000,"rating":4.3,"version":"4.0.0","last_updated":"2026-01-15","tags":["applications","premium","crypto-trading-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Fitness Coach App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Fitness Coach App', 'fitness-coach-app', 'Application coach fitness mobile', 65, 1.4, '#c0392b', c.id, NULL, true, NULL, '{"demo_url":"https://fitnesscoachapp.demo/","is_premium":true,"sales":8200,"rating":4.2,"version":"3.3.0","last_updated":"2026-01-15","tags":["applications","premium","fitness-coach-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Inventory App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Inventory App', 'inventory-app', 'Application gestion stock mobile', 59, 1.3, '#e84393', c.id, NULL, true, NULL, '{"demo_url":"https://inventoryapp.demo/","is_premium":true,"sales":9000,"rating":4.2,"version":"3.1.0","last_updated":"2026-01-15","tags":["applications","premium","inventory-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- CRM Mobile App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'CRM Mobile App', 'crm-mobile-app', 'Application CRM mobile', 65, 1.5, '#d35400', c.id, NULL, true, NULL, '{"demo_url":"https://crmapp.demo/","is_premium":true,"sales":8700,"rating":4.3,"version":"3.6.0","last_updated":"2026-01-15","tags":["applications","premium","crm-mobile-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Survey App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Survey App', 'survey-app', 'Application sondages mobile', 49, 1.1, '#3498db', c.id, NULL, true, NULL, '{"demo_url":"https://surveyapp.demo/","is_premium":true,"sales":5800,"rating":4.1,"version":"2.7.0","last_updated":"2026-01-15","tags":["applications","premium","survey-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Attendance App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Attendance App', 'attendance-app', 'Application pointage mobile', 55, 1.2, '#2c3e50', c.id, NULL, true, NULL, '{"demo_url":"https://attendanceapp.demo/","is_premium":true,"sales":7200,"rating":4.1,"version":"3.0.0","last_updated":"2026-01-15","tags":["applications","premium","attendance-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Notes App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Notes App', 'notes-app', 'Application notes premium', 45, 0.9, '#27ae60', c.id, NULL, true, NULL, '{"demo_url":"https://notesapp.demo/","is_premium":true,"sales":6800,"rating":4.1,"version":"2.4.0","last_updated":"2026-01-15","tags":["applications","premium","notes-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Alarm App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Alarm App', 'alarm-app', 'Application réveil intelligent', 39, 0.8, '#8e44ad', c.id, NULL, true, NULL, '{"demo_url":"https://alarmapp.demo/","is_premium":true,"sales":5200,"rating":4,"version":"2.1.0","last_updated":"2026-01-15","tags":["applications","premium","alarm-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Camera App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Camera App', 'camera-app', 'Application caméra professionnelle', 49, 1, '#e74c3c', c.id, NULL, true, NULL, '{"demo_url":"https://cameraapp.demo/","is_premium":true,"sales":7500,"rating":4.1,"version":"2.6.0","last_updated":"2026-01-15","tags":["applications","premium","camera-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Gallery App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Gallery App', 'gallery-app', 'Application galerie photos', 45, 0.9, '#f39c12', c.id, NULL, true, NULL, '{"demo_url":"https://galleryapp.demo/","is_premium":true,"sales":6100,"rating":4,"version":"2.3.0","last_updated":"2026-01-15","tags":["applications","premium","gallery-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Task Manager App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Task Manager App', 'task-manager-app', 'Application gestion tâches mobile', 55, 1.3, '#16a085', c.id, NULL, true, NULL, '{"demo_url":"https://taskmanagerapp.demo/","is_premium":true,"sales":9800,"rating":4.2,"version":"3.2.0","last_updated":"2026-01-15","tags":["applications","premium","task-manager-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Barber App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Barber App', 'barber-app', 'Application barbier réservation', 55, 1.2, '#2c3e50', c.id, NULL, true, NULL, '{"demo_url":"https://barberapp.demo/","is_premium":true,"sales":7800,"rating":4.1,"version":"3.0.0","last_updated":"2026-01-15","tags":["applications","premium","barber-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Ebook Reader App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Ebook Reader App', 'ebook-reader-app', 'Application lecteur ebooks', 49, 1, '#e84393', c.id, NULL, true, NULL, '{"demo_url":"https://ebookreaderapp.demo/","is_premium":true,"sales":6500,"rating":4.1,"version":"2.7.0","last_updated":"2026-01-15","tags":["applications","premium","ebook-reader-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';

-- Vehicle App
INSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)
SELECT 'Vehicle App', 'vehicle-app', 'Application gestion véhicules', 59, 1.3, '#d35400', c.id, NULL, true, NULL, '{"demo_url":"https://vehicleapp.demo/","is_premium":true,"sales":5500,"rating":4.1,"version":"2.9.0","last_updated":"2026-01-15","tags":["applications","premium","vehicle-app"]}'::jsonb
FROM public.categories c
WHERE c.slug = 'applications';


-- Vérification
SELECT c.slug, COUNT(p.id) as nb_produits
FROM public.products p
JOIN public.categories c ON c.id = p.category_id
GROUP BY c.slug;
