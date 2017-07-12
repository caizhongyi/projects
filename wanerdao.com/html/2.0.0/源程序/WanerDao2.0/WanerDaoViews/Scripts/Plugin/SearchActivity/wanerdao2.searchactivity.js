var wanerdaosearchactivity = new Object({
    defaults: new Object({
        url: 'pagination_common.axd',
        before: function () { },
        error: function (data) { },
        success: function (data) { },
        param: {
            pagecurrent: 1, //当前页
            opertype: "searchactivitybymanycondition", //业务处理类别
            pageSize: '10', //页码数
            activityNames: "", //活动名字串，用“:”分隔
            catygoryNames: "", //分类名字串，用“:”分隔
            friendsName: "", //朋友名字串，用“:”分隔
            groupNames: "", //圈子名字串，用“:”分隔
            sightNames: "", //景点名字串，用“:”分隔
            countryId: "", //国家
            provinceId: "", //省份
            cityId: ""//城市
        }
    }),

    searchactivity: function (opts) {
        if (opts && opts instanceof Object) {
            var options = this.initoptions(opts);
            $.ajax({
                url: options.url,
                type: 'POST',
                dataType: "json",
                data: options.param,
                cache: false,
                timeout: 60000,
                beforeSend: function () {
                    var before = options.before();
                },
                error: function (data) {
                    var error = options.error(data);
                },
                success: function (data) {
                    var success = options.success(data);
                }
            });
        }
    },
    //初始化所有参数，扩充所有对象（用于允许用户缺省不需要的参数），
    initoptions: function (srcopts) {
        var options = $.extend(true, {}, this.defaults, srcopts);
        return options;
    },
    //初始化param对象参数，扩充所有param对象（用于允许用户缺省不需要的参数），
    initparam: function (srcparam) {
        return $.extend(true, {}, this.defaults.param, srcparam);
    }

})