function existgroup(id, refun,isinfo) {
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'ifexistgroup',group_id:'" + id + "'}",
        error: function (data) {
            //  alert("error")
        },
        success: function (data) {
            if (data.result) {
                if (isinfo == null) {
                    $.ajax({
                        url: "../wandao_group.axd",
                        type: "POST",
                        dataType: "json",
                        cache: false,
                        data: "{opertype:'ifGroupMember',group_id:'" + groupid + "',user_id:'" + wd_B.uin.uid + " '}",
                        error: function (data) {
                        },
                        success: function (data) {
                            if (data.total == "0") {
                                new pop({ typename: 'confirm', msginfo: '你不是该圈子成员！', callback: function () {
                                    window.location.href = "relationship_mygroup.html";
                                }
                                });
                            } else {
                                refun();
                            }
                        }
                    });
                } else {
                    refun();
                }


            } else {
                new pop({ typename: 'confirm', msginfo: '该圈子不存在或者已被删除', callback: function () {
                    window.location.href = "relationship_mygroup.html";
                }
                });

            }
        }
    });
}

var amanagetype;//圈子管理结构

function getgroupmanagetype(id) {
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'searchgroupinfo',group_id:'" + id + "'}",
        error: function (data) {
            //  alert("error")
        },
        success: function (data) {
            if (data.result) {
                amanagetype = data.rows[0].manage_type_id;
            }
        }
    });
}


//判断圈子是否存在
function ifexistgroup(id,refun) {
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'ifexistgroup',group_id:'" + id + "'}",
        error: function (data) {
          //  alert("error")
        },
        success: function (data) {
            if (data.result) {
                refun();
            } else {
                new pop({ typename: 'message', msginfo: wanerdaoLangTip('relationship_00043') });
            }
        }
    });
}







//缴费基本单位
function getfeeUnit() {
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'feeunit'}",
        error: function (data) {
          //  alert("error")
        },
        success: function (data) {
            setfeeUnit(data);
          

        }
    });
}

function setfeeUnit(data) {
    var feeu = $("#feeUnitList");
    $.each(data.rows, function (i, v) {
        $("<option value='" + v.value + "'>" + v.text + "</option>").appendTo(feeu);
    });
    feeu.chosen();
    feeu.bind("change", function () {
        if ($(this).find("option:selected").text() == "自定义") {
            $("#txt_fee").hide();
            $("#txt_defind").show();
            $("#msgTrans").show();
            $("#definedUnitList_chzn").show();
        } else if ($(this).find("option:selected").val() == "0") {
            $("#txt_fee").hide();
            $("#msgUnit").hide();
            $("#msgTrans").hide();
            $("#txt_defind").hide();
            $("#definedUnitList_chzn").hide();
        }
        else {
            $("#txt_fee").show();
            $("#msgTrans").show();
            $("#txt_defind").hide();
            $("#definedUnitList_chzn").hide();
        }
    });
 
}




//缴费自定义单位
function definedUnit() {
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'definedunit'}",
        error: function (data) {
           // alert("error")
        },
        success: function (data) {
            var defined = $("#definedUnitList");
            defined.empty();
            $.each(data.rows, function (i, v) {
                $("<option value='" + v.value + "'>" + v.text + "</option>").appendTo(defined);
            });
            defined.chosen();
        }
    });
}

//圈子类型
function getDroupCategory() {
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'groupcategory'}",
        error: function (data) {
            //alert("error")
        },
        success: function (data) {

            var groupCate = $("#groupCateList");
            $("<option value=''>请选择圈子分类</option>").appendTo(groupCate);
            $.each(data.rows, function (i, v) {
                $("<option value='" + v.id + "'>" + v.value + "</option>").appendTo(groupCate);
            });
            groupCate.chosen()
//            try{
//            reCategory();
//            }catch(e){
//            
//            }
        }
    });
}


//保护时间
function getprotectTime() {
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'protecttime'}",
        error: function (data) {
          //  alert("error")
        },
        success: function (data) {
            var protecttime = $("#protecttimeList");
            $.each(data.rows, function (i, v) {
                $("<option value='" + v.value + "'>" + v.text + "</option>").appendTo(protecttime);
            });
            protecttime.chosen()

        }
    });
}

//取超级管理员名字
function getSuperName(id) {
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'sreacSuper',group_id:'" + id + "'}",
        error: function (data) {
         //   alert("error")
        },
        success: function (data) {
            setSuperName(data);         
        }
    });
}

//取管理员名字
function getManagerName(id) {
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'sreachManager',group_id:'" + id + "'}",
        error: function (data) {
           // alert("error")
        },
        success: function (data) {
            setManagerName(data);  
           
        }
    });
}

//取财务员名字
function getTreasurerName(id) {
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'sreachtreasurer',group_id:'" + id + "'}",
        error: function (data) {
            //alert("error")
        },
        success: function (data) {
            setTreasurerName(data);        
        }
    });
}

var roleLevel = "";
var ifhavefinance = false;
//取用户角色
function getGroupRole(id, re) {
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'grouprole',group_id:'" + id + "'}",
        error: function (data) {
           // alert("error")
        },
        success: function (data) {
            $.each(data.rows, function (i, v) {
                roleLevel += v.level + ",";
                if (v.level == "0" || v.level == "4") {
                    ifhavefinance = true;
                }
            });
            if (!ifhavefinance) {
                $("#financemenu").hide();
            }
            $("#myGroupMenuUL").show();
            if (re) {
                refFun();
            }
        }
    });
}

