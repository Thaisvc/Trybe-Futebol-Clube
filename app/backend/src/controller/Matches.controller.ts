import { Request, Response } from 'express';
import ServiceMatches from '../services/Matches.service';

export default class MatcheController {
  static async matches(_req: Request, res: Response) {
    try {
      const getAll = await ServiceMatches.getMatche();
      res.status(200).json(getAll);
    } catch (error) {
      res.status(400).json({ message: 'algo deu errado' });
    }
  }
}
