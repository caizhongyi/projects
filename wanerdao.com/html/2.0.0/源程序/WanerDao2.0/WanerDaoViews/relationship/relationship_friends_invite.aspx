<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="relationship_friends_invite.aspx.cs" Inherits="relationship_relationship_friends_invite" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<link href="../style/layout.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="../style/pers_rel.css" media="all" />
<link rel="stylesheet" type="text/css" href="../style/relationship.css" media="all" />
<link href="../style/select_upload.css" rel="stylesheet" type="text/css" />
<script src="../Scripts/relationship/relation_common.js" type="text/javascript"></script>
<script src="../Scripts/relationship/friendsInvite.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
<div class="main jz">
    	<div class="mCon">
            <div class="prPdBox">
              <div class="subChaTab" id="TopMenu">
              </div>
				<div class="searFsTip">快让你更多的朋友来玩儿道吧，同你快乐共分享</div>
				<div class="prTnvit_wrap">
					<div class="prT_name"><b></b>方法一：邀请信息寻友</div>
					<div class="bd">
						<div class="labTit">复制邀请：</div>
						<div class="dTbc">
							<textarea name="" class="prTxaSty" style="color:#999;" id="txtInvited" cols="30" rows="10">Hi,我现在在玩er道，快点击 "http://www.wanerdao.com"加入和我一起玩吧</textarea>
							<div class="copy">
								<input type="button" class="prBtn" value="复 制" onclick="copytext();"/>&nbsp;&nbsp;&nbsp;<span  id="copyMessage" style="display:none; color :Red" >复制成功！</span>
							</div>
						</div>
					</div>
				</div>
				<div class="prTnvit_wrap">
					<div class="prT_name"><b></b>方法二：邮箱寻找好友</div>
					<div class="bd">
						<p class="txt1 lh24">申明：暂未开放。。。</p>

						<!-- radius_box -->
						
						<!-- radius_box end -->
					</div>
				</div>
            </div>
        </div>
    </div>
    <div class="mBtm jz"></div>

</asp:Content>

