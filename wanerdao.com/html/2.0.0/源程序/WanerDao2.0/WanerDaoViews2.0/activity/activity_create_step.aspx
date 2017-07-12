<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="activity_create_step.aspx.cs" Inherits="activity_activity_create_step" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>发起活动-活动-玩儿道</title>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<meta name="keywords" content="发起活动，初始参数引用，基本参数设定，报名参数设定，邀请发送，个人报名，参数保存，玩儿道，生活社交网络" />
<meta name="description" content="选择列表式或者导向式完成填写初始参数引用，基本参数设定，报名参数设定，邀请发送，个人报名和参数保存后发起活动" />
<link rel="stylesheet" type="text/css" href="/css/activity_create.css" media="all" />
<link rel="stylesheet" type="text/css" href="/css/pager.css" media="all" />
 <link rel="stylesheet" type="text/css" href="/scripts/jquery.chosen/jquery.chosen.css" media="all" />
 <link rel="stylesheet" type="text/css" href="http://code.jquery.com/ui/1.8.21/themes/ui-lightness/jquery-ui.css"  media="all" />
 <link rel="stylesheet" type="text/css" href="/css/plugin/timepicker/jquery-ui-timepicker-addon.css" media="all" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" Runat="Server">
<div class="activity_create layout">
     <div id="container" class="activity_create w_1004 pBgC">
          <div class="activity_createMainGuide">
               <div class="mainTitile">
                    <div class="mes_com_box_Tab"><a href="javascript:;" class="active">创建活动</a></div>
               </div>
               <div class="modSwitch">
                    <label for="listStyle">
                          <input type="radio" class="radio" name="info_type" id="listStyle"/>
                          列表模式填写</label>
                    <label for="guiteStyle">
                          <input type="radio" class="radio" name="info_type" id="guiteStyle"  checked="checked" />
                          向导模式填写</label>
               </div>
               <h2><b>发起活动</b></h2>
               <div id="listl" class="setbar6 pR">
					<div class="setbar6-l pA"></div>
					<div class="setbar6-r pA"></div>
                    					<ul class="stepnav">
						<li id="listep1" class="item1">
                            <div class="start">
                                <div class="item-img"></div>
                                <p class="item-title">初始参数引用</p>
                            </div>
						</li>
						<li id="listep2" class="item2">
                        	<div class="will">
                                <div class="item-img"></div>
                                <p class="item-title">基本参数设定</p>
                            </div>
						</li>
						<li id="listep3" class="item3">
                        	<div class="will">
                                <div class="item-img"></div>
                                <p class="item-title">报名参数设定</p>
                            </div>
						</li>
						<li id="listep4" class="item4">
                        	<div class="will">
                                <div class="item-img"></div>
                                <p class="item-title">邀请发送</p>
                            </div>
						</li>
						<li id="listep5" class="item5">
                        	<div class="will">
                                <div class="item-img"></div>
                                <p class="item-title">个人报名</p>
                            </div>
						</li>
						<li id="listep6" class="item6">
                        	<div class="will">
                                <div class="item-img"></div>
                                <p class="item-title">参数保存</p>
                            </div>
						</li>						
					</ul>
				</div>
               <div id="guidestep1" class="ACmodGuide" style="display:none">
				</div>
               <div id="guidestep2" class="ACmodGuide" style="display:none">
				</div>
               <div id="guidestep3" class="ACmodGuide" style="display:none">
				</div>
               <div id="guidestep4" class="ACmodGuide" style="display:none">
				</div>
               <div id="guidestep5" class="ACmodGuide" style="display:none">
				</div>
               <div id="guidestep6" class="ACmodGuide" style="display:none">
				</div>
               <!-- 初始参数引用 -->
               <div class="btn-warp">
                    
               </div>
          </div>
     </div>
</div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" Runat="Server">
 <script type="text/javascript" src="http://code.jquery.com/ui/1.8.21/jquery-ui.min.js"></script>
     <script type="text/javascript" src="/scripts/jquery.core.js"></script>
     <script type="text/javascript" src="/scripts/jquery.ui.tabs.js"></script>
    <script type="text/javascript" src="/scripts/jquery.center.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.overlay.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="/scripts/gotop.js"></script>
    <script type="text/javascript" src="/scripts/activity/activity_infotype.js"></script>
    <script type="text/javascript" src="/scripts/plugin/activity/wanerdao2.utility.js"></script>
    <script type="text/javascript" src="/scripts/activity/activity_common.js"></script>
    <script type="text/javascript" src="/scripts/plugin/activity/wanerdao2.optionpanel.js"></script>
    
     <script type="text/javascript" src="/scripts/openplugin/jquery.cookies.source.js"></script>
     <script type="text/javascript" src="/scripts/openplugin/jquery.defaultvalue.js"></script>
     <script type="text/javascript" src="/scripts/openplugin/jquery.json-2.3.min.js"></script>
     <script type="text/javascript" src="/scripts/jquery.chosen/jquery.chosen.js"></script>
     <script type="text/javascript" src="/scripts/openplugin/jquery-ui-timepicker-addon.js"></script>
     <script type="text/javascript" src="/scripts/plugin/invitation/wanerdao2.invitation.cookie.js"></script>
     <script type="text/javascript" src="/scripts/plugin/pagination/wanerdao2.pager.js"></script>
     <script type="text/javascript" src="/scripts/plugin/area/wanerdao2.area.js"></script>
     <script type="text/javascript" src="../../scripts/plugin/TipPop/wanerdao2.pop.js"></script>
     <script type="text/javascript" src="/scripts/plugin/search/wanerdao2.compop.js"></script>
     <script type="text/javascript" src="/scripts/plugin/activity/wanerdao2.initrefparam.js"></script>
     <script type="text/javascript" src="/scripts/plugin/activity/wanerdao2.baseparam.js"></script>
     <script type="text/javascript" src="../../scripts/plugin/activitycategory/wanerdao2.ac.js"></script>
     <script type="text/javascript" src="/scripts/plugin/activity/wanerdao2.basesignupparam.js"></script>
     <script type="text/javascript" src="/scripts/plugin/activity/wanerdao2.selfsignupparam.js"></script>
     <script type="text/javascript" src="/scripts/plugin/activity/wanerdao2.saveparam.js"></script>
     <script src="http://maps.google.com/maps/api/js?sensor=true" type="text/javascript"></script>
    <script type="text/javascript" src="/scripts/openplugin/gmap3.js"></script>
      <script type="text/javascript">
          $(function () {
              //$("#listl").stepslink();              
              $(".btn-warp").optionpanel();
          });
      </script>
</asp:Content>

