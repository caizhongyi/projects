(function($){
    $(function(){
        wgt.init();
        
        if(document.getElementById("fpTitleTr")){
	        $("input[name='isInvoices']").click(function(){
	        	if(this.value == "0"){
	        		$("#fpTitleTr").show();
	        	}else{
	        		$("#fpTitleTr").hide();
	        	}
	        });
	        $("input[name='isInvoices']:eq(1)").trigger("click");
        }
        if(window.globalActivity == 1){
        	$("#addShopcartBtn").hide();
        }else{
        	$("#addShopcartBtn").bind("click", function(){
	        	$("#button-2").addClass("selected");
	        	$("#base-button").addClass("hasProduct");
        	});
        }
        
        $('<div id="loading"></div>').appendTo($('body')).bind({
              ajaxStart:function(){
              	  window.isAjaxLoading = true;
              	  $(".cancelBtn").bind("click", common.returnFalseFun);
              	  $("#submitBtn,#addShopcartBtn").bind("click", common.returnFalseFun);
                  $(this).show().animate({
			          'opacity': 1
			        }, 500);
              },
              ajaxStop:function(){
              	  window.isAjaxLoading = false;
              	  $(".cancelBtn").unbind("click", common.returnFalseFun);
              	  $("#submitBtn,#addShopcartBtn").unbind("click", common.returnFalseFun);
              	  var self = $(this);
                  self.animate({
		            'opacity': 0
		          }, 500, function() {
		            return self.hide();
		          });
              }
          });
    })
})(jQuery);

function showMjh(){
	if(globalActivity == 1 && globalShowIcon != 2){
		return true;
	}else{
		return false;
	}
}