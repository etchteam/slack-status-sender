import { assert } from 'chai';
import fetchMock from 'fetch-mock';
import defaultAwesomeFunction, { awesomeFunction } from '../src';
import getStatus from '../src/getStatus';

describe('Awesome test.', () => {
  it('should test default awesome function', () => {
    const expectedVal = 'I am the Default Awesome Function, fellow comrade! - Dinesh'
    assert(defaultAwesomeFunction('Dinesh') === expectedVal, 'Default not awesome :(');
  });

  it('should test awesome function', () => {
    const expectedVal = 'I am just an Awesome Function'
    assert(awesomeFunction() === expectedVal, 'Named awesome :(');
  });
});

describe('Get status', () => {
  before(() => {
    fetchMock.post('https://slackout.etch.co', {
      "data":{
        "user":{
          "statusText":"Scoping",
          "statusEmoji":":page_facing_up:",
          "__typename":"User"
        }
      }
    });
  });
  it('should get a status', async () => {
    return getStatus({ id: 'U2NK19J0L' }).then((data) => {
      console.log(data);
      assert(data.user && data.user.statusEmoji && data.user.statusText);
    })
  });
  after(() => {
    fetchMock.restore();
  })
});
