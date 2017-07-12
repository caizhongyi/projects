<%@ Page Title="修改，发布个人日记-个人-玩儿道" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Personal_Blog_Compose.aspx.cs" Inherits="Personal_Personal_Blog_Compose" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<meta name="keywords" content="修改，发布个人日记，个人，玩儿道，生活社交网络" />
<meta name="description" content="修改，发布个人日记" />
<title>修改，发布个人日记-个人-玩儿道</title>
<link href="../style/nav_info.css" rel="stylesheet" type="text/css" />
    <link href="../css/PluginCss/Share/Share.css" rel="stylesheet" type="text/css" />
     <style type="text/css">
          #blogname{ }
          .focus{  border: solid 1px #bbb; background-coclor:#fff;}
          #blogdesc{ min-width:100px; }
          
          
          
    </style>
    <script type="text/javascript">

        
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    	<div class="mCon pb50">
				<div class="subChaTab pt20">
                     <a href="javascript:;" id="tab_zl">资料</a>
					 <a href="javascript:;" class="active" id="tab_rz">日志</a>
					 <a href="javascript:;" id="tab_xc">相册</a>
					 <a href="javascript:;" id="tab_sp">视频</a>
                </div>
				<div class="log_tab clearfix mb12">
                     	<ul>
                        	<li><a href="blog.html">查看日志</a></li>
                            <li><a href="javascript:;" class="tagf">发表修改日志</a></li>
                            <li><a href="blog_set.html">页面设置</a></li>
                            <li><a href="blog_manage.html">日志管理</a></li>
                        </ul>
                </div>
                <div class="log_postinfo">
                     	    <ul>
                        	<li class="log_Ptit"><label>标题：</label><input name="" type="text" id="txtTitle" maxlength="60"></li>
                            <li class="log_Pweath">
                            	<input name="" type="checkbox" value="" class="inp01" id="chkShowWeather"  >
                                <label for="chkShowWeather">显示天气：</label>
                                <span id="weather" style="display: none">选择天气</span>
                                <%--<span>多云转晴  21℃-25℃</span> --%>
                                <input name="" type="checkbox" value="" class="inp01" id="chkShowLocaiton" >
                                <label for="chkShowLocaiton">显示发表地：</label>
                                <input name="" type="text" class="inp02"  id="txtLocation" >
                            </li>
                            <li class="log_Pcon">
                            	<label>内容：</label>
                                <textarea name="input" class="inp03" id="txtContent" ></textarea>
                          </li>
                            <li class="log_save">
                            	<input name="saveDraft" type="checkbox" value="" id="saveDraft">
                                <label for="saveDraft">保存一份到草稿箱</label>
                                <span class="stip" style=" display: none;" ><span></span><a href="javascript:void(0);" onclick="$(this).parent().hide();return false;"><img src="../images/list/close.jpg" /></a></span>
                            </li>
                            <li class="log_qx">
                            	<label>权限：</label><select id="selectPermission"></select>
                                <label>分类：</label><select id="selectCat"><option value="">添加新分类</option></select><input type="text" id="txtNewCat" style=" width: 200px;" />
                                <input type="hidden" id="sharetoactivity" />
                                <input type="hidden" id="sharetogroup" />
                                <input type="hidden" id="sharetoinfor" />
                            </li>
                            
                            <li class="sharetools" style=" margin-left:40px;">
                               
                            </li>
                            <li><input name="" type="button" value="预览后发布" class="hobby_but" id="btnPreview"><input name="" type="button" value="取消" class="hobby_but01" id="btnCancel"></li>
                        </ul>
                  </div>

                <div class="log_show clearfix" style=" display:none;">
                    
                </div>
                <hr class="h40" />
        </div>

</asp:Content>

<asp:Content ContentPlaceHolderID="Script" runat="server">
    <script src="../Scripts/Plugin/Share/wanerdao2.sharetools.js" type="text/javascript"></script>
    <script src="../Scripts/Plugin/Weather/wanerdao2.weather.js" type="text/javascript"></script>
    <script src="../Scripts/common/permission.js" type="text/javascript"></script>
    <script src="../Scripts/person/common.js" type="text/javascript"></script>
    <script src="../Scripts/person/blog_compose.js" type="text/javascript"></script>
</asp:Content>
