(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "jquery"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var jquery_1 = require("jquery");
    jquery_1.default.fn.grade = function () {
        function setVal(index) {
            jquery_1.default(this).find('.icon:lt(' + (index + 1) + ')').addClass('active');
            jquery_1.default(this).find('.icon:gt(' + index + ')').removeClass('active');
        }
        return jquery_1.default(this).each(function () {
            jquery_1.default(this).off('click.grade mouseenter.grade mouseleave.grade').on('mouseenter.grade', '.icon', function () {
                setVal.call(jquery_1.default(this).parent(), jquery_1.default(this).index());
            }).on('click.grade', '.icon', function () {
                var $elem = jquery_1.default(this).parent();
                setVal.call(jquery_1.default(this).parent(), jquery_1.default(this).index());
                $elem.find(':hidden').val(jquery_1.default(this).index() + 1);
            }).on('mouseleave.grade', function () {
                var index = parseInt(jquery_1.default(this).find(':hidden').val()) - 1;
                setVal.call(this, index);
            });
        });
    };
    exports.default = jquery_1.default;
});
//# sourceMappingURL=index.js.map