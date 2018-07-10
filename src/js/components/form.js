import Popup from 'vintage-popup';
import { css } from '../modules/dev/_helpers';
import { TimelineMax } from 'gsap';

class Form {
  constructor() {
    this.$form = $('.form');
    this.$input = this.$form.find('.form-control');
    this.$textarea = this.$form.find('.form-textarea');
    this.$thanks = $('.js-submit-ty');
    this.$fileBlock = this.$form.find('.file-block');

    this.init();
  }

  init() {
    this.checkFill();
    this.removeError();
    this.initFileHandler();
    this.initPopupThanks();
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

  initFileHandler() {
    const _this = this;

    this.$fileBlock.each(function (i, block) {
      const $block = $(block);
      const $input = $block.find('input');
      const $removeBtn = $block.find('.file-block__remove-btn');
      const $nameField = $block.find('.file-block__name-field');

      $input.on('change', function (e) {
        const $target = $(e.target);
        const fileName = e.target.files[0].name;

        if ($target.val()) {
          _this.$fileBlock.addClass(css.active);
          $nameField.text(fileName);
        }
      });

      $removeBtn.on('click', function () {
        $input.replaceWith($input.val('').clone(true));
        _this.$fileBlock.removeClass(css.active);
        $nameField.text('');
      });
    });
  }

  initPopupThanks() {
    const _this = this;

    this.$thanks.on('submit', function (e) {
      e.preventDefault();
      const $this = $(this);

      Popup.closeAllPopups();
      const thanskPopInstance = $('.thanks-popup__btn').popup();
      thanskPopInstance.open();

      setTimeout(() => {
        thanskPopInstance.close();
      }, 2000);

      $this[0].reset();
      _this.checkFill();
    });
  }
}

export default new Form();
