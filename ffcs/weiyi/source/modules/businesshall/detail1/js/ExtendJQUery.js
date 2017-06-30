/**
* 结jquery进行扩展
*/
$.extend({
	getUrlVars:function () {
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&");
		for (var i = 0; i < hashes.length; i++) {
			hash = hashes[i].split("=");
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	}, getUrlVar:function (name) {
		return $.getUrlVars()[name];
	}
});

jQuery.fn.extend({
    slideShow: function(){
        var $this = this;
        var eleHeight = $this.height();
        return $this.show().css({"top":-eleHeight + "px","opacity":0}).animate({"top":0,"opacity":1},500);
    },
    slideHide: function(){
        var $this = this;
        var eleHeight = $this.height();
        $this.animate({"top":-eleHeight + "px","opacity":0},500,function(){
        	$this.remove();
        });
    }
});


