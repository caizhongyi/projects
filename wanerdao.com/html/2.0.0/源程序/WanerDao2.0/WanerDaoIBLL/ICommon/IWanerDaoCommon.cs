using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Web;
using WanerDao2.WanerDaoModule.WanerDaoImage;
using WanerDao2.WanerDaoModel.Activity;
using WanerDao2.WanerDaoModel;

#region 【本类功能概述】
/* ======================================================================== *  
* 功能说明：玩儿道2.0项目里面的所有公有插件或者控件调用本接口定义的函数
* 
* 作者：金广亮
* 时间：2011-10-12 23:07:35 
* 文件名：IWanerDaoCommon 
* 版本：V0.0.1
* 
* 修改者： 杨晓东
* 时间： 2011-12-3 1:52:39
* 修改说明： 添加好友分组,根据好友分组id查询好好友接口
* ======================================================================== 
*/
#endregion
namespace WanerDao2.WanerDaoIBLL.ICommon
{
    public interface IWanerDaoCommon
    {
        #region 分页
        /// <summary>
        /// 描述：分页函数
        /// 作者:金广亮
        /// 时间：2011-10-22
        /// </summary>
        /// <param name="tblName">表名</param>
        /// <param name="fldName">查询字段，如果是多个字段请用英文的“,”分隔</param>
        /// <param name="where">WHERE条件(不用传入WHERE关键字,可为空)</param>
        /// <param name="fldSortId">排序条件(不用传入ORDER BY关键字,可为空)</param>
        /// <param name="sort">0升序 1倒序</param>
        /// <param name="pagecurrent">当前页码</param>
        /// <param name="pageSize">每页记录数</param>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据}}</returns>
        //string WanerDaoPagination(string tblName, string fldName, string where, string fldSortId, int sort, int pagecurrent, int pageSize);
        
        /// <summary>
        /// 描述：分页函数
        /// 作者:金广亮
        /// 时间：2011-10-22
        /// </summary>
        /// <param name="dic">里面包含这些元素：
        /// tblName 表名;fldName 查询字段，如果是多个字段请用英文的“,”分隔;where WHERE条件(不用传入WHERE关键字,可为空);
        /// fldSortId 排序条件(不用传入ORDER BY关键字,可为空);sort 0升序 1倒序;pagecurrent 当前页码;pageSize 每页记录数
        /// </param>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据}}</returns>
        string WanerDaoPagination(Dictionary<string, object> dic);

        /// <summary>
        /// 描述：分页函数
        /// 作者:金广亮
        /// </summary>
        /// <param name="pager"></param>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据}}</returns>
        string WanerDaoPagination(PaginationModel pager);
        /// <summary>
        /// 描述：分页函数
        /// 作者:王渝友
        /// 时间：2012-1-18
        /// </summary>
        /// <param name="dic">里面包含这些元素：
        /// tablename 表名;fldName 查询字段，如果是多个字段请用英文的“,”分隔;where WHERE条件(不用传入WHERE关键字,可为空);
        /// fldSortId 排序条件(不用传入ORDER BY关键字,可为空);sort 0升序 1倒序;pagecurrent 当前页码;pageSize 每页记录数
        /// </param>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据},rootimgpath:图片的根路径}}</returns>
        string WanerDaoPaginationToImage(Dictionary<string, object> dic);
        ///<summary>
        /// 描述：分页结果集
        /// 作者:金广亮
        /// 时间：2011-11-27
        /// </summary>
        /// <param name="dic">里面包含这些元素：
        /// tablename 表名;fldName 查询字段，如果是多个字段请用英文的“,”分隔;where WHERE条件(不用传入WHERE关键字,可为空);
        /// fldSortId 排序条件(不用传入ORDER BY关键字,可为空);sort 0升序 1倒序;pagecurrent 当前页码;pageSize 每页记录数
        /// </param>
        /// <returns>分页后的结果集(总行数total：ds.Tables[0].Rows[0][0]；rows:{查询的数据}ds.Tables[1])</returns>
        DataSet WanerDaoPaginationDataSet(Dictionary<string, object> dic);

        /// <summary>
        /// 描述：分页函数
        /// 作者:金广亮
        /// 时间：2011-11-27
        /// </summary>
        /// <param name="ds">返回分页后的结果集</param>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据}}</returns>
        string WanerDaoPagination(DataSet ds);
        #endregion

