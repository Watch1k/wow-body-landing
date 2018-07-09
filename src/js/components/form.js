import Popup from 'vintage-popup';
import { css } from '../modules/dev/_helpers';
import { TimelineMax } from 'gsap';

class Form {
  constructor() {
    this.$form = $('.form');
    this.$input = this.$form.find('.form-control');
    this.$textarea = this.$form.find('.form-textarea');
    this.$tyBtn = this.$form.find('.js-init-ty').find('input');
    this.$fileBlock = this.$form.find('.form-group_upload');
    this.$fileInput = this.$fileBlock.find('input');
    this.$fileRemoveBtn = this.$fileBlock.find('.remove-file-btn');

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

    this.$fileInput.on('change', function () {
      if ($(this).val()) {
        _this.$fileBlock.addClass(css.active);
      }
    });

    this.$fileRemoveBtn.on('click', function () {
      _this.$fileInput.replaceWith(_this.$fileInput.val('').clone(true));
      _this.$fileBlock.removeClass(css.active);
    });
  }

  initPopupThanks() {
    const _this = this;

    this.$tyBtn.on('submit', function (e) {
      e.preventDefault();
      const $thisForm = $(this).closest('form')[0];

      Popup.closeAllPopups();
      const popupInstance = $('.thanks-popup__btn').popup();
      popupInstance.open();

      setTimeout(() => {
        popupInstance.close();
      }, 2000);

      $thisForm.reset();
      _this.checkFill();
    });
  }
}

export default new Form();
