import { ILoginDTO } from './LoginDTO';

export interface GetUsuarioResponsavelTarefaDTO {
  login: ILoginDTO;
  query: string;
  setorResponsavel: string;
}
