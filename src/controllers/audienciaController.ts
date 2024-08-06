import { Request, Response } from 'express';
import { AudienciaService } from '../services/AudienciaService';
import { generateExcel } from '../utils/excelGenerator';

const audienciaService = new AudienciaService();

export const createAudiencia = async (req: Request, res: Response) => {
  try {
    const newAudiencia = await audienciaService.createAudiencia(req.body);
    res.status(201).json(newAudiencia);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAudiencias = async (req: Request, res: Response) => {
  try {
    const audiencias = await audienciaService.getAllAudiencias();
    res.status(200).json(audiencias);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAudienciaById = async (req: Request, res: Response) => {
  try {
    const audiencia = await audienciaService.getAudienciaById(parseInt(req.params.id, 10));
    if (audiencia) {
      res.status(200).json(audiencia);
    } else {
      res.status(404).json({ error: 'Audiencia not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAudiencia = async (req: Request, res: Response) => {
  try {
    const updatedAudiencia = await audienciaService.updateAudiencia(parseInt(req.params.id, 10), req.body);
    res.status(200).json(updatedAudiencia);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAudiencia = async (req: Request, res: Response) => {
  try {
    const deletedAudiencia = await audienciaService.deleteAudiencia(parseInt(req.params.id, 10));
    res.status(200).json(deletedAudiencia);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const exportAudiencias = async (_req: Request, res: Response) => {
  try {
    const audiencias = await audienciaService.getAllAudiencias();
    const excelBuffer = generateExcel(audiencias);

    res.setHeader('Content-Disposition', 'attachment; filename=audiencias.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(excelBuffer);

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export const getAudienciasByFilters = async (req: Request, res: Response): Promise<Response> => {
  try {
    const filters = {
      startDate: req.query.startDate as string,
      endDate: req.query.endDate as string,
      turno: req.query.turno as string,
      orgao_julgador: req.query.orgao_julgador as string,
      sala: req.query.sala as string,
    };
    
    const audiencias = await audienciaService.getByFilters(filters);
    return res.status(200).json(audiencias);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
