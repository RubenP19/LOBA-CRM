//Escrever uma função maior para receber o maior valor entre um array de orçamentos

const orc = [12000, 5000, 8000, 20000, 3000];

function maior(orc) {
    let maiorValor = orc[0]; // Inicializa com o primeiro valor do array

    for (let i = 1; i < orc.length; i++) {
        if (orc[i] > maiorValor) {
            maiorValor = orc[i]; // Atualiza o maior valor se encontrar um maior
        }
    }

    return maiorValor; // Retorna o maior valor encontrado
}

console.log("O maior orçamento é: " + maior(orc)); // Chama a função e exibe o resultado