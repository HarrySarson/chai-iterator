
const {chai: {assert}} = require('../helpers');

const customIterableFactory = require('../fixtures/custom');

const err = require('../helpers/err');

describe('assert: iteratesOver(value, expected, [message])', function () {
	context('value yields exactly the same values as expected', function () {
		it('passes', function () {
			assert.iteratesOver([2, 3, 5], [2, 3, 5]);
		});
	});
	context('value does not yield exactly the same values as expected', function () {
		it('throws', function () {
			err(function () {
				assert.iteratesOver([2, 3, 5], [2, 3, 5, 7]);
			});
			err(function () {
				assert.iteratesOver([2, 3, 5], [2, 3, 6]);
			});
			err(function () {
				assert.iteratesOver([2, 3, 5], [2, 3]);
			});
			err(function () {
				assert.iteratesOver([2, 3, 5], [3, 5]);
			});
		});
	});
	context('number of yielded values is much larger than expected', function () {
		it('truncates actual values in error message', function () {
			err((function () {
				assert.iteratesOver([2, 3, 5, 7, 11], [2]);
			}), '...');
		});
	});
	context('a message is passed', function () {
		it('logs message on error', function () {
			err((function () {
				assert.iteratesOver([2, 3, 5], [2, 3, 6], 'ecuador');
			}), 'ecuador');
		});
	});
	context('value is not iterable', function () {
		it('throws', function () {
			err(function () {
				assert.iteratesOver(true, []);
			});
		});
	});
	context('expected is not iterable', function () {
		it('throws', function () {
			err(function () {
				assert.iteratesOver([], true);
			});
		});
	});
});

describe('assert: doesNotIterateOver(value, expected, [message])', function () {
	context('value does not yields exactly the same values as expected', function () {
		it('passes', function () {
			assert.doesNotIterateOver([2, 3, 5], [2, 3, 5, 7]);
			assert.doesNotIterateOver([2, 3, 5], [2, 3, 6]);
			assert.doesNotIterateOver([2, 3, 5], [2, 3]);
			assert.doesNotIterateOver([2, 3, 5], [3, 5]);
		});
	});
	context('value yields exactly the same values as expected', function () {
		it('throws', function () {
			err(function () {
				assert.doesNotIterateOver([2, 3, 5], [2, 3, 5]);
			});
		});
	});
	context('a message is passed', function () {
		it('logs message on error', function () {
			err((function () {
				assert.doesNotIterateOver([2, 3, 5], [2, 3, 5], 'bolivia');
			}), 'bolivia');
		});
	});
	context('value is not iterable', function () {
		it('throws', function () {
			err(function () {
				assert.doesNotIterateOver(true, []);
			});
		});
	});
	context('expected is not iterable', function () {
		it('throws', function () {
			err(function () {
				assert.doesNotIterateOver([], true);
			});
		});
	});
});

describe('assert: deepIteratesOver(value, expected, [message])', function () {
	context('initial yielded values deeply equal expected values', function () {
		it('passes', function () {
			assert.deepIteratesOver([
				{
					id: 1
				},
				{
					id: 2
				}
			], [
				{
					id: 1
				},
				{
					id: 2
				}
			]);
		});
	});
	context('initial yielded values do not deeply equal expected values', function () {
		it('throws', function () {
			err(function () {
				assert.deepIteratesOver([
					{
						id: 1
					},
					{
						id: 2
					}
				], [
					{
						id: 2
					},
					{
						id: 1
					}
				]);
			});
		});
	});
});

describe('assert: doesNotDeepIterateOver(value, expected, [message])', function () {
	context('initial yielded values do not deeply equal expected values', function () {
		it('passes', function () {
			assert.doesNotDeepIterateOver([
				{
					id: 1
				},
				{
					id: 2
				}
			], [
				{
					id: 2
				},
				{
					id: 1
				}
			]);
		});
	});
	context('initial yielded values deeply equal expected values', function () {
		it('throws', function () {
			err(function () {
				assert.doesNotDeepIterateOver([
					{
						id: 1
					},
					{
						id: 2
					}
				], [
					{
						id: 1
					},
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
				assert.iteratesOver(iterable, [2, 3, 5]);
			});
			assert.iteratesOver(iterable, [0, 1, 2]);
		});
	});
});
