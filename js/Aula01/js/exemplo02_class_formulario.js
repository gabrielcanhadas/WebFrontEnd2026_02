/*-----------------------------------------------------------------------------
  exemplo de classe produto 
  ----------------------------------------------------------------------------- */
class Produto {
  constructor(nome, preco) {
    this.nome = nome;
    this.preco = preco;
  }

  aplicarDesconto(percentual) {
    this.preco -= this.preco * (percentual / 100);
  }

  mostrar() {
    return `${this.nome} - R$ ${this.preco.toFixed(2)}`;
  }
}

// Array para armazenar os produtos
const produtos = [];

// Elementos da página
const form = document.getElementById("formProduto");
const resultado = document.getElementById("resultado");

// Atualiza a lista de produtos
function atualizarLista() {
  const listaProdutos = `
    <ul>
      ${produtos.map((produto) => `<li>${produto.mostrar()}</li>`).join("")}
    </ul>
  `;

  resultado.innerHTML = `
    <h2>Produtos Cadastrados</h2>
    ${listaProdutos}
    <hr>
    ${
      produtos.length > 0
        ? `
        <h3>Verificando Prototype</h3>
        <p>produto.__proto__ === Produto.prototype:${produtos[0].__proto__ === Produto.prototype}</p>
        <p>produto possui o método mostrar?${produtos[0].hasOwnProperty("mostrar")}</p>
        <p>Produto.prototype possui o método mostrar?${Produto.prototype.hasOwnProperty("mostrar")} </p>
        `
        : ""
    }
  `;
}

// Evento do formulário
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const preco = parseFloat(document.getElementById("preco").value);
  const desconto = parseFloat(document.getElementById("desconto").value);

  const produto = new Produto(nome, preco);

  if (desconto > 0) {
    produto.aplicarDesconto(desconto);
  }

  produtos.push(produto);

  atualizarLista();

  form.reset();
  document.getElementById("nome").focus();
});
