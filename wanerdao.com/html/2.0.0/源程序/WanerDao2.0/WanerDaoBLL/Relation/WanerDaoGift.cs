#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：杨晓东   时间：2012/4/12 0:41:24 
* 文件名：WanerDaoGift 
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
using WanerDao2.WanerDaoIBLL.IRelation;
using WanerDao2.WanerDaoModel.Person;
using WanerDao2.WanerDaoIBLL.IPerson;
using WanerDao2.WanerDaoModel.Relation;
using WanerDao2.WanerDaoDALFactory;
using WanerDao2.WanerDaoModule.Json;
using WanerDao2.WanerDaoModule.TipInfo;

namespace WanerDao2.WanerDaoBLL.Relation
{
    public class WanerDaoGift : IWanerDaoGift
    {
        #region 全局参数
        /// <summary>
        /// 用户个人信息
        /// </summary>
        private static readonly PersonalProfileModel m_ppModel = null;

        /// <summary>
        /// 数据库操作类
        /// </summary>
        private WanerDaoDbWrapper m_DbHelper = null;

        private const string SQL_FILE = "RelationSQL";

        #endregion

        #region 构造函数
        public WanerDaoGift()
        {
            m_DbHelper = DbHelperFactory.SingleInstance();
        }

        static WanerDaoGift()
        {
            if (m_ppModel == null)
            {
                IWanerDaoPersonInfoManager IPersonInfo =
                   new WanerDaoBLL.Person.WanerDaoPersonInfoManager();
                m_ppModel = IPersonInfo.GetPersonalProfileModel();//不传参数的话为获取当前用户信息
            }
        }
        #endregion

        /// <summary>
        /// 向好友赠送礼物
        /// </summary>
        /// <param name="dic">string friend_id,string gift_id,
        /// string date_time,string content</param>
        /// <returns></returns>
        public string SendGiftToFriend(Dictionary<string, object> dic)
        {
            string friend_id = dic["friend_id"].ToString();
            string gift_id = dic["gift_id"].ToString();
            DateTime date_time = Convert.ToDateTime(dic["date_time"].ToString());
            string content = dic["content"].ToString();

            PersonalGiftModel pGiftModel = new PersonalGiftModel();
            //发送出去的
            pGiftModel.id = WanerDaoModule.WanerDaoGuid.WanerDaoGuid.GetGuid();
            pGiftModel.user_id = m_ppModel.user_id;
            pGiftModel.gift_id = gift_id;
            pGiftModel.action_date = date_time;
            pGiftModel.action_id = friend_id;
            pGiftModel.content = content;
            if (date_time.Date == DateTime.Now.Date)//如果选的时间是当天,就立即发送
            {
                pGiftModel.is_receive = 0;//是发送的
            }
            else if (date_time.Date > DateTime.Now.Date)
            {
                pGiftModel.is_receive = 2;//选定的日期大于当前日期, 定时发送
            }
            else
            {
                return ErrMsg("TimeError");
            }

            try
            {
                int result1 = m_DbHelper.ExecuteNonQuery<PersonalGiftModel>(SQL_FILE, "SendGiftToFriendBySelf", pGiftModel);
                //朋友接收的
                pGiftModel.id = WanerDaoModule.WanerDaoGuid.WanerDaoGuid.GetGuid();
                pGiftModel.user_id = friend_id;
                pGiftModel.is_receive = 1;
                pGiftModel.action_id = m_ppModel.user_id;

                int result2 = m_DbHelper.ExecuteNonQuery<PersonalGiftModel>(SQL_FILE, "SendGiftToFriendBySelf", pGiftModel);

                if (result1 > 0 && result2 > 0)
                {
                    return SucMsg("SuccessInfoCn");
                }
                else
                {
                    return ErrMsg("FailInfoCn");
                }
            }
            catch (Exception)
            {
                return ErrMsg("FailInfoCn");
            }

        }

