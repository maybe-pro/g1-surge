(function () {
  var HOOK = "https://webhook.site/64fca9eb-1df8-47a8-b13f-1ffdd83ca3f4";
  function send(t) { try { $httpClient.post({ url: HOOK, body: t, headers: { "Content-Type": "text/plain" } }, function(){}); } catch (e) {} }
  var MAP = [
    ["g1.ios.30tb.ai.pro.m", "g1.ai.ultra.3months_ip_90p.acq"],
    ["g1.ios.20tb.m.v2",     "g1.20tb.3months_ip_90p.acq"],
    ["g1.ios.helium.m",      "g1.helium.3months_ip_90p.acq"],
    ["g1.ios.2tb.ai.m",      "g1.2tb.3months_ip_90p.acq"],
    ["g1.ios.2tb.m",         "g1.2tb.3months_ip_90p.acq"]
  ];
  try {
    var body = null;
    if (typeof $response.body === "string") body = $response.body;
    else if ($response.bodyBytes) {
      var b = new Uint8Array($response.bodyBytes), s = "";
      for (var i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
      body = s;
    }
    if (!body) { $done({}); return; }
    var hits = [];
    for (var i = 0; i < MAP.length; i++) {
      var n = body.split(MAP[i][0]).length - 1;
      if (n > 0) { hits.push(MAP[i][0] + " x" + n); body = body.split(MAP[i][0]).join(MAP[i][1]); }
    }
    send("V11 " + (hits.length ? hits.join(" | ") : "none"));
    $done({ body: body });
  } catch (e) { send("ERR " + e); $done({}); }
})();
