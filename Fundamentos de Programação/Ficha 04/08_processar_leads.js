//Criar dois arrays paralelos: orc e interesses com 5 leads. Percorrer com ciclo for; Em cada lead chamar funçao qualificar e mostrar prioridade; DIzer quantas leads ficaram quentes

let orc = [12000, 5000, 8000, 20000, 3000];
let interesses = ['alto', 'medio', 'alto', 'baixo', 'medio'];

for (let i = 0; i < orc.length; i++) {
    let qualificacao = qualificarLead(orc[i], interesses[i]);
    console.log(`Lead ${i + 1}: Orçamento = ${orc[i]}, Interesse = ${interesses[i]}, Qualificação = ${qualificacao}`);
}
