const dataInicio = new Date("2022-07-30T00:00:00");
const musica = document.getElementById("musica");
const playBtn = document.getElementById("playBtn");

let tocando = false;
playBtn.addEventListener("click", () => {
  if (!tocando) {
    musica.play();
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

// Atualiza o contador
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

// Frases alternadas (número + texto)
const frases = [
  () => [Math.floor((new Date() - dataInicio) / (1000 * 60 * 60 * 24 * 29.53)), "Luas cheias desde o começo"],
  () => [Math.floor((new Date().getFullYear() - 2022)), "Natais juntos"],
  () => [Math.floor((new Date() - dataInicio) / (1000 * 60 * 60 * 24 * 7)), "Finais de semana (Sábado/Domingo)"],
  () => [new Date().getFullYear() - 2022, "Dias dos Namorados"],
  () => [new Date().getFullYear() - 2022, "Aniversários de namoro"],
  () => [Math.floor((new Date() - dataInicio) / 60000), "Minutos juntos"],
  () => [Math.floor((new Date() - dataInicio) / 3600000), "Horas juntos"]
];

let indice = 0;
function alternarFrases() {
  const bloco = document.getElementById("fraseAlternando");
  const num = document.getElementById("fraseNumero");
  const texto = document.getElementById("fraseTexto");

  const [valor, descricao] = frases[indice % frases.length]();

  bloco.classList.remove("mostrar");
  setTimeout(() => {
    num.textContent = valor.toLocaleString("pt-BR");
    texto.textContent = descricao;
    bloco.classList.add("mostrar");
  }, 1000);

  indice++;
}
setInterval(alternarFrases, 4000);
alternarFrases();

// Carrossel infinito ida e volta
const fotos = document.getElementById("fotos");
fotos.innerHTML += fotos.innerHTML;
let pos = 0, dir = -1;
function animar() {
  pos += dir * 0.3;
  if (pos <= -fotos.scrollWidth / 2) dir = 1;
  if (pos >= 0) dir = -1;
  fotos.style.transform = `translateX(${pos}px)`;
  requestAnimationFrame(animar);
}
animar();