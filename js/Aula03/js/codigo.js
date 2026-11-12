// Seleciona todos os elementos <li> existentes no HTML
let myNodelist = document.getElementsByTagName("li");

// Bloco de inicialização: Adiciona o botão 'fechar' (x) a cada item da lista inicial
for (let i = 0; i < myNodelist.length; i++) {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7"); // Caractere Unicode para 'x' (multiplicação)
  span.className = "close"; // Aplica a classe CSS para estilização
  span.appendChild(txt);
  myNodelist[i].appendChild(span); // Adiciona o span ao final do <li>
}

// Seleciona todos os botões 'fechar' recém-criados
let close = document.getElementsByClassName("close");

// Bloco de exclusão inicial: Adiciona a funcionalidade de exclusão aos botões iniciais
for (let i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    let div = this.parentElement; // Obtém o elemento pai (o <li>)
    div.style.display = "none"; // Esconde o <li>
  };
}

// Seleciona a lista não ordenada (ul)
let list = document.querySelector("ul");

// Delegação de Eventos: Adiciona um ouvinte de clique à lista inteira
list.addEventListener(
  "click",
  function (ev) {
    // Verifica se o elemento clicado é um <li>
    if (ev.target.tagName === "LI") {
      // Alterna a classe 'checked' no <li>, ativando o estilo CSS de tarefa concluída
      ev.target.classList.toggle("checked");
    }
  },
  false,
);

// Função para adicionar um novo item à lista
function addElemento() {
  let li = document.createElement("li");
  // Obtém o valor digitado no campo de input com id="tarefa"
  let inputValue = document.getElementById("tarefa").value;
  let t = document.createTextNode(inputValue);

  li.appendChild(t);

  // Validação simples: verifica se o campo de input está vazio
  if (inputValue === "") {
    alert("Você precisa descrever a tarefa");
  } else {
    // Adiciona o novo <li> à lista com id="itemLista"
    document.getElementById("itemLista").appendChild(li);
  }

  // Limpa o campo de input após a adição
  document.getElementById("tarefa").value = "";

  // Cria e anexa o botão 'fechar' ao novo <li>
  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7"); // Caractere 'x'

  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  // Bloco de exclusão para novos itens:
  // Reitera sobre TODOS os botões 'close' (antigos e o novo) para redefinir o manipulador de eventos.
  // Isso é necessário porque o novo botão 'close' precisa ter a função 'onclick' definida.
  for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement;
      div.style.display = "none";
    };
  }
}
