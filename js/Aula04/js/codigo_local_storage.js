/*
  localStorage é o armazenamento do navegador que mantém dados entre recargas.
  Ele guarda somente strings, enquanto a aplicação trabalha com valores
  JavaScript: aqui, um array de objetos. JSON (JavaScript Object Notation) é
  um formato textual para representar dados estruturados.

  Exemplo do valor JavaScript usado neste arquivo:
    [{ texto: "Fazer compras", concluida: false }]

  JSON.stringify(array) serializa/converte esse valor em texto JSON:
    '[{"texto":"Fazer compras","concluida":false}]'
  As aspas externas representam a string; as aspas das propriedades e do texto
  fazem parte do formato JSON. É essa string que pode ser passada ao setItem.

  JSON.parse(textoJSON) faz o caminho inverso: lê o texto e cria um array com
  objetos JavaScript novamente. Depois disso podemos acessar propriedades,
  por exemplo tarefa.texto, e percorrer o array com forEach.

  stringify e parse não são métodos do localStorage: pertencem ao objeto JSON.
  A conversão é necessária porque setItem só armazena texto; gravar um objeto
  diretamente não preservaria sua estrutura. Cada item deste exemplo mantém
  texto (string) e concluida (boolean), e o array mantém todas as tarefas.
  JSON também representa strings, números, booleanos, null, arrays e objetos;
  funções e outros valores especiais não são preservados como código.

  Sintaxes da API usadas neste arquivo:
    localStorage.setItem(chave, valor)  grava ou substitui o valor da chave;
    localStorage.getItem(chave)         lê o valor ou retorna null se não existir;
    localStorage.removeItem(chave)      remove a chave e seu valor.
*/
// Guarda as tarefas como objetos { texto, concluida } para preservar o estado.
const CHAVE_TAREFAS = "tarefas";
const listaTarefas = document.getElementById("itemLista");
const listaRecuperada = document.getElementById("listaRecuperada");

function lerTarefasIniciais() {
  return Array.from(listaTarefas.querySelectorAll("li")).map((item) => ({
    texto: item.childNodes[0].textContent.trim(),
    concluida: item.classList.contains("checked"),
  }));
}

function salvarTarefas(tarefas) {
  // 1) stringify converte o array JavaScript em uma string JSON.
  const tarefasComoTexto = JSON.stringify(tarefas);
  // 2) setItem(chave, valor) guarda essa string. Se a chave já existir,
  // o valor anterior é substituído pelo novo estado completo da lista.
  localStorage.setItem(CHAVE_TAREFAS, tarefasComoTexto);
  exibirTarefasSalvas();
}

function obterTarefas() {
  // getItem(chave) retorna a string salva ou null quando ainda não há valor.
  const dadosSalvos = localStorage.getItem(CHAVE_TAREFAS);
  if (dadosSalvos !== null) {
    try {
      // parse transforma a string JSON novamente em array/objetos JavaScript.
      // Se o conteúdo não for JSON válido, parse lança um erro e o catch abaixo
      // remove o conteúdo inválido antes de recriar o armazenamento.
      return JSON.parse(dadosSalvos);
    } catch {
      // removeItem(chave) apaga um JSON inválido para reinicializar os dados.
      localStorage.removeItem(CHAVE_TAREFAS);
    }
  }

  // Sem dados válidos, usa os <li> que vieram no HTML como dados iniciais.
  const tarefasIniciais = lerTarefasIniciais();
  // Também serializa os dados iniciais antes de gravar: setItem recebe texto.
  localStorage.setItem(CHAVE_TAREFAS, JSON.stringify(tarefasIniciais));
  return tarefasIniciais;
}

function exibirTarefasSalvas() {
  // Exemplo didático em duas etapas: getItem lê a string JSON; parse converte
  // essa string em array. "[]" é um JSON válido que representa array vazio e
  // serve como padrão se getItem retornar null (chave ainda inexistente).
  // Exemplo didático: recupera o texto do localStorage e monta uma lista simples.
  const tarefasSalvas = JSON.parse(localStorage.getItem(CHAVE_TAREFAS) || "[]");
  listaRecuperada.replaceChildren();
  tarefasSalvas.forEach((tarefa) => {
    const item = document.createElement("li");
    item.textContent = `${tarefa.concluida ? "Concluída" : "Pendente"}: ${tarefa.texto}`;
    listaRecuperada.appendChild(item);
  });
}

