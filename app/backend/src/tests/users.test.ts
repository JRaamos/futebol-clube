import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
chai.use(chaiHttp);
// import validationJWT from '../middlewares/validationJWT';
import User from '../database/models/UserModel';
import {
  user, userIvalid, passwordIvalid, validUser, notData,
  INVALID_DATA, NOT_DATA
} from './mocks/users.mock';
const { expect } = chai;

describe('Users Test', () => {
  it("O avaliador verificará se é possível fazer o login com dados corretos", async function () {
    sinon.stub(User, 'findOne').resolves(validUser as User);
    const { status, body } = await chai.request(app).post('/login').send(user);

    expect(status).to.be.eq(200);
    expect(body).to.have.key('token');
    sinon.restore();
  });
  it('O avaliador verificará nao pe possivel fazer o login com dados de email incorretos', async function () {
    sinon.stub(User, 'findOne').resolves(userIvalid as User);
    const { status, body } = await chai.request(app).post('/login').send(user);

    expect(status).to.be.eq(401);
    expect(body.message).to.equal(INVALID_DATA.data.message);
    sinon.restore();
  });

  it('O avaliador verificará se é lançado um erro caso a senha tenha o tamanho menor que 6', async function () {
    sinon.stub(User, 'findOne').resolves(null);


    const { status, body } = await chai.request(app).post('/login').send(passwordIvalid);


    expect(status).to.be.eq(401);
    expect(body.message).to.equal(INVALID_DATA.data.message);
    sinon.restore();
  });
  it('O avaliador verificará se é lançado um erro caso o email nao exista', async function () {
    sinon.stub(User, 'findOne').resolves(null);
    const { status, body } = await chai.request(app).post('/login').send(notData);


    expect(status).to.be.eq(400);
    expect(body.message).to.equal(NOT_DATA.data.message);
    sinon.restore();
  });
});