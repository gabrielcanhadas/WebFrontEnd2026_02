const container = document.querySelector(".container");
const seletorImagens = document.querySelector("#seletor-imagens");
const statusImagens = document.querySelector("#status-imagens");

let maiorZIndex = 0;
let interacaoAtual = null;
const urlsImagens = [];

seletorImagens.addEventListener("change", () => {
  const arquivos = Array.from(seletorImagens.files).filter((arquivo) =>
    arquivo.type.startsWith("image/"),
  );

  urlsImagens.forEach((url) => URL.revokeObjectURL(url));
  urlsImagens.length = 0;
  container.replaceChildren();
  maiorZIndex = 0;

  arquivos.forEach((arquivo, indice) => {
    const moldura = document.createElement("div");
    moldura.className = "imagem-moldura";
    moldura.style.left = `${20 + (indice % 5) * 35}px`;
    moldura.style.top = `${80 + Math.floor(indice / 5) * 40}px`;
    moldura.style.zIndex = ++maiorZIndex;

    const imagem = document.createElement("img");
    const url = URL.createObjectURL(arquivo);
    urlsImagens.push(url);
    imagem.src = url;
    imagem.alt = arquivo.name;
    imagem.draggable = false;

    const alca = document.createElement("button");
    alca.type = "button";
    alca.className = "alca-redimensionamento";
    alca.setAttribute("aria-label", `Redimensionar ${arquivo.name}`);

    moldura.append(imagem, alca);
    container.append(moldura);
  });

  statusImagens.textContent = arquivos.length
    ? `${arquivos.length} imagem(ns) carregada(s)`
    : "Nenhuma imagem encontrada na pasta";
});

container.addEventListener("pointerdown", (evento) => {
  const moldura = evento.target.closest(".imagem-moldura");
  if (!moldura) return;

  evento.preventDefault();
  const limites = moldura.getBoundingClientRect();
  moldura.style.zIndex = ++maiorZIndex;

  if (evento.target.closest(".alca-redimensionamento")) {
    interacaoAtual = {
      tipo: "redimensionar",
      moldura,
      xInicial: evento.clientX,
      yInicial: evento.clientY,
      larguraInicial: limites.width,
      proporcao: limites.width / limites.height,
    };
  } else {
    interacaoAtual = {
      tipo: "mover",
      moldura,
      offsetX: evento.clientX - limites.left,
      offsetY: evento.clientY - limites.top,
    };
  }

  moldura.setPointerCapture(evento.pointerId);
});

document.addEventListener("pointermove", (evento) => {
  if (!interacaoAtual) return;

  const limites = container.getBoundingClientRect();

  if (interacaoAtual.tipo === "mover") {
    interacaoAtual.moldura.style.left = `${evento.clientX - limites.left - interacaoAtual.offsetX}px`;
    interacaoAtual.moldura.style.top = `${evento.clientY - limites.top - interacaoAtual.offsetY}px`;
    return;
  }

  const diferencaX = evento.clientX - interacaoAtual.xInicial;
  const diferencaY = evento.clientY - interacaoAtual.yInicial;
  const fatorProporcao = interacaoAtual.proporcao;
  const variacaoLargura =
    (diferencaX + diferencaY / fatorProporcao) / (1 + 1 / fatorProporcao ** 2);
  const largura = Math.max(120, interacaoAtual.larguraInicial + variacaoLargura);
  interacaoAtual.moldura.style.width = `${largura}px`;
  interacaoAtual.moldura.style.height = `${largura / interacaoAtual.proporcao}px`;
});

document.addEventListener("pointerup", () => {
  interacaoAtual = null;
});

document.addEventListener("pointercancel", () => {
  interacaoAtual = null;
});
