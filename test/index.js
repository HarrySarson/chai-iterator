
var chaiIterator;

({chaiIterator} = require('./helpers'));

describe('plugin: chai-iterator', function () {
	it('exports a function', function () {
		chaiIterator.should.be.a('function');
	});
});
