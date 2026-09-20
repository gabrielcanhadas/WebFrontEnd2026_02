const themeButton = document.querySelector("#themeButton");

themeButton.addEventListener("click", () => {
  const darkThemeEnabled = document.body.classList.toggle("dark");

  themeButton.textContent = darkThemeEnabled ? "☀️ Modo claro" : "🌙 Modo escuro";
  themeButton.setAttribute("aria-pressed", String(darkThemeEnabled));
});

/*
Explicação:

document.body.classList.toggle("dark") faz duas coisas ao mesmo tempo:
- acessa a lista de classes do elemento <body>
- adiciona ou remove a classe "dark"

Se o body não tiver a classe "dark", ela será adicionada.
Se o body já tiver a classe "dark", ela será removida.

O método toggle() retorna um valor booleano:
- true: a classe foi adicionada
- false: a classe foi removida

Por isso, o código abaixo funciona para atualizar o texto do botão:

const darkThemeEnabled = document.body.classList.toggle("dark");

themeButton.textContent = darkThemeEnabled ? "☀️ Modo claro" : "🌙 Modo escuro";

Em resumo, esse comando alterna o tema da página entre claro e escuro.

======================================================================================

Alternativa com função nomeada:

function alternarTema() {
  const darkThemeEnabled = document.body.classList.toggle("dark");
  themeButton.textContent = darkThemeEnabled ? "☀️ Modo claro" : "🌙 Modo escuro";
  themeButton.setAttribute("aria-pressed", String(darkThemeEnabled));
}

themeButton.addEventListener("click", alternarTema);
*/
