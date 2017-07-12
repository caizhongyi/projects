<%@ Page Title="编辑个人信息-个人-玩儿道" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Personal_Edit.aspx.cs" Inherits="PersonInfo_Personal_Edit" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<meta name="keywords" content="编辑个人资料，基本信息，教育背景，工作背景，兴趣爱好，联系方式，个人，玩儿道，生活社交网络" />
<meta name="description" content="编辑个人资料的基本信息部分，教育背景，工作背景，兴趣爱好，联系方式" />
<title>编辑个人信息-个人-玩儿道</title>
    <meta http-equiv="content-type" content="text/html;charset=utf-8"/>
<link href="../style/nav_info.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery/imgareaselect-default.css" rel="stylesheet" type="text/css" />
    <link href="../style/plugin/fgautocompelte.css" rel="stylesheet" type="text/css" />
    <link href="../style/pop.css" rel="stylesheet" type="text/css" /> 
    <link rel="stylesheet" href="../css/layout.css" type="text/css" />
    <link rel="stylesheet" href="../css/PluginCss/pop.css" type="text/css" />
    <link href="../style/plugin/avatarUpload.css" rel="stylesheet" type="text/css" />

    <script type="text/javascript">
        var photobasepath = '<%=WanerDao2.WanerDaoModule.Config.WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "WanerdaoHeadPortrait") %>';
</script>
<%if (isCurUser)
  { %>
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

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    	<div class="mCon clearfix p0 editbg pb50">
        	<div class="datum_le">
				<div class="subChaTab pt20">
                     <a href="javascript:;" class="active" id="tab_zl">资料</a>
					 <a href="javascript:;" id="tab_rz">日志</a>
					 <a href="javascript:;" id="tab_xc">相册</a>
					 <a href="javascript:;" id="tab_sp">视频</a>
                </div>
                <div class="mainlist clearfix pt12" >
                    	<div class="datum_hobby_le">
                        	<ul>
                            	<li class="current01" id="show_basic"><a href="javascript:;">基本信息</a></li>
                                <li id="show_edubg"><a href="javascript:;">教育背景</a></li>
                                <li id="show_workbg"><a href="javascript:;">工作背景</a></li>
                                <li id="show_interest"><a href="javascript:;">兴趣爱好</a></li>
                                <li id="show_contacts"><a href="javascript:;">联系方式</a></li>
                            </ul>
 						</div>
                        <!--main frame-->
						<div class="datum_hobby">
                        
                        </div>
                        <!--main frame end-->
                    </div>
			</div>	
            <div class="datum_ri">
            	
                	<div class="user_card">
                    	<h1><select id="is_available"><option value="1">显示</option><option value="0">不显示</option></select></h1>
                        <div class="user_card_img"></div>
                    </div>
                	<div class="user_bar">
                    	<ul>
                        	<li class="blue_tj"><label>资料完整度：</label><span id="integrity"></span></li>
                            <li><label>活跃度：</label><span id="activity"></span></li>
                            <li><label>关注度：</label><span id="follow"></span></li>
                            <li><label>爱心度：</label><span id="share"></span></li>
                            <li><label>经验度：</label><span id="experience"></span></li>
                        </ul>
                    </div>
                    <div class="user_flei">
                    	<ul>
                        	 <li><label>星&nbsp;&nbsp;座：</label><select id="is_display_contellation"><option value="1"></option><option value="0">不显示</option></select></li>
                             <li><label>家&nbsp;&nbsp;乡：</label><select id="is_display_home" style="width:100px"><option value="1"></option><option value="0">不显示</option></select></li>
                             <li><label>所在地：</label><select id="is_display_current_place" style="width:100px"><option value="1"></option><option value="0">不显示</option></select></li>
                             <li><label>学&nbsp;&nbsp;校：</label><select id="is_display_school"><option value="1"></option><option value="0">不显示</option></select></li>
                             <li><label>工&nbsp;&nbsp;作：</label><select id="is_display_work"><option value="1"></option><option value="0">不显示</option></select></li>
                        </ul>
                    </div>
                </div>
        </div>
</asp:Content>
<asp:Content ContentPlaceHolderID="Script" runat="server">
    <script src="../Scripts/common/wanerdaojson.js" type="text/javascript"></script>
    <script src="../Scripts/person/common.js" type="text/javascript"></script>
    
    <script src="../Scripts/OpenProjectPlugin/jquery.imgareaselect.pack.js" type="text/javascript"></script>
        <script src="../Scripts/Plugin/Area/wanerdao2.area.js" type="text/javascript"></script>
    <script src="../Scripts/OpenProjectPlugin/jquery.tools.min.js" type="text/javascript"></script>
    <%--<script src="../Scripts/OpenProjectPlugin/jquery.overlay.js" type="text/javascript"></script>--%>
    <script src="../Scripts/Plugin/Search/wanerdao2.compop.js" type="text/javascript"></script>
    <script src="../Scripts/message/fgautocompelte.js" type="text/javascript"></script>
    <script src="../Scripts/Plugin/CustomPermission/wanerdao2.custompermission.js" type="text/javascript"></script>
    <script src="../Scripts/Plugin/autocomplete/wanerdao.complete.simple.js" type="text/javascript"></script>
    <script src="../Scripts/Plugin/person/wanerdao.personAvatarUpload.js" type="text/javascript"></script>

    <script src="../Scripts/person/persnal_edit.js" type="text/javascript"></script>
    
</asp:Content>