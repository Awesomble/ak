$(document).ready(function () {

	$('.wrap').css('opacity','1');


	var location = window.location.pathname.substr(1);
	var gnb = $('.gnb li');
	var lnb = $('.lnb');

	function navAction() {
		if (location.indexOf('index') != -1) { // 메인페이지
			gnb.eq(0).addClass('on');
		} else if (location.indexOf('rule') != -1) { // 규칙가이드
			gnb.eq(1).addClass('on');
			lnb.eq(1).remove();
			lnb.eq(2).remove();
			lnb.eq(3).remove();
			lnb.eq(4).remove();			
		} else if (location.indexOf('plan') != -1) { // 설계가이드
			gnb.eq(2).addClass('on');
			lnb.eq(0).remove();
			lnb.eq(2).remove();
			lnb.eq(3).remove();
			lnb.eq(4).remove();			
		} else if (location.indexOf('_libs') != -1) { // 라이브러리
			gnb.eq(3).addClass('on');
			lnb.eq(0).remove();
			lnb.eq(1).remove();
			lnb.eq(4).remove();
		} else if (location.indexOf('accessibility') != -1) { // 웹접근성 점검
			gnb.eq(4).addClass('on');
			lnb.eq(0).remove();
			lnb.eq(1).remove();
			lnb.eq(2).remove();
			lnb.eq(3).remove();
		}
	}

	function lnbAction(lnbNum) {
		$(lnbNum).each(function () {
			var thisHref = $(this).attr('href').substr(1);
			if (location.indexOf(thisHref) != -1) {
				$(this).parent().addClass('on');
			}
		})
	}

	navAction();
	lnbAction('.lnb_01 li a');
	lnbAction('.lnb_02 li a');
	lnbAction('.lnb_03 li a');
	lnbAction('.lnb_04 li a');
	lnbAction('.lnb_05 li a');



});