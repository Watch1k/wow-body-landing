import ToTop from '../components/To-top';

export default class Home {
  constructor() {
    this.init();
  }
	
  init() {
    new ToTop('.team');
  }
}
