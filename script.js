// ===== Configurações =====
const dataInicio = new Date("2022-07-30T00:00:00");
const musica = document.getElementById("musica");
const playBtn = document.getElementById("playBtn");

// player
let tocando = false;
if (playBtn) {
  playBtn.addEventListener("click", () => {
    if (!tocando) {
      musica.play().catch(()=>{});
      playBtn.textContent = "⏸";
      playBtn.classList.add("ativo");
      tocando = true;
    } else {
      musica.pause();
      playBtn.textContent = "▶";
      playBtn.classList.remove("ativo");
      tocando = false;
    }
  });
}

// ===== Tempo juntos (mantém) =====
function atualizarTempo() {
  const agora = new Date();
  let diff = agora - dataInicio;

  let segundos = Math.floor(diff / 1000);
  let minutos = Math.floor(segundos / 60);
  let horas = Math.floor(minutos / 60);
  let dias = Math.floor(horas / 24);
  let anos = Math.floor(dias / 365);
  let meses = Math.floor((dias % 365) / 30);
  let diasRest = dias % 30;

  document.getElementById("anos").textContent = anos;
  document.getElementById("meses").textContent = meses;
  document.getElementById("dias").textContent = diasRest;
  document.getElementById("horas").textContent = String(horas % 24).padStart(2, "0");
  document.getElementById("minutos").textContent = String(minutos % 60).padStart(2, "0");
  document.getElementById("segundos").textContent = String(segundos % 60).padStart(2, "0");
}
setInterval(atualizarTempo, 1000);
atualizarTempo();

// frases alternando (mantém estilo simples)
const frases = [
  () => [Math.floor((new Date() - dataInicio) / (1000 * 60 * 60 * 24 * 29.53)), "Luas cheias desde o começo"],
  () => [Math.floor((new Date() - dataInicio) / (1000 * 60 * 60 * 24 * 7)), "Finais de semana (sáb/dom)"],
  () => [new Date().getFullYear() - 2022, "Dias dos Namorados"],
  () => [Math.floor((new Date() - dataInicio) / 60000), "Minutos juntos"],
  () => [Math.floor((new Date() - dataInicio) / 3600000), "Horas juntos"]
];
let fraseIndex = 0;
function alternarFrases() {
  const numEl = document.getElementById("fraseNumero");
  const txtEl = document.getElementById("fraseTexto");
  const [val, txt] = frases[fraseIndex % frases.length]();
  numEl.textContent = val.toLocaleString('pt-BR');
  txtEl.textContent = txt;
  const bloco = document.getElementById("fraseAlternando");
  bloco.classList.remove('mostrar');
  setTimeout(()=> bloco.classList.add('mostrar'), 70);
  fraseIndex++;
}
setInterval(alternarFrases, 4200);
alternarFrases();

// ===== BODAS: gerar 100 bodas, cores e comportamento =====
const bodasCarousel = document.getElementById('bodasCarousel');

// lista de nomes: por padrão "Boda 1" ... "Boda 100" e texto exemplo.
// Se você me enviar a lista real eu substituo os nomes e os significados.
const bodas = Array.from({length:100}, (_,i) => {
  const n = i+1;
  return {
    number: n,
    name: `Boda ${n}`,
    meaning: `Significado da Boda ${n}: exemplo de texto. Substitua pelo conteúdo real se quiser.`
  };
});

// gera uma paleta variada (cores únicas) usando HSL
function colorForIndex(i){
  const hue = Math.round((i * 137.5) % 360); // distribuição
  const sat = 70;
  const light = 45;
  return `hsl(${hue} ${sat}% ${light}%)`;
}

// cria os cards
function buildBodas(){
  bodas.forEach((b, idx) => {
    const card = document.createElement('div');
    card.className = 'boda-card';
    card.dataset.index = idx;

    // circle color
    const circle = document.createElement('div');
    circle.className = 'boda-circle';
    const color = colorForIndex(idx);
    circle.style.background = color;
    circle.style.boxShadow = `0 8px 24px ${color}55, inset 0 -6px 10px rgba(0,0,0,0.18)`;
    circle.textContent = b.number;

    // number and name
    const nameEl = document.createElement('div');
    nameEl.className = 'boda-name';
    nameEl.textContent = b.name;

    // botão significado
    const btn = document.createElement('button');
    btn.className = 'btn-significado';
    btn.textContent = 'Significado';

    // significado
    const sign = document.createElement('div');
    sign.className = 'significado';
    sign.innerText = b.meaning;

    // ações
    btn.addEventListener('click', (e)=>{
      e.stopPropagation();
      sign.classList.toggle('open');
      // scroll para o card (pequeno ajuste)
      card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });

    // hover pulse on circle (mouse)
    card.addEventListener('mouseenter', ()=>{
      circle.classList.add('pulse');
    });
    card.addEventListener('mouseleave', ()=>{
      circle.classList.remove('pulse');
    });

    // montar
    card.appendChild(circle);
    card.appendChild(nameEl);
    card.appendChild(btn);
    card.appendChild(sign);
    bodasCarousel.appendChild(card);
  });
}
buildBodas();

// ===== arrastar manual (touch+mouse) =====
let isDown = false;
let startX, scrollLeft;
const slider = bodasCarousel;

slider.addEventListener('mousedown', (e)=>{
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  slider.style.cursor = 'grabbing';
});
slider.addEventListener('mouseleave', ()=>{ isDown=false; slider.classList.remove('active'); slider.style.cursor='grab'; });
slider.addEventListener('mouseup', ()=>{ isDown=false; slider.classList.remove('active'); slider.style.cursor='grab'; });
slider.addEventListener('mousemove', (e)=>{
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1.4;
  slider.scrollLeft = scrollLeft - walk;
});

// touch
slider.addEventListener('touchstart', (e)=>{
  startX = e.touches[0].pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('touchmove', (e)=>{
  const x = e.touches[0].pageX - slider.offsetLeft;
  const walk = (x - startX) * 1.4;
  slider.scrollLeft = scrollLeft - walk;
});

// setas de navegação
const navLeft = document.getElementById('navLeft');
const navRight = document.getElementById('navRight');
navLeft.addEventListener('click', ()=>{ slider.scrollBy({left:-360, behavior:'smooth'}); });
navRight.addEventListener('click', ()=>{ slider.scrollBy({left:360, behavior:'smooth'}); });

// teclado: setas para esquerda/direita quando foco no carousel
slider.addEventListener('keydown', (e)=>{
  if(e.key === 'ArrowRight') slider.scrollBy({left:360, behavior:'smooth'});
  if(e.key === 'ArrowLeft') slider.scrollBy({left:-360, behavior:'smooth'});
});

// evitar seleção de texto enquanto arrasta
document.addEventListener('dragstart', (e)=> e.preventDefault());