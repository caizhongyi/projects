"undefined"==typeof ArcheAge&&(window.ArcheAge={});"undefined"==typeof ArcheAge.Web&&(ArcheAge.Web={});
ArcheAge.Web.SkillTooltip={wrapper_:null,current_:null,cache_:{},ajax_:!1,paddingLeft_:5,paddingTop_:0,initialized_:!1,initialize:function(){this.wrapper_=$("<div/>").css("z-index","1000").css("position","absolute").addClass("ability-tooltip").appendTo("body");this.initialized_=!0},getAnchor:function(b){return(b=b.match(RegExp(/#(.*)$/)))&&b[1]?b[1]:""},show:function(b,d){var a=this,f=d||{};a.ajax_=void 0!=f.ajax?d.ajax:a.ajax_;a.paddingLeft_=void 0!=f.paddingLeft?d.paddingLeft:a.paddingLeft_;a.paddingTop_=
void 0!=f.paddingTop?d.paddingTop:a.paddingTop_;a.wrapper_||a.initialize();b.mouseout(function(){a.hide()});try{var c=b.attr("data-skill"),g=b.attr("data-skill-level");void 0==g&&(g=1);a.current_=c;a.ajax_&&a.cache_[c]?a.position(b,a.cache_[c]):a.ajax_?$.ajax({type:"POST",url:"/skills/skill/"+c,data:{charLevel:g},dataType:"html",global:!1,success:function(d){a.current_==c&&(a.cache_[c]=d,a.position(b,d))}}):a.position(b,$(".skill-detail-"+c).html())}catch(j){}},position:function(b,d){this.wrapper_.html(d);
var a=b.offset(),f=$(window).width(),c=$(window).height(),g=$(document).scrollTop(),j=this.wrapper_.outerWidth(),h=this.wrapper_.outerHeight(),i=a.left+$(b).width()+this.paddingLeft_,e=a.top+this.paddingTop_,c=c+g;e+h>c&&(e=e-(e+h-c)-10,0<g&&(e-=10));a.left>f/2&&(i=a.left-(j+5));this.wrapper_.css("left",i+"px").css("top",e+"px").show()},hide:function(){this.wrapper_.hide()}};
ArcheAge.Web.PassiveBuffTooltip={wrapper_:null,current_:null,cache_:{},ajax_:!1,paddingLeft_:5,paddingTop_:0,initialized_:!1,initialize:function(){this.wrapper_=$("<div/>").css("z-index","1000").css("position","absolute").addClass("ability-tooltip").appendTo("body");this.initialized_=!0},getAnchor:function(b){return(b=b.match(RegExp(/#(.*)$/)))&&b[1]?b[1]:""},show:function(b,d){var a=this,f=d||{};a.ajax_=void 0!=f.ajax?d.ajax:a.ajax_;a.paddingLeft_=void 0!=f.paddingLeft?d.paddingLeft:a.paddingLeft_;
a.paddingTop_=void 0!=f.paddingTop?d.paddingTop:a.paddingTop_;a.wrapper_||a.initialize();b.mouseout(function(){a.hide()});try{var c=b.attr("data-pbuff");a.current_=c;a.ajax_&&a.cache_[c]?a.position(b,a.cache_[c]):a.ajax_?$.ajax({type:"POST",url:"/skills/passiveBuff/"+c,dataType:"html",global:!1,success:function(d){a.current_==c&&(a.cache_[c]=d,a.position(b,d))}}):a.position(b,$(".pbuff-detail-"+c).html())}catch(g){}},position:function(b,d){this.wrapper_.html(d);var a=b.offset(),f=$(window).width(),
c=$(window).height(),g=$(document).scrollTop(),j=this.wrapper_.outerWidth(),h=this.wrapper_.outerHeight(),i=a.left+$(b).width()+this.paddingLeft_,e=a.top+this.paddingTop_,c=c+g;e+h>c&&(e=e-(e+h-c)-10,0<g&&(e-=10));a.left>f/2&&(i=a.left-(j+5));this.wrapper_.css("left",i+"px").css("top",e+"px").show()},hide:function(){this.wrapper_.hide()}};