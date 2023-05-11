import { Pontos } from "./Pontos";
import { RankingTime } from "./RankingTime";
import { Variacao } from "./Variacao";

export class TimeParcial {
	assinante: boolean = false;
  facebook_id: number = 0;
  foto_perfil: string = "";
	lgpd_quarentena: boolean = false;
	lgpd_removido: boolean = false;
  nome: string = "";
  nome_cartola: string = "";
  patrimonio: number = 0;
	pontos: Pontos = new Pontos();
	ranking: RankingTime = new RankingTime();
	slug: string = "";
	time_id: number = 0;
	url_escudo_png: string = "";
	url_escudo_svg: string = "";
  variacao: Variacao = new Variacao();
  pontuacao: number = 0;
}