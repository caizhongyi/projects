!(function ($) {
    var Touch  = function( elem ,options ){
        this.options = $.extend({} , Touch.DEFAULTS , options );
        this.$elem = $(elem) ;
        this.page = this.options.page;
        this.index = this.options.index;
        this.debug = this.options.debug;
        this.init.call( this );
    }

    Touch.prototype = {
        init : function(){
            var self = this;
            this.$list = this.$elem.find( this.options.list ) ;
            this.resize();
            this.bindEvent();
            this.change( this.options.index );
        },
        console : function( msg ){
            this.debug && console.log( msg );
            return this;
        },
        resize :  function(){
            if( this.options.full ){
                this.$elem.height( $(window).height());
            }
            var $items = this.$list.children();
            if( this.options.axis == 'x'){
                this.$list.width( ($items.length * 100) + '%');
                $items.width( (1/$items.length * 100) + '%' );
            }
            else if(this.options.axis == 'y'){
                this.$list.width('auto');
                $items.width('auto').css('float','none');
            }

            $items.height(this.$elem.height());
            return this;
        },
        bindEvent : function(){
            var startPos = {} , endPos = {} , movePercent = {} , currentCell = {},
                list = this.$elem ,
                self = this;

            this.options.resize &&  $(window).off('resize.touch').on('resize.touch',function(){
                self.resize();
                self.change( self.index );
            })

            list.off('touchstart.touch touchmove.touch touchend.touch').on('touchstart.touch', function (e) {
                var event = e.originalEvent;
                if (event.targetTouches.length >= 1) {
                    var touch = event.targetTouches[0];
                    startPos = { left : touch.pageX , top : touch.pageY };
                    currentCell = self.indexToCell( self.index );
                    self.$list.addClass('untransition');
                }
            });

            list.on('touchmove.touch', function (e) {
                var event = e.originalEvent;
                //targetTouches
                if (event.changedTouches.length >= 1) {
                    var touch = event.changedTouches[0];
                    endPos =  { left : touch.pageX , top : touch.pageY };

                    movePercent.left =  (startPos.left - endPos.left) / self.$elem.width() ;
                    movePercent.top =  (startPos.top - endPos.top) / self.$elem.height() ;

                    if( self.options.axis == 'y' ){
                        self.$list.css({
                            top :  - ((movePercent.top + currentCell.row) * 100) + '%'
                        });
                    }
                    else if( self.options.axis == 'x'){
                        self.$list.css({
                            left :  - ((movePercent.left + currentCell.col) * 100) + '%'
                        });
                    }
                    else{
                        self.$list.css({
                            left :  - ((movePercent.left + currentCell.col) * 100) + '%' ,
                            top :  - ((movePercent.top + currentCell.row) * 100) + '%'
                        });
                    }
                }
            });

            list.on('touchend.touch', function (e) {
                var event = e.originalEvent;
                if (event.changedTouches.length >= 1) {
                   // var touch = event.changedTouches[0];
                  self.$list.removeClass('untransition');
                  self.touchEnd( self.index , movePercent );
                  movePercent = {} ;
                }
            });

            return this;
        },
        change     : function( index ){
            return this.touchEnd( index , { left : 0 , top : 0 } );
        },
        touchEnd   : function( index , offset ){
            var cell = this.indexToCell( index ),
                totalCell = this.totalCell();
            var critical = 0.25;
            if( offset.left >= critical ){
                cell.col = cell.col + 1 >= totalCell.col ?  totalCell.col - 1 : cell.col + 1;
            }
            else if( offset.left < - critical ){
                cell.col = cell.col - 1 < 0 ?  0 : cell.col - 1;
            }

            if( offset.top >= critical){
                cell.row = cell.row + 1 >= totalCell.row ?  totalCell.row - 1 : cell.row + 1;
            }
            else if( offset.top < - critical ){
                cell.row = cell.row - 1 < 0 ?  0 : cell.row - 1;
            }

            this.console('当前位置 row :'+ cell.row + ',col：'+ cell.col);

            if( this.options.axis == 'y' ){
                this.$list.css({
                    top  : - cell.row * this.$elem.height()
                });
            }
            else if( this.options.axis == 'x'){
                this.$list.css({
                    left : - cell.col * this.$elem.width()
                });
            }
            else{
                this.$list.css({
                    left : - cell.col * this.$elem.width(),
                    top  : - cell.row * this.$elem.height()
                });
            }

            this.index = this.cellToIndex(cell) ;

            return this;
        },
        totalCell  : function(){
            var col  = this.$list.width() /  this.$elem.width(),
                 row  = this.$list.height() /  this.$elem.height() ;
            col = this.$list.width() % this.$elem.width() > 5 ? parseInt(col) + 1 : parseInt(col);
            return { row : row , col : col };
        },
        cellSize    : function(){
            return { width : this.$elem.width() , height : this.$elem.height() };
        },
        cellToIndex : function( cell ){
            var totalCell = this.totalCell(),
                index = cell.row  * totalCell.col + cell.col ;

            return index ;
        },
        indexToCell : function( index ){
            var totalCell = this.totalCell(),
                 row = parseInt(index / totalCell.col) ,
                 col = 0 ;

            if( index % totalCell.col != 0 ){
                col = parseInt(index % totalCell.col);
            }

            if( index == 0){
                return { row : 0 , col : 0 };
            }
            return { row : row , col : col };
        },
        getPos : function( index ){
            var cell =  this.indexToCell( index),
                left = cell.row *  this.$elem.height(),
                top  = cell.col *  this.$elem.width();
            return { left : left , top : top };
        }
       /* prev :  function(){
            var len = this.len();
            var index = this.index - 1 < 0 ?  len - 1: this.index - 1  ;
            return this.change( index , 'prev' );
        },
        next :  function(){
            var len = this.len();
            var index = this.index + 1 >= len  ?  0 : this.index + 1 ;
            return  this.change( index , 'next' );
        }*/
    }

    Touch.DEFAULTS = {
        resize      : false, // if full screen set it true;
        axis        : 'xy',
        index       : 0,
        debug        : false,
        list        : '[data-list]'
    };


    $.fn.touchslider = function ( options ) {
        var args = arguments;
        return $( this ).each(function(){
            var data = $(this).data('touchslider');
            if(!data ){
                data = new Touch( this , options );
                $(this).data('touch' , data);
            }
            var g = [];
            for( var i = 1 ; i < args.length ; i ++ ){
                g.push(args[i]);
            }
            // TODO 构造函数
            var fn = new Function( 'data' , 'options' , 'args' ,'return data[ options ](args)');

            options && data[ options ] && fn( data , options , g.join(','));
        })
    }

    $.fn.touchslider.Constructor =  Touch;

    if( typeof module === "object" && typeof module.exports === "object"  ){
        module.exports = Touch;
    }

})(window.jQuery || Zepto);



