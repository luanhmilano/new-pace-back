import { FiltroAudienciasPaceController } from './FiltroAudienciasPaceController';
import { FiltroAudienciasPaceUseCase } from './FiltroAudienciasPaceUseCase';

export const filtroAudienciasPaceUseCase = new FiltroAudienciasPaceUseCase();
export const filtroAudienciasPaceController =
  new FiltroAudienciasPaceController(filtroAudienciasPaceUseCase);
