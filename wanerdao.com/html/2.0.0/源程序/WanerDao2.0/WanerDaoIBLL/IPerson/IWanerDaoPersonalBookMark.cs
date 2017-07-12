#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 用户收藏夹接口
* 作者：吴志斌   时间：2011/12/5 22:48:00 
* 文件名：IWanerDaoPersonalBookMark 
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
    public interface IWanerDaoPersonalBookMark
    {
        #region 收藏夹分类
        /// <summary>
        /// 新增收藏夹分类
        /// </summary>
        /// <param name="dic">收藏夹分类模型</param>
        /// <returns></returns>
        string AddBookMarkCategory(Dictionary<string, object> dic);

        /// <summary>
        /// 更新收藏夹分类
        /// </summary>
        /// <param name="dic">收藏夹分类模型</param>
        /// <returns></returns>
        string UpdateBookMarkCategory(Dictionary<string, object> dic);

        /// <summary>
        /// 根据收藏夹分类Id删除收藏夹分类
        /// </summary>
        /// <param name="dic">收藏夹分类Id</param>
        /// <returns></returns>
        string DeleteBookMarkCategoryById(Dictionary<string, object> dic);

        /// <summary>
        /// 根据创建者Id删除收藏夹分类
        /// </summary>
        /// <param name="dic">创建者Id</param>
        /// <returns></returns>
        string DeleteBookMarkCategoryByCreateId(Dictionary<string, object> dic);

        /// <summary>
        /// 收藏夹分类排序
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string SortBookMarkCategory(Dictionary<string, object> dic);

        /// <summary>
        /// 查询所有的收藏夹分类
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string SelectAllBookMarkCategory(Dictionary<string, object> dic);

        /// <summary>
        /// 根据收藏夹分类Id查询收藏夹分类
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string SelectBookMarkCategoryById(Dictionary<string, object> dic);
        #endregion

        #region 个人收藏夹
        /// <summary>
        /// 添加收藏夹
        /// </summary>
        /// <param name="dic">收藏夹模型</param>
        /// <returns></returns>
        string AddPersonalBookMark(Dictionary<string, object> dic);

        /// <summary>
        /// 更新收藏夹
        /// </summary>
        /// <param name="dic">收藏夹模型</param>
        /// <returns></returns>
        string UpdatePersonalBookMark(Dictionary<string, object> dic);

        /// <summary>
        /// 收藏夹排序
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string SortPersonalBookMark(Dictionary<string, object> dic);

        /// <summary>
        /// 根据收藏夹Id删除收藏夹
        /// </summary>
        /// <param name="dic">收藏夹Id</param>
        /// <returns></returns>
        string DeletePersonalBookMarkById(Dictionary<string, object> dic);

        /// <summary>
        /// 根据用户Id删除收藏夹
        /// </summary>
        /// <param name="dic">用户Id</param>
        /// <returns></returns>
        string DeletePersonalBookMarkByUserId(Dictionary<string, object> dic);

        /// <summary>
        /// 根据分类Id查询收藏夹
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string SelectPersonalBookMarkByCategoryId(Dictionary<string, object> dic);

        /// <summary>
        /// 根据收藏夹Id查询收藏夹
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string SelectPersonalBookMarkById(Dictionary<string, object> dic);
        #endregion
    }
}
