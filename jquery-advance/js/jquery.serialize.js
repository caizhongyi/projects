;
(function ( $ ) {
    /**
     * @author caizhongyi
     * @version 1.0
     * @description 序列化表单
     * @requires  jquery.1.7.2
     * @memberOf $.fn
     * @return {object} 表单提交序列化对象
     * @example
     * <form></form>
     * $('form').serializeObject();
     */
    $.fn.serializeObject = function () {
        var res = {};
        var arr = $( this ).serializeArray();
        for(var i = 0 ; i< arr.length;  i++){
            res[arr[i].name] = arr[i].value;
        }
        return res;
    };
    /**
     * @author caizhongyi
     * @version 1.0
     * @description 对象反序列化表单
     * @requires  jquery.1.7.2
     * @memberOf $.fn
     * @param {object} data
     * @return this
     * @example
     * <form></form>
     * $('form').unserializeObject({});
     */
    $.fn.unserializeObject = function ( data ) {
        $( this ).find( '[name]' ).each( function () {
            $( this ).val( data[$( this ).attr( 'name' )] );
        } );
        return this;
    };
    /**
     * @author caizhongyi
     * @version 1.0
     * @description 重设文本框值为空
     * @requires  jquery.1.7.2
     * @memberOf $.fn
     * @return this
     * @example $('.resetForm').resetForm();
     */
    $.fn.resetForm = function () {
        $( this ).find( '[name]' ).each( function () {
            $( this ).val( '' );
        } );
        return this;
    };
})( jQuery );