export class TarefaDTO {
  execute(
    postIt: string,
    dataHoraInicioPrazo: string,
    dataHoraFinalPrazo: string,
    pasta_id: number,
    especieTarefa_id: number,
    setorOrigem_id: number,
    setorResponsavel_id: number,
    usuarioResponsavel_id: number,
  ): string {
    const tarefa = `{
        "observacao": "",
        "postIt": "${postIt}",
        "urgente": false,
        "dataHoraInicioPrazo": "${dataHoraInicioPrazo}",
        "criadoEm": null,
        "apagadoEm": null,
        "atualizadoEm": null,
        "dataHoraFinalPrazo": "${dataHoraFinalPrazo}",
        "dataHoraConclusaoPrazo": null,
        "pasta_id": ${pasta_id},
        "especieTarefa_id": ${especieTarefa_id},
        "usuarioResponsavel_id": ${usuarioResponsavel_id},
        "setorResponsavel_id": ${setorResponsavel_id},
        "setorOrigem_id": ${setorOrigem_id},
        "documento_id": "",
        "acompanhar": false,
        "tramitar": "",
        "arquivar": "",
        "usuarioConclusaoPrazo_id": "",
        "criadoPor_id": "",
        "atualizadoPor_id": "",
        "acompanhada": false,
        "comunicacaoJudicial_id": "",
        "movimentoNacional_id": "",
        "modalidadeRepercussao_id": "",
        "replicar": false,
        "migrarEtiqueta": false,
        "redistribuida": false,
        "distribuicaoAutomatica": true,
        "idFormatado": ""
      }`;
    return tarefa;
  }
}
