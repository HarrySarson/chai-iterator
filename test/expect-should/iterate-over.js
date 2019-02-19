
const err = require('../helpers/err');

const customIterableFactory = require('../fixtures/custom');

describe('expect/should: iterate.over(iterable)', function () {
	context('values yielded by target exactly match iterable', function () {
		it('passes', function () {
			[2, 3, 5].should.iterate.over([2, 3, 5]);
			'abcdefg'.should.iterate.over('abcdefg');
		});
		it('throws when negated', function () {
			err(function () {
				[2, 3, 5].should.not.iterate.over([2, 3, 5]);
			});
			err(function () {
				'abcdefg'.should.not.iterate.over('abcdefg');
			});
		});
	});
	context('values yielded by target do not exactly match iterable', function () {
		it('throws', function () {
			err(function () {
				[2, 3, 5].should.iterate.over([2, 3, 5, 7]);
			});
			err(function () {
				[2, 3, 5].should.iterate.over([2, 3, 6]);
			});
			err(function () {
				[2, 3, 5].should.iterate.over([2, 3]);
			});
			err(function () {
				[2, 3, 5].should.iterate.over([3, 5]);
			});
		});
		it('passes when negated', function () {
			[2, 3, 5].should.not.iterate.over([2, 3, 5, 7]);
			[2, 3, 5].should.not.iterate.over([2, 3, 6]);
			[2, 3, 5].should.not.iterate.over([2, 3]);
			[2, 3, 5].should.not.iterate.over([3, 5]);
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
			].should.deep.iterate.over([
				{
					id: 2
				},
				{
					id: 3
				}
			]);
			[
				{
					id: 2
				},
				{
					id: 3
				}
			].should.not.iterate.over([
				{
					id: 2
				},
				{
					id: 3
				}
			]);
		});
	});
	context('iterate flag is not set', function () {
		it('throws whether negated or not', function () {
			err(function () {
				[2, 3, 5].should.over([2, 3, 5]);
			});
			err(function () {
				[2, 3, 5].should.not.over([2, 3, 6]);
			});
		});
	});
	context('iterator ed by @@iterator is not itself iterable', function () {
		it('works correctly', function () {
			var iterable;
			iterable = customIterableFactory();
			err(function () {
				iterable.should.iterate.over([2, 3, 5]);
			});
			iterable.should.iterate.over([0, 1, 2]);
		});
	});
});
