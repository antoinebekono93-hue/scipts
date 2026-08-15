const fs = require('fs')
const path = require('path')

// ============================================================
// 200 produits premium (50 par catégorie)
// Catégories: wordpress, whmcs, scripts, applications
// ============================================================

const wordpress = [
  ['Avada', 'Thème WordPress polyvalent avec builder', 69, 3.8, '#e74c3c', 'https://avada.theme-fusion.com/', 850000, 4.8, '9.3.1'],
  ['X Theme', 'Thème WordPress ultime avec Stack Builder', 59, 3.2, '#3498db', 'https://theme.co/x/', 320000, 4.7, '10.1.0'],
  ['Bridge', 'Thème WordPress créatif multi-concept', 59, 2.9, '#9b59b6', 'https://bridge.qodeinteractive.com/', 450000, 4.6, '30.2.1'],
  ['Enfold', 'Thème WordPress responsive intuitif', 59, 2.4, '#2ecc71', 'https://kriesi.at/themes/enfold/', 280000, 4.7, '5.6.5'],
  ['Jupiter', 'Thème WordPress multipurpose pro', 59, 2.2, '#f39c12', 'https://jupiter.artbees.net/', 190000, 4.5, '6.10.6'],
  ['The7', 'Thème WordPress pour entreprises', 39, 1.8, '#1abc9c', 'https://the7.io/', 150000, 4.6, '12.2.1'],
  ['WoodMart', 'Thème WordPress WooCommerce', 59, 2.5, '#e67e22', 'https://woodmart.xtemos.com/', 210000, 4.8, '8.1.2'],
  ['Kleo', 'Thème WordPress communauté sociale', 59, 1.6, '#e74c3c', 'https://demo2wpopal.b-cdn.net/kleo/', 90000, 4.4, '5.3.2'],
  ['Salient', 'Thème WordPress créatif avec Nectar Slider', 60, 3.0, '#3498db', 'https://themenectar.com/salient/', 130000, 4.7, '17.2.0'],
  ['Flavor', 'Thème WordPress restaurant & food', 49, 1.4, '#e74c3c', 'https://flavor.groovydev.com/', 45000, 4.5, '2.8.0'],
  ['BeTheme', 'Thème WordPress multipurpose 600+ démos', 59, 3.5, '#8e44ad', 'https://themes.muffingroup.com/be/medicenter/', 260000, 4.6, '27.4.1'],
  ['Divi', 'Thème WordPress builder drag & drop', 89, 4.2, '#2ecc71', 'https://www.elegantthemes.com/demo/', 890000, 4.7, '4.27.4'],
  ['Newspaper', 'Thème WordPress journal & magazine', 59, 2.7, '#c0392b', 'https://newspaper.tagdiv.com/', 310000, 4.5, '12.6.9'],
  ['Uncode', 'Thème WordPress créatif WooCommerce', 59, 2.1, '#16a085', 'https://www.undsgn.com/uncode/', 75000, 4.6, '2.9.4'],
  ['Betheme', 'Thème WordPress avec 700+ pré-fabriqués', 59, 3.4, '#d35400', 'https://themes.muffingroup.com/be/creator/', 240000, 4.6, '27.3.2'],
  ['Impreza', 'Thème WordPress rapide et flexible', 59, 1.9, '#34495e', 'https://impreza.us-themes.com/', 98000, 4.7, '8.36.1'],
  ['Stockholm', 'Thème WordPress élégant et moderne', 59, 1.5, '#7f8c8d', 'https://stockholm.qodeinteractive.com/', 62000, 4.4, '5.7.6'],
  ['Kalium', 'Thème WordPress créatif portfolio', 59, 1.7, '#e84393', 'https://kalium.laborator.co/', 85000, 4.6, '3.10.1'],
  ['Listingo', 'Thème WordPress annuaire d entreprises', 59, 1.3, '#27ae60', 'https://listingo.wpbeaveraddons.com/', 38000, 4.3, '4.0.4'],
  ['Seyo', 'Thème WordPress annuaire et listing', 49, 1.2, '#f1c40f', 'https://seyo.wpdesk.net/', 28000, 4.3, '1.9.0'],
  ['MasterStudy', 'Thème WordPress LMS éducation', 59, 1.8, '#8e44ad', 'https://masterstudy.stylemixthemes.com/', 54000, 4.5, '4.8.6'],
  ['Edumy', 'Thème WordPress éducation en ligne', 59, 1.1, '#2c3e50', 'https://edumy.demo.utheme.net/', 22000, 4.2, '5.0.0'],
  ['Doctor Directory', 'Thème WordPress médecin santé', 59, 1.2, '#16a085', 'https://doctordirectory.demo-3.designinvento.net/', 25000, 4.3, '3.5.0'],
  ['Housico', 'Thème WordPress immobilier', 59, 1.0, '#e67e22', 'https://housico.wpcontent.net/', 19000, 4.2, '2.6.0'],
  ['Rey', 'Thème WordPress WooCommerce avancé', 59, 1.6, '#d35400', 'https://reytheme.com/', 48000, 4.7, '3.4.1'],
  ['Ozean', 'Thème WordPress booking hôtel', 59, 1.0, '#3498db', 'https://ozean.qodeinteractive.com/', 21000, 4.4, '2.9.0'],
  ['Sydney', 'Thème WordPress entreprise gratos pro', 59, 1.4, '#f39c12', 'https://demo.athemes.com/sydney/', 67000, 4.5, '2.3.1'],
  ['Consulting', 'Thème WordPress conseil & finance', 59, 1.5, '#2c3e50', 'https://consulting.stylemixthemes.com/', 45000, 4.4, '7.2.3'],
  ['Classima', 'Thème WordPress petites annonces', 59, 1.2, '#c0392b', 'https://classima.wp-royal-themes.com/', 33000, 4.4, '1.7.2'],
  ['Golf Club', 'Thème WordPress golf sport', 49, 0.8, '#27ae60', 'https://golfclub.qodeinteractive.com/', 9000, 4.3, '2.6.1'],
  ['Lawyer', 'Thème WordPress cabinet juridique', 49, 0.9, '#7f8c8d', 'https://lawyer.demo-15.designinvento.net/', 14000, 4.2, '3.1.0'],
  ['Bosto', 'Thème WordPress blog créatif', 49, 1.1, '#e84393', 'https://bosto.qodeinteractive.com/', 26000, 4.4, '2.5.2'],
  ['Banca', 'Thème WordPress banque & finance', 49, 0.9, '#16a085', 'https://banca.theme9.com/', 15000, 4.3, '3.2.0'],
  ['AutoZone', 'Thème WordPress garage auto', 49, 0.8, '#d35400', 'https://autozone.wp-content.net/', 18000, 4.2, '3.4.1'],
  ['Futurio', 'Thème WordPress blog & ecommerce', 49, 1.3, '#3498db', 'https://futurio.futurethemes.com/', 31000, 4.5, '1.6.1'],
  ['Hotel Master', 'Thème WordPress hôtellerie', 59, 1.2, '#e67e22', 'https://hotelmaster.wpdesk.net/', 27000, 4.3, '4.7.0'],
  ['Mayer', 'Thème WordPress magazine mode', 49, 0.9, '#c0392b', 'https://mayer.qodeinteractive.com/', 12000, 4.2, '2.4.0'],
  ['Parking', 'Thème WordPress parking gestion', 49, 0.7, '#34495e', 'https://parking.wp-content.net/', 6000, 4.1, '2.2.0'],
  ['Eventure', 'Thème WordPress événementiel', 59, 1.1, '#9b59b6', 'https://eventure.demo.gavias.com/', 23000, 4.3, '3.5.0'],
  ['Melody', 'Thème WordPress musique audio', 49, 0.8, '#8e44ad', 'https://melody.qodeinteractive.com/', 11000, 4.2, '2.3.0'],
  ['Craft', 'Thème WordPress portfolio créatif', 49, 1.0, '#2ecc71', 'https://craft.demo-5.designinvento.net/', 20000, 4.4, '3.1.1'],
  ['Ziston', 'Thème WordPress jeux vidéo', 59, 0.9, '#e74c3c', 'https://ziston.qodeinteractive.com/', 8000, 4.1, '2.7.0'],
  ['Invetex', 'Thème WordPress finance trading', 59, 0.8, '#1abc9c', 'https://invetex.qodeinteractive.com/', 7000, 4.2, '2.5.0'],
  ['Medical', 'Thème WordPress clinique médicale', 49, 1.0, '#16a085', 'https://medical.stylemixthemes.com/', 29000, 4.3, '3.8.1'],
  ['Emag', 'Thème WordPress ecommerce multimarché', 59, 0.8, '#f39c12', 'https://emag.wp-content.net/', 5000, 4.1, '2.4.0'],
  ['Travel Tour', 'Thème WordPress agence voyage', 49, 1.1, '#3498db', 'https://traveltour.wp-content.net/', 24000, 4.3, '3.2.0'],
  ['Ultimate Addons Elementor', 'Plugin 60+ widgets Elementor', 59, 3.6, '#e84393', 'https://ultimateelementor.com/', 52000, 4.6, '1.38.1'],
  ['MasterSlider', 'Plugin slider professionnel', 24, 1.2, '#27ae60', 'https://masterslider.com/', 78000, 4.5, '3.9.0'],
  ['LayerSlider', 'Plugin slider animation premium', 25, 1.5, '#8e44ad', 'https://layerslider.com/', 98000, 4.6, '7.11.3'],
  ['Flavor Restaurant', 'Plugin réservation restaurant', 19, 0.5, '#e74c3c', 'https://flavor.groovydev.com/', 4500, 4.0, '1.6.0']
]

