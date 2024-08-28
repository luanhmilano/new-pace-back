/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryDTO } from '../../DTO/QueryDTO';
import { RequestSapiens } from '../../pythonRequest/requestSapiens';
import { RequestGetEspecieTarefa } from '../../sapiensOperations/request/RequestGetEspecieTarefa';
import { loginUseCase } from '../LoginUsuario';

export class GetEspecieTarefaUseCase {
  constructor(private RequestGetEspecieTarefa: RequestGetEspecieTarefa) {}
  async execute(data: QueryDTO): Promise<any> {
    const cookie: string = await loginUseCase.execute(data.login);

    const payload = await this.RequestGetEspecieTarefa.execute(data.query);

    let response: any[] = await RequestSapiens(cookie, payload);

    response = response.map(({ id, nome }) => ({ id, nome }));

    console.log(response);

    return response;
  }
}
