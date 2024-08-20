export class RequestGetUsuarioResponsavelTarefa {
  async execute(query: string, setorResponsavel: string): Promise<string> {
    const getTarefa = `{
          "action": "SapiensMain_Usuario",
          "method": "getUsuario",
          "data": [
            {
              "sessao": false,
              "fetch": [],
              "filter": [
                {
                  "property": "colaborador.lotacoes.setor",
                  "value": "eq:${setorResponsavel}"
                }
              ],
              "query": "${query}",
              "page": 1,
              "start": 0,
              "limit": 25
            }
          ],
          "type": "rpc",
          "tid": 4
        }`;

    return getTarefa;
  }
}
