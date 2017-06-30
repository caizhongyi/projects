(function(a) {
    a.fn.extend({
        returntop: function() {
            if (this[0]) {
                var b = this.click(function() {
                    a("html, body").animate({
                        scrollTop: 0
                    },120)
                }),
                c = null;
                a(window).bind("scroll",function(){
                    var d = a(document).scrollTop(),
                    e = a(window).height();
                    0 < d ? b.css("bottom", "50px") : b.css("bottom", "-50px");//$(window).height()+
					//IE6
					if (!window.XMLHttpRequest) {
					    b.hide();
					    (d > 0) ? (b.is(':visible')?'':b.show()): b.hide();
					    b.css("top", d + e - 260);
					}
                })
            }
        }
    })
})
(jQuery); (function(a) {
    a("body");
})


  