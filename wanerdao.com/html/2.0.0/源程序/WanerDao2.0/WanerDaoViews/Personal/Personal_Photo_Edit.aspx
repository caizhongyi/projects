<%@ Page Title="编辑个人相片-个人-玩儿道" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Personal_Photo_Edit.aspx.cs" Inherits="Personal_Photo_Edit" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<meta name="keywords" content="预览相册，个人，玩儿道，生活社交网络" />
<meta name="description" content="修改个人相片顺序等信息" />
<title>编辑个人相片-个人-玩儿道</title>
<link rel="stylesheet" type="text/css" href="../style/pers_rel.css" media="all" />
      <link href="../css/PluginCss/Pagination/Pagination.css" rel="stylesheet" type="text/css" />
    <style type="text/css">
        .tabsNav, #main{ clear:left; width:1010px; margin:0 auto;}
        .tabsNav ul{ list-style:none; margin:0; padding:0;}
        .tabsNav li{ float:left;}
        #left{ float:left; width:300px;}
        #right{ width:700px;}
        .albums { position:relative; overflow: hidden; }
        .albums ul{ list-style:none; margin:0; padding:0; }
        .albums ul li{  width: 140px; height: 140px; margin-top: 10px; clear:both;}
        
        .photoList{}
        #items li{ float:left; padding:10px;}
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
<div class="mCon" style="padding:0;">
            <div class="prPdBox">
              <div class="subChaTab">
                <a href="#">资料</a>
                <a href="#">日记</a>
                <a href="#" class="active">相册</a>
                <a href="#">视频</a>
              </div>
              <div class="clearfix">
                <div class="Fnavigation FnwhiteBg">
                  <ul class="fix4w">
				<li><a href="photo_album.html">浏览相册</a></li>
				<li><a href="photo_upload.html">上传照片</a></li>
				<li><a href="photo_album_manage.html" class="cur">管理相册</a></li>
                  </ul>
                </div>
                <div class="pa_tit clearfix">
					    <div class="alb_set"><b class="ico_set"></b>我的相册<i class="album_count">(loading)</i></div>
                    <div class="alb_lay byMiniature"><!--byList:列表 byMiniature:缩略图-->
                <i class="tab_1"><a href="javascript:;">缩略图</a></i>
                <i class="tab_2"><a href="javascript:;" id="photo_list">列表</a></i>
                    </div>
				</div>
                <div class="blank10px"></div>
				<div class="alb_edit_wp clearfix">
					<div class="alb_lt">
						<div class="scroll_pic_wp">
							<div class="arr_top"></div>
							<div class="scrTop_pic">
								<ul class="alb_list scrTop clearfix albums">
									
								</ul>
							</div>
							<div class="arr_bm"></div>
						</div>
					</div>
					<div class="alb_rt">
						<div class="alb_tag other_sty clearfix">
							<div class="tag_lt">
								<div class="pe_set"><b class="ico_alb_nm"></b><span class="alb_name"></span><i class="">(loading)</i></div>
								<div class="so_txt">
                                 <input type="text" inputdefault="相片编号/相片序号" value="相片编号/相片序号" class="txt txtsrh">
                                    <input type="button" class="btnsrh">
                                </div>
							</div>
						</div>
                        <div class="pList">
						<ul id="items">
                        </ul>
                        </div>
                        <div class="blank10px"></div>
                        <div class="blank10px"></div>
                        <div class="blank10px"></div>
						
					</div>
				</div>
                <div class="blank10px"></div>
              </div>
            </div>
        </div>


<%--
<div class="tabsNav" >
        	<ul>
				<li><a href="photo_album.html">浏览相册</a></li>
				<li><a href="photo_upload.html">上传照片</a></li>
				<li class="cur"><a href="photo_album_manage.html">管理相册</a></li> 
                <li class="cur"><a href="javascript:;" id="photo_th"> 缩略图 </a></li>
                <li class="cur"><a href="javascript:;" id="photo_list"> 列表 </a></li>
            </ul>		
		</div>
    <div  class="tabsNav" style=" width:1010px; margin:0 auto;">
    <div id="left">
    <div class="albums">
    <ul>
    </ul>
    </div>
    </div>
    <div id="right">
    <div class="photoList">
    <ul></ul>
    </div>
    </div>
    </div>--%>
</asp:Content>

<asp:Content ContentPlaceHolderID="Script" runat="server">
    <script src="../Scripts/OpenProjectPlugin/jquery.dragsort.js" type="text/javascript"></script>
    <script src="../Scripts/Plugin/Pagination/wanerdao2.pager.js" type="text/javascript"></script>
    <script src="../Scripts/common/permission.js" type="text/javascript"></script>
    <script src="../Scripts/person/common.js" type="text/javascript"></script>
    <script src="../Scripts/person/photo_common.js" type="text/javascript"></script>
    <script src="../Scripts/person/photo_edit.js" type="text/javascript"></script>
    <!--[if IE 6]>
    <script type="text/javascript" src="../Scripts/person/pngFix.js"></script>
	<script>DD_belatedPNG.fix('*');</script>
    <![endif]-->
    <script type="text/javascript">
        $(".miList li").hover(function () {
            $(this).addClass("on");
        }, function () {
            $(this).removeClass("on");
        })

</script>

</asp:Content>