const request = require('supertest');
const app = require('../../app');
require('dotenv').config();
const chance = require('chance')();
const mongoose = require('mongoose');
const connect = require('../../utils/connect');
const keyword = require('../../models/Keywords');
const npc = require('../../models/NPC');
// const anyString = expect.any(String);

//ok are these mocks actually hitting your db
function createKW() {
  return keyword.create({
    keyword: chance.name()
  });
}

function createNPC(keyword) {
  return npc.create({
    name: chance.name(),
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
          name: expect.any(String),
          __v: 0
        });
      });
  });

  it('can get an NPC by an :id', () => {
    return createKW().then(keyword => {
      return createNPC(keyword)
        .then(NPC => {
          return request(app).get(`/api/v1/npcs/${NPC._id}`);
        })
        .then(res => {
          expect(res.body).toEqual({
            __v: 0,
            _id: expect.any(String),
            description: [expect.any(Object)],
            name: expect.any(String)
          });
        });
    });
  });

  it('can get a list of NPCs via gen get', async () => {
    return createKW().then(keyword => {
      return createNPC(keyword)
        .then(() => {
          return request(app).get('/api/v1/npcs/');
        })
        .then(res => {
          expect(res.body).toEqual([
            {
              __v: 0,
              _id: expect.any(String),
              description: [expect.any(Object)],
              name: expect.any(String)
            }
          ]);
        });
    });
  });

  it('can patch an NPC name by id', async () => {
    return createKW().then(keyword => {
      return createNPC(keyword)
        .then(npc => {
          return request(app)
            .patch(`/api/v1/npcs/${npc._id}`)
            .send({ name: 'jeeves' });
        })
        .then(res => {
          expect(res.body).toEqual({
            _id: expect.any(String),
            __v: 0,
            name: 'jeeves',
            description: [expect.any(Object)]
          });
        });
    });
  });
});
