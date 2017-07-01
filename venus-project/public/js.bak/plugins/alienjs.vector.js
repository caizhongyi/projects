/**
 * @description 基于Canvas的重力环境模似
 * @author caizhongyi
 * @website http://www.alienjs.net
 * @QQ : 274142780
 * */
var zero = zero || {};
zero.vector = function(options){
    options      = options || {};
    this.g      = options.g || 9;    // 重力加速度
    this.r      = options.r || 0.1;  //磨擦力
    this.t      = options.t || 1;    //时间间隔，秒为单位(ms)
    this.width  = options.width || 400;
    this.height = options.height || 300;
    this.elems  = [];
    this.timer ;
}
zero.vector.prototype = {
    add : function(elem){
        elem.verctor = this;
        if(elem.isstop) {
            elem.stop();
        }
        else{
            elem.a.y += this.g;
        }
        this.elems.push(elem);
        return this;
    },
    start : function(fn){
        var that = this;
        this.timer = setInterval( function(){
            fn.call(that);
        } , 100)  ;
        return this;
    },
    stop : function(){
        clearInterval(this.timer);
        return this;
    }
}

zero.vector.elem = function( options ){
    options = options || {};
    this.pos    = options.pos || { x : 0 , y : 0 };
    this.v      = options.v || { x : 0 , y : 0 };     //速度
    this.a      = options.a || { x : 0  , y : 0 };     //加速度
    this.e      = options.e || 4;     //弹力损耗
    this.isstop = options.isstop || false;
    this.width  = options.width || 5;
    this.height = options.height || 5;
   // this.withoutGravity = false;
    this.verctor ;

};
zero.vector.elem.prototype = {
    stop : function(){
        this.a = { x: 0 , y : 0 };
        this.v = { x: 0 , y : 0 };
        return this;
    },
    start : function( v ){
       // this.a = a || { x: 0 , y : 0};
        this.v = v || { x: 0 , y : 0};
    //    this.a.x = Math.abs(this.a.x);
     //   this.a.y = Math.abs(this.a.y);
        this.a.y += this.verctor.g;
        return this;
    },
    iscollide : function(){

    },
    draggable : function(){},
    position  : function(){
       /* if(this.a.y == 0 && this.v.y == 0 && this.v.x == 0 && this.a.x == 0){
            this.verctor.stop();
        }*/

        this.v.x =  parseFloat(this.v.x) + parseFloat(this.a.x) * parseFloat(this.verctor.t) ;
        this.v.y =  parseFloat(this.v.y) + parseFloat(this.a.y) * parseFloat(this.verctor.t);

        this.pos.x = parseFloat(this.pos.x) +  this.v.x * this.verctor.t ;
        this.pos.y = parseFloat(this.pos.y) +  this.v.y * this.verctor.t;

        var room = {
            width : this.verctor.width - this.width,
            height : this.verctor.height - this.height
        }
        if(this.pos.y >= room.height) {
            //弹力消耗
            this.v.y -= this.e;
            //磨擦力消耗
            var r = this.v.x > 0 ? - this.verctor.r : this.verctor.r;
            this.v.x = Math.abs( r) > Math.abs(this.v.x)  ? 0 :this.v.x + r;

            this.v.y = - this.v.y;
            this.pos.y =  room.height;
        }

        if(this.pos.x <= 0 || this.pos.x >= room.width) {
            //弹力消耗
            this.v.x -= this.e;
            //磨擦力消耗
            var r = this.v.y > 0 ? - this.verctor.r : this.verctor.r;
            this.v.y =  Math.abs( r) > Math.abs(this.v.y)   ? 0 :this.v.y + r;

            this.v.x = - this.v.x;
            if(this.pos.x <= 0){
                this.pos.x = 0;
            }
            else{
                this.pos.x = room.width;
            }
        }
        return this.pos;
    }
}