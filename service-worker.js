self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("painel-cache").then(cache => {
      return cache.addAll([
        "index.html",
        "assets/css/style.css",
        "assets/js/app.js",
        "manifest.json"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
