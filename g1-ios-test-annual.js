/**
 * 测试版：把 30TB 月付指向「年付」商品 g1.ai.ultra.12months_eft
 * 目的：看收银台给不给这个商品、什么价、有没有首期优惠
 * 不改其他档位
 */
(function () {
  var MAP = [
    ["g1.ios.30tb.ai.pro.m", "g1.ai.ultra.12months_eft"],   // ← 本次测试的靶子
    ["g1.ios.20tb.m.v2",     "g1.20tb.3months_ip_90p.acq"]  // 保留，作对照
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
    for (var i = 0; i < MAP.length; i++) {
      if (body.indexOf(MAP[i][0]) !== -1) body = body.split(MAP[i][0]).join(MAP[i][1]);
    }
    $done({ body: body });
  } catch (e) { $done({}); }
})();
