var infiniteGenerator;

({infiniteGenerator} = require('../fixtures'));

const {err} = require('../helpers');

describe('expect/should: iterate.for.length.below(n)', function () {
	it('passes if the target has length below @n', function () {
		[2, 3, 5].should.iterate.for.length.below(4);
	});
	it('throws if the target does not have length below @n', function () {
		err(function () {
			[2, 3, 5].should.iterate.for.length.below(2);
		});
		err(function () {
			[2, 3, 5].should.iterate.for.length.below(3);
		});
	});
	it('works on infinite iterables', function () {
		err(function () {
			infiniteGenerator().should.iterate.for.length.below(200);
		});
	});
	it('maintains original assertion', function () {
		[2, 3, 5].should.have.length.below(4);
		err(function () {
			[2, 3, 5].should.have.length.below(3);
		});
	});
});

describe('expect/should: not.iterate.for.length.below(n)', function () {
	it('throws if the target has length below @n', function () {
		[2, 3, 5].should.not.iterate.for.length.below(2);
		[2, 3, 5].should.not.iterate.for.length.below(3);
	});
	it('passes if the target does not have length below @n', function () {
		err(function () {
			[2, 3, 5].should.not.iterate.for.length.below(4);
		});
	});
	it('works on infinite iterables', function () {
		infiniteGenerator().should.not.iterate.for.length.below(200);
	});
});
