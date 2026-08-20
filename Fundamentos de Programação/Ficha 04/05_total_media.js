//Calcular o total e a média de um array de orçamentos;

const orc = [12000, 5000, 8000, 20000, 3000];

//Inicializar a variável total com 0
let total = 0;

//Percorrer o array de orçamentos e acumular o valor de cada orçamento no total
for (let i = 0; i < orc.length; i++) {
    total += orc[i];
}

//Calcular a média dividindo o total pelo número de elementos no array
const media = total / orc.length;

//Exibir o total e a média no console
console.log("Total dos orçamentos: " + total);
console.log("Média dos orçamentos: " + media);  