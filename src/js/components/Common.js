import objectFitImages from 'object-fit-images';

import './Preloader';
import './Header';
import './Sliders';
import './Anims';
import './Footer';
import './Popup';
import './CTabs';
import PageResize from './pageResize';
import './Dot';
import './form';
import './noTouch';

import '../sections/programs';
import '../sections/events';
import '../sections/shop';

export class Common {
  /**
   * Cache data, make preparations and initialize common scripts.
   */
  constructor() {
    this.init();
  }
  /**
   * Initialize common scripts.
   */
  init() {
    objectFitImages();
    PageResize.init();
  }
}

/** Export initialized common scripts by default */
export default new Common();
