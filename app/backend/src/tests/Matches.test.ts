import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import MatchModel from '../database/models/Match';
import {
    HTTP_STATUS_OK, MatchesAll

} from './mocks/MockMatches';
import * as bcrypt from 'bcryptjs';

import { Response } from 'superagent';

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

    afterEach(()=>{
        (MatchModel.findAll as sinon.SinonStub).restore();
      })


});

