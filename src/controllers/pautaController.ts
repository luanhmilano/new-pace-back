import { Request, Response } from 'express';
import PautaService, { organizeAudienciasInPautas } from '../services/PautaService';

export const organizePautas = async (_req: Request, res: Response) => {
  try {
    await organizeAudienciasInPautas();
    res.status(200).send('Pautas organized successfully');
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

class PautaController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const pauta = await PautaService.create(req.body);
      return res.status(201).json(pauta);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const pautas = await PautaService.getAll();
      return res.status(200).json(pautas);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const pauta = await PautaService.getById(Number(req.params.id));
      if (pauta) {
        return res.status(200).json(pauta);
      } else {
        return res.status(404).json({ message: 'Pauta not found' });
      }
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getByIdWithAudiencias(req: Request, res: Response): Promise<Response> {
    try {
      const pauta = await PautaService.getByIdWithAudiencias(Number(req.params.id));
      if (pauta) {
        return res.status(200).json(pauta);
      } else {
        return res.status(404).json({ message: 'Pauta not found' });
      }
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const pauta = await PautaService.update(Number(req.params.id), req.body);
      return res.status(200).json(pauta);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const pauta = await PautaService.delete(Number(req.params.id));
      return res.status(200).json(pauta);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new PautaController();