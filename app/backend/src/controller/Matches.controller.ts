import { Request, Response } from 'express';
import ServiceMatches from '../services/Matches.service';

export default class MatcheController {
  static async matches(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress) {
      const matchesGetProgress = await ServiceMatches.matcheQuery(String(inProgress));
      res.status(200).json(matchesGetProgress);
    } else {
      const getAllMatches = await ServiceMatches.getMatche();
      res.status(200).json(getAllMatches);
    }
  }

  static async createMatches(req: Request, res: Response): Promise<void> {
    const { statusCode, message } = await ServiceMatches.createdMatches(req.body);
    console.log(statusCode, message);

    res.status(statusCode).json(message);
  }

  static async MatchUpdate(req: Request, res: Response): Promise<void> {
    await ServiceMatches.updateMatch(Number(req.params.id));
    res.status(200).json({ message: 'Finished' });
  }
}
