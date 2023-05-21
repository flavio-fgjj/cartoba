import { Transmissao } from "./Transmissao";

export class Partida {
  aproveitamento_visitante: Array<string> = [];
  aproveitamento_mandante: Array<string> = [];
  transmissao: Transmissao = new Transmissao();
  local: string = '';
  status_transmissao_tr: string = '';
  status_cronometro_tr: string = '';
  periodo_tr: string = '';
  partida_data: string = '';
  inicio_cronometro_tr: string = '';
  placar_oficial_visitante: number = 0;
  placar_oficial_mandante: number = 0;
  partida_id: number = 0;
  clube_visitante_posicao: number = 0;
  clube_visitante_id: number = 0;
  clube_casa_posicao: number = 0;
  clube_casa_id: number = 0;
  timestamp: number = 0;
  campeonato_id: number = 0;
  valida: boolean = false;
}