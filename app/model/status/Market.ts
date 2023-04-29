import { Fechamento } from "./Fechamento";
import { LimitesFechamento } from "./LimitesCompeticao";

export class Market {
    rodada_atual: Number = 0;
    status_mercado: Number = 0;
    esquema_default_id: Number = 0;
    cartoleta_inicial: Number = 0;
    max_ligas_free: Number = 0;
    max_ligas_pro: Number = 0;
    max_ligas_matamata_free: Number = 0;
    max_criar_ligas_matamata_free: Number = 0;
    max_ligas_matamata_pro: Number = 0;
    max_ligas_patrocinadas_free: Number = 0;
    max_ligas_patrocinadas_pro_num: Number = 0;
    game_over: Boolean = false;
    temporada: Number = 0;
    reativar: Boolean = true;
    exibe_sorteio_pro: Boolean = false;
    fechamento: Fechamento = new Fechamento();
    limites_competicao: LimitesFechamento = new LimitesFechamento();
    times_escalados: Number = 0;
    mercado_pos_rodada: Boolean = false;
    novo_mes_ranking: Boolean = false;
    degustacao_gatomestre: Boolean = false;
    nome_rodada: String = "";
}