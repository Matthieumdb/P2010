# Tecnam P2010: weight & balance and performance

Static web app (`index.html` + `aircraft.js`) to prepare a Tecnam P2010 flight using the European Flight Training forms:

- **Weight & balance**: weight × arm = moment, fuel entered in lbs (6 lbs/gal), taxi and trip fuel deducted, takeoff and landing CG in % MAC (arm / 4.52 × 100, limits 19–32 %), max weight check (2557 lbs).
- **Performance**: pressure altitude `PA = elev + (29.92 − altimeter) × 1000`, density altitude `DA = PA + 120 × (OAT − ISA)`, headwind / crosswind components, wind-corrected distances and safety factors (TODR × 1.33, LDR × 1.43), compared with TODA/LDA.
- **Fleet**: aircraft list (registration, empty weight and moment, per-aircraft parameters) lives in `aircraft.js`.
- **Weather**: enter the departure ICAO code; the page fetches the latest METAR, field elevation and runways (aviationweather.gov) and preselects the runway most into wind, with its length as TODA/LDA.

Base distances are read from the POH charts and entered by hand.

aviationweather.gov does not allow direct browser calls (no CORS), so the page goes through public CORS relays (corsproxy.io, allorigins, codetabs). If none answers, paste the METAR by hand.

> Flight preparation aid only. The aircraft POH/AFM is the reference.

## Hosting

GitHub Pages: Settings → Pages → Deploy from a branch → `main` / root.
