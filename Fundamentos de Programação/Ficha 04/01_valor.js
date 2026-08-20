//Calcular valor de uma oportunidade recorrendo às variáveis: preço, desconto e unidades (com variavel)
// set (preco, desconto, unidades) {
//     let valor = preco * unidades;
//     let valorComDesconto = valor - (valor * desconto / 100);
//     return valorComDesconto; }

//     console.log("O valor da oportunidade é: " + valorComDesconto);
// 

function calcularValor(preco, desconto, unidades) {
    let valor = preco * unidades;
    let valorComDesconto = valor - (valor * desconto / 100);
    return valorComDesconto;
}

console.log("O valor da oportunidade é: " + calcularValor(100, 10, 5));