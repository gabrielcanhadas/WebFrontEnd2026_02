/*
//Ao carregar a página
//--------------------
window.onload = function () {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.length > 0) {
    const emails = users.map((u) => u.email).join(", ");
    alert("olá, você já possui o seguinte e-mail já cadastrado: " + emails);
  }
};
*/
function store() {
  const name = document.getElementById("name");
  const pw = document.getElementById("pw");

  const lowerCaseLetters = /[a-z]/g;
  const upperCaseLetters = /[A-Z]/g;
  const numbers = /[0-9]/g;

  if (name.value.length == 0) {
    alert("Informe um email");
  } else if (pw.value.length == 0) {
    alert("Informe uma senha");
  } else if (pw.value.length > 8) {
    alert("Máximo de 8 caracteres");
  } else if (!pw.value.match(numbers)) {
    alert("Deve conter 1 numero");
  } else if (!pw.value.match(upperCaseLetters)) {
    alert("Deve conter uma letra maíuscula");
  } else if (!pw.value.match(lowerCaseLetters)) {
    alert("Deve conter uma letra minúscula");
  } else {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    /*----------------------------
      Ler usuários do localStorage
      ----------------------------
      → localStorage.getItem("users") → pega os dados salvos (vem como texto)
        JSON.parse(...)               → transforma esse texto em array de objetos
        || []                         → se não existir nada, usa um array vazio

      "Pegue os usuários salvos no navegador. 
       Se não existir nada, comece com uma lista vazia."

    */

    const existe = users.find((u) => u.email === name.value);
    /*-------------------------------
      Verificar se o e-mail já existe
      -------------------------------
      → Percorre a lista users
        Procura um usuário (u) onde: u.email === name.value
        Se encontrar      → retorna o usuário
        Se não encontrar  → retorna undefined

      .find() é um método de arrays que:
      ----------------------------------
      → percorre todos os itens da lista
      → retorna o primeiro elemento que atende a uma condição
      
      → (u) => u.email === name.value
        significa: "para cada usuário (u), verifique se u.email é igual ao valor do campo name"
      
      → (u) é o nome dado para a variável que representa cada item da lista durante a busca, 
        pode ser qualquer nome, mas "u" é comum para representar "user"
    /*

    //regra do gmail
    //-----------------
    if (name.value.includes("@gmail.com") && existe) {
      users = users.filter((u) => u.email !== name.value);
      localStorage.setItem("users", JSON.stringify(users));
      alert("Usuário gmail removido do armazenamento.");
      return;
    }

    /*------------------------------------------
      Código          O que faz
      ------------------------------------------
      JSON.parse      transforma texto em objeto
      JSON.stringify  transforma objeto em texto
      find()	        procura algo no array
      push()	        adiciona novo item
      localStorage	  guarda dados no navegador

      → JSON = JavaScript Object Notation
        ---------------------------------
          É um formato de texto que representa objetos e arrays

          JSON.stringify()   transforma objeto → texto
          JSON.parse()       transforma texto → objeto
    */
    if (!existe) {
      users.push({
        email: name.value,
        senha: pw.value,
      });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Sua conta foi criada");
    } else {
      alert("Este e-mail já está cadastrado");
    }
  }
}

function check() {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const userName = document.getElementById("userName");
  const userPw = document.getElementById("userPw");

  //procura usuário
  const user = users.find((u) => u.email === userName.value && u.senha === userPw.value);
  if (user) {
    alert("Login realizado.");
  } else {
    alert("Erro ao fazer login");
  }
}

/*==================================================================

INÍCIO
  ↓
Ler usuários do localStorage
  ↓
users existe?
  ↓
  NÃO → users = []
  SIM → users = lista de usuários
  ↓
Procurar usuário com mesmo email (.find)
  ↓
Encontrou?
  ↓
┌───────────────┬────────────────┐
│ NÃO           │ SIM            │
│ (undefined)   │ (objeto)       │
└───────────────┴────────────────┘
       ↓                 ↓
Criar novo usuário   Mostrar alerta:
(users.push)         "já cadastrado"
        ↓
Salvar no localStorage
        ↓
FIM

==================================================================

Situação 1: PRIMEIRA VEZ
------------------------

users = []

Fluxo:
------

.find() começa
  ↓
Array está vazio?
  ↓
SIM
  ↓
Não percorre nada
  ↓
Retorna undefined

==================================================================

Situação 2: JÁ EXISTE USUÁRIO
-----------------------------

users = [
  { email: "a@gmail.com", senha: "123" }
]

Fluxo:
------

.find() começa
  ↓
Pega primeiro usuário
  ↓
u.email === name.value ?
  ↓
┌───────────────┬────────────────┐
│ NÃO           │ SIM            │
└───────────────┴────────────────┘
      ↓                 ↓
Próximo item         RETORNA usuário
      ↓
(se acabar)
RETORNA undefined

*/
