/*
 *	本插件基于jquery.flot.js
 *  官网：http://code.google.com/p/flot/
 *  中文说明http://www.itivy.com/ivy/archive/2011/6/4/jquery-flot-chinese-doc.html
 */
//警告或者确定弹出层
$(function () {
    var chart = jQuery('<div id="wanerdaochartpop" style="width:630px;margin: 0 auto; z-index:9999;display:none;"></div>');
    $(chart).appendTo(document.body);
    $("#wanerdaochartpop").overlay(); //.close();
});
function wanerdaochart(options) {
    //初始化
    if (options != undefined) {
        this.opts = jQuery.extend({}, wanerdaochart.defaults, options);
    }
    var pop = $("#wanerdaochartpop");
    pop.empty();
    pop.append(wanerdaochart.getUI(this.opts));
    pop.overlay().load();
    var placeholder = $("#divchart");
    /*
     *	本地数据显示
     */
    if (this.opts.local.data.length > 0) {
        $.plot(placeholder, this.opts.local.data, this.opts.chart);
    }
    else {
        /*
         *	远程数据拉扯
         */
        var chardata = [];
        $.plot(placeholder, chardata, this.opts.chart);
        ajaxfunc(this.opts.ajax.url, this.opts.ajax.opertype, function (data) {
        }, function (data) {
            if (data.result && data.data.length > 0) {
                chardata.push(data.data);
                $.plot(placeholder, chardata, this.opts.chart);
            }
        })
    }
    if (this.opts.tooltip) {
        placeholder.bind("plothover", function (event, pos, item) {
            if (item) {
                $(".control").html(item.series.label + ":" + item.datapoint[1].toFixed(2));
            }
        });
        placeholder.bind("plotclick", function (event, pos, item) {
            if (item) {
                $(".control").html(item.series.label + ":" + item.datapoint[1].toFixed(2));
            }
        });
    }
    wanerdaochart.addevent();
};
jQuery.extend(wanerdaochart, {
    defaults: {
        titleid: '',
        tooltip: false,
        local:{            
            data:[]
        },
        ajax: {
            url:'',
            opertype: ''
        },
        chart:{}
    },
    getUI: function (opts) {
        var htext = '<table class="pop_dialog_table" style="width: 100%; height: 100%;">';
        htext += '<tbody><tr><td class="pop_topleft"></td><td class="pop_border"></td><td class="pop_topright"></td></tr>';
        htext += '<tr><td class="pop_border"></td>';
        htext += '<td class="pop_content">';
        htext += '<div class="dialog_content">';
        htext += '<h2>' + wanerdaoLangTip(opts.titleid) + ' <a href="javascript:;" class="close" title="';
        htext += wanerdaoLangTip('common_00008') + '">' + wanerdaoLangTip('common_00008') + '</a></h2>';
        htext += '  <div class="dialog_body">';
        htext += '	    <div id="divchart" style="width:560px;height:300px">';
        htext += '		</div>';
        htext += '		<div class="blank"></div>';
        htext += '		<div class="options"></div>';
        htext += '		<div class="blank"></div>';
        htext += '		<div class="control"></div>';
        htext += '	</div>';
        htext += '</div></td>';
        htext += '<td class="pop_border"></td>';
        htext += '</tr>';
        htext += '<tr><td class="pop_bottomleft"></td><td class="pop_border"></td><td class="pop_bottomright"></td></tr>';
        htext += '</tbody></table>';
        return htext;
    },
    addevent: function () {
        jQuery(".close").click(function () {
            $("#wanerdaochartpop").overlay().close();
        });
    }
});