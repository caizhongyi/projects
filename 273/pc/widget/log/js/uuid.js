/**
 * @desc uuid唯一用户id
 * @copyright (c) 2013 273 Inc
 * @author 马鑫 <maxin@273.cn>
 * @since 2013-06-24
 */
/**
 * @require.async  widget/log/js/cache.js
 * @require.async  components/cookie/cookie.js
 * @require.async  components/storage/storage.js
 * @require.async  components/flashcookie/flash_cookie.js
 * @require.async  widget/log/js/winame.js
 */

var $ = require('jquery');

var Uuid = exports;

var KEY      = 'eqs_uuid';
var DOMAIN   = '273.cn';
var EXPIRES  = 365; // 天
var SWITCH   = 'eqs_uuid_switch';

var uuid;

var mediums = [
    'components/cookie/cookie.js',
    'widget/log/js/winame.js',
    'components/storage/storage.js',
    'widget/log/js/cache.js'
   // 'components/flashcookie/flash_cookie.js'
];

var uuids = {};

// uuid检测（用户打开浏器时检测）
Uuid.detect = function () {

    var defer = $.Deferred();
    var defers = [];
    var length, timer;

    require.async( 'cookie' , function (Cookie) {

        if(Cookie.get(SWITCH)) {
            return;
        }

        defers = mediums.map(function (medium) {

            return getUuid(medium).done(function (value) {

                uuids[medium] = value;
            }).fail(function () {
                defer.done(function (value) {

                    setUuid(value, medium);
                });
            });
        });

        length = defers.length;

        // 监听
        timer = window.setInterval(function () {

            $.each(defers, function (i, d) {
                if (d.state() === 'pending') {
                    return false;
                }

                if (i === length - 1) {
                    // 优先级从后向前
                    for (var j = mediums.length - 1; j >= 0; j--) {
                        if (uuid) {
                            break;
                        }
                        uuid = uuids[mediums[j]];
                    }

                    defer.resolve(uuid || (uuid = createUuid()));
                    window.clearInterval(timer);
                }
            });
        }, 200);

        // session
        Cookie.set(SWITCH, 1, {
            path : '/',
            domain : DOMAIN
        });
    });

    return defer;
};

// 获取uuid（根据优先级获取）
Uuid.get = function () {

    var defer = $.Deferred();

    if (uuid) {
        return defer.resolve(uuid);
    }

    mediums.reduce(function (prev, curr, index, _maps) {

        return (prev || getUuid(curr)).then(function (value) {

            defer.resolve(value);
        }, function () {

            var next = _maps[index + 1];

            defer.done(function (value) {
                setUuid(value, curr)
            });

            if (next) {
                return getUuid(next);
            } else {
                defer.resolve(createUuid());
            }
        });
    }, null);

    defer.done(function (value) {
        uuid = value;
    });

    return defer;
};


// 通过媒介获取uuid
function getUuid (medium) {

    var defer = $.Deferred()
    require.async(medium, function (Medium) {

        var value = Medium.get(KEY);

        if (value) {
            defer.resolve(value);
        } else {
            defer.reject();
        }
    });

    return defer;
}

// 通过媒介设置uuid
function setUuid (value, medium) {

    require.async([  medium ], function (Medium) {
        if (medium === 'components/cookie/cookie.js') {
            Medium.set(KEY, value, {
                expires : EXPIRES,
                path : '/',
                domain : DOMAIN
            });
        } else {
            Medium.set(KEY, value);
        }
    });
}

function random (from, to){
    return parseInt(Math.random() * (to - from + 1) + from, 10);
}
// 创建uuid
function createUuid () {

    var tm = +new Date();
    var rm = random(10000000, 99999999);
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
