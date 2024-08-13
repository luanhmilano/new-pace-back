export class RequestSapiensJudicial {
  async execute(numeroProcessoJudicial: string): Promise<string> {
    const getProcesso = `{
            "action":"SapiensJudicial_ProcessoJudicial",
            "method":"getProcessoJudicial",
            "data":[
               {
                  "fetch":[],
                  "limit":10,
                  "query":" ${numeroProcessoJudicial} ",
                  "page":1,
                  "start":0
               }
            ],
            "type":"rpc",
            "tid":4
         }`;

    return getProcesso;
  }
}
