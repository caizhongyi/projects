$(document).ready(initData);

var settingID = "";
function initData() {
    getMenu(4);
    $("#slt_digest").chosen();
    getMyGroupMenu(4, false);
    dataBind();

    $("#btngroup").click(function () {
        wanerdaoPop({
        comopts: { titleid: 'common_00012', typename: 'group', elementid: 'btnaddfinance', callback: showdata}
        });
    });
   

    window.setTimeout(initoverlay, 2000);

}


function showdata(data) {
    $.each(data.group, function (i, v) {
        $("#userDIV").append("<span lang ='" + v.id + "'>" + v.name + "<b onclick='delThisUser(this)'>x</b></span>");
    });
}


function dataBind() {
    ajaxfunc("../wandao_group.axd", "{opertype:'getsetting',group_id:'" + groupid + "',user_id:'" + wd_B.uin.uid + "'}", erroret, successret);
}

function initoverlay() {
   // $("#btngroup").overlay();
}
function erroret() {

}

function setblank() {
    window.location.href = "relationship_mygroup_settings.html";
}

function successret(data) {
    if (data.total == "0") {
        $.ajax({
            url: "../wandao_personal.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'getpersonalcontact'}",
            error: function (data) {
                alert("error")
            },
            success: function (data) {
              
                $("#txt_mail").val(data.obj.email);
            }
        });

    } else {
    settingID = data.rows[0].id;
        $("#txt_mail").val(data.rows[0].contact_email);

        if (data.rows[0].is_email_event == "False") {
            $("#chk_mailevent").attr("checked", "");
        } else {
            $("#chk_mailevent").attr("checked", "checked");
        }

        if (data.rows[0].is_notice_event == "False") {
            $("#chk_msgevent").attr("checked", "");
        } else {
            $("#chk_msgevent").attr("checked", "checked");
        }

        if (data.rows[0].is_email_event == "False" && data.rows[0].is_notice_event == "False") {
            $("#chk_event").attr("checked", false);
        }

        if (data.rows[0].is_email_updates == "False") {
            $("#chk_mailupdates").attr("checked", false);
        } else {
            $("#chk_mailupdates").attr("checked", "checked");
        }

        if (data.rows[0].is_notice_updates == "False") {
            $("#chk_msgupdates").attr("checked", "");
        } else {
            $("#chk_msgupdates").attr("checked", "checked");
        }
        if (data.rows[0].is_email_updates == "False" && data.rows[0].is_notice_updates == "False") {
            $("#chk_updates").attr("checked", "");
        } else {
            $("#chk_updates").attr("checked", "checked");
        }





        if (data.rows[0].is_email_digest == "False") {
            $("#chk_maildigest").attr("checked", "");
        } else {
            $("#chk_maildigest").attr("checked", "checked");
        }

        if (data.rows[0].is_email_digest == "False" && data.rows[0].is_notice_digest == "False") {
            $("#chk_digest").attr("checked", "");
        } else {
            $("#chk_digest").attr("checked", "checked");

            if (data.rows[0].is_notice_digest == "False") {
                $("#chk_msgdigest").attr("checked", "");
            } else {
                $("#chk_msgdigest").attr("checked", "checked");
            }

            var s = data.rows[0].digest_duration;
            var n = s / 8640
            if (n.toString().indexOf(".") == -1) {
                $("#slt_digest").val("8640");
                $("#txt_digest").val(n);
            } else {
                n = s / 2160;
                if (n.toString().indexOf(".") == -1) {
                    $("#slt_digest").val("2160");
                    $("#txt_digest").val(n);
                } else {
                    n = s / 720;
                    if (n.toString().indexOf(".") == -1) {
                        $("#slt_digest").val("720");
                        $("#txt_digest").val(n);
                    } else {
                        n = s / 168;
                        if (n.toString().indexOf(".") == -1) {
                            $("#slt_digest").val("168");
                            $("#txt_digest").val(n);
                        } else {
                            n = s / 24;
                            if (n.toString().indexOf(".") == -1) {
                                $("#slt_digest").val("24");
                                $("#txt_digest").val(n);
                            }
                        }
                    }
                }
            }
        }


        if (data.rows[0].is_allow_msg == "False") {
            $("#chk_msg").attr("checked", "");
        } else {
            $("#chk_msg").attr("checked", "checked");
        }

        $.ajax({
            url: "../wandao_group.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'getmsgexception',group_id:'" + groupid + "',user_id:'" + wd_B.uin.uid + "'}",
            error: function (dt) {
                alert("error")
            },
            success: function (dt) {
                $("#userDIV span").remove();
                addUser(dt);

            }
        });
    }
}



