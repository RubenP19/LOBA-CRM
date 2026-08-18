// Resolução Funcão qualifcarlead

function qualificarlead(orc, interesse){
    if (orc >= 10000 && interesse === "alto")
        return "Quente";
    else if (orc >= 5000 && interesse === "medio")
        return "Morno";
    else
        return "Frio";
}
//else pode ser descartado e deixar o resto na mesma linha, mas é uma questão de estilo de código.

// function qualificarlead(orc, interesse){
//     if (orc >= 10000 && interesse === "alto")  return "Quente";
//     if (orc >= 5000 && interesse === "medio")  return "Morno";
//     return "Frio";} 

// function qualificarlead(orc: any, interesse: any): "Quente" | "Morno" | "Frio"

console.log(qualificarlead(12000,"alto"));