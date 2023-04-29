class Aux {
    ranking_id: Number = 0;
    mes: Number = 0;
    posicao: Number = 0;
}

export class Ranking {
    atual: Aux = new Aux();
    anterior: Aux = new Aux();
    melhor_ranking_id: Number = 0;
}