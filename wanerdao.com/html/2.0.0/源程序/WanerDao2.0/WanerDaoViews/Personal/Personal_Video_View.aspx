<%@ Page Title="观看视频-个人-玩儿道" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Personal_Video_View.aspx.cs" Inherits="Personal_Personal_Video_View" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<meta name="keywords" content="观看视频，个人，玩儿道，生活社交网络" />
<meta name="description" content="单个浏览视频册内的所有视频，并且可以进行评论" />
<title>观看视频-个人-玩儿道</title>
    <link href="../style/pers_rel.css" rel="stylesheet" type="text/css" />
    <link href="../css/PluginCss/Pagination/Pagination.css" rel="stylesheet" type="text/css" />
    
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    	<div class="mCon" style="padding:0;">
            <div class="prPdBox">
              <div class="subChaTab">
                     <a href="javascript:;" id="tab_zl">资料</a>
					 <a href="javascript:;" id="tab_rz">日志</a>
					 <a href="javascript:;" id="tab_xc">相册</a>
					 <a href="javascript:;" id="tab_sp" class="active">视频</a>
              </div>
              <div class="clearfix">
              <%if (isCurUser)
                { %>
                <div class="Fnavigation FnwhiteBg">
                  <ul class="fix4w">
                    <li><a href="video_album.html" class="cur">浏览视频</a></li>
                    <li><a href="video_upload.html">上传视频</a></li>
                    <li><a href="video_album_manage.html">管理视频</a></li>
                  </ul>
                </div>
                <script type="text/javascript">
                    var self = true;
                </script>
                <%}
                else
                { %>
                <script type="text/javascript">
                    var self = true;
                </script>
                <%}%>
                <div class="pa_tit clearfix">
					<div class="alb_set"><b class="icon_video"></b><span class="gray">视频列表</span>(<span class="album_count"></span>)</div>
				</div>
                <div class="blank10px"></div>
				<div class="alb_edit_wp clearfix">
					<div class="alb_lt">
						<div class="scroll_pic_wp">
							<div class="arr_top"></div>
							<div class="scrTop_pic">
								<ul class="alb_list_sVideo scrTop clearfix">
									
								</ul>
							</div>
							<div class="arr_bm"></div>
						</div>
					</div>
					<div class="alb_rt">
						<div class="alb_tag other_sty clearfix">
							<div class="tag_lt">
								<div class="alb_set"><span class="album_name"></span>  <span class="fn gray"><span class="cc"></span>/<span class="tc"></span></span></div>
							</div>
						</div>
						<div class="ph_sPic_wp ph_sVid_wp clearfix">
							<div class="scr_lt"></div>
							<div class="ph_sPic" style=" overflow:hidden; position:relative;">
								<ul style="width:1134px;" class="vlist">
								</ul>
							</div>
							<div class="scr_rt"></div>
						</div>
						<div class="big_pic_wp">
							<div id="big_pic">
								<div class="flashBox"><div style=" margin:0 auto; width:595px; height:490px;"></div></div>
							</div>
							<div class="photo_detail">
							</div>
						</div>
						<div class="comments_wp">
							<p class="com_num"><b></b>评论(<span class="comment_count">loading</span>)</p>
							<div class="comments">
								<div class="form_box">
									<form action="">
									<input type="text" class="txt" /><input type="button" class="reply" /><input type="button" class="cancle" />
									</form>
								</div>
              <div id="messageContent"> 
              
              </div>		
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
                                
				<div class="alb_nav">aaaa</div>		
							</div>
						</div>
					</div>
				</div>
                <div class="blank10px"></div>
              </div>
            </div>
        </div>

    <!--[if IE 6]>
    <script type="text/javascript" src="../Scripts/person/pngFix.js"></script>
	<script>DD_belatedPNG.fix('*');</script>
    <![endif]-->

</asp:Content>

<asp:Content ContentPlaceHolderID="Script" runat="server" >
    <script src="../Scripts/Plugin/Pagination/wanerdao2.pager.js" type="text/javascript"></script>
    <script src="../Scripts/person/effect.js" type="text/javascript"></script>
    <script src="../Scripts/common/wanerdaoutils.js" type="text/javascript"></script>
    <script src="../Scripts/person/common.js" type="text/javascript"></script>
    <script src="../Scripts/person/video_common.js" type="text/javascript"></script>
    <script src="../Scripts/person/video_view.js" type="text/javascript"></script>
</asp:Content>