import { Request, Response } from 'express';
import ServiceTeam from '../services/Teams.service';

export default class Teams {
  static async TeamGet(_req: Request, res: Response): Promise<void> {
    try {
      const getAll = await ServiceTeam.getAllTeam();
      res.status(200).json(getAll);
    } catch (error) {
      res.status(400).json({ error: 'algo deu errado' });
    }
  }
}
