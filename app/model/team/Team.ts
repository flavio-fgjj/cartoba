import { Atleta } from "./Atleta";
import { Ranking } from "./Ranking";
import { Time } from "./Time";

export class Team {
    atletas: Array<Atleta> = new Array();
    time: Time = new Time();
    pontos_campeonato: Number = 0;
    capitao_id: Number = 0;
    pontos: Number = 0;
    esquema_id: Number = 0;
    rodada_atual: Number = 0;
    patrimonio: Number = 0;
    valor_time: Number = 0;
    total_ligas: Number = 0;
    total_ligas_matamata: Number = 0;
    variacao_patrimonio: Number = 0;
    variacao_pontos: Number = 0;
    servicos: Array<any> = new Array();
    ranking: Ranking = new Ranking();
}