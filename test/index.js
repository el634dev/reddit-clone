// test/index.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it } = require('mocha');
const app = require('../server');
chai.use(chaiHttp);
const agent = chai.request.agent(app);

const should = chai.should();

describe('site', () => {
  it('Should have home page', (done) => {
    // Test that the home page loads
    agent
      .get('/')
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        return done(); // Call done if the test completed successfully.
    });
  });
});