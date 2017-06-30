/**
 * 主站侧边栏菜单
 *
 * @version v4.0
 */
require('/components/jquery/lazyload.js');
var $ = require('jquery');
var Luck = require('/widget/luck/luck.js');
var FeedbackTpl = require('./feedback.tpl');
var SuccessTpl = require('./success.tpl');
var Cookie = require('cookie');
var Plg  = require('/widget/plugin/plugin.js');

var Menu = {};

var errorTip = function(tip) {
    return '<div class="error"><i class="i-error"></i>' + tip + '</div>';
};

var COL_SHOW   = 'side-col-show';
var TAB_ON     = 'bar-tab-on';
var $container = $('#js_side_menu');

var carTpl = '<li class="item"> <div class="pic"> <a href="<%=detail_url%>" target="_blank"><img src="<%=cover_photo%>"></a> </div> <div class="con"> <div class="price1"><strong><%=price%></strong><em>万</em></div> <div class="info"> <span class="info-l"><%=card_time%></span> </div> </div> <a href="javascript:" class="i-del" data-id="<%=id%>"></a> </li>';
var carBakTpl = '<li class="item"> <div class="pic"> <a href="<%=detail_url%>" target="_blank"><img src="<%=cover_photo%>"></a> <div class="pic-mask"></div> <span class="out-bg"></span> <span class="out">已下架</span> </div> <div class="con"> <div class="price1"><strong><%=price%></strong><em>万</em></div> <div class="info"> <span class="info-l"<%=card_time%>></span> </div> </div> <a href="javascript:" class="i-del" data-id="<%=id%>></a> </li>';

function clearSelected () {
    $container.find('.bar-tab').removeClass('bar-tab-on');
}

// 最近浏览 cookie c273_sale_history_ids
Menu.recent = function(config) {
    var $el = config.$el;
    var $recentBox = $('#js_recent');
    var KEY = 'c273_sale_history_ids';
    var getHistory = function() {
        return Cookie.get(KEY);
    };

    // show
    $el.on('click', function() {
        $(this).addClass(TAB_ON);
        $container.addClass(COL_SHOW);
        // get history cars
        if (getHistory()) {
            $.ajax({
                url: '/ajax/gethistorycars/index/',
                type: 'get',
                dataType: 'json'
            }).done(function(ret) {
                if (ret.code == 0) {
                    var list = [];
                    for (var i = 0, len = ret.data.length; i < len; i++) {
                        if (ret.data[i].is_sold) {
                            list.push(Plg.template(carBakTpl, ret.data[i]));
                        } else {
                            list.push(Plg.template(carTpl, ret.data[i]));
                        }
                    }
                    var li = list.join('', list);
                    $recentBox.find('.mod-car-list').html(li);
                }
            }).fail(function(ret) {
                console && console.log(ret);
            });
        }
    });
    // hide
    $container.find('.js_hide_menu').on('click', function() {
        clearSelected();
        $container.removeClass(COL_SHOW);
    });
    // del
    $recentBox.on('click', '.i-del', function() {
        $(this).parent('li').remove();
        // clear cookie
        var tmp = getHistory();
        var id = $(this).data('id');
        var reg = new RegExp(id);
        tmp = tmp.replace(reg, '');
        Cookie.set(KEY, tmp,  {
            'expires' : 7,
            'domain'  : '.273.cn',
            'path'    : '/'
        });
    });
};

// 建议反馈
Menu.feedback = function(config) {
    var $el = config.$el;
    $el.hover(
        function() {
            $(this).addClass(TAB_ON);
        },
        function() {
            $(this).removeClass(TAB_ON);
        }
    );
    $el.on('click', function() {
        clearSelected();
        var dialog = Luck.open({
            'title': '投诉与建议',
            'content': FeedbackTpl([]),
            'width': '710px',
            'extra_class': 'mod-pop-ex-beef'
        });

        var $dialog  = $(dialog);
        var data     = {};
        var $mobile  = $('#js_mobile');
        var $content = $('#js_content');

        $('#js_luck_ok').on('click', function() {
            var $type = $dialog.find(':radio:checked');
            data.type = $type.val();
            if (data.type == '') {
                data.type = 0;
            }

            data.content = $content.val();
            if (data.content == '') {
                $content.after(errorTip('内容不能为空'));
                return false;
            } else if (data.content.length > 500) {
                $content.after(errorTip('内容不能超过500字'));
                return false;
            }

            data.mobile = $mobile.val();
            if (/^1[3-9]\d{9}$/.test(data.mobile) == false) {
                $mobile.after(errorTip('手机格式错误'));
                return false;
            }

            $.ajax({
                url: '/ajax/postfeedback/index/',
                type: 'post',
                dataType: 'json',
                data: data,
                success: function(ret) {
                    if (ret.code == 0) {
                        Luck.close();
                    } else{
                        alert('网络异常');
                    }
                },
                error: function(ret) {
                    alert('网络异常');
                }
            });

            $dialog.find('.error').remove();

        });
        return false;
    });
};

// 二维码
Menu.qrCode = function(config) {
    var $el = config.$el;
    $el.hover(
        function() {
            $(this).addClass('bar-tab-on-code');
        },
        function() {
            $(this).removeClass('bar-tab-on-code');
        }
    );
};

// 返回顶部
Menu.upTop = function(config) {
    var $el = config.$el;
    $el.on('click', function() {
        $('body, html').animate({scrollTop: 0}, 200);
        return false;
    });
};

module.exports = Menu;
