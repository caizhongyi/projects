/*!
* 活动分类弹出层
* 
* 作者：jgglg
* email:jgglg@163.com
* Date: 2012/3/18 01:57
* 修正时间：2012/7/25 21:22
* 用法描述：
* 新用法描述：
* options:{alphopts:{}}
* alphopts默认参数如下：
* var defaults = {
elementid: '', //关联操作弹出层的元素ID
callback: null//回调函数，此处必须填写
}
* 以下内容已被废弃
overlayopts:{}
id:'',//弹出层ID
elementid:'',//关联操作弹出层的元素ID
*/
//////////////////////
// 地址薄
var tip = {};
function addressbook(options) {
    var defaults = {
        elementid: '', //关联操作弹出层的元素ID
        callback: null//回调函数
    };
    var opts = $.extend({}, defaults, options);
    var $dialog = null;
    var dialog_id = opts.elementid + '_ab';
    if ($.data(document.body, dialog_id) === undefined) {        //构造UI
        var html = _getUI(opts.elementid);
        $dialog = $(html).appendTo($('body'));
        $.data(document.body, dialog_id, $dialog);
    }
    else {
        $dialog = $.data(document.body, dialog_id);
    }
    /**
     * 在标签上加入 data-loader="class-dialog"
     * $('body').loader(); 此方法效率更低，相当于 页面上有 data-loader 的都会被重新初始化一次
     * console.log(test_ab.show()) ；
     * */
    var dialog = new Class.dialog('#'+dialog_id);  // 创建一个弹出窗对像
    dialog.show();
    _MainEvent();
    //初始化数据
    function _InitData() {
        
    }
    //主界面注册
    function _MainEvent() {
        $('#'+dialog_id).find('.sitenav').on('mouseenter', 'a', function () {
            $(this).addClass('selected').siblings().removeClass('selected').end()
                       .parent().next('.sitepanel').children().hide().eq($(this).index()).
                       stop(true, true).fadeIn();
        });
    }
    //list界面事件注册
    function _ListEvent() {
        $('.loading-mask,.loading').hide();
    };
    //地图界面事件注册
    function _MapEvent() {
    };
    //主界面
    function _getUI(id) {
        var _ui = '<div  id="' + id + '_ab" class="dialog ui-dialog full-bd-dialog" data-loader="class-dialog" data-options="handler:\'header\'" style="display:none;">';
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
        _ui += '<div class="loading-wrap">';
        _ui += '   <div class="loading"></div>';
        _ui += '   <div class="loading-mask"></div>';
        _ui += _ListUI(); //默认
        _ui += _mapUI(); //默认
        _ui += '</div>';
        _ui += '</div>';
        _ui += '</div>';
        _ui += '</div>';
        _ui += '</div>';
        return _ui;
    };
    //list界面
    function _ListUI() {
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
    };
    //地图界面
    function _mapUI() {
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
    };
};