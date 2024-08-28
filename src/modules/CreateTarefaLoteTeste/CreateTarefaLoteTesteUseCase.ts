/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-async-promise-executor */
import { loginUseCase } from '../LoginUsuario';
import { CreateTarefaLoteTesteDTO } from '../../DTO/CreateTarefaLoteTesteDTO';
import { getPastaProcessoJudicialUseCase } from '../GetPastaProcessoJudicial';
import { TarefaDTO } from '../../DTO/TarefaDTO';
import { RequestCreateTarefaLote } from '../../sapiensOperations/request/RequestCreateTarefaLote';
import { RequestSapiens } from '../../pythonRequest/requestSapiens';
import { getProcessoJudicialUseCase } from '../GetProcessoJudicial';
import { ResponseProcessoJudicial } from '../../sapiensOperations/response/ResponseProcessoJudicial';
import { getDataAtual } from './helps/getDataAtual';

export class CreateTarefaLoteTesteUseCase {
  async execute(data: CreateTarefaLoteTesteDTO): Promise<object> {
    console.log(data);
    try {
      const cookie = await loginUseCase.execute(data.login);

      const processosNaoEncontrados: Array<any> = [];
      const tarefas: string[] = [];

      const processosPorPauta: { [key: number]: Array<any> } = {};
      data.listaProcessosJudiciais.forEach((processoJudicial) => {
        if (!processosPorPauta[processoJudicial.pautaId]) {
          processosPorPauta[processoJudicial.pautaId] = [];
        }
        processosPorPauta[processoJudicial.pautaId].push(processoJudicial);
      });

      const usuariosResponsaveis = data.usuarioResponsavel;

      const pautas = Object.keys(processosPorPauta);
      for (let i = 0; i < pautas.length; i++) {
        const pautaId = Number(pautas[i]);
        const processos = processosPorPauta[pautaId];
        const usuarioIndex = i % usuariosResponsaveis.length;
        const usuario = usuariosResponsaveis[usuarioIndex];

        await Promise.all(
          processos.map(async (processoJudicial) => {
            const processo: ResponseProcessoJudicial[] =
              await getProcessoJudicialUseCase.execute(
                cookie,
                processoJudicial.numeroProcesso,
              );

            const id_processo = processo[0]?.id?.toString();

            if (!id_processo) {
              processosNaoEncontrados.push(processoJudicial);
              return;
            }

            const infoProcesso = await getPastaProcessoJudicialUseCase.execute(
              id_processo,
              cookie,
            );

            if (infoProcesso.length > 0) {
              const pasta_id = infoProcesso[0].id.toString();
              const tarefa: TarefaDTO = new TarefaDTO();
              const objTarefa = tarefa.execute(
                data.etiqueta!,
                getDataAtual(),
                '26-08-2024',
                Number(pasta_id),
                data.especieTarefa,
                Number('41430'), // idSetorOrigemUser
                data.setorResponsavel,
                usuario,
              );
              tarefas.push(objTarefa);
            } else {
              processosNaoEncontrados.push(processoJudicial);
            }
          }),
        );
      }

      const listaTarefas = tarefas.join(',');
      const requestCreateTarefaLote = new RequestCreateTarefaLote();
      const payload = await requestCreateTarefaLote.execute(listaTarefas);

      const responseSapiens = await RequestSapiens(cookie, payload);

      if (!responseSapiens) {
        throw new Error('erro de conexão com o sapiens');
      }

      if (processosNaoEncontrados.length > 0) {
        return {
          message: 'Processos nao existentes no sapiens',
          processosNaoEncontrados,
        };
      }

      return responseSapiens; // Retorna a resposta final da operação
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
