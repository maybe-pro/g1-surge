/**
 * Google One iOS 一折改写
 *
 * 作用：把 one.google.com/ai 返回的计划 ID 换成 App Store 上带
 *       首期 90% OFF（3 个月）的商品 ID，让升级弹窗显示一折价。
 *
 * 已验证（2026-11-22，美国区 Google 账号 + 美区 Apple ID）：
 *   400GB  $4.99  → $0.49 × 3 期
 *   2TB    $9.99  → $0.99 × 3 期
 *   20TB   $99.99 → $9.99 × 3 期
 *   30TB   $199.99→ $19.99 × 3 期
 *   之后全部恢复原价。
 *
 * 100GB 没有 90% 商品（最高 85%），改写它是无效的。
 */

(function () {
  var MAP = [
    ["g1.ios.30tb.ai.pro.m", "g1.ai.ultra.3months_ip_90p.acq"], // 30TB  $199.99 → $19.99
    ["g1.ios.20tb.m.v2",     "g1.20tb.3months_ip_90p.acq"],     // 20TB  $99.99  → $9.99
    ["g1.ios.helium.m",      "g1.helium.3months_ip_90p.acq"],   // 400GB $4.99   → $0.49
    ["g1.ios.2tb.ai.m",      "g1.2tb.3months_ip_90p.acq"],      // 2TB(AI Plus)
    ["g1.ios.2tb.m",         "g1.2tb.3months_ip_90p.acq"]       // 2TB(Google One)
  ];

  // 注意：按字符串逐个替换，长 ID 必须排在会包含它的短 ID 前面
  var body = null;
  if (typeof $response.body === "string") body = $response.body;
  else if ($response.bodyBytes) {
    var b = new Uint8Array($response.bodyBytes), s = "";
    for (var i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
    body = s;
  }
  if (!body) { $done({}); return; }

  for (var i = 0; i < MAP.length; i++) {
    if (body.indexOf(MAP[i][0]) !== -1) {
      body = body.split(MAP[i][0]).join(MAP[i][1]);
    }
  }
  $done({ body: body });
})();