var ismanagerforGroup = false;
//取用户角色(是否管理员)
function getGroupRoleforGroup(id, refFun) {
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'grouprole',group_id:'" + id + "'}",
        error: function (data) {
            // alert("error")
        },
        success: function (data) {
            $.each(data.rows, function (i, v) {
                roleLevel += v.level + ",";
                if (v.level == "0" || v.level == "1") {
                    ismanagerforGroup = true;
                }
            });
            refFun();
        }
    });
}

//设置圈子类型ID
function setManagetype() {
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'groupmanagetype'}",
        error: function (data) {
          //  alert("error")
        },
        success: function (data) {
            $.each(data.rows, function (i, v) {
                if (v.type_name == "阶梯型管理") {
                    $("#cjjg").val(v.id);
                } else {
                    $("#disab").val(v.id);
                }
            });
        }
    });
}


//执行管理员财务员换届周期
function getshiftcycle() {
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getselparam',param:'shiftcycle'}",
        error: function (data) {
           // alert("error")
        },
        success: function (data) {
            setshiftcycle(data);
        }
    });
}

function setshiftcycle(data) {
    var sel_manager = $("#sel_manager");
    var sel_finance = $("#sel_finance");
    $.each(data.rows, function (i, v) {
        $("<option value='" + v.value + "'>" + v.text + "</option>").appendTo(sel_manager);
        $("<option value='" + v.value + "'>" + v.text + "</option>").appendTo(sel_finance);
    });
    sel_manager.chosen();
    sel_finance.chosen();
   
}



//执行管理员财务员薪酬
function getcyclesalary() {
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getselparam',param:'cyclesalary'}",
        error: function (data) {
         //   alert("error")
        },
        success: function (data) {
            setcyclesalary(data);
        }
    });
}

function setcyclesalary(data) {
    var sel_manager = $("#sel_managersalary");
    var sel_finance = $("#sel_financesalary");
    $.each(data.rows, function (i, v) {
        $("<option value='" + v.value + "'>" + v.text + "</option>").appendTo(sel_manager);
        $("<option value='" + v.value + "'>" + v.text + "</option>").appendTo(sel_finance);
    });
    sel_manager.chosen();
    sel_finance.chosen();

}


function isinputName() {
    vgroupName = $.trim($("#txt_groupname").val())
    if (vgroupName != "" && vgroupName != "请输入圈子名称") {
        $("#msgName").hide();
    }

}

function isinputsummary() {

    vsummary = $.trim($("#txt_summary").val());
    if (vsummary != "") {
        $("#msgSummary").hide();
    }


}


function isinputdescription() {

    vdescription = $.trim($("#txt_description").val());
    if (vdescription != "") {
        $("#msgdes").hide();
    }

}

function islogoagree(obj) {
    if ($("#cpRt").attr("checked")) {
        $("#msgcopyright").hide();
    } else {
        $("#msgcopyright").show();
    }
}

function isinputfee() {

    fu = $("#feeUnitList").val();
    if (fu != "0" && fu != "4") {
        vfee = $.trim($("#txt_fee").val());
        if (vfee == "请输入费用" || vfee == "") {
            $("#msgUnit").show();
        } else {
            $("#msgUnit").hide();
        }
    }
}

function isinputdefind() {
    fu = $("#feeUnitList").val();
    if (fu == "4") {
        vfee = $.trim($("#txt_defind").val());
        if (vfee == "请输入费用" || vfee == "") {
            $("#msgUnit").show();
        } else {
            $("#msgUnit").hide();
        }
    }
}

function isinputtransfer() {
    fu = $("#feeUnitList").val();
    if (fu == "4") {
        fu = $("#definedUnitList").val();
    }
    if (fu != "0") {
        vtransfer = $("#txt_transfer").val();

        if (fu != "0" && (vtransfer == "请输入汇款帐号" || vtransfer == "")) {
            $("#msgTrans").show();
        } else {
            $("#msgTrans").hide();
        }
    }
}

//判断整数
function isDigit(s) {

    if (s.search("^-?\\d+$") != 0) {
        return false;
    } else {
        return true
    }
}


var swfu;
function intiswfu(t,o) {

    var path = document.location.href;
    var type = "*.jpg;*.jpeg;*.gif;*.png;*.bmp";
    if (t != null) {
        type = t;
    }

    var opertype = "uploadimagefile";
    if (o != null) {
        opertype = o;
    }

    swfu = new SWFUpload({
        // Backend Settings
        upload_url: "photoupload_group.axd", // Relative to the SWF file
        post_params: {
            "opertype": opertype, //业务代码
            "user_id": wd_B.uin.uid
        },

        // File Upload Settings
        file_size_limit: "2 MB",
        file_types: type,
        file_types_description: "图片",
        file_upload_limit: "0",    // Zero means unlimited

        // Event Handler Settings - these functions as defined in Handlers.js
        //  The handlers are not part of SWFUpload but are part of my website and control how
        //  my website reacts to the SWFUpload events.
        file_queue_error_handler: fileQueueError,
        file_dialog_complete_handler: fileDialogComplete,
        upload_progress_handler: uploadProgress,
        upload_error_handler: uploadError,
        upload_success_handler: uploadSuccess,
        upload_complete_handler: uploadComplete,

        // Button settings
        button_image_url: "../images/PluginImages/Album/photo_upload_button2.gif", // Relative to the SWF file
        button_placeholder_id: "spanButtonPlaceholder",
        button_width: 109,
        button_height: 37,
        button_text: '',
        button_text_style: '',
        button_text_top_padding: 0,
        button_text_left_padding: 0,

        // Flash Settings
        flash_url: "../Scripts/Plugin/Ablum/swfupload.swf", // Relative to this file

        // Debug Settings
        debug: false
    });
}
