//缴费基本单位
function getfeeUnit() {
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'feeunit'}",
        error: function (data) {
            alert("error")
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
    feeu.bind("change", function () {
        if ($(this).find("option:selected").text() == "自定义") {
            $("#txt_fee").hide();
            $("#txt_defind").show();
            $("#definedUnitList").show();
        } else {
            $("#txt_fee").show();
            $("#txt_defind").hide();
            $("#definedUnitList").hide();
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
            alert("error")
        },
        success: function (data) {
            var defined = $("#definedUnitList");
            defined.empty();
            $.each(data.rows, function (i, v) {
                $("<option value='" + v.value + "'>" + v.text + "</option>").appendTo(defined);
            });

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
            alert("error")
        },
        success: function (data) {
            var groupCate = $("#groupCateList");
            $("<option value=''>请选择圈子分类</option>").appendTo(groupCate);
            $.each(data.rows, function (i, v) {
                $("<option value='" + v.id + "'>" + v.category_name + "</option>").appendTo(groupCate);
            });
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
            alert("error")
        },
        success: function (data) {
            var protecttime = $("#protecttimeList");
            $.each(data.rows, function (i, v) {
                $("<option value='" + v.value + "'>" + v.text + "</option>").appendTo(protecttime);
            });

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
            alert("error")
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
            alert("error")
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
            alert("error")
        },
        success: function (data) {
            setTreasurerName(data);        
        }
    });
}

var roleLevel = "";

//取用户角色
function getGroupRole(id) {
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'grouprole',group_id:'" + id + "'}",
        error: function (data) {
            alert("error")
        },
        success: function (data) {
            $.each(data.rows, function (i, v) {
              roleLevel +=  v.level+",";
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
            alert("error")
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
            alert("error")
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
            alert("error")
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
