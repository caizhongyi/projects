#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 用户记事本接口
* 作者：吴志斌   时间：2011/12/4 10:48:13 
* 文件名：IWanerDaoPersonalNote 
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

namespace WanerDao2.WanerDaoIBLL.IPerson
{
    public interface IWanerDaoPersonalNote
    {
        /// <summary>
        /// 添加记事本
        /// </summary>
        /// <param name="dic">记事本模型</param>
        /// <returns></returns>
        string AddNote(Dictionary<string, object> dic);

        /// <summary>
        /// 更新记事本
        /// </summary>
        /// <param name="dic">记事本模型</param>
        /// <returns></returns>
        string UpdateNote(Dictionary<string, object> dic);

        /// <summary>
        /// 排序
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string SortNote(Dictionary<string, object> dic);

        /// <summary>
        /// 删除记事本
        /// </summary>
        /// <param name="dic">记事本Id</param>
        /// <returns></returns>
        string DeleteNote(Dictionary<string, object> dic);

        /// <summary>
        /// 根据记事本Id查询记事本
        /// </summary>
        /// <param name="dic">记事本Id</param>
        /// <returns></returns>
        string SelectNoteById(Dictionary<string, object> dic);

        /// <summary>
        /// 查询所有的记事本
        /// </summary>
        /// <param name="dic">分页参数</param>
        /// <returns></returns>
        string SelectAllNotes(Dictionary<string, object> dic);
    }
}
