import ErrorHttp, { HttpCode } from '../utils/http.exception';
import IMatch, { IMatchesupdate } from '../interfeces/IMatche';
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

  static async matcheQuery(param: string) : Promise <IMatch[]> {
    const inProgress = JSON.parse(param);
    const result = await ModelMatch.findAll({ where: { inProgress },
      include: [
        { model: Team, as: 'teamHome' },
        { model: Team, as: 'teamAway' },
      ] });
    return result;
  }

  /* OUTRA FORMAA

   matcheQuery = async (query: string): Promise<any> => {
    if (query === 'true') {
      const matchTrue = await ModelMatch.findAll({
        where: { inProgress: true },
        include: [
          { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
        ],
      });
      return matchTrue;
    }
    const matchFalse = await ModelMatch.findAll({
      where: { inProgress: false },
      include: [
        { model: Team, as: 'teamHome' },
        { model: Team, as: 'teamAway' },
      ],
    });
    return matchFalse;
  }; */

  static async createdMatches(match: IMatchesupdate): Promise<any> {
    const { homeTeam } = match;
    this.checkExists(homeTeam);
    const create = await ModelMatch.create({
      ...match, inProgress: true,
    });
    console.log(create);

    return create;
  }

  static async updateMatch(id:number) {
    const result = await ModelMatch.update({ inProgress: false }, { where: { id } });
    return { type: null, message: result };
  }

  static async checkExists(id:number) {
    const verify = await Team.findAll({ where: { id } });
    if (verify.length === 0) {
      throw new ErrorHttp(HttpCode.NOT_FOUND, 'There is no team with such id!');
    }
    // return verify;
  }
}
