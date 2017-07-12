using System;
using System.Web;
using System.Web.SessionState;
using WanerDao2.WanerDaoModule.Validation;
using WanerDao2.WanerDaoIBLL.IPerson;
using WanerDao2.WanerDaoIBLL.ICommon;
using WanerDao2.WanerDaoModule.Json;
using WanerDao2.WanerDaoComponent;
using System.Collections.Generic;
using System.Threading;
using WanerDao2.WanerDaoModule.Config;
using WanerDao2.WanerDaoBLL.Person;
using WanerDao2.WanerDaoModule.WanerDaoImage;
using System.Collections;
using WanerDao2.WanerDaoModule.TipInfo;
using WanerDao2.WanerDaoModule;
using WanerDao2.WanerDaoModel.Person;
using WanerDao2.WanerDaoIBLL.IActivity;
using WanerDao2.WanerDaoModel.Activity;
using WanerDao2.WanerDaoIBLL.IRelation;
using Newtonsoft.Json;
using WanerDao2.WanerDaoModule.FileUpload;
using WanerDao2.WanerDaoModel;
using WanerDao2.WanerDaoModule.Cookie;
using System.Data;
using WanerDao2.WanerDaoBLL.Common;
using WanerDao2.WanerDaoModel.Common;
using WanerDao2.WanerDaoModule.IOC;
using WanerDao2.WanerDaoBLL.Activity;


namespace WanerDao2.WanerDaoBLLFactory
{
    /// <summary>
    /// 描述：处理程序处理玩儿道2.0所有插件或者控件所用到的方法
    /// </summary>
    public class WanerDaoCommonFactory : IHttpHandler, IRequiresSessionState
    {
        /// <summary>
        /// 您将需要在您网站的 web.config 文件中配置此处理程序，
        /// 并向 IIS 注册此处理程序，然后才能进行使用。有关详细信息，
        /// 请参见下面的链接: http://go.microsoft.com/?linkid=8101007
        /// </summary>
        #region IHttpHandler Members

        public bool IsReusable
        {
            // 如果无法为其他请求重用托管处理程序，则返回 false。
            // 如果按请求保留某些状态信息，则通常这将为 false。
            get { return true; }
        }

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            context.Response.Cache.SetCacheability(HttpCacheability.ServerAndNoCache);
            
