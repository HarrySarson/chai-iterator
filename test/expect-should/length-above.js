var infiniteGenerator;

({infiniteGenerator} = require('../fixtures'));

const {err} = require('../helpers');

describe('expect/should: iterate.for.length.above(n)', function () {
	it('passes if the target has length above @n', function () {
		[2, 3, 5].should.iterate.for.length.above(2);
	});
	it('throws if the target does not have length above @n', function () {
		err(function () {
			[2, 3, 5].should.iterate.for.length.above(3);
		});
		err(function () {
			[2, 3, 5].should.iterate.for.length.above(4);
		});
	});
	it('works on infinite iterables', function () {
		infiniteGenerator().should.iterate.for.length.above(200);
	});
	it('maintains original assertion', function () {
		[2, 3, 5].should.have.length.above(2);
		err(function () {
			[2, 3, 5].should.have.length.above(3);
		});
	});
});

describe('expect/should: not.iterate.for.length.above(n)', function () {
	it('throws if the target has length above @n', function () {
		[2, 3, 5].should.not.iterate.for.length.above(3);
		[2, 3, 5].should.not.iterate.for.length.above(4);
	});
	it('passes if the target does not have length above @n', function () {
		err(function () {
			[2, 3, 5].should.not.iterate.for.length.above(2);
		});
	});
	it('works on infinite iterables', function () {
		err(function () {
			infiniteGenerator().should.not.iterate.for.length.above(200);
		});
	});
});
