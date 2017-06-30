/*!
 * index
 * Author: zhugao
 * Date: 2013-5-11
 */

 
// 客户案例
function showCode(elem, show) {
	var $elem = $(elem),
		$code = $elem.prev('.code');
	if (show) {
		$code.show().css({
			'opacity': 0
		}).stop().animate({
			'margin-top': 78,
			'opacity': 1
		}, function () {
			$code.show();
		});
	} else {
		$code.css({
			'opacity': $code.css('opacity')
		}).stop().animate({
			'margin-top': 98,
			'opacity': 0
		}, function () {
			$code.hide();
		});
	}
}

// 滑动到锚点
function slideTarget(elem) {
	var id = $(elem).attr('href'),
		$target = $(id);
	$('html, body').stop().animate({
		scrollTop: $target.offset().top - 100 // 排除顶部悬浮导航条的高度
	}, 1000);
}

// 标记导航active
function activeNav(num) {
	var num = num + 100 + 80, // 顶部悬浮导航条的高度 + 距离目标块的边距
		$nav = $('#nav');
	$('div[data-connect=nav]').each(function () {
		var $this = $(this),
			id = $this.attr('id');

		/* if (id === 'footer') {
			// 关于我
			num = num + 200;
		} */
		if (num >= $this.data('num')) {
			$('a.active', $nav).removeClass('active');
			$('a[href=#'+id+']', $nav).addClass('active');
		} else {
			$('a[href=#'+id+']', $nav).removeClass('active');
		}
	});
}

 

$(function () {
	var is_click = false,
		timeout = false;

	 

	$('.block_case .circle').hover(
		function () {
			showCode(this, true);
		},
		function () {
			showCode(this, false);
		}
	);

	// 点击导航，移到锚点
	$('#nav a:not(.login)').click(function (event) {
		slideTarget(this);
		$('a.active', $('#nav')).removeClass('active');
		$(this).addClass('active');
		is_click = true;
		return false;
	});

	// 在每个块上添加 data-num 标记该块的 offset().top， activeNav() 中会用到
	$('div[data-connect=nav]').each(function () {
		$(this).data('num', $(this).offset().top);
	});

	// 监听滚动事件
	$(window).on('scroll', function () {
		var $this = $(this);
		if (timeout) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(function () {
			var num = $this.scrollTop();
			if (!is_click) {
				activeNav(num);
			}
			is_click = false;
		}, 100);
	});

	 
	var arVersion = navigator.appVersion.split("MSIE");
	var version = parseFloat(arVersion[1]);

	$(window).scroll(function () {
	    var bw = $(document.body).width();
	    var yw = $(".head-wrap").width();
	    var bh = $(document.body).height();
	    var yh = $(".head-wrap").height();
	    var yscroll = $(document).scrollTop();
	    if ($(document).scrollTop() > 0) {
	        if (version < 7.0) {
	            $(".head-wrap").css('top', yscroll).css('left', (bw - yw) / 2).css('position', 'absolute');
	        } else {
	            $(".head-wrap").css('top', 0).css('left', (bw - yw) / 2).css('position', 'fixed');
	        }

	    } else {
	        $(".head-wrap").css('position', 'static'); /*恢复到初始地方*/
	    }

	});

});


