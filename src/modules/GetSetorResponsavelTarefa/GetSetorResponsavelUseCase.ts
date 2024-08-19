/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryDTO } from '../../DTO/QueryDTO';
import { RequestSapiens } from '../../pythonRequest/requestSapiens';
import { RequestGetSetorResponsavelTarefa } from '../../sapiensOperations/request/RequestGetSetorResponsavelTarefa';
import { getUsuarioUseCase } from '../GetUsuario';
import { loginUseCase } from '../LoginUsuario';
export class GetSetorResponsavelTarefaUseCase {
  constructor(
    private RequestGetSetorResponsavelTarefa: RequestGetSetorResponsavelTarefa,
  ) {}
  async execute(data: QueryDTO): Promise<any> {
    const cookie: string = await loginUseCase.execute(data.login);

    const usuario = await getUsuarioUseCase.execute(cookie);
    const idSetorUnidadeOrigemUser = usuario[0].colaborador.lotacoes.find(
      (lotacao: { principal: boolean }) => lotacao.principal === true,
    )?.setor.unidade.id;

    const playload = await this.RequestGetSetorResponsavelTarefa.execute(
      data.query,
      idSetorUnidadeOrigemUser,
    );

    let response: any[] = await RequestSapiens(cookie, playload);

    response = response.map(({ id, nome }) => ({ id, nome }));

    return response;
  }
}
