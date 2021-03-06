const request = require('supertest');
const app = require('../../app');

require('dotenv').config();
const mongoose = require('mongoose');
const connect = require('../../utils/connect');

const createKW = KW => {
  return request(app)
    .post('/api/v1/keywords')
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

  it.skip('can create a KW via post', async() => {
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

  it.skip('can get all KWs via general get', async() => {
    const keyword = await Promise.all([
      createKW({ keyword: 'isolated' }),
      createKW({ keyword: 'busy' })
    ]);

    return request(app)
      .get('/api/v1/keywords')
      .then(res => {
        expect(res.body).toEqual(keyword);
      });
  });

  it.skip('can get a single KW by id', async() => {
    const keyword = await createKW({ keyword: 'restless' });
    return request(app)
      .get(`/api/v1/keywords/${keyword._id}`)
      .then(res => {
        expect(res.body).toEqual(keyword);
      });
  });

  it('can delete a kw by id', async() => {
    const keyword = await createKW({ keyword: 'bitter ' });
    return request(app)
      .delete(`/api/v1/keywords/${keyword._id}`)
      .then(res => {
        expect(res.body).toEqual(keyword);
      });
  });
});
