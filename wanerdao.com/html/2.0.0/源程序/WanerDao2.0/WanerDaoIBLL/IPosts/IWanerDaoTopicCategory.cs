using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoModel.Post;

namespace WanerDao2.WanerDaoIBLL.IPosts
{
    public interface IWanerDaoTopicCategory
    {
        /// <summary>
        /// 创建杂烩话题分类
        /// </summary>
        /// <param name="topic">杂烩话题分类实体，需要填充id,parent_id,category_name,update_date,language_id,active</param>
        /// <returns></returns>
        string CreateTopicCategory(TopicCategoryModel topic);
        /// <summary>
        /// 更新杂烩话题分类
        /// </summary>
        /// <param name="topic">杂烩话题分类实体，需要填充category_id,id,parent_id</param>
        /// <returns></returns>
        string UpdateTopicCategory(TopicCategoryModel topic);
        /// <summary>
        /// 删除杂烩话题分类实体
        /// </summary>
        /// <param name="id">杂烩话题分类主键</param>
        /// <returns></returns>
        string DeleteTopicCategory(string id);
        /// <summary>
        /// 更新杂烩话题分类实体状态
        /// </summary>
        /// <param name="id">杂烩话题分类主键</param>
        /// <param name="active">状态</param>
        /// <returns></returns>
        string DisableTopicCategory(string id, bool active);
        /// <summary>
        /// 通过主键获取杂烩话题分类
        /// </summary>
        /// <param name="id">杂烩话题分类主键</param>
        /// <returns></returns>
        string GetTopicCategoryById(string id);
        ///// <summary>
        ///// 通过父ID获取杂烩话题分类
        ///// </summary>
        ///// <param name="parentId">杂烩话题父ID</param>
        ///// <returns></returns>
        //string GetTopicCategoryByParentId(string parentId);

        string GetAllTopicCategory();

    }
}
