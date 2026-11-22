(function () {
  var r = $request || {};
  var keys = [];
  for (var k in r) keys.push(k + ":" + (typeof r[k]));
  console.log("[KEYS] fields=" + keys.join(" | "));
  var bb = r.bodyBytes, bd = r.body;
  console.log("[KEYS] typeof body=" + (typeof bd) + " typeof bodyBytes=" + (typeof bb) +
              (bb && bb.byteLength !== undefined ? (" byteLength=" + bb.byteLength) : ""));
  $done({});
})();
