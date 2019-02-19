var infiniteGenerator;

({infiniteGenerator} = require('../fixtures'));

const {err} = require('../helpers');

describe('expect/should: iterate.for.length.of.at.least(n)', function () {
	it('passes if the target has length of at least @n', function () {
		[2, 3, 5].should.iterate.for.length.of.at.least(2);
		[2, 3, 5].should.iterate.for.length.of.at.least(3);
	});
	it('throws if the target does not have length of at least @n', function () {
		err(function () {
			[2, 3, 5].should.iterate.for.length.of.at.least(4);
		});
	});
	it('works on infinite iterables', function () {
		infiniteGenerator().should.iterate.for.length.of.at.least(200);
	});
	it('maintains original assertion', function () {
		[2, 3, 5].should.have.length.of.at.least(3);
		err(function () {
			[2, 3, 5].should.have.length.of.at.least(4);
		});
	});
});

describe('expect/should: not.iterate.for.length.of.at.least(n)', function () {
	it('throws if the target has length of at least @n', function () {
		[2, 3, 5].should.not.iterate.for.length.of.at.least(4);
	});
	it('passes if the target does not have length of at least @n', function () {
		err(function () {
			[2, 3, 5].should.not.iterate.for.length.of.at.least(2);
		});
		err(function () {
			[2, 3, 5].should.not.iterate.for.length.of.at.least(3);
		});
	});
	it('works on infinite iterables', function () {
		err(function () {
			infiniteGenerator().should.not.iterate.for.length.of.at.least(200);
		});
	});
});
