import { Audiencia } from '@prisma/client';

export const logChanges = (existing: Audiencia, updated: Partial<Audiencia>): string[] => {
  const changes = [];
  if (existing.data !== updated.data) changes.push(`Data: ${existing.data} -> ${updated.data}`);
  if (existing.hora !== updated.hora) changes.push(`Hora: ${existing.hora} -> ${updated.hora}`);
  if (existing.orgao_julgador !== updated.orgao_julgador) changes.push(`Órgão Julgador: ${existing.orgao_julgador} -> ${updated.orgao_julgador}`);
  if (existing.partes !== updated.partes) changes.push(`Partes: ${existing.partes} -> ${updated.partes}`);
  if (existing.classe !== updated.classe) changes.push(`Classe: ${existing.classe} -> ${updated.classe}`);
  if (existing.tipo_audiencia !== updated.tipo_audiencia) changes.push(`Tipo de audiência: ${existing.tipo_audiencia} -> ${updated.tipo_audiencia}`);
  if (existing.sala !== updated.sala) changes.push(`Sala: ${existing.sala} -> ${updated.sala}`);
  if (existing.situacao !== updated.situacao) changes.push(`Situação: ${existing.situacao} -> ${updated.situacao}`);
  if (existing.turno !== updated.turno) changes.push(`Turno: ${existing.turno} -> ${updated.turno}`);

  return changes;
};
