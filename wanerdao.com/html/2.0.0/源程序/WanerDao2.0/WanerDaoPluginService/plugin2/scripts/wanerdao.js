/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐蓓   时间：2011/11/15 22:17:15 
* 文件名：wanerdao 
* 版本：V1.0.0 
* 说明：此js请引用到应用工具页面的最开始位置 
* ========================================================================= 
*/
//var baseUrl = "http://www.savorboard.com/"; //网站主域名
//var baseAppUrl = "http://www.savorboard.com/tool/"; //应用web api地址
var baseUrl = "http://localhost:39205/";
var baseAppUrl = "http://localhost:3965/";
function WanerDaoWebApi(url) {
    this.url = url;
}

WanerDaoWebApi.prototype.createUrl = function () {
    return this.url;
}

var api = new WanerDaoWebApi(baseAppUrl);
//var api = new WanerDaoWebApi("/");


function loadScript(js) {
    document.write("<script type='text/javascript' src='" + baseUrl + "scripts/common/" + js + "'></script>");
}