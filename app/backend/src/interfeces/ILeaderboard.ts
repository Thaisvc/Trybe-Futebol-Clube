export interface IteamHome {
  teamName: string;
}

export interface IMatchesupdate {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface IMatchesCreate extends IMatchesupdate {
  homeTeam: number,
  awayTeam: number,
}

export default interface IMatches extends IMatchesCreate {
  id?: number,
  inProgress: boolean,
  teamHome?: IteamHome;
  teamAway?: IteamHome;
}

export interface ILeaderBoard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance:number,
  efficiency: string,
}
