
const {chai: {assert}} = require('../helpers');

const customIterableFactory = require('../fixtures/custom');

const err = require('../helpers/err');

describe('assert: iteratesUntil(value, expected, [message])', function () {
	context('final yielded values match expected values', function () {
		it('passes', function () {
			assert.iteratesUntil([2, 3, 5], [2, 3, 5]);
			assert.iteratesUntil([2, 3, 5], [3, 5]);
			assert.iteratesUntil([2, 3, 5], []);
		});
	});
	context('final yielded values do not match expected values', function () {
		it('throws', function () {
			err(function () {
				assert.iteratesUntil([2, 3, 5], [2, 3]);
			});
		});
	});
	context('a message is passed', function () {
		it('logs message on error', function () {
			err((function () {
				assert.iteratesUntil([2, 3, 5], [2, 3], 'kenya');
			}), 'kenya');
		});
	});
	context('value is not iterable', function () {
		it('throws', function () {
			err(function () {
				assert.iteratesUntil(true, []);
			});
		});
	});
	context('expected is not iterable', function () {
		it('throws', function () {
			err(function () {
				assert.iteratesUntil([], true);
			});
		});
	});
});

describe('assert: doesNotIterateUntil(value, expected, [message])', function () {
	context('final yielded do not values match expected values', function () {
		it('passes', function () {
			assert.doesNotIterateUntil([2, 3, 5], [2, 3]);
		});
	});
	context('final yielded values match expected values', function () {
		it('throws', function () {
			err(function () {
				assert.doesNotIterateUntil([2, 3, 5], [2, 3, 5]);
			});
			err(function () {
				assert.doesNotIterateUntil([2, 3, 5], [3, 5]);
			});
			err(function () {
				assert.doesNotIterateUntil([2, 3, 5], []);
			});
		});
	});
	context('a message is passed', function () {
		it('logs message on error', function () {
			err((function () {
				assert.doesNotIterateUntil([2, 3, 5], [3, 5], 'tanzania');
			}), 'tanzania');
		});
	});
	context('value is not iterable', function () {
		it('throws', function () {
			err(function () {
				assert.doesNotIterateUntil(true, []);
			});
		});
	});
	context('expected is not iterable', function () {
		it('throws', function () {
			err(function () {
				assert.doesNotIterateUntil([], true);
			});
		});
	});
});

describe('assert: deepIteratesUntil(value, expected, [message])', function () {
	context('final yielded values deeply equal expected values', function () {
		it('passes', function () {
			assert.deepIteratesUntil([
				{
					id: 1
				},
				{
					id: 2
				}
			], [
				{
					id: 2
				}
			]);
		});
	});
	context('final yielded values do not deeply equal expected values', function () {
		it('throws', function () {
			err(function () {
				assert.deepIteratesUntil([
					{
						id: 1
					},
					{
						id: 2
					}
				], [
					{
						id: 1
					}
				]);
			});
		});
	});
});

describe('assert: doesNotDeepIterateUntil(value, expected, [message])', function () {
	context('final yielded values do not deeply equal expected values', function () {
		it('passes', function () {
			assert.doesNotDeepIterateUntil([
				{
					id: 1
				},
				{
					id: 2
				}
			], [
				{
					id: 1
				}
			]);
		});
	});
	context('final yielded values deeply equal expected values', function () {
		it('throws', function () {
			err(function () {
				assert.doesNotDeepIterateUntil([
					{
						id: 1
					},
					{
						id: 2
					}
				], [
					{
						id: 2
					}
				]);
			});
		});
	});
	context('iterator ed by @@iterator is not itself iterable', function () {
		it('works correctly', function () {
			var iterable;
			iterable = customIterableFactory();
			err(function () {
				assert.iteratesUntil(iterable, [3, 5]);
			});
			assert.iteratesUntil(iterable, [1, 2]);
		});
	});
});
