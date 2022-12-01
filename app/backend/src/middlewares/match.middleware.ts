import { NextFunction, Request, Response } from 'express';

export default class MatchesMiddleware {
  public static validateMatches(req: Request, res: Response, next: NextFunction) {
    const { homeTeam, awayTeam } = req.body;
    if (homeTeam !== awayTeam) {
      next();
    } else {
      res.status(422).json(
        { message: 'It is not possible to create a match with two equal teams' },
      );
    }
  }
}
