(function() {
/*	if(true){
		this.pathMenu = {
			show: function(){},
			hide: function(){},
			init: function(){}
		}
		return;
	}*/

  var $btn, btns, delay, delayTime, isOpen, menu, tempalte, window;

  window = this;
  
  window.globalActivity = window.globalActivity || -1; 

  delay = 40;

  delayTime = 0;

  btns = null;

  isOpen = false;

  $btn = null;

  tempalte = function() {
      return ''
  };

  menu = {
    init: function() {
      if(window.globalActivity != 1){
	      this.$el = $(tempalte()).appendTo('body').show();
	        if(window.globalOrderTotalPrices && window.globalOrderTotalPrices != "0"){
	        	$("#button-2").addClass("selected");
	        	$("#base-button").addClass("hasProduct");
	        }
      }else{
      	this.$el = $("#nothing");
      }
      this.mask = $('<div class="mask"></div>').appendTo('body');
      btns = $('.menu-btn');
      $btn = $('#base-button');
      return this.bindEvent();
    },
    hide: function() {
      return this.$el.hide();
    },
    show: function() {
      return this.$el.show();
    },
    open: function(event) {
      btns.show();
      this.mask.height($(window).height()).show();
      $btn.addClass('open');
      $('body').css('overflow', 'hidden');
      btns.each(function(i) {
        var ele;

        ele = $(this);
        delayTime = i * delay;
        return window.setTimeout((function() {
          return ele.addClass('open');
        }), delayTime);
      });
      return isOpen = !isOpen;
    },
    close: function() {
      this.mask.hide();
      $('body').css('overflow-y', 'scroll');
      $btn.removeClass('open');
      $(btns.get().reverse()).each(function(i) {
        var ele;

        ele = $(this);
        delayTime = i * delay;
        window.setTimeout((function() {
          return ele.removeClass('open');
        }), delayTime);
      });
      isOpen = !isOpen;
      setTimeout(function(){btns.hide()},300);
    },
    bindEvent: function() {
      var _this = this;

      $btn.click(function(event) {
        if (!isOpen) {
          return _this.open();
        } else {
          return _this.close();
        }
      });
      return $('#circle-mod').find('.menu-btn').click(function(event) {
        return _this.close();
      });
    }
  };

  window.pathMenu = menu;

}).call(this);