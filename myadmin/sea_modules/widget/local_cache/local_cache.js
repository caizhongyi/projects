/**
 * @desc 获取缓存数据插件
 * @author linyu@273.cn>
 * @since 2015-04-01
 */
define(function(require, exports, module) {
    var $ = require('jquery');
    var Storage = require('./storage.js');
    var Version = require('./local_vesion.js');
    function LocalCache () {}
    module.exports = LocalCache;
    /**
     * @desc 取得数据
     * * 去缓存里取数据，无则去文件里加载数据
     * @param string cachedPath 缓存文件所在路径
     * @param string data_type 缓存数据的类型
     */
    LocalCache.prototype.getData = function (data_path, data_type) {
        var saved_keys = $.parseJSON(Storage.get('__SAVED_K__'));
        var version = Version[data_type] ? Version[data_type] : 0;
        var key = data_type + '_' + version;
        var cachedData = this.storgeData(key);
        if (!cachedData) {
            //清除可能存在的旧缓存
            var saved_key = $.parseJSON(Storage.get('__SAVED_K__'));
            if (saved_key) {
                $.each(saved_key, function(storage_key, value) {
                    if (storage_key.match(data_type + '_')) {
                        Storage.remove(storage_key);
                    }
                });
            }
            return this.asyncData(data_path, key);
        } else {
            var defer = $.Deferred();
            defer.resolve(cachedData);
            return defer;
        }
    }
    //获取文件数据
    LocalCache.prototype.asyncData = function (data_path, key) {
        var defer = $.Deferred();
        require.async(data_path, function(data) {
            defer.resolve(data);
            try {
                Storage.set(key, JSON.stringify(data));
            } catch (e) {}
        });
        return defer;
    }
    //获取缓存数据
    LocalCache.prototype.storgeData = function (key) {
        var cachedData = Storage.get(key);
        if (cachedData) {
            cachedData = $.parseJSON(cachedData);
        }
        return cachedData;
    }
});