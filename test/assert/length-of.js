
const {chai: {assert}} = require('../helpers');

const {customGenerator, infiniteGenerator} = require('../fixtures');

const {err} = require('../helpers');

describe('assert: lengthOf(act, len, [msg])', function () {
	context('@act is an iterable without a length:number property', function () {
		var customIterable;
		customIterable = beforeEach(function () {
			customIterable = customGenerator();
		});
		it('passes if @act has length of @len', function () {
			assert.lengthOf(customIterable, 3);
		});
		it('throws if @act does not have length of @n', function () {
			err(function () {
				assert.lengthOf(customIterable, 4);
			});
			err(function () {
				assert.lengthOf(customIterable, 2);
			});
		});
		it('works on infinite iterables', function () {
			err(function () {
				assert.lengthOf(infiniteGenerator(), 200);
			});
		});
	});
	context('@act has a length:number property', function () {
		it('uses original method', function () {
			assert.lengthOf([2, 3, 5], 3);
			err(function () {
				assert.lengthOf([2, 3, 5], 4);
			});
		});
	});
});
