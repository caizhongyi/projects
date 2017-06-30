/**
 * 弹出层组件
 *
 * // alert
 * Luck.open({
 *     content: 'hello 273',
 *     style:'background:#229FFD;color:#fff',
 *     time:3000
 * });
 *
 * // confirm
 * luck.open({
 *       title: ['猜猜看', 'background:#e59501;color:#fff'],
 *       content: '你是傻逼吗？',
 *       btn: ['是','不是'],
 *       yes: function() {
 *           luck.open({content: '你是傻逼！', time:1500});
 *       },
 *       no: function() {
 *           luck.open({content: '你不是傻逼！', time:1500});
 *       }
 * });
 *
 * // 自定义
 * Luck.open({
 *      type:1,
 *      content: '<div></div>',
 * });
 *
 * @referrer http://www.loveqiao.com/luck/mobile
 */

var c = document, delay = null, flag = null;
//主程序
var Luck = {
    view: function (opt) {
        //主框架
        var luck = c.createElement("div");
        luck.className = "luck";
        luck.id = "luck";
        var oTable = c.createElement("div");
        oTable.className = "luck-table";
        var oCell = c.createElement("div");
        oCell.className = "luck-table-cell";
        var oChild = c.createElement("div");
        if (opt.extra_class) {
            oChild.className = "luck-child " + opt.extra_class;
        } else {
            oChild.className = "luck-child";
        }
        if (opt.style) {
            oChild.setAttribute("style", opt.style);
        }
        var oShade = c.createElement("div");
        oShade.className = "luck-shade";
        //遮罩层点击操作
        if (!("shadeClose" in opt) || opt.shadeClose) {
            oShade.onclick = function () {
                Luck.close();
            };
        }
        //自定义层
        if (opt.type == 1) {
            oChild.innerHTML = opt.content;
            oCell.appendChild(oChild);
            oTable.appendChild(oCell);
            luck.appendChild(oTable);
            luck.appendChild(oShade);
            return luck;
        }
        //标题
        if (opt.title) {
            var oTit = c.createElement("h3");
            oTit.className = "luck-title";
            oTit.innerHTML = opt.title[0];
            var oBtn = c.createElement("button");
            oBtn.innerHTML = "×";
            oBtn.addEventListener("click", function () {
                Luck.close();
            });
            if (opt.title[1]) {
                oTit.setAttribute("style", opt.title[1]);
            }
            oTit.appendChild(oBtn);
            oChild.appendChild(oTit);
        }
        //内容
        var oCon = c.createElement("div");
        oCon.className = "luck-con";
        oCon.innerHTML = opt.content ? opt.content : '<a href="http://www.273.cn/">273二手车交易网</a>';
        oChild.appendChild(oCon);
        //按钮
        if ("yes" in opt || "no" in opt) {
            var oBox = c.createElement("div"), btn = "";
            oBox.className = "luck-btn-box";
            if ("yes" in opt) {
                var oYes = c.createElement("span");
                oYes.className = "yes";
                if (opt.btn && opt.btn[0]) {
                    oYes.innerHTML = opt.btn[0];
                } else {
                    oYes.innerHTML = "确定";
                }
                oYes.onclick = function () {
                    opt.yes();
                };
                oBox.appendChild(oYes);
            }
            if ("no" in opt) {
                var oNo = c.createElement("span");
                oNo.className = "no";
                if (opt.btn && opt.btn[1]) {
                    oNo.innerHTML = opt.btn[1];
                } else {
                    oNo.innerHTML = "取消";
                }
                oNo.onclick = function () {
                    opt.no();
                };
                oBox.appendChild(oNo);
            }
            oChild.appendChild(oBox);
        }
        //组合框架
        oCell.appendChild(oChild);
        oTable.appendChild(oCell);
        luck.appendChild(oTable);
        luck.appendChild(oShade);
        return luck;
    },
    open: function (options) {
        if (flag) {
            Luck.close();
        }
        flag = true;
        c.body.appendChild(Luck.view(options));
        //定时关闭
        if (options.time) {
            delay = setTimeout(function () {
                Luck.close();
            }, options.time);
        }
    },
    close: function () {
        flag = false;
        if (delay) {
            clearTimeout(delay);
        }
        var obj = document.getElementById("luck");
        c.body.removeChild(obj);
    }
};

module.exports = Luck;


