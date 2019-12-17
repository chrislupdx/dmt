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

  it('can grabs a list of keywords', async () => {
    await createKW({ keyword: 'none' });
    await createKW({ keyword: 'ever' });
    await createKW({ keyword: 'other' });

    RandomKW().then(res => {
      expect(res).toEqual([
        { __v: 0, _id: expect.any(String), keyword: 'none' },
        { __v: 0, _id: expect.any(String), keyword: 'ever' },
        { __v: 0, _id: expect.any(String), keyword: 'other' }
      ]);
    });
  });
});
