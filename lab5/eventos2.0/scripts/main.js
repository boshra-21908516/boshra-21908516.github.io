document.addEventListener("DOMContentLoaded", () => {
  // ---------- variáveis ----------
  const passa = document.querySelector("#passa");
  const linhaCor = document.querySelector("#linha-cor");
  const texto = document.querySelector("#texto");
  const contador = document.querySelector("#contador");
  const ola = document.querySelector("#ola");
  const automatico = document.querySelector("#automatico");
  const guardado = document.querySelector("#guardado");
  const caixaFlex = document.querySelector("#caixa-flex");

  let corAtual = 0;
  let total = 0;
  let segundos = 0;

  // Se não existe a chave counter em localStorage, inicializamos.
  if (!localStorage.getItem("counter")) {
    localStorage.setItem("counter", 0);
  }

  // ---------- event handlers ----------
  const passou = () => {
    passa.textContent = "Passa por aqui!";
  };

  const saiu = () => {
    passa.textContent = "Obrigado por passares!";
  };

  const mudarCor = () => {
    corAtual++;
    if (corAtual === 5) {
      corAtual = 1;
    }

    if (corAtual === 1) {
      texto.style.backgroundColor = "lightblue";
    } else if (corAtual === 2) {
      texto.style.backgroundColor = "lightgreen";
    } else if (corAtual === 3) {
      texto.style.backgroundColor = "lightyellow";
    } else {
      texto.style.backgroundColor = "lightpink";
    }
  };

  const contar = () => {
    total++;
    contador.textContent = total;
  };

  const cumprimentar = (e) => {
    e.preventDefault(); // para não recarregar a página
    const nome = document.querySelector("#nome").value;
    const idade = document.querySelector("#idade").value;
    ola.textContent = `Olá, o ${nome} tem ${idade}!`;
  };

  const contarAutomatico = () => {
    segundos++;
    automatico.textContent = segundos;
  };

  const incrementar = () => {
    let counter = localStorage.getItem("counter");
    counter++;
    guardado.textContent = counter;
    localStorage.setItem("counter", counter);
  };

  const decrementar = () => {
    let counter = localStorage.getItem("counter");
    counter--;
    guardado.textContent = counter;
    localStorage.setItem("counter", counter);
  };

  const reiniciar = () => {
    guardado.textContent = 0;
    localStorage.setItem("counter", 0);
  };

  // ---------- event listeners ----------
  passa.addEventListener("mouseover", passou);
  passa.addEventListener("mouseout", saiu);

  // um só código para todos os botões; a cor vem do atributo data-color
  document.querySelectorAll("button.color").forEach((button) => {
    button.addEventListener("click", () => {
      linhaCor.style.color = button.dataset.color;
    });
  });

  texto.addEventListener("keydown", mudarCor);

  // function normal (e não arrow) para podermos usar this
  document.querySelector("#cor").addEventListener("change", function () {
    document.querySelector("body").style.backgroundColor = this.value;
  });

  document.querySelector("#conta").addEventListener("click", contar);
  document.querySelector("form").onsubmit = cumprimentar;
  setInterval(contarAutomatico, 1000);

  document.querySelector("#incrementar").addEventListener("click", incrementar);
  document.querySelector("#decrementar").addEventListener("click", decrementar);
  document.querySelector("#reset").addEventListener("click", reiniciar);

  document.querySelector("#direcao").addEventListener("change", function () {
    caixaFlex.style.flexDirection = this.value;
  });

  // Quando carregada a página, mostramos o valor guardado
  guardado.textContent = localStorage.getItem("counter");
});
