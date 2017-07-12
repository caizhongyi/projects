<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="relationship_mygroup_finance.aspx.cs" Inherits="relationship_relationship_mygroup_finance" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">

<title>圈子财务-关系-玩儿道</title>
<meta name="keywords" content="圈子财务，关系，玩儿道，生活社交网络" />
<meta name="description" content="财务员，管理员对圈子的流水账，预算进行管理" />


<link rel="stylesheet" type="text/css" href="../css/icon.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/form.css" media="all" />
<link rel="stylesheet" type="text/css" href="../scripts/jquery.chosen/jquery.chosen.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/relationship.css" media="all" />
    <link rel="stylesheet" type="text/css" href="../css/pager.css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" Runat="Server">
<div class="mes_main layout">
	<div class="mes_box per_blog clearfix">
        

        <div id="TopMenu"></div>
        
        <div class="black10"></div>

        
        <div class="log_tab clearfix mb12" id="myGroupMenu">
          
        </div>
        
        <div class="follow_main clearfix no_bg">
                 	
            <div class="finance_top">
                <dl>
                    <dt>圈子财务状况</dt>
                    <dd>收入：<font color="#cc0000">$<label id="lab_income"></label></font></dd>
                    <dd>支出：<font color="#cc0000">$<label id="lab_pay"></label></font></dd>
                    <dd>结算：<font color="#cc0000">$<label id="lab_settlement"></label></font></dd>
                </dl>
            </div>
            <div class="finance_lsz">
                <dl>
                    <dt>
                        <div class="lsz_top">
                            <a href="javascript:showcurrent();" class="tagf">当前流水账</a>
                            <a href="javascript:showsreach();">按需求生成流水账</a>                                
                        </div>
                    </dt>
                     <dd class="xq_dd" id="sreachDIV" style="display:none;">
                        <ul>
                            <li><label>日期范围：</label>从
                           <input name="" type="text" class="inp01" id="txt_starttime" />
                                到
                                <input name="" type="text" class="inp01" id="txt_endtime" /></li>
                                <li><label>按 名 目：</label><input type="text" class="inp17 text" id="sre_name"/></li>
                            <li><span><input type="button" onclick="sreach_submit(1)" class="buttonB btn_w135 btn_h36 btnBlue_135 fSize-14" value="生成列表">
                            <input type="button" onclick="sreach_submit(2)" class="buttonB btn_w97 btn_h36 btnGary_97 fSize-14" value="保存打印"></span>
                            <label>按流水序号：</label><input type="text" class="inp18 text" id="sre_id"  style="width:283px;" /></li>
                        </ul>
                    </dd>

                    <dd class="dq_dd" id="addMoneyFlowDD">
                      
                    </dd>
                </dl>
            </div>
            <div class="finance_lsz_list">
                
                <div class="topNav">
                    <div class="clearfix pagewrap">
                        <!-- 分页右边 -->
                        <div class="pageList  f_right"></div>
                        <!-- 分页右边 -->
                    </div>
                </div>
                
                <ul id="fList">  </ul>
                  
                    
                    <div class="topNav bmNav clearfix">
                    	<!-- 分页左边 -->
                        <div class="f_left">
                            <label>收入：<font color="#cc0000">$<label id="lab_sreincome"></label></font></label>
                            <label>支出：<font color="#cc0000">$<label id="lab_srepay"></label></font></label>
                            <label>总金额：<font color="#cc0000">$<label id="lab_sresettlement"></label></font></label>
                        </div>
                        <!-- 分页左边 -->
                        <!-- 分页右边 -->
                        <div class="pageList  f_right"></div>
                        <!-- 分页右边 -->
                    </div>
                    
              
            </div>
                    
        </div>
        
        
        
        
    </div>
</div>
<div class="mes_main_bot"></div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" Runat="Server">
<script src="../scripts/jquery.chosen/jquery.chosen.js" type="text/javascript"></script>
<script src="../Scripts/Plugin/Ablum/swfupload.js" type="text/javascript"></script>
<script src="../Scripts/Plugin/Ablum/handlers.js" type="text/javascript"></script>
<script src="../Scripts/Plugin/Ablum/swfupload.queue.js" type="text/javascript"></script>
<script src="../Scripts/relationship/relation_common.js" type="text/javascript"></script>
<script src="../Scripts/relationship/group_common.js" type="text/javascript"></script>
<script src="../Scripts/relationship/groupsfinance.js" type="text/javascript"></script>
 <script type="text/javascript" src="../scripts/plugin/pagination/wanerdao2.pager.js"></script> 
 <script type="text/javascript" src="../Scripts/openplugin/jquery-ui-1.8.18.custom.min.js"></script>
<script type="text/javascript" src="../Scripts/openplugin/jquery-ui-timepicker-addon.js"></script>
<script type="text/javascript" src="../scripts/plugin/search/wanerdao2.compop.js"></script>
     <script type="text/javascript" src="../scripts/jquery.core.js"></script>
     <script type="text/javascript" src="../scripts/jquery.ui.tabs.js"></script>
    <script type="text/javascript" src="../scripts/jquery.center.js"></script>
    <script type="text/javascript" src="../scripts/jquery.ui.overlay.js"></script>
    <script type="text/javascript" src="../scripts/jquery.ui.dialog.js"></script>
    
     <script type="text/javascript" src="../scripts/plugin/cookie/wanerdao2.cookies.js"></script>
    <script type="text/javascript" src="../Scripts/multipleLanguage/loader.js"></script>
    <script type="text/javascript" src="../scripts/global.js"></script>
       <script type="text/javascript" src="../scripts/plugin/TipPop/wanerdao2.pop.js"></script>
<script type="text/javascript">
    var groupid = $.cookie("wanerdaomygroupID").mygroupID; 
</script>
</asp:Content>

