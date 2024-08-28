export class RequestCreateTarefaLote {
  async execute(listaTarefas: string): Promise<string> {
    const createTarefaLote = `{
          "action": "SapiensAdministrativo_Tarefa",
          "method": "createTarefa",
          "data": [
            [
              ${listaTarefas}
            ]
          ],
          "type": "rpc",
          "tid": 87
        }`;

    return createTarefaLote;
  }
}
