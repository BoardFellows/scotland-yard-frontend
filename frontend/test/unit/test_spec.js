'use strict';
/* expect */

const app     = require(__dirname + '/../../build/bundle.js');
const angular = require('angular');
const ngMock  = require('angular-mock');

describe('unit testing', function() {
  
  it('should be able to test anything at all', () => {
    expect(true).toEqual(true);
  });
});
