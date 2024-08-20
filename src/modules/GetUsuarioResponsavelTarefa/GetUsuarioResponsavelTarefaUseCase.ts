/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetUsuarioResponsavelTarefaDTO } from '../../DTO/GetUsuarioResponsavelTarefaDTO';
import { RequestSapiens } from '../../pythonRequest/requestSapiens';
import { RequestGetUsuarioResponsavelTarefa } from '../../sapiensOperations/request/RequestGetUsuarioResponsavelTarefa';
import { loginUseCase } from '../LoginUsuario';

export class GetUsuarioResponsavelTarefaUseCase {
  constructor(
    private requestGetUsuarioResponsavel: RequestGetUsuarioResponsavelTarefa,
  ) {}
  async execute(data: GetUsuarioResponsavelTarefaDTO): Promise<any> {
    const getUsuarioResponsavel =
      await this.requestGetUsuarioResponsavel.execute(
        data.query,
        data.setorResponsavel,
      );

    const cookie: string = await loginUseCase.execute(data.login);

    const usuarioResponsavel = await RequestSapiens(
      cookie,
      getUsuarioResponsavel,
    );

    const response = usuarioResponsavel[0];

    return response;
  }
}
