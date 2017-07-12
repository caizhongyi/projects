
function getMenu(i) {
    $("#TopMenu").load("../relationship/menuTop.htm", "", function () {
        $(this).find("a").each(function (n) {
            if (i == n) {
                $(this).addClass("active")
            }
        })
    });

}


function getMyGroupMenu(i) {
    $("#myGroupMenu").load("../relationship/myGroupMenu.htm", "", function () {
        $(this).find("a").each(function (n) {
            if (i == n) {
                $(this).addClass("cur")
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