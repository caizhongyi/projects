<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Activity_signup.aspx.cs" Inherits="Activity_Activity_signup" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<link href="../style/home.css" rel="stylesheet" type="text/css" />
<link href="../style/activity_main.css" rel="stylesheet" type="text/css" />
<link rel='stylesheet' href="../css/PluginCss/pop.css" type="text/css" />

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div class="main jz">
    	<div class="home_page ofh">
        	
        	<div class="home_con version1">
              <div class="actMain">
              <div class="subChaTab">
               <a href="/activity/Activity_main.html" class="active">活动信息</a>
                <a href="/activity/Activity_myactivity.html">我的活动</a>
              </div>
              <div class="blank10px"></div>
              <div class="blank10px"></div>
              <div id="activityInfo"></div>

              <div id="signup" style="display:none">
              <div class="stepTip">填写下面五步信息，完成申请加入</div>
              
              <h2  class="activity_t">交通方式</h2>

             <%-- <div id="activity_t5"></div>--%>
         
              <div class='activity_signup_options'><span>准备通过：</span>
                <select id="drpvehicletype" class="combobox w80px" style="width:90px;" ></select><span style="text-align:left;margin-left:5px;">参加活动</span>
                <select id="drpishavecar"   class="combobox w80px" style="width:58px;display:none" >
                   <option value="1">有</option>
                   <option value="0">无</option> </select>
                <span id="spishavecar" style="display:none">车参加活动</span>
                <select  id="drphavecar" class="combobox w80px"  style="display:none" >
                  <option value="0">愿意提供搭车</option>
                  <option value="1">自行前往</option>
                </select>

                <%--<input type="button" style="display:none;background: url('../images/create_step2_2.png') repeat-x scroll 0 0 #E3E3E3; border: 1px solid #BABABA;    cursor: pointer;    height: 26px;    margin-right: 10px;    padding: 0 10px;" id="drpSelectPerson" value="选择"   rel="#tt" />  --%>
                <select  id="drpSelectPerson1" class="combobox w80px"  style="display:none" >
                  <option value="0">可选搭车人</option>
                 </select>

                <select id="drpnocar" class="combobox w80px"  style="display:none" >
                  <option value="0">需要搭车</option>
                  <option value="1">自行解决</option>
                </select> 
               
              </div> 
                <div id="divSelectPerson" class='activity_signup_options'   style="display:none"><span>搭车费： </span>
                    <select id="takeFare" class="combobox w80px" style="width:170px;" ></select>
                    <span style="display:none"  tt="feiyong"  >每人$</span> <input id="carpooltypeid" value="0"  style="display:none" tt="feiyong" type='text' class='input_b' />
                </div>
               <div id="divSelectPersonCarInfor1" class='activity_signup_options'  style="display:none"> <span>车品牌：</span>
                <select id="licensePlate" class="combobox w80px" style="width:170px;" > </select>
                <span tt="carinfor" style="display:none" >车型：</span> <select id="model"   tt="carinfor" class="combobox w80px" style="display:none;width:120px;" > </select>
                <span tt="carinfor" style="display:none" >车牌：</span>  <input id="autoplate" tt="carinfor" type='text' class='input_b' />
              </div>
                <div  id="divSelectPersonCarInfor2" class='activity_signup_options'  style="display:none"> <span>年代：</span>
                 <input type='text' id="autoyear" class='input_b' />
                 <span>提供空位数</span>      
                 <input type='text' id="carpoolnbr" class='input_b' />
              </div>
                <div  id="divnocardache" class='activity_signup_options'  style="display:none"> <span>搭车费协商：</span>
                 <input name="chkdcf" type="checkbox" id="0"  />油价均分 <input  name="chkdcf" type="checkbox" id="chkjf" />免费<input id="chkmf" name="chkdcf" type="checkbox" id="chkJj"   /> 车主叫价 
                 <select ttfeiyong="takeFare" class="combobox w80px" id="drpcarpoolmoney" style="width:90px;" >
                  <option value="1">10元</option>
                  <option value="2">20元</option>
                </select>
                
              </div>


              <div class="blank10px"></div>
              <h2  class="activity_t">确定起始地址</h2>
              <p class='activity_signup_options'><span><input id="chkpersonAddress" type='checkbox' /></span>该地址为家庭地址，同步到个人信息 </p>
           
              <p id="pAddress" class='activity_signup_options'> <span>位置：</span>               
              
              <input id="txtactivitycountryName1" type="text" class="txtInt" disabled="disabled" style="width:80px;" /> 
              
                <input id="txtactivitystateName1" type="text" class="txtInt" disabled="disabled" style="width:80px;" /> 
                    
                <input id="txtactivitycityName1" type="text" class="txtInt" disabled="disabled" style="width:80px;" /> 
              
              <input type="button" style="background: url('../images/create_step2_2.png') repeat-x scroll 0 0 #E3E3E3; border: 1px solid #BABABA;    cursor: pointer;    height: 26px;    margin-right: 10px;    padding: 0 10px;" id="selectArea1" value="选择"   rel="#tt" />  
              </p>
              
         
              <div class="blank10px"></div>
              <h2 id="activity_t1" class="activity_t">确定联系方式</h2>
              <p class='activity_signup_options'> 
              <span><input type='checkbox' id="personLx" /></span>该联系方式为个人联系方式，同步到个人信息 </p>
              <p class='activity_signup_options'> <span>电话：</span>
                <input type='text' id="txtPhone" class='input_a'/>
                <span>邮箱：</span>
                <input type='text' id="txtEmail" class='input_b'/>
              </p>
              <div class="blank10px"></div>
              <h2 id="activity_t1" class="activity_t">费用交纳</h2>
              <div class="payment">
              	<table width="100%" border="0" cellspacing="0" cellpadding="0" id="tbbudget"></table>
              </div>
              <p class="totalMoney" id="totalMoney">总金额计算：360$</p>
              <div class="payInfo">
              	<p class="lh24">请交纳（<em id="emTotalMoney">360$</em>）给（<em id="opePerson">侯小刚</em>），缴费原因及用途，缴费性质，缴费方式说明：</p>
                <textarea class="txtArea" style="width:548px; height:140px;"></textarea><br />
                <p class="lh24"><input type="radio" name="tax" class="vInput" id="taxed" /><label for="taxed">已缴费，通知财务 &nbsp;&nbsp;<input type="radio" name="tax" class="vInput" id="wtax"  /><label for="wtax">稍后缴税</label></p>
              </div>
              
              
              <h2 id="activity_t1" class="activity_t">发送邀请</h2>

              <div class="select_pep_bot"></div>      
              <div class="btn_submit"><a href="#" onclick="ActivitySignup()">提交申请</a></div>
              </div>
            </div>
            </div>
            <div class="side">
              <div class="activity_event"><a href="Activity_create.aspx" class="Initiating_event_2"></a></div>
              <div class="friend bor ">
                <h2 class="friend_title">
                  <p>搜索活动</p>
                </h2>
                <div class="search_ac">
                    <input   id="txt_activityNames"  type="text" value="关键词" onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#000'}" onblur="if(this.value==''){this.value=this.defaultValue; this.style.color='#79A8B0'}" class="search_active nobg"/>
                    <input   id="txt_categoryNames"  type="text" value="请选择活动分类" onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#000'}" onblur="if(this.value==''){this.value=this.defaultValue; this.style.color='#79A8B0'}"  class="search_active secA"/>
                    <input   id="txt_friendsName"    type="text" value="好友参加的活动" onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#000'}" onblur="if(this.value==''){this.value=this.defaultValue; this.style.color='#79A8B0'}" class="search_active secB" />
                    <input   id="txt_groupNames"      type="text" value="圈子参加的活动" onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#000'}" onblur="if(this.value==''){this.value=this.defaultValue; this.style.color='#79A8B0'}" class="search_active secC" />
                    <input   id="txt_sightNames" style="display:none;"      type="text" value="景点" onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#000'}" onblur="if(this.value==''){this.value=this.defaultValue; this.style.color='#79A8B0'}" class="search_active secD" />
                    <%--<input   id="txt_countryId"  type="text" value="美国" onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#000'}" onblur="if(this.value==''){this.value=this.defaultValue; this.style.color='#79A8B0'}" class="search_active secE" />
                    <select id="drp_Provice" style="width:108px; margin-top:3px;"><option>所有州省</option></select>&nbsp;
                    <select id="drp_City" style="width:111px; margin-top:3px;"><option>所有城市</option></select>--%>
                    <input id="txtactivitycountryName" type="text" class="txtInt" disabled="disabled" style="width:43px;" /> 
                    <input id="txtactivitystateName" type="text" class="txtInt" disabled="disabled" style="width:43px;" /> 
                    <input id="txtactivitycityName" type="text" class="txtInt" disabled="disabled" style="width:43px;" /> 
                    <input id="selectArea" value="选择地区"   type="button"  rel="#tt"   style="background: url('../images/create_step2_2.png') repeat-x scroll 0 0 #E3E3E3; border: 1px solid #BABABA;cursor: pointer; height: 26px; padding: 0 10px" />

                    <input type="submit"  id="search_active" class="secI" value="&nbsp;" />
                
                </div>
              </div>
              <div class="friend bor">
                <h2 class="friend_title">
                  <p>好友参加的活动<span  id="friendTotal">（157）</span></p>
                  <span id="friendPageid"> </span></h2>
                <ul class="activity_List" id="friendContent">
                
                </ul>
              </div>
              <div class="friend bor">
                <h2 class="friend_title">
                  <p>可能感兴趣的活动<span  id="interestTotal">（）</span></p>
                  <span  id="interestPageid" ></span></h2>
                <ul class="activity_List"  id="interestContent" >
                </ul>
              </div>
              <div class="friend bor">
                <h2 class="friend_title">
                  <p>最新创建的活动<span  id="newTotal">（）</span></p>
                  <span id="newactivityPageid"></span></h2>
                <ul class="activity_List"  id="newActivityContent">
                </ul>
              </div>
              <div class="friend">
                <h2 class="friend_title">
                  <p>相关圈子推荐<span id="groupTotal">（）</span></p>
                  <span id="groupPageid"></span>
                </h2>
                <div class="relaCircle">
                	<ul id="groupContent">
                    </ul>
                </div>
              </div>
            </div>
        </div>
    </div>
    <div class="mBtm jz"></div>
    <script src="../Scripts/activity/activity_common.js" type="text/javascript"></script>
    <script src="../Scripts/Plugin/Pagination/wanerdao2.pagination.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../Scripts/common/wanerdaoutils.js"></script>
    <script type="text/javascript" src="../../Scripts/multipleLanguage/loader.js"></script>    
    <script type="text/javascript" src="../../Scripts/OpenProjectPlugin/jquery.overlay.js"></script>
	<script type="text/javascript" src="../../Scripts/Plugin/Search/wanerdao2.compop.js"></script>   
    <script type="text/javascript" src="../Scripts/Plugin/Search/wanerdao2.activityinvite.js"></script>    
    <script type="text/javascript" src="../../Scripts/multipleLanguage/loader.js"></script>    
    <script type="text/javascript" src="../../Scripts/Plugin/Area/wanerdao2.area.js"></script>
    <script type="text/javascript" src="../../Scripts/OpenProjectPlugin/jquery.overlay.js"></script>
    <script src="../../Scripts/OpenProjectPlugin/jquery.json-2.3.min.js" type="text/javascript"></script>
    <script src="../Scripts/activity/activity_signup.js" type="text/javascript"></script>

    <%--<script src="../Scripts/Plugin/activity/wanerdao2.selfsignupparam.js" type="text/javascript"></script>
    <script src="../Scripts/Plugin/activity/wanerdao2.selfsignupparam.cookie.js" type="text/javascript"></script>--%>

      
    <script src="../Scripts/Plugin/SideBar/wanerdao2.sidebar.js" type="text/javascript"></script>
    <script src="../Scripts/Plugin/activity/wanerdao2.selfsignupparam.js" type="text/javascript"></script>

   <%-- <script  type="text/javascript">
        $(function () {
            $("#activity_t5").selfsignupparam();
        });
    </script>--%>
</asp:Content>

