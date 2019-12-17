require('dotenv').config();
const app = require('../../app');
const mongoose = require('mongoose');
const request = require('supertest');
const connect = require('../../utils/connect');
const RandomKW = require('../../utils/randKW');

const createKW = KW => {
  return request(app)
    .post('/api/v1/keywords')
    .send(KW)
    .then(res => res.body);
};

describe('RandKW tests', () => {
  beforeAll(() => {
    return connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can call DB and returns an object', async () => {
    await createKW({ keyword: 'none' });
    let res = await RandomKW();

    expect(res).toEqual(expect.Anything);
  });
});
