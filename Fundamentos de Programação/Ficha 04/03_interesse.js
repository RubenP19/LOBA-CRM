//Colocar pontuação de interesse. Se >= 70 é alto, se >= 40 é médio, se <40 é baixo
function pontuacaoInteresse(pontuacao) {
    if (pontuacao >= 70)
        return 'Alto';
    if (pontuacao >= 40)
        return 'Médio'; 
    return 'Baixo';
}

console.log(pontuacaoInteresse(50));
