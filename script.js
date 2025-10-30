/* script.js final: substitua por completo
   - mantém audio, fotos, contador
   - cria seção Bodas (1..35) com emblemas parecidos, cor do círculo e significados
*/

/* --------- Player (musica) ---------- */
const musica = document.getElementById("musica");
const playBtn = document.getElementById("playBtn");
let tocando = false;
if (playBtn) {
  playBtn.addEventListener("click", () => {
    if (!tocando) {
      musica.play().catch(()=>{});
      playBtn.textContent = "⏸";
      tocando = true;
    } else {
      musica.pause();
      playBtn.textContent = "▶";
      tocando = false;
    }
  });
}

/* --------- Fotos superior: arrastar (touch) - restaurado ---------- */
(function initTopPhotos(){
  const fotosTrack = document.getElementById('fotosTrack');
  if(!fotosTrack) return;
  let isDown=false, startX=0, scrollLeft=0;
  fotosTrack.addEventListener('mousedown', (e)=>{ isDown=true; startX=e.pageX - fotosTrack.offsetLeft; scrollLeft=fotosTrack.scrollLeft; fotosTrack.style.cursor='grabbing'; });
  window.addEventListener('mouseup', ()=>{ isDown=false; fotosTrack.style.cursor='default'; });
  fotosTrack.addEventListener('mousemove', (e)=>{ if(!isDown) return; e.preventDefault(); const x = e.pageX - fotosTrack.offsetLeft; const walk = (x - startX) * 1.2; fotosTrack.scrollLeft = scrollLeft - walk; });
  fotosTrack.addEventListener('touchstart',(e)=>{ startX = e.touches[0].pageX - fotosTrack.offsetLeft; scrollLeft=fotosTrack.scrollLeft; });
  fotosTrack.addEventListener('touchmove',(e)=>{ const x=e.touches[0].pageX - fotosTrack.offsetLeft; const walk=(x-startX)*1.2; fotosTrack.scrollLeft = scrollLeft - walk; });
})();

/* --------- Tempo juntos (contagem em tempo real) ---------- */
(function tempoJuntos(){
  const dataInicio = new Date(2022,6,30,0,0,0); // 30 Jul 2022 (mês base 0)
  function atualizarTempo(){
    const agora = new Date();
    let diff = agora - dataInicio;
    let segundos = Math.floor(diff/1000);
    let minutos = Math.floor(segundos/60);
    let horas = Math.floor(minutos/60);
    let dias = Math.floor(horas/24);
    let anos = Math.floor(dias/365);
    let meses = Math.floor((dias % 365)/30);
    let diasRest = dias % 30;

    const elAnos = document.getElementById("anos");
    const elMeses = document.getElementById("meses");
    const elDias = document.getElementById("dias");
    const elHoras = document.getElementById("horas");
    const elMin = document.getElementById("minutos");
    const elSeg = document.getElementById("segundos");

    if(elAnos) elAnos.textContent = anos;
    if(elMeses) elMeses.textContent = meses;
    if(elDias) elDias.textContent = diasRest;
    if(elHoras) elHoras.textContent = String(horas%24).padStart(2,'0');
    if(elMin) elMin.textContent = String(minutos%60).padStart(2,'0');
    if(elSeg) elSeg.textContent = String(segundos%60).padStart(2,'0');
  }
  setInterval(atualizarTempo,1000);
  atualizarTempo();

  // frases alternando
  const frases = [
    ()=> [Math.floor((new Date() - dataInicio)/(1000*60*60*24*29.53)), "Luas cheias desde o começo"],
    ()=> [Math.floor((new Date() - dataInicio)/(1000*60*60*24*7)), "Finais de semana (sáb/dom)"],
    ()=> [Math.floor((new Date() - dataInicio)/(1000*60*60*24)), "Dias juntos"],
    ()=> [Math.floor((new Date() - dataInicio)/(1000*60)), "Minutos juntos"],
    ()=> [Math.floor((new Date() - dataInicio)/(1000*60*60)), "Horas juntos"]
  ];
  let fi = 0;
  function alternar(){
    const numEl = document.getElementById('fraseNumero');
    const txtEl = document.getElementById('fraseTexto');
    const [val, txt] = frases[fi % frases.length]();
    if(numEl) numEl.textContent = val.toLocaleString('pt-BR');
    if(txtEl) txtEl.textContent = txt;
    fi++;
  }
  setInterval(alternar,4200);
  alternar();
})();

