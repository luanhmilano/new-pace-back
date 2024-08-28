import { ILoginDTO } from './LoginDTO';
import { IProcessoJudicial } from './ProcessoJudicialDTO';

export interface CreateTarefaLoteDTO {
  login: ILoginDTO;
  etiqueta?: string;
  especieTarefa: number;
  setorResponsavel: number;
  usuarioResponsavel: number;
  listaProcessosJudiciais: IProcessoJudicial[];
}
