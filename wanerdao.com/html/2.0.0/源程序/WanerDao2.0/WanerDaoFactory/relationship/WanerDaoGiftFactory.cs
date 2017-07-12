#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：xux   时间：2012/4/16
* 文件名：WanerDaoGiftFactory 
* 版本：V1.0.1 
* 
* 修改者： 时间： 
* 修改说明： 
* ======================================================================== 
*/
#endregion

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.SessionState;
using WanerDao2.WanerDaoIBLL.IRelation;
using WanerDao2.WanerDaoModel.Person;
using WanerDao2.WanerDaoModule.Validation;
using WanerDao2.WanerDaoModule.Json;

namespace WanerDao2.WanerDaoBLLFactory.relationship
{
     public class WanerDaoGiftFactory : IHttpHandler, IRequiresSessionState
    {

          IWanerDaoGift iwdg = new WanerDao2.WanerDaoBLL.Relation.WanerDaoGift() as IWanerDaoGift;

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
            PersonalSecurityProfileModel pspmodel = CommonContext.GetUserSecurityInfo();
            string typestr = WanerDaoValidation.ValidateParamters(context.Request.Form.ToString());
            int i;
            if (typestr == string.Empty)
            {
                json = WanerDaoJSON.GetErrorJson("no operator type or invalid operator!");
            }
            else
            {
                Dictionary<string, object> dic = WanerDaoJSON.GetContentInfo(context.Request.Form.ToString());
                dic.Add("language_id", "a098d6c8-f181-11e0-8a53-00306701b527");
                
                switch (typestr)
                {
                   

                    #region 查询礼品分类
                    case "getgiftcategory":
                        json = iwdg.GetGiftCategory(dic);
                       
                        break;
                    #endregion
                    #region 查询礼品库
                    case "searchgiftmarket":
                        json = iwdg.SearchGiftMarket(dic);
                        break;
                    #endregion
                    #region 查询礼品详细
                    case "getgift":
                        json = iwdg.GetGift(dic);

                        break;
                    #endregion
                    #region 查询我的礼物
                    case "getmygift":
                        json = iwdg.GetExistsGift(dic);

                        break;
                    #endregion
                    #region 赠送礼物
                    case "sendgift":
                        string idstr = dic["friend_id"].ToString();
                        string[] idarr =  WanerDao2.WanerDaoModule.String.WanerDaoString.SplitString(idstr,"-");
                        foreach (string id in idarr) {
                            if (id != "") {
                                iwdg.SendGiftToFriend(dic);
                            }
                        }
                       

                        break;
                    #endregion
                 
                }

               
               
              //json = WanerDaoComponent.WanerDaoPrint.getPrintTemplete(null ,"demo"); ;//WanerDaoJSON.GetSuccessJson(WanerDaoPropertyPermission.get_DefaultPermission(user1).ToString());
            }
            context.Response.Write(json);
        }

    }
}
