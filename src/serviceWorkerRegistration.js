const LEGACY_CACHE_NAMES = ["images"];

const isLegacyCache = (name) =>
  LEGACY_CACHE_NAMES.includes(name) || name.startsWith("workbox-precache");

export function unregister() {
  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.getRegistration(
        process.env.PUBLIC_URL || "/"
      );
      await registration?.unregister();

      if ("caches" in window) {
        const names = await caches.keys();
        await Promise.all(names.filter(isLegacyCache).map((name) => caches.delete(name)));
      }
    } catch (error) {
      console.warn("Unable to retire the previous service worker.", error);
    }
  });
}
