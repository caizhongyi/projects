^/**
 * Created with JetBrains WebStorm.
 * User: cai
 * Date: 12-11-28
 * Time: 下午6:36
 * To change this template use File | Settings | File Templates.
 * http://www.alienjs.net
 */
;
(function ( Function ) {
    /**
     * @description 循环执行函数
     * @param {number} interval 循环间隔
     * @param {number} count 循环次数
     * @param {object} args 传入参数
     * @return {function} this
     * @example
     * */
    Function.prototype.repeat = function ( interval , count , args ) {
        var time ,
            _this = this,
            index = 0;
        interval = interval || 1000;
        if ( count && count > 0 ) {
            /**
             * @ignore
             * */
            var fn = function ( index , args ) {
                if ( index == count ) {
                    return;
                }
                var res = _this.call( _this , index , args );
                if ( res != false ) {
                    time = setTimeout( function () {
                        fn.call( _this , ++ index , args );
                    } , interval );
                }
            }
            fn( index , args );
            this.timeFn = 'setTimeout';
        }
        else {
            /**
             * @ignore
             * */
            var fn = function ( index , args ) {
                var res = _this.call( _this , index , args );
                if ( res == false ) {
                    time && clearInterval( time );
                }
            }
            time = setInterval( function () {
                fn( ++ index , args );
            } , interval );
            fn( index , args );
            this.timeFn = 'setInterval';
        }
        this.timeId = time;
        return this;
    };
    /**
     * @description 停止循环执行函数
     * @return {function} this
     * @example
     * */
    Function.prototype.stop = function () {
        if ( this.timeFn == 'setInterval' ) {
            clearInterval( this.timeId );
        }
        else {
            clearTimeout( this.timeId );
        }
        return this;
    }
})( Function );