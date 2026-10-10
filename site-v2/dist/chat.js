// iLens AI chat widget (gold bubble, bottom-right). Talks to the Worker at /api/chat.
// Shows only when GET /api/chat reports ready (API key set), so the site never shows a broken chat.
(function () {
  var API = "/api/chat";
  var KEY = "ilens-chat";
  var PL = document.documentElement.lang === "pl";
  function tr(en, pl) { return PL ? pl : en; }
  var history = [];
  try { history = JSON.parse(sessionStorage.getItem(KEY) || "[]"); } catch (e) {}

  function save() { try { sessionStorage.setItem(KEY, JSON.stringify(history.slice(-24))); } catch (e) {} }

  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; }

  // Turn plain URLs in replies into links (text only, no HTML from the model).
  function addText(node, text) {
    var parts = text.split(/(https?:\/\/[^\s)]+[^\s).,!?])/g);
    parts.forEach(function (p) {
      if (/^https?:\/\//.test(p)) { var a = el("a", null, p.replace(/^https?:\/\/(www\.)?/, "")); a.href = p; a.target = p.indexOf(location.host) > -1 ? "_self" : "_blank"; a.rel = "noopener"; node.appendChild(a); }
      else node.appendChild(document.createTextNode(p));
    });
  }

  var css =
    "#ilc-btn{position:fixed;left:18px;bottom:18px;z-index:9990;width:58px;height:58px;border-radius:50%;border:0;cursor:pointer;" +
    "background:linear-gradient(180deg,#F0CF8E,#E2B464 55%,#C99A4E);box-shadow:0 14px 34px -8px rgba(226,180,100,.6),0 0 0 1px rgba(255,255,255,.25) inset;display:grid;place-items:center}" +
    "#ilc-btn svg{width:26px;height:26px}" +
    "#ilc{position:fixed;left:18px;bottom:88px;z-index:9991;width:min(380px,calc(100vw - 32px));height:min(560px,calc(100vh - 120px));display:none;flex-direction:column;" +
    "border-radius:20px;overflow:hidden;background:rgba(18,16,13,.97);border:1px solid rgba(226,180,100,.28);box-shadow:0 30px 70px -20px rgba(0,0,0,.85);font:400 14px/1.5 Inter,system-ui,sans-serif;color:#F5F1E8}" +
    "#ilc.open{display:flex}" +
    "#ilc header{display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid rgba(245,241,232,.08)}" +
    "#ilc header i{width:28px;height:28px;border-radius:50%;background:conic-gradient(#E2B464,#F6DDA4,#B98840,#E2B464);flex:none}" +
    "#ilc header b{font:600 14px Inter,sans-serif;display:block}#ilc header small{color:rgba(245,241,232,.5);font-size:12px}" +
    "#ilc header button{margin-left:auto;background:none;border:0;color:rgba(245,241,232,.6);font-size:22px;cursor:pointer;line-height:1}" +
    "#ilc .log{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px}" +
    "#ilc .m{max-width:86%;padding:10px 13px;border-radius:16px;white-space:pre-wrap;word-wrap:break-word}" +
    "#ilc .u{align-self:flex-end;background:rgba(245,241,232,.09);border-bottom-right-radius:6px}" +
    "#ilc .a{align-self:flex-start;background:rgba(226,180,100,.09);border:1px solid rgba(226,180,100,.25);border-bottom-left-radius:6px}" +
    "#ilc .a a{color:#E2B464}" +
    "#ilc .chips{display:flex;flex-wrap:wrap;gap:6px}#ilc .chips button{border:1px solid rgba(245,241,232,.2);background:none;color:rgba(245,241,232,.85);border-radius:999px;padding:6px 11px;font:500 12px Inter,sans-serif;cursor:pointer}" +
    "#ilc .chips button:hover{border-color:#E2B464;color:#E2B464}" +
    "#ilc form{display:flex;gap:8px;padding:12px;border-top:1px solid rgba(245,241,232,.08)}" +
    "#ilc input{flex:1;min-width:0;background:rgba(245,241,232,.06);border:1px solid rgba(245,241,232,.12);border-radius:12px;padding:10px 12px;color:#F5F1E8;font:400 14px Inter,sans-serif;outline:none}" +
    "#ilc input:focus{border-color:#E2B464}" +
    "#ilc form button{border:0;border-radius:12px;padding:0 14px;background:#E2B464;color:#14110B;font:600 13px Inter,sans-serif;cursor:pointer}" +
    "#ilc .note{padding:0 14px 10px;color:rgba(245,241,232,.38);font-size:11px}" +
    "#ilc .dots:after{content:'…';animation:ilcd 1s steps(3,end) infinite}@keyframes ilcd{0%{content:'.'}50%{content:'..'}100%{content:'...'}}" +
    "@media (max-width:767px){#ilc-btn{bottom:84px}#ilc{bottom:152px}}";

  function build() {
    var st = el("style"); st.textContent = css; document.head.appendChild(st);
    var btn = el("button"); btn.id = "ilc-btn"; btn.type = "button"; btn.setAttribute("aria-label", "Chat with iLens");
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="#14110B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>';
    var box = el("div"); box.id = "ilc"; box.setAttribute("role", "dialog"); box.setAttribute("aria-label", "iLens assistant");
    box.innerHTML = '<header><i></i><div><b>' + tr("iLens assistant", "Asystent iLens") + '</b><small>' + tr("AI · answers about guides, stores &amp; ads", "AI · pytania o poradniki, sklepy i reklamy") + '</small></div><button type="button" aria-label="' + tr("Close", "Zamknij") + '">×</button></header>';
    var log = el("div", "log"); log.setAttribute("aria-live", "polite"); box.appendChild(log);
    var form = el("form"); var input = el("input"); input.placeholder = tr("Ask about stores, ads or guides…", "Zapytaj o sklepy, reklamy albo poradniki…"); input.maxLength = 1000; input.setAttribute("aria-label", tr("Message", "Wiadomość"));
    var send = el("button", null, tr("Send", "Wyślij")); send.type = "submit"; form.appendChild(input); form.appendChild(send); box.appendChild(form);
    box.appendChild(el("p", "note", "AI can make mistakes. Don't share sensitive data."));
    document.body.appendChild(box); document.body.appendChild(btn);

    function bubble(role, text) { var m = el("div", "m " + (role === "user" ? "u" : "a")); addText(m, text); log.appendChild(m); log.scrollTop = log.scrollHeight; return m; }

    function greet() {
      bubble("assistant", tr("Hi! I can help you choose a guide, a website or online store, or Google Ads & tracking. What are you working on?", "Cześć! Pomogę Ci wybrać poradnik, stronę lub sklep internetowy albo Google Ads i analitykę. Nad czym pracujesz?"));
      var chips = el("div", "chips");
      ["I need an online store", "Google Ads for my business", "Which guide should I start with?"].forEach(function (q) {
        var b = el("button", null, q); b.type = "button"; b.onclick = function () { chips.remove(); ask(q); }; chips.appendChild(b);
      });
      log.appendChild(chips);
    }

    function render() { log.innerHTML = ""; if (!history.length) greet(); history.forEach(function (m) { bubble(m.role, m.content); }); }

    var busy = false;
    function ask(text) {
      if (busy || !text.trim()) return;
      busy = true; history.push({ role: "user", content: text.trim() }); save(); bubble("user", text.trim());
      var wait = bubble("assistant", ""); wait.classList.add("dots");
      fetch(API, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ messages: history }) })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          wait.remove();
          var reply = d.reply || d.error || tr("Sorry, something went wrong. Please write to hello@ilens.co.", "Przepraszamy, coś poszło nie tak. Napisz na hello@ilens.co.");
          if (d.reply) { history.push({ role: "assistant", content: reply }); save(); }
          bubble("assistant", reply);
          if (window.gtag) window.gtag("event", "chat_message", { page: location.pathname });
        })
        .catch(function () { wait.remove(); bubble("assistant", "Connection problem. Please try again, or write to hello@ilens.co."); })
        .then(function () { busy = false; });
    }

    form.onsubmit = function (e) { e.preventDefault(); var t = input.value; input.value = ""; ask(t); };
    function toggle(open) { box.classList.toggle("open", open); if (open) { if (!log.childNodes.length) render(); input.focus(); } }
    btn.onclick = function () { toggle(!box.classList.contains("open")); };
    box.querySelector("header button").onclick = function () { toggle(false); };
  }

  function start() {
    fetch(API).then(function (r) { return r.ok ? r.json() : null; }).then(function (d) { if (d && d.ready) build(); }).catch(function () {});
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
