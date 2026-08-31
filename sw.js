/* ══════════════════════════════════════════════════════════════════
   もちもち（デモ版）── オフライン用

   一度でも開けば、そのあとは電波が無くても動くようにする。
   撮影現場で会場の Wi-Fi を当てにしないための保険。

   Google Fonts（別ドメイン）も、一度目に取ってきたものをそのまま
   溜める。これをやらないと、圏外のとき明朝体が iOS 標準のものに
   差し替わって、行の折り返し位置が変わる。
   ══════════════════════════════════════════════════════════════════ */
var CACHE = "mochimochi-v1";
var CORE  = ["./", "./index.html"];

self.addEventListener("install", function(e){
  e.waitUntil(
    caches.open(CACHE)
      .then(function(c){ return c.addAll(CORE); })
      .then(function(){ return self.skipWaiting(); })
  );
});

/* 古い版のキャッシュを捨てる。CACHE の名前を上げれば入れ替わる */
self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){
        return k === CACHE ? null : caches.delete(k);
      }));
    }).then(function(){ return self.clients.claim(); })
  );
});

/* キャッシュ優先。無ければ取りに行って、取れたら溜める。 */
self.addEventListener("fetch", function(e){
  if(e.request.method !== "GET") return;
  if(e.request.url.indexOf("http") !== 0) return;

  e.respondWith(
    caches.match(e.request).then(function(hit){
      if(hit) return hit;
      return fetch(e.request).then(function(res){
        var copy = res.clone();
        caches.open(CACHE).then(function(c){
          c.put(e.request, copy);
        }).catch(function(){});
        return res;
      }).catch(function(){
        /* 圏外で、まだ溜めていないものを要求された場合。
           本体だけは必ず返す。 */
        if(e.request.mode === "navigate") return caches.match("./index.html");
      });
    })
  );
});
