/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐蓓   时间：2011/11/15 22:17:15 
* 文件名：wanerdao 
* 版本：V1.0.0 
* 
* 修改者： 时间： 
* 修改说明： 
* ========================================================================= 
*/

function WanerDaoWebApi(url) {
    this.url = url;
}

WanerDaoWebApi.prototype.createUrl = function () {
    return this.url;
}


function formartDate(data) {
    var date = new Date(parseInt(data.replace("/Date(", "").replace(")/", ""), 10));
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDay()
    var date = y + "-" + m + "-" + d;
    return date;
}

function parseDate(data) {
    return "\/Date(" + data.getTime() + "+0800)\/";
}
var api = new WanerDaoWebApi("/");