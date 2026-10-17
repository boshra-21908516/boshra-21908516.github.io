"use strict";

// A. Declaração de variáveis
const nodeForm = document.querySelector("#colecao + section form");

const nodeInputNumero = document.querySelector(
  "#colecao + section input[type='number']",
);

const nodeUlColecao = document.querySelector("#colecao ul");
const nodeTotalCromos = document.querySelector("#colecao h3 span");

const nodeUlRepetidos = document.querySelector("#repetidos ul");
const nodeTotalRepetidos = document.querySelector("#repetidos h3 span");

const colecao = JSON.parse(localStorage.getItem("colecao")) || [];
const repetidos = JSON.parse(localStorage.getItem("repetidos")) || [];

// B. Funções

function guardaCarta() {
  const numero = Number(nodeInputNumero.value);

  if (!Number.isInteger(numero) || numero < 1) {
    return;
  }

  if (colecao.includes(numero)) {
    repetidos.push(numero);
    repetidos.sort((a, b) => a - b);
  } else {
    colecao.push(numero);
    colecao.sort((a, b) => a - b);
  }

  guardaDados();
  atualizaInterface();

  nodeInputNumero.value = "";
  nodeInputNumero.focus();
}

function atualizaLista(lista, nodeUl, permitirEliminacao = false) {
  nodeUl.textContent = "";

  lista.forEach((numero) => {
    const nodeLi = document.createElement("li");

    if (permitirEliminacao) {
      nodeLi.append(document.createTextNode(`${numero} `));

      const nodeBotao = document.createElement("button");
      nodeBotao.type = "button";
      nodeBotao.textContent = "Eliminar";
      nodeBotao.dataset.numero = numero;

      nodeLi.append(nodeBotao);
    } else {
      nodeLi.textContent = numero;
    }

    nodeUl.append(nodeLi);
  });
}

function guardaDados() {
  localStorage.setItem("colecao", JSON.stringify(colecao));
  localStorage.setItem("repetidos", JSON.stringify(repetidos));
}

function atualizaInterface() {
  atualizaLista(colecao, nodeUlColecao);
  atualizaLista(repetidos, nodeUlRepetidos, true);

  nodeTotalCromos.textContent = colecao.length;
  nodeTotalRepetidos.textContent = repetidos.length;
}

// C. Event listeners

nodeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  guardaCarta();
});

nodeUlRepetidos.addEventListener("click", (event) => {
  if (event.target.tagName !== "BUTTON") {
    return;
  }

  const numero = Number(event.target.dataset.numero);
  const indice = repetidos.indexOf(numero);

  if (indice === -1) {
    return;
  }

  repetidos.splice(indice, 1);

  guardaDados();
  atualizaInterface();
});

// D. Inicialização

atualizaInterface();
