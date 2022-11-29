import { ITeams } from '../interfeces/ITeam';
import ModelTeams from '../database/models/Team';

export default class TeamService {
  static async getAllTeam(): Promise<ITeams[]> {
    const result = await ModelTeams.findAll();
    return result;
  }
}
