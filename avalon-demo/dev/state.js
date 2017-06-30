var avalon = require("avalon");
require("./mmRouter/mmState");

avalon.config({debug: false});

var vm = avalon.define({
    $id: "test",
    args: ""
});

avalon.state.config({
    onLoad: function () {

    },
    onUnload: function () {
    }
})

avalon.state("aaa", {
        url: "/aaa",
        views: {
            "": {
                templateUrl: "/dev/a.html"
                /* template: '<p class="lead">Welcome to the UI-Router Demo</p>' +
                 '<p>Use the menu above to navigate. ' +
                 'Pay attention to the <code>$state</code> and <code>$stateParams</code> values below.</p>' +
                 '<p>Click these links—<a href="#!/contacts/1">Alice</a> or ' +
                 '<a href="#!/contacts/2">Bob</a>—to see a url redirect in action.</p>'*/
            }
        },
        onEnter: function () {
            var itemID = this.params.itemID;
            var vmodel = avalon.vmodels.contacts;
            console.log(itemID);
            /*var el = vmodel.contact
             if (el && el.items) {
             for (var i = 0, elem; elem = el.items[i++]; ) {
             if (elem.id == itemID) {
             vmodel.item = elem;
             break
             }
             }
             }*/
        }
    })
    .state("bbb", {
        url: "/bbb",
        views: {
            "": {templateUrl: "/dev/b.html"}
        }
    })
    .state("aaa.son", {
        url: "/son",
        views: {
            "": {templateUrl: "/dev/a-son.html"}
        },
        onEnter: function (a) {
            vm.args = a
        }
    })
    .state("module", {
        url: "/module",
        // abstract: true,
        views: {
            templateUrl: "/dev/module/index.html",
            controllerUrl: ["dev/module/index.js"]
        },
        // 通过promise配置一个控制器
        // controllerProvider: function(params) {
        //     var prom = new Promise(function(rs, rj) {
        //         require(["mmRouter/js/contacts.js"], function($ctrl) {
        //             rs($ctrl)
        //         })
        //     })
        //     return prom
        // },
        /*"hint@": {
         template: "当前状态是about"
         }*/
        onEnter: function (a) {
            vm.args = a
        }
    })
    .state("bbb.son", {
        url: "/:bbb", views: {
            "": {
                templateProvider: function () {
                    return new Promise(function (rs) {
                        require.ensure([], function (tt) {
                            //  rs(require("text!./statetemp.html"))
                        })
                    })
                }
            }
        }, onEnter: function (a) {
            vm.args = a
        }
    })
//启动路由
avalon.history.start();
avalon.router.navigate("aaa");
//go!!!!!!!!!
avalon.scan(0, vm);