function addUser(data) {
    if (data != null) {
        $.each(data.rows, function (i, v) {
            $("#userDIV").append("<span lang ='" + v.id + "'>" + v.name + "<b onclick='delThisUser(this)'>x</b></span>");
        });

    }
}

function delThisUser(obj) {
    $(obj).parent().remove();
}


var options;
function submitValidation() {
    var validation = true;
    $(".msgLabArr").html("");
 if ($("#chk_event").attr("checked")) {
        if (!$("#chk_mailevent").attr("checked") && !$("#chk_msgevent").attr("checked")) {
            $("#msgevent").html(wanerdaoLangTip('relationship_00021'));
          
            validation = false;
        }
    }
    if ($("#chk_updates").attr("checked")) {
        if (!$("#chk_mailupdates").attr("checked") && !$("#chk_msgupdates").attr("checked")) {
            $("#msgupdates").html(wanerdaoLangTip('relationship_00022'));
             validation = false;
        }
    }

    var userIDStr = "";
     $("#userDIV span").each(function () {
         userIDStr += $(this).attr("lang") + ","
     });

     var vis_email_event = "";
     if ($("#chk_mailevent").attr("checked")) {
             vis_email_event = 1;
         } else {
         vis_email_event = 0;
     }

 var vis_notice_event ="";
 if ( $("#chk_msgevent").attr("checked")) {
     vis_notice_event = 1;
 } else {
     vis_notice_event = 0;
 }

 var vis_email_updates = "";
 if ($("#chk_mailupdates").attr("checked")) {
     vis_email_updates = 1;
 } else {
     vis_email_updates = 0;
 }

 var vis_notice_updates = "";
 if ($("#chk_msgupdates").attr("checked")) {
     vis_notice_updates = 1;
 } else {
     vis_notice_updates = 0;
 }

 var vis_email_digest = "";
 if ($("#chk_maildigest").attr("checked")) {
     vis_email_digest = 1;
 } else {
     vis_email_digest = 0;
 }


 var vis_notice_digest = "";
 if ($("#chk_msgdigest").attr("checked")) {
     vis_notice_digest = 1;
 } else {
     vis_notice_digest = 0;
 }


 var vis_allow_msg = "";
 if ($("#chk_msg").attr("checked")) {
     vis_allow_msg = 1;
 } else {
     vis_allow_msg = 0;
 }

    var type = $("#slt_digest").val();
    var num = $("#txt_digest").val();
      options = {
            opertype: "updategroupsetting",
            id:settingID,
            group_id:groupid,
            user_id: wd_B.uin.uid,
            contact_email: $("#txt_mail").val(),
            is_email_event: vis_email_event,
            is_notice_event: vis_notice_event,
            is_email_updates: vis_email_updates,
            is_notice_updates: vis_notice_updates,
            is_email_digest: vis_email_digest,
            is_notice_digest: vis_notice_digest,
            digest_duration: type * num,
            is_allow_msg: vis_allow_msg,
            userID: userIDStr
        }


      
    if (validation) {
        saveSetting();
    }
}



function saveSetting() {

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
            $("#msgsubmit").html(wanerdaoLangTip('common_00033'));
        }
    });
}