import Match from '../database/models/Match';
import Team from '../database/models/Team';
import IMatches, { ILeaderBoard } from '../interfeces/ILeaderboard';

export default class LeaderboardsService {
  static totalOfPoints(id: number, array: IMatches[]): number {
    const points = array.reduce((acc, { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }) => {
      if (homeTeam === id && homeTeamGoals > awayTeamGoals) {
        return acc + 3;
      }
      if (awayTeam === id && awayTeamGoals > homeTeamGoals) {
        return acc + 3;
      }
      if (homeTeamGoals === awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return points;
  }

  static totalVictory(id: number, array: IMatches[]): number {
    const VitoryPoints = array
      .reduce((acc, { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }) => {
        if (homeTeam === id && homeTeamGoals > awayTeamGoals) {
          return acc + 1;
        }
        if (awayTeam === id && awayTeamGoals > homeTeamGoals) {
          return acc + 1;
        }
        return acc;
      }, 0);
    return VitoryPoints;
  }

  static totalDraws(array: IMatches[]): number {
    const Draws = array.reduce((acc, { homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals === awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return Draws;
  }

  static totalLosses(id: number, array: IMatches[]): number {
    const losses = array
      .reduce((acc, { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }) => {
        if (homeTeam === id && homeTeamGoals < awayTeamGoals) {
          return acc + 1;
        }

        if (awayTeam === id && awayTeamGoals < homeTeamGoals) {
          return acc + 1;
        }
        return acc;
      }, 0);
    return losses;
  }

  static totalGames(array: IMatches[]): number {
    const games = array.reduce((acc, _curr) => acc + 1, 0);
    return games;
  }

  static goalsScoredInFavor(id: number, array: IMatches[]): number {
    const totalGoals = array.reduce((acc, { homeTeam, homeTeamGoals, awayTeamGoals }) => {
      if (id === homeTeam) {
        return acc + homeTeamGoals;
      }
      return acc + awayTeamGoals;
    }, 0);
    return totalGoals;
  }

  static goalsConceded(id: number, array: IMatches[]): number {
    const concededGoals = array
      .reduce((acc, { homeTeam, homeTeamGoals, awayTeamGoals }) => {
        if (id === homeTeam) {
          return acc + awayTeamGoals;
        }
        return acc + homeTeamGoals;
      }, 0);
    return concededGoals;
  }

  static teamUtilization(id: number, array: IMatches[]): string {
    const efficiency = (this.totalOfPoints(id, array)
      / (this.totalGames(array) * 3)) * 100;
    return efficiency.toFixed(2);
  }

  static returnsObject(teamName: string, array: IMatches[], id: number)
    : ILeaderBoard {
    const objectReduce = {
      name: teamName,
      totalPoints: this.totalOfPoints(id, array),
      totalGames: this.totalGames(array),
      totalVictories: this.totalVictory(id, array),
      totalDraws: this.totalDraws(array),
      totalLosses: this.totalLosses(id, array),
      goalsFavor: this.goalsScoredInFavor(id, array),
      goalsOwn: this.goalsConceded(id, array),
      goalsBalance: this.goalsScoredInFavor(id, array) - this.goalsConceded(id, array),
      efficiency: this.teamUtilization(id, array),
    };
    return objectReduce;
  }

  static async getAllLeaderboard(): Promise<ILeaderBoard[]> {
    const result = await this.getTeamsAlls();
    const orderned = this.orderTeamsLeaderboard(result);
    return orderned;
  }

  static async getTeamsAlls(): Promise<ILeaderBoard[] > {
    const matchesAllsFinish = await Team.findAll({
      include: [
        { model: Match, as: 'teamHome', where: { inProgress: false } },
        { model: Match, as: 'teamAway', where: { inProgress: false } },
      ],
    });

    const array = await Promise.all(matchesAllsFinish
      .map(({ dataValues: data }) => {
        const arrayAll = data.teamHome.concat(data.teamAway);
        return this.returnsObject(data.teamName, arrayAll, data.id);
      }));

    return array;
  }

  static orderTeamsLeaderboard(array: ILeaderBoard[]): ILeaderBoard[] {
    const orderTeams = array.sort((a, b) => b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn);

    return orderTeams;
  }

  static async getAllLeaderboardFilter(path: string): Promise<ILeaderBoard[]> {
    const result = await this.getTeamHomeAndAway(path);
    const orderned = this.orderTeamsLeaderboard(result);
    return orderned;
  }

  static async getTeamHomeAndAway(path: string): Promise<ILeaderBoard[]> {
    const teamHomeOrAway = path === 'home' ? 'teamHome' : 'teamAway';

    const matchesAllsFinish = await Team.findAll({
      include: [
        { model: Match, as: teamHomeOrAway, where: { inProgress: false } },
      ],
    });

    const arrayFilter = await Promise.all(matchesAllsFinish
      .map(({ dataValues: { teamName, id, teamHome, teamAway } }) => {
        if (teamHomeOrAway === 'teamHome') {
          return this.returnsObject(teamName, teamHome, id);
        }
        return this.returnsObject(teamName, teamAway, id);
      }));

    return arrayFilter;
  }
}
