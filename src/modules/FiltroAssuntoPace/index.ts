import { FiltroAssuntoPaceController } from './FiltroAssuntoPaceController';
import { FiltroAssuntoPaceUseCase } from './FiltroAssuntoPaceUseCase';

export const filtroAssuntoPaceUseCase = new FiltroAssuntoPaceUseCase();
export const filtroAssuntoPaceController = new FiltroAssuntoPaceController(
  filtroAssuntoPaceUseCase,
);
