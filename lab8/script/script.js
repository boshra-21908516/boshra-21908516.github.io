// A. Estado e Variáveis

const API_BASE_URL = "https://deisishop.pw.deisi.ulusofona.pt";
let listaProdutos = [];

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
const filtroCategoria = document.querySelector("#filtro-categoria");
const ordenarPreco = document.querySelector("#ordenar-preco");
const procurarProduto = document.querySelector("#procurar-produto");
const estudanteDeisi = document.querySelector("#estudante-deisi");
const cupaoDesconto = document.querySelector("#cupao-desconto");
const botaoComprar = document.querySelector("#botao-comprar");
const valorFinal = document.querySelector("#valor-final");
const referenciaPagamento = document.querySelector("#referencia-pagamento");

// B. Funções utilitárias

function obterUrlImagem(imagem) {
  if (!imagem) return "";
  return imagem.startsWith("http") ? imagem : `${API_BASE_URL}${imagem}`;
}

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
  imagem.src = obterUrlImagem(produto.image);
  imagem.alt = produto.title;
  titulo.textContent = produto.title;
  descricao.textContent = produto.description;
  categoria.textContent = produto.category;
  preco.textContent = `Custo total: ${Number(produto.price)} €`;
  rating.textContent = `★ ${produto.rating.rate} (${produto.rating.count} avaliações)`;

  botaoAdicionar.textContent = "+ Adicionar ao Cesto";

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
  const imagem = document.createElement("img");
  const preco = document.createElement("p");
  const botaoRemover = document.createElement("button");

  // 2. Preencher os elementos
  titulo.textContent = produto.title;
  imagem.src = obterUrlImagem(produto.image);
  imagem.alt = produto.title;
  preco.textContent = `Custo total: ${Number(produto.price).toFixed(2)} €`;
  botaoRemover.textContent = "- Remover do Cesto";

  // 3. Evento do botão
  botaoRemover.addEventListener("click", function () {
    removerDoCesto(produto);
  });

  // 4. Juntar os elementos
  artigo.append(titulo, imagem, preco, botaoRemover);

  // 5. Devolver o artigo
  return artigo;
}

function renderizarProdutos(produtos) {
  if (!produtosDiv) return;

  // 1. Limpar os produtos apresentados
  produtosDiv.innerHTML = "";

  // 2. Percorrer todos os produtos
  produtos.forEach(function (produto) {
    // 3. Criar o artigo
    const artigo = criarProduto(produto);

    // 4. Adicionar à página
    produtosDiv.append(artigo);
  });
}

function atualizarListaProdutos() {
  let produtosFiltrados = [...listaProdutos];

  // 1. Filtrar por categoria
  if (filtroCategoria && filtroCategoria.value !== "") {
    produtosFiltrados = produtosFiltrados.filter(function (produto) {
      return produto.category === filtroCategoria.value;
    });
  }

  // 2. Procurar pelo nome do produto
  if (procurarProduto && procurarProduto.value.trim() !== "") {
    const termo = procurarProduto.value.trim().toLowerCase();
    produtosFiltrados = produtosFiltrados.filter(function (produto) {
      return produto.title.toLowerCase().includes(termo);
    });
  }

  // 3. Ordenar pelo preço
  if (ordenarPreco && ordenarPreco.value !== "") {
    produtosFiltrados.sort(function (a, b) {
      if (ordenarPreco.value === "asc") {
        return Number(a.price) - Number(b.price);
      }
      if (ordenarPreco.value === "desc") {
        return Number(b.price) - Number(a.price);
      }
      return 0;
    });
  }

  // 4. Renderizar a lista atualizada
  renderizarProdutos(produtosFiltrados);
}

function carregarCategorias() {
  if (!filtroCategoria) return;

  fetch(`${API_BASE_URL}/categories`)
    .then(function (response) {
      return response.json();
    })
    .then(function (categorias) {
      categorias.forEach(function (categoria) {
        const opcao = document.createElement("option");
        const nomeCategoria = categoria.name || categoria;
        opcao.value = nomeCategoria;
        opcao.textContent = nomeCategoria;
        filtroCategoria.append(opcao);
      });
    })
    .catch(function (error) {
      console.error("Erro ao carregar categorias:", error);
    });
}

function carregarProdutos() {
  if (!produtosDiv) return;

  fetch(`${API_BASE_URL}/products`)
    .then(function (response) {
      return response.json();
    })
    .then(function (produtos) {
      listaProdutos = produtos;
      atualizarListaProdutos();
    })
    .catch(function (error) {
      console.error("Erro ao carregar produtos:", error);
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
    return soma + Number(produto.price);
  }, 0);

  // 5. Mostrar o preço total
  precoTotal.textContent = `Custo total: ${total.toFixed(2)} €`;
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

function comprar() {
  const produtosSelecionados = JSON.parse(
    localStorage.getItem("produtos-selecionados"),
  );

  const idsProdutos = produtosSelecionados.map(function (produto) {
    return produto.id;
  });

  const dados = {
    products: idsProdutos,
    student: estudanteDeisi ? estudanteDeisi.checked : false,
    coupon: cupaoDesconto ? cupaoDesconto.value.trim() : "",
  };

  fetch(`${API_BASE_URL}/buy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.error) {
        valorFinal.textContent = data.error;
        referenciaPagamento.textContent = "";
        return;
      }

      valorFinal.textContent = `Valor final a pagar (com eventuais descontos): ${data.totalCost} €`;
      referenciaPagamento.textContent = `Referência de pagamento: ${data.reference}`;
    })
    .catch(function (error) {
      console.error("Erro ao efetuar a compra:", error);
    });
}

// D. Event listeners

if (filtroCategoria) {
  filtroCategoria.addEventListener("change", atualizarListaProdutos);
}

if (ordenarPreco) {
  ordenarPreco.addEventListener("change", atualizarListaProdutos);
}

if (procurarProduto) {
  procurarProduto.addEventListener("input", atualizarListaProdutos);
}

if (botaoComprar) {
  botaoComprar.addEventListener("click", comprar);
}

// E. Inicialização da aplicação

// 1. Carregar categorias e produtos da API
carregarCategorias();
carregarProdutos();

// 2. Atualizar o cesto ao abrir a página
atualizaCesto();
