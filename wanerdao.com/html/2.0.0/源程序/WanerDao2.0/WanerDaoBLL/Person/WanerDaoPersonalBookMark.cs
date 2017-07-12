#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 用户收藏夹
* 作者：吴志斌   时间：2011/12/5 22:48:00 
* 文件名：WanerDaoPersonalBookMark 
* 版本：V1.0.0 
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
using WanerDao2.WanerDaoDALFactory;
using WanerDao2.WanerDaoModule.Json;
using WanerDao2.WanerDaoIBLL.IPerson;

namespace WanerDao2.WanerDaoBLL.Person
{
    public class WanerDaoPersonalBookMark : IWanerDaoPersonalBookMark
    {
        public WanerDaoPersonalBookMark()
        { }

        #region BookMarkCategory
        /// <summary>
        /// 添加收藏夹分类
        /// </summary>
        /// <param name="dic">收藏夹分类模型</param>
        /// <returns></returns>
        public string AddBookMarkCategory(Dictionary<string, object> dic)
        {
            //TODO: get the max sequence
            object maxSeq = DbHelperFactory.SingleInstance().GetScalar("PersonSQL", "SelectMaxSequnceByCreateId", dic);
            int suquence = maxSeq == null ? 1 : Convert.ToInt32(maxSeq) + 1;
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "AddBookMarkCategory", dic);
            if (result > 0)
            {
                return Message("添加成功", MessageType.success);
            }
            else
            {
                return Message("添加失败", MessageType.error);
            }
        }

        /// <summary>
        /// 更新收藏夹分类
        /// </summary>
        /// <param name="dic">收藏夹分类模型</param>
        /// <returns></returns>
        public string UpdateBookMarkCategory(Dictionary<string, object> dic)
        {
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdateBookMarkCategory", dic);
            if (result > 0)
            {
                return Message("更新成功", MessageType.success);
            }
            else
            {
                return Message("更新失败", MessageType.error);
            }
        }

        public string SortBookMarkCategory(Dictionary<string, object> dic)
        {
            //TODO: 排序收藏夹分类
            return null;
        }

        /// <summary>
        /// 根据收藏夹分类Id删除收藏夹分类
        /// </summary>
        /// <param name="dic">收藏夹分类Id</param>
        /// <returns></returns>
        public string DeleteBookMarkCategoryById(Dictionary<string, object> dic)
        {
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "DeleteBookMarkCategory", dic);
            if (result > 0)
            {
                //删除成功，重新排序收藏夹分类顺序
                DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "SortBookMarkCategorySeqAfterDel", dic);
                return Message("删除成功", MessageType.success);
            }
            else
            {
                return Message("删除失败", MessageType.error);
            }
        }

        /// <summary>
        /// 根据创建者Id删除收藏夹分类
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string DeleteBookMarkCategoryByCreateId(Dictionary<string, object> dic)
        {
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "DeleteBookMarkCategoryByCreateId", dic);
            if (result > 0)
            {
                return Message("删除成功", MessageType.success);
            }
            else
            {
                return Message("删除失败", MessageType.error);
            }
        }

        /// <summary>
        /// 查询收藏夹分类
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string SelectAllBookMarkCategory(Dictionary<string, object> dic)
        {
            return DbHelperFactory.SingleInstance().GetDataTable("PersonSQL", "SelectAllBookMarkCategory", dic);
        }

        /// <summary>
        /// 根据收藏夹分类Id查询收藏夹分类
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string SelectBookMarkCategoryById(Dictionary<string, object> dic)
        {
            return DbHelperFactory.SingleInstance().GetDataTable("PersonSQL", "SelectBookMarkCategoryById", dic);
        }
        #endregion

        #region PersonalBookMark
        /// <summary>
        /// 添加收藏夹
        /// </summary>
        /// <param name="dic">收藏夹模型</param>
        /// <returns></returns>
        public string AddPersonalBookMark(Dictionary<string, object> dic)
        {
            //TODO: get the max sequence by user_id, category_id
            object maxSeq = DbHelperFactory.SingleInstance().GetScalar("PersonSQL", "SelectMaxSequnceByUserId", dic);
            int suquence = maxSeq == null ? 1 : Convert.ToInt32(maxSeq) + 1;
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "AddPersonalBookMark", dic);
            if (result > 0)
            {
                return Message("添加成功", MessageType.success);
            }
            else
            {
                return Message("添加失败", MessageType.error);
            }
        }

        /// <summary>
        /// 更新收藏夹
        /// </summary>
        /// <param name="dic">收藏夹模型</param>
        /// <returns></returns>
        public string UpdatePersonalBookMark(Dictionary<string, object> dic)
        {
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdatePersonalBookMark", dic);
            if (result > 0)
            {
                return Message("更新成功", MessageType.success);
            }
            else
            {
                return Message("更新失败", MessageType.error);
            }
        }

        /// <summary>
        /// 排序收藏夹
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string SortPersonalBookMark(Dictionary<string, object> dic)
        {
            //TODO: 排序收藏夹,暂时不需要完成
            return null;
        }
        
        /// <summary>
        /// 根据收藏夹Id删除收藏夹
        /// </summary>
        /// <param name="dic">收藏夹Id</param>
        /// <returns></returns>
        public string DeletePersonalBookMarkById(Dictionary<string, object> dic)
        {
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "DeletePersonalBookMarkById", dic);
            if (result > 0)
            {
                //删除成功，重新排序收藏夹顺序
                DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "SortBookMarkSeqAfterDel", dic);
                return Message("删除失败", MessageType.success);
            }
            else
            {
                return Message("删除成功", MessageType.error);
            }
        }

        /// <summary>
        /// 根据用户Id删除收藏夹
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string DeletePersonalBookMarkByUserId(Dictionary<string, object> dic)
        {
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "DeletePersonalBookMarkByUserId", dic);
            if (result > 0)
            {
                return Message("删除成功", MessageType.success);
            }
            else
            {
                return Message("删除失败", MessageType.error);
            }
        }

        /// <summary>
        /// 根据分类编号查询收藏夹信息
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string SelectPersonalBookMarkByCategoryId(Dictionary<string, object> dic)
        {
            return DbHelperFactory.SingleInstance().GetDataTable("PersonSQL", "SelectPersonalBookMarkByCategoryId", dic);
        }

        /// <summary>
        /// 根据收藏夹Id查询收藏夹
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string SelectPersonalBookMarkById(Dictionary<string, object> dic)
        {
            return DbHelperFactory.SingleInstance().GetDataTable("PersonSQL", "SelectPersonalBookMarkById", dic);
        }
        #endregion

        #region 私有成员
        private string Message(string message, MessageType msgtype)
        {
            if (msgtype == MessageType.success)
            {
                return WanerDaoJSON.GetSuccessJson(message);
            }
            else
            {
                return WanerDaoJSON.GetErrorJson(message);
            }
        }

        enum MessageType
        {
            success,
            error
        }
        #endregion
    }
}
