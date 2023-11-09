import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { matches, matchesTrue, newMatch } from './mocks/matches.mock';
import Match from '../database/models/MetchesModel';
import { app } from '../app';
import { user } from './mocks/users.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches Test', () => {
  it('o avaliador verificará se é retornado todos os jogos', async function () {
    sinon.stub(Match, 'findAll').resolves(matches as unknown as Match[]);
    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.be.eq(200);
    expect(body).to.be.deep.eq(matches);
    sinon.restore();
  })
  it('o avaliador verificará se é retornado todos os jogos que estao em andamento', async function () {
    sinon.stub(Match, 'findAll').resolves(matchesTrue as unknown as Match[]);
    const { status, body } = await chai.request(app).get('/matches?inProgress=true');

    expect(status).to.be.eq(200);
    expect(body).to.be.deep.eq(matchesTrue);
    sinon.restore();
  })
  it('o avaliador verificara se é possivel finalizar um jogo pelo id', async function () {
    sinon.stub(Match, 'update').returns;
    const { status, body } = await chai.request(app).patch('/matches/41/finish').set('Authorization', `Bearer ${user.token}`);

    expect(status).to.be.eq(200);
    expect(body).to.be.deep.eq({ message: "Finished" });
    sinon.restore();
  })
  it('o avaliador verificara se é possivel modificar o placar da partida', async function () {
    sinon.stub(Match, 'update').returns;
    const { status, body } = await chai.request(app).patch('/matches/41').set('Authorization', `Bearer ${user.token}`).send({ homeTeamGoals: 2, awayTeamGoals: 0 });

    expect(status).to.be.eq(200);
    expect(body).to.be.deep.eq({ message: "Goooooool" });
    sinon.restore();
  })

  it('o avaliador verificara se é possivel criar um jogo', async function () {
    sinon.stub(Match, 'create').resolves({
      "id": 49,
      "homeTeamId": 16,
      "awayTeamId": 8,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
      "inProgress": true
    } as unknown as Match);
    const { status, body } = await chai.request(app).post('/matches').set('Authorization', `Bearer ${user.token}`).send(newMatch);

    expect(status).to.be.eq(201);
    expect(body).to.be.deep.eq({
      "id": 49,
      "homeTeamId": 16,
      "awayTeamId": 8,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
      "inProgress": true
    });
    sinon.restore();
  })
});