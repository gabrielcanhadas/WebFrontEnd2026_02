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

// Array para armazenar os produtos
const produtos = [];

// Elementos da página
const form = document.getElementById("formProduto");
const resultado = document.getElementById("resultado");

// Função para atualizar a lista
function atualizarLista() {
  /* Percorre o array de produtos
-------------------------------
 -> map() percorre cada elemento do array produtos.
 -> A variável produto representa um objeto Produto.
 -> produto.mostrar() retorna uma string como:
    "Notebook - R$ 3000.00"
 -> Cada string é envolvida em <li>...</li>
 -> Se houver três produtos, o resultado do map() será:
        [
            "<li>Notebook - R$ 2700.00</li>",
            "<li>Mouse - R$ 80.00</li>",
            "<li>Teclado - R$ 170.00</li>"
        ]
 -> join("") junta todos os <li> em uma única string
        <li>Notebook - R$ 2700.00</li><li>Mouse - R$ 80.00</li><li>Teclado - R$ 170.00</li>
*/
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
          <p>produto.__proto__ === Produto.prototype:${produtos[0].__proto__ === Produto.prototype} </p>
          <p>produto possui o método mostrar?${produtos[0].hasOwnProperty("mostrar")}</p>
          <p>Produto.prototype possui o método mostrar?${Produto.prototype.hasOwnProperty("mostrar")} </p>
        `
        : ""
    }
  `;
}

// Evento de envio do formulário
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

/*

1. Verificando a ligação com o prototype
----------------------------------------
    produtos[0].__proto__ === Produto.prototype

Quando você cria um objeto:

    const produto = new Produto("Notebook", 3000);

o JavaScript faz algo semelhante a:

    produto.__proto__ = Produto.prototype;

Assim, a expressão

    produto.__proto__ === Produto.prototype

retorna:

    true

porque ambos apontam para o mesmo objeto.

Visualmente:

     produto
        │
        ▼
    __proto__
        │
        ▼
Produto.prototype

Essa é a "ponte" que permite ao objeto acessar métodos definidos no prototype.

2. O objeto possui o método mostrar?
------------------------------------
    produtos[0].hasOwnProperty("mostrar")

O método hasOwnProperty() verifica se a propriedade pertence diretamente ao objeto.

Por exemplo:

    const produto = new Produto("Notebook", 3000);
    console.log(produto);

Resultado:

    {
        nome: "Notebook",
        preco: 3000
    }   
 
Observe que o objeto possui apenas:

    nome
    preco

O método mostrar não está dentro da instância.

    Portanto:

        produto.hasOwnProperty("mostrar")

    retorna:

        false

3. O método existe no Prototype?
--------------------------------
Produto.prototype.hasOwnProperty("mostrar")

Você criou o método assim:

    Produto.prototype.mostrar = function () {
        return `${this.nome} - R$ ${this.preco.toFixed(2)}`;
    };

Logo, a propriedade pertence diretamente ao objeto Produto.prototype.

Por isso:

Produto.prototype.hasOwnProperty("mostrar")

retorna:

    true

Como o JavaScript encontra o método?
------------------------------------
Quando você executa:

    produto.mostrar()

o JavaScript segue esta sequência:

Procura mostrar dentro de produto:


    produto = {
        nome: "Notebook",
        preco: 3000
    };  

Não encontra.

Vai para o prototype:

produto.__proto__

que é:

    Produto.prototype

Encontra:
    
    Produto.prototype.mostrar
 
Executa a função.

Fluxo:

    produto.mostrar()
          │
          ▼
 produto possui mostrar?
          │
         NÃO
          │
          ▼
    produto.__proto__
          │
          ▼
  Produto.prototype
          │
      mostrar()
 

Por isso o resultado das verificações normalmente será:

    produto.__proto__ === Produto.prototype: true
 
    produto possui o método mostrar? false
 
    Produto.prototype possui o método mostrar? true

Esse é exatamente o principal objetivo do Prototype: 
----------------------------------------------------
permitir que várias instâncias compartilhem os mesmos métodos, economizando memória, 
em vez de cada objeto possuir sua própria cópia de mostrar() e aplicarDesconto().

*/
