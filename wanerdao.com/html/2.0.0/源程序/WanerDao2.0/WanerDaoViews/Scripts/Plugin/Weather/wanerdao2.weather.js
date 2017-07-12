
(function ($) {
    var defaults = {
        language: "cn", //语言
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

        var jBg = jQuery('<div class="weather-bg"></div>').css({ 'position': 'absolute', 'left': '0', 'top': '0', 'z-index': '9999', 'display': 'none', 'background-color': '#999' }).appendTo($('body'));
        var jBox = jQuery('<div class="weather-box"><div><span>选择天气</span><span>×</span></div><ul></ul></div>').css({ 'position': 'absolute', 'padding': '10px', 'border': 'solid 1px #ddd', 'display': 'none', 'background-color': '#fff', 'z-index': '99999', 'line-height': '30px' }).appendTo($('body'));
        $(window).resize(function () {
            jBg.css({ 'width': $(document).width(), 'height': $(document).height() });
            jBox.css({ 'top': (($(window).height() - jBox.height()) / 2), 'left': (($(window).width() - jBox.width()) / 2) });
            if (parseInt(jBox.css('top')) < 0) {
                jBox.css('top', 0);
            }
        });

        var container = jBox.find('ul').css({ 'list-type': 'none', 'margin': '0', 'padding': '0', 'font': '12px/39px "微软雅黑", Arial, Tahoma', 'width': '610px' });

        for (var i in weatherList) {

            var li = jQuery('<li></li>').css({ 'float': 'left', 'width': '120px', 'height': '25px', 'line-height': '25px', 'text-align': 'center' }).appendTo(container);
            var link = jQuery('<a></a>').appendTo(li);
            link.attr('href', 'javascript:;');
            link.attr('title', weatherList[i]['name_en']);
            link.html(weatherList[i]['name_' + options.language]);
            link.click(function () {
                var data = { value: $(this).attr('title'), text: $(this).html() };
                if (options.callback) options.callback(data);
                remove();
            });
        }

        jBg.css({ 'width': $(document).width(), 'height': $(document).height() }).fadeTo('slow', 0.5);
        jBox.css({ 'top': (($(window).height() - jBox.height()) / 2) + $(document).scrollTop(), 'left': (($(window).width() - jBox.width()) / 2) }).fadeTo('slow', 1);

        jBox.find('span').css({ 'cursor': 'pointer' }).click(function () {
            remove();
        });

        function remove() {
            jBg.fadeTo('slow', 0, function () {
                $(this).remove();
            });
            jBox.fadeTo('slow', 0, function () {
                $(this).remove();
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
        { name_en: 'OvercastRain and snow', name_cn: '阴' },
        { name_en: 'Sunny', name_cn: '晴' },
        { name_en: 'Clear', name_cn: '晴朗' },
        { name_en: 'Chance of rain', name_cn: '可能有雨' },
        { name_en: 'Chance of snow', name_cn: '可能有雪' },
        { name_en: 'Chance of storm', name_cn: '可能有暴雨' },
        { name_en: 'Dust', name_cn: '沙尘暴' },
        { name_en: 'Flurries', name_cn: '小雪' },
        { name_en: 'Fog', name_cn: '雾' },
        { name_en: 'Freezing drizzle', name_cn: '毛毛雨' },
        { name_en: 'Haze', name_cn: '阴' },
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

