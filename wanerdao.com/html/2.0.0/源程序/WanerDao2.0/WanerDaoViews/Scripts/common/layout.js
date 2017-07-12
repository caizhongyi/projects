function homeOver(obj) {
    $('#home').addClass('hover01');
    $(obj).attr('_mouseover', 1);
    $('.search_list01').show();
    setTimeout(isshow, 200);
}

function homeOut(obj) {
    $('#home').removeAttr('_mouseover');
}

function isshow() {
    if ($('#home').attr('_mouseover') == 1) {
        setTimeout(isshow, 200);
        return true;
    }
    if ($('.search_list01').attr('_mouseover') != 1) {
        $('#home').removeClass('hover01');
        $('.search_list01').hide();
    }
}


$(function () {
    

    $('.search_list01').mouseover(
	function () {
	    $('#home').addClass('hover01');
	    $(this).show();
	    $(this).attr('_mouseover', '1');
	}
);

    $('.search_list01').mouseout(
	function () {
	    $('#home').removeClass('hover01');
	    $(this).hide();
	    $(this).removeAttr('_mouseover');
	}
);
    $('#home').click(function () { homeOver($(this)); });
    $('#home').mouseout(function () { homeOut($(this)); });

    $('#search_list02 li').each(
	function () {
	    $(this).mouseover(
			function () {
			    $(this).attr('style', 'background:#6bc0d6;color:#ffffff');
			    $(this).find('h1').attr('style', 'font-weight:bold;');
			    $(this).find('a').attr('style', 'color:#ffffff');
			}
		);
	    $(this).mouseout(
			function () {
			    $(this).removeAttr('style');
			    $(this).find('h1').removeAttr('style');
			    $(this).find('a').removeAttr('style');
			}
		);
	}
);

    $('#userInfo').click(
	function () {
	    $(this).attr('_mouseover', 1);
	    $('#search_list').show();
	    setTimeout(isshow_userinfo, 200);
	}
);

    $('#userInfo').mouseout(
	function () {
	    $(this).removeAttr('_mouseover');
	}
);

    function isshow_userinfo() {
        if ($('#userInfo').attr('_mouseover') == 1) {
            setTimeout(isshow_userinfo, 200);
            return true;
        }
        if ($('#search_list').attr('_mouseover') != 1) {
            $('#search_list').hide();
        }
    }

    $('#search_list').mouseover(
	function () {
	    $(this).show();
	    $(this).attr('_mouseover', '1');
	}
);

    $('#search_list').mouseout(
	function () {
	    $(this).hide();
	    $(this).removeAttr('_mouseover');
	}
);
});