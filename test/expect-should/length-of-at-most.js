const {infiniteGenerator} = require('../fixtures');

const {err} = require('../helpers');

describe('expect/should: iterate.for.length.of.at.most(n)', function () {
	it('passes if the target has length of at most @n', function () {
		[2, 3, 5].should.iterate.for.length.of.at.most(3);
		[2, 3, 5].should.iterate.for.length.of.at.most(4);
	});
	it('throws if the target does not have length of at most @n', function () {
		err(function () {
			[2, 3, 5].should.iterate.for.length.of.at.most(2);
		});
	});
	it('works on infinite iterables', function () {
		err(function () {
			infiniteGenerator().should.iterate.for.length.of.at.most(200);
		});
	});
	it('maintains original assertion', function () {
		[2, 3, 5].should.have.length.of.at.most(3);
		err(function () {
			[2, 3, 5].should.have.length.of.at.most(2);
		});
	});
});

describe('expect/should: not.iterate.for.length.of.at.most(n)', function () {
	it('throws if the target has length of at most @n', function () {
		[2, 3, 5].should.not.iterate.for.length.of.at.most(2);
	});
	it('passes if the target does not have length of at most @n', function () {
		err(function () {
			[2, 3, 5].should.not.iterate.for.length.of.at.most(3);
		});
		err(function () {
			[2, 3, 5].should.not.iterate.for.length.of.at.most(4);
		});
	});
	it('works on infinite iterables', function () {
		infiniteGenerator().should.not.iterate.for.length.of.at.most(200);
	});
});
