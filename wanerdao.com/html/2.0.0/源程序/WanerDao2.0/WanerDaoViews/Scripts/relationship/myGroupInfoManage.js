$(document).ready(initData);

var oldimgpath = "";
function initData() {
    getMenu(4);
    getMyGroupMenu(0);
    getDroupCategory();
    getfeeUnit();
    getprotectTime();
    intiswfu();
    getManagerName(groupid);
    getTreasurerName(groupid);
    definedUnit();
    setManagetype();
    getshiftcycle();
    getcyclesalary();
    $("#btnaddmanager").click(function () {
        wanerdaogroupmember({
            comopts: { elementid: 'btnaddmanager', groupid: groupid, callback: setaddManager }
        });
    });

    $("#btnaddfinance").click(function () {
        wanerdaogroupmember({
            comopts: { elementid: 'btnaddfinance', groupid: groupid, callback: setaddfinance }
        });
    });

    window.setTimeout(getGroupInfo, 2000);

    
    
}



function setaddManager(data) {
    $.each(data.group, function (i, v) {
        $("#managerDIV").append("<span lang ='" + v.id + "'>" + v.name + "<b onclick='delThisUser(this)'>x</b></span>");
    });
}

function setaddfinance(data) {
    $.each(data.group, function (i, v) {
        $("#treasurerDIV").append("<span lang ='" + v.id + "'>" + v.name + "<b onclick='delThisUser(this)'>x</b></span>")
    });
}

function setManagetype() {
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'groupmanagetype'}",
        error: function (data) {
            alert("error")
        },
        success: function (data) {
            $.each(data.rows, function (i, v) {
                if (v.type_name == "阶梯型管理") {
                    $("#input_5").val(v.id);
                } else {
                    $("#input_6").val(v.id);
                }
            });
        }
    });
}

function getGroupInfo() {
    $(function () {
        $("#btnaddmanager").overlay();
        $("#btnaddfinance").overlay();
    })
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'searchgroupinfo',group_id:'" + groupid + "'}",
        error: function (data) {
            alert("error")
        },
        success: function (data) {

            $("#txt_groupName").val(data.rows[0].group_name);
            $("#groupCateList").val(data.rows[0].category_id);
            if (data.rows[0].is_public == "True") {
                $("#chk_publie").attr("checked", "checked");
            }
            if (data.rows[0].join_method_id == "直接加入") {
                $("#dicAdd").attr("checked", "checked");
            } else {
                $("#aprAdd").attr("checked", "checked");
            }
            $("#thumbnails").empty().append("<img src='../" + data.rows[0].logo_path + "' id='groupImage' width='220' height='150'>");
            oldimgpath = data.rows[0].logo_path;
            $("#txt_summary").val(data.rows[0].summary);
            $("#txt_description").val(data.rows[0].description);
            $("#txt_website").val(data.rows[0].website);
            if (data.rows[0].fee_unit.length == "1") {
                $("#txt_fee").val(data.rows[0].join_fee).show();
                $("#feeUnitList").val(data.rows[0].fee_unit);
            } else {
                $("#txt_defind").val(data.rows[0].join_fee).show();

                $("#feeUnitList").val("4");
                $("#definedUnitList").val(data.rows[0].fee_unit);
                $("#definedUnitList").show();
            }


            $("#txt_transfer").val(data.rows[0].transfer_account);
            $("#txt_transfer_description").val(data.rows[0].transfer_description);
            if (data.rows[0].is_kick_protected == "True") {
                $("#prote").attr("checked", "checked");
                $("#protecttimeList").val(data.rows[0].kick_protected_duration);
            }
            if (data.rows[0].member_nbr >= 50) {
                $("#input_6").attr("disabled", "");
            }
        }
    });

}

function setManagerName(data) {
    if (data != null) {
        $.each(data.rows, function (i, v) {
            $("#managerDIV").append("<span lang ='" + v.id + "'>" + v.name + "<b onclick='delThisUser(this)'>x</b></span>");
        });
        
    }
}


function setTreasurerName(data) {
    if (data != null) {
        $.each(data.rows, function (i, v) {
            $("#treasurerDIV").append("<span lang ='" + v.id + "'>" + v.name + "<b onclick='delThisUser(this)'>x</b></span>");
        });
    }
}

function delThisUser(obj) {
    $(obj).parent().remove();
}



function cancelEdit() {
    window.location.href = "relationship_mygroup_info.aspx?id=" + groupid;
}

