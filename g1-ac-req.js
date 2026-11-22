(function () {
  var url = (($request && $request.url) || "?");
  console.log("[ACQ] method=" + (($request && $request.method) || "?") + " len=" + url.length + " url=" + url);

  var h = ($request && $request.headers) || {};
  var keys = [];
  for (var k in h) {
    if (/cookie|authorization/i.test(k)) { keys.push(k + ":<redacted>"); continue; }
    keys.push(k + "=" + String(h[k]).substring(0, 80));
  }
  console.log("[ACQ] headers=" + keys.join(" | ").substring(0, 900));

  var b = null, kind = "none";
  if (typeof $request.body === "string") { b = $request.body; kind = "string"; }
  else if ($request.bodyBytes) {
    var arr = new Uint8Array($request.bodyBytes); kind = "bytes:" + arr.length;
    var s = ""; for (var i = 0; i < arr.length; i++) s += String.fromCharCode(arr[i]);
    b = s;
  }
  if (!b) { console.log("[ACQ] body=none kind=" + kind); $done({}); return; }
  console.log("[ACQ] body kind=" + kind + " first=" + b.substring(0, 300).replace(/[^\x20-\x7e]/g, "."));
  $done({});
})();