const whmcs = [
  ['WHMCS Client Area', 'Module espace client moderne pour WHMCS', 49, 2.1, '#3498db', 'https://whmcs.visual-lines.com/', 12000, 4.5, '3.2.0'],
  ['WHMCS Clean Theme', 'Thème client propre et responsive', 39, 1.8, '#2ecc71', 'https://whmcs.weeblr.com/', 8900, 4.4, '2.9.1'],
  ['WHMCS DirectAdmin', 'Module DirectAdmin pour WHMCS', 59, 1.6, '#e67e22', 'https://directadmin.com/whmcs/', 7600, 4.5, '2.8.0'],
  ['WHMCS cPanel Manager', 'Gestion avancée cPanel dans WHMCS', 65, 1.9, '#c0392b', 'https://cpanelmanager.com/', 9800, 4.6, '3.5.1'],
  ['WHMCS VPS Manager', 'Module gestion serveurs VPS', 69, 1.7, '#8e44ad', 'https://vpsmanager.com/whmcs/', 6700, 4.4, '3.1.0'],
  ['WHMCS Plesk Module', 'Module Plesk extension pour WHMCS', 59, 1.5, '#16a085', 'https://plesk.com/whmcs/', 5400, 4.3, '2.6.0'],
  ['WHMCS Fraud Protection', 'Module anti-fraude et vérification', 49, 1.4, '#e74c3c', 'https://fraud.whmcsmodules.com/', 6200, 4.2, '2.4.0'],
  ['WHMCS Ticket Fusion', 'Module fusion tickets support', 39, 1.2, '#f39c12', 'https://ticketfusion.com/', 4100, 4.3, '1.9.0'],
  ['WHMCS Cron Manager', 'Module gestion cron jobs avancée', 29, 1.1, '#1abc9c', 'https://cronmanager.com/', 3500, 4.1, '1.7.0'],
  ['WHMCS SMS Gateway', 'Module SMS notifications & OTP', 45, 1.6, '#2c3e50', 'https://smsgateway.whmcs/', 8900, 4.5, '3.4.2'],
  ['WHMCS WhatsApp Module', 'Module notification WhatsApp', 39, 1.3, '#27ae60', 'https://whatsapp.whmcsmodules.com/', 7200, 4.4, '2.8.0'],
  ['WHMCS Invoice Designer', 'Module factures personnalisées', 35, 1.4, '#d35400', 'https://invoicedesigner.com/', 5100, 4.3, '3.2.1'],
  ['WHMCS WhatsApp Client', 'Espace client WhatsApp intégré', 42, 1.1, '#e84393', 'https://whatsappclient.com/', 4800, 4.2, '2.5.0'],
  ['WHMCS SolusVM', 'Module SolusVM provisionnement', 55, 1.3, '#9b59b6', 'https://solusvm.whmcsmodules/', 4300, 4.3, '2.7.0'],
  ['WHMCS Hosting Module', 'Module plan hébergement avancé', 59, 1.7, '#3498db', 'https://hostingmodule.com/', 5600, 4.4, '3.3.0'],
  ['WHMCS Domain Reseller', 'Module revendeur domaines', 65, 1.5, '#e67e22', 'https://domainreseller.com/', 3800, 4.2, '2.9.0'],
  ['WHMCS SSL Manager', 'Module gestion certificats SSL', 49, 1.2, '#16a085', 'https://sslmanager.whmcs/', 6700, 4.3, '3.0.1'],
  ['WHMCS Backup Module', 'Module sauvegarde automatique', 45, 1.3, '#2ecc71', 'https://backupmodule.com/', 4900, 4.4, '2.6.0'],
  ['WHMCS Server Monitor', 'Module monitoring serveurs temps réel', 39, 1.1, '#c0392b', 'https://servermonitor.whmcs/', 3300, 4.1, '1.8.0'],
  ['WHMCS Email Template', 'Pack templates emails professionnels', 29, 1.0, '#f39c12', 'https://emailtemplates.com/', 5200, 4.2, '2.2.0'],
  ['WHMCS SEO Module', 'Module SEO automatique pages client', 42, 1.2, '#8e44ad', 'https://seomodule.whmcs/', 2900, 4.1, '1.9.0'],
  ['WHMCS Multi Language', 'Module multi-langues avancé', 35, 1.4, '#1abc9c', 'https://multilang.com/', 6100, 4.4, '3.1.0'],
  ['WHMCS Affiliate Pro', 'Module programme affiliation avancé', 49, 1.3, '#e84393', 'https://affiliatepro.com/', 4400, 4.3, '2.7.0'],
  ['WHMCS API Gateway', 'Module passerelle API personnalisée', 55, 1.1, '#d35400', 'https://apigateway.whmcs/', 3700, 4.2, '2.4.0'],
  ['WHMCS Rate Limiter', 'Module protection contre les abus', 29, 0.9, '#2c3e50', 'https://ratelimiter.com/', 3100, 4.0, '1.6.0'],
  ['WHMCS 2FA Pro', 'Module double authentification avancée', 39, 1.5, '#27ae60', 'https://2fapro.com/', 8400, 4.6, '3.5.0'],
  ['WHMCS Ticket Priority', 'Module priorisation intelligente tickets', 32, 1.0, '#3498db', 'https://ticketpriority.com/', 2600, 4.1, '1.7.0'],
  ['WHMCS Knowledgebase Pro', 'Module base de connaissance avancée', 45, 1.2, '#e74c3c', 'https://knowledgebasepro.com/', 3400, 4.2, '2.5.0'],
  ['WHMCS Order Form Designer', 'Module formulaire commande drag-drop', 42, 1.1, '#f39c12', 'https://orderformdesigner.com/', 2800, 4.1, '2.3.0'],
  ['WHMCS Mobile App', 'Application mobile client WHMCS', 79, 1.3, '#16a085', 'https://mobileapp.whmcs/', 3200, 4.3, '2.8.0'],
  ['WHMCS Admin Theme', 'Thème interface admin moderne', 35, 1.2, '#8e44ad', 'https://admintheme.com/', 4700, 4.3, '2.6.1'],
  ['WHMCS Fraud Checker', 'Module vérification carte anti-fraude', 49, 1.0, '#c0392b', 'https://fraudchecker.com/', 3900, 4.2, '2.2.0'],
  ['WHMCS Invoice PDF', 'Module PDF factures personnalisées', 29, 1.1, '#2ecc71', 'https://invoicepdf.com/', 5400, 4.4, '2.9.0'],
  ['WHMCS Subscription Module', 'Module abonnements récurrents', 55, 1.4, '#e67e22', 'https://subscriptionmodule.com/', 4800, 4.4, '3.0.0'],
  ['WHMCS Cron Status', 'Module statut cron jobs tableau', 25, 0.8, '#1abc9c', 'https://cronstatus.com/', 2100, 4.0, '1.5.0'],
  ['WHMCS Language Packs', 'Pack 20 langues pour WHMCS', 19, 0.9, '#3498db', 'https://languagepacks.com/', 5800, 4.1, '2.4.0'],
  ['WHMCS LiveChat Module', 'Module chat en direct pour clients', 45, 1.3, '#e84393', 'https://livechatmodule.com/', 4300, 4.3, '2.7.0'],
  ['WHMCS Notification Hub', 'Module notifications centralisées', 35, 1.0, '#2c3e50', 'https://notificationhub.com/', 2700, 4.1, '1.8.0'],
  ['WHMCS Domain Checker', 'Module vérificateur domaines amélioré', 39, 1.2, '#27ae60', 'https://domainchecker.com/', 3600, 4.2, '2.5.0'],
  ['WHMCS Renewal Manager', 'Module gestion renouvellements auto', 49, 1.3, '#d35400', 'https://renewalmanager.com/', 4200, 4.3, '2.6.0'],
  ['WHMCS Dark Theme', 'Thème client mode sombre', 25, 0.8, '#34495e', 'https://darktheme.whmcs/', 6800, 4.4, '2.1.0'],
  ['WHMCS Speed Optimizer', 'Module optimisation vitesse pages', 35, 1.1, '#1abc9c', 'https://speedoptimizer.com/', 3100, 4.2, '1.9.0'],
  ['WHMCS API Docs Module', 'Module documentation API automatique', 29, 0.7, '#8e44ad', 'https://apidocsmodule.com/', 1900, 4.0, '1.4.0'],
  ['WHMCS Client Export', 'Module export données clients', 25, 0.8, '#e67e22', 'https://clientexport.com/', 2400, 4.0, '1.6.0'],
  ['WHMCS Cron Optimizer', 'Module optimisation des cron jobs', 32, 1.0, '#c0392b', 'https://cronoptimizer.com/', 2900, 4.1, '1.7.0'],
  ['WHMCS Reseller Panel', 'Module panneau revendeur complet', 69, 1.5, '#3498db', 'https://resellerpanel.com/', 3400, 4.3, '2.8.0'],
  ['WHMCS Ticket Alerts', 'Module alertes tickets temps réel', 29, 0.9, '#2ecc71', 'https://ticketalerts.com/', 3800, 4.2, '2.3.0'],
  ['WHMCS Domain Branding', 'Module branding domaines personnalisé', 35, 0.8, '#e84393', 'https://domainbranding.com/', 2100, 4.0, '1.5.0'],
  ['WHMCS Payment Links', 'Module liens de paiement directs', 32, 1.1, '#27ae60', 'https://paymentlinks.com/', 4500, 4.3, '2.4.0'],
  ['WHMCS Global Search', 'Module recherche globale admin', 25, 0.7, '#f39c12', 'https://globalsearch.com/', 2600, 4.1, '1.6.0']
]

