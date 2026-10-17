"use strict";

// A. declaração de variáveis
const nodeForm = document.querySelector("#colecao + section form");
const nodeInputNumero = document.querySelector(
  "#colecao + section input[type='number']",
);
const nodeInputSubmit = document.querySelector(
  "#colecao + section input[type='submit']",
);
const nodeUlColecao = document.querySelector("#colecao ul");
const nodeTotalCromos = document.querySelector("#colecao h3 span");
const nodeUlRepetidos = document.querySelector("#repetidos ul");
const nodeTotalRepetidos = document.querySelector("#repetidos h3 span");
const colecao = JSON.parse(localStorage.getItem("colecao")) || [];
const repetidos = JSON.parse(localStorage.getItem("repetidos")) || [];
let contadorRepetidos = repetidos.length;

// B. event handlers
function guardaCarta() {
  const numero = Number(nodeInputNumero.value);

  if (colecao.includes(numero)) {
    repetidos.push(numero);
    repetidos.sort((a, b) => a - b);
    contadorRepetidos += 1;
    guardaDados();
    atualizaLista(repetidos, nodeUlRepetidos);
    nodeTotalRepetidos.textContent = contadorRepetidos;
    associaEventosEliminacao();
  } else {
    colecao.push(numero);
    colecao.sort((a, b) => a - b);
    guardaDados();
    atualizaLista(colecao, nodeUlColecao);
    nodeTotalCromos.textContent = colecao.length;
  }

  nodeInputNumero.value = "";
  nodeInputNumero.focus();
}

function atualizaLista(lista, nodeUlColecao) {
  nodeUlColecao.textContent = "";

  lista.forEach((numero) => {
    const nodeLi = document.createElement("li");

    if (lista === repetidos) {
      nodeLi.innerHTML = `${numero} <button type="button" data-numero="${numero}">Eliminar</button>`;
    } else {
      nodeLi.textContent = numero;
    }

    nodeUlColecao.append(nodeLi);
  });
}

function guardaDados() {
  localStorage.setItem("colecao", JSON.stringify(colecao));
  localStorage.setItem("repetidos", JSON.stringify(repetidos));
}

// C. event listeners
function associaEventosEliminacao() {
  const nodeBotoesEliminar = document.querySelectorAll("#repetidos button");

  nodeBotoesEliminar.forEach((botao) => {
    botao.addEventListener("click", () => {
      const numero = Number(botao.dataset.numero);
      const indice = repetidos.indexOf(numero);

      repetidos.splice(indice, 1);
      contadorRepetidos -= 1;
      guardaDados();
      atualizaLista(repetidos, nodeUlRepetidos);
      nodeTotalRepetidos.textContent = contadorRepetidos;
      associaEventosEliminacao();
    });
  });
}

nodeForm.onsubmit = (event) => {
  event.preventDefault();
  guardaCarta();
};

atualizaLista(colecao, nodeUlColecao);
nodeTotalCromos.textContent = colecao.length;
atualizaLista(repetidos, nodeUlRepetidos);
nodeTotalRepetidos.textContent = contadorRepetidos;
associaEventosEliminacao();
