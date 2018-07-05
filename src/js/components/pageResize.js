import {
	$window,
	throttle,
	Resp
} from '../modules/dev/_helpers';

export class PageResize {

	getResp() {
		if (Resp.isDesk) {
			this.resp = 'desk';
		} else if (Resp.isTablet) {
			this.resp = 'tablet';
		} else if (Resp.isMobile) {
			this.resp = 'mobile';
		}
	}

	init() {
		this.getResp();

    //refresh page
		const refreshPage = throttle(() => {
			//check current Resp
			if (Resp.isDesk) {
				this.currentResp = 'desk';
			} else if (Resp.isTablet) {
				this.currentResp = 'tablet';
			} else if (Resp.isMobile) {
				this.currentResp = 'mobile';
			}

			//compare Resp
			if (this.resp !== this.currentResp) {
				this.resp = this.currentResp;
				location.reload();
			}
		}, 250, this);

		//refresh page on resize
		$window.on('resize', refreshPage);
	}

}

export default new PageResize();
