import { Request, Response } from 'express';
import Leaderboard from '../services/Leaderboards.service';

export default class LeaderboardController {
  static async getAll(_req: Request, res: Response) {
    const all = await Leaderboard.getAllLeaderboard();
    res.status(200).json(all);
  }

  static async getAllFilter(req: Request, res: Response) {
    const path = req.path.replace('/', '');
    const filter = await Leaderboard.getAllLeaderboardFilter(path);
    res.status(200).json(filter);
  }
}
