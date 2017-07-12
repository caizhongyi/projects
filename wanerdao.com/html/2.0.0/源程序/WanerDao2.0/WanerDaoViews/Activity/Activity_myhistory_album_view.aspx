<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Activity_myhistory_album_view.aspx.cs" Inherits="Activity_Activity_myhistory_album_view" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<link href="../style/home.css" rel="stylesheet" type="text/css" />
<link href="../style/activity_main.css" rel="stylesheet" type="text/css" />
<link href="../style/party.css" rel="stylesheet"  />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
<div class="main jz">
    <div class="mCon">
	<div class="main main_share">
		<div class="h10"></div>
		<div class="h10"></div>
        <div class="subChaTab">
        <a href="#">活动信息</a>
        <a href="#" class="active">我的活动</a>
      </div>

		<div class="Fnavigation FnwhiteBg">
          <ul class="fix4w">
            <li><a href="#">活动信息及评论</a></li>
            <li><a  class="cur">浏览相册</a></li>
            <li><a href="Activity_myhistory_album_upload.aspx?activity_id=1111">上传照片</a></li>
            <li><a href="Activity_myhistory_photo_edit.aspx?activity_id=1111">管理相册</a></li>
            <li><a href="#">浏览发表管理感想</a></li>
          </ul>
        </div>
		<table border="0" cellspacing="0" cellpadding="0" class="evaluate" width="100%">
		  <tr>
			<td width="80" class="evaluate_title">评价该活动</td>
			<td width="20" align="center"><input type="radio" name="like" id="like"/></td>
			<td width="40"><label for="like">喜欢</label></td>
			<td width="20" align="center"><input type="radio" name="like" id="dontlike"/></td>
			<td width="45"><label for="dontlike">不喜欢</label></td>
			<td width="20" align="center"><input type="radio" name="like" id="justsoso"/></td>
			<td width="45"><label for="justsoso">一般般</label></td>
			<td><a href="" class="lblue">查看结果</a></td>
		  </tr>
		</table>
		<div class="h10"></div>
		<div class="pic_list_tit">
			<div class="pic_list_title">
			<span class="f14 yh fb">相册列表 <a href="" class="fb lblue" id="albumTotal">(56)</a></span>&nbsp;&nbsp;
				<i class="pic_list_title1">自己创建相册</i>
				<i class="pic_list_title2">活动自建相册</i>
				<i class="pic_list_title3">他人共享相册</i>
			</div>
			<p class="pageLink right" id="pageid"></p>
			<div class="clear"></div>
		</div>
		<div id="list">
		 <ul  id="AlbumUl"></ul>
		</div>
		<div class="handle">
			<div class="chose_a">
				<a href="javascript:void(0)" id="chose_all">全选</a>
				<a href="javascript:void(0)" id="chose_other">反选</a>
				<a href="javascript:void(0)" id="chose_p" onclick="shield()">屏蔽</a>
			</div>
			<p class="pageLink right">
            	<i><a href="#">显示更多</a></i>
                <i>首页</i>
                <i>上页</i> 
                <i>01<font class="sum">/23</font></i> 
                <i><a href="#">下页</a></i> 
                <i><a href="#">未页</a></i> 
            </p>
		</div>
		<div class="h10"></div>
	</div>
    </div>
    </div>
    <div class="mBtm jz"></div>  
    <script src="../Scripts/Plugin/Pagination/wanerdao2.pagination.js" type="text/javascript"></script>
    <script src="../Scripts/activity/activity_myhistory_album_view.js" type="text/javascript"></script>
    <script type="text/javascript">

        function shield() {
            var allCheckId = "";
            $("#list input").each(function (i) {
                if ($(this).attr('checked')) {
                    var douTitle = ",";
                    if (i == 0) douTitle = "";
                    allCheckId += (douTitle +$(this).attr('id'));
                }
            }); alert(allCheckId.replace(/\s/g, ""));
            if (allCheckId.replace(/\s/g, "") != "") {
                $.ajax({
                    url: "album_common.axd",
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    data: "{opertype:'shieldalbum',id:'" + allCheckId + "'}",
                    error: function (data) { },
                    success: function (data) {
                    }
                });
            }
        }
    </script>
</asp:Content>

