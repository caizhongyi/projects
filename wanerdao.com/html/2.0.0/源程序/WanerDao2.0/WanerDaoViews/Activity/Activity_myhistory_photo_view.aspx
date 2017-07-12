<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Activity_myhistory_photo_view.aspx.cs" Inherits="Activity_Activity_myhistory_photo_view" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<link rel="stylesheet" type="text/css" href="../style/pers_rel.css" media="all" />
<link rel="stylesheet" href="../style/party.css" />
<link  rel="stylesheet" href="../style/ykb.css"  />
 <script src="../Scripts/OpenProjectPlugin/jquery.cookie.js" type="text/javascript"></script>
 <script src="../Scripts/autoPalyer.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">

    <div class="main jz">
    	<div class="mCon" style="padding:0;">
            <div class="prPdBox">
              <div class="subChaTab">
                <a href="#">活动信息</a>
                <a href="#" class="active">我的活动</a>
              </div>
              <div class="clearfix">
                <div class="Fnavigation FnwhiteBg">
                  <ul class="fix4w">
                  	<li><a href="#">活动信息及评论</a></li>
                    <li><a href="Activity_myhistory_album_view.aspx?activity_id=1111">浏览相册</a></li>
                    <li><a href="Activity_myhistory_album_upload.aspx?activity_id=1111">上传照片</a></li>
                    <li><a href="Activity_myhistory_photo_edit.aspx?activity_id=1111">管理相册</a></li>
                    <li><a href="#">浏览发表管理感想</a></li>
                  </ul>
                </div>
                <div class="pa_tit clearfix">
					<div class="alb_set"><b class="ico_view"></b>相片浏览<em></em></div>
				</div>
				<!-- 页面主体内容 相片游览 区块 -->
                <div class="pic_biaot">
                   <span class="pic_bt_name">我的周末派对</span>
                   <span class="pic_bt_number">(<span id="showPage">0</span>/<span id="showTotal">0</span>)</span>
                  <a href="#"><img src="../images/pic_guan001.jpg" width="16" height="16" /></a>
                  <a href="#"><img src="../images/pic_guan002.jpg" width="16" height="16" hspace="5" /></a>
                  <a href="#"><img src="../images/pic_guan003.jpg" width="16" height="16" /></a>
                </div>
                <div class="imgLib">
            <div class="imgShow">
               
              <div class="picyk_smalbox_top"></div> 
              <div class="small_pic_box">
                <i class="to_left">
                    <a id="butPrevGroup" href="javascript://" target="_self" title="上五张图片"></a>
                </i>
                <ul id="nav" class="silderpic">
                </ul>		
                <i class="to_right">
                    <a id="butNextGroup" href="javascript://" target="_self" title="下五张图片"></a>
                </i> 
               </div>
               <div class="picyk_smalbox_fot"></div> 
               
              <!-- 隐藏的不需要的功能 --> 
              <div id="_playpic" class="playNav">
                      <i class="title" id="alt"></i>
                      <i class="playButtom">
                        <a href="javascript://" target="_self" class="play" title="播放" id="butPlay"></a>
                        <span id="playStatus">点击自动播放</span>
                        <a href="javascript://" target="_self" style="display:none" class="stop" title="停止" id="butStop"></a>
                        <a href="javascript://" target="_self" style="display:none" class="pause" title="暂停" id="butPause"></a>
                        <span id="speedGroup" class="spead" style="display:none">
                            <a href="javascript://" target="_self" speed="3">快</a>┊<a href="javascript://" target="_self" speed="5">中</a>┊<a href="javascript://" target="_self" speed="8">慢</a>
                        </span>
                    </i>
                      <i class="jump">
                        <a href="javascript://" class="pre" id="topPrev" target="_self" title="上一张"></a>
                        <a href="javascript://" class="next" id="topNext" target="_self" title="下一张"></a>
                        
                      </i>
                 </div>
                 <!-- 隐藏的不需要的功能End --> 
                 
                  <div class="singlepic" id="_singlepic">
                    <div class="prePic">
                        <a href="###" onclick="javascript://" id="butPrev" target="_self" title="上一张" onfocus="this.blur()"></a>
                    </div>
                    <div class="bigPic">
                        <img id="screen"/>
                    </div>
                    <div class="nextPic">
                        <a href="###" onclick="javascript://" id="butNext" target="_self" title="下一张" onfocus="this.blur()"></a>
                    </div>
                </div>
            </div>
          </div> 
                <!-- 页面主体内容 相片游览 区块End -->
                <!-- 页面主体内容 相片回复 区块 -->
                <div class="hd_picpl_box_con ">
          <div class="hd_picpl_box">
           <ins style="left:50px;"></ins>
           <div class="hd_picpl_mid">
              <div class="picpl_form_box">
              <div>
                <input type="text" name="textfield" id="textfield" class="picpl_hf_kuang" hidefocus="ture" style="outline:none;"/> 
               <input type="button" name="button"  id="btnhf" onclick="oneLeavalHuifu()" value="回复" class="picpl_hf_an01" tyle="background-color: Transparent;" onmouseover="this.style.backgroundImage='url(../images/picpl_hf_an01b.jpg)'" onmouseout="this.style.backgroundImage='url(../images/picpl_hf_an01a.jpg)'"  onfocus="this.blur()"/> 
               <input type="button" name="button2" id="btnCancel" value="取消" class="picpl_hf_an02" tyle="background-color: Transparent;" onmouseover="this.style.backgroundImage='url(../images/picpl_hf_an02b.jpg)'" onmouseout="this.style.backgroundImage='url(../images/picpl_hf_an02a.jpg)'"  onfocus="this.blur()"/> 
              </div>
              </div>
              <div id="messageContent"> </div>
          <div id="huifuid" class="huif_more">
                <div class="huif_colse_an"><a href="javascript:void(0);" onclick="hideDetReply(this);">收起</a></div>
                <div class="huif_open_an"><a href="javascript:void(0);">更多回复</a></div>
              </div>
           </div>
          </div>
        </div>    
                <!-- 页面主体内容 相片回复 区块End -->
                <div class="blank10px"></div>
              </div>
            </div>
        </div>
    </div>
    <div class="mBtm jz"></div> 
    <span id="span_count" class="spanclass"></span>
    <script src="../Scripts/Plugin/Pagination/wanerdao2.pagination.js" type="text/javascript"></script>
    <script src="../Scripts/activity/activity_myhistory_photo_view.js" type="text/javascript"></script>
</asp:Content>

