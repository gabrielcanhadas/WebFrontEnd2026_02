/*-----------------------------------------------------------------------------
  exemplo de função produto com protótipo 
  ----------------------------------------------------------------------------- */
function Produto(nome, preco) {
  this.nome = nome;
  this.preco = preco;
}

Produto.prototype.aplicarDesconto = function (percentual) {
  this.preco -= this.preco * (percentual / 100);
};

Produto.prototype.mostrar = function () {
  return `${this.nome} - R$ ${this.preco.toFixed(2)}`;
};

// Criando produtos
const notebook = new Produto("Notebook", 3000);
const mouse = new Produto("Mouse", 100);
const teclado = new Produto("Teclado", 200);

// Aplicando descontos
notebook.aplicarDesconto(10);
mouse.aplicarDesconto(20);
teclado.aplicarDesconto(15);

// Colocando as instâncias em um array
const produtos = [notebook, mouse, teclado];

// Gerando a lista HTML
const listaProdutos = `
    <ul>
        ${produtos.map((produto) => `<li>${produto.mostrar()}</li>`).join("")}
    </ul>
`;

document.getElementById("resultado").innerHTML = `
    <h2>Produtos com desconto</h2>
    ${listaProdutos}
    <hr>
    <h3>Verificando o Prototype</h3>
    <p>notebook.__proto__ === Produto.prototype:${notebook.__proto__ === Produto.prototype}</p>
    <p>notebook possui o método mostrar?${notebook.hasOwnProperty("mostrar")}</p>
    <p>Produto.prototype possui o método mostrar?${Produto.prototype.hasOwnProperty("mostrar")}</p>
`;

/*
document.getElementById("resultado").innerHTML = `
    <h2>Produtos com desconto</h2>
    <p>${notebook.mostrar()}</p>
    <p>${mouse.mostrar()}</p>
    <hr>
    <h3>Verificando o Prototype</h3>
    <p>
        notebook.__proto__ === Produto.prototype:
        ${notebook.__proto__ === Produto.prototype}
    </p>
    <p>
        notebook possui o método mostrar?
        ${notebook.hasOwnProperty("mostrar")}
    </p>
    <p>
        Produto.prototype possui o método mostrar?
        ${Produto.prototype.hasOwnProperty("mostrar")}
    </p>
    <p>
        Produto.prototype possui o método aplicarDesconto?
        ${Produto.prototype.hasOwnProperty("aplicarDesconto")}
    </p>
`;
*/

/*
document.getElementById("resultado").innerHTML =
    "<p>" + p1.apresentar() + "</p>" +
    "<p>" + p2.apresentar() + "</p>" +
    "<hr>" +
    "<p>p1.__proto__ === Pessoa.prototype: " +
    (p1.__proto__ === Pessoa.prototype) +
    "</p>" +
    "<p>p1 possui o método apresentar? " +
    p1.hasOwnProperty("apresentar") +
    "</p>" +
    "<p>Pessoa.prototype possui o método apresentar? " +
    Pessoa.prototype.hasOwnProperty("apresentar") +
    "</p>";
*/
