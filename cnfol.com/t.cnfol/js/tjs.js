	 var tab;
	 function searchBox()
	 {
		  $("#search").CZYTextBox();
	 }
	 function textBox()
		{
			$(".textarea").CZYTextBox();
		}
		function textArea()
		{
			  $(".textarea").CZYTextArea({callback:function(e){ $("#textarea-res").text(e)}});
		}
		
		function tabControl()
		{
			tab=$("#tab").CZYTabs({tabType:"hover",autoTab:false,animateType:"nor"});
		}
		
		function topMore()
		{
			//��������
			$(".btn-more").parent().CZYSelect(
									 {event:"click",
									  width:90,
									  speed:"fast",
									  callback:{
										  beginShow:function(e){
										  e.jqueryObj.find(".tag").removeClass("btn-more").addClass("btn-more-show");
									 },
									      beginHide:function(e){
										  e.jqueryObj.find(".tag").removeClass("btn-more-show").addClass("btn-more");
									 }
									 }});
			 
		}
	    //�б��е�����
		function itemMore()
		{
			 $(".fio-more").parent().CZYSelect(
									 {event:"click",
									  width:90,
									  speed:"fast",
									  callback:{
										  beginShow:function(e){
										  e.jqueryObj.find(".tag").removeClass("fio-more").addClass("fio-more-show");
									 },
									      beginHide:function(e){
										  e.jqueryObj.find(".tag").removeClass("fio-more-show").addClass("fio-more");
									 }
									 }});
		}
			
		//ȫѡ
		function checkboxAll()
		{
			 	$("#all").click(function(){
				 if($(this).attr("checked"))
				 {
				 	$(this).parent().find("input[type=checkbox]").attr("checked",true);
				 }
				 else
				 { $(this).parent().find("input[type=checkbox]").attr("checked",false);}
				 });
		}
		
		//ȫѡ
		function checkboxAll1()
		{
				 $("#all1").click(function(){
				 if($(this).attr("checked"))
				 {
				 	$(this).parent().find("input[type=checkbox]").attr("checked",true);
				 }
				 else
				 {  $(this).parent().find("input[type=checkbox]").attr("checked",false);}
				 });
		}
		
	function textArea()
		{
			 $(".textarea").CZYTextBox();
		}
		
		function tabContorl()
		{
			tab=$("#tab").CZYTabs({tabType:"hover",autoTab:false,animateType:"nor"});
		}
		
		function topMore()
		{
			//��������
			$(".btn-more").parent().CZYSelect(
									 {event:"click",
									  width:90,
									  speed:"fast",
									  callback:{
										  beginShow:function(e){
										  e.jqueryObj.find(".tag").removeClass("btn-more").addClass("btn-more-show");
									 },
									      beginHide:function(e){
										  e.jqueryObj.find(".tag").removeClass("btn-more-show").addClass("btn-more");
									 }
									 }});
			 
		}
	    //�б��е�����
		function itemMore()
		{
			 $(".fio-more").parent().CZYSelect(
									 {event:"click",
									  width:90,
									  speed:"fast",
									  callback:{
										  beginShow:function(e){
										  e.jqueryObj.find(".tag").removeClass("fio-more").addClass("fio-more-show");
									 },
									      beginHide:function(e){
										  e.jqueryObj.find(".tag").removeClass("fio-more-show").addClass("fio-more");
									 }
									 }});
		}
			
		//ȫѡ
		function checkboxAll()
		{
			 	$("#all").click(function(){
				 if($(this).attr("checked"))
				 {
				 	$(this).parent().find("input[type=checkbox]").attr("checked",true);
				 }
				 else
				 { $(this).parent().find("input[type=checkbox]").attr("checked",false);}
				 });
		}
		
		//ȫѡ
		function checkboxAll1()
		{
				 $("#all1").click(function(){
				 if($(this).attr("checked"))
				 {
				 	$(this).parent().find("input[type=checkbox]").attr("checked",true);
				 }
				 else
				 {  $(this).parent().find("input[type=checkbox]").attr("checked",false);}
				 });
		}
		
		$(function(){
			 sameHeight();
		})
		//���еȸ�
		function sameHeight()
		{
			  var left = $('.main').height();
			  var right = $('.submain').height();
			  if(left > right){($('.submain').height(left))}else{($('.main').height(right))};
		}