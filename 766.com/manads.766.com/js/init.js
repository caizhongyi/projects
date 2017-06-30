
var baseurl = '/mywork/advertisement/';
$(document).ready(function() {
    var $easyuilayout =$('.easyui-layout') ;
    function fullSize(){
        $easyuilayout.height($(window).height());
        $easyuilayout.layout();
    };
    fullSize();
    $(window).resize(function(){
        fullSize();
    })
	$(document).bind('contextmenu', function(e) {
		return false;
	});
});

function show(title, url) {
	$('.window').remove();
	$('.window-mask').remove();
	$('.window-shadow').remove();
	
	$('#main').panel({
		href : url,
		fit : true,
		title : title,
		onBeforeOpen: function() {
			//$("#main").css("background-color", "#666").css("opacity", "0.3").show();
		},
		onLoad: function() {
			//$("#main").css("opacity", "1").show();
		}
	});
	
	$('#main').panel('refresh');
}

$(function() {
	$('#main').panel({title: '系统首页', href: baseurl+'html/advertisement/add.html', fit: true});
	
	$('#menu').tree({				
		url : 'data/menu.json',
		method : 'get',
		onSelect : function(node) {
			if (node.attributes != undefined && node.attributes.url != null && node.attributes.url != '') {
				var parent = $('#menu').tree("getParent", node.target);
				var title = node.text;
				if(parent) {
					title = parent.text + " - " + title;
				}
				show(title, baseurl+node.attributes.url);
			}
		}
	});
});