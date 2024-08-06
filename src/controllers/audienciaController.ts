import { Request, Response } from 'express';
import { generateExcel } from '../utils/excelGenerator';
import AudienciaService from '../services/AudienciaService';


class AudienciaController {
  async createAudiencia(req: Request, res: Response): Promise<Response> {
    try {
      const newAudiencia = await AudienciaService.createAudiencia(req.body);
      return res.status(201).json(newAudiencia);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getAudiencias(req: Request, res: Response): Promise<Response> {
    try {
      const audiencias = await AudienciaService.getAllAudiencias();
      return res.status(200).json(audiencias);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getAudienciaById(req: Request, res: Response): Promise<Response> {
    try {
      const audiencia = await AudienciaService.getAudienciaById(parseInt(req.params.id, 10));
      if (audiencia) {
        return res.status(200).json(audiencia);
      } else {
        return res.status(404).json({ error: 'Audiencia not found' });
      }
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async updateAudiencia(req: Request, res: Response): Promise<Response> {
    try {
      const updatedAudiencia = await AudienciaService.updateAudiencia(parseInt(req.params.id, 10), req.body);
      return res.status(200).json(updatedAudiencia);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async deleteAudiencia(req: Request, res: Response): Promise<Response> {
    try {
      const deletedAudiencia = await AudienciaService.deleteAudiencia(parseInt(req.params.id, 10));
      return res.status(200).json(deletedAudiencia);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async exportAudiencias(_req: Request, res: Response): Promise<Response> {
    try {
      const audiencias = await AudienciaService.getAllAudiencias();
      const excelBuffer = generateExcel(audiencias);
  
      res.setHeader('Content-Disposition', 'attachment; filename=audiencias.xlsx');
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      return res.send(excelBuffer);
  
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getAudienciasByFilters(req: Request, res: Response): Promise<Response> {
    try {
      const filters = {
        startDate: req.query.startDate as string,
        endDate: req.query.endDate as string,
        turno: req.query.turno as string,
        orgao_julgador: req.query.orgao_julgador as string,
        sala: req.query.sala as string,
      };
      
      const audiencias = await AudienciaService.getByFilters(filters);
      return res.status(200).json(audiencias);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new AudienciaController();
