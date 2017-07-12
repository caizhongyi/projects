<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="relationship_mygroup_finance.aspx.cs" Inherits="relationship_relationship_mygroup_finance" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<link href="../style/layout.css" rel="stylesheet" type="text/css" />
<link href="../style/nav_info.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery/jquery-ui-1.8.18.custom.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="../style/pers_rel.css" media="all" />
<link rel="stylesheet" type="text/css" href="../style/relationship.css" media="all" />
<link href="../style/select_upload.css" rel="stylesheet" type="text/css" />
<link rel='stylesheet' href="../css/PluginCss/pop.css" type="text/css" />

<script src="../Scripts/Plugin/Ablum/swfupload.js" type="text/javascript"></script>
<script src="../Scripts/Plugin/Ablum/handlers.js" type="text/javascript"></script>
<script src="../Scripts/Plugin/Ablum/swfupload.queue.js" type="text/javascript"></script>
 <script src="../Scripts/Plugin/Pagination/wanerdao2.pager.js" type="text/javascript"></script>
<script src="../Scripts/relationship/relation_common.js" type="text/javascript"></script>
<script src="../Scripts/relationship/group_common.js" type="text/javascript"></script>
<script src="../Scripts/relationship/groupsfinance.js" type="text/javascript"></script>
<script type="text/javascript" src="../Scripts/OpenProjectPlugin/jquery-ui-1.8.18.custom.min.js"></script>
<script type="text/javascript" src="../Scripts/OpenProjectPlugin/jquery-ui-timepicker-addon.js"></script>

<script type="text/javascript" src="../Scripts/common/wanerdaoutils.js"></script>
<script type="text/javascript" src="../Scripts/multipleLanguage/loader.js"></script>    
<script type="text/javascript" src="../Scripts/OpenProjectPlugin/jquery.overlay.js"></script>
<script type="text/javascript" src="../Scripts/Plugin/SearhGroupMember/wanerdao2.groupmember.js"></script>


<script type="text/javascript">
    var groupid = $.cookie("wanerdaomygroupID").mygroupID; 
</script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">

 <div class="main jz">
    	<div class="mCon pr49 pb50">
				<div class="subChaTab" id="TopMenu">
              </div>
              <div class="clearfix"></div>
				  <div class="Fnavigation" id="myGroupMenu">
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
                    	<dl >
                        	<dt>
                            	<div class="lsz_top">
                                    <a href="javascript:showcurrent();" class="tagf">当前流水账</a>
                                    <a href="javascript:showsreach();">按需求生成流水账</a>                                  
                                </div>
                            </dt>
                            <dd class="xq_dd" id="sreachDIV" style="display:none;">
                            	<ul>
                                	<li><label>日期范围：</label>从<input name="" type="text" class="inp01" id="txt_starttime" />
                                    到<input name="" type="text" class="inp01" id="txt_endtime" /></li>
                                    <li><label>按 名 目：</label><input type="text" class="inp17" id="sre_name"/></li>
                                    <li><span><input name="" type="button" value="生成报表" class="hobby_but" onclick="sreach_submit(1)">
                                    <input name="" type="button" value="保存打印" class="hobby_but" onclick="sreach_submit(2)" /></span>
                                    <label>按流水序号：</label><input type="text" class="inp18" id="sre_id" /></li>
                                </ul>
                            </dd>
                            <dd class="dq_dd" id="addMoneyFlowDD"></dd>

                        </dl>
                    </div>


                    <div class="finance_lsz_list">
                    
                    	<div class="lsz_frist">
                            	<div class="alb_nav">
                                <div id="pager1"></div>
                           		</div>
                            	<h1>按需流水账</h1>
                            </div>
                        <div class="lsz_frist">
                            	
                         </div>
                          <ul id="fList"> </ul>
                    	
                        
                         <div class="lsz_fourth">
                            	<div class="alb_nav">
                                   
                           		</div>
                                 <label>收入：<font color="#cc0000">$<label id="lab_sreincome"></label></font></label>	
                                <label>支出：<font color="#cc0000">$<label id="lab_srepay"></label></font></label>	
                                <label>结算：<font color="#cc0000">$<label id="lab_sresettlement"></label></font></label>	
                            </div>
                    </div>
                    
                 </div>
                 
        </div>
    </div>
    <div class="mBtm jz"></div>

</asp:Content>

