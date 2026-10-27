# Tecnam P2010 : masse & centrage et performances

Webapp statique (un seul fichier `index.html`) pour préparer un vol en Tecnam P2010 selon les fiches European Flight Training :

- **Masse & centrage** : poids × bras = moment, carburant en gallons (6 lbs/gal), déduction roulage et carburant consommé, centrage au décollage et à l'atterrissage en % MAC (bras / 4,52 × 100, limites 19–32 %), contrôle de la masse max (2557 lbs).
- **Performances** : lecture du METAR, altitude pression `PA = elev + (29.92 − calage) × 1000`, altitude densité `DA = PA + 120 × (OAT − ISA)`, composantes vent de face / traversier, distances corrigées du vent et coefficients de sécurité (TODR × 1,33, LDR × 1,43), comparaison avec TODA/LDA.

- **Flotte** : la liste des avions (immatriculation, masse à vide et moment, paramètres propres) est dans `aircraft.js`.
- **Météo** : saisir le code OACI de l'aéroport de départ ; la page récupère le dernier METAR, l'altitude du terrain et les pistes (aviationweather.gov) puis propose la piste la plus face au vent, avec sa longueur en TODA/LDA.

Les distances de base sont lues dans les abaques du manuel de vol et saisies à la main.

aviationweather.gov n'accepte pas les appels directs depuis un navigateur : la page passe par des relais CORS publics (corsproxy.io, allorigins, codetabs). Si aucun ne répond, le METAR peut être collé à la main.

> Outil d'aide à la préparation. Le manuel de vol de l'avion fait foi.

## Utilisation

Ouvrir `index.html` dans un navigateur, ou l'héberger avec GitHub Pages (Settings → Pages → Deploy from branch → `main` / root).
