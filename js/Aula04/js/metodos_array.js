// 📦 MÉTODOS DE ARRAY MAIS USADOS EM JAVASCRIPT

// =========================
// 🔍 BUSCA E VERIFICAÇÃO
// =========================

const users = [
  { email: "a@gmail.com", senha: "123" },
  { email: "b@gmail.com", senha: "456" }
];

// find → retorna o primeiro que encontrar
const user = users.find(u => u.email === "a@gmail.com");
console.log("find:", user);

// findIndex → retorna o índice
const index = users.findIndex(u => u.email === "a@gmail.com");
console.log("findIndex:", index);

// some → verifica se existe
const existe = users.some(u => u.email === "a@gmail.com");
console.log("some:", existe);

// every → verifica se todos atendem condição
const todos = users.every(u => u.senha.length >= 3);
console.log("every:", todos);


// =========================
// ➕ ADICIONAR E REMOVER
// =========================

let lista = [1, 2, 3];

lista.push(4); // adiciona no final
console.log("push:", lista);

lista.pop(); // remove último
console.log("pop:", lista);

lista.shift(); // remove primeiro
console.log("shift:", lista);

lista.unshift(0); // adiciona início
console.log("unshift:", lista);

lista.splice(1, 1); // remove posição
console.log("splice:", lista);


// =========================
// 🔄 TRANSFORMAÇÃO
// =========================

// map → transforma
const emails = users.map(u => u.email);
console.log("map:", emails);

// filter → filtra
const gmail = users.filter(u => u.email.includes("gmail"));
console.log("filter:", gmail);

// reduce → reduz a um valor
const soma = [1, 2, 3].reduce((acc, n) => acc + n, 0);
console.log("reduce:", soma);


// =========================
// 🔤 UTILIDADES
// =========================

const numeros = [1, 2, 3];

console.log("includes:", numeros.includes(2));
console.log("indexOf:", numeros.indexOf(2));
console.log("join:", numeros.join(", "));
console.log("length:", numeros.length);


// =========================
// 🔃 ORDENAÇÃO
// =========================

const arr = [3, 1, 2];

arr.sort();
console.log("sort:", arr);

arr.reverse();
console.log("reverse:", arr);

console.log("slice:", arr.slice(0, 2));
