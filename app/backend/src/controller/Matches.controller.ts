import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
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

  static async createMatches(req: Request, res: Response) {
    const { authorization } = req.headers;
    const check = await ServiceMatches.checkExists(req.body);
    if (typeof check === 'object') {
      return res.status(404).json(check);
    }
    try {
      const test = jwt.verify(authorization as string, process.env.JWT_SECRET as string);
      console.log(test);

      const created = await ServiceMatches.createdMatches(req.body);
      return res.status(201).json(created);
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }

  static async MatchUpdate(req: Request, res: Response): Promise<void> {
    await ServiceMatches.updateMatch(Number(req.params.id));
    res.status(200).json({ message: 'Finished' });
  }

  static async MatchUpdateProgress(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updatedMatch = await
    ServiceMatches.updateMatcheInProgress(req.body, Number(id));
    res.status(200).json(updatedMatch);
  }
}
