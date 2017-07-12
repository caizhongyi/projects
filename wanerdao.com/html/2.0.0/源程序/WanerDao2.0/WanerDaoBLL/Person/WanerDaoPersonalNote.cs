#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 用户记事本功能实现
* 作者：吴志斌   时间：2011/12/4 10:48:13 
* 文件名：WanerDaoPersonalNote 
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
using WanerDao2.WanerDaoIBLL.IPerson;
using WanerDao2.WanerDaoDALFactory;
using WanerDao2.WanerDaoModule.Json;

namespace WanerDao2.WanerDaoBLL.Person
{
    public class WanerDaoPersonalNote : IWanerDaoPersonalNote
    {
        /// <summary>
        /// 构造方法
        /// </summary>
        public WanerDaoPersonalNote()
        { }

        /// <summary>
        /// 查询所有的记事本
        /// </summary>
        /// <param name="dic">分页参数</param>
        /// <returns></returns>
        public string SelectAllNotes(Dictionary<string, object> dic)
        {
            return DbHelperFactory.SingleInstance().GetDataTable("PersonSQL", "SelectAllNotes", dic);
        }

        /// <summary>
        /// 添加记事本
        /// </summary>
        /// <param name="dic">记事本模型</param>
        /// <returns></returns>
        public string AddNote(Dictionary<string, object> dic)
        {
            if (!HasOverMaxStorage(dic))
            {
                object maxSeq = DbHelperFactory.SingleInstance().GetScalar("PersonSQL", "SelectMaxNoteSequnceByUserId", dic);
                int suquence = maxSeq == null ? 1 : Convert.ToInt32(maxSeq) + 1;
                int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "AddNote", dic);
                if (result > 0)
                {
                    return Message("添加成功", MessageType.success);
                }
                else
                {
                    return Message("添加失败", MessageType.error);
                }
            }
            else
            {
                return Message("记事本信息已超过最大存储容量", MessageType.error);
            }
        }

        /// <summary>
        /// 更新记事本
        /// </summary>
        /// <param name="dic">记事本模型</param>
        /// <returns></returns>
        public string UpdateNote(Dictionary<string, object> dic)
        {
            if (!HasOverMaxStorage(dic))
            {
                int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdateNote", dic);
                if (result > 0)
                {
                    return Message("更新成功", MessageType.success);
                }
                else
                {
                    return Message("更新失败", MessageType.error);
                }
            }
            else
            {
                return Message("记事本信息已超过最大存储容量", MessageType.error);
            }
        }

        /// <summary>
        /// 排序
        /// </summary>
        /// <param name="dic">UP OR DOWN</param>
        /// <returns></returns>
        public string SortNote(Dictionary<string, object> dic)
        { 
            //TODO: 目前暂时不要进行排序
            return null;
        }

        /// <summary>
        /// 删除记事本
        /// </summary>
        /// <param name="dic">记事本Id，用户Id，当前记事本序号</param>
        /// <returns></returns>
        public string DeleteNote(Dictionary<string, object> dic)
        {
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "DeleteNote", dic);
            if (result > 0)
            {
                //删除成功，重新排序记事本顺序
                DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "SortNoteSeqAfterDelete", dic);
                return Message("删除成功", MessageType.success);
            }
            else
            {
                return Message("删除失败", MessageType.error);
            }
        }

        /// <summary>
        /// 根据记事本Id查询记事本
        /// </summary>
        /// <param name="dic">记事本Id</param>
        /// <returns></returns>
        public string SelectNoteById(Dictionary<string, object> dic)
        {
            return DbHelperFactory.SingleInstance().GetDataTable("PersonSQL", "SelectNoteById", dic);
        }

        /// <summary>
        /// 判断是否超过最大存储容量
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        private bool HasOverMaxStorage(Dictionary<string, object> dic)
        {
            double maxStorage = GetPersonalNoteStorage(dic) * 1024 * 1024;
            object obj = DbHelperFactory.SingleInstance().GetScalar("PersonSQL", "GetTotalStorage", dic);
            double storage = obj == null ? 0 : Convert.ToDouble(obj);
            return storage > maxStorage;
        }

        /// <summary>
        /// 获得用户记事本最大存储容量
        /// </summary>
        /// <param name="dic">用户Id</param>
        /// <returns></returns>
        private int GetPersonalNoteStorage(Dictionary<string, object> dic)
        {
            //TODO: 根据用户编号获得记事本最大存储容量。
            return 2;
        }

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