function renderizarTarefas(tarefas) {
  // Esta função recebe o array já carregado em memória e sincroniza a tela com
  // ele. Ela não decide quais tarefas existem: apenas recria a lista visual.
  // Primeiro remove todos os filhos atuais do <ul>; replaceChildren() sem
  // argumentos deixa o elemento vazio e evita itens duplicados na tela.
  listaTarefas.replaceChildren();

  // forEach executa uma vez para cada objeto do array, na ordem das tarefas.
  tarefas.forEach((tarefa) => {
    // Cria o <li> da tarefa atual. textContent insere texto como texto simples,
    // sem interpretar o conteúdo como HTML.
    const item = document.createElement("li");
    item.textContent = tarefa.texto;

    // A classe checked é a indicação visual de conclusão definida no CSS.
    // Só é adicionada quando a propriedade concluida for true.
    if (tarefa.concluida) item.classList.add("checked");

    // Cria o botão de remoção como um <span> dentro do <li>.
    const fechar = document.createElement("span");
    fechar.className = "close";
    fechar.textContent = "\u00D7";
    // Nome acessível para leitores de tela; o X continua sendo o símbolo visível.
    fechar.setAttribute("aria-label", "Remover tarefa");

    // Monta a hierarquia: o botão X fica dentro do item de tarefa.
    item.appendChild(fechar);
    // Insere o <li> completo na lista principal do documento.
    listaTarefas.appendChild(item);
  });

  // Depois que a lista visual foi reconstruída, salva o mesmo array no
  // localStorage e atualiza a lista didática que demonstra a recuperação.
  salvarTarefas(tarefas);
}

// Trata a inclusão de uma nova tarefa a partir do campo do formulário.
function addElemento() {
  // Localiza o campo de texto pelo id definido no HTML.
  const campo = document.getElementById("tarefa");
  // value contém o que foi digitado. trim() remove espaços no começo e no fim,
  // para que uma entrada composta apenas por espaços seja considerada vazia.
  const texto = campo.value.trim();

  // Valida antes de alterar os dados: alert informa o problema e return encerra
  // a função, impedindo a criação e a gravação de uma tarefa sem descrição.
  if (!texto) {
    alert("Você precisa descrever a tarefa");
    return;
  }

  // obtém o array atual do localStorage (ou inicializa a partir da lista HTML).
  const tarefas = obterTarefas();
  const agora = new Date();
  const dataHora = `${String(agora.getDate()).padStart(2, "0")}/${String(
    agora.getMonth() + 1,
  ).padStart(2, "0")}/${agora.getFullYear()} ${String(
    agora.getHours(),
  ).padStart(2, "0")}:${String(agora.getMinutes()).padStart(2, "0")}:${String(
    agora.getSeconds(),
  ).padStart(2, "0")}`;
  // push acrescenta um novo objeto ao final do array. A propriedade texto
  // recebe data/hora e descrição; concluida começa como false (pendente).
  tarefas.push({ texto: `[${dataHora}] ${texto}`, concluida: false });

  // Limpa o campo para permitir digitar a próxima tarefa.
  campo.value = "";

  // Recria a lista visível, persiste o array atualizado em localStorage e
  // atualiza a lista didática de dados recuperados.
  renderizarTarefas(tarefas);
}

listaTarefas.addEventListener("click", (evento) => {
  // Um único listener no <ul> trata cliques em todos os itens e botões X.
  // O evento propaga do elemento clicado até a lista (delegação de eventos).
  // evento.target é o elemento exato clicado; closest("li") localiza o item
  // correspondente, inclusive quando o clique ocorreu no <span> de remoção.
  const item = evento.target.closest("li");
  // Se o clique não veio de dentro de um item da lista, encerra o callback.
  if (!item) return;

  // Obtém a versão atual das tarefas, que é a fonte de dados persistida.
  const tarefas = obterTarefas();
  // Converte os filhos atuais do <ul> em array e encontra a posição do item
  // clicado. Essa posição corresponde ao índice da tarefa no array salvo.
  const indice = Array.from(listaTarefas.children).indexOf(item);

  // Se o alvo do clique tiver a classe close, remove a tarefa nesse índice.
  if (evento.target.classList.contains("close")) {
    tarefas.splice(indice, 1);
  } else {
    // Clique no restante do <li>: inverte true/false para concluir ou reabrir.
    tarefas[indice].concluida = !tarefas[indice].concluida;
  }

  // Atualiza a tela, o localStorage e a lista didática com o novo estado.
  renderizarTarefas(tarefas);
});

renderizarTarefas(obterTarefas());
