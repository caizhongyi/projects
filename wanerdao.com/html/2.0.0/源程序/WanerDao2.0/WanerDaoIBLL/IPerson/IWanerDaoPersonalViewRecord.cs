using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoModel.Person;

namespace WanerDao2.WanerDaoIBLL.IPerson
{
    public interface IWanerDaoPersonalViewRecord
    {
        /// <summary>
        /// 创建个人阅读记录
        /// </summary>
        /// <param name="viewRecord">个人阅读记录实体</param>
        /// <returns></returns>
        string CreateViewRecord(PersonalViewRecordModel viewRecord);
        /// <summary>
        /// 删除个人阅读记录
        /// </summary>
        /// <param name="id">个人阅读记录实体</param>
        /// <returns></returns>
        string DeleteViewRecord(string id);
        /// <summary>
        /// 通过主键获取个人阅读记录
        /// </summary>
        /// <param name="id">阅读记录主键</param>
        /// <returns></returns>
        string GetViewRecordById(string id);
        /// <summary>
        /// 通过用户主键、来源主键、来源类型主键获取个人阅读记录
        /// </summary>
        /// <param name="userId">用户主键</param>
        /// <param name="sourceId">来源主键</param>
        /// <param name="sourceTypeId">来源类型主键</param>
        /// <returns></returns>
        string GetViewRecordByCompositeKey(string userId, string sourceId, string sourceTypeId);
        /// <summary>
        /// 查询是否有阅读记录
        /// </summary>
        /// <param name="userId">用户主键</param>
        /// <param name="source_type_id">来源类型主键</param>
        /// <param name="sourceId">来源主键</param>
        /// <returns></returns>
        Boolean HasViewRecord(string userId, string source_type_id, string sourceId);
    }
}
