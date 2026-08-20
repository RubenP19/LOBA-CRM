//instalar prompt-sync
const prompt = require('prompt-sync')({sigint: true});

// const nome = prompt("Qual o nome da empresa?");
// const contactos = prompt("Qual o contacto da empresa?");
// const orcamento = parseInt(prompt ("Qual o orçamento da empresa?"))

// // Definir função de registo

// function lead (nome, contactos, orçamento)
// {
//     if (nome === "" || contactos === "" || orcamento === "" || orcamento <= 0 || isNaN(orcamento))
//     return "Falta de dados obrigatórios";
//     else
//         return "Lead registado"
// }

// console.log(lead(nome, contactos, orcamento))

//Opção acima não permite colocar onde está o erro

let nome = prompt("Qual o nome da empresa?");
let contactos = prompt("Qual o contacto da empresa?");
let orcamento = parseInt(prompt("Qual o orçamento da empresa?"));

function lead(nome, contactos, orcamento) {
    const dadosInvalidos = [];

    if (nome === "") {
        dadosInvalidos.push("o nome está em falta");
    }

    if (contactos === "") {
        dadosInvalidos.push("o contacto está em falta");
    }

    if (isNaN(orcamento) || orcamento <= 0) {
        dadosInvalidos.push("o orçamento é inválido");
    }

    if (dadosInvalidos.length > 0) {
        return "Falta de dados obrigatórios: " + dadosInvalidos.join(", ") + ".";
    }

    return "Lead registado";
}

console.log(lead(nome, contactos, orcamento));