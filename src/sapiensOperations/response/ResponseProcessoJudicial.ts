export type ResponseProcessoJudicial = {
  id: number;
  numero: string;
  fonteDados: string;
  dataHoraAjuizamento: {
    date: string;
  };
  competencia: number;
  codigoLocalidade: string;
  nivelSigilo: number;
  intervencaoMP: boolean;
  AJG: boolean;
  eletronico: boolean;
  tamanhoProcesso: number;
  valorCausa: number;
  criadoEm: {
    date: string;
  };
  atualizadoEm: {
    date: string;
  };
};
