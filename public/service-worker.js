/* Retires the previous offline worker so returning visitors receive fresh assets. */
self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((names) =>
        Promise.all(
          names
            .filter(
              (name) => name === "images" || name.startsWith("workbox-precache")
            )
            .map((name) => caches.delete(name))
        )
      ),
      self.registration.unregister(),
    ])
  );
});
