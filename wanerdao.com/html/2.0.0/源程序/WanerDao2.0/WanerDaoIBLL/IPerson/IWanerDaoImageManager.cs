#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 个人相册管理接口
* 作者：杨晓东   时间：2011/10/2 19:43:26 
* 文件名：IWanerDaoImageManager 
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
using WanerDao2.WanerDaoModel.Person;
using System.Data;

namespace WanerDao2.WanerDaoIBLL.IPerson
{
    public interface IWanerDaoImageManager
    {
        #region 个人相册管理

        /// <summary>
        /// 添加相册
        /// </summary>
        /// <param name="ifmodel">相册模型</param>
        /// <returns></returns>
        string AddImageFolder(Dictionary<string, object> dic);

        /// <summary>
        /// 添加相册
        /// </summary>
        /// <param name="ifmodel">相册模型</param>
        /// <returns></returns>
        bool AddImageFolder(ImageFolderModel ifmodel);

        /// <summary>
        /// 修改相册
        /// </summary>
        /// <param name="ifmodel">相册模型</param>
        /// <returns></returns>
        bool UpdateImageFolder(ImageFolderModel ifmodel);

        /// <summary>
        /// 修改相册
        /// </summary>
        /// <param name="dic">string folder_id,string folder_name,string permission,string description</param>
        /// <returns></returns>如果某一项为空也就是说不需要修改 请不要传或者传""
        string UpdateImageFolder(Dictionary<string, object> dic);

        /// <summary>
        /// 删除相册
        /// </summary>
        /// <param name="dic">相册id</param>
        /// <returns></returns>
        String DeleteImageFolder(Dictionary<string, object> dic);

        /// <summary>
        /// 根据相册名称查询相册
        /// </summary>
        /// <param name="dic">相册名称，分页参数</param>
        /// <returns></returns>
        String SelectImageFolderByFoldName(Dictionary<string, object> dic);
        /// <summary>
        /// 查询相册文件夹，返回的json字符串经过格式化为{id:'',value:''}
        /// </summary>
        /// <param name="pagecurrent">当前页码</param>
        /// <param name="pageSize">每页条数</param>
        /// <returns></returns>
        String SelectImageFolderWithFormat(int pagecurrent, int pageSize);
        /// <summary>
        /// 查询相册下的所有图片
        /// </summary>
        /// <param name="dic">相册id，分页参数</param>
        /// <returns></returns>
        String SelectPersonalImagesByFoldId(Dictionary<string, object> dic);

        ImageFolderModel GetImageFolderModelById(string id);

        /// <summary>
        /// 查询相册下的所有图片
        /// </summary>
        /// <param name="dic">相册id，分页参数 ( string folder_id,string pagecurrent,string pageSize)</param>
        /// <returns></returns>
        DataSet GetPersonalImagesByFoldId(Dictionary<string, object> dic);

        /// <summary>
        /// 查询相册下的所有图片
        /// </summary>
        /// <param name="folderId"></param>
        /// <returns></returns>
        List<PersonalImageModel> GetPersonalImageListByFoldId(string folderId, int pageCurrent, int pageSize);


        /// <summary>
        /// 获取相册最大排序号
        /// </summary>
        /// <param name="user_id">用户id</param>
        /// <param name="imageFolderId">相册id</param>
        /// <returns></returns>
        int GetMaxSequenceOfImageFolder(string user_id, string imageFolderId);
        #endregion

        #region 查询相册数量或相册下图片数量
        /// <summary>
        /// 查询相册的数量（个数）
        /// </summary>
        /// <param name="dic">user_id</param>
        /// <returns></returns>
        String SelectImageFolderCount(Dictionary<string, object> dic);

        /// <summary>
        /// 根据相册id查询相册下图片个数
        /// </summary>
        /// <param name="dic">相册id</param>
        /// <returns></returns>
        int SelectImageCountByFoldId(string folder_id);
        #endregion

        #region 单个图片管理

        /// <summary>
        /// 照片的拖动排序
        /// </summary>
        /// <param name="dic">string image_id,string target_image_id </param>
        /// <returns></returns>
        string ImageSortOrderOfDrag(Dictionary<string, object> dic);

        /// <summary>
        /// 照片的点击排序
        /// </summary>
        /// <param name="dic">string image_id,string type(0或者1)  0为向上  1为上下</param>
        /// <returns></returns>
        string ImageSortOrderOfClick(Dictionary<string, object> dic);

        /// <summary>
        /// 照片的输入数字排序
        /// </summary>
        /// <param name="dic">string image_id,string inputText</param>
        /// <returns></returns>
        string ImageSortOrderOfInput(Dictionary<string, object> dic);

        /// <summary>
        /// 根据图片id获取图片model
        /// </summary>
        /// <param name="id">string id</param>
        /// <returns></returns>
        PersonalImageModel GetPersonalImageModelById(string id);

        /// <summary>
        /// 查询照片id查询单个照片
        /// </summary>
        /// <param name="dic">图片id</param>
        /// <returns></returns>
        String SelectPersonalImageByImageId(Dictionary<string, object> dic);

