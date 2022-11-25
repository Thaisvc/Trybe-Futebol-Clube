import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import User from '../database/models/User';
import {
user, login
} from './mocks/MockUsers';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('/login endpoint tests: ', () => {
  let chaiHttpResponse: Response;

  it('return success', async () => {
    before(async () => {
      sinon
        .stub(User, "findOne")
        .resolves(login as User);
    });

    after(()=>{
      sinon.restore();
    })

    chaiHttpResponse = await chai
       .request(app).post('/login').send(login)

    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  
});