        #region 滑动按钮
        /// <summary>
        /// 描述：启动滑动按钮
        /// 作者：王薪杰
        /// 时间：2011-10-23
        /// </summary>
        /// <returns>JSON格式{result:是否成功，msg:消息}</returns>
        string WanerDaoScrollButton();
        #endregion

        #region 国家、省州、市县
        ///// <summary>
        ///// 描述：国家
        ///// 作者：金广亮
        ///// 时间：2011-11-04
        ///// 修改时间：2012-2-16
        ///// 修改原因：根据多语言版本后台自适应
        ///// </summary>
        ///// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据(firstchar:'',id:'',name:'')}}</returns>
        //string WanerDaoCountry();
        ///// <summary>
        ///// 描述：省州
        ///// 作者：金广亮
        ///// 时间：2011-11-04
        ///// 修改时间：2012-3-18
        ///// 修改原因：根据多语言版本后台自适应
        ///// </summary>
        ///// <param name="countryid">国家ID</param>
        ///// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据(firstchar:'',id:'',name:'')}}</returns>
        //string WanerDaoState(Dictionary<string, object> countryid);
        /// <summary>
        /// 描述：市县
        /// 作者：金广亮
        /// 时间：2011-11-04
        /// 修改时间：2012-3-18
        /// 修改原因：根据多语言版本后台自适应
        /// </summary>
        /// <param name="stateid">市ID</param>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据(cname:'',icd:''等)}}</returns>
        string WanerDaoArea(Dictionary<string, object> cityid);

        ///// <summary>
        ///// 描述：地区信息
        ///// 作者：金广亮
        ///// 时间：2011-11-13
        ///// </summary>
        ///// <param name="dic">cid:国家ID,sid:州ID,id:市ID</param>
        ///// <returns>JSON格式的数据{result:false or true,country:{id:'222',name:'xxx'},state:{id:'',name:''},city:{id:'',name:''}}</returns>
        //string WanerDaoArea(Dictionary<string, object> dic);
        ///// <summary>
        ///// 描述：地区信息
        ///// 作者：金广亮
        ///// 时间：2011-11-13
        ///// </summary>
        ///// <param name="cid">国家ID</param>
        ///// <param name="sid">州ID</param>
        ///// <param name="id">市ID</param>
        ///// <returns>JSON格式的数据{result:false or true,country:{id:'222',name:'xxx'},state:{id:'',name:''},city:{id:'',name:''}}</returns>
        //string WanerDaoArea(string cid, string sid, string id);
        #endregion

        #region 圈子
        /// <summary>
        /// 圈子搜索
        /// </summary>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据(id:'',group_name:'')}</returns>
        string WanerDaoSearchGroup();

        #endregion

        #region 好友
        /// <summary>
        /// 好友搜索
        /// </summary>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据(user_id:'',name:'')}}</returns>
        string WanerDaoSearchFriend();

        /// <summary>
        /// 根据名称查询好友当前用户好友
        /// 作者:杨晓东 时间:2011-11-25
        /// </summary>
        /// <param name="dic">string user_id,string fname</param>
        /// <returns></returns>
        string WanerDaoGetPersonalFriendsByName(Dictionary<string, object> dic);

        /// <summary>
        /// 获取当前登录用户的好友分组
        /// </summary>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据(class_id:"",relation_name:"")}}</returns>
        string WanerDaoGetPersonFriendGroup();

