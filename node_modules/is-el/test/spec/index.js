'use strict';

/**
 * is-el mocha tests - https://mochajs.org/
 */
describe('isEl', function() {
	it('should be a function', function() {
		assert.equal(typeof isEl, 'function');
	});

	it('should handle false values properly', function() {
		assert.equal(isEl(), false);
		assert.equal(isEl(''), false);
		assert.equal(isEl([]), false);
		assert.equal(isEl('img'), false);
		assert.equal(isEl('<img>'), false);
		assert.equal(isEl(window), false);
		assert.equal(isEl(document), false);
	});

	it('should handle true values properly', function() {
		assert.equal(isEl(document.body), true);
		assert.equal(isEl(document.documentElement), true);
		assert.equal(isEl(document.createElement('img')), true);
	});
});
