const request = require('supertest');
const app = require('../../app');
require('dotenv').config();
// const chance = require('chance')();
const mongoose = require('mongoose');
const connect = require('../../utils/connect');
// const keyword = require('../../models/Keywords');
// const NPC = require('../../models/NPC');

describe('General NPC REST tests', () => {
  beforeAll(() => {
    return connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a NPC with only name via POST', async () => {
    return request(app)
      .post('/api/v1/npcs')
      .send({ name: 'susan', description: [] })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          description: [],
          name: 'susan',
          __v: 0
        });
      });
  });

  // it('can probably create an NPC with description via POST', async () => {
  //   return request(app)
  //     .post('/api/v1/npcs')
  //     .send({ name: 'susan', description: ['angry'] });
  // });
});
