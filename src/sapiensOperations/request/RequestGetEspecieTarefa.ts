export class RequestGetEspecieTarefa {
  async execute(query: string): Promise<string> {
    const getEspecieTarefa = `{
            "action": "SapiensAdministrativo_EspecieTarefa",
            "method": "getEspecieTarefa",
            "data": [
              {
                "fetch": [
                  "generoTarefa"
                ],
                "query": "${query}",
                "page": "1",
                "start": 150,
                "limit": 25
              }
            ],
            "type": "rpc",
            "tid": 71
          }`;

    return getEspecieTarefa;
  }
}