            string json = string.Empty;
            string typestr = WanerDaoValidation.ValidateParamters(context.Request.Form.ToString());
            if (typestr == string.Empty)
            {
                json = WanerDaoGlobalTip.GetInternationalizationTip("NoDataTypeInfo", WanerDaoResultEnum.Failure);//WanerDaoJSON.GetErrorJson("no operator type or invalid operator!");
            }
            else
            {
                IWanerDaoCommon common = new WanerDao2.WanerDaoBLL.Common.WanerdaoCommon() as IWanerDaoCommon;
                IWanerDaoActivity activity;
                //PersonalSecurityProfileModel pspmodel = CommonContext.GetUserSecurityInfo();
                if (common == null)
                {
                    json = WanerDaoGlobalTip.GetInternationalizationTip("NoDataTypeInfo", WanerDaoResultEnum.Failure);// WanerDaoJSON.GetErrorJson("没有对应类型处理!");
                }
                else
                {
                    //// 打印
                    //if (typestr == "print")
                    //{
                    //    DataSet DS = new DataSet();
                    //    json = WanerDaoJSON.GetSuccessJson(WanerDaoPrint.getPrintTemplete(context.Request.Form.ToString(), DS));
                    //}
                    //else
                    //{
                 
                        Dictionary<string, object> dic = WanerDaoJSON.GetContentInfo(context.Request.Form.ToString());
                        string tablename = "";
                        string sreachname = "";
                        string sreachWhere = "";
                        string sortStr = "";
                        string sortId = "";
                        string languageID = CommonContext.GetClientLanguage();

                        string _activityid = string.Empty;
                        switch (typestr)
                        {
                            case "scrollbutton":
                                json = common.WanerDaoScrollButton();
                                break;
                            #region 打印
                            //圈子财务打印
                            case "groupprint":
                                 json = WanerDaoJSON.GetSuccessJson(WanerDaoPrint.getPrintTemplete(context.Request.Form.ToString(), null));
                                 break;
                            case "singleblogprint"://日志打印
                                 json = WanerDaoJSON.GetSuccessJson(WanerDaoPrint.getPrintTemplete(context.Request.Form.ToString(), null));
                                 break;
                            case "catblogprint"://分类日志打印
                                 json = WanerDaoJSON.GetSuccessJson(WanerDaoPrint.getPrintTemplete(context.Request.Form.ToString(), new WanerDaoBLL.Person.WanerDaoBlogManager().SearchOfIndexDs(dic)));
                                 break;
                            case "personalphotoprint"://单张照片打印 
                                 json = WanerDaoJSON.GetSuccessJson(WanerDaoPrint.getPrintTemplete(context.Request.Form.ToString(), null));
                                 break;
                            case "personalphotoalubmprint"://相册照片打印
                                 json = WanerDaoJSON.GetSuccessJson(WanerDaoPrint.getPrintTemplete(context.Request.Form.ToString(), new WanerDaoBLL.Person.WanerDaoImageManager().GetPersonalImagesByFoldId(dic)));
                                 break;
                            #endregion

                            #region 帮助信息
                            case "help":
                                json = getHelp(dic["key"].ToString());
                                break;
                            #endregion
                                
                            #region 分页处理
                            case "demopagiation":
                                GetPaginationParams("unitlist", "unit_name", " and language_id='a1c3e20e-f181-11e0-8a53-00306701b527' and active=1", "", "0", ref dic);
                                json = common.WanerDaoPagination(dic);
                                break;
                            #endregion

                            #region 侧栏插件
                            case "sidebar":
                                //string strTalbeName ="activity";//侧栏显示数据的表名
                                //string strFldname = "active_name,begin_datetime,end_datetime,join_member_nbr,max_nbr,title"; //侧栏显示数据的列名
                                //string strWhere ="and is_visible=1 and active=1";//查询表的where 条件
                                //string strFldSordId ="update_date "; //查询表的排序ID
                                //string strSort = "1";
                                json = common.GetWanerDaoSidebar(dic);
                                break;
                            #endregion

                            #region 国家、省州、市县
                            case "country":
                                PaginationModel cpm = new PaginationModel();
                                cpm.tablename = "country";
                                cpm.pageSize = dic["pageSize"].ToString();
                                cpm.pagecurrent = dic["pagecurrent"].ToString();
                                cpm.sort = "1";
                                cpm.fldSortId = "country_name";
                                cpm.fldName = "country_id,country_name";
                                cpm.where = " and language_id='" + languageID + "' ";
                                cpm.where += @"and active=1 and country_name !='' ";
                                //cpm.where += @"and active=1 and country_name !=''  and left(country_initial,1)  REGEXP '[" + dic["p"].ToString().ToUpper() + "]' ";
                                //pm.fldName=
                                json = common.WanerDaoPagination(cpm);
                                break;
                            case "state":
                                PaginationModel spm = new PaginationModel();
                                spm.tablename = "state";
                                spm.pageSize = dic["pageSize"].ToString();
                                spm.pagecurrent = dic["pagecurrent"].ToString();
                                spm.sort = "1";
                                spm.fldSortId = "state_name";
                                spm.fldName = "state_id,state_name";
                                spm.where = " and country_id='" + dic["pid"].ToString() + "' ";
                                spm.where += @"and active=1 and state_name !=''  and if(STRCMP(CHAR(INTERVAL(CONV(HEX(left(state_name,1)),16,10),
      0xB0A1,0xB0C5,0xB2C1,0xB4EE,0xB6EA,0xB7A2,0xB8C1,0xB9FE,
      0xBBF7,0xBBF7,0xBFA6,0xC0AC,0xC2E8,0xC4C3,0xC5B6,0xC5BE,
      0xC6DA,0xC8BB,0xC8F6,0xCBFA,0xCDDA,0xCDDA,0xCDDA,0xCEF4,
      0xD1B9,0xD4D1)+64) ,'@'),CONVERT(ELT(INTERVAL(CONV(HEX(left(CONVERT(state_name USING gbk),1)),16,10),
      0xB0A1,0xB0C5,0xB2C1,0xB4EE,0xB6EA,0xB7A2,0xB8C1,0xB9FE,0xBBF7,0xBFA6,0xC0AC,
      0xC2E8,0xC4C3,0xC5B6,0xC5BE,0xC6DA,0xC8BB,0xC8F6,0xCBFA,0xCDDA,0xCEF4,0xD1B9,0xD4D1),
      'A','B','C','D','E','F','G','H','J','K','L','M','N','O','P','Q','R','S','T','W','X','Y','Z') USING UTF8),left(state_name,1))  REGEXP '[" + dic["p"].ToString().ToUpper() + "]' ";
                                //pm.fldName=
                                json = common.WanerDaoPagination(spm);
                                break;
                            //case "area":
                            //    json = common.WanerDaoArea(dic);
                            //    break;
                            case "city":
                                PaginationModel pm = new PaginationModel();
                                pm.tablename = "city";
                                pm.pageSize = dic["pageSize"].ToString();
                                pm.pagecurrent = dic["pagecurrent"].ToString();
                                pm.sort = "1";
                                pm.fldSortId = "city_name";
                                pm.fldName = "city_id,city_name";
                                pm.where = " and state_id='" + dic["pid"].ToString() + "' ";
                                pm.where+=@" and active=1 and city_name !=''  and if(strcmp(CHAR(INTERVAL(CONV(HEX(left(city_name,1)),16,10),0xB0A1,0xB0C5,0xB2C1,0xB4EE,0xB6EA,0xB7A2,0xB8C1,0xB9FE,0xBBF7,0xBBF7,0xBFA6,0xC0AC,0xC2E8,0xC4C3,0xC5B6,0xC5BE,0xC6DA,0xC8BB,0xC8F6,0xCBFA,0xCDDA,0xCDDA,0xCDDA,0xCEF4,   0xD1B9,0xD4D1)+64),'@'),CONVERT(ELT(INTERVAL(CONV(HEX(left(CONVERT(city_name USING gbk),1)),16,10),
      0xB0A1,0xB0C5,0xB2C1,0xB4EE,0xB6EA,0xB7A2,0xB8C1,0xB9FE,0xBBF7,0xBFA6,0xC0AC,
      0xC2E8,0xC4C3,0xC5B6,0xC5BE,0xC6DA,0xC8BB,0xC8F6,0xCBFA,0xCDDA,0xCEF4,0xD1B9,0xD4D1),
      'A','B','C','D','E','F','G','H','J','K','L','M','N','O','P','Q','R','S','T','W','X','Y','Z') USING UTF8),left(city_name,1))  REGEXP '["+dic["p"].ToString().ToUpper()+"]' ";
                                //pm.fldName=
                                json = common.WanerDaoPagination(pm);
                                break;
                            //case "area":
                            //    json = common.WanerDaoArea(dic);
                            //    break;
                            #endregion

                            #region 圈子
                          
                            case "group":
                                json = common.WanerDaoSearchGroup();
                                break;
                            //圈子讨论回复
                            case "getgroupreply":
                                tablename = "discusscomments d left join personalprofile p on d.user_id = p.user_id";
                                sreachname = "  d.id,d.user_id,p.name as user_name,d.content as replaycontent,d.comments_date as replaytime,p.logo_small_path as image_path ";
                                sreachWhere = " and d.active = 1 and d.gourp_posts_id ='" + dic["postid"].ToString() + "'";

                                GetPaginationParams(tablename, sreachname, sreachWhere, "d.comments_date", "0", ref dic);
                                json = common.WanerDaoPagination(dic);
                                break;
                            //感兴趣的圈子
                            case "searchgrouprelateactivity":
                                 tablename = "GroupInfo";
                                 sreachname = "  id,group_name,member_nbr,activity_score,follow_score,logo_path,summary ";
                                 sreachWhere = " and summary like '%" + dic["category_name"].ToString() + "%' or description like '%" + dic["category_name"].ToString() + "%'";

                                 GetPaginationParams(tablename, sreachname, sreachWhere, "", "0", ref dic);
                                json = common.WanerDaoPagination(dic);
                                break;
                                //我的圈子
                            case "mygrouplist":
                                tablename = " GroupMember gm inner join GroupInfo gi on gi.id = gm.group_id inner join GroupCategory gc on gi.category_id = gc.id left join personalgroupfollow fg on fg.attention_id = gi.id and fg.user_id = gm.user_id  and fg.active = 1"+
                                            " left join (SELECT group_concat(gr.level) as level,gmr.group_id from  groupmanagerole gmr inner join GroupRole gr on gr.id = gmr.role_level where  gmr.user_id='" + GetCurrentUserID() + "' and gr.language_id = '" + languageID + "'  and gmr.active = 1) as ur on ur.group_id = gm.group_id";
                                sreachname = " distinct gi.id,gi.group_name as name,gi.follow_score,gi.activity_score,gi.logo_path,gi.member_nbr,gi.description as desct, gc.category_name,fg.id AS followid,ur.level  ";

                                sreachWhere = " and gm.user_id =  '" + GetCurrentUserID() + "' and gm.active=1 and gi.active =1  and gm.is_authorized = 1  and gc.language_id = '" + languageID + "' and  ( gi.join_fee = 0 or gm.is_pay = 1)";
                                if (dic.ContainsKey("group_name"))
                                {
                                    if (dic["group_name"].ToString() != "")
                                    {
                                        sreachWhere += " and gi.group_name like '%" + dic["group_name"].ToString() + "%'";
                                    }
                                }
                                if (dic.ContainsKey("summary") )
                                {
                                    if (dic["summary"].ToString() != "")
                                    {
                                        sreachWhere += " and gi.summary like '%" + dic["summary"].ToString() + "%'";
                                    }
                                }
                                GetPaginationParams(tablename, sreachname, sreachWhere, "", "0", ref dic);
                                json = common.WanerDaoPagination(dic);
                                break;
                                //按圈子ID查询出圈子成员
                            case "mygroupmemeberpopup":
                                 tablename = " GroupMember T0 inner join PersonalProfile T3 on T0.user_id = T3.user_id ";
                                sreachname = " T0.user_id as id ,T3.name as value,T3.logo_small_path ";
                                if (!dic.ContainsKey("group_id"))
                                {
                                    Dictionary<string, string> temp = WanerDaoCookie.GetCookieValues("wanerdaomygroupID");
                                    if (temp != null)
                                    {
                                        sreachWhere = " and  T0.group_id =  '" + temp["mygroupID"].ToString() + "' and T0.is_authorized = 1 and  T0.active = 1 ";
                                    }
                                    else
                                    {
                                        sreachWhere = " and T0.is_authorized = 1 and  T0.active = 1 ";
                                    }
                                    //HttpContext.Current.Session["mygroupID"]);
                                }
                                else
                                {
                                    sreachWhere = " and  T0.group_id =  '" + dic["group_id"].ToString() + "' and T0.is_authorized = 1 and  T0.active = 1 ";
                                }
                                if (dic.ContainsKey("oneself"))
                                {
                                    if (dic["oneself"].ToString().ToLower() == "true")
                                    {
                                        sreachWhere += " and T0.user_id <>'" + GetCurrentUserID() + "'";
                                    }
                                   
                                }
                                if (dic.ContainsKey("groupcatory"))
                                {
                                    if (dic["groupcatory"].ToString() == "1")
                                    {
                                        sreachWhere += " and T0.expire_date >'" + DateTime.Now +"'";
                                    }
                                    else {
                                        sreachWhere += " and T0.expire_date <'" + DateTime.Now + "'";
                                    }
                                }
                                if (dic.ContainsKey("name"))
                                {
                                    if (dic["name"].ToString() != "")
                                    {
                                        sreachWhere += " and T3.name like '%" + dic["name"].ToString() + "%'";
                                    }

                                }
                                GetPaginationParams(tablename, sreachname, sreachWhere, " ", "1", ref dic);
                                json = common.WanerDaoPagination(dic);
                                break;
                            //按圈子ID查询出圈子待缴费成员
                            case "groupmemeberexpend":
                                tablename = " GroupMember T0 inner join PersonalProfile T3 on T0.user_id = T3.user_id ";
                                sreachname = " T0.user_id as id ,T3.name as value,T3.logo_small_path ";
                                sreachWhere = " and  T0.group_id =  '" + dic["group_id"].ToString() + "' and T0.expire_date <'"+DateTime.Now+"' and T0.is_authorized = 1 and  T0.active = 1 ";
                                if (dic.ContainsKey("name"))
                                {
                                    if (dic["name"].ToString() != "")
                                    {
                                        sreachWhere += " and T3.name like '%" + dic["name"].ToString() + "%'";
                                    }
                                }
                                GetPaginationParams(tablename, sreachname, sreachWhere, " ", "1", ref dic);
                                json = common.WanerDaoPagination(dic);
                                break;
                                //我的圈子成员
                            case "mygroupmemeber":
                                tablename = " GroupMember T0 inner join GroupRole T1  on T0.role_id = T1.id inner join PersonalProfile T3 on T0.user_id = T3.user_id left join personalnamecard t4 on t3.user_id = t4.user_id" +
                                            " left join InboxInviteMessage t5 on  t0.user_id = t5.user_id and t5.active =1 and ifnull(t5.is_delete,0) = 0 and t5.from_id = '" + GetCurrentUserID() + "' and t5.msg_type = 3" +
                                            " left join personalfriends Tp on t0.user_id = Tp.relation_from_id  and Tp.relation_to_id =  '" + GetCurrentUserID() + "' and Tp.active =1"+
                                            " left join personalfriendsfollow T6 on T6.attention_id = T0.user_id  and T6.active = 1 and T6.user_id ='" + GetCurrentUserID() + "'" +
                                           " left join (SELECT g2.user_id,group_concat(case g2.role_level when 'd8a302bd-15fc-11e1-bb4e-000c295f9365' then 'pic_poll1.jpg' when 'd8cd3da4-15fc-11e1-bb4e-000c295f9365' then 'pic_poll2.jpg' when 'd899747f-15fc-11e1-bb4e-000c295f9365'  then 'pic_poll4.png' else '' end ) as roleimg from  groupmanagerole as g2  where g2.group_id ='" + dic["group_id"].ToString() + "' and g2.active = 1 group by g2.user_id) as urole on T0.user_id = urole.user_id" +
                                " left join (SELECT gm.user_id ,group_concat( gr.level) as role_level FROM groupmember gm left join groupmanagerole gmr on gm.user_id = gmr.user_id " +
                                " inner join GroupRole gr on gr.id = gmr.role_level where gm.group_id ='" + dic["group_id"].ToString() + "' and  gmr.group_id ='" + dic["group_id"].ToString() + "' and  gm.active = 1 and gmr.active = 1 group by gm.user_id) as leveltable on T0.user_id = leveltable.user_id ";

                                sreachname = "  T0.id,T0.user_id,T0.is_authorized,T0.is_pay,T0.role_id,t5.id as inboxid,Tp.id as isfriend,ifnull(T6.attention_id,'N') as attention_id, " +

                                             " T3.name,T3.logo_small_path,leveltable.role_level,urole.roleimg," +
                                             " case ifnull(t4.is_display_current_place,1) when '1' then t4.current_place else '' end  as current_place," +
                                             " case ifnull(t4.is_display_home,1) when '1' then t4.home else '' end  as home," +
                                             " case ifnull(t4.is_display_school,1) when '1' then t4.school else '' end  as school," +
                                             " case ifnull(t4.is_display_work,1) when '1' then t4.work_place else '' end  as work_place," +
                                             " case ifnull(t4.is_display_contellation,1) when '1' then t4.contellation else '' end  as displaycontellation, " +
                                             " case T0.user_id  when '" + GetCurrentUserID() + "'  then '1' else '2' end as userLevel," +
                                             " case  find_in_set('0',ifnull( leveltable.role_level,5)) when  0  then '1' else '0' end as rolelevel0," +
                                             " case  find_in_set('1', ifnull( leveltable.role_level,5)) when  '0'  then '1' else '0' end as rolelevel1," +
                                             " case  find_in_set('2', ifnull( leveltable.role_level,5)) when  '0'  then '1' else '0' end as rolelevel2," +
                                             " case  find_in_set('3', ifnull( leveltable.role_level,5)) when  '0'  then '1' else '0' end as rolelevel3," +
                                             " case  find_in_set('4', ifnull( leveltable.role_level,5)) when  '0'  then '1' else '0' end as rolelevel4";
                                sreachWhere = " and  T0.group_id =  '" + dic["group_id"].ToString() + "' and  T0.active = 1 and T1.language_id='" + languageID + "'";
                                if (dic.ContainsKey("name"))
                                {
                                    if (dic["name"].ToString() != "")
                                    {
                                        sreachWhere += " and T3.name like '%" + dic["name"].ToString() + "%'";
                                    }
                                }
                                GetPaginationParams(tablename, sreachname, sreachWhere, " T0.is_authorized,userLevel,rolelevel0,rolelevel1,rolelevel2,rolelevel3,rolelevel4 ,T3.name", "1", ref dic);
                                json = common.WanerDaoPagination(dic);
                                break;
                            //圈子查询
                            case "groupsearch":
                                tablename = " groupinfo gi left join GroupCategory gc on gi.category_id = gc.id left join GroupMember gm on gm.group_id = gi.id and gm.active = 1 and gm.user_id = '" + GetCurrentUserID() + "'";
                                sreachname = "  gi.id,gi.logo_path,gi.group_name,gi.member_nbr,gi.activity_score,gi.is_kick_protected,gi.follow_score,gi.summary,gi.join_method_id,gi.join_fee,gc.category_name,gm.is_authorized,gm.is_pay ";
                                sortStr = "gi.group_name";
                                sortId = "1";
                                sreachWhere += " and gi.active = 1 and gi.is_public = 1 and gc.language_id = '" + languageID + "'";
                                 if (dic["group_name"].ToString() != "") {
                                     sreachWhere += " and gi.group_name like '%" + dic["group_name"].ToString() + "%'";
                                 }
                                 if (dic["category_id"].ToString() != "") {
                                     sreachWhere += " and gi.category_id = '" + dic["category_id"].ToString() + "'";
                                 }
                                 if (dic["hobbysearch"].ToString().ToLower() == "true") {
                                     sreachWhere += " and gi.summary like '%" + dic["hobby"].ToString() + "%'";
                                     if (dic["hobby"].ToString() == "")
                                     {
                                         sortId = "0";
                                         sortStr = "gi. member_nbr,gi.follow_score,gi.activity_score";
                                     }
                                 }
                                 if (dic["friendLikes"].ToString() != "") {
                                     sreachWhere += " and gi.id in ('" + dic["friendLikes"].ToString() + "')";
                                 }
                                 if (dic["myGroup"].ToString() != "") {
                                     sreachWhere += " and gi.id not in (" + dic["myGroup"].ToString() + ")";
                                 }
                                 GetPaginationParams(tablename, sreachname, sreachWhere, sortStr , sortId, ref dic);
                                json = common.WanerDaoPagination(dic);
                                break;
                                //查询流水账
                            case "groupmoneyflow":
                                tablename = " GroupMoneyFlow gmf inner join PersonalProfile pp on gmf.money_ope_id = pp.user_id left join ("
                                            + " SELECT  money_flow_id ,GROUP_CONCAT(store_path) AS store_path,GROUP_CONCAT(file_name) AS file_name FROM groupmoneyflowattachedfile where group_id='" + dic["group_id"].ToString() + "' order by money_flow_id ) as filetable on filetable.money_flow_id = gmf.id";
                                sreachname = "  gmf.id,gmf.item_name,gmf.description,gmf.item_money,pp.name,date_format( gmf.ope_date,'%Y-%m-%d') as 'ope_date' ,filetable.store_path,filetable.file_name";
                                sreachWhere = " and gmf.group_id='" + dic["group_id"].ToString() + "'";

                                if (dic.ContainsKey("sre_name") && dic["sre_name"].ToString() != "")
                                {
                                    sreachWhere += " and gmf.item_name  like '%" + dic["sre_name"].ToString() + "%'";
                                 }
                                if (dic.ContainsKey("sre_id") && dic["sre_id"].ToString() != "")
                                {
                                    sreachWhere += " and gmf.id like '%" + dic["sre_id"].ToString() + "%'";
                                 }
                                if (dic.ContainsKey("start_time") && dic["start_time"].ToString() != "")
                                {
                                    sreachWhere += " and gmf.ope_date >= '" +DateTime.Parse( dic["start_time"].ToString()) + "'";
                                }
                                if (dic.ContainsKey("end_time")&& dic["end_time"].ToString() != "")
                                {
                                    sreachWhere += " and gmf.ope_date <= '" + DateTime.Parse(dic["end_time"].ToString()).AddDays(1) + "'";
                                }
                                GetPaginationParams(tablename, sreachname, sreachWhere, "gmf.id", "0", ref dic);
                                json = common.WanerDaoPagination(dic);

                                break;
                            //查询圈子讨论话题
                            case "groupdiscuss":
                                tablename = " GroupDiscuss gd inner join PersonalProfile pp on pp.user_id = gd.post_id ";
                                sreachname = "  pp.logo_small_path,pp.name,pp.user_id,gd.id,gd.subject,gd.content,gd.post_date ";
                                sreachWhere = " and gd.active = 1 and  gd.group_id='" + dic["group_id"].ToString() + "'";

                                if (dic.ContainsKey("subject")&& dic["subject"].ToString() != "")
                                {
                                    sreachWhere += " and gd.subject  like '%" + dic["subject"].ToString() + "%'";
                                }

                                GetPaginationParams(tablename, sreachname, sreachWhere, "gd.post_date", "0", ref dic);
                                json = common.WanerDaoPagination(dic);

                                break;
                            //查询待处理事件
                            case "waitevent":

                                tablename = " (SELECT distinct g.id,ge.id as enevtid,ge.event_name,pp.name,g.link_value1,g.link_value2,g.link_value3,gi.manage_type_id," +
                                            "  (case gp.id  when '" + WanerDaoModule.Config.WanerDaoFilterReader.GetParam("DecideEvent").Trim() + "' then 'T' else 'F' end ) as process,gp.process_name, date_format( g.begin_date,'%m/%d/%Y') as 'begin_date',g.title,g.content,g.positive,g.negative,gv.id as gvid " +
                                            " FROM groupeventrecords g inner join PersonalProfile pp on pp.user_id = g.create_id inner join groupinfo as gi on gi.id = g.group_id" +
                                            " inner join GroupEvent ge on g.event_id = ge.id inner join groupeventprocess gp on gp.id = g.process_status " +
                                            " left join GroupEventVoteHistory gv on gv.event_id = g.id and gv.user_id = '" + dic["user_id"].ToString() + "'" +
                                            " where g.active =1 and g.group_id = '" + dic["group_id"].ToString() + "' and ge.language_id='" + languageID + "' and gp.language_id='" + languageID + "'"; 
                                           
                                if(dic["type"]!=null){
                                    if (dic["type"].ToString() == "1" || dic["type"].ToString() == "5")
                                    {
                                       tablename += " and class_id not in (select ger.class_id from groupeventrecords ger " +
                                            " inner join GroupEventVoteHistory gevh on gevh.event_id = ger.id where gevh.user_id = '" + dic["user_id"].ToString() + "'  and ger.group_id ='" + dic["group_id"].ToString() + "') ";
                                    }
                                    else if (dic["type"].ToString() == "3") {
                                        tablename += " and r.event_id in ('364ef1eb-8a16-11e1-8de6-101f74b66417','3651d57b-8a16-11e1-8de6-101f74b66417','3659eb18-8a16-11e1-8de6-101f74b66417','366870f6-8a16-11e1-8de6-101f74b66417','366d68da-8a16-11e1-8de6-101f74b66417')";
                                    }
                                    else if (dic["type"].ToString() == "4")
                                    {
                                        tablename += " and r.event_id in ('365e8996-8a16-11e1-8de6-101f74b66417','36555607-8a16-11e1-8de6-101f74b66417','366870f6-8a16-11e1-8de6-101f74b66417','366d68da-8a16-11e1-8de6-101f74b66417')";
                                    }
                                    else if (dic["type"].ToString() == "6")
                                    {
                                        tablename += " and r.event_id in ('364ef1eb-8a16-11e1-8de6-101f74b66417','3659eb18-8a16-11e1-8de6-101f74b66417')";
                                    }
                                    else if (dic["type"].ToString() == "7")
                                    {
                                        tablename += " and r.event_id in ('368a47de-8a16-11e1-8de6-101f74b66417','36858745-8a16-11e1-8de6-101f74b66417')";
                                    } 
                                }
                                if (dic.ContainsKey("sreachKey") && dic["sreachKey"].ToString() != "")
                                {
                                    tablename += " and ( event_name like '%" + dic["sreachKey"].ToString() + "%' or title like '%" + dic["sreachKey"].ToString() + "%' )";
                                }

                                if (dic.ContainsKey("record") && dic["record"].ToString() == "true")
                                {
                                    tablename += " and  g.process_status = '" + WanerDaoModule.Config.WanerDaoFilterReader.GetParam("EventEnd").Trim() + "'";
                                }else{
                                    tablename += " and ( g.process_status = '" + WanerDaoModule.Config.WanerDaoFilterReader.GetParam("DecideEvent").Trim() + "' or g.process_status = '" + WanerDaoModule.Config.WanerDaoFilterReader.GetParam("DecidePublic").Trim() + "')";
                                }

                                tablename +=" ) as tab";

                                sreachname = "  tab.id,tab.enevtid,tab.event_name,tab.name,tab.process,tab.process_name,tab.begin_date,tab.title,tab.content,tab.positive,tab.negative,tab.gvid,tab.manage_type_id,tab.link_value1,tab.link_value2,tab.link_value3 ";
                               
                                GetPaginationParams(tablename, sreachname, sreachWhere, "", "0", ref dic);
                                json = common.WanerDaoPagination(dic);

                                break;
                            #endregion

                            #region 礼品
                            case "giftlist":
                                IWanerDaoGift iwdg = new WanerDao2.WanerDaoBLL.Relation.WanerDaoGift() as IWanerDaoGift;
                                json = iwdg.SearchGiftMarket(dic);
                                break;
                            case "getmygift":
                                IWanerDaoGift iwdg2 = new WanerDao2.WanerDaoBLL.Relation.WanerDaoGift() as IWanerDaoGift;
                                json = iwdg2.GetExistsGift(dic);
                                break;
                            #endregion

                            #region 好友
                            case "friend":
                                json = common.WanerDaoSearchFriend();
                                break;

                            case "searchfriends":

                                tablename = " personalprofile t0  left join personalinterests t1 on t0.user_id = t1.user_id left join personalnamecard t2 on t0.user_id = t2.user_id"+
                                            " left join PersonalNameCard PNC on t0.user_id = PNC.user_id "+
                                            " left join InboxInviteMessage t3 on  t0.user_id = t3.user_id and t3.active =1 and ifnull(t3.is_delete,0) = 0 and t3.from_id = '" + GetCurrentUserID() + "' and t3.msg_type = 3" +
                                           // " left join PersonalFriends t4 on t0.user_id = t4.relation_from_id left join ( "+
                                            " left join ( " +
                                           " SELECT user_id,DATE(CONCAT(birthday_year,'-',birthday_month,'-',birthday_day)) AS birthday FROM personalprofile ) as tab_birthday"+
                                            " on tab_birthday.user_id = t0.user_id";
                                sreachname = "  t0.user_id as id,t0.name,t0.logo_small_path as logo_path,t3.id as inboxid,case ifnull(t2.is_display_current_place,1) when '1' then t2.current_place else '' end  as current_place" +
                                             ",case ifnull(t2.is_display_home,1) when '1' then t2.home else '' end  as home,case ifnull(t2.is_display_contellation,1) when '1' then t2.contellation else '' end  as displaycontellation"+
                                             ",case ifnull(t2.is_display_school,1) when '1' then t2.school else '' end  as school,case ifnull(t2.is_display_work,1) when '1' then t2.work_place else '' end  as work_place ";
                                sreachWhere += "  and PNC.is_available = 1 and  t0.user_id !='" + GetCurrentUserID() + "' and t0.user_id not in (select  relation_to_id from  PersonalFriends where relation_from_id = '" + GetCurrentUserID() + "' and active = 1) ";
                            //关键字
                                if (dic["name"].ToString() != "") {
                                    sreachWhere += " and t0.name like '%" + dic["name"].ToString() + "%' ";
                                }
                                //性别
                                if (dic["gender"].ToString() != "") {
                                    sreachWhere += " and t0.gender = '" + dic["gender"].ToString() + "' ";
                                }
                                //年龄
                                if (dic["birthday"].ToString() != "")
                                {
                                    string age = dic["birthday"].ToString();
                                    DateTime now = System.DateTime.Now;
                                    switch (age)
                                    {
                                        //20以下
                                        case "1": sreachWhere += " and tab_birthday.birthday>='" + now.AddYears(-20) + "'";
                                            break;
                                        //20-25
                                        case "2": sreachWhere += " and tab_birthday.birthday>='" + now.AddYears(-25) + "' and tab_birthday.birthday<='" + now.AddYears(-20) + "'";
                                            break;
                                        //25-30
                                        case "3": sreachWhere += " and tab_birthday.birthday>='" + now.AddYears(-30) + "' and tab_birthday.birthday<='" + now.AddYears(-25) + "'";
                                            break;
                                        //30-35
                                        case "4": sreachWhere += " and tab_birthday.birthday>='" + now.AddYears(-35) + "' and tab_birthday.birthday<='" + now.AddYears(-30) + "'";
                                            break;
                                        //35-40
                                        case "5": sreachWhere += " and tab_birthday.birthday>='" + now.AddYears(-40) + "' and tab_birthday.birthday<='" + now.AddYears(-35) + "'";
                                            break;
                                        //40以上
                                        case "6": sreachWhere += " and tab_birthday.birthday<='" + now.AddYears(-40) + "'";
                                            break;
                                    }

                                }
                                //星座
                                if (dic["constellation"].ToString() != "")
                                {
                                    sreachWhere += " and t0.constellation = '" + dic["constellation"].ToString() + "' ";
                                }

                                //所在国
                                if (dic["current_Country"].ToString() != "")
                                {
                                    sreachWhere += " and t0.current_Country_id ='" + dic["current_Country"].ToString() + "'";
                                }
                                //所在州
                                if (dic["current_State"].ToString() != "")
                                {
                                    sreachWhere += " and t0.current_State_id ='" + dic["current_State"].ToString() + "'";
                                }
                                //所在城市
                                if (dic["current_City"].ToString() != "")
                                {
                                    sreachWhere += " and t0.current_City_id ='" + dic["current_City"].ToString() + "'";
                                }
                                //出生国
                                if (dic["birth_Country"].ToString() != "")
                                {
                                    sreachWhere += " and birth_Country_id ='" + dic["birth_Country"].ToString() + "'";
                                }
                                //出生州
                                if (dic["birth_State"].ToString() != "")
                                {
                                    sreachWhere += " and t0.birth_State_id ='" + dic["birth_State"].ToString() + "'";
                                }
                                //出生城市
                                if (dic["birth_City"].ToString() != "")
                                {
                                    sreachWhere += " and t0.birth_City_id ='" + dic["birth_City"].ToString() + "'";
                                }

                                //兴趣爱好
                                if (dic["hobby"].ToString() != "" && dic["hobby"].ToString() != "请输入兴趣爱好")
                                {
                                    sreachWhere += " and ( t1.hobby like '%" + dic["hobby"].ToString().Trim() + "%' or t1.sport like '%" + dic["hobby"].ToString().Trim() + "%')";
                                }

                                GetPaginationParams(tablename, sreachname, sreachWhere, "t0.name", "0", ref dic);
                                json = common.WanerDaoPagination(dic);
                                break;
                            #endregion

                            #region  查询我的好友信息
                            case "getfriendslist":
                                tablename = " personalprofile T0 inner join personalfriends T1 on T0.user_id = T1.relation_to_id  inner join friendsclass T2 on T1.class_id = T2.class_id left join personalfriendsfollow T3 on T3.attention_id = T0.user_id  and T3.active = 1 and T3.user_id ='" + GetCurrentUserID() + "'";
                                 sreachname = " T0.user_id,T0.name,T0.logo_small_path,T1.class_id,T2.relation_name, ifnull(T3.attention_id,'N') as attention_id ";
                                 sreachWhere = " and T1.relation_from_id ='" + GetCurrentUserID() + "' and T1.active = 1 and T0.name like '%" + dic["titOrContent"].ToString() + "%' ";
                                if (dic["class_id"].ToString() != "")
                                {
                                    sreachWhere += " and T1.class_id = '" + dic["class_id"].ToString() + "'";
                                }
                                if (dic["pyKey"].ToString() != "")
                                {
                                    sreachWhere += " and ELT(INTERVAL(CONV(HEX(left(CONVERT(T0.name USING gbk),1)),16,10),0xB0A1,0xB0C5,0xB2C1,0xB4EE,0xB6EA,0xB7A2,0xB8C1,0xB9FE,0xBBF7,0xBFA6,0xC0AC,0xC2E8,0xC4C3,0xC5B6,0xC5BE,0xC6DA,0xC8BB,0xC8F6,0xCBFA,0xCDDA,0xCEF4,0xD1B9,0xD4D1),'A','B','C','D','E','F','G','H','J','K','L','M','N','O','P','Q','R','S','T','W','X','Y','Z') ='" + dic["pyKey"].ToString() + "'";
                                }
                                GetPaginationParams(tablename, sreachname, sreachWhere, "", "0", ref dic);
                                json = common.WanerDaoPagination(dic);
                                break;
                            #endregion

                            #region 活动查找

                            #region 活动查找
                            // 复杂条件查找活动存储过程(分页)
                            case "searchactivitybymanycondition":
                                string _queryFieldNames = "id,activity_name,address,max_nbr,join_member_nbr,prepay_nbr,datetime,begin_datetime,end_datetime,report_datetime,description,original_id,name,logo_small_path";
                                GetSearchActivityByManyConditionsParams("activity,PersonalProfile", _queryFieldNames, "", "activity.original_id=PersonalProfile.user_id and activity.is_public=1 and  activity.end_datetime>now()", "activity_name", 0, ref dic);
                                json = common.WanerDaoSearchActivityByManyCondition(dic);
                                break;
                            case "currentuserjoinactivitypage"://当前用户参加的活动
                                WanerDaoPersonSecurity ws = new WanerDaoPersonSecurity();
                                dic.Add("user_id",GetCurrentUserID());
                                //dic.Add("user_id", "111");
                                CreateUserJoinActivityPageDic(dic);
                                json = common.WanerDaoPagination(dic);
                                break;
                            case "userjoinactivitypage"://指定用户参加的活动
                                CreateUserJoinActivityPageDic(dic);
                                json = common.WanerDaoPagination(dic);
                                break;
                            case "activityitempagesearchactivity"://activityitempage页
                                
                                string _itemCategoryID = GetAndRemoveValue("categoryid", dic);
                                activity = new WanerDaoActivity();
                                activitysectionpage _activitysectionpage=activity.SelectActivitySectionPageByID(_itemCategoryID);
                                _itemCategoryID = _activitysectionpage != null ? _activitysectionpage .category_id: "";
                                string itemWhere = " and exists (select 1 from ActivityCategory  ac where  a.id=ac.activity_id and FIND_IN_SET(ac.category_id, f_GetCategoryChildList('" + _itemCategoryID + "'," + _activitysectionpage .section_type_id+ "))) ";
                                //GetPaginationParams("activity a left join personalprofile p on a.original_id=p.user_id", "a.id,a.activity_name,activity_link,original_id,datetime,description,prepay_nbr,max_nbr,join_member_nbr,address,begin_datetime,end_datetime,datetime as report_datetime,report_datetime report_end_datetime,(select SUBSTRING_INDEX(GROUP_CONCAT(acs.category_name),',',3)  from ActivityCategory ac,activitycategorysettings acs where ac.category_id=acs.id and ac.activity_id=a.id and ac.active=1 and acs.language_id='" + CommonContext.GetClientLanguage() + "' ) category_names ,p.name,p.logo_small_path", " and a.active=1 and a.is_create=1 and a.is_visible=1 " + itemWhere, "begin_datetime", "0", ref dic);
                                json = ActivityPageSearchActivity(dic, itemWhere);
                                break;
                            case "activityseasonpagesearchactivity"://activityseasonpage页
                                string seasonWhere = " and exists (select 1 from ActivityCategory  ac,activitycategorysettings acs where ac.category_id=acs.id and a.id=ac.activity_id and acs.section_type_id=2) ";
                                //GetPaginationParams("activity a", "a.id,a.activity_name,activity_link,original_id,datetime,description,prepay_nbr,max_nbr,join_member_nbr,address,begin_datetime,end_datetime,datetime as report_datetime,report_datetime report_end_datetime,(select SUBSTRING_INDEX(GROUP_CONCAT(acs.category_name),',',3)  from ActivityCategory ac,activitycategorysettings acs where ac.category_id=acs.id and ac.activity_id=a.id and ac.active=1 and acs.language_id='" + CommonContext.GetClientLanguage() + "' ) category_names ", " and a.active=1 and a.is_create=1 and a.is_visible=1 " + seasonWhere, "begin_datetime", "0", ref dic);
                                json = ActivityPageSearchActivity(dic, seasonWhere);
                                break;
                            case "activitydefinepagesearchactivity"://activitydefinepage页
                                string defineWhere = " and exists (select 1 from ActivityCategory  ac,activitycategorysettings acs where ac.category_id=acs.id and a.id=ac.activity_id and acs.section_type_id=3) ";
                                //GetPaginationParams("activity a", "a.id,a.activity_name,activity_link,original_id,datetime,description,prepay_nbr,max_nbr,join_member_nbr,address,begin_datetime,end_datetime,datetime as report_datetime,report_datetime report_end_datetime,(select SUBSTRING_INDEX(GROUP_CONCAT(acs.category_name),',',3)  from ActivityCategory ac,activitycategorysettings acs where ac.category_id=acs.id and ac.activity_id=a.id and ac.active=1 and acs.language_id='" + CommonContext.GetClientLanguage() + "' ) category_names ", " and a.active=1 and a.is_create=1 and a.is_visible=1 " + defineWhere, "begin_datetime", "0", ref dic);
                                json = ActivityPageSearchActivity(dic, defineWhere);
                                break;
                            

                            case "getactivitybygroupidandactivityname"://圈子活动查询分页 胥鑫的接口
                                string _activity_name = GetAndRemoveValue("activity_name", dic).Trim();
                                if (!string.IsNullOrEmpty(_activity_name))
                                {
                                    _activity_name = " and activity_name like '%" + _activity_name + "%'";
                                }
                                GetPaginationParams("activity", "id,activity_name,activity_link,address,join_member_nbr,prepay_nbr,begin_datetime,description,(select sum(budget_money) from ActivityBudget b where b.active=1 and  b.activity_id=activity.id) budget_cost ", _activity_name + " and create_type_id='1' and active=1 and create_id='" + GetAndRemoveValue("group_id", dic).Trim() + "'", "begin_datetime", "0", ref dic);
                                json = common.WanerDaoPagination(dic);
                                break;
                            case "getactivitybygroupidandactivitynameishistory"://查询圈子活动信息 胥鑫的接口
                                string _aciivity_name_condition = GetAndRemoveValue("activity_name", dic).Trim();
                                if (!string.IsNullOrEmpty(_aciivity_name_condition))
                                {
                                    _aciivity_name_condition = " and activity_name like '%" + _aciivity_name_condition + "%'";
                                }
                                string _ishistory = GetAndRemoveValue("ishistory", dic).Trim();// 0:未开始或进行中的活动  1：历史活动
                                string _end_datetime = " and end_datetime>now() ";
                                if (_ishistory == "1")
                                {
                                    _end_datetime = " and end_datetime<=now() ";
                                }
                                GetPaginationParams("activity", "id,activity_name,begin_datetime,address,join_member_nbr,100 actualcost,(select sum(budget_money) from ActivityBudget b where b.active=1 and  b.activity_id=activity.id) budget_cost ", _aciivity_name_condition + " and create_type_id='02fbb8fc-599c-11e1-9350-101f74b66417' and active=1 and create_id='" + GetAndRemoveValue("group_id", dic) + "' " + _end_datetime, "begin_datetime", "0", ref dic);
                                json = common.WanerDaoPagination(dic);
                                break;
                            case "getactivitybycityid"://根据用户CITYID查询活动信息 徐MM的接口
                                string cityId = dic["city_id"].ToString();
                                if (cityId.Equals("-1"))
                                {
                                    IWanerDaoPersonInfoManager personal = new WanerDaoPersonInfoManager();
                                    PersonalProfileModel pModel = personal.GetPersonalProfileModel();
                                    cityId = pModel.current_city_id;
                                }
                                dic["city_id"] = cityId;
                                GetPaginationParams("activity", "id,activity_name,begin_datetime,end_datetime,address,join_member_nbr,follow_score,description", " and city_id='" + GetAndRemoveValue("city_id", dic) + "' and f_JudgeCanSignUpActivity(id,'" + GetCurrentUserID() + "')=1", "begin_datetime", "0", ref dic);
                                json = common.WanerDaoPagination(dic);
                                break;
                            case "getactivitybycurrentuserfollow"://获取当前登陆用户的关注活动 徐MM的接口
                                GetPaginationParams("activity a,personalactivityfollow paf", "a.id as activity_id,paf.id as follow_id,activity_name,begin_datetime,end_datetime,address,join_member_nbr,follow_score,description", " and paf.active=true and a.id=paf.attention_id and paf.user_id='" + GetCurrentUserID() + "'", "begin_datetime", "0", ref dic);
                                json = common.WanerDaoPagination(dic);
                                break;
                            

                            #region 兴趣爱好关联
                            case "getregionandinterestactivity"://可以根据地域、兴趣爱好返回指定数量的活动
                                //Dictionary<string, object> _interestActivity = new Dictionary<string, object>();
                                //_interestActivity.Add("pagecurrent",1);
                                //_interestActivity.Add("pageSize", GetAndRemoveValue("count", dic).Trim());
                                //_interestActivity.Add("userId", GetCurrentUserID());
                                ////_interestActivity.Add("userId", "a67b8a1818a941c7928d491324aaf15d");

                                ////string _cityId = " and activity.city_id='00007afa-f4b4-11e0-b192-00306701b527' ";
                                //string _cityId = "";
                                //IWanerDaoPersonInfoManager _personal = new WanerDaoPersonInfoManager();
                                //PersonalProfileModel _pModel= _personal.GetPersonalProfileModel();
                                //if (_pModel != null && string.IsNullOrEmpty(_pModel.current_city_id))
                                //{
                                //    _cityId = " and activity.city_id='" + _pModel.current_city_id + "' ";
                                //}

                                //GetUserInterestsActivity("activity left join personalprofile p on activity.original_id=p.user_id", "activity.id,activity_name,activity.activity_score,address,join_member_nbr,activity.follow_score,original_id,p.name,description,0 personcost, '' imagepath", " activity.active=1 and activity.is_visible=1 " + _cityId, "activity.begin_datetime", 0, ref _interestActivity);
                                //json = common.WanerDaoSearchUserInterestsActivity(_interestActivity);

                                json = GetRegionAndInterestActivity(GetAndRemoveValue("count", dic).Trim());
                                break;

                            case "getactivitybyuserinterest"://获取可能感兴趣活动 徐MM的接口
                                dic.Add("userId", GetCurrentUserID());
                                GetUserInterestsActivity("activity", "id,activity_name,begin_datetime,end_datetime,address,join_member_nbr,follow_score,description", " and f_JudgeCanSignUpActivity(id,'" + GetCurrentUserID() + "')=1 ", "begin_datetime", 0, ref dic);
                                json = common.WanerDaoSearchUserInterestsActivity(dic);
                                break;
                            case "getrecommendedactivity"://推荐活动有两种包括：最新、距离最近的活动，根据地域及兴趣爱好的活动 徐MM的接口
                                activity = new WanerDao2.WanerDaoBLL.Activity.WanerDaoActivity();
                                int _newestAndNearestCount=3;
                                int.TryParse(GetAndRemoveValue("newestAndNearestCount", dic).Trim(),out _newestAndNearestCount);
                                string newestAndNearest= activity.GetNewestAndNearestActivity(_newestAndNearestCount);
                                string regionAndInterest = GetRegionAndInterestActivity(GetAndRemoveValue("regionAndInterestCount", dic).Trim());

                                Dictionary<string, object> dicJosn = new Dictionary<string, object>();
                                dicJosn.Add("newestAndNearest", newestAndNearest);
                                dicJosn.Add("regionAndInterest", regionAndInterest);
                                json = JsonConvert.SerializeObject(dicJosn);
                                break;
                            #endregion

                            #endregion

                            #region other
                            case "getactivityplacesearch"://活动地址查询页
                                string stateid = GetAndRemoveValue("stateid", dic);
                                if (!string.IsNullOrEmpty(stateid))
                                {
                                    stateid = " and state_id='"+stateid+"' ";
                                }
                                string placeName = GetAndRemoveValue("placename", dic);
                                string placeCategoryID = GetAndRemoveValue("placecategoryid", dic);
                                activity = new WanerDao2.WanerDaoBLL.Activity.WanerDaoActivity() as IWanerDaoActivity;
                                activityplacecategory _activityplacecategory= activity.SelectActivityPlaceCategoryByID(placeCategoryID);
                                string categoryTableName = _activityplacecategory == null ? "" : _activityplacecategory.map_table;
                                //GetPaginationParams(categoryTableName + " p", "id,place_name,description,address,country_id ,(select country_name from country where country.country_id=p.country_id and country.language_id='" + CommonContext.GetClientLanguage() + "') country_name,state_id,(select state_name from state where state.state_id=p.state_id and state.language_id='" + CommonContext.GetClientLanguage() + "') state_name,city_id,(select city_name from city where city.city_id=p.city_id and city.language_id='" + CommonContext.GetClientLanguage() + "') city_name,zip,lat,lng", "and p.language_id='" + CommonContext.GetClientLanguage() + "' and p.place_name like '%" + placeName + "%' " + stateid + " and p.active=1", "place_name", "0", ref dic);
                                string lid = CommonContext.GetClientLanguage();
                                GetPaginationParams(categoryTableName + " p", "id,place_name,description,address,country_id ,(select DISTINCT country_name from country where country.country_id=p.country_id and country.language_id='" + lid + "') country_name,state_id,(select DISTINCT state_name from state where state.state_id=p.state_id ) state_name,city_id,(select DISTINCT city_name from city where city.city_id=p.city_id ) city_name,zip,lat,lng", " and p.place_name like '%" + placeName + "%' " + stateid + " and p.active=1 and p.language_id='" + lid + "' and p.activity_place_category_id='" + _activityplacecategory.id + "'", "place_name", "0", ref dic);

                                json = common.WanerDaoPagination(dic);
                                break;
                            case "getfriendpagiation"://好友分页 待完善

                                Dictionary<string, object> resultgetfriendpagiation = new Dictionary<string, object>();
                                var valuegetfriendpagiation = new List<object> { 
                                    new {id="id1", name = "好友1" }, 
                                    new {id="id2", name = "好友2"}, 
                                    new {id="id3", name = "好友3"}
                                };
                                resultgetfriendpagiation.Add("total", 3);
                                resultgetfriendpagiation.Add("rows", valuegetfriendpagiation);
                                json = WanerDaoJSON.GetSuccessJson((object)resultgetfriendpagiation);
                                break;
                            case "getgrouppagiation"://圈子分页 待完善

                                Dictionary<string, object> resultgetgrouppagiation = new Dictionary<string, object>();
                                var valuegetgrouppagiation = new List<object> { 
                                    new {id="id", name = "圈子1" }, 
                                    new {id="id1", name = "圈子1" }, 
                                    new {id="id2", name = "圈子2"}, 
                                    new {id="id3", name = "圈子3"}
                                };
                                resultgetgrouppagiation.Add("total", 4);
                                resultgetgrouppagiation.Add("rows", valuegetgrouppagiation);
                                json = WanerDaoJSON.GetSuccessJson((object)resultgetgrouppagiation);
                                break;
                            case "getactivitymemberpagiation"://活动用户键值对分页查询

                                _activityid = GetAndRemoveValue("activityid", dic);
                                GetPaginationParams("activitymember a,personalprofile p ", "p.user_id as userid,p.name", " and a.activity_id ='" + _activityid + "' and a.active=1 and p.active=1 and a.user_id=p.user_id ", "p.name", "0", ref dic);
                                json = common.WanerDaoPagination(dic);
                                break;
                            #endregion
                            #endregion

                            #region 活动成员
                            case "getactivitymemberbypage"://除开分页必备条件外：activityid:活动ID
                                PaginationModel member = new PaginationModel();
                                member.tablename = "activitymember am   left JOIN personalprofile ps ON ps.user_id= am.user_id";
                                member.pageSize = dic["pageSize"].ToString();
                                member.pagecurrent = dic["pagecurrent"].ToString();
                                member.sort = "1";
                                member.fldSortId = "ps.user_id";
                                member.fldName = "ps.user_id as uid,ps.name as uname";
                                member.where = " and activity_id='" + dic["activityid"].ToString() + "' and am.active=1";
                                if (dic.ContainsKey("uname"))
                                {
                                    member.where += @" and (ps.name like '%" + dic["uname"].ToString() + "%' or ps.second_name like '%" + dic["uname"].ToString() + "%')";
                                }                                
                                json = common.WanerDaoPagination(member);
                                break;
                            case "getactivitymemberpaging"://除开分页必备条件外：activityid:活动ID
                                json = common.GetActivityMemberPaging(dic);
                                break;
                            case "getcurrentcarowercustomlist"://获取当前车主的搭车成员   除开分页必备条件外：activityid:活动ID

                                GetPaginationParams("autocarpool c,activitymember m left join personalprofile p on m.user_id=p.user_id ", "p.user_id,p.name as user_name,p.logo_small_path,m.id,m.phone,m.address,c.is_pass,m.activity_id ", "and  c.owner_id=m.id and c.active=1 and m.active=1 and m.activity_id='" + GetAndRemoveValue("activityid", dic) + "' and m.user_id='" + GetCurrentUserID() + "' ", "user_name", "0", ref dic);
                                json = common.WanerDaoPaginationToImage(dic);
                                break;
                            case "getcarowerlist"://获取可搭乘车主  除开分页必备条件外：activityid:活动ID、 carpool_money：打车费用、carpool_type_id：叫价方式
                                _activityid = GetAndRemoveValue("activityid", dic);
                                string _owercarpool_money = GetAndRemoveValue("carpool_money", dic);
                                string _owercarpool_type_id = GetAndRemoveValue("carpool_type_id", dic);
                                _owercarpool_money = string.IsNullOrEmpty(_owercarpool_money) ? "" : " and carpool_money=" + _owercarpool_money;
                                _owercarpool_type_id = string.IsNullOrEmpty(_owercarpool_type_id) ? "" : " and carpool_type_id='" + _owercarpool_type_id+"' ";
                                GetPaginationParams("activitymember am left join personalprofile pp on am.user_id=pp.user_id ", "pp.name as user_name,am.id,am.carpool_money", " and am.is_auto=1 and  am.is_permit_carpool=1 and am.is_authorized=1 and am.carpool_nbr> am.current_carpool_nbr and am.vehicle_type_id='0329e2cc-8ae2-11e1-a95e-101f74b66417' and am.activity_id='" + _activityid + "' " + _owercarpool_money + _owercarpool_type_id, "user_name", "0", ref dic);
                                json = common.WanerDaoPagination(dic);
                                break;
                            case "getbycarlist"://获取需要搭车成员   除开分页必备条件外：activityid:活动ID、 carpool_money：打车费用、carpool_type_id：叫价方式
                                _activityid = GetAndRemoveValue("activityid", dic);
                                string _bycarpool_money = GetAndRemoveValue("carpool_money", dic);
                                string _bycarpool_type_id = GetAndRemoveValue("carpool_type_id", dic);
                                _bycarpool_money = string.IsNullOrEmpty(_bycarpool_money) ? "" : " and carpool_money=" + _bycarpool_money;
                                _bycarpool_type_id = string.IsNullOrEmpty(_bycarpool_type_id) ? "" : " and carpool_type_id='" + _bycarpool_type_id + "' ";
                                GetPaginationParams("activitymember am left join personalprofile pp on am.user_id=pp.user_id ", "pp.name as user_name,am.id", "and not exists(select 1 from autocarpool acp where acp.carpool_id=am.id and acp.is_pass!=1 and active=1) and am.is_need_carpool=1 and am.is_authorized=1  and am.vehicle_type_id='0329e2cc-8ae2-11e1-a95e-101f74b66417' and am.activity_id='" + _activityid + "' " + _bycarpool_money + _bycarpool_type_id, "user_name", "0", ref dic);
                                json = common.WanerDaoPagination(dic);
                                break;  
                            #endregion

                            #region 活动分类
                            case "activitycategory":
                                json = common.WanerDaoActivityCategory();
                                break;
                            case "activitycategorypage":
                                //Dictionary<string, object> pageDic = new Dictionary<string, object>();
                                //GetPaginationParams("ActivityCategorySettings", "id,category_name as name", " and active=1", "category_name", "0", ref dic);
                                GetPaginationParams("activitysectionpage ap ", @"ap.id,ap.category_id ,ap.section_type_id,ap.section_name as name, logo_path,
(select count(1) from  activitycategory  ac,activity a where ac.activity_id=a.id and ac.category_id=ap.category_id and ac.active=1 and a.active=1 and a.is_visible=1 and a.is_create=1 and a.datetime>NOW() and FIND_IN_SET(ac.category_id,f_GetCategoryChildList(ap.category_id,ap.section_type_id)) ) recentcount, 
(select count(1) from activitycategory ac,activity a where ac.activity_id=a.id and FIND_IN_SET(ac.category_id,f_GetCategoryChildList(ap.category_id,ap.section_type_id)) and ac.active=1 and a.active=1 and a.is_visible=1 and a.is_create=1 and a.is_public=1 and a.report_datetime>now()) opencount, 
(select count(*) from personalmodulefollow where active=1 and source_type_id='fb2fd8f2-5c94-11e1-b02d-101f74b66417' and attention_id=ap.id ) followcount,
(select if(count(*)>0,1,0)  from personalmodulefollow where active=1 and source_type_id='fb2fd8f2-5c94-11e1-b02d-101f74b66417' and attention_id=ap.id and user_id='" + GetCurrentUserID()+"') isfollow", " and ap.active=1 and ap.language_id='" + CommonContext.GetClientLanguage() + "' ", "ap.sequence", "1", ref dic);
                                json = common.GetActivityCategoryAndActivity(dic, "newActivityByCategory");
                                break;
                            #endregion

                            #region 活动财务
                            case "getactvitybudgetpageformanage"://活动预算分页

                                GetPaginationParams(" activitybudget ab LEFT JOIN  personalprofile  pf ON ab.create_id=pf.user_id ", "ab.id, ab.activity_id, ab.item_description, ab.item_content, ab.is_in, ab.budget_money, ab.conver_unit, ab.cover_note, ab.create_id, ab.create_date,pf.name username", " and ab.activity_id='" + GetAndRemoveValue("activityid", dic) + "' AND ab.active=1", "create_date", "0", ref dic);
                                json = common.WanerDaoPagination(dic);
                                break;   
                            #endregion

                            #region 活动景点
                            case "activitysight":
                                json = common.WanerDaoActivityPlace();
                                break;
                            #endregion

                            #region 活动留言板
                            case "leavemessage": //所有帖子的回复信息（帖子数据用于分页）
                                string strTalbeName = "v_activityposts";
                                string strFldname = "id,subject,content,createdate,counter,userlogo,userid,username,userlogo";
                                string strWhere = "";
                                string strFldSordId = "createdate";
                                string strSort = "1";
                                string postTables = "wanerdaoPagination";//映射主表查询sql：如果是全部帖子，映射分页sql（wanerdaoPagination）
                                string strCommentstable = "activitycommentsList"; //查询留言回复表的Sql映射 （不同的栏目回复表名称不一样，需要在映射查询Sql中设置）
                                string strPriTbId = "id";//留言板主表主键ID   
                                string strPriComId = "id";//回复表主键ID；
                                string strPri_Sub_Id = "active_posts_id";//留言板回复表中字段,关联留言板主表ID，
                                string strCom_Sub_Id = "follow_id";//留言板回复表中字段,关联回复表ID，即回复贴号
                                GetPaginationParams(strTalbeName, strFldname, strWhere, strFldSordId, strSort, ref dic);
                                json = common.WanerDaoLeaveMessage(dic, "all", postTables, strCommentstable, strPriTbId, strPriComId, strPri_Sub_Id, strCom_Sub_Id);
                                break;
                            case "leavesinglemessage": //单一个帖子的回复信息(一级回复数据作为分页)
                                strTalbeName = "v_activitycomments";
                                strFldname = "id,follow_id,content,active_posts_id,createdate,userid,username,userlogo";
                                string active_posts_id = "1";
                                IEnumerator ie = dic.Keys.GetEnumerator();
                                while (ie.MoveNext())
                                {
                                    if (ie.Current.ToString().ToLower().Equals("posts_id"))
                                    {
                                        active_posts_id = dic[ie.Current.ToString()].ToString(); break;
                                    }
                                }
                                strWhere = string.Format(" AND follow_id=-1 AND active_posts_id='{0}' and active=1 ", active_posts_id);
                                strFldSordId = "createdate";
                                strSort = "0";
                                postTables = "wanerdaoPagination";//映射主表查询sql：如果是全部帖子，映射分页sql（wanerdaoPagination）
                                strCommentstable = "activitycommentsList"; //查询留言回复表的Sql映射 （不同的栏目回复表名称不一样，需要在映射查询Sql中设置）
                                strPriTbId = "";//留言板主表主键ID，在这里用不到   
                                strPriComId = "id";//回复表主键ID；
                                strPri_Sub_Id = "active_posts_id";//留言板回复表中字段,关联留言板主表ID，
                                strCom_Sub_Id = "follow_id";//留言板回复表中字段,关联回复表ID，即回复贴号
                                GetPaginationParams(strTalbeName, strFldname, strWhere, strFldSordId, strSort, ref dic);
                                json = common.WanerDaoLeaveMessage(dic, "single", postTables, strCommentstable, strPriTbId, strPriComId, strPri_Sub_Id, strCom_Sub_Id);
                                break;
                            case "videosinglemessage": //单一个视频的回复信息
                                strTalbeName = "videocomments videocomment INNER JOIN personalprofile pp on videocomment.user_id=pp.user_id";
                                strFldname = "videocomment.id,(case when videocomment.user_id ='" + GetCurrentUserID() + "' THEN TRUE ELSE FALSE END) as isdelete,videocomment.user_id,pp.name as user_name,pp.logo_small_path as image_path,videocomment.content as replaycontent,videocomment.comments_date as replaytime";
                                string video_id = string.Empty;
                               video_id = dic["postid"].ToString();
                               strWhere = " AND videocomment.follow_id='" + dic["followid"].ToString() + "' AND videocomment.video_id='" + video_id + "' and videocomment.active=1";
                               strFldSordId = "videocomment.comments_date";
                                strSort = "1";
                                GetPaginationParams(strTalbeName, strFldname, strWhere, strFldSordId, strSort, ref dic);
                                json = common.WanerDaoPagination(dic);
                                break;
                            case "videodelsinglemessage": //删除单一个视频的回复信息
                                json = common.WanerDaoDeleteVideoComments(dic);
                                break;
                            case "videoaddsinglemessage": //添加单一个视频的回复信息
                                json = common.WanerDaoAddVideoComments(dic);
                                break;
                            case "blogsinglemessage": //单一个日志的回复信息
                                strTalbeName = "blogcomments blogcomment INNER JOIN personalprofile pp on blogcomment.user_id=pp.user_id";
                                strFldname = "blogcomment.id,(case when blogcomment.user_id ='" + GetCurrentUserID() + "' THEN TRUE ELSE FALSE END) as isdelete,blogcomment.user_id,pp.name as user_name,pp.logo_small_path as image_path,blogcomment.content as replaycontent,blogcomment.comments_date as replaytime";
                                string blog_id = string.Empty;
                                blog_id = dic["postid"].ToString();
                                strWhere = " AND blogcomment.follow_id='" + dic["followid"].ToString() + "' AND blogcomment.blog_id='" + blog_id + "' and blogcomment.active=1";
                                strFldSordId = "blogcomment.comments_date";
                                strSort = "1";
                                GetPaginationParams(strTalbeName, strFldname, strWhere, strFldSordId, strSort, ref dic);
                                json = common.WanerDaoPagination(dic);
                                break;
                            case "blogdelsinglemessage": //删除单一个日志的回复信息
                                json = common.WanerDaoDeleteBlogComments(dic);
                                break;
                            case "blogaddsinglemessage": //添加单一个日志的回复信息
                                json = common.WanerDaoAddBlogComments(dic);
                                break;
                            case "photosinglemessage": //获取单一个照片的回复信息
                                strTalbeName = "imagecomments imgcomment INNER JOIN personalprofile pp on imgcomment.user_id=pp.user_id";
                                strFldname = "imgcomment.id,(case when imgcomment.user_id ='"+GetCurrentUserID()+"' THEN TRUE ELSE FALSE END) as isdelete,imgcomment.user_id,pp.name as user_name,pp.logo_small_path as image_path,imgcomment.content as replaycontent,imgcomment.comments_date as replaytime";
                                string photo_id = string.Empty;
                                photo_id = dic["postid"].ToString();
                                strWhere = " AND imgcomment.follow_id='" + dic["followid"].ToString() + "' AND imgcomment.image_id='" + photo_id + "' and imgcomment.active=1";
                                strFldSordId = "imgcomment.comments_date";
                                strSort = "1";
                                GetPaginationParams(strTalbeName, strFldname, strWhere, strFldSordId, strSort, ref dic);
                                json = common.WanerDaoPagination(dic);
                                //json = common.WanerDaoLeaveMessage(dic, "single", postTables, strCommentstable, strPriTbId, strPriComId, strPri_Sub_Id, strCom_Sub_Id);
                                break;
                            case "delsinglemessage": //删除单一个照片的回复信息
                                json = common.WanerDaoDeleteImageComments(dic);
                                break;
                            case "addsinglemessage": //添加单一个照片的回复信息
                                json = common.WanerDaoAddImageComments(dic);
                                //json = common.WanerDaoLeaveMessage(dic, "single", postTables, strCommentstable, strPriTbId, strPriComId, strPri_Sub_Id, strCom_Sub_Id);
                                break;
                            case "newfeedsinglemessage": //单一个状态的回复信息
                                strTalbeName = "newfeedscomments newfeedscomment INNER JOIN personalprofile pp on newfeedscomment.user_id=pp.user_id";
                                strFldname = "newfeedscomment.id,(case when newfeedscomment.user_id ='" + GetCurrentUserID() + "' THEN TRUE ELSE FALSE END) as isdelete,newfeedscomment.user_id,pp.name as user_name,pp.logo_small_path as image_path,newfeedscomment.content as replaycontent,newfeedscomment.comments_date as replaytime";
                                string news_id = string.Empty;
                                news_id = dic["postid"].ToString();
                                strWhere = " AND newfeedscomment.follow_id='" + dic["followid"].ToString() + "' AND newfeedscomment.news_id='" + news_id + "' and newfeedscomment.active=1";
                                strFldSordId = "newfeedscomment.comments_date";
                                strSort = "1";
                                GetPaginationParams(strTalbeName, strFldname, strWhere, strFldSordId, strSort, ref dic);
                                json = common.WanerDaoPagination(dic);
                                break;
                            case "newfeeddelsinglemessage": //删除单一个状态的回复信息
                                json = common.WanerDaoDeleteNewfeedComments(dic);
                                break;
                            case "newfeedaddsinglemessage": //添加单一个状态的回复信息
                                json = common.WanerDaoAddNewfeedComments(dic);
                                break;
                            case "leavemessagesinglemessage": //单一个状态的回复信息
                                strTalbeName = "leavemessagecomments leavemessagecomment INNER JOIN personalprofile pp on leavemessagecomment.user_id=pp.user_id";
                                strFldname = "leavemessagecomment.id,(case when leavemessagecomment.user_id ='" + GetCurrentUserID() + "' THEN TRUE ELSE FALSE END) as isdelete,leavemessagecomment.user_id,pp.name as user_name,pp.logo_small_path as image_path,leavemessagecomment.content as replaycontent,leavemessagecomment.comments_date as replaytime";
                                string leave_id = string.Empty;
                                leave_id = dic["postid"].ToString();
                                strWhere = " AND leavemessagecomment.follow_id='" + dic["followid"].ToString() + "' AND leavemessagecomment.news_id='" + leave_id + "' and leavemessagecomment.active=1";
                                strFldSordId = "leavemessagecomment.comments_date";
                                strSort = "1";
                                GetPaginationParams(strTalbeName, strFldname, strWhere, strFldSordId, strSort, ref dic);
                                json = common.WanerDaoPagination(dic);
                                break;
                            case "leavemessagedelsinglemessage": //删除单一个状态的回复信息
                                json = common.WanerDaoDeleteNewfeedComments(dic);
                                break;
                            case "leavemessageaddsinglemessage": //添加单一个状态的回复信息
                                json = common.WanerDaoAddNewfeedComments(dic);
                                break;
                            #endregion

                            #region 活动相册相片
                            #region 查询
                            case "getactivitymanageimagetotal"://用于获取管理相册页面的管理相册数以及相片数
                                json = common.WanerDaoGetManageImageTotal(dic);
                                break;
                            case "getactivitymanagebygstaff"://用于历史相册管理界面的左侧非管理员时候获取的相册操作函数
                                json = common.WanerDaoGetImageFolderWithGeneralStaff(dic);
                                break;
                            case "getactivityimagefolder"://存储过程查询活动相册 可用于分页
                                json = common.WanerDaoSearchImageFolder(dic);
                                break;
                            case "getactivityimagebyfoldid"://根据相册ID查询相片
                                json = common.WanerDaoSearchImageByFolderId(dic);
                                break;
                            case "getactivityimagecount"://根据相册ID查询相片
                                json = common.WanerDaoGetImageCount(dic);
                                break;
                            case "photosortbyclick"://上下排序
                                json = common.ImageSortOrderOfClick(dic);
                                break;
                            case "updatephotoproperty"://更新活动相册图片属性
                                Dictionary<string, object> newProperty = new Dictionary<string, object>();
                                newProperty.Add("id",dic["id"]);
                                //序号
                                string tmpseq = GetAndRemoveValue("seq", dic);
                                if (!string.IsNullOrEmpty(tmpseq))
                                {
                                    newProperty.Add("imageproperty", tmpseq);
                                    json = common.WanerDaoUpdateImageProperty("updateimageseq", newProperty);
                                }
                                //标题
                                tmpseq = GetAndRemoveValue("iname", dic);
                                if (!string.IsNullOrEmpty(tmpseq))
                                {
                                    newProperty.Add("imageproperty", tmpseq );
                                    json = common.WanerDaoUpdateImageProperty("updateimagename", newProperty);
                                }
                                //描述
                                tmpseq = GetAndRemoveValue("desc", dic);
                                if (!string.IsNullOrEmpty(tmpseq))
                                {
                                    newProperty.Add("imageproperty", tmpseq);
                                    json = common.WanerDaoUpdateImageProperty("updateimagedesc", newProperty);
                                }
                                //是否解禁
                                tmpseq = GetAndRemoveValue("bk", dic);
                                if (!string.IsNullOrEmpty(tmpseq))
                                {
                                    if (tmpseq=="1")
                                    {
                                         json= common.WanerDaoUpdateImageProperty("blockactivityimage",newProperty);
                                    }
                                    else
                                    {
                                        json= common.WanerDaoUpdateImageProperty("restoreblockactivityimage",newProperty);
                                    }
                                }
                                break;
                            case "deleteimageidrange"://根据相册ID查询相片
                                json = common.WanerDaoDeleteActivityImage(dic);
                                break;
                            case "blockimageidrange"://根据相册ID查询相片
                                json = common.WanerDaoBlockActivityImage(dic);
                                break;
                            case "getactivityimagebyfoldidanduserid"://根据相册ID查询相片 分页
                                PaginationModel pmuserid = new PaginationModel();
                                pmuserid.fldName = "i.id,p.name as user_name,i.image_name,i.image_small_path,i.sequence,i.description,i.upload_date,i.is_block";
                                pmuserid.tablename = "activityimage i,PersonalProfile p";
                                string searchkey=GetAndRemoveValue("searchkey", dic);
                                if (string.IsNullOrEmpty(searchkey))
                                {
                                    pmuserid.where = " and  i.active=1 and i.create_id=p.user_id  and i.folder_id='" + GetAndRemoveValue("folder_id", dic) + "' and i.create_id='" + GetCurrentUserID() + "'";
                                } 
                                else
                                {
                                    pmuserid.where = " and  i.active=1 and i.create_id=p.user_id  and i.folder_id='" + GetAndRemoveValue("folder_id", dic) + "' and i.create_id='" + GetCurrentUserID() + "' and (i.id like '" + searchkey + "%' or i.sequence like '" + searchkey + "%')";
                                }                                
                                pmuserid.fldSortId = "i.sequence";
                                pmuserid.sort = "1";
                                pmuserid.pagecurrent = GetAndRemoveValue("pagecurrent", dic);
                                pmuserid.pageSize = GetAndRemoveValue("pageSize", dic);
                                json = common.WanerDaoPagination(pmuserid);
                                break;
                            case "getactivityimagebyadmin"://根据相册ID查询相片 分页
                                PaginationModel pmadmin = new PaginationModel();
                                pmadmin.fldName = "i.id,p.name as user_name,i.image_name,i.image_small_path,i.sequence,i.description,i.upload_date,i.is_block";
                                pmadmin.tablename = "activityimage i,PersonalProfile p";
                                string searchkeyadmin=GetAndRemoveValue("searchkey", dic);
                                if (string.IsNullOrEmpty(searchkeyadmin))
                                {
                                    pmadmin.where = " and  i.active=1 and i.create_id=p.user_id  and i.folder_id='" + GetAndRemoveValue("folder_id", dic) + "'";
                                }
                                else
                                {
                                    pmadmin.where = " and  i.active=1 and i.create_id=p.user_id  and i.folder_id='" + GetAndRemoveValue("folder_id", dic) + "' and (i.id like '" + searchkeyadmin + "%' or i.sequence like '" + searchkeyadmin + "%')";
                                }
                                pmadmin.fldSortId = "i.sequence";
                                pmadmin.sort = "1";
                                pmadmin.pagecurrent = GetAndRemoveValue("pagecurrent", dic);
                                pmadmin.pageSize = GetAndRemoveValue("pageSize", dic);
                                json = common.WanerDaoPagination(pmadmin);
                                break;
                            case "getactivityimagebyfoldidforpage"://根据相册ID查询相片 分页
                                string folderColumName = "i.id,p.name as user_name,i.activity_name,i.image_name,i.image_path,i.image_small_path,i.fileSize,i.description,i.upload_date,i.is_submit,i.counter,i.is_block";
                                string folderWhere = "and i.active=1 and i.create_id=p.user_id and i.fold_id=" + GetAndRemoveValue("fold_id", dic);
                                GetPaginationParams("activityimage i,PersonalProfile p", folderColumName, folderWhere, "", "0", ref dic);
                                json = common.WanerDaoSearchImagePagination(dic);
                                break;
                            case "getactivityimagebycreateid"://根据创建人ID查询相片
                                json = common.WanerDaoSearchImageByUserId(dic);
                                break;
                            case "getactivityimagebyuseridforpage"://根据创建人ID查询相片 分页
                                string userColumName = " i.id,i.activity_name,f.folder_name,i.image_name,i.image_path,i.image_small_path,i.fileSize,i.description,i.upload_date,i.is_submit,i.counter,i.is_block";
                                string userWhere = "and i.active=1 and  i.fold_id=f.id and i.create_id=" + GetAndRemoveValue("create_id", dic);
                                GetPaginationParams("activityimage i,activityimagefolder f", userColumName, userWhere, "", "0", ref dic);
                                json = common.WanerDaoSearchImagePagination(dic);
                                break;
                            case "getactivityimagebyid"://根据相册ID查询相片 分页
                                json = common.WanerDaoGetImageById(dic);
                                break;
                            case "getactivityalbumbyactivityid"://根据活动ID查询相片
                                dic.Add("user_id", GetCurrentUserID());
                                json = common.GetActivityAlbumListByUser(dic);
                                break;
                            case "blockactivityimagefolder"://屏蔽相册
                                json = common.WanerDaoBlockActivityImageFolder(dic["fid"].ToString());
                                break;
                            case "restoreblockactivityimagefolder"://恢复屏蔽相册
                                json = common.WanerDaoRestoreBlockActivityImageFolder(dic["fid"].ToString());
                                break;
                            case "deleteactivityimagefolder"://删除相册
                                json = common.WanerDaoDeleteActivityImageFolder(dic);
                                break;
                            #endregion
                            #region 文件上传 操作
                            case "uploadimagefile"://上传图片 包括个人相册、活动相册
                                try
                                {
                                    HttpPostedFile postedImageFile = context.Request.Files[0];
                                    WanerDaoUploadImageResult UploadImageResult = common.WanerDaoUploadImageFile(postedImageFile, dic);
                                    if (UploadImageResult.isSuccess)
                                    {
                                        HttpContext.Current.Response.Write(UploadImageResult.SmallFileWebPath + "-,-" + UploadImageResult.imageId + "-,-" + UploadImageResult.oldFileName + "-,-PhotoUpload");
                                        HttpContext.Current.Response.StatusCode = 200;
                                    }
                                    else
                                    {
                                        HttpContext.Current.Response.Write(UploadImageResult.resultMsg);
                                        HttpContext.Current.Response.StatusCode = 500;
                                    }
                                    //HttpContext.Current.Response.Write(thumbnail_id);

                                }
                                catch (Exception)
                                {
                                    HttpContext.Current.Response.Write("文件上传失败，请重试");
                                    HttpContext.Current.Response.StatusCode = 500;
                                }
                                finally
                                {
                                    HttpContext.Current.Response.End();
                                    HttpContext.Current.Response.Close();
                                }
                                break;
                            case "submituploadimagefile"://确认相片上传
                                string imageIds = GetAndRemoveValue("imageIds", dic);
                                json = common.WanerDaoSubmitUploadImageFiles(imageIds);
                                break;

                            case "uploadtempfile"://上传文件 中转
                                try
                                {
                                    HttpPostedFile postedImageFile = context.Request.Files[0];

                                    UploadFileInfo _tempFileInfo = UploadTempFileManger.UploadFile(postedImageFile, GetAndRemoveValue("batchid", dic));
                                    HttpContext.Current.Response.Write(_tempFileInfo.WebSavePath + "-,-" + _tempFileInfo.FileId + "-,-" + _tempFileInfo.OldFileName + "-,-FileTempUpload");
                                    HttpContext.Current.Response.StatusCode = 200;

                                }
                                catch (Exception _e)
                                {
                                    HttpContext.Current.Response.Write("文件上传失败，请重试");
                                    HttpContext.Current.Response.StatusCode = 500;
                                }
                                finally
                                {
                                    HttpContext.Current.Response.End();
                                    HttpContext.Current.Response.Close();
                                }
                                break;
                            #endregion
                            #endregion

                            #region 个人
                            case "uploadpersonalavatar"://上传头像
                                json = common.UploadAvatar(context.Request.Files["avatar"], dic);
                                break;
                            case "cutpersonalsmallavatar":
                                json = common.CutAvatar(dic);
                                break;
                            #endregion

                            #region 获取天气状况，ip所在地
                            case "getlocationweather"://获取当前所在地天气状况
                                json = common.GetLocationWeather();
                                break;
                            case "getcurrentlocation"://获取ip所在地 城市 州省
                                json = common.GetCurrentLocation();
                                break;
                            #endregion

                            #region 权限
                            case "getcurrentuserpermission"://获取当前用户的权限
                                json = common.GetAllPermissionForCurUser();
                                break;
                            case "getpermissionbyuser"://获取用户的权限 参数：user_Id
                                json = common.GetAllPermission(dic);
                                break;
                            case "getcountofcustompermissionofuser"://获取当前用户自定义权限数量
                                json = common.GetCountOfCustomPermissionForCurUser();
                                break;
                            case "getcountofcustompermission"://获取用户自定义权限数量
                                json = common.GetCountOfCustomPermission(dic);
                                break;
                            case "getcustomofcur"://获取当前用户自定义权限
                                json = common.GetAllCustomPermissionForCurUser();
                                break;
                            case "getcustompermissiondetail"://根据编号获取自定义权限内容
                                json = common.GetCustomPermissionById(dic);
                                break;
                            case "addcustompermission"://添加自定义权限
                                json = common.AddOrUpdateCustomPermission(dic);
                                break;
                            case "updatecustompermission"://修改自定义权限
                                json = common.AddOrUpdateCustomPermission(dic);
                                break;
                            case "delcustompermission"://删除自定义全
                                json = common.DelCustomPermission(dic);
                                break;
                            case "canaddcustompermissionforcuruser"://是否能添加自定义权限
                                json = common.CanAddCustomPermissionForCurUser();
                                break;
                            #endregion

                            #region 日志 照片 视频 杂烩 转发
                            //case "forwardofbpvi":
                            //    /// <summary>
                            //    /// 转发日志或者照片或者视频或者杂烩
                            //    /// </summary>
                            //    /// <param name="dic">string 类型( Blog(日志id),ImageFolder(相册id),Image(照片id),VideoFolder(视频册id),Video(视频id),Information(杂烩id)),string Categoryid,string isCreateNewFolder(0或者1)
                            //    /// string imageFolderNameOrID</param>
                            //    /// 字典的key值为类型,对应的value值为id 
                            //    /// isCreateNewFolder 相册转发-是否创建新相册 为0或者1  0为不创建 1为创建
                            //    /// imageFolderNameOrID 当转发到某个已经存在的相册是,此为相册id,当新建相册时,为新建相册的名字
                            //    /// 视频转发:当转发的为视频时候imageFolderNameOrID代表:当转发到某个已经存在的视频册时,此为视频册id,当新建视频册时,为新建视频册的名字
                            //    json = common.ForwardTheBlogOrImageOrVideoOrInformation(dic);
                            //    break;
                            case "forwardimgvdoblog":
                                /// <summary>
                                /// 转发图片，视频，日志
                                /// </summary>
                                /// <param name="dic">string (imageid或者videoid或者blogid），string targetid（转发到哪个地方）</param>
                                /// <returns></returns>
                                json = common.ForwardImgVdoBlog(dic);
                                break;
                            case "forwardimgvdoblogx":
                                /// <summary>
                                /// 转发图片，视频，日志（徐蓓2012-8-8添加）
                                /// </summary>
                                /// <param name="dic">string (imageid或者videoid或者blogid），string targetid（转发到哪个地方），string newName（新名称）</param>
                                /// <returns></returns>
                                json = common.ForwardImgVdoBlogX(dic);
                                break;
                            case "forwardimgfoldervdofolder":
                                /// <summary>
                                /// 转发视频册或者相册
                                /// </summary>
                                /// <param name="dic">string (imgfolderid或者vdofolderid)，string isCreateFolder(0 or 1),string folderIdOrName </param>
                                /// <returns></returns>
                                json = common.ForwardImgFolderVdoFolder(dic);
                                break;
                            case "forwardstatelink":
                                /// <summary>
                                /// 转发状态或者链接
                                /// </summary>
                                /// <param name="dic">string (linkid或者stateid）</param>
                                /// <returns></returns>
                                json = common.ForwardStateLink(dic);
                                break;
                            #endregion

                            #region 个人日志的感想共享到活动感想表中
                            case "personallogsharetoactivity":
                                json = common.personalLogShareToActivity(dic);
                                break;

                            #endregion

                            #region 获取活动自定义 时令 一般活动main页面信息
                            case "activitydefinetotalpage":
                                strTalbeName = "v_getActivityForMain";
                                strFldname = "*";
                                //string category_id = "";
                                ie = dic.Keys.GetEnumerator();
                                strWhere = "";
                                while (ie.MoveNext())
                                {
                                    string currentKey = ie.Current.ToString().ToLower();
                                    if (currentKey == "type")/*1:时令活动，2：自定义活动3：一般活动*/
                                    {
                                        string strDefine = "846a7cc0437211e187e18901690cfed8";
                                        string strSeason = "b727f8fa437211q187e18901tyhcfed8";
                                        string currentValue = dic[ie.Current.ToString()].ToString().ToLower();
                                        switch (currentValue)
                                        {
                                            case "1": strWhere = string.Format(@" and  (FIND_IN_SET('{0}',categoryall)>0  or FIND_IN_SET('{0}',parent_idall)>0 ) ", strSeason); break;
                                            case "2": strWhere = string.Format(@" and  (FIND_IN_SET('{0}',categoryall)>0 or FIND_IN_SET('{0}',parent_idall)>0 )", strDefine); break;
                                            case "3": strWhere = string.Format(@" and (FIND_IN_SET('{0}',categoryall)=0  and  FIND_IN_SET('{0}',parent_idall)=0  and FIND_IN_SET('{1}',categoryall)=0 and FIND_IN_SET('{1}',parent_idall)=0)", strDefine, strSeason); break;
                                            default:
                                                break;
                                        }
                                        break;
                                    }
                                }
                                //strWhere = string.Format(@" AND category_id='{0}' OR parent_id='{0}'", category_id);
                                strFldSordId = "begin_datetime";
                                strSort = "0";
                                GetPaginationParams(strTalbeName, strFldname, strWhere, strFldSordId, strSort, ref dic);
                                json = common.WanerDaoPaginationToImage(dic);
                                break;
                            #endregion

                            #region //获取客户端语言
                            case "getclientlanguage":
                                json = CommonContext.GetClientLanguage();
                                break;
                            #endregion

                            #region 获取用户的进行中的或者历史的活动
                            case "getactivitynewandold":
                                ie = dic.Keys.GetEnumerator();
                                string type = "";
                                string currentUserId = CommonContext.GetUserSecurityInfo().user_id;
                                string sqlWhere = string.Format(@" AND DATE(end_Datetime) >= CURRENT_DATE and (a.original_id='{0}' OR a.id IN(SELECT  am.activity_id FROM activitymember am WHERE  am.user_id='{0}'))", currentUserId);
                                while (ie.MoveNext())
                                {
                                    if (ie.Current.ToString().ToLower().Equals("type"))
                                    {
                                        type = dic[ie.Current.ToString()].ToString(); break;
                                    }
                                }
                                if (type == "old") sqlWhere = string.Format(@"  AND DATE(end_Datetime)< CURRENT_DATE   and (a.original_id='{0}' OR a.id IN(SELECT  am.activity_id FROM activitymember am WHERE  am.user_id='{0}')) ", currentUserId);
                                strTalbeName = "activity a";
                                strFldname = " distinct(id), activity_name,max_nbr,join_member_nbr,begin_datetime,end_datetime";
                                strWhere = sqlWhere;
                                strFldSordId = "begin_datetime";
                                strSort = "1";
                                GetPaginationParams(strTalbeName, strFldname, strWhere, strFldSordId, strSort, ref dic);
                                json = common.WanerDaoPagination(dic);

                                break;

                            #endregion

                            #region 活动相册，个人相册上传照片
                            case "albumphotoupload"://batchid:批次编号，
                                json = common.AlbumPhotoUpload(dic);
                                break;
                            case "albumphotosubmit"://提交上传
                                /// <summary>
                                /// 照片确认上传
                                ///  个人共享相册存储地址为：YYYY-MM/DD/UserID/PersonalImageFolderID/；
                                ///  活动自建相册物理存储地址为：YYYY-MM/DD/ActivityID/ActivityImageFolderID/
                                /// </summary>
                                /// <param name="dic">string albumtype(1：活动，2：个人),batchid (批次id),
                                /// pList(照片列表) , permissionId, folderId(相册编号）， addFolderName，activityId（活动编号，如果是个人相册上传为分享的活动编号，活动相册上传为活动编号)
                                json = common.AlbumPhotoSumitUpload(dic);
                                break;
                            #endregion

                            #region ioc test
                            case "insertimagepythicallocation":
                                ImagePythicalLocationModel _model = new ImagePythicalLocationModel
                                {
                                    fileSize = 10,
                                    image_path = "111",
                                    image_small_path = "111",
                                    link_nbr = 1,
                                    user_id = "22"
                                };
                                json = IOCContainer.GetObject<IImagePythicalLocationBLL>().InsertModel(_model).ToString();
                                json = WanerDaoJSON.SerializeObject(json);
                                break;
                            case "insertactivityimagefolder":
                                ActivityImageFolderModel _foldermodel = new ActivityImageFolderModel
                                {
                                    activity_id = "1111",
                                    create_date = DateTime.Now,
                                    description = "des",
                                    is_block = false,
                                    is_system = true,
                                    share_key_id = "",
                                    user_id = "1111",
                                    id="111"
                                };
                                json = IOCContainer.GetObject<IActivityImageFolderBLL>().InsertModel(_foldermodel).ToString();
                                json = WanerDaoJSON.SerializeObject(json);
                                break;
                            case "insertactivityimage":
                                ActivityImageModel _imagemodel = new ActivityImageModel
                                {
                                    activity_id = "1111",
                                    create_id = "11111",
                                    description = "des",
                                    fileSize = 1,
                                    folder_id = "111",
                                    image_name = "testn",
                                    upload_date = DateTime.Now,
                                    is_submit = true,
                                    sequence = 1,
                                    image_path = "pa",
                                    image_small_path = "smallpa",
                                    is_block = false
                                };
                                json = IOCContainer.GetObject<IActivityImageBLL>().InsertModel(_imagemodel).ToString();
                                json = WanerDaoJSON.SerializeObject(json);
                                break;
                            case "shareactivityfolder":
                                json = IOCContainer.GetObject<IActivityImageFolderBLL>().ShareActivityFolder("111","222").ToString();
                                json = WanerDaoJSON.SerializeObject(json);
                                break;
                            #endregion
                        }
                   // }
                }
            }
            context.Response.Write(json);
        }
        #endregion

        /// <summary>
        /// 描述:构造分页查询参数
        /// </summary>
        /// <param name="_tablename">表名</param>
        /// <param name="_fldname">查询字段，如果是多个字段请用英文的“,”分隔</param>
        /// <param name="_where">where WHERE条件(不用传入WHERE关键字,可为空)</param>
        /// <param name="_fldSortId">排序条件(不用传入ORDER BY关键字,可为空)</param>
        /// <param name="_sort">0升序 1倒序</param>
        /// <param name="dic"></param>
        private void GetPaginationParams(string _tablename, string _fldname, string _where, string _fldSortId, string _sort, ref Dictionary<string, object> dic)
        {
            dic.Add("tablename", _tablename);
            dic.Add("fldName", _fldname);
            dic.Add("where", _where);
            dic.Add("fldSortId", _fldSortId);
            dic.Add("sort", _sort);
        }
        /// <summary>
        /// 描述:构造多条件活动查找查询参数
        /// </summary>
        /// <param name="_tableNames">表名，如果是多个字段请用英文的“,”分隔（默认表名ACTIVITY） 有助于联表查询</param>
        /// <param name="_fieldNames">查询字段，如果是多个字段请用英文的“,”分隔</param>
        /// <param name="_userId">用户ID：过滤掉用户已经参与了的活动，为空表示不过滤</param>
        /// <param name="_ortherWhereSql">其他自定义查询条件，开头不要带where、and </param>
        /// <param name="_fieldSortId">排序条件(不用传入ORDER BY关键字,可为空)</param>
        /// <param name="_sort">0升序 1倒序</param>
        /// <param name="dic"></param>
        private void GetSearchActivityByManyConditionsParams(string _tableNames, string _fieldNames, string _userId, string _ortherWhereSql, string _fieldSortId, int _sort, ref Dictionary<string, object> dic)
        {
            dic.Add("tableNames", _tableNames);
            dic.Add("fieldNames", _fieldNames);
            dic.Add("userId", _userId);
            dic.Add("ortherWhereSql", _ortherWhereSql);
            dic.Add("fieldSortId", _fieldSortId);
            dic.Add("sort", _sort);
        }

        /// <summary>
        /// 描述:构造获取用户感兴趣活动参数
        /// </summary>
        /// <param name="_tableNames">表名，如果是多个字段请用英文的“,”分隔（默认表名ACTIVITY） 有助于联表查询,注意表ACTIVITY不能命名别名</param>
        /// <param name="_fieldNames">查询字段，如果是多个字段请用英文的“,”分隔</param>
        /// <param name="_userId">用户ID</param>
        /// <param name="_ortherWhereSql">其他自定义查询条件，开头不要带where、and </param>
        /// <param name="_fieldSortId">排序条件(不用传入ORDER BY关键字,可为空)</param>
        /// <param name="_sort">0升序 1倒序</param>
        /// <param name="dic"></param>
        private void GetUserInterestsActivity(string _tableNames, string _fieldNames, string _ortherWhereSql, string _fieldSortId, int _sort, ref Dictionary<string, object> dic)
        {
            dic.Add("tableNames", _tableNames);
            dic.Add("fieldNames", _fieldNames);
            dic.Add("ortherWhereSql", _ortherWhereSql);
            dic.Add("fieldSortId", _fieldSortId);
            dic.Add("sort", _sort);
        }

        /// <summary>
        /// 从Dictionary中获取键值，并且删除键
        /// 添加人：徐兵 
        /// 时间：2011-11-22
        /// </summary>
        /// <param name="key">键名</param>
        /// <param name="dic">Dictionary</param>
        /// <returns></returns>
        private string GetAndRemoveValue(string key,Dictionary<string,object> dic)
        {
            string value = "";
            if (dic != null && dic.ContainsKey(key))
            {
                value = dic[key].ToString();
                dic.Remove(key);
            }
            return value;
        }
        /// <summary>
        /// 创建获取用户活动相册Dictionary
        /// 添加人：徐兵 
        /// 时间：2011-11-30
        /// </summary>
        /// <param name="dic"></param>
        private void CreateUserJoinActivityPageDic(Dictionary<string, object> dic)
        {
            string pageColumName = "a.id,a.activity_name,a.address,a.prepay_nbr,join_member_nbr,a.begin_datetime,a.end_datetime,a.report_datetime,a.description";
            string folderWhere = "and a.id=m.activity_id and m.user_id='" + GetAndRemoveValue("user_id", dic) + "' and m.active=1 and a.active=1";
            GetPaginationParams("activity a,ActivityMember m", pageColumName, folderWhere, "a.begin_datetime", "1", ref dic);
        }

        /// <summary>
        /// 获取帮助信息
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        private string getHelp(string key)
        {
            object ht = HttpContext.Current.Application.Get("helpTime");

            bool isreadyNew = false;
            if (ht == null)
            {
                isreadyNew = true;

            }
            else
            {
                DateTime t = (DateTime)ht;
                TimeSpan ts = DateTime.Now - t;
                if (ts.Days > 7)
                {
                    isreadyNew = true;
                }
            }
            if (isreadyNew)
            {
                WanerDaoModule.Config.WanerDaoFilterReader.setXML();
            }
            return getValue(key);
        }

        public string getValue(string key)
        {
            object obj = HttpContext.Current.Application.Get(key);
            if (obj == null)
            {
                WanerDaoModule.Config.WanerDaoFilterReader.setXML();
            }
            if (obj == null)
            {
                return "";
            }
            else
            {
                string v = (string)obj;
                return WanerDaoJSON.GetSuccessJson(v);
            }
        }

        public string GetCurrentUserID()
        {
            //return "a67b8a1818a941c7928d491324aaf15d";
            string current_userid = "";
            try
            {

                PersonalSecurityProfileModel pspmodel = CommonContext.GetUserSecurityInfo();
                current_userid = pspmodel != null ? pspmodel.user_id : "";
            }
            catch
            { }
            return current_userid;
        }

        public string GetRegionAndInterestActivity(string count)
        {
            Dictionary<string, object> _interestActivity = new Dictionary<string, object>();
            _interestActivity.Add("pagecurrent", 1);
            _interestActivity.Add("pageSize", count);
            _interestActivity.Add("userId", GetCurrentUserID());
            //_interestActivity.Add("userId", "a67b8a1818a941c7928d491324aaf15d");

            string _cityId = "";
            //_cityId = " and activity.city_id='00007afa-f4b4-11e0-b192-00306701b527' ";
            IWanerDaoPersonInfoManager _personal = new WanerDaoPersonInfoManager();
            PersonalProfileModel _pModel = _personal.GetPersonalProfileModel();
            if (_pModel != null && string.IsNullOrEmpty(_pModel.current_city_id))
            {
                _cityId = " and activity.city_id='" + _pModel.current_city_id + "' ";
            }

            GetUserInterestsActivity("activity left join personalprofile p on activity.original_id=p.user_id", "activity.id,activity_name,activity.activity_score,address,join_member_nbr,activity.follow_score,original_id,p.name,description,0 personcost, '' imagepath", " activity.active=1 and activity.is_visible=1 " + _cityId, "activity.begin_datetime", 0, ref _interestActivity);
            IWanerDaoCommon common = new WanerDao2.WanerDaoBLL.Common.WanerdaoCommon() as IWanerDaoCommon;
            return common.WanerDaoSearchUserInterestsActivity(_interestActivity);
        }
        public string ActivityPageSearchActivity(Dictionary<string,object> dic,string where )
        {
            GetPaginationParams("activity a left join personalprofile p on a.original_id=p.user_id", "a.id,a.activity_name,activity_link,original_id,datetime,description,prepay_nbr,max_nbr,join_member_nbr,address,begin_datetime,end_datetime,datetime as report_datetime,report_datetime report_end_datetime,(select SUBSTRING_INDEX(GROUP_CONCAT(acs.category_name),',',3)  from ActivityCategory ac,activitycategorysettings acs where ac.category_id=acs.id and ac.activity_id=a.id and ac.active=1 and acs.language_id='" + CommonContext.GetClientLanguage() + "' ) category_names ,p.name original_name,p.logo_small_path", " and a.active=1 and a.is_create=1 and a.is_visible=1 and a.datetime>now() " + where, "a.datetime", "1", ref dic);
            IWanerDaoCommon common = new WanerDao2.WanerDaoBLL.Common.WanerdaoCommon() as IWanerDaoCommon;
            return  common.WanerDaoPaginationToImage(dic);
        }

        //错误码
        public static string ERROR_CODE = "-1";
    }

}