<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true"
    CodeFile="test.aspx.cs" Inherits="Test_test" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
<script type="text/javascript" src="../scripts/jquery-1.7.2.min.js"></script>
    <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false&amp;language=en"></script>
    <script type="text/javascript" src="../scripts/openplugin/gmap3.min.js"></script>
    <script type="text/javascript" src="../scripts/plugin/map/wanerdao2.mapview2.js"></script>
    <script type="text/javascript">
        //        $.ajax({
        //            url: "/shielddynamicstate_home.axd",
        //            type: "POST",
        //            dataType: "json",
        //            cache: false,
        //            data: "{opertype:'shielddynamicstate',source_type_id:'new',target_user_id:'78d75bdca4d44ee0a70b63347000ea6e'}",
        //            error: function () {
        //            },
        //            success: function (data) {
        //                alert(data.msg);
        //                //callBack(data);
        //            }
        //        });
        //        $.ajax({
        //            url: "/cancelpersonalfriendsfollow_follow.axd",
        //            type: "POST",
        //            dataType: "json",
        //            cache: false,
        //            data: "{opertype:'cancelpersonalfriendsfollow',friendId:'0cd9faafe7a344a7bfcde6115c80ca11'}",
        //            error: function () {
        //            },
        //            success: function (data) {
        //                alert(data.msg);
        //                //callBack(data);
        //            }
        //        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" runat="Server">
    <div id="mainMap">
    </div>
    <div id="directionsPanel">
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" runat="Server">
    <script type="text/javascript">
        $("#mainMap").wanerdaomap({ name: "徐蓓1", origin: "Colorado 80903 601 South Weber Street Colorado Springs", dest: " Colorado 80903 601 South Weber Street Colorado Springs" });
    </script>
</asp:Content>
