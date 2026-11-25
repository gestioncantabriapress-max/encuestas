/* Cantabria FM: barra de radio para toda la web.
   - PC: fija arriba, se oculta al bajar y reaparece al subir.
   - Móvil: fija abajo, siempre visible.
   - Escucha continua: si la radio está sonando y el lector pulsa un enlace del
     periódico, la nueva página se abre debajo de la barra sin recargarla, así
     la radio no se corta. La dirección y el título del navegador se actualizan.
   Uso: <script src="https://gestioncantabriapress-max.github.io/encuestas/radio/barra.js" defer></script> */
(function () {
  var ALTO = 51;
  var MOVIL = 782;   // por debajo de este ancho (px) la barra va abajo
  var ORIGEN = "https://gestioncantabriapress-max.github.io";
  var URL = ORIGEN + "/encuestas/radio/?modo=cabecera";

  /* ---------- Dentro del marco de escucha continua ---------- */
  if (window.top !== window) {
    var padre = null;
    try { if (window.top.__cfmContinuo) padre = window.top; } catch (e) {}
    if (!padre) return;                       // la web está en otro iframe ajeno: no hacer nada
    function sincronizar() {
      try {
        padre.document.title = document.title;
        padre.history.replaceState(null, "", location.href);
      } catch (e) {}
    }
    sincronizar();
    window.addEventListener("pageshow", sincronizar);
    window.addEventListener("hashchange", sincronizar);
    // Enlaces a otras webs: en pestaña nueva (muchas no se dejan abrir dentro de un marco)
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("a[href]");
      if (!a || a.target) return;
      if (a.protocol.indexOf("http") === 0 && a.host !== location.host) a.target = "_blank";
    }, true);
    return;
  }

  if (document.getElementById("cfm-radio")) return;

  function montar() {
    var css = document.createElement("style");
    css.textContent =
      "#cfm-radio{position:fixed;top:0;left:0;right:0;z-index:99999;height:" + ALTO + "px;background:#2a8647;box-shadow:0 2px 6px rgba(0,0,0,.18);transition:transform .25s ease}" +
      "#cfm-radio.cfm-oculta{transform:translateY(-110%)}" +
      "#cfm-radio iframe{display:block;width:100%;height:" + ALTO + "px;border:0}" +
      "body{padding-top:" + ALTO + "px !important}" +
      "body.admin-bar #cfm-radio{top:32px}" +
      "@media (max-width:782px){body.admin-bar #cfm-radio{top:46px}}" +
      "@media (prefers-reduced-motion:reduce){#cfm-radio{transition:none}}" +
      /* Modo escucha continua: barra + la web en un marco que ocupa el resto */
      "html.cfm-continuo,html.cfm-continuo body{height:100%;overflow:hidden;margin:0 !important;padding:0 !important}" +
      "html.cfm-continuo #cfm-radio{top:0 !important;transform:none !important}" +
      "#cfm-web{position:fixed;left:0;right:0;top:" + ALTO + "px;bottom:0;width:100%;height:calc(100% - " + ALTO + "px);border:0;background:#fff}" +
      /* Móvil: barra fija abajo, siempre visible, para no chocar con el menú del tema */
      "@media (max-width:" + MOVIL + "px){" +
        "#cfm-radio,body.admin-bar #cfm-radio,html.cfm-continuo #cfm-radio{top:auto !important;bottom:0;box-shadow:0 -2px 6px rgba(0,0,0,.18);padding-bottom:env(safe-area-inset-bottom);height:auto}" +
        "#cfm-radio.cfm-oculta{transform:none}" +
        "body{padding-top:0 !important;padding-bottom:" + ALTO + "px !important}" +
        "#cfm-web{top:0;bottom:auto;height:calc(100% - " + ALTO + "px - env(safe-area-inset-bottom))}" +
      "}";
    document.head.appendChild(css);

    var barra = document.createElement("div");
    barra.id = "cfm-radio";
    var f = document.createElement("iframe");
    f.src = URL;
    f.title = "Cantabria FM en directo";
    f.setAttribute("allow", "autoplay");
    barra.appendChild(f);
    document.body.insertBefore(barra, document.body.firstChild);

    /* Ocultar al bajar / mostrar al subir (solo en modo normal) */
    var ultima = window.scrollY, pendiente = false;
    window.addEventListener("scroll", function () {
      if (pendiente || window.__cfmContinuo) return; pendiente = true;
      requestAnimationFrame(function () {
        var y = window.scrollY, d = y - ultima;
        if (y < 60) barra.classList.remove("cfm-oculta");
        else if (d > 6) barra.classList.add("cfm-oculta");
        else if (d < -6) barra.classList.remove("cfm-oculta");
        ultima = y; pendiente = false;
      });
    }, { passive: true });

    /* ¿Está sonando? Lo avisa el reproductor */
    var sonando = false;
    window.addEventListener("message", function (e) {
      if (e.origin !== ORIGEN || !e.data || !e.data.cfm) return;
      sonando = e.data.cfm === "sonando";
    });

    function modoContinuo(destino) {
      window.__cfmContinuo = true;
      // Quita el contenido de la página actual, dejando la barra (que sigue sonando)
      Array.prototype.slice.call(document.body.childNodes).forEach(function (n) {
        if (n !== barra) document.body.removeChild(n);
      });
      document.documentElement.classList.add("cfm-continuo");
      var web = document.createElement("iframe");
      web.id = "cfm-web";
      web.title = document.title;
      web.src = destino;
      document.body.appendChild(web);
      history.pushState(null, "", destino);
      // "Atrás" hasta la página donde se empezó a escuchar: mostrarla en el marco
      window.addEventListener("popstate", function () {
        try {
          if (web.contentWindow.location.href !== location.href) web.contentWindow.location.replace(location.href);
        } catch (e) {}
      });
    }

    function interno(u) {
      return u.host === location.host && u.protocol === location.protocol &&
        !/\/wp-(admin|login)/.test(u.pathname) &&
        !/\.(pdf|jpe?g|png|gif|webp|zip|mp3|mp4|docx?|xlsx?)$/i.test(u.pathname);
    }

    /* Clic en un enlace del periódico mientras suena -> escucha continua */
    document.addEventListener("click", function (e) {
      if (!sonando || window.__cfmContinuo || e.defaultPrevented) return;
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest && e.target.closest("a[href]");
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      if (!interno(a)) return;
      if (a.pathname === location.pathname && a.search === location.search && a.hash) return; // ancla en la misma página
      e.preventDefault();
      modoContinuo(a.href);
    });

    /* Buscador del periódico mientras suena -> escucha continua */
    document.addEventListener("submit", function (e) {
      if (!sonando || window.__cfmContinuo || e.defaultPrevented) return;
      var form = e.target;
      if ((form.method || "get").toLowerCase() !== "get" || (form.target && form.target !== "_self")) return;
      var u = document.createElement("a"); u.href = form.action || location.href;
      if (!interno(u)) return;
      e.preventDefault();
      var q = new URLSearchParams(new FormData(form)).toString();
      modoContinuo(u.href.split("?")[0] + (q ? "?" + q : ""));
    });
  }

  if (document.body) montar();
  else document.addEventListener("DOMContentLoaded", montar);
})();
