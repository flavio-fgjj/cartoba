import { Atleta } from "../Atleta";
import { Ranking } from "../Ranking";
import { Time } from "../Time";

export class Team {
    atletas: Array<Atleta> = new Array();
    reservas: Array<Atleta> = new Array();
    time: Time = new Time();
    pontos_campeonato: number = 0;
    capitao_id: number = 0;
    pontos: number = 0;
    esquema_id: number = 0;
    rodada_atual: number = 0;
    patrimonio: number = 0;
    valor_time: number = 0;
    total_ligas: number = 0;
    total_ligas_matamata: number = 0;
    variacao_patrimonio: number = 0;
    variacao_pontos: number = 0;
    servicos: Array<any> = new Array();
    ranking: Ranking = new Ranking();
}