const request = require('supertest');
const app = require('../../app');
require('dotenv').config();
const chance = require('chance')();
const mongoose = require('mongoose');
const connect = require('../../utils/connect');
const keyword = require('../../models/Keywords');
const npc = require('../../models/NPC');
const anyString = expect.any(String);

function createKW() {
  return keyword.create({
    keyword: chance.name()
  });
}

function createNPC(keyword) {
  return npc.create({
    name: 'susan',
    description: [keyword._id]
  });
}

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
          description: expect.any(Object),
          name: 'susan',
          __v: 0
        });
      });
  });

  it('can create an NPC with description via POST', async () => {
    return createKW().then(keyword => {
      return createNPC(keyword)
        .then(NPC => {
          return request(app)
            .post('/api/v1/npcs')
            .send(NPC);
        })
        .then(res => {
          expect(res.body).toEqual({
            name: 'susan',
            __v: 0,
            _id: anyString,
            description: [expect.any(Object)]
          });
        });
    });
  });
});
