;
(function ( $ ) {
    /**
     * @author caizhongyi
     * @website http://www.zerowfe.com
     * @description 收藏夹
     * @requires  jquery.1.7.2
     * @param {string} url 地址
     * @param {string} title 标题
     * @param {function} errorCallback
     * @example $.addFavorite(('http://abc.com/','abc');
     * */
    $.addFavorite = function ( url , title , errorCallback) {
        try {
            window.external.addFavorite( url , title );
        }
        catch ( e ) {
            try {
                window.sidebar.addPanel( title , url , "" );
            }
            catch ( e ) {
                errorCallback ? errorCallback.call(this) : alert( "加入收藏失败，请使用Ctrl+D进行添加" );
            }
        }
        return this;
    };

    /**
     * @author caizhongyi
     * @version 1.0
     * @description 设置首页
     * @requires  jquery.1.7.2
     * @param {string}  vrl 地址
     * @param {function}  errorCallback
     * @example $(this).setHome('http://www.baidu.com');
     * */
    $.fn.setHome = function ( vrl , errorCallback) {
        try {
            this.style.behavior = 'url(#default#homepage)';
            this.setHomePage( vrl );
        }
        catch ( e ) {
            if ( window.netscape ) {
                try {
                    netscape.security.PrivilegeManager.enablePrivilege( "UniversalXPConnect" );
                }
                catch ( e ) {
                    errorCallback ? errorCallback.call(this) : alert( "此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。" );
                }
                var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService( Components.interfaces.nsIPrefBranch );
                prefs.setCharPref( 'browser.startup.homepage' , vrl );
            }
        }
    };
})( jQuery );