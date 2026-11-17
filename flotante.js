/* Banner flotante del test 29-N · CantabriaPress
   Se carga desde WordPress con una sola línea:
   <script src="https://gestioncantabriapress-max.github.io/encuestas/flotante.js" defer></script> */
(function(){
  if (document.getElementById("cp29-float")) return;
  var st=document.createElement("style"); st.textContent="\n#cp29-float{position:fixed;right:20px;bottom:20px;z-index:99999;width:320px;font-family:Roboto,Verdana,Geneva,sans-serif;transform:translateY(140%);transition:transform .5s cubic-bezier(.2,.8,.2,1)}\n#cp29-float.on{transform:none}\n#cp29-float *{box-sizing:border-box;margin:0;padding:0}\n#cp29-float a.cp29f{display:block;position:relative;overflow:hidden;text-decoration:none!important;color:#fff!important;background:radial-gradient(120% 160% at 90% 20%,#2a8647 0%,#195136 55%,#0c2e1d 100%);border-radius:6px;box-shadow:0 12px 34px rgba(0,0,0,.35);padding:18px 18px 16px}\n#cp29-float .bg{position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.07) 1.1px,transparent 1.2px);background-size:16px 16px}\n#cp29-float .in{position:relative;display:grid;grid-template-columns:1fr 92px;gap:8px;align-items:center}\n#cp29-float .k{display:inline-flex;align-items:center;gap:6px;font-size:10.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#bff3d2;margin-bottom:6px}\n#cp29-float .k i{width:7px;height:7px;border-radius:50%;background:#7CFFB0;animation:cp29fp 1.8s infinite}\n@keyframes cp29fp{0%{box-shadow:0 0 0 0 rgba(124,255,176,.7)}70%{box-shadow:0 0 0 8px rgba(124,255,176,0)}100%{box-shadow:0 0 0 0 rgba(124,255,176,0)}}\n#cp29-float .h{display:block;font-size:21px;line-height:1.1;font-weight:900;margin-bottom:12px}\n#cp29-float .h span{color:#9BE8B8}\n#cp29-float .btn{display:inline-block;background:#fff;color:#0f3a25;font-weight:900;font-size:12.5px;text-transform:uppercase;letter-spacing:.03em;padding:9px 14px;border-radius:2px}\n#cp29-float svg{width:92px;height:auto;display:block}\n#cp29-float .x{position:absolute;top:-10px;right:-10px;width:28px;height:28px;border-radius:50%;border:0;background:#fff;color:#111;font:700 16px/28px Arial,sans-serif;text-align:center;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.3);z-index:2}\n/* M\u00f3vil: barra abajo a lo ancho */\n@media (max-width:767px){\n  #cp29-float{left:0;right:0;bottom:0;width:auto}\n  #cp29-float a.cp29f{border-radius:0;padding:10px 46px 10px 14px;box-shadow:0 -4px 18px rgba(0,0,0,.25)}\n  #cp29-float .in{grid-template-columns:52px 1fr auto;gap:10px}\n  #cp29-float svg{width:52px;order:-1}\n  #cp29-float .k{margin-bottom:2px;font-size:9.5px}\n  #cp29-float .h{font-size:15px;margin:0}\n  #cp29-float .btn{font-size:11px;padding:8px 10px}\n  #cp29-float .x{top:50%;right:8px;transform:translateY(-50%);width:26px;height:26px;line-height:26px;background:rgba(255,255,255,.2);color:#fff;box-shadow:none}\n}\n";
  document.head.appendChild(st);
  var box=document.createElement("div"); box.id="cp29-float"; box.hidden=true;
  box.innerHTML="<button class=\"x\" type=\"button\" aria-label=\"Cerrar\">\u00d7</button>\n<a class=\"cp29f\" href=\"https://www.cantabriapress.com/test-elecciones-29n/\">\n  <span class=\"bg\"></span>\n  <span class=\"in\">\n    <span>\n      <span class=\"k\"><i></i>Test electoral \u00b7 29-N</span>\n      <span class=\"h\">\u00bfCon qu\u00e9 partido <span>coincides?</span></span>\n      <span class=\"btn\">Haz el test \u2192</span>\n    </span>\n    <svg class=\"cp29f-hemi\" viewBox=\"0 0 120 66\" aria-hidden=\"true\"></svg>\n  </span>\n</a>";
  function go(){
    document.body.appendChild(box);
    (function(){
  var box=document.getElementById("cp29-float");
  var KEY="cp29FloatClosed", DAY=86400000;
  /* No mostrar: en la página del test, después del 29-N, o si se cerró hace menos de 24 h */
  if (location.pathname.indexOf("test-elecciones-29n")!==-1) return;
  if (new Date() > new Date("2026-11-29T20:00:00+01:00")) return;
  try { var t=+localStorage.getItem(KEY); if (t && Date.now()-t < DAY) return; } catch(e){}
  /* Hemiciclo pequeño decorativo (colores al azar, todos los partidos por igual) */
  var svg=box.querySelector(".cp29f-hemi"),NS="http://www.w3.org/2000/svg",dots=[],rows=4,R0=30,R1=56,cx=60,cy=62,i,j;
  var radii=[],sum=0;for(i=0;i<rows;i++){radii.push(R0+(R1-R0)*i/(rows-1));sum+=radii[i];}
  radii.forEach(function(r){var n=Math.round(64*r/sum);for(j=0;j<n;j++){var a=Math.PI-Math.PI*(j/(n-1));var c=document.createElementNS(NS,"circle");c.setAttribute("cx",(cx+r*Math.cos(a)).toFixed(1));c.setAttribute("cy",(cy-r*Math.sin(a)).toFixed(1));c.setAttribute("r","3.1");c.setAttribute("fill","rgba(255,255,255,.2)");c.style.transition="fill .6s";svg.appendChild(c);dots.push(c);}});
  var C=["#1d84ce","#e30613","#5ac035","#e4366e","#7b3aa0"];
  function tw(){for(var s=0;s<5;s++){var c=dots[Math.floor(Math.random()*dots.length)];c.setAttribute("fill",Math.random()<.45?"rgba(255,255,255,.2)":C[Math.floor(Math.random()*C.length)]);}}
  for(i=0;i<6;i++)tw(); var timer=setInterval(tw,300);
  /* Aparece a los 4 segundos */
  box.hidden=false;
  setTimeout(function(){box.classList.add("on");},4000);
  /* Cerrar */
  box.querySelector(".x").addEventListener("click",function(e){
    e.preventDefault(); box.classList.remove("on");
    try{localStorage.setItem(KEY,String(Date.now()));}catch(err){}
    setTimeout(function(){box.hidden=true;clearInterval(timer);},500);
  });
})();
  }
  if (document.body) go(); else document.addEventListener("DOMContentLoaded", go);
})();
