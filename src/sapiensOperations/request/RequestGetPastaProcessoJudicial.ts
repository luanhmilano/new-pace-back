export class RequestGetPastaProcessoJudicial {
  async execute(value: string): Promise<string> {
    const getTarefa = `{
            "action":"SapiensAdministrativo_Pasta",
            "method":"getPasta",
            "data":[
               {
                  "fetch":[
                    "processoJudicial",
                    "classificacao",
                    "especiePasta",
                    "modalidadeFase",
                    "modalidadeMeio",
                    "procedencia",
                    "pessoaRepresentada",
                    "setor",
                    "setor.unidade"
                  ],
                  "filter": [
                    {
                        "property": "processoJudicial.id",
                        "value": "eq:${value}"
                    }
                  ],
                  "limit":25,
                  "page":1,
                  "start":0
               }
            ],
            "type":"rpc",
            "tid":5
         }`;

    return getTarefa;
  }
}

/**
 * {
    "action": "SapiensAdministrativo_Pasta",
    "method": "getPasta",
    "data": [
        {
            "fetch": [
                "processoJudicial",
                "classificacao",
                "especiePasta",
                "modalidadeFase",
                "modalidadeMeio",
                "procedencia",
                "pessoaRepresentada",
                "setor",
                "setor.unidade"
            ],
            "filter": [
                {
                    "property": "processoJudicial.id",
                    "value": "eq:32361494"
                }
            ],
            "page": 1,
            "start": 0,
            "limit": 25
        }
    ],
    "type": "rpc",
    "tid": 5
}
 */
