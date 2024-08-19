export class RequestGetSetorResponsavelTarefa {
  async execute(query: string, idSetorOrigemUser: string): Promise<string> {
    const getEspecieTarefa = `{
          "action": "SapiensMain_Setor",
          "method": "getSetor",
          "data": [
            {
              "filter": [
                {
                  "property": "unidade.id",
                  "value": "eq:${idSetorOrigemUser}"
                },
                {
                  "property": "parent",
                  "value": "isNotNull"
                }
              ],
              "fetch": [
                "unidade"
              ],
              "query": "${query}",
              "page": "1",
              "start": 0,
              "limit": 25
            }
          ],
          "type": "rpc",
          "tid": 76
        }`;

    return getEspecieTarefa;
  }
}
