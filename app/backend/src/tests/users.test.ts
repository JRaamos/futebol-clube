import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
chai.use(chaiHttp);
// import validationJWT from '../middlewares/validationJWT';
import User from '../database/models/UserModel';
import { user } from './mocks/users.mock';
const { expect } = chai;


describe('Users Test', () => {
  it("O avaliador verificará se é possível fazer o login com dados corretos e que, após o acesso, será redirecionado para a tela de jogos", async function () {
    sinon.stub(User, 'findOne').resolves(user as User);
    const { status, body } = await chai.request(app).post('/login').send(user);

    expect(status).to.be.eq(200);
    expect(body).to.have.key('token');
  });
});