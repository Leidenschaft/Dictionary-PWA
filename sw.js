/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts(
  "https://cdn.jsdelivr.net/npm/workbox-sw@4.3.1/build/workbox-sw.min.js"
);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "index.html",
    "revision": "953d3ff6a77f24f9dc11fabbea03b9de"
  },
  {
    "url": "index.webmanifest",
    "revision": "c9f4d8f2c065cb099ecc2b42d15bfa11"
  },
  {
    "url": "src.943261a9.js",
    "revision": "c5f51222ab4d3f7885cfa2a0fcd5d1f3"
  },
  {
    "url": "src.bffc4dd2.css",
    "revision": "c18fbb302fad2283ee671df376715735"
  },
  {
    "url": "WebCell-0.f1ffd28b.png",
    "revision": "8097ecfd687ded98721d28d6823561c1"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.precaching.cleanupOutdatedCaches();