const scripts = [
  ['Bookly', 'Script WordPress réservation rendez-vous', 69, 3.9, '#3498db', 'https://booking-wp-plugin.com/', 89000, 4.6, '24.0'],
  ['Laravel CRM', 'Système CRM complet Laravel', 59, 2.1, '#2ecc71', 'https://laravelcrm.demo/', 32000, 4.4, '3.5.1'],
  ['InvoicePlane', 'Script facturation open source', 39, 1.8, '#e67e22', 'https://invoiceplane.com/', 45000, 4.3, '2.8.0'],
  ['Easy!Appointments', 'Script gestion rendez-vous PHP', 49, 2.4, '#16a085', 'https://easyappointments.org/', 38000, 4.4, '3.2.1'],
  ['Selio', 'Script annonces classées Laravel', 59, 1.9, '#c0392b', 'https://selio.weblify.net/', 27000, 4.5, '4.7.0'],
  ['Jobboard', 'Script site d emploi Laravel', 59, 1.6, '#8e44ad', 'https://jobboard.weblify.net/', 19000, 4.4, '3.9.0'],
  ['Hotel Booking', 'Script réservation hôtelière PHP', 69, 2.2, '#f39c12', 'https://hotelbooking.demo/', 26000, 4.5, '5.2.0'],
  ['POS System', 'Script point de vente restaurant', 59, 1.8, '#e74c3c', 'https://possystem.demo/', 31000, 4.4, '4.1.0'],
  ['Taskify', 'Script gestion tâches Kanban', 39, 1.4, '#1abc9c', 'https://taskify.demo/', 14000, 4.3, '2.6.0'],
  ['Chat App', 'Script messagerie temps réel', 49, 1.7, '#3498db', 'https://chatapp.demo/', 22000, 4.3, '3.4.0'],
  ['Directory Script', 'Script annuaire professionnel', 55, 1.5, '#2c3e50', 'https://directoryscript.demo/', 17000, 4.2, '3.0.0'],
  ['Classified Ads', 'Script petites annonces PHP', 49, 1.6, '#27ae60', 'https://classifiedads.demo/', 21000, 4.3, '4.2.0'],
  ['Elearning LMS', 'Script plateforme e-learning', 69, 2.0, '#e84393', 'https://elearninglms.demo/', 24000, 4.5, '5.1.0'],
  ['Fitness Gym', 'Script gestion salle de sport', 49, 1.3, '#d35400', 'https://fitnessgym.demo/', 12000, 4.2, '2.8.0'],
  ['Rental Script', 'Script location voitures & matériel', 59, 1.7, '#8e44ad', 'https://rentalscript.demo/', 15000, 4.3, '3.5.0'],
  ['Quiz Builder', 'Script création quiz en ligne', 39, 1.2, '#3498db', 'https://quizbuilder.demo/', 18000, 4.2, '2.7.0'],
  ['Event Ticketing', 'Script billetterie événements', 55, 1.5, '#e74c3c', 'https://eventticketing.demo/', 16000, 4.3, '3.2.0'],
  ['Marketplace Script', 'Script marketplace multi-vendeurs', 79, 2.3, '#2ecc71', 'https://marketplacescript.demo/', 20000, 4.5, '6.0.0'],
  ['Food Delivery', 'Script livraison de repas', 69, 1.9, '#f39c12', 'https://fooddelivery.demo/', 28000, 4.4, '4.8.0'],
  ['Fleet Management', 'Script gestion de flotte', 65, 1.4, '#16a085', 'https://fleetmanagement.demo/', 9000, 4.2, '3.1.0'],
  ['Pharmacy Management', 'Script gestion pharmacie', 49, 1.3, '#c0392b', 'https://pharmacymgmt.demo/', 11000, 4.2, '2.9.0'],
  ['Loan Management', 'Script gestion prêts financiers', 65, 1.6, '#8e44ad', 'https://loanmgmt.demo/', 8000, 4.3, '3.4.0'],
  ['Inventory System', 'Script gestion stock inventaire', 55, 1.7, '#1abc9c', 'https://inventorysystem.demo/', 19000, 4.3, '4.5.0'],
  ['School ERP', 'Script gestion école ERP', 69, 1.8, '#3498db', 'https://schoolerp.demo/', 14000, 4.4, '5.0.0'],
  ['Laundry Booking', 'Script réservation blanchisserie', 39, 1.0, '#27ae60', 'https://laundrybooking.demo/', 6000, 4.1, '2.2.0'],
  ['Real Estate Script', 'Script immobilier complet', 69, 2.1, '#e67e22', 'https://realestatescript.demo/', 23000, 4.4, '5.3.0'],
  ['Blog Script', 'Script blog premium PHP', 35, 1.2, '#2c3e50', 'https://blogscript.demo/', 15000, 4.1, '2.6.0'],
  ['Social Network Script', 'Script réseau social PHP', 79, 2.0, '#e84393', 'https://socialnetworkscript.demo/', 17000, 4.3, '4.0.0'],
  ['Email Marketing', 'Script marketing par email', 59, 1.5, '#d35400', 'https://emailmarketing.demo/', 13000, 4.3, '3.3.0'],
  ['Helpdesk Script', 'Script helpdesk support', 49, 1.6, '#8e44ad', 'https://helpdeskscript.demo/', 12000, 4.2, '3.8.0'],
  ['Car Service Booking', 'Script réservation auto services', 49, 1.1, '#16a085', 'https://carservice.demo/', 7500, 4.2, '2.5.0'],
  ['Doctor Booking', 'Script réservation médecins', 55, 1.4, '#2ecc71', 'https://doctorbooking.demo/', 14000, 4.3, '3.6.0'],
  ['News Script', 'Script site actualités', 45, 1.3, '#c0392b', 'https://newsscript.demo/', 10000, 4.1, '2.9.0'],
  ['Portfolio Builder', 'Script portfolio professionnel', 35, 0.9, '#f39c12', 'https://portfoliobuilder.demo/', 7000, 4.1, '2.1.0'],
  ['Finance Tracker', 'Script suivi finances personnelles', 45, 1.2, '#1abc9c', 'https://financetracker.demo/', 9000, 4.2, '2.7.0'],
  ['Salon Booking', 'Script réservation salon beauté', 49, 1.3, '#e84393', 'https://salonbooking.demo/', 13000, 4.3, '3.2.0'],
  ['Taxi Booking', 'Script réservation taxi Uber-like', 69, 1.7, '#3498db', 'https://taxibooking.demo/', 18000, 4.4, '4.5.0'],
  ['Wedding Planner', 'Script organisation mariages', 45, 1.0, '#d35400', 'https://weddingplanner.demo/', 5000, 4.1, '2.3.0'],
  ['Logistics Script', 'Script gestion logistique', 65, 1.4, '#2c3e50', 'https://logisticsscript.demo/', 6500, 4.2, '3.0.0'],
  ['Video Streaming', 'Script plateforme streaming vidéo', 75, 1.8, '#8e44ad', 'https://videostreaming.demo/', 15000, 4.4, '4.2.0'],
  ['Music Download', 'Script téléchargement musique', 55, 1.5, '#e74c3c', 'https://musicdownload.demo/', 12000, 4.2, '3.1.0'],
  ['Sports Betting', 'Script paris sportifs', 79, 1.6, '#f39c12', 'https://sportsbetting.demo/', 8500, 4.3, '4.0.0'],
  ['Language Learning', 'Script apprentissage langues', 55, 1.2, '#16a085', 'https://languagelearning.demo/', 7000, 4.2, '2.9.0'],
  ['Vehicle Tracking', 'Script suivi véhicules GPS', 65, 1.3, '#27ae60', 'https://vehicletracking.demo/', 6000, 4.1, '3.3.0'],
  ['Water Refilling', 'Script gestion eau livraison', 39, 0.8, '#3498db', 'https://waterrefilling.demo/', 4000, 4.0, '2.0.0'],
  ['Barbershop Booking', 'Script réservation barbier', 39, 1.1, '#2c3e50', 'https://barbershop.demo/', 9500, 4.2, '2.4.0'],
  ['Property Listing', 'Script listing propriétés', 55, 1.4, '#e67e22', 'https://propertylisting.demo/', 11000, 4.2, '3.5.0'],
  ['Attendance System', 'Script pointage employés', 45, 1.2, '#8e44ad', 'https://attendancesystem.demo/', 8500, 4.1, '2.8.0'],
  ['Online Exam', 'Script examens en ligne', 49, 1.3, '#1abc9c', 'https://onlineexam.demo/', 13000, 4.2, '3.4.0'],
  ['Ecommerce Script', 'Script e-commerce complet', 65, 2.0, '#e84393', 'https://ecommercescript.demo/', 25000, 4.4, '5.5.0']
]

