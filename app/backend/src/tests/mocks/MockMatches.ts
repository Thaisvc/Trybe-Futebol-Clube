export const HTTP_STATUS_OK = 200;
export const HTTP_BAD_REQUEST = 400;
export const HTTP_UNAUTHORIZED = 401;

export const MatchesAll = [
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
      "id": 16,
      "teamName": "São Paulo"
    },
    "teamAway": {
      "id": 8,
      "teamName": "Grêmio"
    }
  },
  ]

  export const InProgressTrue = [
    {
      "id": 41,
      "homeTeam": 16,
      "homeTeamGoals": 2,
      "awayTeam": 9,
      "awayTeamGoals": 0,
      "inProgress": true,
      "teamHome": {
        "id": 16,
        "teamName": "São Paulo"
      },
      "teamAway": {
        "id": 9,
        "teamName": "Internacional"
      }
    }]
    
    export const mockTeam = { id: 16, teamName: 'São Paulo'};
    export const sucessMatchMock = {
      id: 12,
      homeTeam: 16,
      homeTeamGoals: 2,
      awayTeam: 8,
      awayTeamGoals: 2,
      inProgress: true,
    }

    export const addMatche = {
      homeTeam: 1,
      awayTeam: 1,
      homeTeamGoals: 2,
      awayTeamGoals: 2,
    }



    export const TeamNoExist =  {
      homeTeam: 99,
      awayTeam: 5,
      homeTeamGoals: 2,
      awayTeamGoals: 2,
    }