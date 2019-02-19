
const err = require('../helpers/err');

const customIterableFactory = require('../fixtures/custom');

describe('expect/should: iterate.from(iterable)', function () {
	context('initial values yielded by target match iterable', function () {
		it('passes', function () {
			[2, 3, 5].should.iterate.from([2, 3, 5]);
			[2, 3, 5].should.iterate.from([2, 3]);
			[2, 3, 5].should.iterate.from([]);
			'abcdefg'.should.iterate.from('abc');
		});
		it('throws when negated', function () {
			err(function () {
				[2, 3, 5].should.not.iterate.from([2, 3, 5]);
			});
			err(function () {
				[2, 3, 5].should.not.iterate.from([2, 3]);
			});
			err(function () {
				[2, 3, 5].should.not.iterate.from([]);
			});
			err(function () {
				'abcdefg'.should.not.iterate.from('abc');
			});
		});
	});
	context('initial values yielded by target do not match iterable', function () {
		it('throws', function () {
			err(function () {
				[2, 3, 5].should.iterate.from([3, 5]);
			});
		});
		it('passes when negated', function () {
			[2, 3, 5].should.not.iterate.from([3, 5]);
		});
	});
	context('deep flag is set', function () {
		it('uses deep equality to compare values', function () {
			[
				{
					id: 2
				},
				{
					id: 3
				}
			].should.deep.iterate.from([
				{
					id: 2
				}
			]);
			[
				{
					id: 2
				},
				{
					id: 3
				}
			].should.not.iterate.from([
				{
					id: 2
				}
			]);
		});
	});
	context('iterate flag is not set', function () {
		it('throws whether negated or not', function () {
			err(function () {
				[2, 3, 5].should.from([2, 3]);
			});
			err(function () {
				[2, 3, 5].should.not.from([3, 5]);
			});
		});
	});
});

context('iterator ed by @@iterator is not itself iterable', function () {
	it('works correctly', function () {
		var iterable;
		iterable = customIterableFactory();
		err(function () {
			iterable.should.iterate.from([2, 3]);
		});
		iterable.should.iterate.from([0, 1]);
	});
});
