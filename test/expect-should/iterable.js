
const err = require('../helpers/err');

describe('expect/should: iterable', function () {
	context('target has an @@iterator method', function () {
		it('passes', function () {
			[2, 3, 5].should.be.iterable;
			'abcdefg'.should.be.iterable;
		});
		it('throws when negated', function () {
			err(function () {
				[2, 3, 5].should.not.be.iterable;
			});
			err(function () {
				'abcdefg'.should.not.be.iterable;
			});
		});
	});
	context('target lacks an @@iterator method', function () {
		it('throws', function () {
			err(function () {
				235.0.should.be.iterable;
			});
			err(function () {
				true.should.be.iterable;
			});
		});
		it('passes when negated', function () {
			235.0.should.not.be.iterable;
			true.should.not.be.iterable;
		});
	});
});
