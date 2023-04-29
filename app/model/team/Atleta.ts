import { GatoMestre } from "./GatoMestre";
import { Scout } from "./Scout";

export class Atleta {
    scout: Scout = new Scout();
    atleta_id: Number = 0;
    rodada_id: Number = 0;
    clube_id: Number = 0;
    posicao_id: Number = 0;
    status_id: Number = 0;
    pontos_num: Number = 0;
    preco_num: Number = 0;
    variacao_num: Number = 0;
    media_num: Number = 0;
    jogos_num: Number = 0;
    minimo_para_valorizar: Number = 0;
    gato_mestre: GatoMestre = new GatoMestre();
    slug: String = '';
    apelido: String = '';
    apelido_abreviado: String = '';
    nome: String = '';
    foto: String = '';
}