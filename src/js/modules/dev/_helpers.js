/**
 * Commonly used constants and functions.
 *
 * @module Helpers
 */
import $ from 'jquery';
/**
 * Cache body DOM element.
 *
 * @constant
 * @type {jQuery}
 */
export const $body = $('body');

/**
 * Cache main DOM element.
 *
 * @constant
 * @type {jQuery}
 */
export const $main = $('main');

/**
 * Cache document.
 *
 * @constant
 * @type {jQuery}
 */
export const $document = $(document);

/**
 * Cache window.
 *
 * @constant
 * @type {jQuery}
 */
export const $window = $(window);

/**
 * Cache header.
 *
 * @constant
 * @type {jQuery}
 */
export const $header = $('header');

/**
 * Cache footer.
 *
 * @constant
 * @type {jQuery}
 */
export const $footer = $('footer');

/**
 * Elements for cross-browser window scroll.
 *
 * @constant
 * @type {jQuery}
 */
export const $scrolledElements = $('html, body');

/**
 * Window width.
 *
 * @constant
 * @type {Number}
 */
export const winWidth = $window.width();

/**
 * Detect current page.
 *
 * @constant
 * @type {String}
 */
export const currentPage = $body.find('main').data('page');

/**
 * Toggle class on specified element on click.
 *
 * @param {jQuery} clickHandler
 * @param {jQuery} element
 * @param {String} [className='active']
 */
export const toggleClass = (clickHandler, element, className = css.active) => {
	clickHandler.on('click tap', () => element.toggleClass(className));
};

/**
 * Check if element is in viewport.
 *
 * @param {jQuery} $element
 * @param {Boolean} [fullyInView = false] - element should be fully in viewport?
 * @param {Number} [offsetTop = 0]
 * @returns {Boolean}
 */
export const isScrolledIntoView = ($element, offsetTop = 0, fullyInView = false) => {
	const pageTop = $window.scrollTop();
	const pageBottom = pageTop + $window.height();
	const elementTop = $element.offset().top;
	const elementBottom = elementTop + $element.height();
	
	if (fullyInView) return ((pageTop < elementTop) && (pageBottom > elementBottom));
	
	return (((elementTop + offsetTop) <= pageBottom) && (elementBottom >= pageTop));
};

/**
 * Check specified item to be target of the event.
 *
 * @param {Object} e - Event object.
 * @param {jQuery} item - Item to compare with.
 * @returns {Boolean} - Indicate whether clicked target is the specified item or not.
 */
export const checkClosest = (e, item) => $(e.target).closest(item).length > 0;

/**
 * Match media device indicator.
 */
export class Resp {
	/**
	 * Get window's current width.
	 *
	 * @get
	 * @static
	 * @return {Number}
	 */
	static get currWidth() {
		return window.innerWidth;
	}
	
	/**
	 * Detect touch events.
	 *
	 * @get
	 * @static
	 * @return {Boolean}
	 */
	static get isTouch() {
		return 'ontouchstart' in window;
	}
	
	/**
	 * Detect desktop device.
	 *
	 * @get
	 * @static
	 * @return {Boolean}
	 */
	static get isDesk() {
		return window.matchMedia(`(min-width: 1199px)`).matches;
	}

  static get isMobiles() {
    return window.matchMedia(`(max-width: 1023px)`).matches;
  }

	/**
	 * Detect tablet device.
	 *
	 * @get
	 * @static
	 * @return {Boolean}
	 */
	static get isTablet() {
		return window.matchMedia(`(min-width: 768px) and (max-width: 1199px)`).matches;
	}
	
	/**
	 * Detect mobile device.
	 *
	 * @get
	 * @static
	 * @return {Boolean}
	 */
	static get isMobile() {
		return window.matchMedia(`(max-width: 767px)`).matches;
	}
	
	/**
	 * Detect mobile device orientation.
	 *
	 * @get
	 * @static
	 * @return {Boolean}
	 */
	static get isPortrait() {
		return window.matchMedia(`(orientation: portrait)`).matches;
	}
}

/**
 * Css class names.
 *
 * @constant
 * @type {Object}
 */
export const css = {
	noTouch: 'no-touch',
	reload: 'is-reload',
	active: 'is-active',
	visible: 'is-visible',
	hidden: 'is-hidden',
	cursor: 'is-cursor',
	hasAnim: 'has-anim',
	small: 'is-small',
	medium: 'is-medium',
	left: 'is-left',
	right: 'is-right',
	disabled: 'is-disabled',
	mark: 'is-mark',
	overflow: 'is-overflow',
	dark: 'is-dark',
	transitionOff: 'transition-off',
	relative: 'is-relative',
	hide: 'is-hide',
	bg: 'is-bg',
	playing: 'is-playing',
	fill: 'is-fill',
  selected: 'is-selected',
	fixed: 'is-fixed',
	locked: 'is-locked',
	error: 'has-error',
	noTransition: 'no-transition',
	menuActive: 'menu-active',
  animsDisabled: 'anims-disabled'
};

/**
 * Generate string of random letters.
 *
 * @param {Number} length
 */
export const randomString = (length = 10) => Math.random().toString(36).substr(2, length);

/**
 * Returns a function, that, as long as it continues to be invoked, will not be triggered.
 *
 * @param {Function} func
 * @param {Object} context
 * @param {Number} wait
 * @param {Boolean} [immediate]
 * @returns {Function}
 */
export const debounce = (func, context, wait, immediate) => {
	let timeout;
	
	return () => {
		const args = arguments;
		
		const later = () => {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

/**
 * Throttle function.
 *
 * @param {Function} fn
 * @param {Number} [threshold]
 * @param {Object} [scope]
 * @returns {Function}
 */
export const throttle = (fn, threshold = 250, scope) => {
	let last, deferTimer;
	
	return function () {
		const context = scope || this;
		const now = +new Date;
		const args = arguments;
		
		if (last && now < last + threshold) {
			clearTimeout(deferTimer);
			deferTimer = setTimeout(() => {
				last = now;
				fn.apply(context, args);
			}, threshold);
		} else {
			last = now;
			fn.apply(context, args);
		}
	};
};

/**
 * Converts a hex color number to 16 number
 *
 * @param hex {String}
 * @return {Number}
 */
export const hex2number = (hex) => parseInt(hex.substring(1), 16);

/**
 * Get a random integer between `min` and `max`.
 *
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {int} a random integer
 */
export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
export const detectIE = () => {
	let ua = window.navigator.userAgent;
	
	let msie = ua.indexOf('MSIE ');
	if (msie > 0) {
		// IE 10 or older => return version number
		return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	}
	
	let trident = ua.indexOf('Trident/');
	if (trident > 0) {
		// IE 11 => return version number
		let rv = ua.indexOf('rv:');
		return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	}
	
	let edge = ua.indexOf('Edge/');
	if (edge > 0) {
		// Edge (IE 12+) => return version number
		return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	}
	
	// other browser
	return false;
};
