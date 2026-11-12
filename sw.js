// Offline support: the app files are served from the network when it answers (so updates arrive at once)
// and from this cache when it does not. Weather requests are left to the page, which keeps its own last copy.
const CACHE = "p2010-v1";
const CORE = ["./", "index.html", "aircraft.js", "performance.js", "manifest.webmanifest", "icon-180.png", "icon-192.png", "icon-512.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

function timeout(ms) { return new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), ms)); }

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin === self.location.origin) {
    // Network first, with a short timeout so a weak signal on the ramp does not hang the page.
    e.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const key = url.pathname.endsWith("/") ? url.pathname + "index.html" : url.pathname;
      try {
        const res = await Promise.race([fetch(req), timeout(4000)]);
        if (res && res.ok) cache.put(key, res.clone());
        return res;
      } catch (err) {
        return (await cache.match(key)) || (await cache.match(req, { ignoreSearch: true })) ||
          (req.mode === "navigate" ? await cache.match("index.html") : Response.error());
      }
    })());
  } else if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    // Fonts never change at a given URL: cache first.
    e.respondWith(caches.open(CACHE).then(async (cache) => {
      const hit = await cache.match(req);
      if (hit) return hit;
      const res = await fetch(req);
      if (res && (res.ok || res.type === "opaque")) cache.put(req, res.clone());
      return res;
    }));
  }
});
