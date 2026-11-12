/*
document.getElementById() – use quando for por id (rápido e simples)
---------------------------------------------------------------------------
•	Seleciona um único elemento pelo id
•	Retorna um elemento ou null
•	Muito rápido 
•	Só aceita id 

document.getElementsByTagName() – evite se não precisar de lista dinâmica
---------------------------------------------------------------------------
•	Seleciona elementos pelo nome da tag
•	Retorna HTMLCollection (lista "viva") - sempre atualizado automaticamente
•	É uma coleção dinâmica (live) → atualiza automaticamente se o DOM mudar 
•	Não é um array real

document.querySelector() – use quando quiser flexibilidade
---------------------------------------------------------------------------
•	Seleciona o primeiro elemento que corresponde a um seletor CSS
•	Retorna um elemento ou null
•	Muito flexível (usa CSS selectors) 
•	Pega só o primeiro que encontrar

document.querySelectorAll() – use usequando quiser vários com CSS
---------------------------------------------------------------------------
•	Seleciona todos os elementos que correspondem a um seletor CSS
•	Retorna NodeList (não é live) - A lista não se atualiza automaticamente quando o DOM muda
•	Não atualiza automaticamente (lista estática) 
•	Aceita seletores CSS completos

NodeList (querySelectorAll)
---------------------------
→ "Foto do momento"
→ Não muda depois

HTMLCollection (getElements...)
-------------------------------
→ "Espelho do DOM"
→ Sempre atualizado automaticamente


*/