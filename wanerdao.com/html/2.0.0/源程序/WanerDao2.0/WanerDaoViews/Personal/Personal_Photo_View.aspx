<%@ Page Title="浏览个人相片-个人-玩儿道" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Personal_Photo_View.aspx.cs" Inherits="Personal_Personal_Photo_View" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<meta name="keywords" content="相片浏览，个人，玩儿道，生活社交网络" />
<meta name="description" content="单张浏览相册内的所有相片，并且可以进行评论" />
<title>浏览个人相片-个人-玩儿道</title>
    <link href="../style/pers_rel.css" rel="stylesheet" type="text/css" />
    <link href="../css/PluginCss/Pagination/Pagination.css" rel="stylesheet" type="text/css" />
    <style type="text/css">
        .hover{ background-color: #000; opacity:0.5; filter:alpha(opacity=50);}
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
<div class="mCon" style="padding:0;">
    <div class="prPdBox">
        <div class="subChaTab">
                     <a href="javascript:;" id="tab_zl">资料</a>
					 <a href="javascript:;" id="tab_rz">日志</a>
					 <a href="javascript:;" id="tab_xc" class="active">相册</a>
					 <a href="javascript:;" id="tab_sp">视频</a>
        </div>
        <div class="clearfix">
        
    <%if (isCurUser)
      { %>
      <div class="Fnavigation FnwhiteBg">
                  <ul class="fix4w">
                    <li><a href="photo_album.html" class="cur">浏览相册</a></li>
                    <li><a href="photo_upload.html">上传照片</a></li>
                    <li><a href="photo_album_manage.html">管理相册</a></li>
                  </ul>
                </div>
    <script type="text/javascript">
        var self = true;
    </script>
    <%}
else
{ %>
<script type="text/javascript">
    var self = false;
</script>
<%} %>
                
        <div class="pa_tit clearfix">
			<div class="alb_set alb_setExt"><b class="ico_myalb"></b>我的相册<strong><i class="album_count"></i></strong></div>
			<div class="alb_sort"><b class="acti_bgc"></b><span>自己创建相册</span><b class="pers_bgc"></b><span>活动自建相册</span></div>
		</div>
        <div class="blank10px"></div>
		<div class="alb_edit_wp clearfix">
			<div class="alb_lt">
				<div class="scroll_pic_wp">
					<div class="arr_top"></div>
					<div class="scrTop_pic">
						<ul class="alb_list scrTop clearfix albums" style="top:0;">
						</ul>
					</div>
					<div class="arr_bm"></div>
				</div>
			</div>
			<div class="alb_rt">
				<div class="alb_tag other_sty clearfix">
					<div class="tag_lt">
						<div class="alb_set album_name"></div>
						<b class="doc"></b><b class="pri"></b>
					</div>
				</div>
				<div class="ph_sPic_wp">
					<div class="scr_lt"></div>
					<div class="ph_sPic">
						<ul  >
						</ul>
					</div>
					<div class="scr_rt"></div>
				</div>
				<div class="big_pic_wp">
					<div id="big_pic">
                        <div id="photo">
						<img alt="" style=" width:  710px; height: 502px;" />
                        </div>
						<div class="scr_lt">&nbsp;</div>
						<div class="scr_rt">&nbsp;</div>
					</div>
					<div class="photo_detail">
						<div class="hd"><span class="photo_name"></span><em></em><b class="doc"></b><b class="store"></b><b class="printf"></b></div>
						<div class="bd"></div>
					</div>
				</div>
			<!--评论-->
            <div class="comments_wp">
							<p class="com_num"><b></b>评论(123)</p>
							<div class="comments">
								<div class="form_box">
									<form action="">
									<input type="text" class="txt" /><input type="button" class="reply" /><input type="button" class="cancle" />
									</form>
								</div>
								
              <div id="messageContent"> </div>
         <%-- <div id="huifuid" class="huif_more">
                <div class="huif_colse_an"><a href="javascript:void(0);" onclick="hideDetReply(this);">收起</a></div>
                <div class="huif_open_an"><a href="javascript:void(0);">更多回复</a></div>
              </div>--%><%--
								<div class="reply_content">
									<div class="pic"><img src="images/img_43x43.png" width="37" height="37" alt="" /></div>
									<div class="rt_box">
										<div class="info">某天起，好像跟你没那么好了，见面少了，电话也少了；孤单的时候，忍住没找你。我亲爱的朋友，并不是
									你做了什么，而是我的故事变复杂了，有些话不知道从何说起，不如不说；</div>
										<div class="meta"><a href="javascript:void(0);" class="reply">回复</a><a href="javascript:void(0);" class="delete">删除</a>30分钟前</div>
									</div>
								</div>--%>
								<p class="other_action"><a href="javascript:void(0);" class="more_reply" id="A1">更多回复</a><a href="javascript:void(0);" class="closed" id="A2">收起</a></p>
							</div>
						</div>

            <!--评论 end-->

			</div>
		</div>
        <div class="blank10px"></div>
        </div>
    </div>
</div>
</asp:Content>

<asp:Content ContentPlaceHolderID="Script" runat="server">
    <script src="../Scripts/Plugin/Pagination/wanerdao2.pager.js" type="text/javascript"></script>
    <script src="../Scripts/person/common.js" type="text/javascript"></script>
    <script src="../Scripts/person/photo_common.js" type="text/javascript"></script>
    <script src="../Scripts/person/photo_view.js" type="text/javascript"></script>
    
    <!--[if IE 6]>
    <script type="text/javascript" src="../Scripts/person/pngFix.js"></script>
	<script>DD_belatedPNG.fix('*');</script>
    <![endif]-->
</asp:Content>