import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';
import TeamsModel from '../database/models/TeamsModel';
import { Response } from 'superagent';
import { findAllResult } from './mocks/teams.mock';
import e from 'express';
chai.use(chaiHttp);

const { expect } = chai;

describe('Teams Test rota /teams',function () {
  // before(async () => {
  //   sinon
  //     .stub(TeamsModel, "findAll")
  //     .resolves(
  //       findAllResult as TeamsModel[]);
  // });
  it('GET /teams, deve devolver um array com id e nome do time', async function () {
    sinon
      .stub(TeamsModel, "findAll")
      .resolves(
        findAllResult as TeamsModel[]);
        const {status, body} = await chai.request(app).get('/teams');

        expect(status).to.be.eq(200);
        expect(body).to.deep.equal(findAllResult);

})
it('GET /teams/:id, deve devolver um obj com id e nome do time', async function () {
  sinon
    .stub(TeamsModel, "findOne")
    .resolves(
      findAllResult[0] as TeamsModel);
  const { status, body } = await chai.request(app).get('/teams/1');

      expect(status).to.be.eq(200);
      expect(body).to.deep.equal(findAllResult[0]);
})
});