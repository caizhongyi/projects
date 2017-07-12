

//obj为需要提示帮助信息的对象，用于帮助信息定位。messDIV帮助信息相识的DIV，key为信息KEY值，type为展示形式，暂定2种，1-none：不需要重新定位messDIV。2-relocation：以obj对象的位置定位
function showHelpSYS(obj,messDIV, key, type) {

    $.ajax({
        url: "help_common.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'help',key:'" + key + "'}",
        error: function (data) {
        },
        success: function (data) {

            $("#" + messDIV).html(data.msg);
        }
    });

    if (type == "relocation") {
        $("#" + messDIV).css({ position: "absolute", 'top': $("#" + obj).offset().top + 25, 'left': $("#" + obj).offset().left });
    }
    $("#" + messDIV).show();
}

function hideHelpSYS(messDIV) {
    $("#" + messDIV).hide();
}