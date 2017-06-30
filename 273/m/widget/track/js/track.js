var Class = window.Class ||  require('class') ;

var Track = Class.create({
    initialize : function() {
       this.baidu().google();
    },
    baidu : function(){
        var _hmt = window._hmt || (window._hmt = []);
        var hm, s;

        $(function() {
            hm = document.createElement("script");
            hm.src = "http://hm.baidu.com/hm.js?0a62050fb9336c9e69562609d8ecefd0";
            s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        });

        return this;
    },
    google : function(){
        var _gaq = window._gaq || (window._gaq = []);
        var ga, s;

        _gaq.push(['_setAccount', 'UA-43727317-1']);
        _gaq.push(['_setDomainName', '273.cn']);
        _gaq.push(['_setAllowLinker', true]);
        _gaq.push(['_addOrganic', 'sogou', 'query']);
        _gaq.push(['_addOrganic', 'baidu', 'word']);
        _gaq.push(['_addOrganic', 'soso', 'w']);
        _gaq.push(['_addOrganic', 'youdao', 'q']);
        _gaq.push(['_addOrganic', 'so', 'q']);
        _gaq.push(['_addOrganic', '360', 'q']);
        _gaq.push(['_trackPageview']);

        $(function() {
            ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
            s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(ga, s);
        });

        return this;
    }
})

if(typeof module != 'undefined') module.exports = Track ;