const applications = [
  ['Flutter Food Delivery App', 'Application livraison repas Flutter', 79, 2.2, '#e74c3c', 'https://flutterfood.demo/', 21000, 4.4, '4.6.0'],
  ['Laravel Hotel App', 'Application hôtel Laravel + Vue', 69, 1.8, '#3498db', 'https://laravelhotel.demo/', 15000, 4.3, '3.8.0'],
  ['React Native Chat', 'Application chat React Native', 59, 1.6, '#2ecc71', 'https://reactchat.demo/', 17000, 4.3, '3.5.0'],
  ['Android POS', 'Application point de vente Android', 65, 1.7, '#f39c12', 'https://androidpos.demo/', 14000, 4.3, '4.2.0'],
  ['Flutter Dating App', 'Application rencontre Flutter', 75, 1.9, '#e84393', 'https://flutterdating.demo/', 18000, 4.4, '4.0.0'],
  ['Flutter Fitness App', 'Application fitness & santé', 69, 1.5, '#16a085', 'https://flutterfitness.demo/', 12000, 4.3, '3.6.0'],
  ['Booking App', 'Application réservation universelle', 65, 1.7, '#8e44ad', 'https://bookingapp.demo/', 13000, 4.3, '4.1.0'],
  ['Taxi App Flutter', 'Application taxi Flutter + Laravel', 79, 2.0, '#d35400', 'https://taxiappfl.demo/', 16000, 4.4, '4.5.0'],
  ['Ecommerce App', 'Application e-commerce React Native', 69, 1.8, '#2c3e50', 'https://ecommerceapp.demo/', 19000, 4.4, '5.0.0'],
  ['ChatBot App', 'Application chatbot intelligence', 65, 1.5, '#27ae60', 'https://chatbotapp.demo/', 9000, 4.2, '3.3.0'],
  ['Fitness Tracker', 'Application suivi fitness Wear OS', 59, 1.3, '#c0392b', 'https://fitnesstracker.demo/', 8000, 4.2, '3.0.0'],
  ['Education App', 'Application cours en ligne mobile', 65, 1.6, '#3498db', 'https://educationapp.demo/', 14000, 4.3, '4.2.0'],
  ['Payment App', 'Application paiement mobile', 75, 1.8, '#2ecc71', 'https://paymentapp.demo/', 12000, 4.4, '3.9.0'],
  ['Grocery App', 'Application courses épicerie', 69, 1.7, '#e67e22', 'https://groceryapp.demo/', 16000, 4.3, '4.3.0'],
  ['Hospital App', 'Application hôpital patients', 65, 1.4, '#16a085', 'https://hospitalapp.demo/', 8500, 4.2, '3.5.0'],
  ['Banking App', 'Application banque mobile', 85, 1.9, '#8e44ad', 'https://bankingapp.demo/', 11000, 4.4, '4.1.0'],
  ['Property App', 'Application immobilière mobile', 69, 1.6, '#f39c12', 'https://propertyapp.demo/', 13000, 4.3, '3.8.0'],
  ['Delivery App', 'Application livraison colis', 65, 1.5, '#e74c3c', 'https://deliveryapp.demo/', 11000, 4.2, '3.6.0'],
  ['Salon App', 'Application salon de beauté', 59, 1.3, '#e84393', 'https://salonapp.demo/', 9500, 4.2, '3.2.0'],
  ['Restaurant App', 'Application restaurant commandes', 65, 1.6, '#d35400', 'https://restaurantapp.demo/', 14000, 4.3, '4.0.0'],
  ['Laundry App', 'Application blanchisserie mobile', 49, 1.1, '#27ae60', 'https://laundryapp.demo/', 6000, 4.1, '2.8.0'],
  ['Medicine App', 'Application pharmacie livraison', 65, 1.4, '#c0392b', 'https://medicineapp.demo/', 9000, 4.2, '3.4.0'],
  ['Rent App', 'Application location matériel', 59, 1.3, '#3498db', 'https://rentapp.demo/', 7500, 4.2, '3.1.0'],
  ['Parking App', 'Application stationnement mobile', 55, 1.2, '#2c3e50', 'https://parkingapp.demo/', 7000, 4.1, '2.9.0'],
  ['Event App', 'Application événements mobile', 59, 1.4, '#8e44ad', 'https://eventapp.demo/', 8500, 4.2, '3.5.0'],
  ['Hotel Booking App', 'Application booking hôtels mobile', 69, 1.7, '#e67e22', 'https://hotelbookingapp.demo/', 12000, 4.3, '4.2.0'],
  ['News App', 'Application actualités mobile', 55, 1.3, '#1abc9c', 'https://newsapp.demo/', 9800, 4.2, '3.0.0'],
  ['Job Search App', 'Application recherche emploi', 65, 1.5, '#e84393', 'https://jobsearchapp.demo/', 10500, 4.3, '3.7.0'],
  ['Portfolio App', 'Application portfolio créatif', 49, 1.0, '#f39c12', 'https://portfolioapp.demo/', 7000, 4.1, '2.6.0'],
  ['Social Media App', 'Application réseau social mobile', 79, 1.8, '#2ecc71', 'https://socialapp.demo/', 13000, 4.4, '4.4.0'],
  ['Video App', 'Application streaming vidéo mobile', 75, 1.7, '#e74c3c', 'https://videoapp.demo/', 9500, 4.3, '3.8.0'],
  ['Music Player App', 'Application lecteur musique', 55, 1.2, '#8e44ad', 'https://musicplayerapp.demo/', 8500, 4.2, '2.9.0'],
  ['Weather App', 'Application météo mobile', 45, 1.0, '#3498db', 'https://weatherapp.demo/', 7800, 4.1, '2.5.0'],
  ['QR Scanner App', 'Application scan QR codes', 39, 0.9, '#2c3e50', 'https://qrscannerapp.demo/', 6500, 4.0, '2.3.0'],
  ['Expense App', 'Application suivi dépenses', 45, 1.1, '#27ae60', 'https://expenseapp.demo/', 8800, 4.2, '2.8.0'],
  ['Water Delivery App', 'Application livraison eau', 49, 1.0, '#16a085', 'https://waterdeliveryapp.demo/', 4500, 4.1, '2.4.0'],
  ['Crypto Trading App', 'Application trading crypto', 79, 1.7, '#f39c12', 'https://cryptotradingapp.demo/', 11000, 4.3, '4.0.0'],
  ['Fitness Coach App', 'Application coach fitness mobile', 65, 1.4, '#c0392b', 'https://fitnesscoachapp.demo/', 8200, 4.2, '3.3.0'],
  ['Inventory App', 'Application gestion stock mobile', 59, 1.3, '#e84393', 'https://inventoryapp.demo/', 9000, 4.2, '3.1.0'],
  ['CRM Mobile App', 'Application CRM mobile', 65, 1.5, '#d35400', 'https://crmapp.demo/', 8700, 4.3, '3.6.0'],
  ['Survey App', 'Application sondages mobile', 49, 1.1, '#3498db', 'https://surveyapp.demo/', 5800, 4.1, '2.7.0'],
  ['Attendance App', 'Application pointage mobile', 55, 1.2, '#2c3e50', 'https://attendanceapp.demo/', 7200, 4.1, '3.0.0'],
  ['Notes App', 'Application notes premium', 45, 0.9, '#27ae60', 'https://notesapp.demo/', 6800, 4.1, '2.4.0'],
  ['Alarm App', 'Application réveil intelligent', 39, 0.8, '#8e44ad', 'https://alarmapp.demo/', 5200, 4.0, '2.1.0'],
  ['Camera App', 'Application caméra professionnelle', 49, 1.0, '#e74c3c', 'https://cameraapp.demo/', 7500, 4.1, '2.6.0'],
  ['Gallery App', 'Application galerie photos', 45, 0.9, '#f39c12', 'https://galleryapp.demo/', 6100, 4.0, '2.3.0'],
  ['Task Manager App', 'Application gestion tâches mobile', 55, 1.3, '#16a085', 'https://taskmanagerapp.demo/', 9800, 4.2, '3.2.0'],
  ['Barber App', 'Application barbier réservation', 55, 1.2, '#2c3e50', 'https://barberapp.demo/', 7800, 4.1, '3.0.0'],
  ['Ebook Reader App', 'Application lecteur ebooks', 49, 1.0, '#e84393', 'https://ebookreaderapp.demo/', 6500, 4.1, '2.7.0'],
  ['Vehicle App', 'Application gestion véhicules', 59, 1.3, '#d35400', 'https://vehicleapp.demo/', 5500, 4.1, '2.9.0']
]