        /// <summary>
        /// 获取自己有的礼物包括已经发出去的和收到的
        /// </summary>
        /// <param name="dic">string is_received(表示是不是发送的:
        /// 1表示接收到的礼物  0表示发送的 2表示未发出去的也就是别人还未接收到的  
        /// 不传或者传空字符串或者传-1 表示所有),
        /// string pagecurrent,string pageSize  
        /// </param>
        /// <remarks>按礼品类别分组,查询结果带数量</remarks>
        /// <returns></returns>
        public string GetExistsGift(Dictionary<string, object> dic)
        {
            System.Data.DataSet ds = null;
            string is_received = dic.ContainsKey("is_received") ? dic["is_received"].ToString() : null;

            Dictionary<string, object> mydic = new Dictionary<string, object>();
            mydic.Add("user_id", m_ppModel.user_id);
            mydic.Add("is_received", is_received);
            mydic.Add("pagecurrent", dic["pagecurrent"].ToString());
            mydic.Add("pageSize", dic["pageSize"].ToString());

            if (string.IsNullOrEmpty(is_received))
            {
                mydic["is_received"] = "-1";//-1代表查询所有的                
            }
            ds = m_DbHelper.GetDataSet(SQL_FILE, "GetExistsGift", mydic);
            WanerDaoIBLL.ICommon.IWanerDaoCommon ICommon = new WanerDaoBLL.Common.WanerdaoCommon();
            string result = ICommon.WanerDaoPagination(ds);
            return result;
        }

        /// <summary>
        /// 获取礼物的详细信息
        /// </summary>
        /// <param name="dic">string gift_id</param>
        /// <returns>礼品图片路径,序号,礼品名,分类,发送人,发送时间,送礼描述</returns>
        public string GetGiftDetailInfo(Dictionary<string, object> dic)
        {
            dic.Add("user_id", m_ppModel.user_id);
            string result = m_DbHelper.GetDataTable(SQL_FILE, "GetGiftDetailInfo", dic);
            return result;
        }

        /// <summary>
        /// 查询礼品详细
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string GetGift(Dictionary<string, object> dic)
        {
            string result = m_DbHelper.GetDataTable(SQL_FILE, "GetGift", dic);
            return result;
        }

        /// <summary>
        /// 查找礼物商店中的礼物
        /// </summary>
        /// <param name="dic">string keyword(根据标题或内容关键字查找),
        /// string category_id(不传的话为查找所有分类),
        /// string pagecurrent,string pageSize</param>
        /// <returns></returns>
        public string SearchGiftMarket(Dictionary<string, object> dic)
        {
            string pagecurrent = dic["pagecurrent"].ToString();
            string keyword = dic["keyword"].ToString();
            string pageSize = dic["pageSize"].ToString();
            string category_id = dic.ContainsKey("category_id") ? dic["category_id"].ToString() : null;
            string where_condition = string.Empty;

            Dictionary<string, object> mydic = new Dictionary<string, object>();
            mydic.Add("tablename", "GiftsMarket gm inner join GiftCategory gc on gm.category_id=gc.id");
            mydic.Add("fldName", "gm.id,gm.gift_logo_path,gm.gift_name,gc.category_name,gm.description");
            if (!string.IsNullOrEmpty(category_id))
            {
                where_condition += "and gm.category_id ='" + category_id + "'";
            }
            if ("" != keyword.Trim())
            {
                where_condition += "and (gm.gift_name like'%" + keyword + "%' or gm.description like '%" + keyword + "%')";
            }
            mydic.Add("where", where_condition + " and gm.language_id='" + CommonContext.GetClientLanguage() + "' gm.active=true");
            mydic.Add("fldSortId", "gc.category_name");
            mydic.Add("sort", 1);
            mydic.Add("pagecurrent", pagecurrent);
            mydic.Add("pageSize", pageSize);
            WanerDaoIBLL.ICommon.IWanerDaoCommon ICommon = new WanerDaoBLL.Common.WanerdaoCommon();
            string result = ICommon.WanerDaoPagination(ICommon.WanerDaoPaginationDataSet(mydic));
            return result;
        }



        /// <summary>
        /// 查询礼品分类
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string GetGiftCategory(Dictionary<string, object> dic)
        {
            return m_DbHelper.GetDataTable(SQL_FILE, "GetGiftCategory", dic);
        }

        #region IRunnableByDay 成员

        public void RunByDay()
        {
            m_DbHelper.ExecuteNonQuery(SQL_FILE, "RunByDay");
        }

        #endregion

        #region 私有成员
        private string SucMsg(string key)
        {
            string tipLanguage = WanerDaoGlobalTip.GetInternationalizationTip(key);
            return WanerDaoJSON.GetSuccessJson(tipLanguage);
        }
        private string ErrMsg(string key)
        {
            string tipLanguage = WanerDaoGlobalTip.GetInternationalizationTip(key);
            return WanerDaoJSON.GetErrorJson(tipLanguage);
        }
        #endregion
    }
}
