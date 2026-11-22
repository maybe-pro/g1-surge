(function () {
  var HOOK = "https://webhook.site/db1382f5-ae05-4309-a8f3-0520a50e43b1";
  function send(t) { try { $httpClient.post({ url: HOOK, body: t, headers: {"Content-Type":"text/plain"} }, function(){}); } catch (e) {} }
  var url = (($request && $request.url) || "?").substring(0, 150);
  var body = null;
  if (typeof $response.body === "string") body = $response.body;
  else if ($response.bodyBytes) {
    var b = new Uint8Array($response.bodyBytes), s = "";
    for (var i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
    body = s;
  }
  if (!body) { send("AC-NOBODY " + url); $done({}); return; }
  // 抽所有可打印字符串，挑像商品 ID 的
  var strs = body.match(/[A-Za-z0-9][A-Za-z0-9._-]{5,80}/g) || [];
  var seen = [], pick = [];
  for (var i = 0; i < strs.length && pick.length < 60; i++) {
    var t = strs[i];
    if (seen.indexOf(t) !== -1) continue;
    seen.push(t);
    if (/g1|subs|offer|sku|product|tier|iap|apple/i.test(t)) pick.push(t);
  }
  send("AC len=" + body.length + " url=" + url + " || " + pick.join(" , "));
  $done({});
})();
