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

    $("#currentbtn").click(function () {
        wanerdaoArea({
            alphopts: { title: '地区选择框', id: 'tt', elementid: 'currentbtn', callback: showcurrentdata }
        });
    });

    $("#birthbtn").click(function () {
        wanerdaoArea({
            alphopts: { title: '地区选择框', id: 'tt', elementid: 'birthbtn', callback: showbirthdata }
        });
    });


    window.setTimeout(btnoverlay, 2000);
   

}

function btnoverlay() {
    $("#currentbtn").overlay();
    $("#birthbtn").overlay();
}


function showcurrentdata(data) {
    currentCountry = data.country.id;
    currentState = data.state.id;
    currentCity = data.city.id;
}

function showbirthdata(data) {

    currentBirthCountry = data.country.id;
    currentBirthState = data.state.id;
    currentBirthCity = data.city.id;
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
     $(":radio").attr("checked", '');
     $("#lsbAge").attr("value", '');
     $("#ConstellationList").attr("value", '');
     $("#txthobby").val("请输入兴趣爱好")
}

function searchFriends() {
    var name = $("#txtname").val();
    if (name != "请输入关键字") {
        currentName = name;
    }
    if ($("#male").is(":checked")) {
        currentSex = "1"
    }else if($("#female").is(":checked")){
        currentSex = "0"
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
    $("#pager1").myPagination({


           showmore: true, //是否显示加载更多
                showpagingnav: true, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
                contentid: '#content', //此处ID或者样式类名或者用来加载提示信息或者可以用来显示“加载更多”这个功能
                callback: databind,
                ajax: {
                    url: '../wandao_common.axd',//此处必须填写，分页已没有固定处理工厂
                    param: {
                        pagecurrent: currPage,
                pageSize: 10,
                opertype: 'searchfriends',
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
            $("#friend" + id).hide().parent().prepend("已发好友申请");
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
                          
                          
                         
                       