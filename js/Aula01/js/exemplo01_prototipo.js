/*-----------------------------------------------------------------------------
  exemplo de função pessoa com protótipo 
  ----------------------------------------------------------------------------- */
function Pessoa(nome) {
  this.nome = nome;
}

Pessoa.prototype.apresentar = function () {
  return `Olá, meu nome é ${this.nome}`;
};

const p1 = new Pessoa("João");
const p2 = new Pessoa("Maria");

document.getElementById("resultado").innerHTML = `
    <p>${p1.apresentar()}</p>
    <p>${p2.apresentar()}</p>
    <hr>
    <p>p1.__proto__ === Pessoa.prototype:${p1.__proto__ === Pessoa.prototype}</p>
    <p>p1 possui o método apresentar?${p1.hasOwnProperty("apresentar")}</p>
    <p>Pessoa.prototype possui o método apresentar?${Pessoa.prototype.hasOwnProperty("apresentar")}</p>
`;
/*
document.getElementById("resultado").innerHTML =
    "<p>" + p1.apresentar() + "</p>" +
    "<p>" + p2.apresentar() + "</p>" +
    "<hr>" +
    "<p>p1.__proto__ === Pessoa.prototype: " +
    (p1.__proto__ === Pessoa.prototype) +
    "</p>";
*/

/*-----------------------------------------------------------------------------*/
