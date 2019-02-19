var infiniteGenerator;

({infiniteGenerator} = require('../fixtures'));

const {err} = require('../helpers');

describe('expect/should: iterate.for.lengthOf(n)', function () {
	it('passes if the target has length @n', function () {
		[2, 3, 5].should.iterate.for.lengthOf(3);
	});
	it('throws if the target does not have length @n', function () {
		err(function () {
			[2, 3, 5].should.iterate.for.lengthOf(4);
		});
		err(function () {
			[2, 3, 5].should.iterate.for.lengthOf(2);
		});
	});
	it('works on infinite iterables', function () {
		err(function () {
			infiniteGenerator().should.iterate.for.lengthOf(200);
		});
	});
	it('maintains original assertion', function () {
		[2, 3, 5].should.have.lengthOf(3);
		err(function () {
			[2, 3, 5].should.have.lengthOf(2);
		});
	});
});

describe('expect/should: not.iterate.for.lengthOf(n)', function () {
	it('throws if the target has length @n', function () {
		[2, 3, 5].should.not.iterate.for.lengthOf(4);
		[2, 3, 5].should.not.iterate.for.lengthOf(2);
	});
	it('passes if the target does not have length @n', function () {
		err(function () {
			[2, 3, 5].should.not.iterate.for.lengthOf(3);
		});
	});
	it('works on infinite iterables', function () {
		infiniteGenerator().should.not.iterate.for.lengthOf(200);
	});
});
