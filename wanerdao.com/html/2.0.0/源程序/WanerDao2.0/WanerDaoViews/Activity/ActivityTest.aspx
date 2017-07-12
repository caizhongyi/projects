<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ActivityTest.aspx.cs" Inherits="Activity_ActivityTest" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>分页插件Demo</title>
    <link rel="stylesheet" type="text/css" href="../css/PluginCss/Pagination/Pagination.css" />
    <script src="../Scripts/jquery-1.4.2.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../Scripts/common/wanerdaoutils.js"></script>
    <script type="text/javascript" src="../../Scripts/multipleLanguage/loader.js"></script>
    <script src="../Scripts/Plugin/Pagination/wanerdao2.pager.js" type="text/javascript"></script>
    <script src="../Scripts/OpenProjectPlugin/jquery.json-2.3.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {


            $(".pageid").myPagination({
                showmore: true, //是否显示加载更多
                showpagingnav: true, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
                contentid: 'content', //此处ID可以用来显示“加载更多”这个功能
                callback: test,
                ajax: {
                    url: 'pop_common.axd',
                                        param: {
                                            opertype: 'getactivityplacesearch',
                                            placename: "",
                                            placecategoryid: "e5a55eec-203d-11e1-8a87-000c29a5c50c",
                                            pagecurrent: "1",
                                            pageSize: "3"
                                        }
//                    param: {
//                        pagecurrent: "1",
//                        pageSize: "3",

//                        //                        opertype: 'getactivitymemberpaging',
//                        //                        activityid: "d7d4204bebd94f01a95428d86fb285fa"

//                        opertype: 'getactivitybygroupidandactivityname',
//                        group_id: "111",
//                        activity_name: "1"

                    //}
                }
            });
            //更改样式
            function test(data) {
                alert($.toJSON(data));
                $('#content').html("");
                var pagecontent = $('<ul></ul>').appendTo("#content");
                $.each(data.rows, function (i, msg) {
                    //alert(msg.unit_name);
                    $('<li>' + msg.folder_name + '</li>').appendTo(pagecontent);
                });
            }
        })

        function getinfotest() {

            $.ajax({
                url: "pagination_common.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "getactivityimagebyid",
                    id: '1111'
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: searchFuc
            });
        }
        function searchFuc(data) {
            alert(data.result);
        }

        function Test() {
            $.ajax({
                url: "pagination_activity.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "getactivityemailduration"
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }

        function searchactivitybymanycondition() {
            $.ajax({
                url: "pop_common.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    pagecurrent: 1, //当前页  可以缺省默认1
                    pageSize: '10', //页码数 可以缺省默认10
                    opertype: "searchactivitybymanycondition", //业务处理类别                    
                    activityNames: "", //活动名字串，用“:”分隔 可以缺省默认为空
                    catygoryNames: "", //分类名字串，用“:”分隔 可以缺省默认为空
                    friendsName: "", //朋友名字串，用“:”分隔 可以缺省默认为空
                    groupNames: "", //圈子名字串，用“:”分隔 可以缺省默认为空
                    sightNames: "", //景点名字串，用“:”分隔 可以缺省默认为空
                    //注意，为什么要用“:” 分隔，是因为后台获取参数时的正则表达式只支持“:”分隔。
                    countryId: "", //国家 可以缺省默认为空
                    provinceId: "", //省份 可以缺省默认为空
                    cityId: ""//城市 可以缺省默认为空
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }

        function activityindexpage() {
            $.ajax({
                url: "pagination_activity.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "activityindexpage",
                    id: '4d90926a815f4de78c5b63332db9706c'
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }

        function ActivityCreateTest() {
            $.ajax({
                url: "pagination_activity.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "activitycreatepagetest",
                    id: '1111'
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                }
            });
        }
        function getkeyvalueactivityparambyuserid() {
            $.ajax({
                url: "pagination_activity.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "getkeyvalueactivityparambyuserid"
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }
        function GetActivityParamByAcitivtyID() {
            $.ajax({
                url: "pagination_activity.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "getactivityparambyactivityid",
                    id: 'e7404bc3769346398cbc433fc93a3483'
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }
        function GetActivityParamByArchivesID() {
            $.ajax({
                url: "pagination_activity.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "getactivityparambypersonactivityarchivesid",
                    id: '6c81f57dca464c158b0dc3cd618be9f2'
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }

        function GetActivitySignTest() {
            $.ajax({
                url: "pagination_activity.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "activitysignuptest"
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }

        function getkeyvalueactivityintervalduration() {
            $.ajax({
                url: "pagination_activity.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "getkeyvalueactivityintervalduration"
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }

        function getfriendpagiation() {
            $.ajax({
                url: "pagination_common.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "getfriendpagiation"
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }

        function getpersongactivitysettingsjosnforjson() {
            $.ajax({
                url: "pagination_activity.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "getpersongactivitysettingsjosnforjson",
                    activityid: "1adf56b0d30d48b99f34657dfd2c0dd1",
                    userid: "1111"
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }

        function currentuserjoinactivitypage() {
            $.ajax({
                url: "pagination_common.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "currentuserjoinactivitypage"
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }

        function getjsonactivityplacecategorychild() {
            $.ajax({
                url: "pagination_activity.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "getjsonactivityplacecategorychild",
                    id: "e5a55eec-203d-11e1-8a87-000c29a5c50c"
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }

        function getactivitycategorysettingsinfo() {
            $.ajax({
                url: "pagination_activity.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "getactivitycategorysettingsinfo",
                    id: "-1"
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }

        function selectactivityplacecategoryupperlayer() {
            $.ajax({
                url: "pagination_activity.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "selectactivityplacecategoryupperlayer",
                    id: "e5a55eec-203d-11e1-8a87-000c29a5c50c"
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }
        function getactivityplacebycategoryid() {
            $.ajax({
                url: "pagination_activity.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "getactivityplacebycategoryid",
                    categoryid: "e5a55eec-203d-11e1-8a87-000c29a5c50c"
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }
        function getuseraddressinfo() {
            $.ajax({
                url: "pagination_activity.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "getuseraddressinfo"
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }
        function setuseraddressinfo() {
            $.ajax({
                url: "pagination_activity.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "setuseraddressinfo",
                    address: "aaaaaaaaa",
                    country_id: "",
                    state_id: "",
                    city_id: "",
                    zip: ""
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }
        function selectactivitycountbydate() {
            $.ajax({
                url: "pagination_activity.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "selectactivitycountbydate",
                    begindate: "2012-03-07",
                    length: "12"
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }
        function getgroupcarpoolmoney() {
            $.ajax({
                url: "pagination_activity.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "getgroupcarpoolmoney",
                    activityid: ""
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }

        function getcarowerlist() {
            $.ajax({
                url: "pop_common.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "getcarowerlist",
                    pagecurrent: "1",
                    pageSize: "3",

                    activityid: "da19df6383864028933c7d0506d05d9c",
                    carpool_money: "12",
                    carpool_type_id: "da19df6383864028933c7d0506d05dd"
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }

        function getactivitycreatetype() {
            $.ajax({
                url: "pagination_activity.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "getjsonactivityplacecategorychild"
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }
        function getactivitymemberrole() {
            $.ajax({
                url: "pagination_activity.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "getactivitymemberrole",
                    activityid: "b5812b975fac4ef697b50df3d52fc7a0",
                    userid: "11111"
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }
        function activitycategorypage() {
            $.ajax({
                url: "pop_common.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "activitycategorypage",
                    pagecurrent: "1",
                    pageSize: "5"
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }
        function getregionandinterestactivity() {
            $.ajax({
                url: "pop_common.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "getregionandinterestactivity",
                    count: "5"
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }

        function getnewestandnearestactivity() {
            $.ajax({
                url: "pagination_activity.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "getnewestandnearestactivity",
                    count:"4"
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }
        function getactivitybygroupidandactivitynameishistory() {
            $.ajax({
                url: "pop_common.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: 'getactivitybygroupidandactivitynameishistory',
                    group_id:'11111',
                    activity_name: "活动",
                    ishistory:"0",

                    pagecurrent: "1",
                    pageSize: "5"
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }
        function getactivitybycurrentuserfollow() {
            $.ajax({
                url: "pop_common.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: 'getactivitybycurrentuserfollow',
                    pagecurrent: "1",
                    pageSize: "5"
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }
        function getactivitybyuserinterest() {
            $.ajax({
                url: "pop_common.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: 'getactivitybyuserinterest',
                    pagecurrent: "1",
                    pageSize: "5"
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }
        function getactivitybycityid() {
            $.ajax({
                url: "pop_common.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: 'getactivitybycityid',
                    city_id: '00007afa-f4b4-11e0-b192-00306701b527',
                    pagecurrent: "1",
                    pageSize: "5"
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }

        function getactivityplacesearch() {
            $.ajax({
                url: "pop_common.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: 'getactivityplacesearch',
                                            placename: "",
                                            placecategoryid: "e5a55eec-203d-11e1-8a87-000c29a5c50c",
                                            pagecurrent: "1",
                                            pageSize: "3"
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }

        function getrecommendedactivity() {
            $.ajax({
                url: "pop_common.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: 'getrecommendedactivity',
                    newestAndNearestCount: "4",
                    regionAndInterestCount: "3"
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }
        function activitydefinetotalpagecount() {
            $.ajax({
                url: "pagination_activity.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "activitydefinetotalpagecount",
                    sectionid: "26016760-1431-11e1-ae3c-000c295f9365"
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }
        function activitydefinepagesearchactivity() {
            $.ajax({
                url: "pop_common.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: 'activitydefinepagesearchactivity',
                    pagecurrent: "1",
                    pageSize: "3"
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }

        function activityseasonpagesearchactivity() {
            $.ajax({
                url: "pop_common.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: 'activityseasonpagesearchactivity',
                    pagecurrent: "1",
                    pageSize: "3"
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }
        function activityitempagesearchactivity() {
            $.ajax({
                url: "pop_common.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: 'activityitempagesearchactivity',
                    categoryid: '26016760-1431-11e1-ae3c-000c295f9365',
                    pagecurrent: "1",
                    pageSize: "3"
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }

        function getkevaluecreateactivitybygroup() {
            $.ajax({
                url: "pagination_activity.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "getkevaluecreateactivitybygroup"
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }

        function getactivitymemberpaging() {
            $.ajax({
                url: "pop_common.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: 'getactivitymemberpaging',
                    activityid: "d7d4204bebd94f01a95428d86fb285fa",
                    pagecurrent: "1",
                    pageSize: "3"
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }

        function getactivityalbumbyactivityid() {
            $.ajax({
                url: "pop_common.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: 'getactivityalbumbyactivityid',
                    activity_id: "d7d4204bebd94f01a95428d86fb285fa"
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }
        function followactivitymodule() {
            $.ajax({
                url: "activitycategory_follow.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: 'followactivitymodule',
                    sectionId: "76d21efc-c429-11e1-a032-000c29821f281"
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }

        
        var mapParams = {
            "placeset":
                         {
                             "latLng": "28.228209,112.938814"
                         },
                         "fromHomeDistance": 10000.0, "category": "", "allFriendAttend": false, "allGroupAttend": false,
            "friendAttend": null, "groupAttend": null, "filterBeenPlace": true
        }
        function searchactivitymap() {
            var param = $.toJSON(mapParams);
            $.ajax({
                url: "pagination_activity.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "searchactivitymap",
                    value:$.toJSON(mapParams)
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }
        function insertimagepythicallocation() {
            $.ajax({
                url: "pop_common.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "insertimagepythicallocation"
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }
        function insertactivityimagefolder() {
            $.ajax({
                url: "pop_common.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "insertactivityimagefolder"
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }
        function insertactivityimage() {
            $.ajax({
                url: "pop_common.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "insertactivityimage"
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }
        function shareactivityfolder() {
            $.ajax({
                url: "pop_common.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "shareactivityfolder"
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                }
            });
        }
    </script>
</head>
<body>
    <div id="content">
    </div>
    <div id="pageid">
    </div>
    <div>
        <input type="button" onclick="getinfotest();" value="search" /></div>
    <br />
    <div>
        <input type="button" onclick="Test();" value="test" /></div>
    <br />
    <div>
        <input type="button" onclick="activityindexpage();" value="activityindexpage" /></div>
    <div>
        <input type="button" onclick="ActivityCreateTest();" value="activityCreateTest" /></div>
    <br />
<div>
        <input type="button" onclick="searchactivitybymanycondition();" value="活动多条件查询" /></div>
    <br />
    <div>
        <input type="button" onclick="getkeyvalueactivityparambyuserid();" value="获取用户活动参数键值对" /></div>
    <br />
    <div>
        <input type="button" onclick="GetActivityParamByAcitivtyID();" value="根据活动ID获取活动创建参数" /></div>
    <br />
    <div>
        <input type="button" onclick="GetActivityParamByArchivesID();" value="根据活动参数ID获取活动创建参数" /></div>
    <br />
    <div>
        <input type="button" onclick="GetActivitySignTest();" value="活动报名TEST" /></div>
    <br />
    <div>
        <input type="button" onclick="getkeyvalueactivityintervalduration();" value="获取活动间隔周期" /></div>
    <br />
    <div>
        <input type="button" onclick="getfriendpagiation();" value="获取好友分页" /></div>
    <div>
        <input type="button" onclick="getpersongactivitysettingsjosnforjson();" value="获取活动设置" /></div>
    <div>
        <input type="button" onclick="currentuserjoinactivitypage();" value="用户当前活动" /></div>
    <div>
        <input type="button" onclick="getjsonactivityplacecategorychild();" value="活动地址分类" /></div>
    <div>
        <input type="button" onclick="selectactivityplacecategoryupperlayer();" value="父级活动地址分类" /></div>
    <div>
        <input type="button" onclick="getactivityplacebycategoryid();" value="根据活动地址分类查询地址" /></div>
    <br />
    <div>
        <input type="button" onclick="getactivitycategorysettingsinfo();" value="活动分类" /></div>
    <div>
        <input type="button" onclick="getuseraddressinfo();" value="获取个人住址" /></div>
    <div>
        <input type="button" onclick="setuseraddressinfo();" value="修改个人住址" /></div>
    <div>
        <input type="button" onclick="selectactivitycountbydate();" value="每日活动数目" /></div>
    <div>
        <input type="button" onclick="getgroupcarpoolmoney();" value="自主叫价收费列表" /></div>
    <div>
        <input type="button" onclick="getcarowerlist();" value="可搭车成员" /></div>
    <div>
        <input type="button" onclick="getactivitycreatetype();" value="活动创建方式" /></div>
    
<div>
        <input type="button" onclick="getactivitymemberrole();" value="获取活动权限" /></div>
    <div>
        <input type="button" onclick="getregionandinterestactivity();" value="感兴趣活动 徐MM接口" /></div>
<div>
        <input type="button" onclick="getnewestandnearestactivity();" value="返回指定数量最新、距离最近的活动 徐MM接口" /></div>
<div>
        <input type="button" onclick="getactivitybygroupidandactivitynameishistory();" value="获取是否历史活动 胥鑫接口" /></div>
<div>
        <input type="button" onclick="getactivitybycurrentuserfollow();" value="获取当前登陆用户的关注活动 徐MM的接口" /></div>
<div>
        <input type="button" onclick="getactivitybyuserinterest();" value="获取可能感兴趣活动 徐MM的接口" /></div>
<div>
        <input type="button" onclick="getactivitybycityid();" value="根据用户CITYID查询活动信息 徐MM的接口" /></div>
<div>
        <input type="button" onclick="getactivityplacesearch();" value="查询活动地址分页" /></div>
<div>
        <input type="button" onclick="getrecommendedactivity();" value="最新、距离最近的活动，根据地域及兴趣爱好的活动 徐MM的接口" /></div>
<div>
        <input type="button" onclick="activitydefinetotalpagecount();" value="活动时令、一般、自定义汇总" /></div>
<div>
        <input type="button" onclick="activitycategorypage();" value="活动分类查询（activity_main）" /></div>
<div>
        <input type="button" onclick="activitydefinepagesearchactivity();" value="活动自定义首页查询" /></div>
<div>
        <input type="button" onclick="activityseasonpagesearchactivity();" value="活动时令首页查询" /></div>
<div>
        <input type="button" onclick="activityitempagesearchactivity();" value="活动一般类型首页查询" /></div>

<div>
        <input type="button" onclick="getkevaluecreateactivitybygroup();" value="用户参加的圈子" /></div>

        <div>
                <input type="button" onclick="getactivitymemberpaging();" value="活动成员" /></div>
<div>
                <input type="button" onclick="getactivityalbumbyactivityid();" value="用户参加的活动键值" /></div>
<div>
                <input type="button" onclick="followactivitymodule();" value="类型关注" /></div>
                <br />
<div>
                <input type="button" onclick="searchactivitymap();" value="活动地图查找" /></div>
  <div>
                <input type="button" onclick="insertimagepythicallocation();" value="插入物理相片" />
                <input type="button" onclick="insertactivityimagefolder();" value="插入相册" />
                <input type="button" onclick="insertactivityimage();" value="插入相片" />
                <input type="button" onclick="shareactivityfolder();" value="分享相片" />
                </div>              

</body>
</html>
