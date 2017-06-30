var AutoComplete = require('/widget/autocomplete/js/autocomplete');

var mail = function(config) {
    var data = [
        "@qq.com",
        "@sina.com",
        "@sina.cn",
        "@163.com",
        "@sohu.com",
        "@vip.sina.com",
        "@126.com",
        "@hotmail.com",
        "@gmail.com",
        "@139.com",
        "@21cn.com",
        "@189.com",
        "@wo.com.cn",
        "@273.cn"
    ];

    new AutoComplete(config.$el, {
        source : data ,
        type : 'mail'
    });
};

module.exports = mail;