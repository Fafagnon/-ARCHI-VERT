# ARCHI-VERT — Notes de livraison

Site statique (HTML / CSS / JS, sans dépendance externe autre que les polices Google Fonts).

## Comment ouvrir le site
Ouvrez `index.html` dans un navigateur, ou déposez l'ensemble du dossier sur votre hébergement.
La structure de dossiers doit être conservée telle quelle (`css/`, `js/`, `images/` à côté des fichiers `.html`).

## Vos photos
Le dossier `images/` contient des visuels de substitution (fond clair avec le losange de votre logo
et la mention « Photo à ajouter »), pour que le site s'affiche correctement dès maintenant.
Remplacez-les par vos propres photos en gardant exactement les mêmes noms de fichiers, ou
mettez à jour le `src=` correspondant dans le HTML si vous préférez d'autres noms.

Dimensions conseillées (largeur x hauteur, en pixels) :

| Fichier | Utilisation | Dimensions conseillées |
|---|---|---|
| hero-architecte.jpg | Photo principale de la page d'accueil | 900 x 1200 |
| projet-residence-lome.jpg, projet-bureaux-kara.jpg, projet-amenagement-sokode.jpg | Réalisations récentes (accueil) | 640 x 800 |
| equipe-agence.jpg | Section « Nous concrétisons vos projets » | 800 x 600 |
| etape-diagnostic.jpg, etape-conception.jpg, etape-validation.jpg, etape-chantier.jpg | Les 4 étapes de la démarche | 800 x 600 |
| temoignage-1.jpg, temoignage-2.jpg, temoignage-3.jpg | Portraits des témoignages | 300 x 300 (carré) |
| agence-facade.jpg | Page À propos, façade ou bureaux | 800 x 1000 |
| equipe-architecte.jpg, equipe-ingenieur.jpg, equipe-controle.jpg, equipe-projets.jpg | Page À propos, équipe | 600 x 800 |
| service-architecture.jpg … service-controle.jpg (6 fichiers) | Page Services, un visuel par service | 800 x 600 |
| portfolio-1.jpg … portfolio-8.jpg | Page Portfolio | 640 x 800 |

## Logos de vos partenaires
`images/partenaire-1.png` à `partenaire-6.png` : déposez vos 6 logos avec ces mêmes noms
(format PNG avec fond transparent de préférence). Ils s'affichent en niveaux de gris et
retrouvent leur couleur au survol.

## Textes à vérifier avant mise en ligne
- **Chiffres clés** (page d'accueil, bandeau sombre) : "8+ années", "60+ projets", "15+ architectes et
  ingénieurs" sont des estimations de départ — à ajuster avec vos chiffres réels.
- **Noms de projets** (accueil et portfolio) : les intitulés ("Résidence privée — Lomé", etc.) sont des
  exemples de mise en page, à remplacer par vos projets réels.
- **Témoignages** : les trois textes et noms sont fictifs (comme convenu), à remplacer si vous obtenez
  de vrais retours clients.
- **Adresse email de contact** : le site utilise `contact@archi-vert.tg` à titre d'exemple. Recherchez
  cette adresse dans `index.html` et dans `js/main.js` pour la remplacer par votre adresse définitive.

## Comment fonctionne le formulaire de contact
Le site n'ayant pas de serveur, le bouton « Envoyer le message » ouvre directement la messagerie du
visiteur (mailto) avec le message pré-rempli. Le bouton « Discuter sur WhatsApp » ouvre une conversation
WhatsApp vers le numéro (+228) 97 32 71 71.

## Pages du site
- `index.html` — Accueil
- `a-propos.html` — À propos
- `services.html` — Services
- `portfolio.html` — Portfolio
