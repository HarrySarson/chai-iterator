
const {chai: {assert}} = require('../helpers');

const err = require('../helpers/err');

describe('assert: isIterable(value, [message])', function () {
	context('value is an iterable object', function () {
		it('passes', function () {
			assert.isIterable([2, 3, 5]);
			assert.isIterable('abcdefg');
		});
	});
	context('value is not an iterable object', function () {
		it('throws', function () {
			err(function () {
				assert.isIterable(235);
			});
			err(function () {
				assert.isIterable(true);
			});
		});
	});
	context('a message is passed', function () {
		it('logs message on error', function () {
			err((function () {
				assert.isIterable(235, 'norway');
			}), 'norway');
		});
	});
});

describe('assert: isNotIterable(value, [message])', function () {
	context('value is an iterable object', function () {
		it('passes', function () {
			assert.isNotIterable(235);
			assert.isNotIterable(true);
		});
	});
	context('value is not an iterable object', function () {
		it('throws', function () {
			err(function () {
				assert.isNotIterable([2, 3, 5]);
			});
			err(function () {
				assert.isNotIterable('abcdefg');
			});
		});
	});
	context('a message is passed', function () {
		it('logs message on error', function () {
			err((function () {
				assert.isNotIterable([2, 3, 5], 'sweden');
			}), 'sweden');
		});
	});
});
