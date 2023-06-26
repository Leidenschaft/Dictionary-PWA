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
    "revision": "0648cd8e80d436ebd952f051074bb3ac"
  },
  {
    "url": "index.webmanifest",
    "revision": "c9f4d8f2c065cb099ecc2b42d15bfa11"
  },
  {
    "url": "src.67ccfa53.js",
    "revision": "c4e8c4ce6cecb07476b579b118fcaef6"
  },
  {
    "url": "src.fae73e25.css",
    "revision": "67e3df753409d36355242e6f55e569ad"
  },
  {
    "url": "WebCell-0.f1ffd28b.png",
    "revision": "8097ecfd687ded98721d28d6823561c1"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.precaching.cleanupOutdatedCaches();
