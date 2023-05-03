import { GatoMestre } from "./GatoMestre";
import { Scout } from "./Scout";

export class Atleta {
    scout: Scout = new Scout();
    atleta_id: number = 0;
    rodada_id: number = 0;
    clube_id: number = 0;
    posicao_id: number = 0;
    status_id: number = 0;
    pontos_num: number = 0;
    preco_num: number = 0;
    variacao_num: number = 0;
    media_num: number = 0;
    jogos_num: number = 0;
    minimo_para_valorizar: number = 0;
    gato_mestre: GatoMestre = new GatoMestre();
    slug: string = '';
    apelido: string = '';
    apelido_abreviado: string = '';
    nome: string = '';
    foto: string = '';
}