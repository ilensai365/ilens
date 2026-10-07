// Google tag (Google Ads AW-18498538143 + GA4 G-C835QSVJ9M) with Consent Mode v2 and a small cookie banner.
// Ad/analytics storage stays denied until the visitor clicks "Accept"; the choice is remembered.
// Loaded as a plain script in every page's <head> (index, free, studio, thanks).
(function () {
  var TAG_ID = "AW-18498538143";
  var GA4_ID = "G-C835QSVJ9M";
  var KEY = "ilens-consent";

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  var granted = saved === "granted";

  gtag("consent", "default", {
    ad_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
    analytics_storage: granted ? "granted" : "denied",
    wait_for_update: 500,
  });
  gtag("set", "ads_data_redaction", !granted);
  gtag("set", "url_passthrough", true);

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + TAG_ID;
  document.head.appendChild(s);
  gtag("js", new Date());
  gtag("config", TAG_ID);
  gtag("config", GA4_ID);

  function choose(value) {
    try { localStorage.setItem(KEY, value); } catch (e) {}
    var v = value === "granted" ? "granted" : "denied";
    gtag("consent", "update", { ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v });
    gtag("set", "ads_data_redaction", v !== "granted");
    var el = document.getElementById("ilens-consent");
    if (el) el.remove();
  }
  window.ilensConsent = choose;

  if (saved) return;

  function banner() {
    var css =
      "#ilens-consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:560px;margin:0 auto;" +
      "display:flex;flex-wrap:wrap;align-items:center;gap:14px 18px;padding:16px 18px;border-radius:14px;" +
      "background:rgba(20,18,15,.96);border:1px solid rgba(226,180,100,.28);box-shadow:0 20px 50px -12px rgba(0,0,0,.7);" +
      "font:400 14px/1.5 Inter,system-ui,sans-serif;color:rgba(245,241,232,.8)}" +
      "#ilens-consent p{flex:1 1 260px;margin:0}" +
      "#ilens-consent a{color:#E2B464}" +
      "#ilens-consent .b{display:flex;gap:10px}" +
      "#ilens-consent button{cursor:pointer;border-radius:999px;padding:9px 18px;font:600 13px/1 Inter,system-ui,sans-serif}" +
      "#ilens-consent .y{border:0;color:#14110B;background:linear-gradient(180deg,#F0CF8E,#E2B464 55%,#C99A4E)}" +
      "#ilens-consent .n{border:1px solid rgba(245,241,232,.25);background:transparent;color:#F5F1E8}";
    var st = document.createElement("style");
    st.textContent = css;
    document.head.appendChild(st);
    var d = document.createElement("div");
    d.id = "ilens-consent";
    d.setAttribute("role", "dialog");
    d.setAttribute("aria-label", "Cookie consent");
    d.innerHTML =
      "<p>We use cookies to measure our ads and improve the site. Nothing is stored for ads unless you accept.</p>" +
      '<div class="b"><button class="n" type="button">Reject</button><button class="y" type="button">Accept</button></div>';
    d.querySelector(".n").onclick = function () { choose("denied"); };
    d.querySelector(".y").onclick = function () { choose("granted"); };
    document.body.appendChild(d);
  }
  if (document.body) banner();
  else document.addEventListener("DOMContentLoaded", banner);
})();
