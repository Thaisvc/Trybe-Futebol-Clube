import Team from '../database/models/Team';
import ModelMatch from '../database/models/Match';

export default class MatchesService {
  static async getMatche() {
    const matches = await ModelMatch.findAll({
      include: [
        { model: Team, as: 'teamHome' },
        { model: Team, as: 'teamAway' },
      ],
    });
    return matches;
  }
}
