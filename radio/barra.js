/* Cantabria FM: barra de radio fija arriba en toda la web.
   Se oculta al bajar y reaparece al subir.
   Uso: <script src="https://gestioncantabriapress-max.github.io/encuestas/radio/barra.js" defer></script> */
(function () {
  if (document.getElementById("cfm-radio")) return;
  var ALTO = 51;
  var URL = "https://gestioncantabriapress-max.github.io/encuestas/radio/?modo=cabecera";

  function montar() {
    var css = document.createElement("style");
    css.textContent =
      "#cfm-radio{position:fixed;top:0;left:0;right:0;z-index:99999;height:" + ALTO + "px;background:#2a8647;box-shadow:0 2px 6px rgba(0,0,0,.18);transition:transform .25s ease}" +
      "#cfm-radio.cfm-oculta{transform:translateY(-110%)}" +
      "#cfm-radio iframe{display:block;width:100%;height:" + ALTO + "px;border:0}" +
      "body{padding-top:" + ALTO + "px !important}" +
      "body.admin-bar #cfm-radio{top:32px}" +
      "@media (max-width:782px){body.admin-bar #cfm-radio{top:46px}}" +
      "@media (prefers-reduced-motion:reduce){#cfm-radio{transition:none}}";
    document.head.appendChild(css);

    var barra = document.createElement("div");
    barra.id = "cfm-radio";
    var f = document.createElement("iframe");
    f.src = URL;
    f.title = "Cantabria FM en directo";
    f.setAttribute("allow", "autoplay");
    barra.appendChild(f);
    document.body.insertBefore(barra, document.body.firstChild);

    var ultima = window.scrollY, pendiente = false;
    window.addEventListener("scroll", function () {
      if (pendiente) return; pendiente = true;
      requestAnimationFrame(function () {
        var y = window.scrollY, d = y - ultima;
        if (y < 60) barra.classList.remove("cfm-oculta");
        else if (d > 6) barra.classList.add("cfm-oculta");
        else if (d < -6) barra.classList.remove("cfm-oculta");
        ultima = y; pendiente = false;
      });
    }, { passive: true });
  }

  if (document.body) montar();
  else document.addEventListener("DOMContentLoaded", montar);
})();
