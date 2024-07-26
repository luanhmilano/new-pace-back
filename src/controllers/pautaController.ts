import { Request, Response } from 'express';
import prisma from '../config';

export const createPauta = async (req: Request, res: Response) => {
    try {
        const newPauta = await prisma.pauta.create({
            data: req.body,
        });
        res.status(201).json(newPauta);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getPautas = async (req: Request, res: Response) => {
    try {
      const pautas = await prisma.pauta.findMany();
      res.status(200).json(pautas);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
};

// TERMINAR O CRUD