const prompt = require('prompt-sync')({sigint: true});
const funil = prompt("Qual a fase do seu lead? (Novo, Contactado, Proposta, Negociação, Ganho) ");

function proximaAcao(funil) { 
    const funil2 = funil.toLowerCase()
  if (funil2 === "novo") {
    return "Contactar";
  } else if (funil2 === "contactado") {
    return "Fazer proposta";
  } else if (funil2 === "proposta") {
    return "Negociar";
  } else if (funil2 === "negociação") {
    return "Fechar Caso";
  } else if (funil2 === "ganho") {
    return "Ciclo Fechado";
  } else {
    return "Fase inválida";
  }
}


console.log(proximaAcao(funil));