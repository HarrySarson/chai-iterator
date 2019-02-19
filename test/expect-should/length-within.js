const {infiniteGenerator} = require('../fixtures');

const {err} = require('../helpers');

describe('expect/should: iterate.for.length.within(min, max)', function () {
	it('passes if the target has lenght between @min and @max, inclusive', function () {
		[2, 3, 5].should.iterate.for.length.within(2, 4);
		[2, 3, 5].should.iterate.for.length.within(3, 3);
	});
	it('throws if the target does not have length between @min and @max, inclusive', function () {
		err(function () {
			[2, 3, 5].should.iterate.for.length.within(0, 2);
		});
		err(function () {
			[2, 3, 5].should.iterate.for.length.within(4, 6);
		});
	});
	it('works on infinite iterables', function () {
		err(function () {
			infiniteGenerator().should.iterate.for.length.within(200, 300);
		});
	});
	it('maintains original assertion', function () {
		[2, 3, 5].should.have.length.within(2, 4);
		err(function () {
			[2, 3, 5].should.have.length.within(4, 5);
		});
	});
});

describe('expect/should: not.iterate.for.length.within(n)', function () {
	it('throws if the target has length between @min and @max, inclusive', function () {
		[2, 3, 5].should.not.iterate.for.length.within(0, 2);
		[2, 3, 5].should.not.iterate.for.length.within(4, 6);
	});
	it('passes if the target does not have length between @min and @max, inclusive', function () {
		err(function () {
			[2, 3, 5].should.not.iterate.for.length.within(2, 4);
		});
		err(function () {
			[2, 3, 5].should.not.iterate.for.length.within(3, 3);
		});
	});
	it('works on infinite iterables', function () {
		infiniteGenerator().should.not.iterate.for.length.within(200, 300);
	});
});
