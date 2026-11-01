/* 我的工具箱 Service Worker
 * 目的：让 PWABuilder 打包出的 App 具备基本离线能力，并让浏览器识别为可安装 PWA。
 * 策略：页面导航用「网络优先 + 缓存兜底」，静态资源用「缓存优先」。
 * 改版时把 CACHE 版本号 +1，旧缓存会在 activate 里自动清理。
 */
var CACHE = "toolbox-v5";
var ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(ASSETS);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== CACHE) return caches.delete(k);
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", function (event) {
  var req = event.request;
  if (req.method !== "GET") return;

  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // 第三方外链（ping0 等）不走缓存

  // 页面导航：优先拿最新版本，断网时回退到缓存
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (cache) {
          cache.put("./index.html", copy);
        });
        return res;
      }).catch(function () {
        return caches.match("./index.html").then(function (res) {
          return res || caches.match("./");
        });
      })
    );
    return;
  }

  // 静态资源：缓存优先，没有再请求网络
  event.respondWith(
    caches.match(req).then(function (hit) {
      if (hit) return hit;
      return fetch(req).then(function (res) {
        if (res && res.status === 200) {
          var copy = res.clone();
          caches.open(CACHE).then(function (cache) { cache.put(req, copy); });
        }
        return res;
      });
    })
  );
});
