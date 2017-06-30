/**
 * @desc 本地缓存数据插件（ps:代码来源v3）
 * @author linyu@273.cn>
 * @since 2015-04-01
 */
define(function(require, exports, module) {
    var STORAGE_AGENT = '__STORAGE_AGENT__';
    var DEFAULT_NAMESPACE  = '__LOCAL_STORAGE__';
    // IE 6-7 do not support localStorage.
    if (!window.localStorage) {
        module.exports = {
            set: function (k, v) {     
            },
            get: function (k) {
                return null;
            },
            remove: function (k) {
                
            },
            clear: function () {}
        }
    } else {
        var Storage;
        Storage = function ( namespace ) {
            var saved_namespace = {};
            try {
                saved_namespace = JSON.parse( localStorage.getItem( STORAGE_AGENT + '__SAVED_NS__' ) ) || {};
            } catch ( ex ) {
                // it is ok;
            }
            if ( !saved_namespace[namespace] ) {
                try {
                    saved_namespace[namespace] = 1;
                    localStorage.setItem( STORAGE_AGENT + '__SAVED_NS__', JSON.stringify( saved_namespace ) );
                } catch (e) {
                    //ios private mode下，无法使用localStorage 呵呵
                }
            }

            var self = {
                set: function ( k, v ) {
                    localStorage.setItem( namespace + k, v );
                    var saved_keys = {};
                    try {
                        saved_keys = JSON.parse( localStorage.getItem( namespace + '__SAVED_K__' ) ) || {};
                    } catch ( ex ) {
                        // it is ok
                    }
                    if ( !saved_keys[k] ) {
                        saved_keys[k] = 1;
                        localStorage.setItem( namespace + '__SAVED_K__', JSON.stringify( saved_keys ) );
                    }
                },
                get: function ( k ) {
                    return localStorage.getItem( namespace + k );
                },
                remove: function ( k ) {
                    localStorage.removeItem( namespace + k );
                    var saved_keys = {};
                    try {
                        saved_keys = JSON.parse( localStorage.getItem( namespace + '__SAVED_K__' ) ) || {};
                    } catch ( ex ) {
                        // it is ok
                    }
                    if ( saved_keys[k] ) {
                        delete saved_keys[k];
                        localStorage.setItem( namespace + '__SAVED_K__', JSON.stringify( saved_keys ) );
                    }
                },
                clear: function () {
                    if ( namespace === DEFAULT_NAMESPACE ) {
                        // then clear all
                        localStorage.clear();
                    } else {
                        var saved_keys =  {};
                        try {
                            saved_keys = JSON.parse( self.get( '__SAVED_K__' ) ) || {};
                        } catch ( ex ) {
                            // it is ok
                        }
                        Object.keys( saved_keys ).forEach( function ( key ) {
                            self.remove( key );
                        } );
                        localStorage.removeItem( namespace + '__SAVED_K__' );
                    }
                }
            };
            return self;
        };

        var storage = Storage( DEFAULT_NAMESPACE );
        Storage.get = storage.get;
        Storage.set = storage.set;
        Storage.remove = storage.remove;
        Storage.clear = storage.clear;

        module.exports = Storage;
    }
});