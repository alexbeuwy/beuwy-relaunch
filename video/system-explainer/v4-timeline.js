/* Film v4 · Zeitleiste. Alle Zeiten kommen aus v4-cues.js (Stimme, Zeile für Zeile). */
(function () {
  window.__timelines = window.__timelines || {};
  var tl = gsap.timeline({ paused: true });
  var Q = window.CUES;

  function L(id) { return Q[id].s; }
  function E(id) { return Q[id].s + Q[id].d; }
  function norm(w) { return w.toLowerCase().replace(/[^a-zäöüß0-9]/g, ""); }
  function W(id, word, n) {
    var k = n || 0, want = norm(word);
    for (var i = 0; i < Q[id].w.length; i++) {
      if (norm(Q[id].w[i][0]).indexOf(want) === 0) { if (k === 0) return Q[id].w[i][1]; k--; }
    }
    throw new Error("Wort fehlt: " + id + " " + word);
  }

  function ft(t, from, to, at) { to.immediateRender = false; tl.fromTo(t, from, to, at); }
  function ft0(t, from, to, at) { tl.set(t, from, 0); ft(t, from, to, at); }
  function show(t, at) { tl.set(t, { autoAlpha: 1 }, at); }
  function hide(t, at) { tl.set(t, { autoAlpha: 0 }, at); }
  function cut(a, b, at) { hide(a, at); show(b, at); }
  function rise(t, at, d) { ft0(t, { yPercent: 118 }, { yPercent: 0, duration: d || 0.5, ease: "power4.out" }, at); }
  function slam(t, at, s, blur) { ft0(t, { scale: s || 1.7, opacity: 0, filter: "blur(" + (blur || 20) + "px)" }, { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.42, ease: "power4.out" }, at); }
  function pop(t, at, d) { ft0(t, { scale: 0.7, opacity: 0, y: 30 }, { scale: 1, opacity: 1, y: 0, duration: d || 0.45, ease: "back.out(1.8)" }, at); }
  function shake(at, amp) { tl.to("#cam", { keyframes: { x: [0, amp, -amp * 0.7, amp * 0.4, 0], y: [0, -amp * 0.6, amp * 0.5, -amp * 0.2, 0] }, duration: 0.3, ease: "none" }, at); }
  function wiggle(t, at, n) { tl.to(t, { keyframes: { rotation: [0, -14, 12, -9, 6, -3, 0], scale: [1, 1.18, 1.1, 1.12, 1.05, 1.02, 1] }, duration: 0.55, ease: "none" }, at); }
  function badge(t, at) { ft0(t, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(3)" }, at); wiggle(t, at + 0.45); }

  tl.set(".hlb", { scaleX: 0 }, 0);
  tl.set("#board", { scale: 1.25 }, 0);

  /* ---------- Uhr ---------- */
  var H = 520;
  var STR = [[7,8,9,0,1,2,0,1],[5,6,7,8,9,0,1,2,3,8,3],[9,0,1,2,3,4,5,4,0],[1,2,3,4,5,6,7,8,9,0,6,7]];
  STR.forEach(function (l, i) { document.getElementById("st" + i).innerHTML = l.map(function (d) { return "<b>" + d + "</b>"; }).join(""); });
  var IDX = [[5,6,7],[8,9,10],[6,7,8],[9,10,11]];
  tl.set("#clockWrap", { transformOrigin: "0px 0px" }, 0);
  tl.set(["#st0","#st1","#st2","#st3"], { y: 0 }, 0);
  var HUD = { scale: 0.13, x: -21, y: -184 }, BIG = { scale: 1, x: 0, y: 0 };
  function clockTo(state, at, d) { ft("#clockWrap", {}, Object.assign({ duration: d || 0.55, ease: "expo.inOut" }, state), at); }
  function rollTo(k, at, d) {
    for (var c = 0; c < 4; c++) {
      var a = k === 0 ? 0 : IDX[c][k - 1], b = IDX[c][k];
      if (a === b && k > 0) continue;
      ft("#st" + c, { y: -a * H, filter: "blur(12px)" }, { y: -b * H, filter: "blur(0px)", duration: (d || 0.9) + c * 0.06, ease: "power3.inOut" }, at + c * 0.05);
    }
  }

  /* ========== HOOK · gelb ========== */
  slam("#hk1", L("h1"), 1.8, 24); shake(L("h1"), 8);
  ft("#hk1", { y: 0, scale: 1 }, { y: -270, scale: 0.5, duration: 0.5, ease: "expo.inOut" }, L("h2") - 0.15);
  ["#hk2", "#hk3", "#hk4"].forEach(function (h, i) {
    ft0(h, { x: -1900, filter: "blur(18px)" }, { x: 0, filter: "blur(0px)", duration: 0.5, ease: "expo.out" }, W("h2", "Weniger", i) - 0.05);
  });
  var h3 = L("h3");
  ft("#hk1", { y: -270, filter: "blur(0px)" }, { y: -1420, filter: "blur(16px)", duration: 0.3, ease: "power3.in" }, h3 - 0.1);
  ft("#hkList", { y: 0, filter: "blur(0px)" }, { y: -1150, filter: "blur(16px)", duration: 0.3, ease: "power3.in" }, h3 - 0.1);
  ft0("#dbl", { opacity: 0 }, { opacity: 1, duration: 0.01 }, h3 + 0.1);
  ft0("#dblX", { scale: 2.4, opacity: 0, filter: "blur(24px)", rotation: -8 }, { scale: 1, opacity: 1, filter: "blur(0px)", rotation: 0, duration: 0.5, ease: "power4.out" }, W("h3", "verdoppeln"));
  shake(W("h3", "verdoppeln"), 10);
  ft0("#dblT", { x: 200, opacity: 0 }, { x: 0, opacity: 1, duration: 0.55, ease: "expo.out" }, W("h3", "Mandate"));
  ft0("#pill30", { scale: 0.6, opacity: 0, y: 40 }, { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(2)" }, W("h3", "dreißig") - 0.05);
  ft("#dbl", { scale: 1 }, { scale: 1.04, duration: 4, ease: "sine.inOut" }, h3);

  /* ========== STORY · dunkel ========== */
  var s1 = L("s1");
  cut("#sHook", "#sNacht", s1 - 0.1);
  show("#clockWrap", s1 - 0.1);
  tl.set("#clockWrap", { scale: 1.1, x: -82, y: -26 }, 0);
  rollTo(0, s1, 1.0);
  ft("#clockWrap", { scale: 1.1, x: -82, y: -26 }, { scale: 1, x: 0, y: 0, duration: 1.8, ease: "power2.out" }, s1);
  clockTo(HUD, L("s2") - 0.25, 0.55);
  ft0("#ph1", { y: 1300, z: -700, rotationX: 40, rotationY: -30 }, { y: 0, z: 0, rotationX: 6, rotationY: -12, duration: 0.85, ease: "power4.out" }, L("s2") - 0.15);
  ft("#ph1", { rotationY: -12, rotationX: 6 }, { rotationY: -5, rotationX: 2, duration: 3.2, ease: "sine.inOut" }, L("s2") + 0.7);
  ft0("#dots", { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2)" }, L("s2") + 0.6);
  hide("#dots", W("s2", "Ich") - 0.05);
  pop("#bub1", W("s2", "Ich") - 0.05, 0.4);
  badge("#rb1", W("s2", "Ich"));

  var s3 = L("s3");
  cut("#sNacht", "#sDuell", s3 - 0.08);
  slam("#dW", s3 - 0.08, 1.4, 16);
  ft0("#dM", { x: 900, opacity: 0, filter: "blur(18px)" }, { x: 0, opacity: 1, filter: "blur(0px)", duration: 0.5, ease: "expo.out" }, W("s3", "siebenhundert") - 0.05);
  shake(W("s3", "siebenhundert"), 7);
  var s4 = L("s4");
  ft0("#rope", { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: "power3.out" }, s4);
  pop("#tag", s4 + 0.25, 0.4);
  tl.to("#tag", { keyframes: { x: [0, -170, 120, -210, 90, -140, 60, 0] }, duration: 2.6, ease: "none" }, s4 + 0.7);
  tl.to("#rope", { keyframes: { rotation: [0, -1.2, 0.9, -1.5, 0.6, -1, 0.4, 0] }, duration: 2.6, ease: "none" }, s4 + 0.7);
  ft0("#notar", { opacity: 0, y: 30, scale: 1 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, W("s4", "statt") - 0.05);
  ft("#notar", { scale: 1, y: 0, opacity: 1 }, { scale: 0.6, y: 90, opacity: 0.2, duration: 1.1, ease: "power2.in" }, W("s4", "Notar"));

  var s5 = L("s5");
  cut("#sDuell", "#sTask", s5 - 0.08);
  clockTo(BIG, s5 - 0.1, 0.45);
  rollTo(1, s5 + 0.15, 0.8);
  clockTo(HUD, L("s6") - 0.2, 0.5);
  ft0("#task1", { y: 700, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power4.out" }, L("s6") - 0.15);
  pop("#krank", W("s6", "krank") - 0.05, 0.4);
  pop("#offen", W("s7", "liegen") - 0.05, 0.4);
  ft("#task1", { opacity: 1, filter: "blur(0px) saturate(1)", y: 0, scale: 1 }, { opacity: 0, filter: "blur(10px) saturate(0)", y: 120, scale: 0.92, duration: 1.4, ease: "power2.in" }, W("s8", "verloren") - 0.1);
  ft0("#noti", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, W("s8", "erfahren"));

  var s9 = L("s9");
  cut("#sTask", "#sTools", s9 - 0.08);
  clockTo(BIG, s9 - 0.1, 0.45);
  rollTo(2, s9 + 0.12, 0.75);
  clockTo(HUD, L("s10") - 0.15, 0.45);
  var TL = ["KI-Assistent","Chatbot","Auto-Post","Smart CRM","Lead-Scoring","GPT-Exposé","Funnel-Tool","Bot-Mail","Social-KI","Text-KI","Voice-Bot","Deal-AI","Auto-Reply","Planer-KI","Score-App","Prompt-Pro","Video-KI","Mail-KI","Analyse-KI","Upload-Bot"];
  var tHtml = "";
  TL.forEach(function (n, i) {
    var col = i % 6, row = Math.floor(i / 6);
    var x = 40 + col * 250 + (row % 2) * 125, y = 230 + row * 250;
    tHtml += '<div class="tile" id="tl' + i + '" style="left:' + x + 'px;top:' + y + 'px"><i class="' + ["", "k", "s"][i % 3] + '"></i>' + n + '</div>';
  });
  document.getElementById("tiles").innerHTML = tHtml;
  var w1 = W("s10", "Zehn"), w2 = W("s10", "Fünfzig");
  TL.forEach(function (n, i) {
    var at = i < 10 ? w1 + i * 0.07 : w2 + (i - 10) * 0.06;
    var rot = ((i * 37) % 21) - 10;
    ft0("#tl" + i, { y: -900, rotation: rot * 2, opacity: 0 }, { y: 0, rotation: rot, opacity: 1, duration: 0.55, ease: "back.out(1.4)" }, at);
    ft("#tl" + i, { y: 0, filter: "blur(0px)" }, { y: 1300 + (i % 5) * 60, rotation: rot * 4, filter: "blur(6px)", duration: 0.7, ease: "power3.in" }, L("s12") - 0.15 + (i % 7) * 0.025);
  });
  pop("#appI", w1 + 0.1, 0.45);
  badge("#rb2", w1 + 0.4);
  tl.set(["#rbn2", "#rbn3", "#rbn4"], { opacity: 0 }, 0);
  [[w1 + 1.0, "#rbn1", "#rbn2"], [w2, "#rbn2", "#rbn3"], [w2 + 0.8, "#rbn3", "#rbn4"]].forEach(function (x) { tl.set(x[1], { opacity: 0 }, x[0]); tl.set(x[2], { opacity: 1 }, x[0]); wiggle("#rb2", x[0]); });
  ft("#appI", { opacity: 1 }, { opacity: 0, duration: 0.3 }, L("s12") - 0.15);
  ft("#rb2", { opacity: 1 }, { opacity: 0, duration: 0.3 }, L("s12") - 0.15);
  ft0("#bot", { scale: 0.5, opacity: 0, y: 60 }, { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.8)" }, L("s11") - 0.05);
  ft("#bot", { scaleY: 1, scaleX: 1, y: 0, opacity: 1 }, { scaleY: 0.08, scaleX: 1.15, y: 40, opacity: 0, duration: 0.3, ease: "power4.in" }, W("s11", "verdammten"));
  shake(W("s11", "verdammten") + 0.25, 9);
  slam("#absch", L("s12") - 0.02, 1.6, 20);
  ft0("#ruhe", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, W("s12", "Ruhe"));

  var s13 = L("s13");
  cut("#sTools", "#sMap", s13 - 0.08);
  hide("#clockWrap", s13 - 0.08);
  tl.set("#map", { transformOrigin: "900px 560px" }, 0);
  ft("#map", { scale: 1.5 }, { scale: 1.1, duration: 4.4, ease: "power2.out" }, s13 - 0.08);
  ft("#h2", { x: 0, y: 0 }, { x: 1080, y: -280, duration: 1.8, ease: "power2.inOut" }, W("s13", "wagen"));
  ft0("#warum", { scale: 1.8, opacity: 0, filter: "blur(22px)" }, { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.45, ease: "power4.out" }, L("s14") - 0.03);
  ft("#map", { opacity: 1 }, { opacity: 0.18, duration: 0.4 }, L("s14"));
  ft("#warum", { scale: 1 }, { scale: 1.08, duration: 1.4, ease: "power1.in" }, L("s14") + 0.4);

  /* ========== WENDE · gelb (Drop) ========== */
  var C = L("w1");
  cut("#sMap", "#sWende", C - 0.02);
  ft0("#flash", { opacity: 0 }, { opacity: 0.85, duration: 0.05, ease: "none" }, C - 0.06);
  ft("#flash", { opacity: 0.85 }, { opacity: 0, duration: 0.3, ease: "power2.out" }, C - 0.01);
  slam("#schluss", C, 1.9, 26); shake(C, 14);
  var c2 = L("w2");
  ft("#schluss", { x: 0, y: 0, scale: 1 }, { x: -380, y: -260, scale: 0.52, duration: 0.5, ease: "expo.inOut" }, c2 - 0.3);
  ft0("#wPhone", { y: 1100, rotationX: 30, rotationY: -26 }, { y: 0, rotationX: 4, rotationY: -12, duration: 0.8, ease: "power4.out" }, c2 - 0.25);
  rise("#wt1", W("w2", "Sprachnachricht") - 0.3);
  pop("#vm", W("w2", "Sprachnachricht"), 0.4);
  var wv = ""; for (var i = 0; i < 26; i++) wv += '<i id="wv' + i + '" style="height:' + (18 + ((i * 53) % 38)) + 'px"></i>';
  document.getElementById("wave").innerHTML = wv;
  for (var j = 0; j < 26; j++) ft("#wv" + j, { scaleY: 1 }, { scaleY: 0.3 + ((j * 29) % 10) / 10, duration: 0.18, ease: "sine.inOut", yoyo: true, repeat: 5 }, W("w2", "Sprachnachricht") + 0.1 + (j % 5) * 0.03);
  rise("#wt2", W("w2", "Den") - 0.05);
  pop("#vmR", W("w2", "machen"), 0.4);

  /* ========== DREAM STATE ========== */
  var d1 = L("d1");
  cut("#sWende", "#sD1", d1 - 0.1);
  ft0("#gs", { y: 500, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power4.out" }, d1 - 0.1);
  var q = "Immobilienmakler in Ihrer Stadt";
  tl.set("#gsTx", { textContent: "" }, 0);
  for (var k = 1; k <= q.length; k++) tl.set("#gsTx", { textContent: q.slice(0, k) }, d1 + 0.3 + k * 0.035);
  ["#gr0", "#gr1", "#gr2"].forEach(function (g, i) { ft0(g, { y: 40, opacity: 0 }, { y: 0, opacity: i === 2 ? 0.45 : 1, duration: 0.45, ease: "power3.out" }, d1 + 1.5 + i * 0.12); });
  slam("#d1q", W("d1", "erste") - 0.1, 1.3, 12);
  ft("#gr1", { scale: 1 }, { scale: 1.04, duration: 0.3, yoyo: true, repeat: 1, ease: "power2.out" }, W("d1", "erste"));

  var d2 = L("d2");
  cut("#sD1", "#sD2", d2 - 0.08);
  slam("#d2q", d2 - 0.08, 1.4, 14);
  ["#cl1", "#cl2", "#cl3"].forEach(function (c, i) { ft0(c, { x: 1300, opacity: 0 }, { x: 0, opacity: 1, duration: 0.55, ease: "expo.out" }, d2 + 0.25 + i * 0.3); });
  badge("#rb3", d2 + 1.2);
  tl.to("#calls", { keyframes: { x: [0, 5, -5, 4, -4, 0] }, duration: 0.4, ease: "none" }, W("d2", "Nicht"));

  var d3 = L("d3");
  cut("#sD2", "#sD3", d3 - 0.08);
  ft0("#kol", { y: 300, opacity: 0, scale: 0.92 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.5)" }, d3 - 0.05);

  var d4 = L("d4");
  cut("#sD3", "#sD4", d4 - 0.08);
  slam("#d4q", d4 - 0.08, 1.4, 14);
  ["#mk1", "#mk2", "#mk3"].forEach(function (m, i) {
    ft0(m, { z: -900, rotationY: -40 + i * 40, opacity: 0 }, { z: 0, rotationY: -12 + i * 12, opacity: 1, duration: 0.7, ease: "power4.out" }, d4 + 0.2 + i * 0.15);
  });

  var d5 = L("d5");
  cut("#sD4", "#sD5", d5 - 0.08);
  slam("#feier", d5 - 0.08, 1.6, 18);
  ft0("#feierL", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, d5 + 0.5);

  /* ========== ANGEBOT · weiß ========== */
  var D0 = L("o1");
  cut("#sD5", "#sPortal", D0 - 0.08);
  var obj = [["Einfamilienhaus","649.000 €"],["Stadtvilla","1.190.000 €"],["Penthouse","785.000 €"],["Reihenhaus","465.000 €"],["Altbau-ETW","398.000 €"],["Bungalow","529.000 €"],["Neubau-ETW","612.000 €"],["DHH","575.000 €"]];
  document.getElementById("pgrid").innerHTML = obj.map(function (o) { return '<div class="pobj"><div class="im"><svg viewBox="0 0 24 24" fill="none" stroke="#161613" stroke-width="1.4"><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v10h13V10"/></svg></div><div class="tx"><b>' + o[1] + '</b><span>' + o[0] + '</span></div></div>'; }).join("");
  ft0("#brow", { y: 900, z: -900, rotationX: 38, rotationY: 0 }, { y: 0, z: -120, rotationX: 14, duration: 1.0, ease: "power4.out" }, D0 - 0.08);
  ft("#brow", { z: -120, rotationX: 14, rotationY: 0 }, { z: 60, rotationX: 4, rotationY: -6, duration: 2.6, ease: "sine.inOut" }, D0 + 0.95);
  var RS = ["Marke.", "Website.", "Rechner.", "Prozesse."];
  ["#rs1", "#rs2", "#rs3", "#rs4"].forEach(function (r, i) {
    var t = W("o2", RS[i]);
    show(r, t - 0.02);
    ft(r, { scale: 1.35, opacity: 0, filter: "blur(14px)" }, { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.28, ease: "power4.out" }, t - 0.02);
    if (i < 3) hide(r, W("o2", RS[i + 1]) - 0.03);
  });
  hide("#rs4", L("o3") - 0.05);
  ft("#brow", { filter: "blur(0px)", opacity: 1 }, { filter: "blur(10px)", opacity: 0.35, duration: 0.2 }, L("o2") - 0.05);
  ft("#brow", { filter: "blur(10px)", opacity: 0.35 }, { filter: "blur(0px)", opacity: 1, duration: 0.3 }, L("o3") - 0.05);
  ft("#brow", { z: 60, rotationX: 4, rotationY: -6 }, { z: 340, rotationX: 0, rotationY: 0, y: 180, duration: 1.6, ease: "power2.inOut" }, L("o3"));
  ft("#tg1", { x: 0, opacity: 1 }, { x: 700, opacity: 0, duration: 0.5, ease: "power3.in" }, W("o3", "vor"));
  ft("#tg2", { x: 0, opacity: 1 }, { x: 700, opacity: 0, duration: 0.5, ease: "power3.in" }, W("o3", "vor") + 0.1);

  var o4 = L("o4");
  cut("#sPortal", "#sRech", o4 - 0.08);
  ft0("#rech", { y: 700, rotationX: 20, opacity: 0 }, { y: 0, rotationX: 0, opacity: 1, duration: 0.6, ease: "power4.out" }, o4 - 0.08);
  tl.set("#rv2", { yPercent: 100 }, 0);
  ft("#rv1", { yPercent: 0, filter: "blur(0px)" }, { yPercent: -100, filter: "blur(6px)", duration: 0.55, ease: "power3.inOut" }, W("o4", "Boden") - 0.1);
  ft("#rv2", { yPercent: 100, filter: "blur(6px)" }, { yPercent: 0, filter: "blur(0px)", duration: 0.55, ease: "power3.inOut" }, W("o4", "Boden") - 0.1);
  tl.set("#rKnob", { left: "96%" }, 0);
  tl.set("#rFill", { scaleX: 0.96 }, 0);
  ft("#rKnob", { x: 0 }, { x: -0.6 * 1040, duration: 1.8, ease: "power3.inOut" }, W("o4", "Fantasiepreisen"));
  ft("#rFill", { scaleX: 0.96 }, { scaleX: 0.36, duration: 1.8, ease: "power3.inOut" }, W("o4", "Fantasiepreisen"));
  tl.set("#rLab", { textContent: "Wunschpreis des Eigentümers" }, 0);
  tl.set("#rLab", { textContent: "Marktwert laut Rechner" }, W("o4", "Boden") + 0.2);
  shake(W("o4", "Boden") + 0.3, 6);

  var o5 = L("o5");
  cut("#sRech", "#sCal", o5 - 0.08);
  slam("#calT", o5 - 0.08, 1.4, 14);
  ["#n1", "#n2", "#n3", "#n4"].forEach(function (n, i) { ft0(n, { y: -500, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: "back.out(1.5)" }, o5 + 0.3 + i * 0.12); });

  var o6 = L("o6");
  cut("#sCal", "#sAuto", o6 - 0.08);
  ft0("#task2", { y: 700, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power4.out" }, o6 - 0.08);
  ["#fc1", "#fc2", "#fc3", "#fc4"].forEach(function (f, i) { pop(f, o6 + 0.6 + i * 0.25, 0.4); });

  var o7 = L("o7");
  cut("#sAuto", "#sHub", o7 - 0.08);
  slam("#hubT", o7 - 0.05, 1.3, 12);
  pop("#hub", o7 + 0.2, 0.5);
  var CR = [["onOffice", -560, -170], ["Propstack", 480, -170], ["FLOWFACT", -640, 150], ["Bottimmo", 540, 150], ["Justimmo", -300, 330], ["CASAONE", 260, 330]];
  var lh = "", ch = "";
  CR.forEach(function (c, i) {
    var len = Math.sqrt(c[1] * c[1] + c[2] * c[2]) - 60, ang = Math.atan2(c[2], c[1]) * 180 / Math.PI;
    lh += '<div class="ln2" id="ln' + i + '" style="width:' + len.toFixed(0) + 'px;transform:rotate(' + ang.toFixed(1) + 'deg)"></div>';
    ch += '<div class="crm" id="cr' + i + '" style="left:' + (960 + c[1] - 130) + 'px;top:' + (540 + c[2] - 42) + 'px">' + c[0] + '</div>';
  });
  document.getElementById("lines").innerHTML = lh;
  document.getElementById("crms").innerHTML = ch;
  CR.forEach(function (c, i) {
    pop("#cr" + i, o7 + 0.6 + i * 0.1, 0.4);
    tl.set("#ln" + i, { scaleX: 0 }, 0);
    tl.to("#ln" + i, { scaleX: 1, duration: 0.5, ease: "power3.out" }, o7 + 1.1 + i * 0.12);
  });
  tl.set(["#cr0", "#cr1"], { backgroundColor: "#ffffff" }, 0);
  tl.to("#cr0", { backgroundColor: "#efe683", duration: 0.2 }, W("o7", "onOffice"));
  tl.to("#cr1", { backgroundColor: "#efe683", duration: 0.2 }, W("o7", "Propstack"));
  ft("#hub", { scale: 1 }, { scale: 1.15, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out" }, W("o7", "integriert"));

  /* ========== BEWEIS · gelb ========== */
  var o8 = L("o8");
  cut("#sHub", "#sProof", o8 - 0.08);
  var digits = [["0","1","2"], ["0","1","2","3","4","5","6","7","8","9","0","1"], ["0","1","2","3","4","5","6","7","8","9","0"], ["0","1","2","3","4","5","6","7","8","9","0"]];
  var pn = "";
  digits.forEach(function (l, i) {
    pn += '<div class="dc"><div class="s" id="ps' + i + '">' + l.map(function (d) { return "<b>" + d + "</b>"; }).join("") + '</div></div>';
    if (i === 0) pn += '<div class="dc pt"><div class="s"><b>.</b></div></div>';
  });
  document.getElementById("pNum").innerHTML = pn;
  [2, 11, 10, 10].forEach(function (idx, i) { ft0("#ps" + i, { y: 0, filter: "blur(12px)" }, { y: -idx * 440, filter: "blur(0px)", duration: 1.3 + i * 0.12, ease: "power3.out" }, W("o8", "zweitausend") + i * 0.06); });
  ft0("#pLab", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, W("o8", "Beurkundungen"));
  ft("#prf1", { scale: 1 }, { scale: 1.05, duration: 4.4, ease: "sine.inOut" }, o8);

  var o9 = L("o9");
  cut("#sProof", "#sRiegel", o9 - 0.08);
  ft0("#kf .lab", { opacity: 0 }, { opacity: 1, duration: 0.3 }, o9 - 0.05);
  rise("#kfN", W("o9", "RIEGEL") - 0.1, 0.5);
  slam("#p9", W("o9", "neun") - 0.05, 2.2, 26); shake(W("o9", "neun"), 12);
  ft0("#p9L", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, W("o9", "Mandate"));

  /* ========== SCHLUSS · dunkel ========== */
  var o10 = L("o10");
  cut("#sRiegel", "#sNur", o10 - 0.08);
  rise("#nu1", o10 - 0.05, 0.55);
  rise("#nu2", W("o10", "mit") - 0.05, 0.55);
  var o11 = L("o11");
  cut("#sNur", "#sBoard", o11 - 0.08);
  ft0("#br1", { rotationX: -90, opacity: 0 }, { rotationX: 0, opacity: 1, duration: 0.5, ease: "back.out(1.6)" }, o11);
  ft0("#br2", { rotationX: -90, opacity: 0 }, { rotationX: 0, opacity: 1, duration: 0.5, ease: "back.out(1.6)" }, o11 + 0.35);
  ft("#brQ", { scale: 1 }, { scale: 1.18, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, o11 + 0.95);
  var o12 = L("o12");
  cut("#sBoard", "#sCta", o12 - 0.08);
  rise("#ctaQ", o12 - 0.05, 0.5);
  ft0("#ctaF", { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.6)" }, o12 + 0.25);
  var city = "Heidelberg";
  tl.set("#ctaTx", { textContent: "" }, 0);
  for (var m = 1; m <= city.length; m++) tl.set("#ctaTx", { textContent: city.slice(0, m) }, o12 + 0.7 + m * 0.06);
  ft0("#ctaPh", { opacity: 1 }, { opacity: 0, duration: 0.01 }, o12 + 0.74);
  var press = o12 + 1.6;
  ft("#ctaB", { scale: 1 }, { scale: 0.92, duration: 0.08, ease: "power2.in" }, press);
  ft("#ctaB", { scale: 0.92 }, { scale: 1, duration: 0.35, ease: "back.out(3)" }, press + 0.08);
  cut("#sCta", "#sEnd", E("o12") + 0.5);
  ft0("#endLogo", { scale: 1.3, opacity: 0, filter: "blur(16px)" }, { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.55, ease: "power4.out" }, E("o12") + 0.5);
  ft0("#endUrl", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, E("o12") + 0.95);

  window.__timelines["v4"] = tl;
  window.__V4_PRESS = press;
})();
