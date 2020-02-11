require('dotenv').config();
const app = require('../../app');
const mongoose = require('mongoose');
const request = require('supertest');
const connect = require('../../utils/connect');
const getKWList = require('../../utils/getKWList');
const getRandKW = require('../../utils/getRandKwfromKWList');

const createKW = KW => {
  return request(app)
    .post('/api/v1/keywords')
    .send(KW)
    .then(res => res.body);
};

describe('getKWList tests', () => {
  beforeAll(() => {
    return connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it.skip('can grabs a list of keywords', async() => {
    await createKW({ keyword: 'none' });
    await createKW({ keyword: 'ever' });
    await createKW({ keyword: 'other' });


    getKWList().then(res => {
      expect(res).toEqual([
        { __v: 0, _id: expect.any(String), keyword: 'none' },
        { __v: 0, _id: expect.any(String), keyword: 'ever' },
        { __v: 0, _id: expect.any(String), keyword: 'other' }
      ]);
    });
  });

  it('takes a promise containing an array of KWs and returns a single keyword asynchronously', async() => {
    //ARRANGE

    //create 3 keywords
    await createKW({ keyword: 'none' });
    await createKW({ keyword: 'ever' });
    await createKW({ keyword: 'other' });

    //grab the keyword with getKWList
    getKWList().then(res => { 
      //act
      getRandKW(res);

      //assert we expect at 
      expect(res).toEqual(expect.any(Object));
    });

  });

});
