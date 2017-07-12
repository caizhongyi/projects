var msgTip = {
    request_fail: '请求失败！'
}

function setMsgTip(options) {
    msgTip = $.extend(msgTip, options);
}

/** 获取当前用户权限 **/
function getCurUserPermission(callback) {
    $.ajax({
        url: "../permission_common.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getcurrentuserpermission'}",
        error: function (data) {
           
        },
        success: function (data) {
            if (callback) callback(data);
        }
    });
}

//getpermissionbyuser
function getPermissionByUser(userid, callback) {
    $.ajax({
        url: "../permission_common.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getpermissionbyuser',user_Id:'" + userid + "'}",
        error: function (data) {
           
        },
        success: function (data) {
            if (callback) callback(data);
        }
    });
}

/* 当前用户自定义权限数 IDSUM*/
function getCountOfCustomPermissionOfCurUSer(callback) {
    $.ajax({
        url: "../permission_common.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getcountofcustompermissionofuser'}",
        error: function (data) {
            
        },
        success: function (data) {
            if (callback) callback(data);
        }
    });
}

//getcustomofcur
function getCustomOfCur(callback) {
    $.ajax({
        url: '../permission_common.axd',
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getcustomofcur'}",
        error: function () {
        },
        success: function (data) {
            if (callback) callback(data);
        }
    });
}

//getcustompermissiondetail
function getCustomPermissionDetail(id, callback) {
    $.ajax({
        url: '../permission_common.axd',
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getcustompermissiondetail',perid:'" + id + "'}",
        error: function () {
        },
        success: function (data) {
            if (callback) callback(data);
        }
    });
}

//addcustompermission
/*
    allowObj为允许的对象，
    规则：
        对象为好友分组时：Friends--XXX(分组ID)
        对象为圈子时：Group--XXX(圈子ID)，
        对象为个人时：User--XXX(用户ID)。各对象组之间用-,-隔开
    refuseObj为拒绝对象。规则：User--XXX(用户ID)。各对象组之间用-,-隔开

*/
function addCustomPermission(opts, callback) {
    $.ajax({
        url: '../permission_common.axd',
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'addcustompermission',pername:'" + opts.perName + "',allow:'" + opts.allowList + "',refuse:'" + opts.refuseList + "',setdefault:'" + opts.setDefault + "'}",
        error: function () {
        },
        success: function (data) {
            if (callback) callback(data);
        }
    });
}

/*updatecustompermission
*/
function updateCustomPermission(opts, callback) {
    $.ajax({
        url: '../permission_common.axd',
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'updatecustompermission',oldper:'" + opts.perId + "',pername:'" + opts.perName + "',allow:'" + opts.allowList + "',refuse:'" + opts.refuseList + "',setdefault:'" + opts.setDefault + "'}",
        error: function () {
        },
        success: function (data) {
            if (callback) callback(data);
        }
    });
}

//delcustompermission
function delCustomPermission(perId, callback) {
    $.ajax({
        url: '../permission_common.axd',
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'delcustompermission',perId:'" + perId + "'}",
        error: function () {
        },
        success: function (data) {
            if (callback) callback(data);
        }
    });
}

// judge if can add custom permission for cur user
function canAddCustomPermissionForCurUser(callback) {
    $.ajax({
        url: '../permission_common.axd',
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'canaddcustompermissionforcuruser'}",
        error: function () {
        },
        success: function (data) {
            if (callback) callback(data);
        }
    });
}