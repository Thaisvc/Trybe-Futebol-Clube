import { ITeams } from '../interfeces/ITeam';
import ModelTeams from '../database/models/Team';

export default class TeamService {
  static async getAllTeam(): Promise<ITeams[]> {
    const result = await ModelTeams.findAll();
    return result;
  }

  static async teamGetId(id: number): Promise<ITeams | object> {
    const [result] = await ModelTeams.findAll({ where: { id } });
    if (!result) {
      return { status: 400, message: { message: 'Team is not found' } };
    }
    return result;
  }
}
