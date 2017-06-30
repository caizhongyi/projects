var Class = window.Class ||  require('class') ;
var Cookie = window.Cookie ||  require('cookie');

/**
 * 暂时不用
 * */

var Uuid = Class.create({
    KEY :  'eqs_uuid',
    DOMAIN  :  '273.cn',
    EXPIRES  : 365,
    SWITCH   : 'eqs_uuid_switch',
    mediums : ['cookie', 'winame',  'storage', 'cache', 'flash_cookie'],
    uuid : null ,
    uuids : {},
    random : function(){
        return parseInt(Math.random() * (to - from + 1) + from, 10)
    },
    initialize : function() {

    },
    detect : function(){
        var defer = $.Deferred();
        var defers = [];
        var length, timer, _this = this;

        require.async(['components/cookie/cookie.js'], function (Cookie) {

            if(Cookie.get( _this.SWITCH ) ) {
                return;
            }

            defers = mediums.map(function (medium) {
                return _this.get(medium).done(function (value) {
                    _this.uuids[medium] = value;
                }).fail(function () {
                    defer.done(function (value) {
                        _this.set ( medium , value );
                    });
                });
            });

            length = defers.length;

            // ����
            timer = window.setInterval(function () {
                $.each(defers, function (i, d) {
                    if (d.state() === 'pending') {
                        return false;
                    }

                    if (i === length - 1) {
                        // ���ȼ��Ӻ���ǰ
                        for (var j = _this.mediums.length - 1; j >= 0; j--) {
                            if ( _this.uuid ) {
                                break;
                            }
                            _this.uuid = _this.uuids[_this.mediums[j]];
                        }

                        defer.resolve(_this.uuid || (_this.uid = _this.create()));
                        window.clearInterval(timer);
                    }
                });
            }, 200);

            // session
            Cookie.set(_this.SWITCH, 1, {
                path : '/',
                domain : _this.DOMAIN
            });
        });

        return defer;
    },
    get : function( mediums ){
        var defer = $.Deferred();

        if( mediums ){
            require(['components/' + medium + '.js'], function (Medium) {

                var value = Medium.get(KEY);

                if (value) {
                    defer.resolve(value);
                } else {
                    defer.reject();
                }
            });

        }
        else{
            if (uuid) {
                return defer.resolve(uuid);
            }

            this.mediums.reduce(function (prev, curr, index, _maps) {

                return (prev || this.get(curr)).then(function (value) {
                    defer.resolve(value);
                }, function () {

                    var next = _maps[index + 1];

                    defer.done(function (value) {
                        this.set(curr ,value )
                    });

                    if (next) {
                        return this.get(next);
                    } else {
                        defer.resolve(createUuid());
                    }
                });
            }, null);

            defer.done(function (value) {
                uuid = value;
            });
        }
        return defer;
    },
    set : function( medium , value ){
        require.async(['components/' + medium + '.js'], function (Medium) {
            if (medium === 'cookie') {
                Medium.set(KEY, value, {
                    expires : EXPIRES,
                    path : '/',
                    domain : DOMAIN
                });
            } else {
                Medium.set(KEY, value);
            }
        });
    },
    create : function(){
        var tm = +new Date();
        var rm = this.random(10000000, 99999999);
        var s;

        function swich (s) {

            var ret = '';
            var len = s.length;

            while (len > 0) {

                len--;
                ret += s.substr(len, 1);
            }

            return ret;
        }

        s = swich(tm + '' + random(1, 9));

        s = (s * 1 + rm) + '' + rm;

        return s;
    }
})

if(typeof module != 'undefined') module.exports = Uuid ;