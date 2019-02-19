
const err = require('../helpers/err');

const customIterableFactory = require('../fixtures/custom');

describe('expect/should: iterate.until(iterable)', function () {
	context('final values yielded by target match iterable', function () {
		it('passes', function () {
			[2, 3, 5].should.iterate.until([2, 3, 5]);
			[2, 3, 5].should.iterate.until([3, 5]);
			[2, 3, 5].should.iterate.until([]);
			'abcdefg'.should.iterate.until('efg');
		});
		it('throws when negated', function () {
			err(function () {
				[2, 3, 5].should.not.iterate.until([2, 3, 5]);
			});
			err(function () {
				[2, 3, 5].should.not.iterate.until([3, 5]);
			});
			err(function () {
				[2, 3, 5].should.not.iterate.until([]);
			});
			err(function () {
				'abcdefg'.should.not.iterate.until('efg');
			});
		});
	});
	context('final values yielded by target do not match iterable', function () {
		it('throws', function () {
			err(function () {
				[2, 3, 5].should.iterate.until([2, 3]);
			});
		});
		it('passes when negated', function () {
			[2, 3, 5].should.not.iterate.until([2, 3]);
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
			].should.deep.iterate.until([
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
			].should.not.iterate.until([
				{
					id: 3
				}
			]);
		});
	});
	context('iterate flag is not set', function () {
		it('throws whether negated or not', function () {
			err(function () {
				[2, 3, 5].should.until([3, 5]);
			});
			err(function () {
				[2, 3, 5].should.not.until([2, 3]);
			});
		});
	});
	context('iterator ed by @@iterator is not itself iterable', function () {
		it('works correctly', function () {
			const iterable = customIterableFactory();
			err(function () {
				iterable.should.iterate.until([3, 5]);
			});
			iterable.should.iterate.until([1, 2]);
		});
	});
});
