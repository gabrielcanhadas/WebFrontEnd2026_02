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
    // div.style.display = "none"; // Esconde o <li>
    div.remove(); // Remove o <li>
  };
}

// Seleciona a lista não ordenada (ul)
let list = document.querySelector("ul");

// Delegação de Eventos: Adiciona um ouvinte de clique à lista inteira
list.addEventListener("click", function (ev) {
  // Verifica se o elemento clicado é um <li>
  if (ev.target.tagName === "LI") {
    // Alterna a classe 'checked' no <li>, ativando o estilo CSS de tarefa concluída
    ev.target.classList.toggle("checked");
  }
});

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
    const agora = new Date();

    /*    const dataHora = `${agora.getDate()}/${agora.getMonth() + 1}/${agora.getFullYear()} 
                            ${agora.getHours()}:${agora.getMinutes()}:${agora.getSeconds()}`;
                      */

    const dataHora = `${String(agora.getDate()).padStart(2, "0")}/${String(agora.getMonth() + 1).padStart(2, "0")}/${agora.getFullYear()}
                      ${String(agora.getHours()).padStart(2, "0")}:${String(agora.getMinutes()).padStart(2, "0")}:${String(agora.getSeconds()).padStart(2, "0")}`;

    li.textContent = `[${dataHora}] ${inputValue}`;
    // Adiciona o novo <li> à lista com id="itemLista"
    document.getElementById("itemLista").appendChild(li);
  }

  /*
As crases criam uma template string. Dentro dela, ${...} insere o resultado de uma expressão no texto.

Por exemplo:

`${agora.getDate()}`

insere o dia do mês. Como os métodos de Date retornam números, o código usa String(...) para convertê-los em texto. 
Isso permite chamar .padStart(2, "0"), que completa com um zero à esquerda quando o valor tem apenas um dígito: 7 vira "07".

Cada parte funciona assim:
- agora.getDate() retorna o dia do mês, de 1 a 31.
- agora.getMonth() + 1 retorna o mês. O + 1 é necessário porque getMonth() conta de 0 a 11.
- agora.getFullYear() retorna o ano com quatro dígitos.
- getHours(), getMinutes() e getSeconds() retornam a hora, os minutos e os segundos.
- As barras, os espaços e os dois-pontos são caracteres fixos que separam as partes.
Por exemplo, se a data for 5 de março de 2026 às 9h04min02s, o resultado será:
05/03/2026 09:04:02
*/

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
      // div.style.display = "none"; //oculta o elemento li correspondente ao botão 'close' clicado
      div.remove(); // Remove o elemento li correspondente ao botão 'close' clicado
    };
  }
}
