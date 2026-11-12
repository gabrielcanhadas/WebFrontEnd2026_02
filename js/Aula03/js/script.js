// getElementById
const titulo = document.getElementById("titulo");
const input = document.getElementById("textoTarefa");
const lista = document.getElementById("lista");
const info = document.getElementById("info");

// querySelector
const botaoAdicionar = document.querySelector("#btnAdicionar");

// addEventListener
botaoAdicionar.addEventListener("click", function () {
  // value
  const textoDigitado = input.value;

  if (textoDigitado.trim() === "") {
    alert("Digite uma tarefa.");
    return;
  }

  // createElement
  const novoItem = document.createElement("li");

  // createTextNode
  const texto = document.createTextNode(textoDigitado);

  // appendChild
  novoItem.appendChild(texto);

  // className
  novoItem.className = "item";

  lista.appendChild(novoItem);

  input.value = "";

  atualizarInformacoes();
});

// addEventListener
document.getElementById("btnMostrarOcultar").addEventListener("click", function () {
  // style.display
  if (lista.style.display === "none") {
    lista.style.display = "block";
  } else {
    lista.style.display = "none";
  }
});

// addEventListener
lista.addEventListener("click", function (event) {
  // tagName
  if (event.target.tagName === "LI") {
    // classList.toggle
    event.target.classList.toggle("concluida");

    atualizarInformacoes();
  }
});

function atualizarInformacoes() {
  // getElementsByTagName
  const itensLi = document.getElementsByTagName("li");

  // getElementsByClassName
  const itensClasse = document.getElementsByClassName("item");

  // length
  const quantidadeItens = itensLi.length;

  let mensagem = `
        Total de LI: ${quantidadeItens}<br>
        Total da classe item: ${itensClasse.length}<br>
    `;

  if (quantidadeItens > 0) {
    const primeiroItem = itensLi[0];

    mensagem += `
            Primeira tag: ${primeiroItem.tagName}<br>
            Classe: ${primeiroItem.className}<br>
            Elemento pai: ${primeiroItem.parentElement.tagName}
        `;
  }

  info.innerHTML = mensagem;
}

atualizarInformacoes();
