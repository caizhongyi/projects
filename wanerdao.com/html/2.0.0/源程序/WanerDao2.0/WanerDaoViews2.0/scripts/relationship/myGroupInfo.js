$(document).ready(initData);

var joinType;
var is_kick_protected;
var kick_protected_duration;
var isshow1 = false;
var isshow2 = false;

function initData() {
    getMenu(4);
    existgroup(groupid, initDataT,true);
   
}

function initDataT(){
    
    getMyGroupMenu(0, false);
    getGroupInfo();
    getSuperName(groupid);
    getManagerName(groupid);
    getTreasurerName(groupid);
}

function getGroupInfo() {
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'searchgroupinfo',group_id:'" + groupid + "'}",
        error: function (data) {
            //  alert("error")
        },
        success: function (data) {

            $("#lab_groupName").html(data.rows[0].group_name);
            $("#lab_categoryName").html(data.rows[0].category_name);
            $("#lab_member").html(data.rows[0].member_nbr);
            $("#lab_createName").html(data.rows[0].name);
            $("#lab_createDate").html(data.rows[0].create_date);
            $("#lab_activity").html("<i class='iBar'><i style='width:" + data.rows[0].activity_score + "%;'></i><em>" + data.rows[0].activity_score + "%</em></i>");
            $("#lab_follow").html("<i class='iBar'><i style='width:" + data.rows[0].follow_score + "%;'></i><em>" + data.rows[0].follow_score + "%</em></i>");
            $("#lab_summary").html(data.rows[0].summary);
            $("#lab_description").html(data.rows[0].description);
            if (data.rows[0].join_fee == "0") {
                $("#lab_joinfee").hide();
                $("#lab_transferaccount").hide();
                $("#lab_transferdescription").hide();
            } else {
                $("#lab_joinfee").html(data.rows[0].join_fee);
                $("#lab_transferaccount").html(data.rows[0].transfer_account);
                $("#lab_transferdescription").html(data.rows[0].transfer_description);
            }
            $("#lab_joinmethod").html(data.rows[0].join_method_id);
            if (data.rows[0].join_method_id == "直接加入") {
                joinType = 0;
            } else if (data.rows[0].join_method_id == "批准加入") {
                joinType = 1;
            }
            $("#img_logo").html("<a href='#'><img src='../" + data.rows[0].logo_path + "' width='220' height='150' /></a>");
            is_kick_protected = data.rows[0].is_kick_protected;
            kick_protected_duration = data.rows[0].kick_protected_duration;
            if (data.rows[0].manage_type_id == "f1da1c0f-125a-11e1-9997-000c295f9365") {
                $("#btn_editGroup").remove();
                isshow1 = true;
                if (isshow1 && isshow2) {
                    getManageTypeData();
                    $(".liwa").show();
                }
            }
        }
    });

}

function getManageTypeData() {
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getgroupdemocratic',group_id:'" + groupid + "'}",
        error: function (data) {
            //  alert("error")
        },
        success: function (data) {

            $("#txt_democracy_rate").html(data.rows[0].democracy_rate);
            $("#txt_vote_life").html(data.rows[0].vote_life);
            $("#txt_public_life").html(data.rows[0].public_life);
            $("#txt_vote_pass_rate").html(data.rows[0].vote_pass_rate);
            $("#sel_managercycle").html(data.rows[0].change_duration);
            $("#sel_managersalary").html(data.rows[0].unit);
            $("#txt_managersalary").html(data.rows[0].salary);

            $("#sel_financialcycle").html(data.rows[0].change_duration2);
            $("#sel_financialsalary").html(data.rows[0].unit2);
            $("#txt_financialsalary").html(data.rows[0].salary2);

        }
    });
}

function setSuperName(data) {
    if (data != null&& data.total !=0) {
        $("#lab_super").html(data.rows[0].name);
        if (data.rows[0].id != wd_B.uin.uid) {
            ifjoin();
        } else {
            isshow2 = true;
            if (isshow1 && isshow2) {
                getManageTypeData();
                $(".liwa").show();
            }
            $("#btn_editGroup").show();
        }
    }
}

function setManagerName(data) {
    if (data != null) {
        var h = "";
        $.each(data.rows, function (i, v) {
            h += v.name + ",";
        });
        $("#lab_manager").html(h.substring(0, h.length - 1));
    }
}


function setTreasurerName(data) {
    if (data != null) {
        var h = "";
        $.each(data.rows, function (i, v) {
            h += v.name + ",";
        });
        $("#lab_treasurer").html(h.substring(0, h.length - 1));
    }
}

function ifjoin() {
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'ifGroupMember',group_id:'" + groupid + "',user_id:'" + wd_B.uin.uid + " '}",
        error: function (data) {
            // alert("error")
        },
        success: function (data) {
            if (data.total == "0") {
                $("#btn_addGroup").show();
                $("#myGroupMenu").empty().load("../relationship/viewGroupMenu.htm");
            } else {
                if (data.rows[0].is_authorized != "True" || (data.rows[0].is_pay != "True" && data.rows[0].join_fee != 0)) {
                    $("#myGroupMenu").empty().load("../relationship/viewGroupMenu.htm");
                    $("#waitmsg").html(wanerdaoLangTip('relationship_00019')).show();
                } else {
                    isshow2 = true;
                    if (isshow1 && isshow2) {
                        getManageTypeData();
                        $(".liwa").show();
                    }
                }
            }
        }
    });
}

function toEdit() {
    existgroup(groupid, toEditT, true);
  
}

function toEditT() {
    window.location.href = "relationship_mygroup_info_manage.html";
}

function addJoin() {
    existgroup(groupid, addJoinT, true);
}

function addJoinT() {
    
    var canjoin = true;
    if (is_kick_protected == "True") {

        $.ajax({
            url: "../wandao_group.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'ifcanjoin',group_id:'" + groupid + "',user_id:'" + wd_B.uin.uid + " '}",
            error: function (data) {
               // alert("error")
            },
            success: function (data) {
                successcanaddfun(data.result);
            }
        });


    } else {
        successcanaddfun("True"); 
    }

}

function errorfun(data){

}


function successcanaddfun(data) {

    if (data) {

        if (joinType == 0) {
            $.ajax({
                url: "../wandao_group.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'directlyjoin',group_id:'" + groupid + "',user_id:'" + wd_B.uin.uid + " '}",
                error: function (data) {
                   // alert("error")
                },
                success: function (data) {
                    successaddfun(data);
                }
            });
        } else {
            $.ajax({
                url: "../wandao_group.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'waitjoin',group_id:'" + groupid + "',user_id:'" + wd_B.uin.uid + " '}",
                error: function (data) {
                 //   alert("error")
                },
                success: function (data) {
                    successaddfun(data);
                }
            });
        }

    } else {
        $("#waitmsg").html(wanerdaoLangTip('relationship_00012')).show();
    }
}

function successaddfun(data) {
    $("#btn_addGroup").hide();
    if (data.msg == "wait") {
        $("#waitmsg").html(wanerdaoLangTip('relationship_00019')).show();
    } else if (data.msg == "nojoin") {
        $("#waitmsg").html(wanerdaoLangTip('relationship_00012')).show();
    } else {
        $("#waitmsg").html(wanerdaoLangTip('relationship_00020')).show();
        $("#myGroupMenu").empty();
        getMyGroupMenu(0, false);
     }
}