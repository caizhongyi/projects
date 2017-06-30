/**
 * @desc 车型联动插件（ps:代码来源v3）
 * @author linyu@273.cn>
 * @since 2015-04-01
 */
define(function(require, exports, module) {
    require('./vehicle.css');
    var $ = require('jquery');
    var Ua = require('sea_modules/util/ua.js');
    var Widget = require('sea_modules/util/widget.js');
    var Position = require('sea_modules/widget/position/position.js');
    var AutoComplete = require('sea_modules/widget/autocomplete/autocomplete_v2.js');
    var LocalCache = require('sea_modules/widget/local_cache/local_cache.js');
    var data_path = require.resolve('sea_modules/widget/local_cache/data/vehicle_data.js');
    var localCache = new LocalCache();

    var $type_div   = $('#vehicle-type');
    var $brand_div  = $('#vehicle-brand');
    var $series_div  = $('#vehicle-series');
    var $model_div  = $('#vehicle-model');
    var template = 
        '<div class="tip"><a href="javascript:;" class="close"></a><%= tip %></div>'+
        '<div class="list <% if (typeof overflow !== "undefined") { %>overflow<% } %>">'+
            '<ul><li class="vechicle-nav"><a href="javascript:;"></a></li>'+
                '<% for (var i = 0, l = list.length; i < l; i++) {var item = list[i];%>'+
                '<li <% if (item.letter) { %>class="letter" id="<%= item.text || "" %>"<% } %>>'+
                    '<a href="javascript:;" <% if (item.value) { %>data-value="<%= item.value %>"<% } %> <% if (item.year) { %>data-year="<%= item.year %>"<% } %>><%= item.text %></a>'+
                '</li> <% } %>'+
            '</ul>'+
        '</div>'+
        '<% if (typeof anchors !== "undefined") { %>'+
        '<ul class="anchors">'+
            '<% for (var i = 0, l = anchors.length; i < l; i++) { %>'+
            '<li><a href="javascript:;"><%= anchors[i] %></a></li>'+
            '<% } %>'+
        '</ul><% } %>';

    //--------------------------//
    //         车类型           //
    //--------------------------//
    var $type_input = $type_div.find('[type=text]');
    var $type_hidden_input = $type_div.find('[type=hidden]');
    var car_type = $type_hidden_input.val();

    $type_div.on('click', '[type=text]', function () {
        if (!$type_div.hasClass('active')) {
            $type_div.addClass('active');
        } else {
            $type_div.removeClass('active');
        }
    }).mouseleave(function () {
        if ($type_div.hasClass('active')) {
            $type_div.removeClass('active');
        }
        return false;
    }).on('click', 'li a', function (e, flag) {
        var $this = $(this);
        var value = $this.data('value');
        var text  = $this.text();
        if (value !== car_type) {
            $type_input.val(text);
            $type_hidden_input.val(value);
            if (!flag) {
                $type_div.trigger('change', [value]);
            }
            car_type = value;
        }
        $type_div.removeClass('active');
        return false;
    }).on('change', function (e, value) {
        // reset
        $brand_div.trigger('reset');
    });

    //--------------------------//
    //         车品牌            //
    //--------------------------//
    var $brand_input = $brand_div.find('[type=text]');
    var $brand_content = $brand_div.find('.vehicle-inner');
    var $brand_hidden_input = $brand_div.find('[type=hidden]');
    var brand_id = $brand_hidden_input.val();
    var last_car_type,selectedType,last_brand_id;

    $brand_div.on('focus', '[type=text]', function () {
        // 根据车类型筛选车品牌
        if (car_type == last_car_type) {
            $brand_div.addClass('active');
            return;
        }
        last_car_type = car_type;
        selectedType = car_type > 0 ? car_type : 'all';

        $brand_div.addClass('loading');
        localCache.getData(data_path, 'vehicle').done(function(data){
            if (!data) return;
            var brand_data = data['brand'][selectedType];
            var list = [];
            var anchors = Object.keys(brand_data);
            $.each(anchors, function (i, v) {
                list.push({
                    text : v,
                    letter : true
                });
                list = list .concat(brand_data[v]);
            });
            
            if (list.length > 0) {
                var template_data = {
                    tip : '请选择品牌',
                    anchors : anchors,
                    list : list
                }
                $brand_content.html(Widget.template(template, template_data));

                var scrollTop;
                var brand_list = $brand_content.find('.list');
                var $items = brand_list.find('.letter');
                var $nav = brand_list.find('.vechicle-nav');
                var $item = $();
                         
                if (Ua.ie === 6) {
                    $('#vehicle-brand-nav').remove();
                    $nav.appendTo(document.body);
                }
                $nav.attr('id', 'vehicle-brand-nav');
                
                brand_list.scroll(function () {
                    scrollTop = brand_list.scrollTop();
                    $items.each(function (i, el) {
                        var $el = $(el);
                        var $next = $($items[i + 1]);
                        if (scrollTop > $el.position().top && (!$next.size() || scrollTop < $next.position().top)) {

                            Position.pin({el:$nav, fixed:true, x:'top', y: 'left'},{el: brand_list, x:'top', y:'left'});

                            $nav.find('a').html($el.find('a').html()).end().show();
                            $item = $el;
                            return false;
                        }
                    });
                });
                $brand_div.removeClass('loading').addClass('active');
            }
        });
        return false;
    }).on('keyup', '[type=text]', function (e) {

        if ($brand_div.hasClass('active') && $.inArray(e.which, [13, 16, 17, 18, 91]) === -1) {
            $brand_div.removeClass('active');
            if (Ua.ie === 6) {
                $('#vehicle-brand-nav').hide();
            }
            $series_div.trigger('reset');
            $brand_hidden_input.val(0);
            brand_id = 0;
        }

        if (!$brand_div.hasClass('active') && !$brand_input.val() && e.which === 8){
            $brand_input.focus();
        }
    }).on('change', '[type=text]', function () {
    }).on('click', '.close', function () {
        $brand_div.removeClass('active');
        if (Ua.ie === 6) {
            $('#vehicle-brand-nav').hide();
        }
        return false;
    }).on('click', '.list a', function (e) {
        var $this = $(this);
        var value = $this.data('value');
        var text = $this.text();
        if (!value) {
            return;
        }
        if (value != brand_id) {
            $brand_input.val(text);
            $brand_hidden_input.val(value);
            $series_div.trigger('reset');
            brand_id = value;
        }
        $brand_div.removeClass('active');
        if (Ua.ie === 6) {
            $('#vehicle-brand-nav').hide();
        }
        // 触发车系列focus
        $series_div.show();
        $series_input.focus();
        return false;
    }).on('click', '.anchors a', function () {
        var $this = $(this);
        var id = $.trim($this.text());
        var $list = $brand_content.find('.list');
        var $letter = $brand_content.find('#' + id);
        if (!$letter.length) {
            return;
        }
        $list.scrollTop($letter.position().top);
        if (Ua.ie === 6) {
            $('#vehicle-brand-nav').hide();
        } else {
            $list.find('.vechicle-nav').hide();
        }
        return false;
    }).on('reset', function (e) {
        $brand_input.val('请选择品牌');
        $brand_hidden_input.val(0);
        last_brand_id = brand_id = 0;
        $series_div.trigger('reset');
        auto_brand.clear();
    });


    //--------------------------//
    //         车系列            //
    //--------------------------//
    var $series_input = $series_div.find('[type=text]');
    var $series_content = $series_div.find('.vehicle-inner');
    var $series_hidden_input = $series_div.find('[type=hidden]');
    var series_id = $series_hidden_input.val();
    var last_series_id;

    $series_div.on('focus', '[type=text]', function () {
        // 根据车品牌筛选车系列
        // 不同车型，可能相同品牌
        if (brand_id == last_brand_id) {
            $series_div.addClass('active');
            return;
        }
        last_brand_id = brand_id;

        $series_div.addClass('loading');
        localCache.getData(data_path, 'vehicle').done(function(data) {
            data = data['series'][brand_id];
            //这里直接操作data会操作到缓存对象，导致缓存对象内容改变，需要先复制一份
            data = data.slice(0);
            if (!data || !data.length) return;
            if (selectedType !== 'all') {
                $.each(data, function(i, info) {
                    if (info && $.inArray('' + selectedType, info.type) < 0) {
                        delete data[i];
                    }
                });
            }
            if (!data || !data.length) return;
            data = data.filter(function() {return true;});

            var template_data = {
                tip : '请选择车系',
                list : data
            }
            if (data.length > 10) {
                template_data.overflow = true;
            }
            $series_content.html(Widget.template(template, template_data));
            $series_div.removeClass('loading').addClass('active');
        });
    }).on('keyup', '[type=text]', function (e) {
        if ($series_div.hasClass('active') && $.inArray(e.which, [13, 16, 17, 18, 91]) === -1) {
            $series_div.removeClass('active');
            $model_div.trigger('reset');
            $series_hidden_input.val(0);
            series_id = 0;
        }
        if (!$series_div.hasClass('active') && !$series_input.val() && e.which === 8){
            $series_input.focus();
        }
    }).on('change', '[type=text]', function () {
    }).on('click', '.close', function () {
        $series_div.removeClass('active');
        return false;
    }).on('click', '.list a', function () {
        var $this = $(this);
        var value = $this.data('value');
        var text = $this.text();
        if (!value) {
            return;
        }
        if (value != series_id) {
            $series_input.val(text);
            $series_hidden_input.val(value);
            $model_div.trigger('reset');
            series_id = value;
        }
        $series_div.removeClass('active');

        // 触发车系列focus
        $model_div.show();
        $model_input.focus();
        return false;
    }).on('reset', function () {
        $series_div.hide();
        $series_input.val('请选择车系');
        $series_hidden_input.val(0);
        last_series_id = series_id = 0;
        $model_div.trigger('reset');
        auto_series.clear();
    });
    if (parseInt($series_hidden_input.val())) {
        $series_div.show();
    }

    //--------------------------//
    //         车型号            //
    //--------------------------//
    var $model_input = $model_div.find('[type=text]');
    var $model_content = $model_div.find('.vehicle-inner');
    var $model_hidden_input = $model_div.find('[type=hidden]');
    var model_id = $model_hidden_input.val();

    $model_div.on('focus', '[type=text]', function () {
        // 根据车系列筛选车型号
        if (series_id == last_series_id) {
            $model_div.addClass('active');
            return;
        }
        last_series_id = series_id;

        $model_div.addClass('loading');
        $.ajax({
            url : 'http://data.273.cn/',
            data : {
                car_type : car_type,
                series_id : series_id,
                _act : 'getmodel',
                _mod : 'vehicleV2'
            },
            dataType : 'jsonp'
        }).done(function (data) {
            if (!data) return;
            var list = [];
            var anchors = Object.keys(data);
            var $list, $items, $item, scrollTop;
            // 降序
            anchors.sort(function(a, b) {
                return b != '#' && (a == '#' || b - a);
            });
            $.each(anchors, function (i, v) {
                var _v = v;
                if (_v != '#') {
                    _v += '年款';
                }
                list.push({
                    text : _v,
                    letter : true
                });

                $.each(data[v], function (i, item) {
                    item.year = _v;
                });
                list = list .concat(data[v]);
            });
            var template_data = {
                tip : '请选择车型，若无相符车型，请直接输入',
                list : list
            }
            if (list.length > 10) {
                template_data.overflow = true;
            }
            $model_content.html(Widget.template(template, template_data));
            $list = $model_content.find('.list');
            $items = $list.find('.letter');
            $nav = $list.find('.vechicle-nav');

            if (Ua.ie === 6) {
                $('#vehicle-model-nav').remove();
                $nav.appendTo(document.body);
            }

            $nav.attr('id', 'vehicle-model-nav');
            $item = $();
            $list.scroll(function () {
                scrollTop = $list.scrollTop();
                $items.each(function (i, el) {
                    var $el = $(el);
                    var $next = $($items[i + 1]);
                    if (scrollTop > $el.position().top && (!$next.size() || scrollTop < $next.position().top)) {
                        Position.pin({el:$nav, fixed:true, x:'top', y: 'left'},{el: $list, x:'top', y:'left'});
                        $nav.find('a').html($el.find('a').html()).end().show();
                        $item = $el;
                        return false;
                    }
                });
            });
            $model_div.removeClass('loading').addClass('active');
        });
    }).on('keyup', '[type=text]', function (e) {
        if ($model_div.hasClass('active') && $.inArray(e.which, [13, 16, 17, 18, 91]) === -3) {
            $model_div.removeClass('active');
            if (Ua.ie === 6) {
                $('#vehicle-model-nav').hide();
            }
            $model_hidden_input.val(0);
            model_id = 0;
        }
        if (!$model_div.hasClass('active') && !$model_input.val() && e.which === 8){
            $model_input.focus();
        }

    }).on('change', function () {
    }).on('click', '.close', function () {

        $model_div.removeClass('active');
        if (Ua.ie === 6) {
            $('#vehicle-model-nav').hide();
        }
        return false;
    }).on('click', '.list a', function () {

        var $this = $(this), $item, type;
        var value = $this.data('value');
        var text = $this.text();

        if ($this.data('year') !== '#') {
            text = $this.data('year') + ' ' + text;
        }
        if (!value) {
            return;
        }
        if (value != model_id) {
            $model_input.val(text);
            $model_hidden_input.val(value);

            model_id = value;
            // 确定车类型（如果未选）
            if (!car_type && value) {
                $.ajax({
                    url : 'http://data.273.cn/',
                    data : {
                        model_id : model_id,
                        _mod : 'vehicleV2',
                        _act : 'gettype'
                    },
                    dataType : 'jsonp'
                }).done(function (data) {
                    if (!data || !data.value) return;

                    $item = $type_div.find('[data-value=' + data.value +']');

                    if ($item.length > 0) {
                        $item.trigger('click', [true]);
                    }
                });
            }
        }
        $model_div.removeClass('active');
        if (Ua.ie === 6) {
            $('#vehicle-model-nav').hide();
        }
        $model_input.blur();// 触发验证
        return false;
    }).on('reset', function () {
        $model_div.hide();
        $model_input.val(modelDefaultValue);
        $model_hidden_input.val(0);
        model_id = 0;

    });
    if (parseInt($model_hidden_input.val()) || $.trim($model_input.val()) != '') {
        $model_div.show();
    }
    // 因为还没有model autocomplete
    var modelDefaultValue = '请选择车型';
    $model_input.focus(function () {
        var value = $.trim($model_input.val());
        if (value === modelDefaultValue) {
            $model_input.val('');
        }
    }).blur(function () {
        var value = $.trim($model_input.val());
        if (!value) {
            $model_input.val(modelDefaultValue);
        }
    });


    //手动输入品牌时，自动联想
    var autoTpl = '' +
        '<div class="<%= classPrefix %>" >' +
            '<ul class="<%= classPrefix %>-items" data-role="items">' +
                '<% items.forEach (function (item) {%>' +
                    '<li class="<%= classPrefix %>-item">' +
                        '<a href="javascript:;" data-role="item" data-series-id="<%= item.series_id %>" data-brand-id="<%= item.brand_id || 0 %>" data-value="<%= item.value %>"><%= item.text || item.value %></a>' +
                    '</li>' +
                '<% }); %>' +
            '</ul>' +
        '</div>';

    var auto_brand = new AutoComplete({
        el : $brand_input,
        placeholder : '请选择品牌',
        dataSource : 'http://data.273.cn/?_mod=vehicleComplete&_act=getbrandseries&query=<%=query%>',
        overflow : 10,
        template : autoTpl,
        focusAble : false,
        params : function () {
            return {
                car_type : $type_hidden_input.val()
            }
        },
        onItemSelect : function (data) {
            var arr;
            if (data.series_id) {
                arr = data.value.split('_');
                $brand_input.val(arr[0]);
                $series_input.val(arr[1]);
                series_id = data.series_id;
                brand_id = data.brand_id;
                $model.show();
                $model_text_input.focus();
                $series_div.show();
                $brand_hidden_input.val(data.brand_id);
                $series_hidden_input.val(data.series_id);
                $brand_input.blur();
                $series_input.blur();
            } else {
                $brand_input.val(data.value);
                brand_id = data.brand_id;
                $series_div.show();
                $brand_hidden_input.val(data.brand_id);
                $brand_input.blur();
                $series_input.focus();
            }
        }
    });

    //手动输入车系时，自动联想
    var auto_series = new AutoComplete({
        el : $series_input,
        placeholder : '请选择车系',
        dataSource : 'http://data.273.cn/?_mod=vehicleComplete&_act=getseries&query=<%=query%>',
        overflow : 10,
        template : autoTpl,
        focusAble : false,
        params : function () {
            return {
                car_type : $type_hidden_input.val(),
                brand_id : $brand_hidden_input.val()
            }
        },
        onItemSelect : function (data) {
            $series_input.val(data.value);
            series_id = data.series_id;
            $model.show();
            $model_text_input.focus();
            $series_hidden_input.val(data.series_id);
            $series_input.blur();
        }
    });

    //--------------------------//
    //      下拉框显示隐藏      //
    //--------------------------//
    $(document).on('click.vehicle', function (e) {
        if (!$.contains($brand_div[0], e.target)) {
            if (Ua.ie === 6) {
                $('#vehicle-brand-nav').hide();
            }
            $brand_div.removeClass('active');
        }
        if (!$.contains($series_div[0], e.target)) {
            $series_div.removeClass('active');
        }
        if (!$.contains($model_div[0], e.target)) {
            if (Ua.ie === 6) {
                $('#vehicle-model-nav').hide();
            }
            $model_div.removeClass('active');
        }
    });
    $(window).scroll(function () {
        $('#vehicle-model-nav').hide();
        $('#vehicle-brand-nav').hide();
    });
});
