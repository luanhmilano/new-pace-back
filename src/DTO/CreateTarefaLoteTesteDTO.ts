import { ILoginDTO } from './LoginDTO';
import { IProcessoJudicialTeste } from './ProcessoJudicialTesteDTO';

export interface CreateTarefaLoteTesteDTO {
  login: ILoginDTO;
  etiqueta?: string;
  especieTarefa: number;
  setorResponsavel: number;
  usuarioResponsavel: number[];
  listaProcessosJudiciais: IProcessoJudicialTeste[];
}
