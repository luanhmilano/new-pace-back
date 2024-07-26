import { Request, Response } from "express";
import prisma from "../config";

export const createAudiencia = async (req: Request, res: Response) => {
    try {
        const newAudiencia = await prisma.audiencia.create({
            data: req.body,
        });
        res.status(201).json(newAudiencia);
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
};

export const getAudiencias = async (req: Request, res: Response) => {
    try {
        const audiencias = await prisma.audiencia.findMany();
        res.status(200).json(audiencias);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// TERMINAR O CRUD