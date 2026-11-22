/**
 * 调试版：改写 + 把看到的东西打在 Surge 脚本日志里（不联网上报）
 * 看日志：Surge → 脚本日志
 */
(function () {
  var MAP = [
    ["g1.ios.30tb.ai.pro.m", "g1.ai.ultra.3months_ip_90p.acq"],
    ["g1.ios.20tb.m.v2",     "g1.20tb.3months_ip_90p.acq"],
    ["g1.ios.helium.m",      "g1.helium.3months_ip_90p.acq"],
    ["g1.ios.2tb.ai.m",      "g1.2tb.3months_ip_90p.acq"],
    ["g1.ios.2tb.m",         "g1.2tb.3months_ip_90p.acq"]
  ];
  var url = (($request && $request.url) || "?").substring(0, 120);
  var body = null;
  if (typeof $response.body === "string") body = $response.body;
  else if ($response.bodyBytes) {
    var b = new Uint8Array($response.bodyBytes), s = "";
    for (var i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
    body = s;
  }
  if (!body) { console.log("[G1] NOBODY " + url); $done({}); return; }

  var ids = body.match(/g1\.[\w.]{3,50}/g) || [];
  var uniq = []; for (var i = 0; i < ids.length; i++) if (uniq.indexOf(ids[i]) === -1) uniq.push(ids[i]);
  var cur = (body.match(/TRY|USD|JPY|EUR/g) || []).filter(function (v, k, a) { return a.indexOf(v) === k; });

  console.log("[G1] len=" + body.length + " cur=" + cur.join("/") +
              " ids=" + uniq.slice(0, 25).join(",") + " url=" + url);

  var hit = [];
  for (var k = 0; k < MAP.length; k++) {
    if (body.indexOf(MAP[k][0]) !== -1) { hit.push(MAP[k][0] + "->" + MAP[k][1]); body = body.split(MAP[k][0]).join(MAP[k][1]); }
  }
  console.log("[G1] applied=" + (hit.length ? hit.join(" | ") : "none"));
  $done({ body: body });
})();
