import { Request, Response, NextFunction } from 'express';

const extractDateFromFileName = (fileName: string): Date => {
  const regex = /gerado em (\d{2}\.\d{2}\.\d{4}) (\d{2})h(\d{2})/;
  const match = fileName.match(regex);
  if (!match) throw new Error('Invalid file name format');

  const [_, datePart, hour, minute] = match;
  const [day, month, year] = datePart.split('.').map(Number);
  return new Date(year, month - 1, day, Number(hour), Number(minute));
};

export const extractInfoMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    const fileGenerationDate = extractDateFromFileName(req.file.originalname);
    req.body.fileGenerationDate = fileGenerationDate;
    next();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
