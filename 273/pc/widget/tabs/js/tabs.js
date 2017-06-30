var Class = window.Class ||  require('class') ;
var Cookie = window.Cookie ||  require('cookie');
var $ = window.jQuery ||  require('jquery');

/**
 * 选项卡切，导航为[data-tab-nav] ， 例表为[data-tab-item]
 * @param selector {jquery|selector} 选择器
 * @params options.type {string} 当前选择项保存方式,默认: cooike | hash
 * @params options.activeClass {string} 当前active样式,默认: active
 * @return object
 * */

var Tabs = Class.create({
    initialize: function( selector , options ) {
        var _this = this;

        this.options = $.extend({}, {
            type : 'cooike',
            activeClass : 'active'
        } , options);
        this.urlString  = '' ;
        this.url = {};

        var $container =  this.$ = $(selector),
            $tabs = $container.find("[data-tab-nav]");
           /* $items = $container.find(".tabs-item"),
            $preloader = $container.find(".tabs__preloader"),
            $this,*/
        this.$.on("click.tabs",'[data-target]', function(e){
            e.preventDefault();
            var $navItem = $('[data-target='+ $(this).data('target') +']' , _this.$ );
            //showPreloader();
            _this.setTab( $navItem , $(this).data("target"));
        });

        var target ;
        if (_this.options.type === "hash") {
            target = location.hash ;
        }
        else if (_this.options.type === "cooike") {
            target = Cookie.get('tabsCurrent' )
        }
        // Set tabs at start
        if ( target ) {
            this.setTab( target , target);
        } else {
            var item = $tabs.find('[data-tab-nav]').eq(0) ;
            this.setTab( item , item.data("target"));
        }

    },
    setTab :  function ( elem , target) {
      /*  var showPreloader = function () {
            $preloader.show()
        };

        var hidePreloader = function () {
            $preloader.hide();
        };*/

        if( typeof  elem == 'string'){
            elem = $('[data-target='+ elem +']')
        }

        if( !elem.length ) return ;

        target = decodeURIComponent(target);
        elem.addClass( this.options.activeClass).siblings().removeClass( this.options.activeClass );
        var $target = $( target ) ;
        if( !$target.length ) $target = $("[data-tab-item="+ target +"]");
        $target.addClass( this.options.activeClass ).show().siblings('[data-tab-item]').removeClass( this.options.activeClass ).hide();
        this.setUrl(target);

        // trigger event and execute callback
        this.trigger('change',  {
            group: name,
            tab: target
        })
    },
    setUrl : function( target ){
        var  _this = this;
        if (_this.options.type === "hash") {
            location.hash = target;
        }
        else if (_this.options.type === "cooike") {
            Cookie.set('tabsCurrent', target )
        }
        return this;
    }
})


if(typeof module != 'undefined') module.exports = Tabs ;