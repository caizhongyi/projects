var AddressTopModel = Backbone.Model.extend({
    urlRoot: '/Plugin/AddressBook/',
    getTop: function (options) {
        if (options) {
            options.success = typeof (options.success) === "function" ? options.success : function () { };
            options.error = typeof (options.error) === "function" ? options.success : function () { };
        }
        $.ajax({
            type: "get",
            url: this.urlRoot,
            data: null,
            dataType: "json",
            success: options.success,
            error: options.error
        });
    }
});
var topcategory = new AddressTopModel();
//view
var AddressAppView = Backbone.View.extend({
    el: $('body'),
    model: topcategory,
    tempid: '',
    events: {
        "click .carousel-items li": "topclick"
    },
    topclick: function () {
        alert(1);
    },
    slidingEvents: function () {
        $('#' + this.options.pluginid + '_ab').find('.sitenav').on('mouseenter', 'a', function () {
            $(this).addClass('selected').siblings().removeClass('selected').end()
                       .parent().next('.sitepanel').children().hide().eq($(this).index()).
                       stop(true, true).fadeIn();
        });
    },
    initialize: function () {
    },
    success: function (data) {
        if (data.Result) {
            var licontent = '<li id="{0}"><img src="{1}" alt="{2}"/><br><span>{3}</span></li>';
            _.each(data.Msg, function (item, index) {
                $('.carousel-items').append(
                licontent.replace('{0}', item.ID).replace('{1}', item.LogoImage)
                .replace('{2}', item.Name).replace('{3}', item.Name)
                );
            });

        }
    },
    error: function () {
    },
    ///输出
    render: function () {
        var dialog_id = this.options.pluginid + '_ab';
        if ($.data(document.body, dialog_id) === undefined) {        //构造UI
            $.data(document.body, dialog_id, this.$el.append(this._mainUI()));
        }
        this.slidingEvents();
        this.model.getTop({ success: this.success, error: this.error });
        var dialog = new Class.dialog('#' + dialog_id);
        dialog.show();        
        return this;
    },
    ///主界面
    _mainUI: function () {
        var _ui = '<div  id="' + this.options.pluginid + '_ab" class="dialog ui-dialog full-bd-dialog"  data-options="handler:\'header\'">';
        _ui += '<div class="bg"></div>';
        _ui += '<div class="inner">';
        _ui += '<div class="hd" data-options="region:\'header\',handle:true">';
        _ui += '<h3>' + tip['ab_JsTip_title'] + '</h3>';
        _ui += '<a href="javascript:;" class="close" data-options="region:\'hide\'"></a>';
        _ui += '</div>';
        _ui += '<div class="bd">';
        _ui += '<div class="sitenav">';
        _ui += '<a class="selected" href="javascript:;"><i class="icon icon-list"></i>' + tip['ab_JsTip_firstname'];
        _ui += '</a>|<a href="javascript:;"><i class="icon icon icon-pos"></i>' + tip['ab_JsTip_secondname'] + '</a>';
        _ui += '</div>';
        _ui += '<div class="sitepanel">';
        //        _ui += '<div class="loading-wrap">';
        //        _ui += '   <div class="loading"></div>';
        //        _ui += '   <div class="loading-mask"></div>';
        _ui += this._listUI(); //默认
        _ui += this._mapUI(); //默认
        //        _ui += '</div>';
        _ui += '</div>';
        _ui += '</div>';
        _ui += '</div>';
        _ui += '</div>';
        return _ui;
    },
    _listUI: function () {
        var _ui = '<div id="listaddressbook" class="address-message">';
        _ui += '<div class="carousel pagination-radius" data-loader="class-tabs" data-options="offset:10">';
        _ui += '<a href="javascript:;" class="prev" data-options="region:\'prev\'"></a>';
        _ui += '<a href="javascript:;" class="next disabled"  data-options="region:\'next\'"></a>';
        _ui += '<div class="carousel-clip">';
        _ui += ' <ul class="carousel-items" data-options="region:\'panel\',item:\'li\'">';
        _ui += '</ul>';
        _ui += '</div>';
        _ui += '</div>';
        _ui += '<div class="clear"></div>';
        _ui += '<div class="message-main">';
        _ui += '<ul class="side-list">';
        _ui += '</ul>';
        _ui += '<div class="map-mod map-list-mod">';
        _ui += '<div class="map-result">';
        _ui += '<div class="side-infos">';
        _ui += '<div class="result-bar toolbar">';
        _ui += '<div class="pull-left">';
        _ui += '<span id="combosearchlist" class="combo " data-loader="class-combo">';
        _ui += '<span class="combo-input"></span><a class="combo-icon" href="javascript:void(0)"></a>';
        _ui += '<div class="combo-list">';
        _ui += '<ul>';
        _ui += '</ul>';
        _ui += '</div>';
        _ui += '</span>';
        _ui += '<span class="input-search" style="width: 230px;">';
        _ui += '<div class="search-inner">';
        _ui += '<input type="text" placeholder="' + tip['ab_JsTip_searchtipname'] + '" class="text">';
        _ui += '<button class="icon"></button>';
        _ui += '</div>';
        _ui += '</span>';
        _ui += '</div>';
        _ui += '<div class="pagination-wrap">';
        _ui += '</div>';
        _ui += '</div>';
        _ui += '<dl>';
        _ui += '</dl>';
        _ui += '<div class="result-bar">';
        _ui += '<div class="pagination-wrap">';
        _ui += '</div>';
        _ui += '</div>';
        _ui += '</div>';
        _ui += '</div>';
        _ui += '</div>';
        _ui += '</div>';
        _ui += '</div>';
        return _ui;
    },
    _mapUI: function () {
        var _ui = '<div id="mapaddressbook" class="map-mod side-map" style="display: none;">';
        _ui += '';
        _ui += '';
        _ui += '';
        _ui += '';
        _ui += '';
        _ui += '';
        _ui += '';
        _ui += '';
        _ui += '';
        _ui += '';
        _ui += '';
        _ui += '</div>';
        return _ui;
    }
});