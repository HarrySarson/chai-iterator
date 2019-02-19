
const {AssertionError} = require('chai');

module.exports = function (fn, msg) {
	fn.should.throw(AssertionError, msg);
};
