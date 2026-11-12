# Tecnam P2010: weight & balance and performance

Static web app (`index.html` + `aircraft.js`) to prepare a Tecnam P2010 flight using the European Flight Training forms:

- **Weight & balance**: weight × arm = moment, fuel entered in lbs (6 lbs/gal), taxi and trip fuel deducted, takeoff, landing and zero-fuel CG in % MAC (arm / 4.52 × 100, limits 19–32 %) plotted on the weight–CG envelope, max weight check (2557 lbs).
- **Fuel plan**: flight time × fuel flow gives the trip fuel (fed into the W&B), plus reserve (30 min by default), minimum fuel at the ramp, fuel at landing and endurance, with a no-go when the landing fuel is below the reserve.
- **Performance**: pressure altitude `PA = elev + (29.92 − altimeter) × 1000`, density altitude `DA = PA + 120 × (OAT − ISA)`, headwind / crosswind components (gusts, VRB wind and variable sectors, alert above the 17 kt demonstrated crosswind, every runway end compared on a wind diagram), wind-corrected distances and safety factors (TODR × 1.33, LDR × 1.43), compared with TODA/LDA on a runway bar (margin in ft and %, amber under 10 %, red when short).
- **Fleet**: aircraft list (registration, empty weight and moment, per-aircraft parameters) lives in `aircraft.js`.
- **Weather**: enter the departure ICAO code; the page fetches the latest METAR, field elevation and runways (aviationweather.gov) and preselects the runway most into wind, with its length as TODA/LDA.

- **Offline**: a service worker keeps the app on the device (iPad: Share → Add to Home Screen) and the last weather per airport is saved, so the page works without a network.
- **Print / PDF**: one-page-per-side recap for the flight file (W&B, CG envelope, fuel, conditions, distances, checks, METAR/TAF, signature lines).

Base distances are interpolated from the AFM Section 5 tables (`performance.js`).

aviationweather.gov does not allow direct browser calls (no CORS), so the page goes through public CORS relays (corsproxy.io, allorigins, codetabs). If none answers, paste the METAR by hand.

> Flight preparation aid only. The aircraft POH/AFM is the reference.

## Hosting

GitHub Pages: Settings → Pages → Deploy from a branch → `main` / root.
