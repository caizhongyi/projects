var langtip = {};  /*定义提示信息对象*/
var clientLanguage;
/*
获取多语言 语言 
*/
function getClientLanguage() {
    return getQueryString("lt") ? getQueryString("lt") : "zh-cn";
}

clientLanguage = getClientLanguage();

$(document).append('<script type=\"text/javascript\" src=\"' + baseUrl + 'scripts/multiplelanguage/' + clientLanguage + '.js\"><\/script>');

/*获取 提示*/
function wanerdaoLangTip(key) {
    if (langtip[key]) {
        return langtip[key];
    } else {
        return '';
    }
}