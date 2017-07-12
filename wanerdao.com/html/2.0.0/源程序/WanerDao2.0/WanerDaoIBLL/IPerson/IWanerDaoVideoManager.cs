#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 个人视频相关接口
* 作者：杨晓东   时间：2011/10/2 23:30:52 
* 文件名：IWanerDaoVideoManager 
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
    public interface IWanerDaoVideoManager
    {
        #region 视频设置
        /// <summary>
        /// 获取个人相册设定表
        /// </summary>
        /// <param name="user_id">用户id</param>
        /// <returns></returns>
        string GetPersonalVideoSettingsModel();
        
        /// <summary>
        /// 修改个人视频设定
        /// </summary>
        /// <param name="ppsModel"></param>
        /// <returns></returns>
        bool UpdatePersonalVideoSettings(PersonalVideoSettingsModel ppsModel);

        /// <summary>
        /// 修改个人视频设定
        /// </summary>
        /// <param name="dic">string fold_id,string permission</param>
        /// <returns></returns>有的话传 没有不传
        string UpdatePersonalVideoSettings(Dictionary<string, object> dic);

        #endregion

        #region 个人视频册管理
                /// <summary>
        /// 查询视频册Id查询视频册
        /// </summary>
        /// <param name="videoFolderId"></param>
        /// <returns></returns>
        VideoFolderModel SelectVideoFolderById(string id);
        
        /// <summary>
        /// 添加视频册
        /// </summary>
        /// <param name="ifmodel">视频册模型</param>
        /// <returns></returns>
        bool AddVideoFolder(VideoFolderModel ifmodel);

        string AddVideoFolder(Dictionary<string, object> dic);

         /// <summary>
        /// 获取相册列表
        /// </summary>
        /// <param name="dic">string user_id,string folder_name,string pagecurrent,string pagesize</param>
        /// <returns></returns>
        string VideoFolderPaging(Dictionary<string, object> dic);
        
        /// <summary>
        /// 获取视频列表（徐蓓2012-8-10添加），返回的数据类型为{id:'',value,''}
        /// </summary>
        /// <param name="userId">用户主键</param>
        /// <param name="pageCurrent">当前页数</param>
        /// <param name="pageSize">每页条数</param>
        /// <returns></returns>
        string VideoFolderPaging(string userId, int pageCurrent, int pageSize);
        /// <summary>
        /// 修改视频册
        /// </summary>
        /// <param name="ifmodel">视频册模型</param>
        /// <returns></returns>
        bool UpdateVideoFolder(VideoFolderModel ifmodel);
        string UpdateVideoFolderId(Dictionary<string, object> dic);

        /// <summary>
        /// 删除视频册
        /// </summary>
        /// <param name="dic">视频册id</param>
        /// <returns></returns>
        string DeleteVideoFolderById(Dictionary<string, object> dic);

        #endregion

        #region 查询视频册数量或视频册下视频数量
        /// <summary>
        /// 查询视频册的数量（个数）
        /// </summary>
        /// <param name="dic">user_id</param>
        /// <returns></returns>
        string SelectVideoFolderCount(Dictionary<string, object> dic);

        /// <summary>
        /// 根据视频册id查询视频册下视频个数
        /// </summary>
        /// <param name="dic">视频册编号</param>
        /// <returns></returns>
        string SelectVideoCountByFoldId(Dictionary<string, object> dic);
        #endregion

        #region 单个视频管理
        /// <summary>
        /// 查询视频id查询单个视频
        /// </summary>
        /// <param name="dic">视频id</param>
        /// <returns></returns>
        string SelectPersonalVideoByVideoId(Dictionary<string, object> dic);
        PersonalVideoModel SelectPersonalVideoByVideoId(string id);

        /// <summary>
        /// 根据视频名称查询单个视频
        /// </summary>
        /// <param name="dic">视频名称</param>
        /// <returns></returns>
        string SelectPersonalVideoByVideoName(Dictionary<string, object> dic);

        /// <summary>
        /// 删除单个视频
        /// </summary>
        /// <param name="dic">视频id</param>
        /// <returns></returns>
        string DeletePersonalVideo(Dictionary<string, object> dic);

        /// <summary>
        /// 更新单个视频信息
        /// </summary>
        /// <param name="pimodel">视频model</param>
        /// <returns></returns>
        bool UpdatePersonalVideo(PersonalVideoModel pimodel);
        string UpdatePersonalVideo(Dictionary<string, object> dic);
        /// <summary>
        /// 修改视频排序字段
        /// </summary>
        /// <param name="dic">视频id，排序号</param>
        /// <returns></returns>
        string UpdatePersonalVideoOfSequence(Dictionary<string, object> dic);

        /// <summary>
        /// 添加单个视频
        /// </summary>
        /// <param name="pimodel">视频model</param>
        /// <returns></returns>
        bool AddPersonalVideo(PersonalVideoModel pimodel);
        /// <summary>
        /// 更加视频代码 添加视频
        /// </summary>
        /// <param name="dic">string videos,string ifcreatealbum(0 or 1),string idorname，string permission</param>
        /// <returns></returns>
        string AddPersonalVideo(Dictionary<string, object> dic);

        /// <summary>
        /// 共享视频至默认目录（2012-8-27徐蓓添加）
        /// </summary>
        /// <param name="videCode">视频信息代码</param>
        /// <param name="videoDesc">视频描述</param>
        /// <param name="userId">共享人主键</param>
        /// <returns></returns>
        string ShareVideo(string videCode, string videoDesc, string userId);

        /// <summary>
        /// 个人视频分页
        /// </summary>
        /// <param name="dic">fold_id 视频册编号，user_id 拥有者编号，vname视频名称</param>
        /// <returns></returns>
        string PersonalVideoPagingByFolderId(Dictionary<string, object> dic);

        /// <summary>
        /// 个人视频 点击排序
        /// </summary>
        /// <param name="dic">视频编号：vid,排序方向dir  上：up 0，下：down 1</param>
        /// <returns></returns>
        string PersonalVideoSortByClick(Dictionary<string, object> dic);

        /// <summary>
        /// 个人视频 输入序号排序
        /// </summary>
        /// <param name="dic">视频编号：vid, 输入的排序号：input_seq</param>
        /// <returns></returns>
        string PersonalVideoSortByInput(Dictionary<string, object> dic);

        /// <summary>
        /// 删除视频册
        /// </summary>
        /// <param name="id">视频编号</param>
        /// <returns></returns>
        bool DeletePersonalVideo(string id);

        /// <summary>
        ///根据 id 删除视频册
        /// </summary>
        /// <param name="dic">视频册id  video_id</param>
        /// <returns></returns>
        string DeletePersonalVideoById(Dictionary<string, object> dic);
        #endregion

        #region 视频评论回复
        /// <summary>
        /// 添加视频回复
        /// </summary>
        /// <param name="dic">id（指视频id), followId(父贴),,content(内容)</param>
        /// <returns></returns>
        string AddVideoComments(Dictionary<string, object> dic);

        /// <summary>
        /// 删除视频回复
        /// </summary>
        /// <param name="dic">视频id video_id</param>
        /// <returns></returns>
        string DeleteVideoComments(Dictionary<string, object> dic);

        /// <summary>
        /// 查询视频回复
        /// </summary>
        /// <param name="dic">视频id，分页参数</param>
        /// <returns></returns>
        string SelectVideoComments(Dictionary<string, object> dic);
        #endregion

        #region 批量修改视频操作

        /// <summary>
        /// 批量删除视频册
        /// </summary>
        /// <param name="dic">string folder_id(一个或者多个,用逗号分开)</param>
        /// <returns></returns>
        string BatchDeleteVideoFolder(Dictionary<string, object> dic);
        /// <summary>
        /// 批量修改视频权限
        /// </summary>
        /// <param name="dic">string folder_id(一个或者多个),string permission</param>
        /// <returns></returns>
        string BatchUpdateFolderPermission(Dictionary<string, object> dic);

        /// <summary>
        /// 批量移动视频到其他视频册
        /// </summary>
        /// <param name="dic">视频册id，视频id集合</param>
        /// <returns></returns>
        string BatchUpdateVideoFolderOfVideo(Dictionary<string, object> dic);

        /// <summary>
        /// 批量修改视频权限
        /// </summary>
        /// <param name="dic">权限id，视频id集合</param>
        /// <returns></returns>
        string BatchUpdatePermissionOfVideo(Dictionary<string, object> dic);

        /// <summary>
        /// 批量删除视频
        /// </summary>
        /// <param name="dic">video_id 视频编号集合 多个用,分开</param>
        /// <returns></returns>
        string BatchDeletePersonalVideo(Dictionary<string, object> dic);
        #endregion

        #region 公共成员
        
        /// <summary>
        /// 获取某视频册 视频最大排序号
        /// </summary>
        /// <returns></returns>
        int GetMaxSequenceOfPersonalVideoOfFolder(string fold_id);
        #endregion

        #region 视频上传
        /// <summary>
        /// 更加视频代码 添加视频
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string VideoCodeUpload(Dictionary<string, object> dic);
        #endregion
    }
}
