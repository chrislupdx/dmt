const request = require('supertest');
const app = require('../../app');

require('dotenv').config();
const mongoose = require('mongoose');
const connect = require('../../utils/connect');

const createKW = KW => {
  return request(app)
    .post('/api/v1/kewwords')
    .send(KW)
    .then(res => res.body);
};

describe('Keyword REST tests', () => {
  beforeAll(() => {
    return connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a KW via post', () => {
    return request(app)
      .post('/api/v1/keywords')
      .send({ keyword: 'smoldering' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          keyword: 'smoldering',
          __v: 0
        });
      });
  });
});
