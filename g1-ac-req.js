/**
 * 拦 applecommerce-pa.googleapis.com 的【请求】，看/改它要下单的商品 ID
 */
(function () {
  var url = (($request && $request.url) || "?").substring(0, 140);
  var body = null;
  if (typeof $request.body === "string") body = $request.body;
  else if ($request.bodyBytes) {
    var b = new Uint8Array($request.bodyBytes), s = "";
    for (var i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
    body = s;
  }
  if (!body) { console.log("[ACQ] NOBODY " + url); $done({}); return; }

  var ids = body.match(/[A-Za-z0-9][A-Za-z0-9._:-]{4,80}/g) || [];
  var uniq = []; for (var i = 0; i < ids.length; i++) if (uniq.indexOf(ids[i]) === -1) uniq.push(ids[i]);
  console.log("[ACQ] len=" + body.length + " url=" + url);
  console.log("[ACQ] tokens=" + uniq.slice(0, 40).join(" , "));

  // 试着把计划 ID 改成 90p 商品
  var MAP = [
    ["g1.ios.30tb.ai.pro.m", "g1.ai.ultra.3months_ip_90p.acq"],
    ["g1.ios.20tb.m.v2",     "g1.20tb.3months_ip_90p.acq"],
    ["g1.ios.helium.m",      "g1.helium.3months_ip_90p.acq"],
    ["g1.ios.2tb.ai.m",      "g1.2tb.3months_ip_90p.acq"],
    ["g1.ios.2tb.m",         "g1.2tb.3months_ip_90p.acq"]
  ];
  var hit = [];
  for (var k = 0; k < MAP.length; k++) {
    if (body.indexOf(MAP[k][0]) !== -1) { hit.push(MAP[k][0] + "->" + MAP[k][1]); body = body.split(MAP[k][0]).join(MAP[k][1]); }
  }
  console.log("[ACQ] applied=" + (hit.length ? hit.join(" | ") : "none"));
  $done({ body: body });
})();
