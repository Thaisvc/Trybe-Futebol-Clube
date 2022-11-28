import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import UserModel from '../database/models/User';
import {
  login,user
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
        .stub(UserModel, "findOne")
        .resolves(user as UserModel);
    });

    after(()=>{
      sinon.restore();
    })

    chaiHttpResponse = await chai
       .request(app).post('/login').send(login)

    expect(chaiHttpResponse.status).to.be.equal(200);
  });

 
});

function before(arg0: () => Promise<void>) {
    throw new Error('Function not implemented.');
}
function after(arg0: () => void) {
    throw new Error('Function not implemented.');
}

