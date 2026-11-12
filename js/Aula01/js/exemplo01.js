const entrada = document.getElementById("entrada_dados");
const demo = document.getElementById("demo");
entrada.addEventListener('input', () => {
    let texto = entrada.value;
    demo.textContent = "Texto digitado: " + texto;
});

//-------------------------------------------------------------------------------------------------

const posicaoMouse = document.getElementById("pos_mouse");
document.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    posicaoMouse.textContent = `Posição X,Y do mouse: (${mouseX}, ${mouseY})`;
});

//-------------------------------------------------------------------------------------------------

/*

// Seleciona os elementos que vamos manipular
const rodape = document.getElementById('rodape');
const corpoDaPagina = document.body; // Selecionamos o <body> para mudar a cor de fundo
// Adiciona o listener para o evento 'keydown' no documento inteiro
document.addEventListener('keydown', (event) => {
    // Para evitar problemas com Caps Lock, convertemos a tecla para minúscula
    const tecla = event.key.toLowerCase();
    // Atualiza a mensagem no rodapé, como antes
    rodape.textContent = `A tecla "${tecla}" foi pressionada.`;
    // Usa a estrutura switch para verificar qual tecla foi pressionada
    switch (tecla) {
        case 'a':
            // Se a tecla for 'a', muda a cor de fundo para azul
            corpoDaPagina.style.backgroundColor = 'cornflowerblue';
            break; // 'break' impede que o código continue executando os outros casos
        case 'v':
            // Se a tecla for 'v', muda para verde
            corpoDaPagina.style.backgroundColor = 'seagreen';
            break;
        case 'b':
            // Se a tecla for 'b', muda para branco
            corpoDaPagina.style.backgroundColor = 'white';
            break;
        // O 'default' é executado se a tecla pressionada não for nenhuma das anteriores
        default:
            // Podemos opcionalmente fazer algo aqui, como piscar uma cor de aviso
            // ou simplesmente não fazer nada.
            console.log(`A tecla "${tecla}" não tem uma ação definida.`);
            break;
    }
});

*/

//-------------------------------------------------------------------------------------------------

/*
Criaremos os seguintes atalhos:
b: Muda o fundo para Branco (como antes).
Shift + C: Muda o fundo para Cinza.
Ctrl + A: Muda o fundo para Azul.
Alt + V: Muda o fundo para Verde.
Ctrl + Shift + R: Reseta a cor de fundo para a original.
*/

const rodape = document.getElementById('rodape');
const corpoDaPagina = document.body;
const corOriginal = corpoDaPagina.style.backgroundColor; // Guarda a cor inicial
document.addEventListener('keydown', (event) => {
    // Para atalhos, é comum querermos impedir o comportamento padrão do navegador.
    // Ex: Ctrl+A normalmente seleciona todo o texto.
    // event.preventDefault(); // Descomente se quiser bloquear a ação padrão.
    const tecla = event.key.toLowerCase();
    let mensagem = `Pressionado: `;
    // Constrói a mensagem dinamicamente
    if (event.ctrlKey) mensagem += 'Ctrl + ';
    if (event.shiftKey) mensagem += 'Shift + ';
    if (event.altKey) mensagem += 'Alt + ';
    mensagem += tecla;
    rodape.textContent = mensagem;
    // --- Lógica dos Atalhos ---
    // Atalho para Resetar (Ctrl + Shift + R)
    if (event.ctrlKey && event.shiftKey && tecla === 'r') {
        event.preventDefault(); // Impede o recarregamento forçado da página
        corpoDaPagina.style.backgroundColor = corOriginal;
        rodape.textContent = 'Cor resetada!';
    }
    // Atalho para Azul (Ctrl + A)
    else if (event.ctrlKey && tecla === 'a') {
        event.preventDefault(); // Impede a seleção de todo o texto
        corpoDaPagina.style.backgroundColor = '#95ebf1ff';
    }
    // Atalho para Verde (Alt + V)
    else if (event.altKey && tecla === 'v') {
        event.preventDefault();
        corpoDaPagina.style.backgroundColor = '#a4f090ff';
    }
    // Atalho para Cinza (Shift + C)
    else if (event.shiftKey && tecla === 'c') {
        corpoDaPagina.style.backgroundColor = '#c2c1c1ff';
    }
    // Atalho para Branco simples (apenas B)
    else if (tecla === 'b') {
        corpoDaPagina.style.backgroundColor = 'white';
    }
});

/*

O objeto event que recebemos na função de callback nos fornece propriedades booleanas
(verdadeiro/falso) para verificar o estado dessas teclas no momento exato em que o
evento principal (keydown, click, etc.) foi disparado.

Propriedade     Valor       Descrição
------------------------------------------------------------------------------------
event.ctrlKey   true/false  true se a tecla Ctrl estava pressionada durante o evento.
event.shiftKey  true/false  true se a tecla Shift estava pressionada.
event.altKey    true/false  true se a tecla Alt (ou Option em Macs) estava pressionada.
event.metaKey   true/false  true se a tecla Meta estava pressionada.
                            Em teclados Windows, é a tecla Windows.
                            Em Macs, é a tecla Command (⌘).

Essas propriedades funcionam em conjunto com a tecla principal que disparou o evento (por exemplo, event.key).
*/

//-------------------------------------------------------------------------------------------------