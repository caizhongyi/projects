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

    window.setTimeout("inviterstart()", 2000);

    $("#groupCateList").change(function () {
        vgroupCate = $.trim($("#groupCateList").val());
        if (vgroupCate != "") {
            $("#msgCate").hide();
        }
    }).chosen();
}

function inviterstart() {
    $("#inviterDIV").inviter();
//    $("#getgroupdata").click(function () {
//        alert($.data(document.body, "groupdata"));
//    })
}

function agreeSubmit(obj) {
    if ($(obj).attr("checked")) {
        $("#btn_sub").show() ;
    }else{
        $("#btn_sub").hide();
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
    var vtransfer ="";
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
            $("#msgcopyright").html(wanerdaoLangTip('relationship_00002'));
            $("#msgcopyright").show();
        }
    }

    vgroupName = $.trim($("#txt_groupname").val())
    if (vgroupName == "请输入圈子名称" || vgroupName == "") {
        validation = false;
        $("#msgName").html(wanerdaoLangTip('relationship_00003'));
        $("#msgName").show();
    }

    vgroupCate = $.trim($("#groupCateList").val());
    if (vgroupCate == "") {
        validation = false;
        $("#msgCate").html(wanerdaoLangTip('relationship_00004'));
        $("#msgCate").show();
    }

    vsummary = $.trim($("#txt_summary").val());
    if (vsummary == "请输入圈子简介" || vsummary == "") {
        validation = false;
        $("#msgSummary").html(wanerdaoLangTip('relationship_00005'));
        $("#msgSummary").show();
    }

    vdescription = $.trim($("#txt_description").val());
    if (vdescription == "请输入圈子规章" || vdescription == "") {
        validation = false;
        $("#msgdes").html(wanerdaoLangTip('relationship_00006'));
        $("#msgdes").show();
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
               $("#msgUnit").html(wanerdaoLangTip('relationship_00007'));
               $("#msgUnit").show();
            }
       }else if (fu=="4"){
            vfee = $.trim($("#txt_defind").val());
            if (vfee == "请输入费用" || vfee == "") {
                validation = false;
                $("#msgUnit").html(wanerdaoLangTip('relationship_00007'));
                $("#msgUnit").show();
            }
            fu = $("#definedUnitList").val();
       }
       if (fu != "0") {
           vtransfer = $("#txt_transfer").val();

           if (fu != "0" && (vtransfer == "请输入汇款帐号" || vtransfer == "")) {
               validation = false;
               $("#msgTrans").html(wanerdaoLangTip('relationship_00008'));
               $("#msgTrans").show();
           }
       }
        vtransfer_description = $("#txt_transfer_description").val();
        if (vtransfer_description == "请输入说明内容") {
            vtransfer_description = "";
        }
        vprote = $("#prote").attr("checked");
        if (vprote == null) {
            vprote = false;
        }
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
            $(".msgLabArr").html("");
        } else {

            $("#msgSubmit").html(wanerdaoLangTip('relationship_00042'));
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
                $("#btn_sub").removeClass("btnBlue_135").val(wanerdaoLangTip('relationship_00038'));
                window.location.href = "relationship_mygroup_main.html";
//                $("#msgSubmit").html(wanerdaoLangTip('relationship_00009'));
//                $("#btn_sub").hide();
            } else {
                $("#msgSubmit").html(wanerdaoLangTip('relationship_00010') + ":" + data.msg);

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
            $("#txt_fee").hide();
            $("#msgTrans").show();
            definedUnit();
            var c = $("#unitUL").children("li");

            c.eq(0).hide();
            c.eq(2).show();
            c.eq(3).show();
        } else if ($(this).find("option:selected").val() == "0") {
            $("#txt_fee").hide();
            $("#msgUnit").hide();
            $("#msgTrans").hide();
            var c = $("#unitUL").children("li");
            c.eq(0).show();
            c.eq(2).hide();
            c.eq(3).hide();
        }
        else {
            $("#txt_fee").show();
            $("#msgTrans").show();
            var c = $("#unitUL").children("li");
            c.eq(0).show();
            c.eq(2).hide();
            c.eq(3).hide();
        }
    });
    feeu.chosen();
}

function cancel() {
    window.location.href = "relationship_group_create.html";
}