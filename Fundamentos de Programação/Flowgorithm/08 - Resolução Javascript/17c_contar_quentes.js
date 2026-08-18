//Resolução do exercício do slide 17 C

//Importar módulo prompt-sync para permitir a entrada de dados pelo utilizador
const prompt = require('prompt-sync')();

// Função que classifica um Lead em função do orçamento e interesse

// Retorna "Quente" se o orçamento for maior ou igual a 10000 e o interesse for "alto"

// Retorna "Morno" se o orçamento for maior ou igual a 5000

// Retorna "Frio" para os restantes casos

function qualificarlead(orc, interesse){
    if (orc >= 10000 && interesse === "alto")
        return "Quente";
    else if (orc >= 5000)
        return "Morno";
    else
        return "Frio";
}

// Pedir nº de leads a analisar

const numLeads = parseInt(prompt("Quantos leads pretende analisar?"));

//Arrays vazios para armazenar os dados introduzidos 

const orcamentos = [];
const interesses = [];

// Ciclo para pedir os dados de cada lead

for (let i = 0; i < numLeads; i++) {
    //Pedir orçamento do lead
    const orc = parseInt (prompot("Lead " + (i+1) + " - Orçamento:"));

    //Pedir interesse do lead
    const interesse = prompt("Lead " + (i+1) + " - Interesse (alto, medio, baixo):")

    // Adiciona os valores aos arrays
    orcamentos.push(orc);
    interesses.push(interesse);
}

// Contadora para armazenar o nº de leads classificados como Quente
let quentes = 0;

//Ciclo que processa cada lead
for (let i = 0; i < numLeads; i++) {
    const prioridade = qualficarlead(orcamentos[i], interesses [i]);

    // mostra o resultado da classificação para cada lead
    console.log("Lead " + (i+1) + ": " + prioridade);

    // Se o lead for classificado como Quente, incrementa a contadora
    if (prioridade === "Quente") {
        quentes = quentes + 1;}
}

// Mostra o nº de leads classificados como Quente
console.log("Número de leads classificados como Quente: " + quentes);