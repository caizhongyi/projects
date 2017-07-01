!(function ($) {
    $.fn.inputsync = function (options) {
  /*      options = $.extend(true, {}, {
        }, options);*/

        return $(this).each(function () {
            var selector = $(this).data('bind'), iframe = $(this).data('iframe') , self = this;

            function setVal( $elem ){
                if( $(this).val() == '' ||  $elem == $elem.val() ){
                    if($(this).val() == ''){
                        switch (typeof $elem){
                            case 'INPUT' : $elem.val( $(this).attr('placeholder') ); break;
                            default :$elem.html( $(this).attr('placeholder') ); break;
                        }
                    }
                    return
                };
                switch (typeof $elem){
                    case 'INPUT' :  case 'BUTTON' : $elem.val( $(this).val()); break;
                    default :$elem.html( $(this).val()); break;
                }
            }

            function bind( target ){
                setVal.call(this , target );
                $(this).off('change.inputsync').on('change.inputsync',function(){
                    setVal.call( self , target );
                }).off('keyup.inputsync').on('keyup.inputsync',function(){
                    setVal.call( self , target  )
                })
            }

            if(iframe){
                $(this).data('inputsync' , "inputsync" + parseInt(Math.random() * 100000))
                $( iframe ).off('load.' + $(this).data('inputsync')).on('load.'+ $(this).data('inputsync'),function(){
                    bind.call( self , $(this).contents().find( selector ));
                })
            }
            else{
                bind.call( self , $( selector ));
            }

        })
    }
})(window.jQuery || Zepto);

