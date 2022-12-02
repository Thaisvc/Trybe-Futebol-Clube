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

  beforeEach(async () => {
    sinon
      .stub(TeamModel, "findAll")
      .resolves(teamsAll as TeamModel[]);
    });
    
    it('Testa se GT traz todos os times', async () => {
      const result = await chai.request(app).get('/teams');
      
      expect(result).to.have.status(200);
      expect(result.body).to.be.an('array');
      expect(result.body).to.deep.equal(teamsAll);
    })

    it('Testa se encontra time pelo id', async () => {
      const result = await chai.request(app).get('/teams/1');      

      expect(result).to.have.status(200);
      expect(result.body).to.deep.equal(teamsAll[0]);
    });

    afterEach(()=>{
      (TeamModel.findAll as sinon.SinonStub).restore();
    })
  
});

