/**
 * [すべての基幹となるオブジェクト]
 *
 * @type {[Object]}
 */
var samba = samba || {};
/**
 * [名前空間定義]
 * @namespace
 */
samba.constants = {
	/**
 * [ACTIVE_CLASS 活性のクラス]
 * @type {String}
 */
	ACTIVE_CLASS: 'is-active',
	/**
 * [FIX_CLASS fix時のクラス]
 * @type {String}
 */
	FIX_CLASS: 'is-fix'
};

samba.goScroll = function (options) {
	'use strict'
	var $target, scrollBar, adjustVal, scrollTopVal;
	$target = $($(options.target).attr('href'));
	scrollBar = 'body, html';
	adjustVal = options.adjustVal;
	scrollTopVal = $target.offset().top - adjustVal;
	window.setTimeout(function () {
		$(scrollBar).animate({
			scrollTop: scrollTopVal
		}, 1000, 'swing' )
	});
};

/**
 * [Carousel カルーセル用クラス]
 * @constructor
 * @return {Void} 何も返さない.
 */
samba.Carousel = function() {
	'use strict';
	var self = this;
	self.$carousel = $(options.targetID);
	self.$next = $(options.nextID);
	self.$prev = $(options.prevID);
	self.duration = 200;
};
samba.Carousel.prototype.prev = function() {
};
samba.Carousel.prototype.next = function() {
};
samba.Carousel.prototype.changeIndex = function() {
};

/**
 * [Modal モーダル用クラス]
 * @constructor
 * @param {String} options.targetID 対象となるオブジェクトのセレクタ.
 * @return {Void} 何も返さない.
 */
samba.Modal = function(options) {
	'use strict';
	var self = this;
	self.$target = $(options.target);
	self.$body = $('.body');
	self.$win = $(window);
	self.tempScroll = 0;
};

/**
 * [open モーダルを開く]
 * @return {void}
 */
samba.Modal.prototype.open = function () {
	'use strict';
	var self = this;
	// モーダル表示
	self.$target.addClass(samba.constants.ACTIVE_CLASS);
	// 背景固定
	self.controlBackgroundFix();
};

/**
 * [close モーダルを閉じる]
 * @return {void}
 */
samba.Modal.prototype.close = function () {
	'use strict';
	var self = this;
	// モーダル非表示
	self.$target.removeClass(samba.constants.ACTIVE_CLASS);
	// 背景固定
	self.controlBackgroundFix();
};

/**
 * [controlBackgroundFix 背景の固定制御を行う]
 * @return {void}
 */
samba.Modal.prototype.controlBackgroundFix = function () {
	'use strict';
	var self = this;
	if (self.$target.hasClass(samba.constants.ACTIVE_CLASS)) {
		self.tempScroll = $(document).scrollTop();
		self.$body.css({
			top: -self.tempScroll
		});
		// 背景固定用クラスを設定
		self.$body.addClass(samba.constants.FIX_CLASS);
	} else {
		// 背景固定用クラスを削除
		self.$body.removeClass(samba.constants.FIX_CLASS);
		$(document).scrollTop(self.tempScroll);
	}
};

/*
* controller
*/
// スムーススクロール
$(document).delegate('.js-smoothscroll', 'click', function(evt) {
	samba.goScroll({
		target: this,
		adjustVal: '50'
	});
	evt.preventDefault();
});
// モーダルを開く
$('#js-menu').delegate('.js-modal-open', 'click', function (evt) {
	var modal = new samba.Modal({
		target: '#js-menu_modal'
	});
	// モーダルを表示
	modal.open();
	evt.preventDefault();
});
// モーダルを閉じる
$('#js-menu_modal').delegate('.js-modal-close', 'click', function (evt) {
	var modal = new samba.Modal({
		target: '#js-menu_modal'
	});
	// モーダル閉じる
	modal.close();
	evt.preventDefault();
});
// 戻るボタン
$mainCarousel.delegate('.js-carousel-prev', 'click', function (evt) {
	evt.preventDefault();
});
// 次へボタン
$mainCarousel.delegate('.js-carousel-next', 'click', function (evt) {
	evt.preventDefault();
});
