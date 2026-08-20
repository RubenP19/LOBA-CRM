//Escrever função qualificarLead(orc, interesse) que recebe um array de orçamentos e um array de interesses, e retorna um array de objetos com o orçamento e a qualificação do lead (quente, morno ou frio) com base no interesse para devolver "Quente", "Morno" ou "Frio"

function qualificarLead(orc, interesse) {
    if (orc >= 10000 && interesse === 'alto')
        return 'Quente';
    if (orc >= 5000)
        return 'Morno';
        return 'Frio';

}

console.log(qualificarLead(10000, 'alto')); // Output: Quente
console.log(qualificarLead(7000, 'medio')); // Output: Morno
console.log(qualificarLead(3000, 'baixo')); // Output: Frio