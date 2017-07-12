<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Activity_myhistory_photo_edit.aspx.cs" Inherits="Activity_Activity_myhistory_photo_edit" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<link rel="stylesheet" type="text/css" href="../style/pers_rel.css" media="all" />
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
                    <li><a href="Activity_myhistory_album_view.aspx?activity_id=1111">浏览相册</a></li>
                    <li><a href="Activity_myhistory_album_upload.aspx?activity_id=1111">上传照片</a></li>
                    <li><a  class="cur">管理相册</a></li>
                  </ul>
                </div>
                <div class="pa_tit clearfix">
					<div class="alb_set"><b class="ico_set"></b>历史活动相册<i>(34)</i> <span class="fn gray">可管理相册<span class="lblue">(56)</span>  可管理相片数<span class="lblue">(56)</span></span></div>
				</div>
                <div class="blank10px"></div>
				<div class="alb_edit_wp clearfix">
					<div class="alb_lt">
						<div class="scroll_pic_wp">
							<div class="arr_top"></div>
							<div class="scrTop_pic">
								<ul class="alb_list scrTop clearfix" id="albList"></ul>
							</div>
							<div class="arr_bm"></div>
						</div>
					</div>
					<div class="alb_rt">
						<div class="alb_tag other_sty clearfix">
							<div class="tag_lt">
								<div class="pe_set"><b class="ico_alb_nm"></b>相册名(34) &nbsp;&nbsp; 相片总数(23) &nbsp;&nbsp;  可编辑数(15)</div>
							</div>
							<div class="alb_nav"><span class="xcpge_tex_rig"><a href="#"><img src="../images/pic_guan003.jpg"/></a></span>
             <span class="xcpge_tex_rig"><a href="#"><img src="../images/pic_guan005.jpg"/></a></span></div>
						</div>
                        <div class="xcp_cz_fy">
                        <div class="xc_cxfy_left">
                        <form action="" method="get">
                           <span><input name="textfield" type="text" class="xc_form_ss_box" id="textfield" hidefocus="ture" style="outline:none;"/></span>
                           <span ><input name="button" type="submit" class="xc_form_ss_an" id="button" value="提交" onfocus="this.blur()"/></span>
                         </form>  
                        </div>
                        <div class="xc_cxfy_right">
                          <ul>
                           <li>首页</li>
                           <li><a href="#">上页</a></li>
                           <li>01/<a href="#">20</a></li>
                           <li><a href="#">下页</a></li>
                           <li><a href="#">末页</a></li>
                         </ul>
                        </div>
                      </div>
						<div class="pe_list clearfix lh22">
							<ul id="photoList"></ul>
						</div>
						<div class="alb_tag clearfix">
							<div class="tag_lt">
								<div class="lim_set lblue">
									<input type="checkbox" class="ckbox" />
									<a href="#">删除</a>
									<a href="#">屏蔽</a>
								</div>
							</div>
							<div class="alb_nav"><span class="first">首页</span><span class="prev">上一页</span><span>01<i>/20</i></span><span class="next"><a href="#">下一页</a></span><span class="last"><a href="#">末页</a></span></div>
						</div>
					</div>
				</div>
                <div class="blank10px"></div>
              </div>
            </div> 
    </div>
    <div class="mBtm jz"></div>
     </div>
    <script src="../Scripts/Plugin/Pagination/wanerdao2.pagination.js" type="text/javascript"></script>
    <script src="../Scripts/common/effect.js" type="text/javascript"></script>
    <script src="../Scripts/activity/activity_myhistory_photo_edit.js" type="text/javascript"></script>
</asp:Content>

