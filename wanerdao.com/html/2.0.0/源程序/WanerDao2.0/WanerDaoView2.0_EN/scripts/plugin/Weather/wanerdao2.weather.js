
(function ($) {
    var defaults = {
        language: "en", //语言
        call: "", //要调用的函数
        weatherName: null, //天气英文名称
        render: null, //图片对象
        callback: null//回调函数
    };
    var options;
    Weather = function (ops) {

        options = $.extend(defaults, ops);

        eval((options.call + '()'));
    }

    function selector() {
        var $f_box;
        var $weather_win = $('<div id="wanerdao_weather_win" class="pop" style="width:630px; margin:10px auto;" ></div>').appendTo(document.body);
        $weather_win.append('<div class="pop-bg"></div>');
        $weather_win.append('<div class="pop-container">'
                + '<div class="pop-hd clearfix"><h3>Weather</h3><a href="javascript:;" class="close-3" title="' + wanerdaoLangTip('common_00008') + '"></a></div>'
                + '<div class="pop-bd weather_box"><ul></ul>'
                + '<div class="clear"></div>'
                + '</div></div>');
        var $box = $weather_win.find('.weather_box').find('ul');

        /**弹出 模式对话**/
        $f_box = new $.ui.dialog($weather_win, {
            callback: { hide: function () {
                $weather_win.remove();
            }
            },
            widget: {
                hide: '.close-3'
            }
        }).show();

        for (var i in weatherList) {
            if (i % 7 == 0 && i != 0) {
                $box.append('<div class="clear"></div>');
            }

            var li = jQuery('<li></li>').css({ 'float': 'left', 'width': '80px', 'line-height': '18px', 'text-align': 'center', 'overflow': 'hidden', 'margin-bottom': '8px' }).appendTo($box);
            li.attr({ 'title': weatherList[i]['name_' + options.language], 'tag': weatherList[i]['name_en'] });
            li.append('<img src="/images/weather/' + weatherList[i]['name_en'] + '.png"/><br/>');
            var link = jQuery('<a></a>').appendTo(li);
            link.attr('href', 'javascript:;');
            link.html(weatherList[i]['name_' + options.language]);
            li.click(function () {
                $('.close-3').click();
                var data = { value: $(this).attr('tag'), text: $(this).find('a').html() };
                if (options.callback) options.callback(data);
            });

        }
    }

    function setImagePath() {
        $.each(weatherList, function (i, v) {
            if (options.weatherName == v.name_en) {
                options.render.attr('src', '/images/weather/' + v.name_en + '.png');
                options.render.attr('alt', v['name_' + options.language]);
                return false;
            }
        });
    }

    function getImagePath() {
        var path = '';
        var name = '';
        $.each(weatherList, function (i, v) {
            if (options.weatherName == v.name_en) {
                path = '/images/weather/' + v.name_en + '.png';
                name = v['name_' + options.language];
                return false;
            }
        });
        if (path) {
            options.callback({ result: true, path: path, name: name });
        } else {
            options.callback({ result: false, path: path, name: name });
        }
    }


    var weatherList = [
        { name_en: 'Partly sunny', name_cn: '局部晴朗' },
        { name_en: 'Scattered thunderstorms', name_cn: '零星雷阵雨' },
        { name_en: 'Showers', name_cn: '阵雨' },
        { name_en: 'Cloudy', name_cn: '多云' },
        { name_en: 'Scattered showers', name_cn: '零星小雨' },
        { name_en: 'Rain and snow', name_cn: '雨夹雪' },
    // { name_en: 'OvercastRain and snow', name_cn: '阴' },
        {name_en: 'Sunny', name_cn: '晴' },
        { name_en: 'Clear', name_cn: '晴朗' },
        { name_en: 'Chance of rain', name_cn: '可能有雨' },
        { name_en: 'Chance of snow', name_cn: '可能有雪' },
        { name_en: 'Chance of storm', name_cn: '可能有暴雨' },
        { name_en: 'Dust', name_cn: '沙尘暴' },
        { name_en: 'Flurries', name_cn: '飘雪' },
        { name_en: 'Fog', name_cn: '雾' },
        { name_en: 'Freezing drizzle', name_cn: '毛毛雨' },
        { name_en: 'Overcast', name_cn: '阴' },
        { name_en: 'Icy', name_cn: '冰' },
        { name_en: 'Light rain', name_cn: '小雨' },
        { name_en: 'Light snow', name_cn: '小雪' },
        { name_en: 'Mist', name_cn: '雾' },
        { name_en: 'Mostly cloudy', name_cn: '大部分阴' },
        { name_en: 'Mostly sunny', name_cn: '大部分晴' },
        { name_en: 'Partly cloudy', name_cn: '局部多云' },
        { name_en: 'Rain', name_cn: '雨' },
        { name_en: 'Sleet', name_cn: '冰雹' },
        { name_en: 'Smoke', name_cn: '烟' },
        { name_en: 'Snow showers', name_cn: '阵雪' },
        { name_en: 'Snow', name_cn: '雪' },
        { name_en: 'storm', name_cn: '风暴' },
        { name_en: 'Thunderstorm', name_cn: '雷雨'}];
})(jQuery);

