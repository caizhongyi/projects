"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var a_1 = require("./a");
/**
 * Created by lenovo on 2017/7/4.
 */
var loading = (function () {
    function loading() {
    }
    loading.prototype.show = function () {
        new a_1.default().show();
    };
    loading.prototype.hide = function () {
    };
    return loading;
}());
exports.loading = loading;
//# sourceMappingURL=index.js.map