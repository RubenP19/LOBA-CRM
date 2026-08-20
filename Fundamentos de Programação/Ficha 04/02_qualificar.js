// Qualificação de um lead (entre Quente, Morno, Frio

function qualificarLead(orc, interesse) {
    if (orc >= 10000 && interesse === 'alto')
        return 'Quente';
    if (orc >= 5000)
        return 'Morno';
        return 'Frio';
}

console.log(qualificarLead(10000, 'alto')); // Output: Morno