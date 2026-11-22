(function () {
  var HOOK = "https://webhook.site/db1382f5-ae05-4309-a8f3-0520a50e43b1";
  function send(t) { try { $httpClient.post({ url: HOOK, body: t, headers: { "Content-Type": "text/plain" } }, function(){}); } catch (e) {} }
  var body = null;
  if (typeof $response.body === "string") body = $response.body;
  else if ($response.bodyBytes) {
    var b = new Uint8Array($response.bodyBytes), s = "";
    for (var i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
    body = s;
  }
  if (!body) { send("NOBODY url=" + (( $request && $request.url) || "?").substring(0,110)); $done({}); return; }

  // 抓出所有计划 ID 与货币痕迹
  var ids = body.match(/g1\.[\w.]{3,50}/g) || [];
  var uniq = []; for (var i=0;i<ids.length;i++) if (uniq.indexOf(ids[i])===-1) uniq.push(ids[i]);
  var cur = body.match(/TRY|try|USD|usd/g) || [];
  var curSet = []; for (var j=0;j<cur.length;j++) if (curSet.indexOf(cur[j])===-1) curSet.push(cur[j]);

  send("PROBE len=" + body.length + " cur=" + curSet.join("/") + " ids=" + uniq.join(","));

  // 照常改写，方便你继续点
  var MAP = [["g1.ios.30tb.ai.pro.m","g1.ai.ultra.3months_ip_90p.acq"],["g1.ios.20tb.m.v2","g1.20tb.3months_ip_90p.acq"],["g1.ios.helium.m","g1.helium.3months_ip_90p.acq"],["g1.ios.2tb.ai.m","g1.2tb.3months_ip_90p.acq"],["g1.ios.2tb.m","g1.2tb.3months_ip_90p.acq"]];
  var hit = [];
  for (var k=0;k<MAP.length;k++) if (body.indexOf(MAP[k][0])!==-1) { hit.push(MAP[k][0]); body = body.split(MAP[k][0]).join(MAP[k][1]); }
  send("REWRITE applied=" + (hit.length?hit.join("|"):"none"));
  $done({ body: body });
})();
