$(document).ready(initData);

var currentPage;
var currentName = "";
var currentSex = "";
var currentAge = "";

var currentConstellation = "";
var currenthobby = "";

var currentCountry = "";
var currentState = "";
var currentCity = "";
var currentBirthCountry = "";
var currentBirthState = "";
var currentBirthCity = "";


function initData() {
    getMenu(1);
    pagination(1);

    $("#currentbtn").click(function (event) {
        event.stopPropagation();
            new wanerdaoArea({ comopts: { elementid: "#currentbtn", callback: showcurrentdata
            }
            });
    });

    $("#birthbtn").click(function (event) {
        event.stopPropagation();
        new wanerdaoArea({ comopts: { elementid: "#birthbtn", callback: showbirthdata
        }
        });
    });

//    $("#currentbtn").click(function () {
//        wanerdaoArea({
//            alphopts: { title: '地区选择框', id: 'tt', elementid: 'currentbtn', callback: showcurrentdata }
//        });
//    });

//    $("#birthbtn").click(function () {
//        wanerdaoArea({
//            alphopts: { title: '地区选择框', id: 'tt', elementid: 'birthbtn', callback: showbirthdata }
//        });
//    });


    //window.setTimeout(btnoverlay, 2000);
   

}

//function btnoverlay() {
//    $("#currentbtn").overlay();
//    $("#birthbtn").overlay();
//}


function showcurrentdata(data) {
    var cur = "";
    if(data.country != null) {
        currentCountry = data.country.id;
        cur = data.country.name

    }
    if (data.state != null) {
        currentState = data.state.id;
        cur += data.state.name;
    }
    if (data.city != null) {
        currentCity = data.city.id;
        cur += data.city.name;
    }
    $("#currentbtn").css("color", "#333");
    $("#currentlab").html(cur);
}

function showbirthdata(data) {
    var bir = "";
    if (data.country != null) {
        currentBirthCountry = data.country.id;
        bir = data.country.name

    }
    if (data.state != null) {
        currentBirthState = data.state.id;
        bir += data.state.name;
    }
    if (data.city != null) {
        currentBirthCity = data.city.id;
        bir += data.city.name;
    }
    $("#birthbtn").css("color", "#333");
    $("#birthlab").html(bir);
}
function clearAll() {
     currentName = "";
     currentSex = "";
     currentAge = "";

     currentConstellation = "";
     currenthobby = "";

     currentCountry = "";
     currentState = "";
     currentCity = "";
     currentBirthCountry = "";
     currentBirthState = "";
     currentBirthCity = "";
     $("#txtname").val("请输入关键字");
     $(":radio").attr("checked", false);
     $("#lsbAge").attr("value", '').chosen();
     $("#ConstellationList").attr("value", '').chosen();
     $("#txthobby").val("请输入兴趣爱好");
     $("#currentbtn").val("点击选择城市");
     $("#birthbtn").val("点击选择城市");
}

function searchFriends() {
    var name = $("#txtname").val();
    if (name != "请输入关键字") {
        currentName = name;
    } else {
    currentName = "";
    }
    if ($("#male").is(":checked")) {
        currentSex = "1"
    } else if ($("#female").is(":checked")) {
        currentSex = "0"
    } else {
    currentSex = "";
    }
    currentAge = $("#lsbAge").val();
    currentConstellation = $("#ConstellationList").val();
    currenthobby
    var hobby = $("#txthobby").val();
    if (hobby != "请输入兴趣爱好") {
        currenthobby = hobby;
    }
    pagination(1);
}

function pagination(currPage) {
  //基础配置
    $(".pageList").myPagination({
        showmore: false, //是否显示加载更多
        showpagingnav: true, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
        contentid: '#content', //此处ID或者样式类名或者用来加载提示信息或者可以用来显示“加载更多”这个功能
        callback: databind,
        pagermore: false,
        ajax: {
            url: 'wandao_common.axd', //此处必须填写，分页已没有固定处理工厂
            param: {
                pagecurrent: 1,
                pageSize: 10,
                opertype: 'searchfriends', //操作码,
                 name: currentName,
                gender: currentSex,
                birthday: currentAge,
                constellation: currentConstellation,
                current_Country: currentCountry,
                current_State: currentState,
                current_City: currentCity,
                birth_Country: currentBirthCountry,
                birth_State: currentBirthState,
                birth_City: currentBirthCity,
                hobby: currenthobby
            },
            info: {
                first: '首页',
                last: '尾页',
                next: '下一页',
                prev: '上一页',
                first_on: true,
                last_on: true,
                next_on: true,
                prev_on: true,
                msg_on: true, //如果为true显示第几页以及总页数，否则不显示
                tipmsg: '第{tip}页'
            }
        }
    });


}


//分页数据绑定
function databind(data) {
    $('#fList').empty();
    if (data.result && data.rows) {
        var box = $('#fList');
        $.each(data.rows, function (i, v) {

            var html = "<li><dl><dt><a href='../personal/personal_info.html?uid=" + v.id + "'><img src=\"" + v.logo_path + "\" alt='' /></a></dt><dd><a href='../personal/personal_info.html?uid=" + v.id + "'>" + v.name + "</a></dd></dl>" +
                    " <div class='se_center'> <span><font color='#999999'>现&nbsp;居&nbsp;地：</font> "+v.current_place+"</span> " +
                    "  <span><font color='#999999'>家&nbsp;&nbsp;&nbsp;&nbsp;乡：</font> "+v.home+"</span> " +
                     "  <span><font color='#999999'>星&nbsp;&nbsp;&nbsp;&nbsp;座：</font> "+v.displaycontellation+"</span> " +
                     "  <span><font color='#999999'>毕业学校：</font> "+v.school+"</span> " +
                      "  <span><font color='#999999'>工作单位：</font> "+v.work_place+"</span> " +
                      "</div> <div class='flBtnDiv'>";
                     if(v.inboxid==""){ 
                      html+= "<a href=\"javascript:addFriend('" + v.id + "')\" class='add'  id='friend" + v.id + "'>加为好友</a>"
                      }else{
                        html += "已发好友申请"
                      }
                           html += "</div> </li>";
            box.append(html);
        });
    }
    liMousemoveSearch();

}

function addFriend(id) {
    $.ajax({
        url: "../getmessagelist_message.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'sendpersonalinvite',personid:'" + id + "'}",
        error: function (data) {
            alert("error")
        },
        success: function (data) {
            $("#friend" + id).hide().parent().prepend(wanerdaoLangTip('relationship_00014'));
        }
    });
}

function liMousemoveSearch() {
    $(".list_member li").hover(function () {
        $(this).addClass("active");
    }, function () {
        $(this).removeClass("active");
    })
}
                          
                          
                         
                       