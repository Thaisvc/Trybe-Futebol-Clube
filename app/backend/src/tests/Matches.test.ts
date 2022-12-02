import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import MatchModel from '../database/models/Match';
import {
  HTTP_STATUS_OK, MatchesAll, InProgressTrue, mockTeam, sucessMatchMock, addMatche, TeamNoExist

} from './mocks/MockMatches';
import * as bcrypt from 'bcryptjs';

import { Response } from 'superagent';
import Team from '../database/models/Team';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;



describe('Rota de Macthes', () => {

  beforeEach(async () => {
    sinon
      .stub(MatchModel, "findAll")
      .resolves(MatchesAll as unknown as MatchModel[]);
  });

  it('Testa se GET traz todos os matches', async () => {
    const result = await chai.request(app).get('/matches');

    expect(result).to.have.status(HTTP_STATUS_OK);
    expect(result.body).to.be.an('array');

    expect(result.body).to.deep.equal(MatchesAll);
  })

  afterEach(() => {
    (MatchModel.findAll as sinon.SinonStub).restore();
  })



});

describe('Testa se GET traz todos os matches inProgress ', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon.stub(MatchModel, 'findAll')
      .resolves(InProgressTrue as unknown as MatchModel[])
  })
  it('inProgress true', async () => {
    const result = await chai.request(app).get('/matches?inProgress=true');

    expect(result).to.have.status(200);
    expect(result.body).to.deep.equal(InProgressTrue);
  })

  it('inProgresss false', async () => {
    const result = await chai.request(app).get('/matches?inProgress=false');

    expect(result).to.have.status(200);
    expect(result.body).to.not.equal(InProgressTrue);
  })

  afterEach(() => {
    (MatchModel.findAll as sinon.SinonStub).restore();
  })
});


describe("Testes partidas", () => {
  let chaiHttpResponse: Response;

  beforeEach(() => {
    sinon.restore();
  });

  it("Testa se  e possivel atualizar  uma partida", async () => {
    sinon.stub(MatchModel, "update").resolves([0]);
    chaiHttpResponse = await chai
      .request(app)
      .patch("/matches/1").send({
        homeTeamGoals: 3,
        awayTeamGoals: 1
      });

    expect(chaiHttpResponse.status).to.be.equal(200);

  });


  it("Testa se falha ao tentar inserir dois times iguais", async () => {
    sinon.stub(jwt, "verify").resolves({ id: 1 });
    chaiHttpResponse = await chai
      .request(app)
      .post("/matches")
      .send(addMatche)
      .set("Authorization", "token");

    expect(chaiHttpResponse.status).to.be.equal(422);
    expect(chaiHttpResponse.body).to.deep.equal({
      message: "It is not possible to create a match with two equal teams",
    });
  });


  it("Falha se um time não existir", async () => {
    sinon.stub(jwt, "verify").resolves({ id: 12 });
    sinon.stub(Team, 'findByPk').resolves(null);
    chaiHttpResponse = await chai
      .request(app)
      .post("/matches")
      .send(TeamNoExist)
      .set("Authorization", "token");

    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body).to.deep.equal({
      message: "There is no team with such id!",
    });
  });
});