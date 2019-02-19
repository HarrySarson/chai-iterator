
const chai = require('chai');

const chaiIterator = require('../..');

chai.use(chaiIterator);

chai.should();

exports.chai = chai;
exports.chaiIterator = chaiIterator;
exports.err = require('./err');
