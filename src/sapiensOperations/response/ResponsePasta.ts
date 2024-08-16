/* eslint-disable @typescript-eslint/no-explicit-any */
interface DateObject {
  date: string;
}

interface ProcessoJudicial {
  id: number;
  numero: string;
  fonteDados: string;
  dataHoraAjuizamento: DateObject;
  competencia: number;
  codigoLocalidade: string;
  nivelSigilo: number;
  intervencaoMP: boolean;
  AJG: boolean;
  eletronico: boolean;
  tamanhoProcesso: number;
  valorCausa: number;
  criadoEm: DateObject;
  atualizadoEm: DateObject;
}

interface Classificacao {
  id: number;
  nome: string;
  ativo: boolean;
  prazoGuardaFaseCorrenteAno: number;
  prazoGuardaFaseIntermediariaAno: number;
  codigo: string;
  permissaoUso: boolean;
  lft: number;
  lvl: number;
  rgt: number;
  root: number;
  criadoEm: DateObject;
  atualizadoEm: DateObject;
}

interface EspeciePasta {
  id: number;
  ativo: boolean;
  nome: string;
  descricao: string;
  criadoEm: DateObject;
  atualizadoEm: DateObject;
}

interface Modalidade {
  id: number;
  valor: string;
  descricao: string;
  ativo: boolean;
  criadoEm: DateObject;
  atualizadoEm: DateObject;
}

interface Procedencia {
  id: number;
  uuid: string;
  pessoaRepresentada: boolean;
  pessoaInteressada: boolean;
  pessoaConveniada: boolean;
  pessoaValidada: boolean;
  nome: string;
  numeroDocumentoPrincipal: string;
  criadoEm: DateObject;
  atualizadoEm: DateObject;
}

interface PessoaRepresentada {
  id: number;
  uuid: string;
  pessoaRepresentada: boolean;
  pessoaInteressada: boolean;
  pessoaConveniada: boolean;
  pessoaValidada: boolean;
  nome: string;
  numeroDocumentoPrincipal: string;
  criadoEm: DateObject;
  atualizadoEm: DateObject;
}

interface Unidade {
  id: number;
  nome: string;
  endereco: string;
  sigla: string;
  prefixoNUP: string;
  sequenciaInicialNUP: number;
  ativo: boolean;
  gerenciamento: boolean;
  apenasProtocolo: boolean;
  numeracaoDocumentoUnidade: boolean;
  apenasDistribuidor: boolean;
  lft: number;
  lvl: number;
  rgt: number;
  root: number;
  distribuicaoCentena: boolean;
  prazoEqualizacao: number;
  divergenciaMaxima: number;
  apenasDistribuicaoAutomatica: boolean;
  comPrevencaoRelativa: boolean;
  criadoEm: DateObject;
  atualizadoEm: DateObject;
}

interface Setor {
  id: number;
  nome: string;
  sigla: string;
  prefixoNUP: string;
  sequenciaInicialNUP: number;
  ativo: boolean;
  gerenciamento: boolean;
  apenasProtocolo: boolean;
  numeracaoDocumentoUnidade: boolean;
  apenasDistribuidor: boolean;
  lft: number;
  lvl: number;
  rgt: number;
  root: number;
  distribuicaoCentena: boolean;
  prazoEqualizacao: number;
  divergenciaMaxima: number;
  apenasDistribuicaoAutomatica: boolean;
  comPrevencaoRelativa: boolean;
  criadoEm: DateObject;
  atualizadoEm: DateObject;
  unidade: Unidade;
  unidade_id: number;
}

interface PastaResponse {
  id: number;
  uuid: string;
  documentoAvulso: boolean;
  unidadeArquivistica: number;
  tipoProtocolo: number;
  valorEconomico: number;
  novo: boolean;
  protocoloEletronico: boolean;
  semValorEconomico: boolean;
  emTramitacao: number;
  NUP: string;
  visibilidadeRestrita: boolean;
  visibilidadeExterna: boolean;
  visibilidadeDisciplinar: boolean;
  encerrado: boolean;
  dataHoraAbertura: DateObject;
  dataHoraTransicao: DateObject;
  titulo: string;
  chaveAcesso: string;
  criadoEm: DateObject;
  atualizadoEm: DateObject;
  processoJudicial: ProcessoJudicial;
  classificacao: Classificacao;
  especiePasta: EspeciePasta;
  modalidadeFase: Modalidade;
  modalidadeMeio: Modalidade;
  procedencia: Procedencia;
  pessoaRepresentada: PessoaRepresentada;
  setor: Setor;
  acompanhamentos: any[];
  acompanhada: boolean;
  processoJudicial_id: number;
  classificacao_id: number;
  especiePasta_id: number;
  modalidadeFase_id: number;
  modalidadeMeio_id: number;
  procedencia_id: number;
  pessoaRepresentada_id: number;
  setor_id: number;
}

export type PastaResponseArray = PastaResponse[];
