
function checklength(obj) {
    var max = obj.maxlength;
  
    if (max == null || max == "" || max == undefined) {
        return;
    }
    if (obj.value.length > max) {
        obj.value = obj.value.substring(0, (max));
        return;
    }
}


function disabledRightMouse() {
    document.oncontextmenu = function ()
    { return false; }
}

function enabledRightMouse() {
    document.oncontextmenu = null;
}

function getMenu(i) {
    $("#TopMenu").load("/relationship/menuTop.htm", "", function () {
        $(this).find("a").each(function (n) {
            if (i == n) {
                $(this).addClass("active")
            }
        })
    });

}


function getMyGroupMenu(i,b) {
    $("#myGroupMenu").load("/relationship/myGroupMenu.htm", "", function () {
        $(this).find("a").each(function (n) {
            if (i == n) {
                $(this).addClass("cur").css("background", "url(../images/per_logbg.jpg) repeat-x");

            }

        })
        getGroupRole(groupid, b);
    });

}

function getFollowMenu(i) {
    $("#followMenu").load("/relationship/follow/tabTop.htm", "", function () {
        $(this).find("a").each(function (n) {
            if (i == n) {
                $(this).addClass("tagf");
            }

        })
    });
}

function jsSelectIsExitItem(objSelect, Value) {
    var isExit = false;
    for (var i = 0; i < objSelect.children("option").size(); i++) {
        if (objSelect.children("option")[i].value == Value) {
            isExit = true;
            break;
        }
    }
    return isExit;
}