/**
 * 列表页搜索条件保存
 *
 * @version v4.0
 */
var $ = require('jquery');
var Storage = require('storage');
var Luck = require('/widget/luck/luck.js');
var SaveTpl = require('./save-search.tpl');

var STORAGE_KEY = 'search_save_v4';
var LIMIT = 5;

function Save(options) {
    this.$container   = $('#js_search_save_box');
    this.$saveNum     = this.$container.find('.i-save-num');
    this.$list        = this.$container.find('ul');
    this.$save        = this.$container.find('.js_search_save');
    // css class
    this.cls = {
        show_container: 'group-select-item-show',
        more_down: 'i-more-down',
        more_up: 'i-more-up'
    };
}

var proto = Save.prototype;

proto.getStorage = function() {
    var obj = JSON.parse(Storage.get(STORAGE_KEY));
    if (obj === null || typeof(obj) !== 'object') {
        obj = [];
    }

    return obj;
};

proto.setStorage = function(obj) {
    Storage.set(STORAGE_KEY, JSON.stringify(obj));
};

proto.render = function() {
    var count = 0;
    var obj = this.getStorage();
    for(var key in obj) {
        if (obj.hasOwnProperty(key)) {
            var data = obj[key];
            var li = '<li><div class="con-in" data-jslink="'+ data.link + '"><span class="fl" title="' + data.caption + '">' + data.caption + '</span><a href="javascript:" class="sel-delete fr" title="删除"><i class="i-sel-delete" data-key="' + data.key + '"></i></a></div></li>';
            this.$list.append($(li));
            count++;
        }
    }
    this.$saveNum.text(count);
    if (count > 0) {
        this.$saveNum.parents('.shadow').show();
    }
};

proto.checkNum = function() {
    return this.$list.find('li').length < LIMIT;
};

proto.isExists = function(k, obj) {
    for (var i = 0, len = obj.length; i < len; i++) {
        if (obj[i].key === k) {
            return true;
        }
    }
    return false;
};

proto.save = function() {
    var self = this;
    if (this.checkNum()) {
       this.add();
    } else {
        Luck.open({
            'title': '保存提示',
            'content': SaveTpl({limit: LIMIT}),
            'width': '460px',
            'extra_class': 'mod-pop-ex-save'
        });
        $('#js_luck_ok').on('click', function() {
            self.update();
            Luck.close();
        });
    }
    this.$saveNum.parents('.shadow').show();
};

proto.add = function() {
    var obj  = this.getStorage();
    var data = this.$save.data();
    var key  = data.key;
    // key exists
    if (this.isExists(key, obj)) {
        return false;
    }

    obj.push(data);
    this.setStorage(obj);
    var li = '<li><div class="con-in" data-jslink="'+ data.link + '"><span class="fl" title="' + data.caption + '">' + data.caption + '</span><a href="javascript:" class="sel-delete fr" title="删除"><i class="i-sel-delete" data-key="' + data.key + '"></i></a></div></li>';
    this.$list.append($(li));

    var num = ~~this.$saveNum.text() + 1;
    if (num <= 0) {
        num = 0;
    }
    this.$saveNum.text(num);
    this.$saveNum.parents('.comm-down-on').show();
};

proto.update = function() {
    var obj  = this.getStorage();
    var data = this.$save.data();
    var key  = data.key;

    // key exists
    if (this.isExists(key, obj)) {
        return false;
    }

    obj.shift();
    obj.push(data);
    this.setStorage(obj);
    this.$list.find('li').get(0).remove();

    var li = '<li><div class="con-in" data-jslink="'+ data.link + '"><span class="fl" title="' + data.caption + '">' + data.caption + '</span><a href="javascript:" class="sel-delete fr" title="删除"><i class="i-sel-delete" data-key="' + data.key + '"></i></a></div></li>';
    this.$list.append($(li));
    this.$saveNum.text(LIMIT);
};

proto.del = function(k) {
    var obj = this.getStorage();
    var temp = [];
    for (var i = 0, len = obj.length; i < len; i++) {
        if (obj[i].key != k) {
            temp.push(obj[i]);
        }
    }
    this.setStorage(temp);
    var num = this.$saveNum.text() - 1;
    if (num <= 0) {
        num = 0;
    }
    this.$saveNum.text(num);
    if (num == 0) {
        this.$saveNum.parents('.comm-down-on').hide();
    }
};

proto.init = function() {
    this.render();
    // save
    this.$save.on('click', $.proxy(this.save, this));
    // delete
    var self = this;
    this.$list.on('click', '.i-sel-delete', function() {
        self.del($(this).data('key'));
        $(this).parents('li').remove();
    });
};

module.exports = Save;
