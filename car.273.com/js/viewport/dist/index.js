!function(){$.viewport=function(e){function i(){var r=parseInt(window.screen.width)/e,i=n+","+"init-scale="+r+",minimum-scale="+r+",maximum-scale="+r+"";t.attr("content",i)}e=e||640;var t=$("meta[name=viewport]");t.length||(t=$("<meta/>",{name:"viewport"}).appendTo("head"));var n="width="+e+", target-densitydpi=device-dpi",r="init-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no";return i(),$(window).off("resize.viewport").on("resize.viewport",function(){i()}),this}}()