        /// <summary>
        /// 根据照片名称查询单个照片
        /// </summary>
        /// <param name="dic">图片名称</param>
        /// <returns></returns>
        String SelectPersonalImageByImageName(Dictionary<string, object> dic);

        /// <summary>
        /// 删除单个照片
        /// </summary>
        /// <param name="dic">图片id</param>
        /// <returns></returns>
        String DeletePersonalImage(Dictionary<string, object> dic);

        /// <summary>
        /// 更新个人照片
        /// </summary>
        /// <param name="pimgModel">照片模型</param>
        /// <returns></returns>
        bool UpdatePersonalImage(PersonalImageModel pimgModel);

        /// <summary>
        /// 修改图片各项信息
        /// </summary>
        /// <param name="dic">图片id(string image_id),排序号(sequence_id),图片名称(image_name),图片描述(image_description),设为封面(setcover:0为取消,1为设定)</param>
        /// <returns></returns>
        string UPdatePersonalImage(Dictionary<string, object> dic);

        /// <summary>
        /// 添加单个照片
        /// </summary>
        /// <param name="pimodel">图片model</param>
        /// <returns></returns>
        bool AddPersonalImage(PersonalImageModel pimodel);

        /// <summary>
        /// 设置照片为封面
        /// </summary>
        /// <param name="dic">image_id 照片id</param>
        /// <returns></returns>
        string SetPeronalImageBeCover(Dictionary<string, object> dic);
        #endregion

        #region 图片评论回复
        /// <summary>
        /// 添加图片回复
        /// </summary>
        /// <param name="dic">id,content(内容),followId</param>
        /// <returns></returns>
        string AddImageComments(Dictionary<string, object> dic);
        /// <summary>
        /// 添加图片回复
        /// </summary>
        /// <param name="icmodel">图片id（image_id）</param>
        /// <returns></returns>
        String AddImageComments(ImageCommentsModel icmodel);

        /// <summary>
        /// 删除图片回复
        /// </summary>
        /// <param name="dic">图片id</param>
        /// <returns></returns>
        String DeleteImageComments(Dictionary<string, object> dic);

        /// <summary>
        /// 查询图片回复
        /// </summary>
        /// <param name="dic">图片id，分页参数</param>
        /// <returns></returns>
        String SelectImageComments(Dictionary<string, object> dic);
        #endregion

        #region 个人相片设定
        /// <summary>
        /// 获取个人相册设定表
        /// </summary>
        /// <param name="user_id">用户id</param>
        /// <returns></returns>
        string GetPersonalPhotoSettingsModel();
        /// <summary>
        /// 获取个人相册设定表
        /// </summary>
        /// <param name="user_id">用户id</param>
        /// <returns></returns>
        PersonalPhotoSettingsModel GetPersonalPhotoSettingsModel(string user_id);

        bool UpdatePersonalPhotoSettings(PersonalPhotoSettingsModel ppsModel);

        /// <summary>
        /// 修改个人设定
        /// </summary>
        /// <param name="dic">string default_folder_id,string default_permission</param>
        /// <returns></returns>有的话传 没有不传
        string UpdatePersonalPhotoSettings(Dictionary<string, object> dic);
        #endregion

        #region 批量修改图片操作

        /// <summary>
        /// 批量移动照片
        /// </summary>
        /// <param name="dic">string image_id(一个或者多个,用逗号分开),string folder_id</param>
        /// <returns></returns>
        string MoveMorePersonalImageFolder(Dictionary<string, object> dic);

        /// <summary>
        /// 批量删除相册
        /// </summary>
        /// <param name="dic">string folder_id(一个或者多个,用逗号分开)</param>
        /// <returns></returns>
        string DeleteMorePersonalImageFolder(Dictionary<string, object> dic);

        /// <summary>
        /// 批量删除照片
        /// </summary>
        /// <param name="dic">string image_id(一个或者多个,用逗号分开)</param>
        /// <returns></returns>
        string DeleteMorePersonalImages(Dictionary<string, object> dic);

        /// <summary>
        /// 批量修改相册权限
        /// </summary>
        /// <param name="dic">string folder_id(一个或者多个),string permission</param>
        /// <returns></returns>
        string UpdateMoreFolderPermission(Dictionary<string, object> dic);


        /// <summary>
        /// 批量移动图片到其他相册
        /// </summary>
        /// <param name="dic">相册id，图片id集合</param>
        /// <returns></returns>
        string UpdatePersonalImageFolder(Dictionary<string, object> dic);

        /// <summary>
        /// 批量修改图片权限
        /// </summary>
        /// <param name="dic">string image_id(图片id)，string permission(权限id)</param>
        /// <returns></returns>
        string UpDatePersonalImagePermission(Dictionary<string, object> dic);
        #endregion

        /// <summary>
        /// 分享到活动
        /// </summary>
        /// <param name="dic">albumId:相册编号，actid:活动编号</param>
        /// <returns></returns>
        string ShareToActivity(Dictionary<string, object> dic);
    }
}
