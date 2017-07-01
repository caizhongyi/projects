!function(e){var t=function(n,r){this.$elem=e(n),this.options=e.extend({},t.defaults,r);for(var i in this.options)this.options[i]=this.$elem.data(i.replace(/[A-Z]+/g,"-$&").toLowerCase())||this.options[i];this.init()};t.prototype={init:function(){var t=this;this.setOptions();if(this.options.endDate<=(new Date).getTime())return this;this.isButton()?this.$elem.off("click.countdown").on("click.countdown",function(){e(this).prop("disabled",!0).addClass("btn-disabled").data("default-val",t.val()),t.setOptions(),t.populate(),t.start()}):this.populate(),this.options.auto&&this.start()},setOptions:function(){if(this.options.time){var e=this.options.time.split(":");this.options.endDate=new Date,this.options.startDate=(new Date).getTime(),this.options.endDate.setHours(this.options.endDate.getHours()+(parseInt(e[0])||0)),this.options.endDate.setMinutes(this.options.endDate.getMinutes()+(parseInt(e[1])||0)),this.options.endDate.setSeconds(this.options.endDate.getSeconds()+(parseInt(e[2])||0)),this.options.endDate=this.options.endDate.getTime()}else this.options.endDate=typeof this.options.endDate=="object"?this.options.endDate.getTime():this.options.endDate,this.options.startDate=typeof this.options.startDate=="object"?this.options.startDate.getTime():this.options.startDate;return this.startTime=this.options.startDate,this.endTime=this.options.endDate,this},isButton:function(){return this.$elem[0].tagName=="BUTTON"||this.$elem[0].tagName=="INPUT"||this.$elem[0].tagName=="A"},start:function(){var e=this;return this.timer&&clearInterval(this.timer),this.timer=setInterval(function(){e.populate()},1e3),this},val:function(t){var n=this.$elem;if(n[0].tagName=="INPUT"){if(!t)return n.val();e(n).val(t)}else{if(!t)return n.html();e(n).html(t)}return this},stop:function(){return clearInterval(this.timer),this},populate:function(){var t=function(e,t,n,r){return e+"天 "+t+"时 "+n+"分 "+r+"秒 "},n=this.$elem,r=this.options.endDate,i=this.options.startDate;if(r<i){this.isButton()&&(this.$elem.prop("disabled",!1).removeClass("btn-disabled"),this.val(this.$elem.data("default-val"))),clearInterval(this.timer),this.options.callback&&this.options.callback.call(this),e(n).trigger("end",e.Event({}));return}var s=new Date(r-i),o={},u=864e5,a=36e5,f=6e4,l=1e3;o.day=Math.floor(s/u),s-=o.day*u,o.hour=Math.floor(s/a),s-=o.hour*a,o.minu=Math.floor(s/f),s-=o.minu*f,o.sec=Math.floor(s/l);var c=o.day,h=o.hour,p=o.minu,d=o.sec;if(this.options.format)if(typeof this.options.format=="string"){var v=this.options.format;v=v.replace(/dd|DD/,c>9?c.toString():"0"+c),v=v.replace(/d|D/g,c),v=v.replace(/hh|HH/,h>9?h.toString():"0"+h),v=v.replace(/h|H/g,h),v=v.replace(/mm/,p>9?p.toString():"0"+p),v=v.replace(/m/g,p),v=v.replace(/ss|SS/,d>9?d.toString():"0"+d),v=v.replace(/s|S/g,d),o=v}else o=this.options.format.call(n,c,h,p,d);else o=t(c,h,p,d);return this.val(o),this.options.startDate+=1e3,this}},t.defaults={time:null,auto:!1,endDate:(new Date).getTime()+36e5,startDate:new Date,format:"dd天 hh时 mm分 ss秒",callback:function(){}},e.fn.countdown=function(n){var r=arguments;return e(this).each(function(){var i=e(this).data("countdown");i||(i=new t(this,n),e(this).data("countdown",i));var s=[];for(var o=1;o<r.length;o++)s.push(r[o]);var u=new Function("data","options","args","return data[ options ](args)");n&&i[n]&&u(i,n,s.join(","))})},e.fn.countdown.Constructor=t,typeof module=="object"&&typeof module.exports=="object"&&(module.exports=t)}(window.jQuery||Zepto)
