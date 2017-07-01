/**
 * Created with JetBrains WebStorm.
 * User: caizhongyi
 * Date: 13-7-26
 * Time: 上午9:55
 * To change this template use File | Settings | File Templates.
 */
(function( win ){
     win.jCanvas = win.jCanvas || {};

     jCanvas.create = function( prop , superClass){
         var sprite = function(){
             this.init && this.init.apply(this,arguments);
         }
         if(superClass){
             for(var p in superClass.prototype){
                 if(!prop[p])
                     prop[p] = superClass.prototype[p]
             }
         }
         sprite.prototype = prop;
         return  sprite;
     }

     jCanvas.debug = {
         console : function(msg){ window.console && console.log(msg) ;}
     };

     jCanvas.easing = {
        linear: function( p ) {
            return p;
        },
        swing: function( p ) {
            return 0.5 - Math.cos( p*Math.PI ) / 2;
        },
        def : 'easeOutQuad' ,
        swing : function ( x , t , b , c , d ) {
            //alert(sprite.easing.default);
            return sprite.easing[sprite.easing.def]( x , t , b , c , d );
        } ,
        easeInQuad : function ( x , t , b , c , d ) {
            return c * (t /= d) * t + b;
        } ,
        easeOutQuad : function ( x , t , b , c , d ) {
            return - c * (t /= d) * (t - 2) + b;
        } ,
        easeInOutQuad : function ( x , t , b , c , d ) {
            if ( (t /= d / 2) < 1 ) return c / 2 * t * t + b;
            return - c / 2 * ((-- t) * (t - 2) - 1) + b;
        } ,
        easeInCubic : function ( x , t , b , c , d ) {
            return c * (t /= d) * t * t + b;
        } ,
        easeOutCubic : function ( x , t , b , c , d ) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        } ,
        easeInOutCubic : function ( x , t , b , c , d ) {
            if ( (t /= d / 2) < 1 ) return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        } ,
        easeInQuart : function ( x , t , b , c , d ) {
            return c * (t /= d) * t * t * t + b;
        } ,
        easeOutQuart : function ( x , t , b , c , d ) {
            return - c * ((t = t / d - 1) * t * t * t - 1) + b;
        } ,
        easeInOutQuart : function ( x , t , b , c , d ) {
            if ( (t /= d / 2) < 1 ) return c / 2 * t * t * t * t + b;
            return - c / 2 * ((t -= 2) * t * t * t - 2) + b;
        } ,
        easeInQuint : function ( x , t , b , c , d ) {
            return c * (t /= d) * t * t * t * t + b;
        } ,
        easeOutQuint : function ( x , t , b , c , d ) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        } ,
        easeInOutQuint : function ( x , t , b , c , d ) {
            if ( (t /= d / 2) < 1 ) return c / 2 * t * t * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        } ,
        easeInSine : function ( x , t , b , c , d ) {
            return - c * Math.cos( t / d * (Math.PI / 2) ) + c + b;
        } ,
        easeOutSine : function ( x , t , b , c , d ) {
            return c * Math.sin( t / d * (Math.PI / 2) ) + b;
        } ,
        easeInOutSine : function ( x , t , b , c , d ) {
            return - c / 2 * (Math.cos( Math.PI * t / d ) - 1) + b;
        } ,
        easeInExpo : function ( x , t , b , c , d ) {
            return (t == 0) ? b : c * Math.pow( 2 , 10 * (t / d - 1) ) + b;
        } ,
        easeOutExpo : function ( x , t , b , c , d ) {
            return (t == d) ? b + c : c * (- Math.pow( 2 , - 10 * t / d ) + 1) + b;
        } ,
        easeInOutExpo : function ( x , t , b , c , d ) {
            if ( t == 0 ) return b;
            if ( t == d ) return b + c;
            if ( (t /= d / 2) < 1 ) return c / 2 * Math.pow( 2 , 10 * (t - 1) ) + b;
            return c / 2 * (- Math.pow( 2 , - 10 * -- t ) + 2) + b;
        } ,
        easeInCirc : function ( x , t , b , c , d ) {
            return - c * (Math.sqrt( 1 - (t /= d) * t ) - 1) + b;
        } ,
        easeOutCirc : function ( x , t , b , c , d ) {
            return c * Math.sqrt( 1 - (t = t / d - 1) * t ) + b;
        } ,
        easeInOutCirc : function ( x , t , b , c , d ) {
            if ( (t /= d / 2) < 1 ) return - c / 2 * (Math.sqrt( 1 - t * t ) - 1) + b;
            return c / 2 * (Math.sqrt( 1 - (t -= 2) * t ) + 1) + b;
        } ,
        easeInElastic : function ( x , t , b , c , d ) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if ( t == 0 ) return b;
            if ( (t /= d) == 1 ) return b + c;
            if ( ! p ) p = d * .3;
            if ( a < Math.abs( c ) ) {
                a = c;
                var s = p / 4;
            }
            else var s = p / (2 * Math.PI) * Math.asin( c / a );
            return - (a * Math.pow( 2 , 10 * (t -= 1) ) * Math.sin( (t * d - s) * (2 * Math.PI) / p )) + b;
        } ,
        easeOutElastic : function ( x , t , b , c , d ) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if ( t == 0 ) return b;
            if ( (t /= d) == 1 ) return b + c;
            if ( ! p ) p = d * .3;
            if ( a < Math.abs( c ) ) {
                a = c;
                var s = p / 4;
            }
            else var s = p / (2 * Math.PI) * Math.asin( c / a );
            return a * Math.pow( 2 , - 10 * t ) * Math.sin( (t * d - s) * (2 * Math.PI) / p ) + c + b;
        } ,
        easeInOutElastic : function ( x , t , b , c , d ) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if ( t == 0 ) return b;
            if ( (t /= d / 2) == 2 ) return b + c;
            if ( ! p ) p = d * (.3 * 1.5);
            if ( a < Math.abs( c ) ) {
                a = c;
                var s = p / 4;
            }
            else var s = p / (2 * Math.PI) * Math.asin( c / a );
            if ( t < 1 ) return - .5 * (a * Math.pow( 2 , 10 * (t -= 1) ) * Math.sin( (t * d - s) * (2 * Math.PI) / p )) + b;
            return a * Math.pow( 2 , - 10 * (t -= 1) ) * Math.sin( (t * d - s) * (2 * Math.PI) / p ) * .5 + c + b;
        } ,
        easeInBack : function ( x , t , b , c , d , s ) {
            if ( s == undefined ) s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        } ,
        easeOutBack : function ( x , t , b , c , d , s ) {
            if ( s == undefined ) s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        } ,
        easeInOutBack : function ( x , t , b , c , d , s ) {
            if ( s == undefined ) s = 1.70158;
            if ( (t /= d / 2) < 1 ) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        } ,
        easeInBounce : function ( x , t , b , c , d ) {
            return c - sprite.easing.easeOutBounce( x , d - t , 0 , c , d ) + b;
        } ,
        easeOutBounce : function ( x , t , b , c , d ) {
            if ( (t /= d) < (1 / 2.75) ) {
                return c * (7.5625 * t * t) + b;
            }
            else if ( t < (2 / 2.75) ) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            }
            else if ( t < (2.5 / 2.75) ) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            }
            else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        } ,
        easeInOutBounce : function ( x , t , b , c , d ) {
            if ( t < d / 2 ) return sprite.easing.easeInBounce( x , t * 2 , 0 , c , d ) * .5 + b;
            return sprite.easing.easeOutBounce( x , t * 2 - d , 0 , c , d ) * .5 + c * .5 + b;
        }
    };

     jCanvas.now = function(){
         return new Date().getTime();
     }

     jCanvas.fps ;

     /* new canvas */
     jCanvas.canvas  = jCanvas.create({
         init : function( setting ){
             this.elems = [];
             this.timer ;
         },
         start : function(){
             var that = this;
             this.timer  = setInterval(function(){
                 for(var i = 0 ; i < that.elems.length ; i ++){
                     that.elems[i].draw();
                 }
             } , 100);
             return this
         },
         stop : function(){
             clearInterval(this.timer);
             return this;
         }
     })

     jCanvas.sprite = jCanvas.create({});
    /* end new canvas */

     jCanvas.animation = jCanvas.create({
        init  : function(options){
            options = options || {};
            this.x = options.x || 0;
            this.y = options.y || 0;
            this.width = options.width || 5;
            this.height = options.height || 5;
            //设置对象的透明度
            this.opacity = options.opacity == null ? 1 : options.opacity;
            //设置图像翻转，1为不翻转，-1为翻转
            this.scale = options.scale || { x:1,  y:1 } ;
            this.skew =  options.skew || 1 ;
            this.delayVal ;
            this.isstop ;
            //定动画对象的运动方法库
            this.motionFncs = [];
            this.animates = {
                index :  0,
                duration : 0 ,
                startTime : null
            }
        },
        delay : function( sec ){
            this.motionFncs.push( { delay : sec } );
            return this;
        },
        repeat : function( count ){
            this.motionFncs.push( { repeat : count || -1 } );
            return this;
        },
        draw : function(){

        },
        stop : function(){
            this.isstop = true;
            return this;
        },
        countMotionFun : function( canvas ){
            if(this.isstop){
                return this;
            }
            if(this.motionFncs[this.animates.index]){
                var fn = this.motionFncs[this.animates.index];
                if(typeof fn == 'object' && fn.fx){
                    fn.fx(canvas , this);
                }
                else if(typeof fn == 'object' && fn.delay){
                     if(this.delayVal)
                         this.delayVal = jCanvas.now();
                     if(jCanvas.now() - this.delayVal >= fn.delay){
                         fn.fx(canvas , this);
                         this.delayVal = null;
                     }
                }
                else if(typeof fn == 'object' && fn.repeat){
                    for(var i = this.animates.index ; i > 0 ; i -- ) {
                        if(this.motionFncs[i].repeat){
                            this.animates.index = (i + 1);
                        }
                    }
                }
            }
            return this;
        },
        complete : function(){

        },
        animate : function(attr , duration ,easing ,callback){
            //  var frameCount = duration /
            var that = this;
            if(typeof duration == 'function'){
                callback = duration;
                duration = null;
            }
            if(typeof easing == 'function'){
                callback = easing;
                easing = null;
            }
            duration = duration || 2000 ;
            easing = easing || 'linear';
            easing = 'easeOutElastic';
            //this.frameCount += duration;

            this.animates.startTime = jCanvas.now();
            this.animates.duration = duration;

            var setAttr = function(attr ,target){
                var startAttr = {};
                for(var p in attr){
                    switch (p){
                        case 'scale'   :   startAttr[p] =  { x : target[p].x || that[p].x , y :  target[p].y || that[p].y }; break;
                        case 'frames'  :    that.frame = attr ; break;
                        default        :   startAttr[p] = target[p] || that[p];
                    }
                }
                return startAttr;
            }

            var startTime = this.motionFncs.length == 0 ? jCanvas.now() :  this.motionFncs[this.motionFncs.length - 1].duration +  this.motionFncs[this.motionFncs.length - 1].startTime
            var startAttr =  this.motionFncs.length == 0 ? setAttr(attr , this) : setAttr(attr ,this.motionFncs[this.motionFncs.length - 1].endAttr ) ;


            this.motionFncs.push({
                startTime : startTime,
                duration  : duration ,
                startAttr :  startAttr,
                endAttr :  attr,
                fx : function( canvas , sprite){

                    var step = function(x , t , b , c , d){
                        return jCanvas.easing[ easing ](
                            x , t , b , c , d
                        )  ;
                    }

                    var currentTime =  jCanvas.now(),
                        remaining = Math.max( 0, this.startTime + this.duration - currentTime ),
                    // archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
                        temp = remaining / this.duration || 0,
                        percent = 1 - temp;


                    for(var p in this.endAttr){
                        var end =  this.endAttr[p] ,start = this.startAttr[p];
                        if(p == 'scale' && typeof end != 'object'){
                            end = { x : end , y : end } ;
                        }

                        if(typeof end == 'object' && p == 'frames'){
                            sprite['frame'] = step(percent , this.duration  * percent, 0, 1, this.duration ) * end.length ;
                            sprite.type = 'image';
                        }
                        else if(typeof end == 'object')  {
                            for(var i in end){
                                sprite[p][i] = step(percent , this.duration  * percent, 0, 1, this.duration ) * (end[i] - end[i]) + end[i] ;
                            }
                        }
                        else{
                            sprite[p] = step(percent , this.duration  * percent, 0, 1, this.duration ) * (end - start[p]) + start[p] ;
                        }
                    }

                    if(percent >= 1){
                        if(sprite.animates.index < sprite.motionFncs.length - 1){
                            sprite.animates.index ++ ;
                        }
                        sprite.scale.x =  1;
                        sprite.scale.y =  1;
                        callback && callback.call(sprite) ;
                    }
                    sprite.draw(canvas);
                }
            })

            return this;
        }
    });

     jCanvas.canvas = jCanvas.create({
         init: function( id  , options){
             options = options || {};
             //关联canvas元素
             this.canvas = document.getElementById(id);
             //精灵字典
             this.sprites = [] ;
             this.fps = 0;//记录最后一帧的时间
             //当前帧数
             //this.frame = 0;
             // this.frameCount = 0 ;
             this.frameNum = 30 ;   //每30帧计算一次fps
             //所关联canvas元素上下文对象
             this.ctx = this.canvas.getContext('2d');
             //帧长和fps成反比
             this.stepTime = 1;
             //触发器
             this.sT;

             this.x = options.x || 0;
             this.y = options.y || 0;
             this.width = options.width || 10;
             this.height = options.height || 10;
             //设置对象的透明度
             this.opacity = options.opacity == null ? 1 : options.opacity;
             //设置图像翻转，1为不翻转，-1为翻转
             this.scale = options.scale || { x:1,  y:1 } ;
             this.skew =  options.skew || 1 ;
             //定动画对象的运动方法库
             this.motionFncs = [];
             this.animates = {
                 index :  0,
                 duration : 0 ,
                 startTime : null
             }
             //   this.lastFrameTime = (new Date()).getTime();
             //  this.frameIncrement = 1;
         },
         //设置开始渲染
         begin:function () {
             this.frame = 0;
             this.sT = setTimeout((function(param){
                 return function(){ param.render();}
             })(this),this.stepTime);
             return this;
         },
         draw : function( canvas ){
             console.log(this.scale.x)
             canvas.ctx.globalAlpha = this.opacity;
             canvas.ctx.translate( this.x , this.y );
             canvas.ctx.scale(this.scale.x ,this.scale.y);//扩大。所有的方法包括扩大，他们的对象都是针对后面要画出的图形，而非canvas画布。因此后面的fillRecr函数画的矩形的宽仍然是100，高仍然是50.这里相当于把这个矩形扩大为原来的0.95倍。
             canvas.ctx.rotate(this.angle * Math.PI/180);//旋转。
             return this;
         },
         render : function(){
             /*if(true){
              //
              var t = (new Date()).getTime();
              this.fps= Math.round((this.frameNum*10000)/ (t - this.lastFrameTime)) / 10;
              this.lastFrameTime = t;
              if(jCanvas.fps)
              jCanvas.fps.innerHTML = this.fps;
              // 动态调整 step_time ，保证 fps 恒定
              if (this.fps < 29.6 && this.stepTime > 10) {
              this.stepTime--;
              } else if (this.fps > 30.4) {
              this.stepTime++;
              }
              }*/
             this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
             //调用每个精灵的运动方程
             this.countMotionFun(this);
             for(var i in this.sprites){
                 if(typeof(this.sprites[i])=="function") continue;
                 this.sprites[i].countMotionFun(this);
             }

             //this.frame += this.frameIncrement ;
             /*  debug.console('frameCount:' + this.frameCount) ;
              if(this.frame >= this.frameCount )
              return ;*/

             this.sT = setTimeout((function(param){
                 return function(){ param.render();}
             })(this),this.stepTime);
         },
         /*
          **添加动画元素
          */
         append:function(sprite){
             this.sprites[sprite.id] = sprite;
             sprite.canvas = this;
             sprite.animate()
             return this;
         },
         /*
          **删除动画元素
          */
         remove:function(id){
             this.sprites[id] && delete this.sprites[id];
             return this;
         },
         /*
          **停止动画
          */
         stop:function(){
             clearInterval(this.sT)
         },
         clear:function(){
             for(var i in this.sprites){
                 if(typeof(this.sprites[i]) == "function") continue;
                 delete this.sprites[i];
             }
         }
     } , jCanvas.animation)


     jCanvas.sprite = jCanvas.create({
         init : function( id , options ){
            options = options || {};
            this.x = options.x || 0;
            this.y = options.y || 0;
            this.width = options.width || 5;
            this.height = options.height || 5;
            //设置对象的透明度
            this.opacity = options.opacity == null ? 1 : options.opacity;
            //设置图像翻转，1为不翻转，-1为翻转
            this.scale = options.scale || { x:1,  y:1 } ;
            this.skew =  options.skew || 1 ;
            this.frame = 0 ;
            this.frames = [] ;
            this.type = 'circle';
            //定动画对象的运动方法库
            this.motionFncs = [];
            this.animates = {
                index :  0,
                duration : 0 ,
                startTime : null
            }
          //  this.frame = 0;
          //  this.frameCount = 0;
           // this.lastFrame = 0 ;
            this.id = id;
            this.canvas ;

            jCanvas.debug.console('create element : '+ id) ;
            return this;
        },
        /*draw : function( setting ){
           var ctx = this.canvas.ctx;
           if( typeof  setting == 'image'  ){
               var img = new Image( setting.url ) ;
               ctx.drawImage(setting ,this.x , this.y , this.width , this.height);
           }
           else if(typeof setting == 'object' && setting.length){
               ctx.drawImage(setting[this.key] ,this.x , this.y , this.width , this.height);
           }
           else if(typeof setting == 'string'){
               ctx.drawImage(new Image( setting ) ,this.x , this.y , this.width , this.height);
           }
           return this;
        },*/
         // t: current time, b: begInnIng value, c: change In value, d: duration
         draw : function( canvas ){
             switch (this.type){
                 case 'circle' : this.drawCircle(); break;
                 case 'image' : this.drawImage(); break;
                 default : this.drawCircle(); break;
             }
             return this ;
         },
         drawImage : function(canvas){
             canvas = canvas || this.canvas;
             var img = new Image(this.frames[this.frame]) ;

             canvas.ctx.drawImage(img ,this.x , this.y , this.width , this.height);
             return this;
         },
         drawCircle : function(canvas){
             canvas = canvas || this.canvas;
             canvas.ctx.save();
             canvas.ctx.beginPath();
             canvas.ctx.lineWidth = "1";
             canvas.ctx.strokeStyle ='#000';
             canvas.ctx.fillStyle ="rgba("
                 + Math.floor(0) + ","
                 + Math.floor(255) + ","
                 + Math.floor(255) + ","
                 + this.opacity + ")";
             canvas.ctx.arc(this.x, this.y, 5 ,0,Math.PI*2,true)
             canvas.ctx.closePath();
             canvas.ctx.stroke();
             canvas.ctx.fill();
             return this;
         },
         appendTo : function( canvas ){
             canvas.sprites[this.id] = this;
             this.canvas = canvas;
             this.animate();
             return this;
         },
         remove : function( ){
             this.canvas.sprites[this.id] && delete this.canvas.sprites[this.id] ;
             return this;
         },
         clone : function(canvas){

         }
    } , jCanvas.animation);


})( window )




