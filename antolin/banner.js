/* Banner "Directo Antolín" (Cantabria FM) con los podcasts de iVoox.
   Uso en la web: poner <div id="cfm-antolin"></div> donde debe salir el banner
   y cargar este archivo una vez (por ejemplo, en la misma etiqueta de Google Tag Manager que la barra):
   <script src="https://gestioncantabriapress-max.github.io/encuestas/antolin/banner.js" defer></script> */
(function () {
  var BASE = "https://gestioncantabriapress-max.github.io/encuestas/antolin/";
  var IVOOX = "https://www.ivoox.com/player_es_podcast_156983_1.html";
  var ALTO_IVOOX = 300;   // alto del reproductor de iVoox (px)

  function montar() {
    var sitio = document.getElementById("cfm-antolin");
    if (!sitio || sitio.getAttribute("data-montado")) return;
    sitio.setAttribute("data-montado", "1");

    /* Mismo estilo que los bloques del tema Newspaper de CantabriaPress:
       Roboto, borde gris fino, etiqueta verde y línea verde bajo el título */
    var F = "Roboto,Verdana,Geneva,sans-serif";
    var css = document.createElement("style");
    css.textContent =
      "#cfm-antolin{container-type:inline-size;margin:0 0 26px}" +
      ".cfm-ant{background:#fff;border:1px solid #ededed;font-family:" + F + ";color:#111}" +
      ".cfm-ant-head{display:flex;align-items:flex-end;gap:12px;border-bottom:2px solid #2a8647}" +
      ".cfm-ant-tag{background:#2a8647;color:#fff;font:500 14px/1 " + F + ";text-transform:uppercase;padding:9px 14px 8px;white-space:nowrap}" +
      ".cfm-ant-tit{font:700 18px/1.2 " + F + ";padding:6px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}" +
      ".cfm-ant-sub{margin-left:auto;padding:7px 12px;font:400 12px/1.2 " + F + ";color:#767676;display:flex;align-items:center;gap:6px;white-space:nowrap}" +
      ".cfm-ant-sub i{width:7px;height:7px;border-radius:50%;background:#e30000;display:block}" +
      ".cfm-ant-body{display:grid;grid-template-columns:170px 1fr}" +
      ".cfm-ant-foto{background:#123d27 url(" + BASE + "foto.jpg) 18% top/cover no-repeat;min-height:" + ALTO_IVOOX + "px}" +
      ".cfm-ant-ivoox{min-width:0;background:#fff}" +
      ".cfm-ant-ivoox iframe{display:block;width:100%;height:" + ALTO_IVOOX + "px;border:0}" +
      "@container (max-width:560px){" +
        ".cfm-ant-body{grid-template-columns:1fr}" +
        ".cfm-ant-foto{display:none}" +
        ".cfm-ant-tag{font-size:13px;padding:9px 12px 8px}" +
        ".cfm-ant-tit{font-size:16px}" +
        ".cfm-ant-sub{display:none}" +
      "}";
    document.head.appendChild(css);

    sitio.innerHTML =
      '<section class="cfm-ant" aria-label="Directo Antolín, podcast de Cantabria FM">' +
        '<div class="cfm-ant-head">' +
          '<span class="cfm-ant-tag">Cantabria FM</span>' +
          '<span class="cfm-ant-tit">Directo Antolín</span>' +
          '<span class="cfm-ant-sub"><i></i>Podcast</span>' +
        '</div>' +
        '<div class="cfm-ant-body">' +
          '<div class="cfm-ant-foto" role="img" aria-label="Antolín en el estudio de Cantabria FM"></div>' +
          '<div class="cfm-ant-ivoox"></div>' +
        '</div>' +
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
