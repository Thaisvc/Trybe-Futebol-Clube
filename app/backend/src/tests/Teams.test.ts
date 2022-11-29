import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import TeamModel from '../database/models/Team';
import {
  HTTP_BAD_REQUEST,
  HTTP_STATUS_OK,
  HTTP_UNAUTHORIZED,
  Login,
  users,
  
} from './mocks/MockUsers';
import * as bcrypt from 'bcryptjs';

import { Response } from 'superagent';
import { teamsAll } from './mocks/MockTeam';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;



describe('Rota de Teams', () => {

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(TeamModel, "findAll")
      .resolves(teamsAll as TeamModel[]);
  });


  afterEach(sinon.restore)

  it('Testa se GET encontra todos os times', async () => {
    sinon.stub(TeamModel, "findAll").resolves(teamsAll as TeamModel[]);
    chaiHttpResponse = await chai.request(app).post('/teams').send();

    expect(chaiHttpResponse.status).to.be.eq(HTTP_STATUS_OK);
    expect(chaiHttpResponse.body).to.deep.equal(teamsAll)
  });

  
});

