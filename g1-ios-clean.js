(function () {
  var MAP = [
    ["g1.ios.30tb.ai.pro.m", "g1.ai.ultra.3months_ip_90p.acq"],
    ["g1.ios.20tb.m.v2",     "g1.20tb.3months_ip_90p.acq"],
    ["g1.ios.2tb.m.v2",      "g1.2tb.3months_ip_90p.acq"],
    ["g1.ios.400gb.m",       "g1.helium.3months_ip_90p.acq"]
  ];
  try {
    var body = null;
    if (typeof $response.body === "string") body = $response.body;
    else if ($response.bodyBytes) {
      var b = new Uint8Array($response.bodyBytes), s = "";
      for (var i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
      body = s;
    }
    if (!body) { console.log("[G1] NOBODY"); $done({}); return; }
    var ids = body.match(/g1[\w.]{3,60}/g) || [];
    var uniq = []; for (var i = 0; i < ids.length; i++) if (uniq.indexOf(ids[i]) === -1) uniq.push(ids[i]);
    var hits = [];
    for (var j = 0; j < MAP.length; j++) {
      var f = MAP[j][0], n = body.split(f).length - 1;
      if (n > 0) { hits.push(f + " x" + n); body = body.split(f).join(MAP[j][1]); }
    }
    console.log("[G1] len=" + body.length + " HITS=" + (hits.join(" | ") || "NONE") + " IDS=" + uniq.slice(0, 12).join(","));
    $done({ body: body });
  } catch (e) { console.log("[G1] ERR " + e); $done({}); }
})();