var options;
function editGroup() {
    var join_method;
    var newimgname = "";
    var vgroupName;
    var vgroupCate;
    var validation = true;
    var vsummary;
    var vdescription;
    var vwebsite;
    var fu;
    var vfee = "";
    var vtransfer;
    var vtransfer_description = "";
    var vprote;
    var vkickduration;
    var vifpublie;
    var vmanagerID = "";
    var treasurerID = "";
    var logoChange = false;
    var manage_type_id;
    var vrate = "";
    var vvotelife = "";
    var vpubliclife = "";
    var vvotepassrate = "";
    var vsel_manager = "";
    var vsel_managersalary = "";
    var vmanagersalary = "";
    var vsel_finance = "";
    var vsel_financesalary = "";
    var vfinancesalary = "";

    vgroupName = $.trim($("#txt_groupName").val())
    if (vgroupName == "") {
        validation = false;
        alert("圈子名称不能为空");
    }

    vgroupCate = $.trim($("#groupCateList").val());
    if (vgroupCate == "") {
        validation = false;
        alert("圈子分类不能为空");
    }

    if ($("#chk_publie").attr("checked")) {
        vifpublie = "1";
    } else {
        vifpublie = "0";
    }

    if ($("#dicAdd").attr("checked")) {
        join_method = $("#dicAdd").val();
    } else {
        join_method = $("#aprAdd").val();
    }

    $("#managerDIV span").each(function () {
       vmanagerID += $(this).attr("lang")+","
    });

   $("#treasurerDIV span").each(function () {
       treasurerID += $(this).attr("lang") + ","
   });

    if ($.trim($("#thumbnails").html()) != "") {
        if ($("#cpRt").attr("checked")) {
            newimgname = $("#thumbnails").children().attr("src");
            newimgname = newimgname.substring(newimgname.lastIndexOf("/")+1, newimgname.length);
            var oldimgname = oldimgpath.substring(oldimgpath.lastIndexOf("/")+1, oldimgpath.length);
            if (oldimgname != newimgname) {
                logoChange = true;
            }
        } else {
            validation = false;
            alert("请确认上传的图片不侵犯第三方的版权");
        }
    }

    vsummary = $.trim($("#txt_summary").val());
    if (vsummary == "") {
        validation = false;
        alert("圈子简介不能为空");
    }

    vdescription = $.trim($("#txt_description").val());
    if ( vdescription == "") {
        validation = false;
        alert("圈子规章不能为空");
    }

    vwebsite = $.trim($("#txt_website").val());


    if ($("#input_5").attr("checked")) {
        manage_type_id = $("#input_5").val() ;
    } else {
        manage_type_id = $("#input_6").val();
        vrate = $("#txt_rate").val();
        vvotelife = $("#txt_vote_life").val();
        vpubliclife = $("#txt_public_life").val();
        vvotepassrate = $("#txt_vote_pass_rate").val();
        vsel_manager = $("#sel_manager").val();
        vsel_managersalary = $("#sel_managersalary").val();
        vmanagersalary = $("#txt_managersalary").val();
        vsel_finance = $("#sel_finance").val();
        vsel_financesalary = $("#sel_financesalary").val();
        vfinancesalary = $("#txt_financesalary").val();
    }

    

    fu = $("#feeUnitList").val();
    if (fu != "0" && fu != "4") {
        vfee = $.trim($("#txt_fee").val());
        if (vfee == "") {
            validation = false;
            alert("缴纳费用不能为空");
        }
    } else if (fu == "4") {
        vfee = $.trim($("#txt_defind").val());
        fu = $("#definedUnitList").val();
        if (vfee == "") {
            validation = false;
            alert("缴纳费用不能为空");
        }
    }

    vtransfer = $("#txt_transfer").val();

    if ( vtransfer == "") {
        validation = false;
        alert("汇款帐号不能为空");
    }
    vtransfer_description = $("#txt_transfer_description").val();


    if ($("#prote").attr("checked")) {
        vprote = "1";
    } else {
        vprote = "0";
    }
    vkickduration = $("#protecttimeList").val();

    options = {
        opertype: "editgroup",
        join_method_id: join_method,
        logo_name: newimgname,
        group_name: vgroupName,
        category_id: vgroupCate,
        summary: vsummary,
        description: vdescription,
        website: vwebsite,
        manage_type_id:manage_type_id,
        join_fee: vfee,
        fee_unit: fu,
        transfer_account: vtransfer,
        transfer_description: vtransfer_description,
        is_kick_protected: vprote,
        kick_protected_duration: vkickduration,
        is_public: vifpublie,
        managerID: vmanagerID,
        treasurerID : treasurerID,
        logoChange : logoChange,
        group_id: groupid,
        democracy_rate: vrate,
        vote_life:vvotelife,
        public_life:vpubliclife,
        vote_pass_rate:vvotepassrate,
        mchange_duration :vsel_manager,
        mpay_duration:vsel_managersalary,
        msalary:vmanagersalary,
        fchange_duration :vsel_finance,
        fpay_duration:vsel_financesalary,
        fsalary:vfinancesalary
    }
    if (validation) {
        ajaxfunc("../wandao_group.axd", toJson(options), errorEdit, successEdit);
    }
}

function hideDemoSetting() {
    $("#democracySetting").hide();
}

function showDemoSetting() {
    $("#democracySetting").show();
}

function errorEdit(){
    
}

function successEdit(o){
    window.location.href = "relationship_mygroup_info.html?id=" + groupid;
}