// ============================================================
// Génération du SQL
// ============================================================

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function esc(str) {
  return String(str).replace(/'/g, "''")
}

function buildProducts(categorySlug, products) {
  const usedSlugs = new Set()
  return products.map(([title, description, price, count, color, demo_url, sales, rating, version]) => {
    let slug = slugify(title)
    if (usedSlugs.has(slug)) {
      let n = 2
      while (usedSlugs.has(`${slug}-${n}`)) n++
      slug = `${slug}-${n}`
    }
    usedSlugs.add(slug)
    const metadata = JSON.stringify({
      demo_url,
      is_premium: true,
      sales,
      rating,
      version,
      last_updated: '2026-01-15',
      tags: [categorySlug, 'premium', slugify(title)]
    })
    return `-- ${title}\nINSERT INTO public.products (title, slug, description, price, count, color, category_id, image_id, is_premium, file_url, metadata)\nSELECT '${esc(title)}', '${slug}', '${esc(description)}', ${price}, ${count}, '${color}', c.id, NULL, true, NULL, '${esc(metadata)}'::jsonb\nFROM public.categories c\nWHERE c.slug = '${categorySlug}';\n`
  }).join('\n')
}

const header = `-- ============================================================
-- SEED: 200 produits premium ThemeForest/Codecanyon
-- Catégories: wordpress (50), whmcs (50), scripts (50), applications (50)
-- Généré le ${new Date().toISOString()}
-- Exécuter dans Hasura Console > Data > SQL
-- ============================================================

`

const footer = `
-- Vérification
SELECT c.slug, COUNT(p.id) as nb_produits
FROM public.products p
JOIN public.categories c ON c.id = p.category_id
GROUP BY c.slug;
`

const sql = header +
  '-- ================== WORDPRESS ==================\n' + buildProducts('wordpress', wordpress) + '\n' +
  '-- ================== WHMCS ==================\n' + buildProducts('whmcs', whmcs) + '\n' +
  '-- ================== SCRIPTS ==================\n' + buildProducts('scripts', scripts) + '\n' +
  '-- ================== APPLICATIONS ==================\n' + buildProducts('applications', applications) + '\n' +
  footer

const outDir = path.join(__dirname, '..', 'seed')
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true })
}

const outFile = path.join(outDir, 'seed_products.sql')
fs.writeFileSync(outFile, sql, 'utf8')

console.log(`✅ SQL généré : ${outFile}`)
console.log(`   Total produits : ${wordpress.length + whmcs.length + scripts.length + applications.length}`)
console.log(`   - wordpress    : ${wordpress.length}`)
console.log(`   - whmcs        : ${whmcs.length}`)
console.log(`   - scripts      : ${scripts.length}`)
console.log(`   - applications : ${applications.length}`)