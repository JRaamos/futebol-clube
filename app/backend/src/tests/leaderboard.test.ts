import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Teams, Match } from '../database/models/Associations';
import { app } from '../app';
import { leaderboard } from './mocks/leaderboard';
chai.use(chaiHttp);

const { expect } = chai;

describe('leaderboard Test', () => {
  it("verifica se ao aceesar a rota /leaderboard é retornado o leaderboard", async () => {
    
    const {status, body} = await chai.request(app).get('/leaderboard');
    expect(status).to.be.eql(200);
    expect(body).to.be.eql(leaderboard);
  });
});