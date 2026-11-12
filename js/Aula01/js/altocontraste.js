// Adiciona um listener para o evento DOMContentLoaded, garantindo que o código só rode quando o DOM estiver totalmente carregado.
document.addEventListener('DOMContentLoaded', () => {

    // Referência ao elemento <body> do documento (usado para aplicar/remover classes globais).
    const corpo = document.body;

    // Referência ao elemento raiz <html>, utilizada para definir variáveis CSS (ex.: escala de fonte).
    const raiz = document.documentElement;

    // Obtém o elemento que contém todos os controles de acessibilidade (ID 'controles-acessibilidade').
    const controles = document.getElementById('controles-acessibilidade');

    // Array com as classes de contraste suportadas — usadas para limpar/alternar estados.
    const CLASSES_CONTRASTE = ['contraste-7-1', 'contraste-4-5-1'];

    // Constante que define o incremento/decremento da escala da fonte (0.1 = 10%).
    const PASSO_FONTE = 0.1;

    // Limite máximo para a escala da fonte (2.0 = 200%).
    const FONTE_MAX = 2.0;

    // Limite mínimo para a escala da fonte (1.0 = 100%).
    const FONTE_MIN = 1.0;

    // Tenta recuperar a escala de fonte previamente armazenada no localStorage.
    let escalaFonteAtual = parseFloat(localStorage.getItem('escalaFonte'));

    // Se não existir valor salvo, define a escala para o valor mínimo (tamanho base).
    if (isNaN(escalaFonteAtual)) escalaFonteAtual = FONTE_MIN;

    // Função utilitária para atualizar o atributo aria-pressed de um botão (estado ativo/inativo).
    //
    // O atributo aria-pressed é um atributo ARIA (Accessible Rich Internet Applications) que informa 
    // aos leitores de tela e outras tecnologias assistivas se um botão do tipo "toggle" (liga/desliga)
    // está atualmente pressionado (ativado) ou não
    function atualizarEstadoBotao(botao, ativo) {
        // Define aria-pressed para 'true' quando ativo e 'false' quando inativo.
        botao.setAttribute('aria-pressed', ativo ? 'true' : 'false');
    }

    // Função que aplica o estado inicial da interface com base no localStorage (se havia preferências salvas).
    function aplicarEstadoInicial() {
        // Recupera qual modo de contraste estava salvo (ex.: 'contraste-7-1').
        const contrasteSalvo = localStorage.getItem('modoContraste');

        // Se existia um modo de contraste salvo, aplica a classe ao corpo e atualiza o botão correspondente.
        if (contrasteSalvo) {
            // Adiciona a classe de contraste ao body.
            corpo.classList.add(contrasteSalvo);

            // Encontra o botão que corresponde ao contraste salvo usando o atributo data-contraste-nivel.
            const botao = controles.querySelector(
                `[data-contraste-nivel="${contrasteSalvo.replace('contraste-', '')}"]`
            );

            // Se encontrou o botão, marca-o como pressionado (ativo).
            if (botao) atualizarEstadoBotao(botao, true);
        }

        // Recupera se o espaçamento de linha estava ativado (salvo como 'true'/'false' no localStorage).
        const linhaSalva = localStorage.getItem('alturaLinha');

        // Se o espaçamento de linha estava ativo, aplica a classe e atualiza o estado do botão correspondente.
        if (linhaSalva === 'true') {
            corpo.classList.add('altura-linha-1-5');
            atualizarEstadoBotao(document.getElementById('altura-linha-alternar'), true);
        }

        // Recupera se o espaçamento de parágrafo estava ativado.
        const espacamentoSalvo = localStorage.getItem('espacamentoParagrafo');

        // Se o espaçamento de parágrafo estava ativo, aplica a classe e atualiza o botão correspondente.
        if (espacamentoSalvo === 'true') {
            corpo.classList.add('espacamento-paragrafo-2');
            atualizarEstadoBotao(document.getElementById('espacamento-paragrafo-alternar'), true);
        }

        // Aplica o tamanho de fonte salvo (ou o padrão) sem salvar novamente (passo 0 e salvar=false).
        atualizarTamanhoFonte(0, false);
    }

    // Função que atualiza a escala da fonte.
    // - passo: valor a adicionar/subtrair da escala atual (ex.: +0.1 ou -0.1)
    // - salvar: booleano indicando se o novo valor deve ser salvo em localStorage
    function atualizarTamanhoFonte(passo, salvar) {
        // Calcula a nova escala garantindo que respeite os limites definidos.
        escalaFonteAtual = Math.min(FONTE_MAX, Math.max(FONTE_MIN, escalaFonteAtual + passo));

        // Define a variável CSS --escala-fonte-atual no elemento :root (<html>).
        raiz.style.setProperty('--escala-fonte-atual', escalaFonteAtual);

        // Habilita/desabilita o botão de aumentar fonte dependendo se atingiu o máximo.
        document.getElementById('fonte-aumentar').disabled = escalaFonteAtual >= FONTE_MAX;

        // Habilita/desabilita o botão de diminuir fonte dependendo se atingiu o mínimo.
        document.getElementById('fonte-diminuir').disabled = escalaFonteAtual <= FONTE_MIN;

        // Se solicitado, salva a escala atual no localStorage para persistência entre visitas.
        if (salvar) localStorage.setItem('escalaFonte', escalaFonteAtual);
    }

    // Função que reseta todas as preferências de acessibilidade para os valores padrão.
    function resetarAcessibilidade() {
        // Remove todas as classes de contraste do body (itera sobre o array de classes).
        CLASSES_CONTRASTE.forEach(cls => corpo.classList.remove(cls));

        // Atualiza o estado (aria-pressed) de todos os botões de contraste para falso.
        controles.querySelectorAll('[data-contraste-nivel]').forEach(btn => atualizarEstadoBotao(btn, false));

        // Remove do localStorage a informação sobre modo de contraste.
        localStorage.removeItem('modoContraste');

        // Remove a classe de altura de linha e atualiza o botão correspondente.
        corpo.classList.remove('altura-linha-1-5');
        atualizarEstadoBotao(document.getElementById('altura-linha-alternar'), false);
        localStorage.removeItem('alturaLinha'); // Remove o estado salvo de altura de linha.

        // Remove a classe de espaçamento de parágrafo e atualiza o botão correspondente.
        corpo.classList.remove('espacamento-paragrafo-2');
        atualizarEstadoBotao(document.getElementById('espacamento-paragrafo-alternar'), false);
        localStorage.removeItem('espacamentoParagrafo'); // Remove o estado salvo de espaçamento.

        // Restaura a escala de fonte para o mínimo (padrão) e salva imediatamente.
        escalaFonteAtual = FONTE_MIN;
        atualizarTamanhoFonte(0, true); // Passo 0 apenas para aplicar + salvar.
    }

    // --- Adiciona listeners aos botões de contraste usando o atributo data-contraste-nivel ---
    controles.querySelectorAll('[data-contraste-nivel]').forEach(botao => {
        // Para cada botão de contraste, adiciona um listener de clique.
        botao.addEventListener('click', () => {
            // Lê o nível do contraste a partir do atributo data-contraste-nivel (ex.: "7-1" ou "4-5-1").
            const nivel = botao.dataset.contrasteNivel;

            // Constrói o nome da classe que será aplicada ao body (ex.: 'contraste-7-1').
            const classe = `contraste-${nivel}`;

            // Verifica se a classe já está aplicada no body (modo ativo).
            const ativo = corpo.classList.contains(classe);

            // Se já estiver ativo, desativa: remove classe, atualiza botão e limpa o localStorage.
            if (ativo) {
                corpo.classList.remove(classe);
                atualizarEstadoBotao(botao, false);
                localStorage.removeItem('modoContraste');
            } else {
                // Se não estiver ativo, primeiro garante que outros modos de contraste sejam desativados.
                CLASSES_CONTRASTE.forEach(cls => {
                    corpo.classList.remove(cls); // Remove cada classe existente.
                    // Encontra o botão que representa a classe removida e atualiza seu estado para falso.
                    const outro = controles.querySelector(`[data-contraste-nivel="${cls.replace('contraste-', '')}"]`);
                    if (outro) atualizarEstadoBotao(outro, false);
                });

                // Ativa o novo modo: adiciona a classe ao body, marca o botão e salva no localStorage.
                corpo.classList.add(classe);
                atualizarEstadoBotao(botao, true);
                localStorage.setItem('modoContraste', classe);
            }
        });
    });

    // Listener para o botão de aumentar a fonte: ao clicar, chama atualizarTamanhoFonte com passo positivo e salva.
    document.getElementById('fonte-aumentar')
        .addEventListener('click', () => atualizarTamanhoFonte(PASSO_FONTE, true));

    // Listener para o botão de diminuir a fonte: ao clicar, chama atualizarTamanhoFonte com passo negativo e salva.
    document.getElementById('fonte-diminuir')
        .addEventListener('click', () => atualizarTamanhoFonte(-PASSO_FONTE, true));

    // Listener para alternar a altura da linha (1.5x).
    document.getElementById('altura-linha-alternar')
        .addEventListener('click', e => {
            // Alterna a classe altura-linha-1-5 no body e recebe true/false conforme o novo estado.
            const ativo = corpo.classList.toggle('altura-linha-1-5');

            // Atualiza visualmente o estado aria-pressed do botão (usando o alvo do evento).
            atualizarEstadoBotao(e.target, ativo);

            // Salva o estado no localStorage para persistência.
            localStorage.setItem('alturaLinha', ativo);
        });

    // Listener para alternar o espaçamento entre parágrafos (2x).
    document.getElementById('espacamento-paragrafo-alternar')
        .addEventListener('click', e => {
            // Alterna a classe espacamento-paragrafo-2 e armazena o novo estado em 'ativo'.
            const ativo = corpo.classList.toggle('espacamento-paragrafo-2');

            // Atualiza o atributo aria-pressed do botão que foi clicado.
            atualizarEstadoBotao(e.target, ativo);

            // Salva o estado no localStorage.
            localStorage.setItem('espacamentoParagrafo', ativo);
        });

    // Listener para o botão de reset: quando clicado, chama a função que reseta todas as preferências.
    document.getElementById('botao-resetar')
        .addEventListener('click', resetarAcessibilidade);

    // Chama a função que aplica o estado inicial com base no localStorage ao terminar a configuração dos listeners.
    aplicarEstadoInicial();

}); // Fecha o listener DOMContentLoaded.
