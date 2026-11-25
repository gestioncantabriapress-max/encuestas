/* Banner "Directo Antolín" (Cantabria FM) con los podcasts de iVoox.
   Uso en la web: poner <div id="cfm-antolin"></div> donde debe salir el banner
   y cargar este archivo una vez (por ejemplo, en la misma etiqueta de Google Tag Manager que la barra):
   <script src="https://gestioncantabriapress-max.github.io/encuestas/antolin/banner.js" defer></script> */
(function () {
  var BASE = "https://gestioncantabriapress-max.github.io/encuestas/antolin/";
  var IVOOX = "https://www.ivoox.com/player_es_podcast_156983_1.html";
  var ALTO_IVOOX = 440;

  function montar() {
    var sitio = document.getElementById("cfm-antolin");
    if (!sitio || sitio.getAttribute("data-montado")) return;
    sitio.setAttribute("data-montado", "1");

    var css = document.createElement("style");
    css.textContent =
      "#cfm-antolin{container-type:inline-size;margin:0 0 24px}" +
      ".cfm-ant{display:grid;grid-template-columns:minmax(260px,38%) 1fr;border-radius:12px;overflow:hidden;background:#0e3220;box-shadow:0 2px 10px rgba(0,0,0,.12);font-family:system-ui,-apple-system,'Segoe UI',Roboto,Arial,sans-serif}" +
      ".cfm-ant-foto{position:relative;min-height:" + ALTO_IVOOX + "px;background:#123d27 url(" + BASE + "foto.jpg) 18% top/cover no-repeat}" +
      ".cfm-ant-foto::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(14,50,32,.97) 0,rgba(14,50,32,.75) 32%,rgba(14,50,32,0) 62%)}" +
      ".cfm-ant-txt{position:absolute;left:0;right:0;bottom:0;z-index:1;padding:22px 24px;color:#fff}" +
      ".cfm-ant-pill{display:inline-block;background:#e30000;color:#fff;font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;padding:4px 10px;border-radius:999px}" +
      ".cfm-ant h2{margin:10px 0 4px !important;padding:0 !important;color:#fff !important;font:900 34px/1.05 system-ui,-apple-system,'Segoe UI',Roboto,Arial,sans-serif !important;text-transform:uppercase;letter-spacing:.01em;text-shadow:0 2px 6px rgba(0,0,0,.35)}" +
      ".cfm-ant-emisora{display:flex;align-items:center;gap:10px;margin-top:10px;font-size:14px;color:rgba(255,255,255,.88)}" +
      ".cfm-ant-emisora img{height:40px;width:auto;display:block}" +
      ".cfm-ant-ivoox{background:#fff;min-width:0}" +
      ".cfm-ant-ivoox iframe{display:block;width:100%;height:" + ALTO_IVOOX + "px;border:0}" +
      "@container (max-width:640px){" +
        ".cfm-ant{grid-template-columns:1fr}" +
        ".cfm-ant-foto{min-height:330px;background-position:20% 0}" +
        ".cfm-ant-foto::after{background:linear-gradient(to top,rgba(14,50,32,.97) 0,rgba(14,50,32,.7) 26%,rgba(14,50,32,0) 48%)}" +
        ".cfm-ant h2{font-size:26px !important;margin:8px 0 2px !important}" +
        ".cfm-ant-txt{padding:14px 16px}" +
        ".cfm-ant-emisora{margin-top:6px}.cfm-ant-emisora img{height:32px}" +
      "}";
    document.head.appendChild(css);

    sitio.innerHTML =
      '<section class="cfm-ant" aria-label="Directo Antolín, podcast de Cantabria FM">' +
        '<div class="cfm-ant-foto"><div class="cfm-ant-txt">' +
          '<span class="cfm-ant-pill">Podcast</span>' +
          '<h2>Directo Antolín</h2>' +
          '<div class="cfm-ant-emisora"><img src="' + BASE + 'logo.png" alt="Cantabria FM"><span>Escucha los programas</span></div>' +
        '</div></div>' +
        '<div class="cfm-ant-ivoox"></div>' +
      '</section>';

    // El reproductor de iVoox se carga cuando el banner está a punto de verse (la portada carga más rápido)
    var hueco = sitio.querySelector(".cfm-ant-ivoox");
    function cargarIvoox() {
      if (hueco.firstChild) return;
      var f = document.createElement("iframe");
      f.src = IVOOX;
      f.title = "Podcasts de Directo Antolín en iVoox";
      f.setAttribute("scrolling", "no");
      f.setAttribute("allow", "autoplay");
      hueco.appendChild(f);
    }
    if ("IntersectionObserver" in window) {
      var obs = new IntersectionObserver(function (e) {
        if (e[0].isIntersecting) { cargarIvoox(); obs.disconnect(); }
      }, { rootMargin: "400px" });
      obs.observe(sitio);
    } else cargarIvoox();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", montar);
  else montar();
})();
