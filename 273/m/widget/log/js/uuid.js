/**
 * @desc uuid唯一用户id
 * @copyright (c) 2013 273 Inc
 * @author 马鑫 <maxin@273.cn>
 * @since 2013-06-24
 */
/**
 */

var $ = require('zepto'),
    Cookie  = require('cookie'),
    Storage  = require('storage'),
    Winame  = require('/widget/log/js/winame');

var Uuid = exports;

var KEY      = 'eqs_uuid';
var DOMAIN   = '273.cn';
var EXPIRES  = 365; // 天
var SWITCH   = 'eqs_uuid_switch';

var uuid;

var mediums = [
    'components/cookie/cookie.js',
    'widget/log/js/winame.js',
    'components/storage/storage.js'
   // 'components/flashcookie/flash_cookie.js'
];

var uuids = {};

/**
* @desc 获取uuid
* @return int uuid || bool false
*/
var getUuid = function () {

    var uuid = Cookie.get(KEY) || Storage.get(KEY) || Winame.get(KEY);
    if (!uuid || !validateUuid(uuid)) {

        uuid = createUuid();

        Cookie.set(KEY, uuid, {
            expires : EXPIRES,
            path : '/',
            domain : DOMAIN
        });

        Storage.set(KEY, uuid);

        Winame.set(KEY, uuid);
    }

    return uuid;
};

var createUuid = function () {

    var tm = +new Date();

    var rm = random(10000000, 99999999);

    var swich = function(s) {

        var ret = '';
        var len = s.length;

        while (len > 0) {

            len--;
            ret += s.substr(len, 1);
        }

        return ret;
    };

    var s = swich(tm + '' + random(1, 9));

    s = (s * 1 + rm) + '' + rm;

    return s;
};


// todo:
var validateUuid = function (uuid) {
    return true;
};

function random (from, to){
    return parseInt(Math.random() * (to - from + 1) + from, 10);
}

// 获取uuid（根据优先级获取）
Uuid.get = function () {
    return getUuid();
};


