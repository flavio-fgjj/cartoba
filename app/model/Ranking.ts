class Aux {
    ranking_id: number = 0;
    mes: number = 0;
    posicao: number = 0;
}

export class Ranking {
    atual: Aux = new Aux();
    anterior: Aux = new Aux();
    melhor_ranking_id: number = 0;
}