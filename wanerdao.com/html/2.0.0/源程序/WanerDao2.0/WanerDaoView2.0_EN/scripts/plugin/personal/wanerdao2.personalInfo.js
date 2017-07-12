
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
            text_loading: wanerdaoLangTip('common_00009')
        };
        opts = $.extend(defaults, opts);
        var $this = $(this);//触发对象
        var $box; //弹出层
        var timer1; //计算器
        var show_Info = false;//
        if ($('#personal_info_display_win').length == 0) {
            $box = jQuery('<div id="personal_info_display_win" class="tips-panel"><div id="inner_box" class="tips tips-2"></div></div>').appendTo($('body'));
            $box.css({
                'position': 'absolute',
                'z-index': '99999',
                'width': '450px',
                'display':'none'
            });

            $box.find('#inner_box').css({
            });
        } else {
            $box = $('#personal_info_display_win');
        }

        $(this).mouseover(function (e) {
            var $thisTop =  $this.position().top;//触发对象top
            var $thisLeft = $this.position().left;//触发对象left
            show_Info = true;
            setTimeout(function(){
                if(show_Info){
                    $box.find('#inner_box').empty();
                    var $showWin = $box.find('#inner_box').empty();
                    $showWin.append('<div class="down-arrowhead"></div>');
                    $showWin.append('<div class="form pop_act">'
                        +'<div class="clearfix main_box">'
                        +opts.text_loading
                        +'</div>'
                        +'</div>'
                        +'<a title="' + wanerdaoLangTip('common_00008') + '" class="close-3" href="javascript:;"></a>');
                
                    $showWin.find('.close-3').click(function () {
                        $box.hide();
                    });

                    $box.css({ top: ($thisTop-40) + 'px', left: ($thisLeft - 40) + 'px' }).show();
                    doAjax("{opertype:'getpersonalprofile',uid:'" + opts.uid + "'}",function(){
                        
                    },function(data){
                         if (data.result) {
                            $box.css({ top: ($thisTop-200) + 'px'});
                            var personal = data.obj;
                            var $main_box = $box.find('.main_box').empty();
                            $main_box.html('<div class="parsoninfo"><img width="109" height="95" src="' + personal.logo_small_path + '"  class="pop_picture"><br/>'
        	                    +'<a href="/personal/index.html?uid=' + personal.uid + '" target="_blank">' + personal.name + '</a></div>'
                                +'<ul class="pop_list">'
                                +'<li>' + wanerdaoLangTip('personal_00021') + '：<i class="iBar"><i style="width:' + personal.experience + '%;"></i><em>' + personal.experience + '%</em></i></li>'
                                +'<li>' + wanerdaoLangTip('common_00045') + '：<i class="iBar"><i style="width:' + personal.activity_score + '%;"></i><em>' + personal.activity_score + '%</em></i></li>'
                                +'<li>' + wanerdaoLangTip('personal_00023') + '：<i class="iBar"><i style="width:' + personal.share_score + '%;"></i><em>' + personal.share_score + '%</em></i></li>'
                                +'<li>' + wanerdaoLangTip('personal_00024') + '：<span id="p_info_school"></span></li>'
                                +'<li>' + wanerdaoLangTip('personal_00025') + '：<span id="p_info_work"></span></li>'
                                +'<li>' + wanerdaoLangTip('personal_00026') + '：<span id="p_info_location"></span></li>'
                                +'<li>' + wanerdaoLangTip('personal_00027') + '：<span id="p_info_home"></span></li>'
                                +'</ul>');


                            doAjax("{opertype:'getpersonalnamecard',uid:'" + opts.uid + "'}", null, function(data){
                                if(data.result){
                                    namecardinfo = data.obj;
                                    $('#p_info_school').html(namecardinfo.school);
                                    $('#p_info_work').html(namecardinfo.work_place);
                                    $('#p_info_location').html(namecardinfo.current_place);
                                    $('#p_info_home').html(namecardinfo.home);
                                }
                            });

                        } else {
                            $showWin.append(data.msg);
                        }
                    });
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
        
        function doAjax(data,error,success){
            $.ajax({
                url: "wanerdao_personal.axd",
                type: "post",
                dataType: "json",
                cache: false,
                data: data,
                error: function () {
                    if(error)error();
                },
                success: function (data) {
                    if(success)success(data);
                }
            });
        }
    }
})(jQuery);