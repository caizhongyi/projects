#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 个人礼物相关接口操作类
* 作者：杨晓东   时间：2012/4/9 23:13:54 
* 文件名：IWanerDaoPersonGift 
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

namespace WanerDao2.WanerDaoIBLL.IRelation
{
    public interface IWanerDaoGift
    {
        /// <summary>
        /// 向好友赠送礼物
        /// </summary>
        /// <param name="dic">string friend_id,string gift_id,
        /// string category_id(节日id),string date_time,string content</param>
        /// <returns></returns>
        string SendGiftToFriend(Dictionary<string, object> dic);

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
        string GetExistsGift(Dictionary<string, object> dic);

        /// <summary>
        /// 获取礼物的详细信息
        /// </summary>
        /// <param name="dic">string gift_id</param>
        /// <returns>礼品图片路径,序号,礼品名,分类,发送人,发送时间,送礼描述</returns>
        string GetGiftDetailInfo(Dictionary<string, object> dic);

        /// <summary>
        /// 查找礼物商店中的礼物
        /// </summary>
        /// <param name="dic">string keyword(根据标题或内容关键字查找),
        /// string category_id(不传的话为查找所有分类),
        /// string pagecurrent,string pageSize</param>
        /// <returns></returns>
        string SearchGiftMarket(Dictionary<string, object> dic);

        /// <summary>
        /// 查询礼品分类
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string GetGiftCategory(Dictionary<string, object> dic);

        /// <summary>
        /// 查询礼品详细
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string GetGift(Dictionary<string, object> dic);

 
    }
}
