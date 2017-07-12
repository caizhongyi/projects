$(document).ready(initData);

var imageID = "";
function initData() {
    getMenu(6);
    $("#userName").html(wd_B.uin.name);
    intiswfu();
    getDroupCategory();
    getfeeUnit();
    getprotectTime();
    setManagetype();

    window.setTimeout("inviterstart()",2000);
}

function inviterstart() {
    $("#inviterDIV").inviter();
    $("#getgroupdata").click(function () {
        alert($.data(document.body, "groupdata"));
    })
}

function agreeSubmit(obj) {
    if ($(obj).attr("checked")) {
        $("#btn_sub").removeClass("cancel").addClass("complete").attr("disabled", "");
    }else{
        $("#btn_sub").removeClass("complete").addClass("cancel").attr("disabled", "disabled");
    }
}

function dellogo() {
    $("#thumbnails").empty();
}
var options;
function submitValidation() {
    var join_method;
    var imageName = "";
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
    var vfrienddtata= "";
    var vgroupdata ="";
    if ($("#dicAdd").attr("checked")) {
        join_method = $("#dicAdd").val();
    } else {
        join_method = $("#aprAdd").val();
    }

    if ($.trim($("#thumbnails").html()) != "") {
        if ($("#cpRt").attr("checked")) {
            imageName = $("#thumbnails").children().attr("title");
        } else {
            validation = false;
            alert("请确认上传的图片不侵犯第三方的版权");
        }
    }

    vgroupName = $.trim($("#txt_groupname").val())
    if (vgroupName == "请输入圈子名称" || vgroupName == "") {
        validation = false;
        alert("圈子名称不能为空");
    }

    vgroupCate = $.trim($("#groupCateList").val());
    if (vgroupCate == "") {
        validation = false;
        alert("圈子分类不能为空");
    }

    vsummary = $.trim($("#txt_summary").val());
    if (vsummary == "请输入圈子简介" || vsummary == "") {
        validation = false;
        alert("圈子简介不能为空");
    }

    vdescription = $.trim($("#txt_description").val());
    if (vdescription == "请输入圈子规章" || vdescription == "") {
        validation = false;
        alert("圈子规章不能为空");
    }

    vwebsite = $.trim($("#txt_website").val());
    if (vwebsite == "请输入圈子主页地址") {
        vwebsite = "";
    }

     fu =  $("#feeUnitList").val();
       if(fu!="0" &&fu!="4"){
          vfee =  $.trim($("#txt_fee").val());
          if (vfee == "请输入费用" || vfee == "") {
                validation = false;
                alert("缴纳费用不能为空");
            }
       }else if (fu=="4"){
            vfee = $.trim($("#txt_defind").val());
            if (vfee == "请输入费用" || vfee == "") {
                validation = false;
                alert("缴纳费用不能为空");
            }
            fu = $("#definedUnitList").val();
       }

        vtransfer = $("#txt_transfer").val();

        if (fu != "0" &&( vtransfer == "请输入汇款帐号" || vtransfer == "")) {
            validation = false;
            alert("汇款帐号不能为空");
        }
        vtransfer_description = $("#txt_transfer_description").val();
        if (vtransfer_description == "请输入说明内容") {
            vtransfer_description = "";
        }
        vprote = $("#prote").attr("checked");
        vkickduration = $("#protecttimeList").val();
        if($.data(document.body, "frienddata")!=null){
            vfrienddtata = $.data(document.body, "frienddata");
        }
          if($.data(document.body, "groupdata")!=null){
            vgroupdata = $.data(document.body, "groupdata");
        }
        options = {
            opertype: "creategroup",
            join_method_id: join_method,
            logo_name: imageName,
            group_name: vgroupName,
            category_id: vgroupCate,
            summary: vsummary,
            description:vdescription,
            website: vwebsite,
            manage_type_id:$("#cjjg").val(),
            join_fee: vfee,
            fee_unit: fu,
            transfer_account: vtransfer,
            transfer_description: vtransfer_description,
            is_kick_protected: vprote,
            kick_protected_duration: vkickduration,
            allfriends:$("#allfriends").is(":checked"),
            allgroups:$("#allgroups").is(":checked"),
            frienddtata: vfrienddtata,
            groupdata: vgroupdata
        }
    if (validation) {
        createGroup();
    }
}

 //   alert($.data(document.body, "frienddata"));
function createGroup() {

    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: toJson(options),
        error: function (data) {
            alert("error")
        },
        success: function (data) {
            if (data.result) {
                alert("创建成功");
            } else {
                alert("创建失败:" + data.msg);
            }

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
            definedUnit();
            var c = $("#unitUL").children("li");
            c.eq(0).hide();
            c.eq(2).show();
            c.eq(3).show();
        } else {
            var c = $("#unitUL").children("li");
            c.eq(0).show();
            c.eq(2).hide();
            c.eq(3).hide();
        }
    });
}