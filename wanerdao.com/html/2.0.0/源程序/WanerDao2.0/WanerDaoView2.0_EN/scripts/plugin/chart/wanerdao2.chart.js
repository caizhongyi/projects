/*
*	本插件基于jquery.flot.js
*  官网：http://code.google.com/p/flot/
*  中文说明http://www.itivy.com/ivy/archive/2011/6/4/jquery-flot-chinese-doc.html
*/
function wanerdaochart(options) {
    var defaults = {
        titleid: '',
        tooltip: false,
        local: {
            data: []
        },
        ajax: {
            url: '',
            opertype: ''
        },
        chart: {}
    };
    var me = this;
    //初始化
    if (options != undefined) {
        me.opts = jQuery.extend({}, defaults, options);
    }
    
    var infopop = {
        dialog: null,
        show: function (opts) {
            var _this = this;
            var html = _getUI(opts.titleid);
            var $dialog = $(html).appendTo($('body'));
            var placeholder = $("#divchart");
            /*
            *	本地数据显示
            */
            if (me.opts.local.data.length > 0) {
                $.plot(placeholder, me.opts.local.data, me.opts.chart);
            }
            else {
                /*
                *	远程数据拉扯
                */
                var chardata = [];
                $.plot(placeholder, chardata, me.opts.chart);
                ajaxfunc(me.opts.ajax.url, me.opts.ajax.opertype, function (data) {
                }, function (data) {
                    if (data.result && data.data.length > 0) {
                        chardata.push(data.data);
                        $.plot(placeholder, chardata, me.opts.chart);
                    }
                })
            }
            if (me.opts.tooltip) {
                placeholder.bind("plothover", function (event, pos, item) {
                    if (item) {
                        $(".vote-control").html(item.series.label + ":" + item.datapoint[1].toFixed(2));
                    }
                });
                placeholder.bind("plotclick", function (event, pos, item) {
                    if (item) {
                        $(".vote-control").html(item.series.label + ":" + item.datapoint[1].toFixed(2));
                    }
                });
            }
            _this.dialog = new $.ui.dialog($dialog, {
                callback: { hide: function () {
                    $dialog.remove()
                }
                },
                widget: {
                    hide: '.close-3'
                }
            }).show();
        }
    };
    infopop.show(me.opts);
    function _getUI(titleid) {
        var htext = '<div class="pop" style="width:650px; margin:10px auto;">';
        htext += '<div class="pop-bg"></div>';
        htext += '<div class="pop-container">';
        htext += '<div class="pop-hd clearfix"><h3>' + wanerdaoLangTip(titleid) + '</h3>';
        htext += '<a href="javascript:;" class="close-3" title="' + wanerdaoLangTip('common_00008') + '"></a></div>';
        htext += '  <div class="pop-bd">';
        htext += '	    <div id="divchart" style="width:560px;height:300px">';
        htext += '		</div>';
        htext += '		<div  class="vote-control"></div>';
        htext += '	</div>';
        htext += '</div>';
        htext += '</div>';
        return htext;
    }
};