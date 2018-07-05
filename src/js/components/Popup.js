import { $header, css } from '../modules/dev/_helpers';
import Popup from 'vintage-popup';

class Popups {
  constructor() {
    this.$popup = $('[data-popup-target]');

    this.init();
  }

  init() {
    this.$popup.on('click tap', function (e) {
      e.preventDefault();
      $header.addClass(css.noTransition);
    });
   
    $('.js-modal-close').on('click tap', function (e) {
      e.preventDefault();
      $header.removeClass(css.noTransition);
    });
   
    this.$popup.popup({
      closeOnEsc: false,
      closeBtnSelector: '.js-popup-close',
      lockScreenEl: 'body, header',
      afterClose: () => {
        $header.removeClass(css.noTransition);
      }
    });
  }
}

export default new Popups();
