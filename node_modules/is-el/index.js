'use strict';

/**
 * @module
 * isEl
 *
 * @description
 * Determine if passed value is a valid element
 *
 * @param {element} element - Value to evaluate
 * @return {boolean} - Return true if value is an element, otherwise false
 */
module.exports = function (value) {
	return (value !== null)
		&& (typeof value === 'object')
		&& (value.nodeType === Node.ELEMENT_NODE)
		&& (typeof value.style === 'object')
		&& (typeof value.ownerDocument === 'object');
};
