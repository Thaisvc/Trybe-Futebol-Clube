import Match from '../database/models/Match';
import Teams from '../database/models/Team';

import IMatches, { ILeaderBoard } from '../interfeces/ILeaderboard';

export default class ServiceLeaderBoard {
  static async getAllLeaderboardFilter(path: string): Promise<ILeaderBoard[]> {
    const result = await this.getTeamHomeAndAway(path);
    const orderned = this.orderTeamsLeaderboard(result);
    return orderned;
  }

  static async getAllLeaderboard(): Promise<ILeaderBoard[]> {
    const result = await this.getTeamsAlls();
    const orderned = this.orderTeamsLeaderboard(result);
    return orderned;
  }

  static returnsObject(teamName: string, array: IMatches[], id: number)
    : ILeaderBoard {
    const objectReduce = {
      name: teamName,
      totalPoints: this.calculatePontuation(id, array),
      totalGames: this.totalGames(array),
      totalVictories: this.calculatesVictory(id, array),
      totalDraws: this.calculatesDraws(array),
      totalLosses: this.calculateLosses(id, array),
      goalsFavor: this.goalsFavor(id, array),
      goalsOwn: this.goalsOnw(id, array),
      goalsBalance: this.goalsFavor(id, array) - this.goalsOnw(id, array),
      efficiency: this.calculatEefficiency(id, array),
    };
    return objectReduce;
  }

  static orderTeamsLeaderboard(array: ILeaderBoard[]): ILeaderBoard[] {
    const orderTeams = array.sort((a, b) => b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn);

    return orderTeams;
  }

  static async getTeamsAlls(): Promise<ILeaderBoard[]> {
    const matchesAllsFinish = await Teams.findAll({
      include: [
        { model: Match, as: 'teamHome', where: { inProgress: false } },
        { model: Match, as: 'teamAway', where: { inProgress: false } },
      ],
    });

    const array = await Promise.all(matchesAllsFinish
      .map(({ dataValues: { teamHome, id, teamName, teamAway } }) => {
        const arrayAll = teamHome.concat(teamAway);
        return this.returnsObject(teamName, arrayAll, id);
      }));

    return array;
  }

  static async getTeamHomeAndAway(path: string): Promise<ILeaderBoard[]> {
    const teamHomeOrAway = path === 'home' ? 'teamHome' : 'teamAway';

    const matchesAllsFinish = await Teams.findAll({
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

  static calculatePontuation(id: number, array: IMatches[]): number {
    const pontuations = array
      .reduce((acc, { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }) => {
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
    return pontuations;
  }

  static calculatesVictory(id: number, array: IMatches[]): number {
    const totalVitory = array
      .reduce((acc, { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }) => {
        if (homeTeam === id && homeTeamGoals > awayTeamGoals) {
          return acc + 1;
        }
        if (awayTeam === id && awayTeamGoals > homeTeamGoals) {
          return acc + 1;
        }
        return acc;
      }, 0);
    return totalVitory;
  }

  static calculatesDraws(array: IMatches[]): number {
    const totalDraws = array.reduce((acc, { homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals === awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return totalDraws;
  }

  static calculateLosses(id: number, array: IMatches[]): number {
    const totalLosses = array
      .reduce((acc, { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }) => {
        if (homeTeam === id && homeTeamGoals < awayTeamGoals) {
          return acc + 1;
        }

        if (awayTeam === id && awayTeamGoals < homeTeamGoals) {
          return acc + 1;
        }
        return acc;
      }, 0);
    return totalLosses;
  }

  static totalGames(array: IMatches[]): number {
    const totalGames = array.reduce((acc, _curr) => acc + 1, 0);
    return totalGames;
  }

  static goalsFavor(id: number, array: IMatches[]): number {
    const totalGoalsfavor = array
      .reduce((acc, { homeTeam, homeTeamGoals, awayTeamGoals }) => {
        if (id === homeTeam) {
          return acc + homeTeamGoals;
        }
        return acc + awayTeamGoals;
      }, 0);
    return totalGoalsfavor;
  }

  static goalsOnw(id: number, array: IMatches[]): number {
    const totalGoalsOnw = array
      .reduce((acc, { homeTeam, homeTeamGoals, awayTeamGoals }) => {
        if (id === homeTeam) {
          return acc + awayTeamGoals;
        }
        return acc + homeTeamGoals;
      }, 0);
    return totalGoalsOnw;
  }

  static calculatEefficiency(id: number, array: IMatches[]): string {
    const efficiency = (this.calculatePontuation(id, array)
      / (this.totalGames(array) * 3)) * 100;
    return efficiency.toFixed(2);
  }
}
