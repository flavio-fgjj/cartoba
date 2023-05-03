import { Fechamento } from "./Fechamento";
import { LimitesFechamento } from "./LimitesCompeticao";

export class Market {
    rodada_atual: number = 0;
    status_mercado: number = 0;
    esquema_default_id: number = 0;
    cartoleta_inicial: number = 0;
    max_ligas_free: number = 0;
    max_ligas_pro: number = 0;
    max_ligas_matamata_free: number = 0;
    max_criar_ligas_matamata_free: number = 0;
    max_ligas_matamata_pro: number = 0;
    max_ligas_patrocinadas_free: number = 0;
    max_ligas_patrocinadas_pro_num: number = 0;
    game_over: Boolean = false;
    temporada: number = 0;
    reativar: Boolean = true;
    exibe_sorteio_pro: Boolean = false;
    fechamento: Fechamento = new Fechamento();
    limites_competicao: LimitesFechamento = new LimitesFechamento();
    times_escalados: number = 0;
    mercado_pos_rodada: Boolean = false;
    novo_mes_ranking: Boolean = false;
    degustacao_gatomestre: Boolean = false;
    nome_rodada: string = "";
}