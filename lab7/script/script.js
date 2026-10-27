// A. Estado e Variáveis

// Estado da aplicação
if (!localStorage.getItem("produtos-selecionados")) {
  localStorage.setItem("produtos-selecionados", "[]");
}

// Elementos do DOM
const produtosDiv = document.querySelector("#produtos div");
const produtosSelecionadosDiv = document.querySelector(
  "#produtos-selecionados",
);
const precoTotal = document.querySelector("#preco-total");

// B. Funções utilitárias

function criarProduto(produto) {
  // 1. Criar os elementos
  const artigo = document.createElement("article");
  const imagem = document.createElement("img");
  const titulo = document.createElement("h2");
  const descricao = document.createElement("p");
  const categoria = document.createElement("p");
  const preco = document.createElement("p");
  const rating = document.createElement("p");
  const botaoAdicionar = document.createElement("button");

  // 2. Preencher os elementos
  imagem.src = produto.image;
  imagem.alt = produto.title;
  titulo.textContent = produto.title;
  descricao.textContent = produto.description;
  categoria.textContent = produto.category;
  preco.textContent = `Preço: ${produto.price} €`;
  rating.textContent = `Rating: ${produto.rating.rate} (${produto.rating.count})`;

  botaoAdicionar.textContent = "+ Adicionar ao cesto";

  // 3. Evento do botão
  botaoAdicionar.addEventListener("click", function () {
    adicionarAoCesto(produto);
  });

  // 4. Juntar os elementos
  artigo.append(
    imagem,
    titulo,
    descricao,
    categoria,
    preco,
    rating,
    botaoAdicionar,
  );

  // 5. Devolver o artigo
  return artigo;
}

function criarProdutoCesto(produto) {
  // 1. Criar os elementos
  const artigo = document.createElement("article");
  const titulo = document.createElement("h2");
  const preco = document.createElement("p");
  const botaoRemover = document.createElement("button");

  // 2. Preencher os elementos
  titulo.textContent = produto.title;
  preco.textContent = `Preço: ${produto.price} €`;
  botaoRemover.textContent = "Remover do cesto";

  // 3. Evento do botão
  botaoRemover.addEventListener("click", function () {
    removerDoCesto(produto);
  });

  // 4. Juntar os elementos
  artigo.append(titulo, preco, botaoRemover);

  // 5. Devolver o artigo
  return artigo;
}

function renderizarProdutos(produtos) {
  // 1. Percorrer todos os produtos
  produtos.forEach(function (produto) {
    // 2. Criar o artigo
    const artigo = criarProduto(produto);

    // 3. Adicionar à página
    produtosDiv.append(artigo);
  });
}

function atualizaCesto() {
  // 1. Obter os produtos selecionados
  const produtosSelecionados = JSON.parse(
    localStorage.getItem("produtos-selecionados"),
  );

  // 2. Limpar o cesto apresentado
  produtosSelecionadosDiv.innerHTML = "";

  // 3. Mostrar os produtos selecionados
  produtosSelecionados.forEach(function (produto) {
    const artigo = criarProdutoCesto(produto);

    produtosSelecionadosDiv.append(artigo);
  });

  // 4. Calcular o preço total
  const total = produtosSelecionados.reduce(function (soma, produto) {
    return soma + produto.price;
  }, 0);

  // 5. Mostrar o preço total
  precoTotal.textContent = `Total: ${total.toFixed(2)} €`;
}

// C. Event handlers

function adicionarAoCesto(produto) {
  // 1. Obter os produtos selecionados
  const produtosSelecionados = JSON.parse(
    localStorage.getItem("produtos-selecionados"),
  );

  // 2. Adicionar o produto
  produtosSelecionados.push(produto);

  // 3. Guardar no localStorage
  localStorage.setItem(
    "produtos-selecionados",
    JSON.stringify(produtosSelecionados),
  );

  // 4. Atualizar o cesto
  atualizaCesto();
}

function removerDoCesto(produto) {
  // 1. Obter os produtos selecionados
  const produtosSelecionados = JSON.parse(
    localStorage.getItem("produtos-selecionados"),
  );

  // 2. Encontrar o índice do produto
  const indice = produtosSelecionados.findIndex(function (produtoSelecionado) {
    return produtoSelecionado.id === produto.id;
  });

  // 3. Remover o produto, se existir
  if (indice !== -1) {
    produtosSelecionados.splice(indice, 1);
  }

  // 4. Guardar no localStorage
  localStorage.setItem(
    "produtos-selecionados",
    JSON.stringify(produtosSelecionados),
  );

  // 5. Atualizar o cesto
  atualizaCesto();
}

// D. Event listeners
// E. Inicialização da aplicação

// 1. Mostrar os produtos
if (produtosDiv) {
  renderizarProdutos(produtos);
}

// 2. Atualizar o cesto ao abrir a página
atualizaCesto();
