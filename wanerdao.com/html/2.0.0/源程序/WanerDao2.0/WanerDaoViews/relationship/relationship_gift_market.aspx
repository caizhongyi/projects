<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="relationship_gift_market.aspx.cs" Inherits="relationship_relationship_gift_market" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<link rel="stylesheet" type="text/css" href="../style/layout.css" media="all" />
<link rel="stylesheet" type="text/css" href="../style/nav_info.css" media="all" />
<link href="../css/jquery/jquery-ui-1.8.18.custom.css" rel="stylesheet" type="text/css" />
<link rel='stylesheet' href="../css/PluginCss/pop.css" type="text/css" />
 <script src="../Scripts/Plugin/Pagination/wanerdao2.pager.js" type="text/javascript"></script>
<script src="../Scripts/relationship/relation_common.js" type="text/javascript"></script>
<script src="../Scripts/relationship/giftlist.js" type="text/javascript"></script>
<link href="../css/jquery/jquery.timepicker.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="../Scripts/OpenProjectPlugin/jquery-ui-1.8.18.custom.min.js"></script>
  <script type="text/javascript" src="../Scripts/OpenProjectPlugin/jquery-ui-timepicker-addon.js"></script>
  <script type="text/javascript" src="../Scripts/common/wanerdaoutils.js"></script>
    <script type="text/javascript" src="../Scripts/multipleLanguage/loader.js"></script>    
    <script type="text/javascript" src="../Scripts/OpenProjectPlugin/jquery.overlay.js"></script>
	<script type="text/javascript" src="../Scripts/Plugin/Search/wanerdao2.compop.js"></script>
   </asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">

 <div class="main jz">
  
    	<div class="mCon pb50 pr49">
         <div class="subChaTab" id="TopMenu" style="height:auto"></div>
				<div class="searchbox clearfix">
                    	<div class="search_le">
                        <input name="" class="sea_inp Stext" type="text"  id="txt_giftkey" />
                        <input name="" class="sea_but" type="button" onclick="pagination('1','')" />
                        <label >显示<label id="lab_sreachresults">0</label>个搜索结果</label></div>
                        <div class="alb_nav" id="pager1"></div>
                    </div> 
                    <div class="mainlist clearfix">
                    	<div class="market_le">
                        	<ul id="ul_category">
                            </ul>
 						</div>
                     	<div class="market_ri" id="div_body">
                        	
                        </div>
                    </div> 	
                <div class="market_end">
                	<div class="alb_nav"></div>
                </div>
        </div>
    </div>
   
 
    <div class="mBtm jz"></div>










     
 
<div class="upbox_market" id="upbox_market" >
    	<div class="upb_top">
        	<a href="javascript:void();" onclick="$('#upbox_market').hide();"></a><b>送礼</b>
        </div>
        <div class="upb_con">
            <div class="upb_con_le" id="div_img">
            	
            </div>
            <div class="upb_con_ri">
            	<ul>
                	 <li><label>礼 品 名：</label><b><a id="lab_name"></a></b></li>
                     <li><label>分&nbsp;&nbsp;&nbsp;&nbsp;类：</label><a id="lab_cate"></a></li>
                     <li><label>描&nbsp;&nbsp;&nbsp;&nbsp;述：</label><label id="lab_des"></label></li>
                     <li><label>好&nbsp;&nbsp;&nbsp;&nbsp;友：</label><input name=""  type="text" class="prInpSty" id="txt_friend"  /> <input type="button" id="btnarea" value="查询好友" rel="#ff"/></li>
                     <li><label>发送时间：</label><input name="" type="text" class="inp01" id="txt_time" /></li>
                	 <li><label class="v_top">赠&nbsp;&nbsp;&nbsp;&nbsp;言：</label><textarea name="" class="inp02" id="txt_message"></textarea></li>
                     <li><input name="" type="button" class="hobby_but" value="送 礼" onclick="btn_submit()"  />
                     <input name="" type="button" class="hobby_but01" value="取 消"  onclick="$('#upbox_market').hide();" /></li>
                </ul>
            </div>
        </div>
        <div class="upb_bot"></div>
</div>

     
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" Runat="Server">

        <script type="text/javascript">
            $("#btnarea").click(function () {
                wanerdaoPop({
                    comopts: { titleid: 'common_00011', typename: 'friends', id: 'ff', elementid: 'btnarea', callback: showdata }
                });
            });
            function showdata(data) {
                var hid = "";
                var htext = "";
                $.each(data.friends, function (i, v) {
                    htext += v.name+",";
                    hid += v.id+"-";
                })
                $("#txt_friend").val(htext).attr("lang", hid);
            }
            $(function () {
                $("#btnarea").overlay();
            })
        </script>
</asp:Content>

