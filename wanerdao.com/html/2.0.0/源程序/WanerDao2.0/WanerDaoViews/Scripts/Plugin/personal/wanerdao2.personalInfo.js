
$(function () {
    $(document).mousemove(function (e) {
        if ($('#personal_info_display_win').length != 0 && $('#personal_info_display_win').attr('_mouseover') == '1') {
            var $p = $('#personal_info_display_win');
            if (!((e.pageX >= $p.position().left && e.pageX <= ($p.position().left + parseInt($p.width()))) && (e.pageY >= $p.position().top && e.pageY <= ($p.position().top + parseInt($p.height()))))) {
                $p.hide();
                $p.attr('_mouseover', '-1');
            }
        }
    });
});

(function () {
    $.fn.PersonalInfo = function (opts) {
        var defaults = {
            uid: '',
            text_loading: '加载中'
        };
       
        opts = $.extend(defaults, opts);
        var $box; //弹出层
        var timer1; //计算器
        var show_Info = false;//
        if ($('#personal_info_display_win').length == 0) {
            $box = jQuery('<div id="personal_info_display_win" class="o_win"><div id="inner_box"></div></div>').appendTo($('body'));
            $box.css({
                'position': 'absolute',
                'z-index': '99999',
                'width': '280px',
                'height': 'auto',
                'top': ($(this).position().top + $(this).height()) + 'px',
                'left': ($(this).position().left + ($(this).width() / 2)) + 'px',
                'background-color': '#fff',
                'border': 'solid 1px #ddd',
                'display': 'none',
                'padding': '10px'
            });
            $box.find('#inner_box').css({
                'width': '100%',
                'height': '100%',
                'position': 'relative',
                'background': '#fff',
                'line-height':'18px'
            });
        } else {
            $box = $('#personal_info_display_win');
        }

        $(this).mouseover(function (e) {
            show_Info = true;
            setTimeout(function(){
                if(show_Info){
                    var top =  e.pageY;
                    if((top + parseInt($box.height())) > ($(window).height() + $(document).scrollTop())){
                        top = e.pageY - parseInt($box.height());
                    }
                
                    $box.find('#inner_box').empty();
                    $box.find('#inner_box').append(opts.text_loading);
                    $box.css({ top: top + 'px', left: (e.pageX+5) + 'px' }).show();
                    getPersonal(opts.uid);    
                }
            },1000);
        }).mouseout(function (e) {
            show_Info = false;
            timer = setTimeout(function () {
                if (timer != null) {
                    $box.hide();
                }
            }, 200);
        });


        $box.mouseenter(function (e) {
            $('#personal_info_display_win').attr('_mouseover', '1');
            timer = null;
        });


        function getPersonal(id) {
            $.ajax({
                url: "wanerdao_personal.axd",
                type: "post",
                dataType: "json",
                cache: false,
                data: "{opertype:'getpersonalprofile',uid:'" + id + "'}",
                error: function (data) {
                },
                success: function (data) {
                    if (data.result) {
                        var personal = data.obj;
                        $showWin = $box.find('#inner_box').empty();

                        $showWin.append('<div class="o_win">'
                        + '<div class="person_main">'
//                        + '<div style="position: relative;"><a href="javascript:;" class="btn_close" title="关闭窗口" style=" float: right;">×</a></div>'
                        + '<div style=" float: left;"><img src="' + personal.logo_small_path + '" style="width: 50px; height: 50px;"/></div>'
                        + '<div style=" float: left; width: 200px; margin-left: 5px; ">'
                        + '<div><a href="/personal_info.html?uid=' + personal.user_id + '">' + personal.name + '</a></div>'
                        + '<div>'+(personal.gender?wanerdaoLangTip('personal_00020')[0]:wanerdaoLangTip('personal_00020')[1])+'&nbsp;'+ personal.birthday_year + '-' + personal.birthday_month + '-' + personal.birthday_day +'&nbsp;'+personal.constellation+ '</div>'
                        + '</div>'
                        + '<div style="clear:both;"></div>'
                        + '</div>');
                        $showWin.find('.btn_close').click(function () {
                            $box.hide();
                        });

                    } else {
                        $showWin.append(data.msg);
                    }
                }
            });
        }
    }
})(jQuery);