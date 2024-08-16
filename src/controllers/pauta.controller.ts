import { Request, Response } from 'express';
import PautaService from '../services/pauta.service';

/**
 * @swagger
 * tags:
 *  name: Pautas
 *  description: Operações relacionadas a pautas
 *
 */

class PautaController {
  /**
   * @swagger
   * /pautas:
   *   post:
   *     summary: Cria uma nova pauta
   *     tags: [Pautas]
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
   *               turno:
   *                 type: string
   *               orgao_julgador:
   *                 type: string
   *               sala:
   *                 type: string
   *             example:
   *               data: '2024-07-25'
   *               turno: 'MANHÃ'
   *               orgao_julgador: 'Orgão Julgador'
   *               sala: '1'
   *     responses:
   *       201:
   *         description: Pauta criada com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Pauta'
   *       500:
   *         description: Erro no servidor
   */

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const pauta = await PautaService.create(req.body);
      return res.status(201).json(pauta);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500);
    }
  }

  /**
   * @swagger
   * /pautas:
   *   get:
   *     summary: Retorna todas as pautas
   *     tags: [Pautas]
   *     responses:
   *       200:
   *         description: Lista de pautas
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Pauta'
   *       500:
   *         description: Erro no servidor
   */

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const pautas = await PautaService.getAll();
      return res.status(200).json(pautas);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500);
    }
  }

  /**
   * @swagger
   * /pautas/{id}:
   *   get:
   *     summary: Retorna uma pauta pelo ID
   *     tags: [Pautas]
   *     parameters:
   *        - in: path
   *          name: id
   *          schema:
   *            type: integer
   *          required: true
   *          description: ID da pauta
   *     responses:
   *       200:
   *         description: Pauta encontrada
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Pauta'
   *       404:
   *         description: Pauta não encontrada
   *       500:
   *         description: Erro no servidor
   */

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const pauta = await PautaService.getById(Number(req.params.id));
      if (pauta) {
        return res.status(200).json(pauta);
      } else {
        return res.status(404).json({ message: 'Pauta not found' });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500);
    }
  }

  /**
   * @swagger
   * /pautas/{id}/audiencias:
   *   get:
   *     summary: Retorna uma pauta pelo ID com suas audiências
   *     tags: [Pautas]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID da pauta
   *     responses:
   *       200:
   *         description: Pauta encontrada com suas audiências
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Pauta'
   *       404:
   *         description: Pauta não encontrada
   *       500:
   *         description: Erro no servidor
   */

  async getByIdWithAudiencias(req: Request, res: Response): Promise<Response> {
    try {
      const pauta = await PautaService.getByIdWithAudiencias(
        Number(req.params.id),
      );
      if (pauta) {
        return res.status(200).json(pauta);
      } else {
        return res.status(404).json({ message: 'Pauta not found' });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500);
    }
  }

  async getOrgaosJulgadores(req: Request, res: Response): Promise<Response> {
    try {
      const orgaosJulgadores = await PautaService.getUniqueOrgaosJulgadores();
      return res.status(200).json(orgaosJulgadores);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500);
    }
  }

  async getSalasByOrgaoJulgador(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const { orgao_julgador } = req.params;
      const salas = await PautaService.getSalasByOrgaoJulgador(orgao_julgador);
      return res.status(200).json(salas);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500);
    }
  }

  /**
   * @swagger
   * /pautas/{id}:
   *   put:
   *     summary: Atualiza uma pauta pelo ID
   *     tags: [Pautas]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID da pauta
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
   *               turno:
   *                 type: string
   *               orgao_julgador:
   *                 type: string
   *               sala:
   *                 type: string
   *             example:
   *               data: '2024-07-25'
   *               turno: 'MANHÃ'
   *               orgao_julgador: 'Orgão Julgador'
   *               sala: '1'
   *     responses:
   *       200:
   *         description: Pauta atualizada com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Pauta'
   *       404:
   *         description: Pauta não encontrada
   *       500:
   *         description: Erro no servidor
   */

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const pauta = await PautaService.update(Number(req.params.id), req.body);
      return res.status(200).json(pauta);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500);
    }
  }

  /**
   * @swagger
   * /pautas/{id}:
   *   delete:
   *     summary: Deleta uma pauta pelo ID
   *     tags: [Pautas]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID da pauta
   *     responses:
   *       200:
   *         description: Pauta deletada com sucesso
   *       404:
   *         description: Pauta não encontrada
   *       500:
   *         description: Erro no servidor
   */

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const pauta = await PautaService.delete(Number(req.params.id));
      return res.status(200).json(pauta);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500);
    }
  }
}

export default new PautaController();
