import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { matches } from './mocks/matches.mock';
import Match from '../database/models/MetchesModel';
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai; 

describe('Matches Test', () => {
  it('o avaliador verificará se é retornado todos os jogos', async function () {
    sinon.stub(Match, 'findAll').resolves(matches as unknown as Match[]);
    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.be.eq(200);
    expect(body).to.be.deep.eq(matches);
  })
});