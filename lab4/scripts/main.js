/* eslint-disable no-unused-vars -- as funções são chamadas pelos atributos de evento do index.html */

// 1. mouseover / mouseout
function passou() {
  document.getElementById("passa").textContent = "Passa por aqui!";
}

function saiu() {
  document.getElementById("passa").textContent = "Obrigado por passares!";
}

// 2. click nos botões: pinta o texto da linha 2
function pintar(cor) {
  document.getElementById("linha2").style.color = cor;
}

// 3. keydown: a cor de fundo da caixa muda a cada tecla (4 cores em ciclo)
let corAtual = 0;

function mudarCor() {
  const caixa = document.getElementById("texto");

  corAtual = corAtual + 1;
  if (corAtual === 5) {
    corAtual = 1;
  }

  if (corAtual === 1) {
    caixa.style.backgroundColor = "lightblue";
  } else if (corAtual === 2) {
    caixa.style.backgroundColor = "lightgreen";
  } else if (corAtual === 3) {
    caixa.style.backgroundColor = "lightyellow";
  } else {
    caixa.style.backgroundColor = "lightpink";
  }
}

// 4. click em "submeter": o fundo da página fica com a cor escrita
function mudarFundo() {
  const caixa = document.getElementById("cor");

  document.body.style.backgroundColor = caixa.value;
  caixa.select();
}

// 5. click em "Conta!": incrementa o contador
let contador = 0;

function contar() {
  contador++;
  document.getElementById("contador").textContent = contador;
}
