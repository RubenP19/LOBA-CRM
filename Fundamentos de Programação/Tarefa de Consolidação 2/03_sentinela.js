const prompt = require('prompt-sync')({sigint: true});

//Pedir orçamento das leads (à vez) até escrever "Fim". Nesse momento calcular total e média

let orc = [];

while (true) {

    let entrada = prompt("Orçamento " + (orc.length + 1) + " (ou 'Fim'): ");

    if (entrada.toLowerCase() === "fim") {
        break;
    }

    if (isNaN(valor)) {
        console.log("Erro: introduza apenas um número ou 'Fim'.");
        continue;}
// Converter para número
    let valor = Number(entrada);
    

let total = 0;

for (let i = 0; i < orc.length; i++) {
    total = total + orc[i];
}

let media = total / orc.length;

console.log("Total dos orçamentos: " + total);
console.log("Média dos orçamentos: " + media);