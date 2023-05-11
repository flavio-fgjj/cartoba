import { Atleta } from "../Atleta";
import { Time } from "../Time";
import { Ranking } from "../Ranking";

export class MyTeamPartial {
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
	ranking: Ranking = new Ranking();
  pontuacao: number = 0;
}