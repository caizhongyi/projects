/**
 * @author tx
 * @since 2011-6-14
 * @package plugin
 */
(function($,win,undefined){
	var CONFIG = {
			items : 'li',         //元素
			next : null,          //前进
			prev : null,          //后退
			flyer : null,         //跳转
			flyerActiveClass : '',         //跳转焦点样式
			showNum : 3,          //显示最大数
			moveNum : 1,          //每次移动数
			stepSize : 100,       //移动步长
			auto : true,          //自动
			speed : 3000,         //循环间隔
			duration : 500,       //动画过渡时间
			arrow : 'up',       //运动方向
			transition : null,    //过渡效果
			// cycle : true,         //循环
			locked : false        //锁定
		},
		NAME = 'aeolus',
		_hash = [],
		direction = {
			'up' : ['marginTop' , -1],
			'down' : ['marginTop' , 1],
			'left' : ['marginLeft' , -1],
			'right' : ['marginLeft' , 1]
		},

		api = function(root, cfg){
			var items = root.find(cfg.items);
			if(items.length <= cfg.showNum || cfg.showNum < cfg.moveNum)return;

			root.data(NAME, this);
			this.index = _hash.push({}) - 1;
			var self = this,
				h = _hash[self.index];
			self.cfg = cfg;
			h.root = root;
			h.direction = direction[cfg.arrow][0];
			h.arrow = direction[cfg.arrow][1];
			//root[0].style.position = 'relative';
			root[0].style[h.direction] = '0px';
			h.items = [];
			for(var i = 0,l = items.length;i < l;i++){
				h.items.push(items.eq(i));
				h.items[i].attr('rollIndex',i);
			}
			h.num = [h.items.length,cfg.showNum,cfg.moveNum];
			h.num.push(h.num[0] - h.num[1]);//隐藏数
			h.limit = [0,h.num[3]];
			h.timer = null;
			h.locked = cfg.locked;
			h.moveLock = false;
			//过渡参数
			h.anim = {
				transition : cfg.transition,
				stepSize : cfg.stepSize,
				speed : cfg.speed,
				duration : cfg.duration
			};
			//前进后退
			$(cfg.next).bind('click',function(e){
				e.preventDefault();
				_move.call(self, h.cIndex - h.arrow * h.num[2]);
			});
			$(cfg.prev).bind('click',function(e){
				e.preventDefault();
				_move.call(self, h.cIndex + h.arrow * h.num[2]);
			});
			//跳转
			h.cIndex = 0;
			h.flyer = $(cfg.flyer);
			h.cFlyer = h.flyer.eq(0);
			h.cFlyer.addClass(cfg.flyerActiveClass);
			$.each(h.flyer,function(k,v){
				var $v = $(v);
				$v.bind('click',function(e){
					e.preventDefault();
					_move.call(self, k);
				});
			});
			//自动
			//hover暂停 add by linhao
			if(cfg.auto){
				this.play();
				root.bind('mouseenter',function(){
					self.stop();
				});
				root.bind('mouseleave',function(){
					self.play();
				});
			}
		},
		_move = function(index){
			var h = _hash[this.index];
			if(h.locked || h.moveLock || index == h.cIndex)return;
			h.moveLock = true;
			index = index < h.limit[0] ? h.limit[1] : index > h.limit[1] ? h.limit[0] : index;
			h.cIndex = index;
			h.cFlyer.removeClass(this.cfg.flyerActiveClass);
			h.cFlyer = h.flyer.eq(index);
			h.cFlyer.addClass(this.cfg.flyerActiveClass);
			_moveAnim.call(this, -index * h.anim.stepSize);
		},
		_moveAnim = function(position){
			var h = _hash[this.index];
			if(h.anim.transition == null){
				h.root[0].style[h.direction] = position + 'px';
				h.moveLock = false;
				return;
			}
			var status = {};
			status[h.direction] = position;
			h.root.animate(
				status,
				{
					easing: h.anim.transition,
					duration: h.anim.duration,
					complete: function(){
						h.moveLock = false;
					}
				}
			);
		};

	$.extend(api.prototype, {
		lock : function(){
			_hash[this.index].locked = true;
			return this;
		},
		unlock : function(){
			_hash[this.index].locked = false;
			return this;
		},
		stop : function(){
			var	h = _hash[this.index];
			win.clearInterval(h.timer);
			h.timer = null;
		},
		play : function(){
			var	h = _hash[this.index],
				self = this;
			if(h.timer == null){
				h.timer = win.setInterval(function(){
					_move.call(self, h.cIndex - h.arrow * h.num[2]);
				},h.anim.speed);
			}
		},
		fly : function(index){
			_move.call(this, index);
		}
	});

	$[NAME] = function(root,hash){
		root.jquery !== undefined || (root = $(root));
		var _api = null;
		if(root.length > 0 && root.data(NAME) === undefined){
			hash = $.isPlainObject(hash) ? hash : {};
			hash = $.extend({}, CONFIG, hash);
			_api = new api(root, hash);
		}
		return _api;
	}

	$.fn[NAME] = function(hash){
		$[NAME].call($,this,hash);
		return this;
	}
})(jQuery,this);