/* --------- BODAS: carrossel com emblemas e significados (1..35) ---------- */
(function bodasModule(){
  const NAMORO = new Date(2022,6,30); // 30/07/2022
  const COUNT = 35;

  // ===== Emblemas (ícones parecidos com as imagens) =====
  // Usei pequenas SVGs / emojis para representar cada boda de forma parecida.
  // Se quiser trocar algum ícone, diga o número e eu atualizo.
  const emblems = {
    1: '📜',   // Papel
    2: '🧵',   // Algodão
    3: '🌾',   // Trigo
    4: '🌸',   // Flores
    5: '🌳',   // Madeira
    6: '🌺',   // Perfume (flor)
    7: '🧶',   // Lã
    8: '🏺',   // Barro
    9: '🧺',   // Vime (cesto)
    10: '🔩',  // Estanho (metal)
    11: '⚙️',  // Aço (engrenagem)
    12: '🖤',  // Ônix (preto)
    13: '🧵',  // Linho (fio)
    14: '🐚',  // Marfim (tom suave)
    15: '💎',  // Cristal
    16: '🔷',  // Safira (azul)
    17: '🌹',  // Rosas
    18: '🔹',  // Turquesa
    19: '🌊',  // Água Marinha
    20: '🏺',  // Porcelana (vasilha)
    21: '🥈',  // Prata
    22: '🦪',  // Pérola
    23: '🪸',  // Coral
    24: '💚',  // Esmeralda (verde)
    25: '🥇',  // Ouro
    26: '💜',  // Ametista
    27: '💠',  // Diamante (simbolizado)
    28: '⚪',  // Platina (claro)
    29: '🍷',  // Vinho
    30: '✨',  // Brilhante
    31: '🌲',  // Carvalho
    32: '🌻',  // Girassol
    33: '🌳',  // Álamo
    34: '🌿',  // Sândalo
    35: '🌴'   // Jequitibá (árvore)
  };

  // ===== Significados (já enviados por você) =====
  const bodasMeanings = {
1: "1 Ano – Papel\nSimbolizam o início do relacionamento, onde a delicadeza e a possibilidade de escrever uma nova história se encontram. É o começo de uma jornada cheia de sonhos.",
2: "2 Anos – Algodão\nRepresentam suavidade e aconchego. Dois anos juntos revelam um relacionamento que se adapta com leveza e conforto.",
3: "3 Anos – Trigo\nSimbolizam fertilidade, prosperidade e o amadurecimento da união. Três anos de relacionamento mostram os frutos de um amor que cresce.",
4: "4 Anos – Flores\nEvocam beleza e o florescer do amor. Quatro anos juntos revelam um relacionamento que se abre para novas cores e aromas.",
5: "5 Anos – Madeira\nSimbolizam solidez e crescimento. Cinco anos de união demonstram raízes firmes e um amor que se fortalece com o tempo.",
6: "6 Anos – Perfume\nTrazem à mente a fragrância do romance. Seis anos juntos marcam harmonia e elegância, perfumando a vida a dois com sensibilidade.",
7: "7 Anos – Lã\nSimbolizam aconchego, proteção e calor. Sete anos de relacionamento refletem um relacionamento acolhedor, que envolve cuidado e ternura.",
8: "8 Anos – Barro\nRepresentam a capacidade de moldar a vida a dois. Oito anos juntos evidenciam a resiliência e a habilidade de transformar desafios.",
9: "9 Anos – Vime\nSimbolizam flexibilidade e união. Nove anos de relacionamento demonstram um amor que se adapta, mantendo a firmeza mesmo diante das adversidades.",
10: "10 Anos – Estanho\nRepresentam durabilidade e maleabilidade. Uma década juntos reflete um relacionamento que se ajusta e brilha, como o metal que o simboliza.",
11: "11 Anos – Aço\nSimbolizam força e resiliência. Onze anos de união evidenciam um compromisso sólido, capaz de enfrentar desafios com determinação e robustez.",
12: "12 Anos – Ônix\nEvocam a beleza e a raridade de uma união consolidada. Doze anos juntos traduzem um amor forte, único e repleto de experiências valiosas.",
13: "13 Anos – Linho\nRepresentam naturalidade, resistência e elegância. Treze anos de convivência refletem um amor maduro, marcado por sua solidez e autenticidade.",
14: "14 Anos – Marfim\nSimbolizam beleza refinada e singularidade. Quatorze anos juntos demonstram um relacionamento delicado, com memórias valiosas e encanto atemporal.",
15: "15 Anos – Cristal\nEvocam clareza e fragilidade que se transformam em beleza. Quinze anos de união celebram um amor puro, transparente e repleto de sutileza.",
16: "16 Anos – Safira\nSimbolizam sabedoria, sinceridade e lealdade. Dezesseis anos juntos revelam um relacionamento profundo, brilhante e de valor inestimável.",
17: "17 Anos – Rosas\nRepresentam o romance e a paixão que florescem com o tempo. Dezessete anos de união demonstram um amor vibrante e eternamente perfumado.",
18: "18 Anos – Turquesa\nSimbolizam proteção, serenidade e renovação. Dezoito anos juntos refletem um relacionamento equilibrado, com toques místicos e harmoniosos.",
19: "19 Anos – Água Marinha\nEvocam pureza e profundidade. Dezenove anos de união traduzem um amor claro, sereno e refrescante, como as águas cristalinas.",
20: "20 Anos – Porcelana\nRepresentam delicadeza e resistência. Vinte anos juntos evidenciam um relacionamento refinado, onde a fragilidade se torna arte e durabilidade.",
21: "25 Anos – Prata\nSimbolizam elegância e conquista. Vinte e cinco anos de união celebram um amor que se torna mais valioso e brilhante com o passar do tempo.",
22: "30 Anos – Pérola\nEvocam raridade e sofisticação. Trinta anos juntos representam um relacionamento que, como uma pérola, revela beleza e singularidade sob pressão.",
23: "35 Anos – Coral\nSimbolizam vitalidade e harmonia. Trinta e cinco anos de união refletem um amor que se adapta às marés da vida com delicadeza e força natural.",
24: "40 Anos – Esmeralda\nRepresentam riqueza, equilíbrio e durabilidade. Quarenta anos juntos evidenciam uma união preciosa, marcada por estabilidade e renovação constante.",
25: "50 Anos – Ouro\nSimbolizam valor e conquista. Cinquenta anos juntos refletem uma união sólida, duradoura e repleta de experiências que enriquecem o relacionamento.",
26: "55 Anos – Ametista\nRepresentam espiritualidade e equilíbrio. Cinquenta e cinco anos de união sugerem um amor maduro, repleto de sabedoria e conexão profunda.",
27: "60 Anos – Diamante\nSimbolizam a união inquebrável e o brilho eterno. Sessenta anos juntos celebram um amor forte, puro e repleto de valor e resiliência.",
28: "65 Anos – Platina\nEvocam nobreza e raridade. Sessenta e cinco anos de união evidenciam um amor distinto, resistente e com um valor incomparável ao longo do tempo.",
29: "70 Anos – Vinho\nSimbolizam maturidade e requinte. Setenta anos de relacionamento refletem um amor que envelhece com graça, revelando sabores únicos e sofisticação a dois.",
30: "75 Anos – Brilhante\nRepresentam a luminosidade e o esplendor de uma união duradoura. Setenta e cinco anos juntos evidenciam um amor que continua a brilhar intensamente.",
31: "80 Anos – Carvalho\nEvocam força, solidez e longevidade. Oitenta anos de união refletem um relacionamento robusto, com raízes profundas e estabilidade admirável.",
32: "85 Anos – Girassol\nSimbolizam alegria e energia. Oitenta e cinco anos juntos revelam um amor vibrante, que irradia felicidade e calor, como o brilho do sol.",
33: "90 Anos – Álamo\nRepresentam resiliência e memória. Noventa anos de união evocam a força de um relacionamento que guarda histórias e raízes profundas ao longo do tempo.",
34: "95 Anos – Sândalo\nSimbolizam nobreza e persistência. Noventa e cinco anos juntos refletem um amor que exala sabedoria, estabilidade e uma fragrância marcante de história.",
35: "100 Anos – Jequitibá\nEvocam imponência e longevidade. Cem anos de relacionamento representam um amor sólido, profundo e que se fortaleceu ao longo de gerações."
  };

  // DOM refs
  const carousel = document.getElementById('bodasCarousel');
  const significadoBox = document.getElementById('significadoBox');
  const significadoText = document.getElementById('significadoText');

  if(!carousel) return;

  // create track
  const track = document.createElement('div');
  track.className = 'carousel-track';
  carousel.appendChild(track);

  // helper days difference
  function daysBetween(d1,d2){ return Math.floor((d2 - d1)/(1000*60*60*24)); }

  // build items 1..COUNT
  for(let i=1;i<=COUNT;i++){
    const item = document.createElement('div');
    item.className = 'boda-item';
    item.dataset.index = i-1;

    // choose color by index (palette)
    const palette = ['#ff8aa4','#ffd07a','#ffd4d4','#ffb3c6','#b3e6ff','#ffc1a8','#d7b0ff','#ffc9b0','#ffe7b5','#d1d1d1','#b8c0ff','#9fd9c5','#f8d9e6','#f0e6d6','#cfe8ff','#a5d1ff','#ffb3b3','#b9f0e6','#a6f0f0','#f7e3f3'];
    const color = palette[(i-1) % palette.length];
    item.dataset.color = color;

    // years label small above
    const yearsLabel = document.createElement('div');
    yearsLabel.className = 'boda-years';
    yearsLabel.textContent = `${i} Ano${i>1?'s':''}`;

    // card (circle) - contains emblem + name inside/below
    const card = document.createElement('div');
    card.className = 'boda-card';
    // set glow color using inline style on pseudo via data-attribute (we'll set style on card element)
    card.style.setProperty('--glow-color', color);

    const inner = document.createElement('div');
    inner.className = 'boda-inner';

    const emblem = document.createElement('div');
    emblem.className = 'boda-emblema';
    emblem.textContent = emblems[i] || '◉'; // emblem (emoji/SVG substitute)

    const name = document.createElement('div');
    name.className = 'boda-nome';
    // derive display name from the meaning first line (ex: "1 Ano – Papel" -> "Papel")
    const firstLine = (bodasMeanings[i] || '').split('\n')[0];
    const displayName = firstLine ? firstLine.replace(/^\d+\s*Ano[s]?\s*–\s*/,'') : `Boda ${i}`;
    name.textContent = displayName;

    inner.appendChild(emblem);
    inner.appendChild(name);
    card.appendChild(inner);

    // days info (same as before)
    const anniversary = new Date(NAMORO.getFullYear() + i, NAMORO.getMonth(), NAMORO.getDate());
    const remaining = daysBetween(new Date(), anniversary);
    const daysEl = document.createElement('div');
    daysEl.className = 'boda-days';
    if(remaining <= 0){
      daysEl.innerHTML = `<strong>Completo</strong> <small>há ${Math.abs(remaining)} dias</small>`;
    } else {
      daysEl.innerHTML = `<strong>${remaining} dias</strong> <small>para completar</small>`;
    }

    // significado button
    const btnSign = document.createElement('button');
    btnSign.className = 'significado-toggle';
    btnSign.textContent = 'Significado';
    btnSign.addEventListener('click', (e)=>{
      e.stopPropagation();
      const txt = bodasMeanings[i] ? bodasMeanings[i] : "O significado está na própria imagem desta boda.";
      significadoText.textContent = txt;
      significadoBox.classList.add('active');
      significadoBox.scrollIntoView({behavior:'smooth', block:'center'});
    });

    item.appendChild(yearsLabel);
    item.appendChild(card);
    item.appendChild(daysEl);
    item.appendChild(btnSign);

    // set glow color on card element (the ::before uses card.style)
    card.style.setProperty('box-shadow','0 12px 30px rgba(0,0,0,0.5)');

    // hover to subtly show glow (card::before appearance is controlled by .centered)
    item.addEventListener('mouseenter', ()=>{
      // temporarily mark as centered visual
      item.classList.add('centered');
    });
    item.addEventListener('mouseleave', ()=>{
      item.classList.remove('centered');
    });

    // click to center
    item.addEventListener('click', ()=>{
      centeredIndex = Number(item.dataset.index);
      refreshItems();
    });

    track.appendChild(item);
  }

  // centralization & navigation (drag only)
  let items = Array.from(track.children);
  let centeredIndex = 0;

  function refreshItems(){
    items = Array.from(track.children);
    items.forEach(it => it.classList.remove('centered'));
    const centered = items[centeredIndex];
    if(centered){
      centered.classList.add('centered');
      // set the glow color on centered card's ::before via inline style
      const card = centered.querySelector('.boda-card');
      if(card){
        const c = centered.dataset.color;
        card.style.setProperty('--glow-color', c);
        // set the ::before background using a small inline style trick: create an overlay div
        // we'll insert/update a glow-overlay element behind the card to control color & opacity
        let overlay = card.querySelector('.glow-overlay');
        if(!overlay){
          overlay = document.createElement('div');
          overlay.className = 'glow-overlay';
          overlay.style.position = 'absolute';
          overlay.style.inset = 'auto';
          overlay.style.width = '360px';
          overlay.style.height = '360px';
          overlay.style.left = '50%';
          overlay.style.top = '50%';
          overlay.style.transform = 'translate(-50%,-50%)';
          overlay.style.borderRadius = '50%';
          overlay.style.filter = 'blur(28px)';
          overlay.style.zIndex = '0';
          overlay.style.pointerEvents = 'none';
          card.appendChild(overlay);
        }
        overlay.style.background = centered.dataset.color || '#ff8aa4';
        overlay.style.opacity = '0.28';
      }
    }
    centerActiveItem();
    updateGlows();
  }

  function centerActiveItem(animate=true){
    const trackRect = track.getBoundingClientRect();
    const containerW = track.clientWidth;
    const centered = items[centeredIndex];
    if(!centered) return;
    const itemRect = centered.getBoundingClientRect();
    const offset = (itemRect.left + itemRect.width/2) - (trackRect.left + containerW/2);
    const currentTransform = getTranslateX(track) || 0;
    const newTransform = currentTransform - offset;
    track.style.transition = animate ? 'transform .45s cubic-bezier(.22,.9,.32,1)' : 'none';
    track.style.transform = `translateX(${newTransform}px)`;
  }

  function getTranslateX(el){
    const st = window.getComputedStyle(el);
    const tr = st.transform || st.webkitTransform || st.mozTransform;
    if(tr && tr !== 'none'){
      const match = tr.match(/matrix.*\((.+)\)/);
      if(match){
        const values = match[1].split(', ');
        return parseFloat(values[4]);
      }
    }
    return 0;
  }

  // pointer drag for track (manual only)
  let isDown=false, startX=0, prevTranslate=0;
  track.addEventListener('pointerdown', (e)=>{ isDown=true; startX = e.clientX; prevTranslate = getTranslateX(track) || 0; track.setPointerCapture(e.pointerId); track.style.cursor='grabbing'; });
  track.addEventListener('pointermove', (e)=>{ if(!isDown) return; const current = prevTranslate + (e.clientX - startX); track.style.transition='none'; track.style.transform = `translateX(${current}px)`; });
  track.addEventListener('pointerup', (e)=>{ isDown=false; track.style.cursor='default';
    // snap to nearest
    const trackRect = track.getBoundingClientRect();
    let closestIdx=0, closestDist=Infinity;
    items.forEach((it,i)=>{ const r=it.getBoundingClientRect(); const center = r.left + r.width/2; const dist = Math.abs((trackRect.left + trackRect.width/2) - center); if(dist < closestDist){ closestDist = dist; closestIdx = i; } });
    centeredIndex = closestIdx;
    refreshItems();
  });
  track.addEventListener('pointercancel', ()=>{ isDown=false; });

  // keyboard optional
  window.addEventListener('keydown', (e)=>{ if(e.key==='ArrowRight') { centeredIndex = Math.min(items.length-1, centeredIndex+1); refreshItems(); } if(e.key==='ArrowLeft'){ centeredIndex = Math.max(0, centeredIndex-1); refreshItems(); } });

  // update glows (ensure centered item glow is visible)
  function updateGlows(){
    items.forEach((it, idx)=>{
      const card = it.querySelector('.boda-card');
      const overlay = card ? card.querySelector('.glow-overlay') : null;
      if(!card) return;
      if(idx === centeredIndex){
        if(overlay) overlay.style.opacity = '0.28';
        card.style.zIndex = 5;
      } else {
        if(overlay) overlay.style.opacity = '0';
        card.style.zIndex = 1;
      }
    });
  }

  // init
  setTimeout(()=>{ items = Array.from(track.children); centeredIndex = 0; refreshItems(); }, 80);

})();