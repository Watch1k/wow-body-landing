import { css } from '../modules/dev/_helpers';

class Form {
	constructor() {
		this.$form = $('.form');
		this.$input = this.$form.find('.form-control');
		this.$textarea = this.$form.find('.form-textarea');

		this.init();
	}
	
	init() {
		this.checkFill();
		this.removeError();
	}

	checkFill() {
		this.$input.add(this.$textarea).each(function () {
			checkInput($(this));
		});
		this.$input.add(this.$textarea).blur(function () {
			checkInput($(this));
		});
		
		function checkInput(el) {
			if (el.val() !== '') {
				el.addClass(css.fill);
			} else {
				el.removeClass(css.fill);
			}
		}
	}
	
	removeError() {
		this.$input.on('click focus', (ev) => {
			$(ev.currentTarget).parent().removeClass(css.error);
		});
	}
}

export default new Form();
