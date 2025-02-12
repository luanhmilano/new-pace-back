export interface IAudienciaPartial {
  data: string;
  processo: string;
  orgao_julgador: string;
  partes: string;
  classe: string;
  tipo_audiencia: string;
  advogados?: string | null;
  assunto?: string | null;
  sala: string;
  situacao: string;
}

export interface IAudienciaFull extends IAudienciaPartial {
  hora: string;
  data_geracao: Date;
  turno: string;
  changes: string;
}
