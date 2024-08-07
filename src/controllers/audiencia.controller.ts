import { Request, Response } from 'express';
import { generateExcel } from '../utils/excelGenerator';
import AudienciaService from '../services/audiencia.service';

/**
 * @swagger
 * tags: 
 *  name: Audiencias
 *  description: Operações relacionadas a audiências
 */

class AudienciaController {

  /**
   * @swagger
   * /audiencias:
   *   post:
   *     summary: Cria uma nova audiência
   *     tags: [Audiencias]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               data:
   *                 type: string
   *                 format: date
   *               hora:
   *                 type: string
   *               processo:
   *                 type: string
   *               orgao_julgador:
   *                 type: string
   *               partes:
   *                 type: string
   *               classe:
   *                 type: string
   *               tipo_audiencia:
   *                 type: string
   *               sala:
   *                 type: string
   *               situacao:
   *                 type: string
   *             example: 
   *               data: '2024-07-25'
   *               hora: '10:00'
   *               processo: '0000001-00.2024.5.00.0001'
   *               orgao_julgador: 'Orgão Julgador'
   *               partes: 'Parte 1 vs Parte 2'
   *               classe: 'Classe'
   *               tipo_audiencia: 'Tipo'
   *               sala: '1'
   *               situacao: 'Situação'
   *     responses:
   *       201:
   *         description: Audiência criada com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Audiencia'
   *       500:
   *         description: Erro no servidor
   */

  async createAudiencia(req: Request, res: Response): Promise<Response> {
    try {
      const newAudiencia = await AudienciaService.createAudiencia(req.body);
      return res.status(201).json(newAudiencia);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  /**
   * @swagger
   * /audiencias:
   *   get:
   *     summary: Retorna todas as audiências
   *     tags: [Audiencias]
   *     responses:
   *       200:
   *         description: Lista de audiencias
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Audiencia'
   *       500:
   *         description: Erro no servidor
   */

  async getAudiencias(req: Request, res: Response): Promise<Response> {
    try {
      const audiencias = await AudienciaService.getAllAudiencias();
      return res.status(200).json(audiencias);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  /**
   * @swagger
   * /audiencias/{id}:
   *   get:
   *     summary: Retorna uma audiência pelo ID
   *     tags: [Audiencias]
   *     parameters:
   *        - in: path
   *          name: id
   *          schema:
   *            type: integer
   *          required: true
   *          description: ID da audiência
   *     responses:
   *       200:
   *         description: Audiência encontrada
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Audiencia'
   *       404:
   *         description: Audiência não encontrada
   *       500:
   *         description: Erro no servidor
   */

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

  /**
   * @swagger
   * /audiencias/{id}:
   *   put:
   *     summary: Atualiza uma audiência pelo ID
   *     tags: [Audiencias]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID da audiência
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               data:
   *                 type: string
   *                 format: date
   *               hora:
   *                 type: string
   *               processo:
   *                 type: string
   *               orgao_julgador:
   *                 type: string
   *               partes:
   *                 type: string
   *               classe:
   *                 type: string
   *               tipo_audiencia:
   *                 type: string
   *               sala:
   *                 type: string
   *               situacao:
   *                 type: string
   *             example: 
   *               data: '2024-07-25'
   *               hora: '10:00'
   *               processo: '0000001-00.2024.5.00.0001'
   *               orgao_julgador: 'Orgão Julgador'
   *               partes: 'Parte 1 vs Parte 2'
   *               classe: 'Classe'
   *               tipo_audiencia: 'Tipo'
   *               sala: '1'
   *               situacao: 'Situação'
   *     responses:
   *       200:
   *         description: Audiência atualizada com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Audiencia'
   *       404:
   *         description: Audiência não encontrada
   *       500:
   *         description: Erro no servidor
   */

  async updateAudiencia(req: Request, res: Response): Promise<Response> {
    try {
      const updatedAudiencia = await AudienciaService.updateAudiencia(parseInt(req.params.id, 10), req.body);
      return res.status(200).json(updatedAudiencia);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  /**
   * @swagger
   * /audiencias/{id}:
   *   delete:
   *     summary: Deleta uma audiência pelo ID
   *     tags: [Audiencias]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID da audiência
   *     responses:
   *       200:
   *         description: Audiência deletada com sucesso
   *       404:
   *         description: Audiência não encontrada
   *       500:
   *         description: Erro no servidor
   */

  async deleteAudiencia(req: Request, res: Response): Promise<Response> {
    try {
      const deletedAudiencia = await AudienciaService.deleteAudiencia(parseInt(req.params.id, 10));
      return res.status(200).json(deletedAudiencia);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  /**
   * @swagger
   * /audiencias/export:
   *   get:
   *     summary: Exporta todas as audiências em um arquivo Excel
   *     tags: [Audiencias]
   *     produces:
   *       - application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
   *     responses:
   *       200:
   *         description: Excel com audiências exportadas
   *         content:
   *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
   *             schema:
   *               type: string
   *               format: binary
   *       500:
   *         description: Erro no servidor
   */

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

  /**
   * @swagger
   * /audiencias/filter:
   *   get:
   *     summary: Retorna audiências com base em filtros
   *     tags: [Audiencias]
   *     parameters:
   *       - in: query
   *         name: startDate
   *         schema:
   *           type: string
   *           format: date
   *         required: false
   *         description: Data inicial
   *       - in: query
   *         name: endDate
   *         schema:
   *           type: string
   *           format: date
   *         required: false
   *         description: Data final
   *       - in: query
   *         name: turno
   *         schema:
   *           type: string
   *         required: false
   *         description: Turno (MANHÃ/TARDE)
   *       - in: query
   *         name: orgao_julgador
   *         schema:
   *           type: string
   *         required: false
   *         description: Órgão julgador
   *       - in: query
   *         name: sala
   *         schema:
   *           type: string
   *         required: false
   *         description: Sala
   *     responses:
   *       200:
   *         description: Lista de audiências filtradas
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Audiencia'
   *       500:
   *         description: Erro no servidor
   */

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
      console.log("Cura Mudez")
      return res.status(200).json(audiencias);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new AudienciaController();
