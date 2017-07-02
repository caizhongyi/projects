/**
 * Created with JetBrains WebStorm.
 * User: cai
 * Date: 12-11-28
 * Time: 下午6:41
 * To change this template use File | Settings | File Templates.
 * http://www.alienjs.net
 */
;
(function ( Array ) {
    //Array.prototype.sort 排序
    /**
     * @description 删除重复值的新数组
     * @return {array}
     * @example
     * */
    Array.prototype.unique = function () {
        var result = [];
        for ( var i = 0,
                  l = this.length ; i < l ; i ++ ) {
            for ( var j = i + 1 ; j < l ; j ++ ) {
                if ( this[i] === this[j] ) j = ++ i;
            }
            result.push( this[i] );
        }
        ;
        return result;
    };
    /**
     * @description 交换
     * @return {array}
     * @example
     * */
    Array.prototype.swap = function ( item1 , item2 ) {
        var rs = this, index1, index2;
        if ( typeof item1 == 'number' ) {
            index1 = item1;
        }
        else {
            index1 = rs.index( item1 );
        }
        if ( typeof item2 == 'number' ) {
            index2 = item2;
        }
        else {
            index2 = rs.index( item2 );
        }
        var tpl = rs[index1];
        rs[index1] = rs[index2];
        rs[index2] = tpl;
        return rs;
    };
    /**
     * @description 对原数组进行洗牌；
     * @return {array} 新数组
     * @example
     * */
    Array.prototype.shuffle = function () {
        // Jonas Raoni Soares Silva
        //http://jsfromhell.com/array/shuffle [v1.0]
        for ( var j, x, i = this.length ; i ; j = parseInt( Math.random() * i ), x = this[-- i], this[i] = this[j], this[j] = x );
        return this;
    };
    /**
     * @description 从数组中随机抽选一个元素出来；
     * @return {object} 随机的元素
     * @example
     * */
    Array.prototype.random = function () {
        return this.shuffle()[0]
    };
    /**
     * @description 只有原数组不存在才添加它；
     * @param {string|int} el 增加的无素
     * @return {array} this
     * @example
     * */
    Array.prototype.ensure = function ( el ) {
        if ( ! this.has( el ) )
            this.push( el );
        return this;
    };
    /**
     * @description 拷贝一数组；
     * @return {array} 新的数组
     * @example
     * */
    Array.prototype.clone = function () {
        var array = [];
        for ( var i = 0 ; i < this.length ; i ++ ) {
            array.push( this[i] )
        }
        ;
        return array;
    };
    /**
     * @description 删除数组中的某个值，参数支持值和数组位置；
     * @param {number|string} index 索引或字符
     * @return {array}
     * @example
     * */
    Array.prototype.remove = function ( index ) {
        if ( typeof index == 'number' && ! this.has( index ) ) {
            this.splice( index , 1 )
        }
        else {
            var i = this.index( index );
            this.splice( i , 1 )
        }
        ;
        return this;
    };
    /**
     * @description 检查数组是否包含某个值
     * @param {string} str 要简查的值
     * @return {boolean} 是否存在
     * @example
     * */
    Array.prototype.has = function ( str ) {
        return this.index( str ) != - 1
    };
    /**
     * @description 检查数组是否包含某个值
     * @param {string} str 要简查的值
     * @return {number} 返回索引
     * @example
     * */
    Array.prototype.index = function ( str ) {
        for ( var i = 0,
                  il = this.length ; i < il ; i ++ ) {
            if ( this[i] == str ) return i
        }
        ;
        return - 1
    };
    /**
     * @description 循环数组并执行
     * @return {array}
     * @example
     * */
    Array.prototype.each = function ( fn ) {
        for ( var i = 0 ; i < this.length ; i ++ ) {
            var o = this[i];
            if ( fn.call( o , i , o ) === false ) {
                return this;
            }
        }
        ;
        return this;
    };

    /**
     * @description 反向排序
     * @return {array}
     * @example
     * */
    Array.prototype.reverse = function ( fn ) {
        var arr = [] ;
        for ( var i = this.length - 1 ; i >=0 ; i -- ) {
            arr.push(this[i]);
        }
        return arr;
    };
    /**
     * @description 循环数组，并执行后返回新的数组
     * @return {array} 新的数组
     * @example
     * */
    Array.prototype.map = function ( fn ) {
        var _this = this;
        var fun = function ( i , n ) {
            _this[i] = fn.call( this , n , i);
        };
        return this.each( fun );
    };

    /**
     * @description 判断是否重复值
     * @return boolean
     * @example ['a','b','a'].isrepeat();
     * */
     Array.prototype.isrepeat = function(){
        var ary = this;
        var nary = ary.sort();
        for(var i=0;i<ary.length;i++){
            if (nary[i] == nary[i+1]){
                return true;
            }
        }
        return false;
    };
})( Array );
