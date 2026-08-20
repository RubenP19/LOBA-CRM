const funil = prompt("Qual a fase do seu lead? (Novo, Contactado, Proposta, Negociação, Ganho) ");

f


function proximaAcao(funil) {
  if (funil === "Novo") {
    return "Contactar";
  } else if (funil === "Contactado") {
    return "Fazer proposta";
  } else if (funil === "Proposta") {
    return "Negociar";
  } else if (funil === "Negociação") {
    return "Fechar Caso";
  } else if (funil === "Ganho") {
    return "Ciclo Fechado";
  } else {
    return "Fase inválida";
  }
}


console.log(proximaAcao(funil));