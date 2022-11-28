import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import User from '../database/models/User';
import {
  Login,
  user,
  
} from './mocks/MockUsers';
import * as bcrypt from 'bcryptjs';

import { Response } from 'superagent';
import * as JWT from '../utils/token'

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

const HTTP_STATUS_OK = 200;
const HTTP_BAD_REQUEST = 400;
const HTTP_UNAUTHORIZED = 401;

describe('Rota de Login', () => {

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(user as User);
  });

  afterEach(sinon.restore)

  it('Retorna um token e status 200 ao fazer login', async () => {
    sinon.stub(bcrypt, "compareSync").returns(true);
    chaiHttpResponse = await chai.request(app).post('/login').send(Login);

    expect(chaiHttpResponse.status).to.be.eq(HTTP_STATUS_OK);
    expect(chaiHttpResponse.body.token).to.be.an('string');
  });

  it('Retorna "Incorrect email or password" e status 401 caso algum dos dados de login estejam invalidos', async () => {
    sinon.stub(bcrypt, "compareSync").returns(false);
    chaiHttpResponse = await chai.request(app).post('/login').send(Login);

    expect(chaiHttpResponse.status).to.be.eq(HTTP_UNAUTHORIZED);
    expect(chaiHttpResponse.body).to.deep.equal({ message: "Incorrect email or password" });
  });

  it('Retorna "All fields must be filled" e status 400 caso algum dos dados de login nao sejam passados', async () => {
    sinon.stub(bcrypt, "compareSync").returns(true);
    chaiHttpResponse = await chai.request(app).post('/login').send({});

    expect(chaiHttpResponse.status).to.be.eq(HTTP_BAD_REQUEST);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
  });
});


