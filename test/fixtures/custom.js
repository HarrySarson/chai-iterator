
module.exports = function () {
	return Object.defineProperty({}, Symbol.iterator, {
		value: function () {
			var i;
			i = 0;
			return {
				next: function () {
					return {
						value: i++,
						done: i > 3
					};
				}
			};
		}
	});
};