        /// <summary>
        /// 根据当前用户的好友分组id查询分组下的好友
        /// </summary>
        /// <param name="groupid"></param>
        ///  string groupid
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据(user_id:"",name:"")}}</returns>
        string WanerDaoGetPersonFriendByGroupId(Dictionary<string, object> dic);

        /// <summary>
        /// 获取当前用户的所有好友
        /// 杨晓东 2012年2月19日
        /// </summary>
        /// <returns></returns>
        string WanerDaoGetAllPersonFriends();
        #endregion

        #region 活动
        /// <summary>
        /// 描述：多条件活动搜索函数（可用于分页）
        /// 作者:徐兵
        /// 时间：2011-10-22
        /// </summary>
        /// <param name="dic">里面包含这些元素：
        ///  tableNames:表 可以组合
        ///  fieldNames:查询字段
        ///  userId:用户ID
        ///  activityNames:活动名字串，用“:”分隔
        ///  catygoryNames:分类名字串，用“:”分隔
        ///  friendsName:朋友名字串，用“:”分隔
        ///  groupNames:圈子名字串，用“:”分隔
        ///  sightNames:景点名字串，用“:”分隔
        ///  countryId:国家
        ///  provinceId:省份
        ///  cityId:城市
        ///  ortherWhereSql:SQL条件
        ///  fieldSortId:排序字段
        ///  sort:0:sec 1:desc
        ///  pagecurrent:当前页码
        ///  pageSize：页大小
        /// </param>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据}}</returns>
        string WanerDaoSearchActivityByManyCondition(Dictionary<string, object> dic);
        /// <summary>
        /// 描述：多条件活动搜索函数（可用于分页）
        /// 作者:徐兵
        /// 时间：2012-5-6
        /// </summary>
        /// <param name="dic">里面包含这些元素：
        ///  tableNames:表 可以组合
        ///  fieldNames:查询字段
        ///  userId:用户ID
        ///  ortherWhereSql:SQL条件
        ///  fieldSortId:排序字段
        ///  sort:0:sec 1:desc
        ///  pagecurrent:当前页码
        ///  pageSize：页大小
        /// </param>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据}}</returns>
        string WanerDaoSearchUserInterestsActivity(Dictionary<string, object> dic);

        /// <summary>
        /// 获取成员分页
        /// 作者:徐兵
        /// 时间：202-4-19
        /// </summary>
        /// <param name="dic">除开分页必备条件外：activityid:活动ID</param>
        /// <returns></returns>
        string GetActivityMemberPaging(Dictionary<string, object> dic);
        #endregion

        #region 活动分类
        /// <summary>
        /// 描述：活动分类
        /// 作者：金广亮
        /// 时间：2011-11-14
        /// </summary>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据(id:'',name:'')}}</returns>
        string WanerDaoActivityCategory();
        #endregion

        #region 活动景点
        /// <summary>
        /// 描述：活动景点
        /// 作者：金广亮
        /// 时间：2011-11-14
        /// </summary>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据(id:'',name:'')}}</returns>
        string WanerDaoActivityPlace();
        #endregion

        #region 玩儿道侧栏
        /// <summary>
        /// 描述:玩儿道侧栏列表
        /// 作者：王渝友
        /// 日期：2011-12-2
        /// </summary>
        /// <param name="dic"></param>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据}}</returns>
        string GetWanerDaoSidebar(Dictionary<string, object> dic);
        #endregion

        #region 留言板列表
        /// <summary>
        /// 描述：留言板列表
        /// 作者: 王渝友
        /// 时间：2011-11-10
        /// </summary>
        /// <param name="dic"></param>
        ///  <param name="messagetype">回复信息类型：all:全部帖子回复信息，single：单一帖子信息</param>
        /// <param name="postTables">映射主表查询sql：如果是全部帖子，映射分页sql（wanerdaoPagination）</param>
        /// <param name="commentsTable">映射回复表查询SQL</param>
        /// <param name="PriTbId">留言板主表主键ID</param>
        /// <param name="PriComId">留言板回复表主键ID</param>
        /// <param name="Pri_Sub_Id">留言板回复表中的字段,关联主表ID</param>
        /// <param name="Com_Sub_Id">留言板回复表中的字段,关联回复表ID，即回复贴号</param>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据}}</returns>
        string WanerDaoLeaveMessage(Dictionary<string, object> dic, string messagetype, string postTables, string commentsTable, string PriTbId, string PriComId, string Pri_Sub_Id, string Com_Sub_Id);
        /// <summary>
        /// 添加相片评论
        /// </summary>
        /// <param name="dic">postid:相片ID,replayid：被回复评论ID，isreplay:0|1当为0时表示发布回复并且replayid为空，当1时replayid不允许为空，content：回复内容</param>
        /// <returns></returns>
        string WanerDaoAddImageComments(Dictionary<string, object> dic);
        /// <summary>
        /// 删除相册评论
        /// </summary>
        /// <param name="dic">ID评论记录ID</param>
        /// <returns></returns>
        string WanerDaoDeleteImageComments(Dictionary<string, object> dic);
        /// <summary>
        /// 添加日志评论
        /// </summary>
        /// <param name="dic">postid:日志ID,replayid：被回复评论ID，isreplay:0|1当为0时表示发布回复并且replayid为空，当1时replayid不允许为空，content：回复内容</param>
        /// <returns></returns>
        string WanerDaoAddBlogComments(Dictionary<string, object> dic);
        /// <summary>
        /// 删除日志评论
        /// </summary>
        /// <param name="dic">ID评论记录ID</param>
        /// <returns></returns>
        string WanerDaoDeleteBlogComments(Dictionary<string, object> dic);
        /// <summary>
        /// 添加视频评论
        /// </summary>
        /// <param name="dic">postid:视频ID,replayid：被回复评论ID，isreplay:0|1当为0时表示发布回复并且replayid为空，当1时replayid不允许为空，content：回复内容</param>
        /// <returns></returns>
        string WanerDaoAddVideoComments(Dictionary<string, object> dic);
        /// <summary>
        /// 删除视频评论
        /// </summary>
        /// <param name="dic">ID评论记录ID</param>
        /// <returns></returns>
        string WanerDaoDeleteVideoComments(Dictionary<string, object> dic);
        /// <summary>
        /// 添加状态评论
        /// </summary>
        /// <param name="dic">postid:状态ID,replayid：被回复评论ID，isreplay:0|1当为0时表示发布回复并且replayid为空，当1时replayid不允许为空，content：回复内容</param>
        /// <returns></returns>
        string WanerDaoAddNewfeedComments(Dictionary<string, object> dic);
        /// <summary>
        /// 删除状态评论
        /// </summary>
        /// <param name="dic">ID评论记录ID</param>
        /// <returns></returns>
        string WanerDaoDeleteNewfeedComments(Dictionary<string, object> dic);
        /// <summary>
        /// 添加留言评论
        /// </summary>
        /// <param name="dic">postid:状态ID,replayid：被回复评论ID，isreplay:0|1当为0时表示发布回复并且replayid为空，当1时replayid不允许为空，content：回复内容</param>
        /// <returns></returns>
        string WanerDaoAddLeaveMessageComments(Dictionary<string, object> dic);
        /// <summary>
        /// 删除留言评论
        /// </summary>
        /// <param name="dic">ID评论记录ID</param>
        /// <returns></returns>
        string WanerDaoDeleteLeaveMessageComments(Dictionary<string, object> dic);
        #endregion

        #region 活动相册相片处理

        #region 查询
        /// <summary>
        /// 用于获取相册管理数目以及相片管理数目
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string WanerDaoGetManageImageTotal(Dictionary<string, object> dic);
        /// <summary>
        /// 用于历史相册管理界面的左侧非管理员时候获取的相册操作函数
        /// </summary>
        /// <param name="dic">activity_id:活动ID；userid:用户ID</param>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据}}</returns>
        string WanerDaoGetImageFolderWithGeneralStaff(Dictionary<string, object> dic);
        /// <summary>
        /// 描述 相册查询 存储过程(可用于分页)
        /// 作者:徐兵
        /// 时间：2011-11-26
        /// </summary>
        /// <param name="dic">里面包含这些元素: 
        /// searchType:查询类型 1*：查询个人相册(11:单个人相册，12：多个人)；
        ///                       2*：根据活动查询相册（21：个人相册+活动相册+好友相册，22：个人相册类型，23：活动相册类型，24：好友相册类型，25：活动的所有相册）
        /// userIds:#用户ID,可以多个用英文逗号分隔
        /// activityIds:活动名ID
        /// isSearchBlock:是否显示屏蔽相册 1：是 0：否 2:只显示被屏蔽的
        /// orderByFileds:排序字段，请填返回名称中的一个或者多个，用英文逗号分隔
        /// sort:0升序 1倒序
        /// pagecurrent:当前页
        /// pageSize:每页记录数
        /// </param>
        /// <param name="imageRootPath">相册相片根目录地址</param>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据}}</returns>
        string WanerDaoSearchImageFolder(Dictionary<string, object> dic);
        /// <summary>
        /// 描述：相片分页函数
        /// 作者:徐兵
        /// 时间：2011-11-26
        /// </summary>
        /// <param name="dic">里面包含这些元素：
        /// tablename 表名;fldName 查询字段，如果是多个字段请用英文的“,”分隔;where WHERE条件(不用传入WHERE关键字,可为空);
        /// fldSortId 排序条件(不用传入ORDER BY关键字,可为空);sort 0升序 1倒序;pagecurrent 当前页码;pageSize 每页记录数
        /// </param>
        /// <param name="imageRootPath">相册相片根目录地址</param>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据}}</returns>
        string WanerDaoSearchImagePagination(Dictionary<string, object> dic);
        /// <summary>
        /// 描述 根据创建人查询相片 
        /// 作者:徐兵
        /// 时间：2011-11-26
        /// </summary>
        /// <param name="dic">里面包含这些元素:create_id</param>
        /// <param name="imageRootPath">相册相片根目录地址</param>
        /// <returns>>JSON格式的数据</returns>
        string WanerDaoSearchImageByUserId(Dictionary<string, object> dic);

        /// <summary>
        /// 获取相册中图片总数
        /// </summary>
        /// <param name="dic">根据活动相册ID来获取相册中的相片总数</param>
        /// <returns>根据相册ID获取相册中的图片总数</returns>
        string WanerDaoGetImageCount(Dictionary<string, object> dic);
        /// <summary>
        /// 照片的点击排序
        /// </summary>
        /// <param name="dic">string image_id,string type(0或者1)  0为向上  1为上下</param>
        /// <returns></returns>
        string ImageSortOrderOfClick(Dictionary<string, object> dic);
        /// <summary>
        /// 更新图片属性
        /// </summary>
        /// <param name="sqlkey">sql</param>
        /// <param name="dic">里面包含图片ID，以及要更新的条件</param>
        /// <returns></returns>
        string WanerDaoUpdateImageProperty(string sqlkey, Dictionary<string, object> dic);
        /// <summary>
        /// 描述 根据相册ID查询相片
        /// 作者:徐兵
        /// 时间：2011-11-26
        /// </summary>
        /// <param name="dic">里面包含这些元素:fold_id</param>
        /// <param name="imageRootPath">相册相片根目录地址</param>
        /// <returns>>JSON格式的数据</returns>
        string WanerDaoSearchImageByFolderId(Dictionary<string, object> dic);

        /// <summary>
        /// 描述 根据相片ID查询相片
        /// 作者:徐兵
        /// 时间：2011-11-26
        /// </summary>
        /// <param name="dic">里面包含这些元素:id</param>
        /// <param name="imageRootPath">相册相片根目录地址</param>
        /// <returns>>JSON格式的数据</returns>
        string WanerDaoGetImageById(Dictionary<string, object> dic);

        /// <summary>
        /// 获取活动相册根据用户id和活动id
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string GetActivityAlbumListByUser(Dictionary<string, object> dic);
        #endregion

        #region 操作
        /// <summary>
        /// 描述 上传相片（可上传活动图片、个人相片）
        /// 作者:徐兵
        /// 时间：2011-12-3
        /// <param name="httpPosteFile">上传文件请求流</param>
        /// <param name="dic">dic包含信息：
        /// fold_id：相册ID
        /// activity_id：活动ID
        /// </summary>
        /// <returns></returns>
        WanerDaoUploadImageResult WanerDaoUploadImageFile(HttpPostedFile postedImageFile, Dictionary<string, object> dic);
        /// <summary>
        /// 描述 确认上传
        /// 作者:徐兵
        /// 时间：2011-12-3
        /// </summary>
        /// <returns></returns>
        string WanerDaoSubmitUploadImageFiles(string imageIds);
        /// <summary>
        /// 创建活动相册
        /// </summary>
        /// </param>
        /// <returns></returns>
        bool WanerDaoCreateActivityImageFolder(ActivityImageFolderModel activityImagefolder);
        /// <summary>
        /// 修改活动相册
        /// </summary>
        /// <param name="dic">dic包含如下：
        ///  id:相册ID
        ///  folder_name:文件夹名字
        ///  description:描述
        /// </param>
        /// <returns></returns>
        bool WanerDaoUpdateActivityImageFolder(Dictionary<string, object> dic);
       /// <summary>
        /// 屏蔽、恢复屏蔽相册，多个相册id
        /// </summary>
        /// <param name="ids">前台数据集合</param>
        /// <param name="mappedType">映射文件类型：0-屏蔽相册，1-恢复屏蔽相册</param>
        /// <returns></returns>
        string WanerDaoBlockActivityImageFolderByMoreid(Dictionary<string, object> dic, int mappedType);
        /// <summary>
        /// 屏蔽相册
        /// </summary>
        /// <param name="id">相册ID</param>
        /// <returns></returns>
        string WanerDaoBlockActivityImageFolder(string id);
        /// <summary>
        /// 恢复屏蔽相册
        /// </summary>
        /// <param name="id">相册ID</param>
        /// <returns></returns>
        string WanerDaoRestoreBlockActivityImageFolder(string id);
        /// <summary>
        /// 分享别人的相册(同时分享相片)
        /// </summary>
        /// <param name="id">相册ID</param>
        /// <returns></returns>
        bool WanerDaoShareActivityImageFolder(string id);
        /// <summary>
        /// 分享别人的相册下所有相片到指定相册下面
        /// </summary>
        /// <param name="oldFolderId">被分享的相册ID</param>
        /// <param name="newFolderId">存放的相册ID</param>
        /// <returns></returns>
        bool WanerDaoShareActivityImageFolder(string oldId, string newId);
        /// <summary>
        /// 删除相册
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        bool WanerDaoDeleteActivityImageFolder(string id);
        /// <summary>
        /// 删除相册
        /// </summary>
        /// <param name="dic">folder_id</param>
        /// <returns></returns>
        string WanerDaoDeleteActivityImageFolder(Dictionary<string, object> dic);
        /// <summary>
        /// 屏蔽相片
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        bool WanerDaoBlockActivityImage(string id);

        /// <summary>
        /// 屏蔽相片
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string WanerDaoBlockActivityImage(Dictionary<string, object> dic);
        /// <summary>
        /// 恢复屏蔽相片
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        bool WanerDaoRestoreBlockActivityImage(string id);
        /// <summary>
        /// 删除相片（会自动减少物理连接数和判断是否删除文件）
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        bool WanerDaoDeleteActivityImage(string id);

        string WanerDaoDeleteActivityImage(Dictionary<string,object> dic);
        #endregion
        #endregion

        #region 上传头像
        /// <summary>
        /// 描述：上传头像
        /// 作者：王薪杰
        /// 时间：2012-12-6
        /// </summary>
        /// <param name="uploadfile"></param>
        /// <param name="dic"></param>
        /// <returns></returns>
        string UploadAvatar(HttpPostedFile uploadfile, Dictionary<string, object> dic);

        /// <summary>
        /// 描述：剪切小头像
        /// 作者：王薪杰
        /// 时间：2012-12-6
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string CutAvatar(Dictionary<string, object> dic);
        #endregion

        #region  获取天气  城市信息
        /// <summary>
        /// 获取当前所在地天气
        /// </summary>
        /// <returns>json 数据 {result:是否成功，msg:天气名称}</returns>
        string GetLocationWeather();

        /// <summary>
        /// 根据参数获取天气
        /// </summary>
        /// <param name="param"></param>
        /// <returns>string 天气名称</returns>
        string GetWeather(string param);

        /// <summary>
        /// 获取ip所在 州省 城市
        /// </summary>
        /// <returns>json数据{result:是否成功,msg:城市,州省}</returns>
        string GetCurrentLocation();
        #endregion

        #region 日志 照片 视频 杂烩 转发

        /// <summary>
        /// 转发图片，视频，日志
        /// </summary>
        /// <param name="dic">string (imageid或者videoid或者blogid），string targetid（转发到哪个地方）</param>
        /// <returns></returns>
        string ForwardImgVdoBlog(Dictionary<string, object> dic);

        /// <summary>
        /// 转发图片，视频，日志（徐蓓2012-8-8修改，可以自定义新名称）
        /// </summary>
        /// <param name="dic">string (imageid或者videoid或者blogid），string targetid（转发到哪个地方），string newName（新名称）</param>
        /// <returns></returns>
        string ForwardImgVdoBlogX(Dictionary<string, object> dic);

        /// <summary>
        /// 转发视频册或者相册
        /// </summary>
        /// <param name="dic">string (imgfolderid或者vdofolderid)，string isCreateFolder(0 or 1),string folderIdOrName </param>
        /// <returns></returns>
        string ForwardImgFolderVdoFolder(Dictionary<string, object> dic);

        /// <summary>
        /// 转发状态或者链接
        /// </summary>
        /// <param name="dic">string (linkid或者stateid）</param>
        /// <returns></returns>
        string ForwardStateLink(Dictionary<string, object> dic);

        /// <summary>
        /// 转发日志或者照片或者视频或者杂烩
        /// </summary>
        /// <param name="dic">string 类型( Blog(日志id),Image(图片id),Video(视频id),Information(杂烩id)),string Categoryid</param>
        /// 字典的key值为类型,对应的value值为id
        /// <returns></returns>
        //string ForwardTheBlogOrImageOrVideoOrInformation(Dictionary<string, object> dic);
        #endregion

        #region 权限
        /// <summary>
        /// 王薪杰
        /// 获取当前用户所有权限
        /// </summary>
        /// <returns></returns>
        string GetAllPermissionForCurUser();

        /// <summary>
        /// 王薪杰
        /// 获取用户所有权限
        /// </summary>
        /// <returns></returns>
        string GetAllPermission(Dictionary<string, object> dic);

        /// <summary>
        /// 获或当前用户自定义权限数
        /// </summary>
        /// <returns></returns>
        string GetCountOfCustomPermissionForCurUser();

        /// <summary>
        /// 获取用户自定义权限数
        /// </summary>
        /// <param name="?"></param>
        /// <returns></returns>
        string GetCountOfCustomPermission(Dictionary<string, object> dic);

        /// <summary>
        /// 获取当前用户所有自定义权限
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string GetAllCustomPermissionForCurUser();

        /// <summary>
        /// 获取自定义权限内容
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string GetCustomPermissionById(Dictionary<string, object> dic);

        /// <summary>
        /// 添加或修改权限
        /// </summary>
        /// <param name="dic">权限名:pername,旧权限名：oldper(修改必传),允许对象集合：allow，拒绝对象集合：refuse，是否设为默认权限：setdefault</param>
        /// <returns></returns>
        string AddOrUpdateCustomPermission(Dictionary<string, object> dic);

        /// <summary>
        /// 删除自定义权限
        /// </summary>
        /// <param name="dic">权限编号：perId</param>
        /// <returns></returns>
        string DelCustomPermission(Dictionary<string, object> dic);

        /// <summary>
        /// 判断当前用户是否能添加自定义权限
        /// </summary>
        /// <returns></returns>
        string CanAddCustomPermissionForCurUser();
        #endregion

        #region 个人日志共享到活动留言感想表
        /// <summary>
        /// 个人日志共享到活动留言感想表
        /// </summary>
        /// <param name="dic">前台获取数据集合-id:日志表id，active_id:活动id,active_name:活动名,
        ///                     create_id:操作人id,SUBJECT:主题content:内容</param>
        /// <returns>是否共享成功的提示信息</returns>
        string personalLogShareToActivity(Dictionary<string, object> dic);
        #endregion

        #region 查询活动分类以及该分类下的最新活动
        /// <summary>
        ///  查询活动分类以及该分类下的最新活动
        /// </summary>
        /// <param name="dic">前台获取数据集合</param>
        /// <param name="NewActivityByCategory">查询最新活动映射sql</param>
        /// <returns></returns>
        string GetActivityCategoryAndActivity(Dictionary<string, object> dic, string NewActivityByCategory);
        #endregion

        //#region 获取客户端语言
        ///// <summary>
        ///// 获取客户端语言
        ///// </summary>
        ///// <returns></returns>
        //string GetClientLanguage();
        //#endregion

        #region 活动或个人相册照片上传
        /// <summary>
        /// 活动或个人相册照片上传
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string AlbumPhotoUpload(Dictionary<string, object> dic);

        /// <summary>
        /// 共享图片至默认相册（2012-8-27徐蓓添加）
        /// </summary>
        /// <param name="batchId">批次id</param>
        /// <param name="pList">图片列表</param>
        /// <returns></returns>
        string ShareImage(string batchId, string pList);

        /// <summary>
        /// 照片确认上传
		///  个人共享相册存储地址为：YYYY-MM/DD/UserID/PersonalImageFolderID/；
		///  活动自建相册物理存储地址为：YYYY-MM/DD/ActivityID/ActivityImageFolderID/
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string AlbumPhotoSumitUpload(Dictionary<string, object> dic);

        #endregion
    }
}
