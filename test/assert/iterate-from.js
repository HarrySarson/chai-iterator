
const {chai: {assert}} = require('../helpers');

const customIterableFactory = require('../fixtures/custom');

const err = require('../helpers/err');

describe('assert: iteratesFrom(value, expected, [message])', function () {
	context('initial yielded values match expected values', function () {
		it('passes', function () {
			assert.iteratesFrom([2, 3, 5], [2, 3, 5]);
			assert.iteratesFrom([2, 3, 5], [2, 3]);
			assert.iteratesFrom([2, 3, 5], []);
		});
	});
	context('initial yielded values do not match expected values', function () {
		it('throws', function () {
			err(function () {
				assert.iteratesFrom([2, 3, 5], [3, 5]);
			});
		});
	});
	context('a message is passed', function () {
		it('logs message on error', function () {
			err((function () {
				assert.iteratesFrom([2, 3, 5], [3, 5], 'ukraine');
			}), 'ukraine');
		});
	});
	context('value is not iterable', function () {
		it('throws', function () {
			err(function () {
				assert.iteratesFrom(true, []);
			});
		});
	});
	context('expected is not iterable', function () {
		it('throws', function () {
			err(function () {
				assert.iteratesFrom([], true);
			});
		});
	});
});

describe('assert: doesNotIterateFrom(value, expected, [message])', function () {
	context('initial yielded do not values match expected values', function () {
		it('passes', function () {
			assert.doesNotIterateFrom([2, 3, 5], [3, 5]);
		});
	});
	context('initial yielded values match expected values', function () {
		it('throws', function () {
			err(function () {
				assert.doesNotIterateFrom([2, 3, 5], [2, 3, 5]);
			});
			err(function () {
				assert.doesNotIterateFrom([2, 3, 5], [2, 3]);
			});
			err(function () {
				assert.doesNotIterateFrom([2, 3, 5], []);
			});
		});
	});
	context('a message is passed', function () {
		it('logs message on error', function () {
			err((function () {
				assert.doesNotIterateFrom([2, 3, 5], [2, 3], 'belarus');
			}), 'belarus');
		});
	});
	context('value is not iterable', function () {
		it('throws', function () {
			err(function () {
				assert.doesNotIterateFrom(true, []);
			});
		});
	});
	context('expected is not iterable', function () {
		it('throws', function () {
			err(function () {
				assert.doesNotIterateFrom([], true);
			});
		});
	});
});

describe('assert: deepIteratesFrom(value, expected, [message])', function () {
	context('yielded values deeply equal expected values', function () {
		it('passes', function () {
			assert.deepIteratesFrom([
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
	context('yielded values do not deeply equal expected values', function () {
		it('throws', function () {
			err(function () {
				assert.deepIteratesFrom([
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
});

describe('assert: doesNotDeepIterateFrom(value, expected, [message])', function () {
	context('yielded values do not deeply equal expected values', function () {
		it('passes', function () {
			assert.doesNotDeepIterateFrom([
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
	context('yielded values deeply equal expected values', function () {
		it('throws', function () {
			err(function () {
				assert.doesNotDeepIterateFrom([
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
	context('iterator ed by @@iterator is not itself iterable', function () {
		it('works correctly', function () {
			var iterable;
			iterable = customIterableFactory();
			err(function () {
				assert.iteratesFrom(iterable, [2, 3]);
			});
			assert.iteratesFrom(iterable, [0, 1]);
		});
	});
});
