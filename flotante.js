/* Franja superior del test 29-N · CantabriaPress
   Se carga desde WordPress con una sola línea:
   <script src="https://gestioncantabriapress-max.github.io/encuestas/flotante.js" defer></script>
   - Sale arriba del todo, encima de la cabecera de la web.
   - Se puede cerrar con la × (no vuelve a salir en 24 h).
   - No sale en la página del test y desaparece sola el 29-N a las 20:00. */
(function(){
  if (document.getElementById("cp29-top")) return;
  if (location.pathname.indexOf("test-elecciones-29n") !== -1) return;
  if (new Date() > new Date("2026-11-29T20:00:00+01:00")) return;
  var KEY = "cp29TopClosed", DAY = 86400000;
  try { var t = +localStorage.getItem(KEY); if (t && Date.now() - t < DAY) return; } catch(e){}

  var css = ''
  + '#cp29-top{position:relative;z-index:99998;overflow:hidden;max-height:0;transition:max-height .5s ease;font-family:Roboto,Verdana,Geneva,sans-serif}'
  + '#cp29-top.on{max-height:90px}'
  + '#cp29-top *{box-sizing:border-box;margin:0;padding:0}'
  + '#cp29-top a.cp29t{display:block;position:relative;text-decoration:none!important;color:#fff!important;background:linear-gradient(90deg,#0c2e1d 0%,#195136 45%,#2a8647 100%)}'
  + '#cp29-top .bg{position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.08) 1.1px,transparent 1.2px);background-size:16px 16px}'
  + '#cp29-top .in{position:relative;max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:center;gap:16px;padding:9px 52px 9px 16px;min-height:52px}'
  + '#cp29-top svg{width:56px;height:auto;flex:none;display:block}'
  + '#cp29-top .k{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#bff3d2;white-space:nowrap}'
  + '#cp29-top .k i{width:7px;height:7px;border-radius:50%;background:#7CFFB0;animation:cp29tp 1.8s infinite}'
  + '@keyframes cp29tp{0%{box-shadow:0 0 0 0 rgba(124,255,176,.7)}70%{box-shadow:0 0 0 8px rgba(124,255,176,0)}100%{box-shadow:0 0 0 0 rgba(124,255,176,0)}}'
  + '#cp29-top .h{font-size:17px;font-weight:900;line-height:1.2}'
  + '#cp29-top .h span{color:#9BE8B8}'
  + '#cp29-top .s{font-size:13px;color:rgba(255,255,255,.8);white-space:nowrap}'
  + '#cp29-top .btn{display:inline-block;background:#fff;color:#0f3a25;font-weight:900;font-size:12.5px;text-transform:uppercase;letter-spacing:.03em;padding:8px 14px;border-radius:2px;white-space:nowrap;transition:transform .15s}'
  + '#cp29-top a.cp29t:hover .btn{transform:translateY(-1px)}'
  + '#cp29-top .x{position:absolute;top:50%;right:12px;transform:translateY(-50%);width:28px;height:28px;border-radius:50%;border:0;background:rgba(255,255,255,.18);color:#fff;font:700 17px/28px Arial,sans-serif;text-align:center;cursor:pointer;z-index:2}'
  + '#cp29-top .x:hover{background:rgba(255,255,255,.32)}'
  + '@media (max-width:900px){#cp29-top .s{display:none}}'
  + '@media (max-width:600px){#cp29-top svg,#cp29-top .k{display:none}#cp29-top .in{justify-content:space-between;gap:10px;padding:8px 46px 8px 12px;min-height:48px}#cp29-top .h{font-size:14.5px}#cp29-top .btn{font-size:11px;padding:7px 10px}#cp29-top .x{right:8px;width:26px;height:26px;line-height:26px}}';

  var st = document.createElement("style"); st.textContent = css;
  document.head.appendChild(st);

  var box = document.createElement("div");
  box.id = "cp29-top";
  box.innerHTML = ''
  + '<a class="cp29t" href="https://www.cantabriapress.com/test-elecciones-29n/">'
  +   '<span class="bg"></span>'
  +   '<span class="in">'
  +     '<svg class="cp29t-hemi" viewBox="0 0 120 66" aria-hidden="true"></svg>'
  +     '<span class="k"><i></i>Test 29-N</span>'
  +     '<span class="h">¿Con qué partido <span>coincides?</span></span>'
  +     '<span class="s">13 preguntas · 3 minutos</span>'
  +     '<span class="btn">Haz el test →</span>'
  +   '</span>'
  + '</a>'
  + '<button class="x" type="button" aria-label="Cerrar">×</button>';

  function go(){
    document.body.insertBefore(box, document.body.firstChild);

    /* mini hemiciclo decorativo: colores al azar, todos los partidos por igual */
    var svg = box.querySelector(".cp29t-hemi"), NS = "http://www.w3.org/2000/svg", dots = [], rows = 4, R0 = 30, R1 = 56, cx = 60, cy = 62, i, j, radii = [], sum = 0;
    for (i = 0; i < rows; i++){ radii.push(R0 + (R1 - R0) * i / (rows - 1)); sum += radii[i]; }
    radii.forEach(function(r){ var n = Math.round(64 * r / sum); for (j = 0; j < n; j++){ var a = Math.PI - Math.PI * (j / (n - 1)); var c = document.createElementNS(NS, "circle"); c.setAttribute("cx", (cx + r * Math.cos(a)).toFixed(1)); c.setAttribute("cy", (cy - r * Math.sin(a)).toFixed(1)); c.setAttribute("r", "3.1"); c.setAttribute("fill", "rgba(255,255,255,.22)"); c.style.transition = "fill .6s"; svg.appendChild(c); dots.push(c); } });
    var C = ["#1d84ce","#e30613","#5ac035","#e4366e","#7b3aa0"];
    function tw(){ for (var s = 0; s < 5; s++){ var c = dots[Math.floor(Math.random() * dots.length)]; c.setAttribute("fill", Math.random() < .45 ? "rgba(255,255,255,.22)" : C[Math.floor(Math.random() * C.length)]); } }
    for (i = 0; i < 6; i++) tw();
    var timer = setInterval(tw, 300);

    /* entra deslizándose */
    setTimeout(function(){ box.classList.add("on"); }, 300);

    /* cerrar */
    box.querySelector(".x").addEventListener("click", function(e){
      e.preventDefault(); e.stopPropagation();
      box.classList.remove("on");
      try { localStorage.setItem(KEY, String(Date.now())); } catch(err){}
      setTimeout(function(){ clearInterval(timer); if (box.parentNode) box.parentNode.removeChild(box); }, 550);
    });
  }
  if (document.body) go(); else document.addEventListener("DOMContentLoaded", go);
})();
