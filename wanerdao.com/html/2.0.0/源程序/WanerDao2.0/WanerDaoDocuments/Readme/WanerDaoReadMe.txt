作者：金广亮
时间：2012年8月3日 1:03
摘要：重写完成个人报名、图表弹出层
1.个人报名位置WanerDaoViews2.0\scripts\plugin\activity\wanerdao2.selfsignupparam.js
2.个人报名demo位置WanerDaoViews2.0\plugindemo\activity\activitycreate.htm
3.图表弹出层位置WanerDaoViews2.0\scripts\plugin\chart\wanerdao2.chart.js
4.图表弹出层demo位置WanerDaoViews2.0\plugindemo\chart\chart.htm
5.修改WanerDaoViews2.0\scripts\common\wanerdaoutils.js
**************************************************************************************************************
作者：金广亮
时间：2012年8月1日 2:26
摘要：新增活动分类弹出框
1.位置WanerDaoViews2.0\scripts\plugin\activitycategory\wanerdao2.ac.js
2.demo位置WanerDaoViews2.0\plugindemo\activitycategory\ac.htm
3.解决活动分类不能缓存以及缓存之后点击事件没有注册上去的问题
4.修改WanerDaoViews2.0\scripts\common\wanerdao2.date.js
**************************************************************************************************************
作者：金广亮
时间：2012年7月25日 2:06
摘要：新增信息提示弹出框
1.位置WanerDaoViews2.0\scripts\plugin\TipPop\wanerdao2.pop.js
2.demo位置WanerDaoViews2.0\plugindemo\tippop\pop.htm
3.已知问题在firebug开启时候弹出框不出来
**************************************************************************************************************
作者：金广亮
时间：2012年7月24日 23:23
摘要：统一国际化了时间以及金钱
1.移动了时间相关函数到WanerDaoViews2.0\scripts\common\wanerdao2.date.js
2.新增金钱以及数字格式化函数\WanerDaoViews2.0\scripts\common\wanerdao2.number.js
**************************************************************************************************************
作者：王薪杰
时间：2012年7月22日 22:19
摘要：修改了WanerdaoModule->WaneDaoCookie.cs 
   添加了对cookies值得编码
   修改了jquery.chosen.js , $.fn.chosen()可以重新渲染select

**************************************************************************************************************
作者：徐蓓
时间：2012年6月3日 22:19
摘要：web前台添加获取搜索结果总数，添加个人安装前台功能。
1 添加WanerDaoViews/Scripts/personaltool/personaltool.js个人安装前台功能相关js。
2 修改WanerDaoViews/Scripts/search/search.js以支持获取搜索总数。
**************************************************************************************************************
作者：徐蓓
时间：2012年6月3日 22:13
摘要：添加个人插件安装信息相关
1 添加/WanerDaoIBLL/ITool/IWanerDaoPersonalTools.cs个人安装插件信息接口
2 添加/WanerDaoBLL/Tool/WanerDaoPersonalTools.cs个人安装插件信息业务逻辑
**************************************************************************************************************
作者：徐蓓
时间：2012年5月20日 21:40
摘要：
1 修改WanerDaoBLL/Index/WanerDaoActionState.cs，去掉public string GetSearchResult(Dictionary<string, object> dic)函数的
int resultCount = 0;
dic.Clear();
dic.Add("count", resultCount);
dic.Add("content", result);
result = WanerDaoJSON.GetSuccessJson(dic);
直接返回result。
2 修改WanerDaoBLLFactory/Common/WanerDaoCommonFactory.cs的case "getactivitybycityid":
添加如果cityId传-1的话，就取当前用户的cityId。
3 修改WanerDaoBLLFactory/Common/WanerDaoCommonFactory.cs的getactivitybycurrentuserfollow，可以返回活动的描述。
**************************************************************************************************************
**************************************************************************************************************
作者：徐蓓
时间：2012年4月22日 14:53
摘要：
WanerDao2.0/WanerDaoViews/WanerDaoMasterPage.master修改前台模板页，增加全站下部工具条。
工具条的日历是用iframe嵌入，日历工具页面为WanerDaoPluginService/Plugin/fullcalendar/application tool.html，请发布时改下src地址。
**************************************************************************************************************
作者：徐蓓
时间：2012年4月22日 14:53
摘要：
上传杂烩前台页面
1、/源程序/WanerDao2.0/WanerDaoViews/Posts
2、/源程序/WanerDao2.0/WanerDaoViews/Posts/Forum_Main.aspx
3、/源程序/WanerDao2.0/WanerDaoViews/Posts/Forum_Main.aspx.cs
4、/源程序/WanerDao2.0/WanerDaoViews/Posts/Forum_View.aspx
5、/源程序/WanerDao2.0/WanerDaoViews/Posts/Forum_View.aspx.cs
上传关注前台页面
1、/源程序/WanerDao2.0/WanerDaoViews/relationship/follow
2、/源程序/WanerDao2.0/WanerDaoViews/relationship/follow/relationship_activity_follow.aspx
3、/源程序/WanerDao2.0/WanerDaoViews/relationship/follow/relationship_activity_follow.aspx.cs
4、/源程序/WanerDao2.0/WanerDaoViews/relationship/follow/relationship_friends_follow.aspx
5、/源程序/WanerDao2.0/WanerDaoViews/relationship/follow/relationship_friends_follow.aspx.cs
6、/源程序/WanerDao2.0/WanerDaoViews/relationship/follow/relationship_group_follow.aspx
7、/源程序/WanerDao2.0/WanerDaoViews/relationship/follow/relationship_group_follow.aspx.cs
8、/源程序/WanerDao2.0/WanerDaoViews/relationship/follow/relationship_module_follow.aspx
9、/源程序/WanerDao2.0/WanerDaoViews/relationship/follow/relationship_module_follow.aspx.cs
10、/源程序/WanerDao2.0/WanerDaoViews/relationship/follow/relationship_myself_follow.aspx
11、/源程序/WanerDao2.0/WanerDaoViews/relationship/follow/relationship_myself_follow.aspx.cs
12、/源程序/WanerDao2.0/WanerDaoViews/relationship/follow/relationship_posts_follow.aspx
13、/源程序/WanerDao2.0/WanerDaoViews/relationship/follow/relationship_posts_follow.aspx.cs
14、/源程序/WanerDao2.0/WanerDaoViews/relationship/follow/tabTop.htm
15、/源程序/WanerDao2.0/WanerDaoViews/relationship/menuTop.htm
上传搜索前天页面
1、/源程序/WanerDao2.0/WanerDaoViews/Search
2、/源程序/WanerDao2.0/WanerDaoViews/Search/Search_Result.aspx
3、/源程序/WanerDao2.0/WanerDaoViews/Search/Search_Result.aspx.cs
上传Home页面
1、/源程序/WanerDao2.0/WanerDaoViews/Home/Home.aspx
2、/源程序/WanerDao2.0/WanerDaoViews/Home/Home.aspx.cs
**************************************************************************************************************
作者：徐蓓
时间：2012年4月22日 14:30
摘要：上传日历插件
1、上传WanerDaoPluginService/Plugin日历插件
2、增加杂烩关注业务逻辑接口WanerDaoIBLL/IFollow/IWanerDaoPersonalPostsFollow.cs
3、修改个人日历业务逻辑WanerDao2.0/WanerDaoBLL/Person/WanerDaoPersonalCalendar.cs
4、修改杂烩业务逻辑WanerDao2.0/WanerDaoBLL/Posts/WanerDaoPosts.cs
5、修改关注Factory，增加多语言和整合用户WanerDao2.0/WanerDaoFactory/Follow/WanerDaoFollowFactory.cs
6、添加杂烩Factory，WanerDao2.0/WanerDaoFactory/Posts/WanerDaoPostsFactory.cs
**************************************************************************************************************
作者：徐蓓
时间：2012年4月22日 14:15
摘要：增加多语言支持
1、修改WanerDaoWorkDir/DbConfig/SQL/FollowSQL.xml
2、修改WanerDaoWorkDir/DbConfig/SQL/PersonSQL.xml
3、修改WanerDaoWorkDir/DbConfig/SQL/PostsSQL.xml
增加多语言支持
**************************************************************************************************************
作者：徐蓓
时间：2012年4月19日 22:11
摘要：
1、增加杂烩关注实体类
/源程序/WanerDao2.0/WanerDaoModel/Follow/PersonalPostsFollowModel.cs
**************************************************************************************************************
作者：徐蓓
时间：2012年4月19日 22:07
摘要：
1、增加关注工厂类文件
/源程序/WanerDao2.0/WanerDaoFactory/Follow/WanerDaoFollowFactory.cs
2、修改关注相关
/源程序/WanerDao2.0/WanerDaoBLL/Follow/WanerDaoPersonalActivityFollow.cs
/源程序/WanerDao2.0/WanerDaoBLL/Follow/WanerDaoPersonalFriendsFollow.cs
/源程序/WanerDao2.0/WanerDaoBLL/Follow/WanerDaoPersonalGroupFollow.cs
/源程序/WanerDao2.0/WanerDaoBLL/Follow/WanerDaoPersonalModuleFollow.cs
3、修改杂烩阅读状态、杂烩、杂烩分类业务层
/源程序/WanerDao2.0/WanerDaoBLL/Person/WanerDaoPersonalViewRecord.cs
/源程序/WanerDao2.0/WanerDaoBLL/Posts/WanerDaoPosts.cs
/源程序/WanerDao2.0/WanerDaoBLL/Posts/WanerDaoTopicCategory.cs
4、修改个人日历业务层
/源程序/WanerDao2.0/WanerDaoBLL/Person/WanerDaoPersonalCalendar.cs
5、修改杂烩、杂烩分类接口
/源程序/WanerDao2.0/WanerDaoIBLL/IPosts/IWanerDaoPosts.cs
/源程序/WanerDao2.0/WanerDaoIBLL/IPosts/IWanerDaoTopicCategory.cs
6、修改关注接口
/源程序/WanerDao2.0/WanerDaoIBLL/IFollow/IWanerDaoPersonalActivityFollow.cs
/源程序/WanerDao2.0/WanerDaoIBLL/IFollow/IWanerDaoPersonalFriendsFollow.cs
/源程序/WanerDao2.0/WanerDaoIBLL/IFollow/IWanerDaoPersonalGroupFollow.cs
/源程序/WanerDao2.0/WanerDaoIBLL/IFollow/IWanerDaoPersonalModuleFollow.cs
7、修改个人日历、杂烩、杂烩分类实体
/源程序/WanerDao2.0/WanerDaoModel/Person/PersonalCalendarModal.cs
/源程序/WanerDao2.0/WanerDaoModel/Post/PostsModal.cs
/源程序/WanerDao2.0/WanerDaoModel/Post/TopicCategoryModal.cs
8、修改个人日历服务
/源程序/WanerDao2.0/WanerDaoPluginService/Plugin/fullcalendar/calendar.html
/源程序/WanerDao2.0/WanerDaoPluginService/Plugin/fullcalendar/css/fullcalendar.css
/源程序/WanerDao2.0/WanerDaoPluginService/Plugin/fullcalendar/css/fullcalendar.print.css
/源程序/WanerDao2.0/WanerDaoPluginService/Plugin/fullcalendar/scripts/fullcalendar.js
/源程序/WanerDao2.0/WanerDaoPluginService/Plugin/fullcalendar/scripts/fullcalendar.min.js
/源程序/WanerDao2.0/WanerDaoPluginService/Plugin/fullcalendar/scripts/gcal.js
/源程序/WanerDao2.0/WanerDaoPluginService/Plugin/fullcalendar/scripts/utility.js
**************************************************************************************************************
作者：徐兵
时间：2012年4月18日 0:30
摘要：
1、主要增加和修改文件情况如下，增加活动计划管理及天气预报Model
	Modified: \WanerDaoBLL\Activity\WanerDaoActivity.cs  
	Modified: \WanerDaoFactory\Activity\WanerDaoActivityFactory.cs  
	Modified: \WanerDaoIBLL\IActivity\IWanerDaoActivity.cs  
	Adding: \WanerDaoModel\Activity\ActivityBase\Id.cs  
	Modified: \WanerDaoModel\Activity\ActivityBase\IdAndName.cs  
	Modified: \WanerDaoModel\Activity\ActivityCreate\plan.cs  
	Modified: \WanerDaoModel\Activity\ActivityManage\ActivityMainInfo.cs  
	Adding: \WanerDaoModel\Activity\ActivityManage\ActivityPlanJson.cs  
	Adding: \WanerDaoModel\Activity\Weather  
	Adding: \WanerDaoModel\Activity\Weather\WeatherInfo.cs  
	Modified: \WanerDaoModel\WanerDaoModel.csproj  
	Modified: \WanerDaoPluginService\obj\Debug\DesignTimeResolveAssemblyReferencesInput.cache  
	Modified: \WanerDaoViews\PluginDemo\AcitivityManage\Manage.aspx  
	Modified: \WanerDaoViews\PluginDemo\AcitivityManage\Manage.aspx.cs  
	Modified: \WanerDaoWorkDir\DbConfig\SQL\ActivitySQL.xml  


2、完成活动管理中活动计划的查询和修改，并提供JSON说明 和查询、修改DEMO。
	DEMO地址：WanerDaoViews\PluginDemo\AcitivityManage\Manage.aspx 
3、完成活动管理中天气预报的查询模块，提供接口可供任意城市查询，并提供JSON说明 和查询DEMO
	DEMO地址：WanerDaoViews\PluginDemo\AcitivityManage\Manage.aspx 

**************************************************************************************************************
作者：徐兵
时间：2012年4月3日 11:30
摘要：都为补充提交，因出差赶项目中，故一直无条件未提交
1、主要增加文件情况如下，基本都为活动管理
	Adding: WanerDaoModel\Activity\ActivityBase  
	Adding: WanerDaoModel\Activity\ActivityBase\IdAndName.cs  
	Adding: WanerDaoModel\Activity\ActivityBase\ManagerBase.cs  
	Modified: WanerDaoModel\Activity\ActivityCreate\limitcondition.cs  
	Adding: WanerDaoModel\Activity\ActivityManage  
	Adding: WanerDaoModel\Activity\ActivityManage\ActivityMainInfo.cs  
	Adding: WanerDaoModel\Activity\ActivityManage\ActivitySignUpInfo.cs  
	Adding: WanerDaoModel\Activity\ActivityManage\FinancialManager.cs  
	Adding: WanerDaoModel\Activity\ActivityManage\OperationManager.cs  
	Modified: WanerDaoModel\Activity\ActivitySignUp\invite.cs  
	Modified: WanerDaoModel\Activity\activitycategory.cs  
	Modified: WanerDaoModel\Activity\activityjoinconditions.cs  
	Modified: WanerDaoModel\WanerDaoModel.csproj  
	Modified: WanerDaoPluginService\obj\Debug\WanerDaoPluginService.csproj.FileListAbsolute.txt  
	Adding: WanerDaoViews\PluginDemo\AcitivityManage  
	Adding: WanerDaoViews\PluginDemo\AcitivityManage\Manage.aspx  
	Adding: WanerDaoViews\PluginDemo\AcitivityManage\Manage.aspx.cs  


2、提供活动管理中活动信息管理JSON说明 和查询、修改DEMO。
	DEMO地址：WanerDaoViews\PluginDemo\AcitivityManage\Manage.aspx 
3、所增加和修改都为活动管理，具体操作和调用请参见DEMO

4、另外更新代码后，发现个人信息工厂类WanerDaoPersonalInfoFactory.cs中有无法编译代码，以被本人注释。需要相关人员提交代码，并恢复注释。具体内容已在群众截图说明

**************************************************************************************************************
**************************************************************************************************************
作者：王薪杰
时间：2012年3月31
摘要：
1.更新SQL/common.xml .PersonSQL.xml
2.更新WanerDaoBLL/WanerDaoBlogManager.cs、WanerDaoImageManager.cs、WanerDaoPersonInfoManager.cs、WanerDaoPersonSecurity.cs、WanerDaoVideoManager.cs
3.更新WanerDaoMasterPage.master 在页面底部增加
<asp:ContentPlaceHolder id="Script" runat="server">
        
        </asp:ContentPlaceHolder>
		用于放置js引用
**************************************************************************************************************
作者：王薪杰
时间：2012年3月25日2:30:30
摘要：
1.更新 WanerDaoView\Account 所有页面
2.更新 WanerDaoView\Scripts\security 所有js文件
**************************************************************************************************************
作者：杨晓东
时间：2012年3月25日2:30:30
摘要：
1.添加文件夹 WanerDaoDocuments\DataBaseScript\Script 存放整理后的SQL文件
2.添加文件YXDScript.sql

**************************************************************************************************************
作者：王渝友
时间：2012年3月23日 
摘要：
1.增加活动相册各页面，修改相应的逻辑
2.增加活动查询页面
3.更新文件：
	WanerDaoViews\Activity\Activity_myhistory_photo_view.aspx
	WanerDaoViews\Activity\Activity_myhistory_photo_edit.aspx
	WanerDaoViews\Activity\Activity_myhistory_album_view.aspx
	WanerDaoViews\Activity\Activity_myhistory_album_upload.aspx
	WanerDaoViews\Activity\Activity_search.aspx
	WanerDaoViews\Scripts\activity\activity_myhistory_album_upload.js
	WanerDaoViews\Scripts\activity\activity_myhistory_album_view.js
	WanerDaoViews\Scripts\activity\activity_myhistory_photo_edit.js
	WanerDaoViews\Scripts\activity\activity_myhistory_photo_view.js
	WanerDaoViews\Scripts\activity\activity_search.js
**************************************************************************************************************
作者：王薪杰
时间：2012年3月22日 
摘要：
1.更新bll, WanerDaoPersonInfoManager.cs
2.更新bllFactory WanerDaoPersonalInfoFactory.cs
3.更新 PersonSQL.xml
4.更新WanerdaoView 更新personal_edit.aspx 更新相关js，和css文件
5.修改WanerDaoDocuments/DataBaseScript/function/GetFullCountryByid.txt
**************************************************************************************************************
作者:金广亮
时间：2012年3月21日 23：52
摘要：
1、完成地区选择框插件
1.1 需要注意的是使用此插件要导入如下CSS和JS（如果模板页里面已包含的请勿重复包含）
<link rel='stylesheet' href="../../css/layout.css" type="text/css" />
    <link rel='stylesheet' href="../../css/PluginCss/pop.css" type="text/css" />
    <script type="text/javascript" src="../../Scripts/jquery-1.4.2.js"></script>
    <script type="text/javascript" src="../../Scripts/common/wanerdaoutils.js"></script>
    <script type="text/javascript" src="../../Scripts/multipleLanguage/loader.js"></script>    
    <script type="text/javascript" src="../../Scripts/Plugin/Area/wanerdao2.area.js"></script>
    <script type="text/javascript" src="../../Scripts/OpenProjectPlugin/jquery.overlay.js"></script>
1.2 重新编写地区的SQL
1.3 删除以前写的地区相关函数，统一使用多语言调用
1.4 新的地区选择框demo请参见WanerDaoViews\PluginDemo\Area\newAreaDemo.htm
**************************************************************************************************************
作者：徐兵
时间：2012年3月21日 23:30
摘要：
1、修改了测试出的BUG

2、加入了活动成员分页查询 "getactivitymemberpagiation"://活动用户键值对分页查询。

3、加入了活动参数管理DEMO页面，并对JSON格式进行说明描述
	WanerDaoViews\PluginDemo\ActivitySettings\Settings.aspx
4、测试并修改活动参数管理后台代码BUG

**************************************************************************************************************
作者：徐兵
时间：2012年3月21日
摘要：
1、修改了多个业务参数中JSON返回信息 加入了[result:true|false;data:具体数据] 格式
2、修改了上传组件，解决以前只能初始化控件时保存值问题，先可以每次传入最新参数。
	修改了上传组件DEMO
3、签入了用户报名前，判断各个活动限制条件，查看用户是否能报名

4、签入个人活动参数修改、查询的后台代码，及加入了前台需要的选择业务参数（周期选择）
	加入文件 WanerDaoModel\Activity\ActivitySetting\PersonActivitySettingsJson.cs
		WanerDaoModel\Activity\ActivitySetting\PersonJson.cs
	对应业务：
	"updatepersongactivitysettings":修改个人活动设置
	"getpersongactivitysettingsjosnforjson":查询个人活动设置
	"getpersongactivitysettingsperiod":查询个人活动设置订阅周期
**************************************************************************************************************
作者：徐兵
时间：2012年3月13日
摘要：
1、修改了多个业务参数中JSON返回信息 加入了[result:true|false;data:具体数据] 格式
2、补充了活动地址按照州省查找条件
3、补充了获取付费方式，增加了描述
4、活动创建业务参数对应关系如下
	getgrouppagiation:圈子分页
	getgrouppagiation:圈子分页 
	getactivityplacesearch:活动地址查询页

	activitycreatepage:活动创建
	activitysignup:活动报名
	getactivityparambypersonactivityarchivesid:根据用户活动参数ID获取活动创建参数
	getactivityparambyactivityid:根据活动ID获取活动创建参数
	getkeyvalueactivityparambyuserid:获取活动ID与名字JSON数据
	getkeyvaluepersonalactivityarchivesparam:获取用户活动参数ID与名字JSON数据
	getcreateactivitypersonalinfo:个人信息
	getactivitycreatetype:发起活动者类型 圈子或者个人
	getkevaluecreateactivitybygroup:以圈子名义发起活动获取圈子 
	getkeyvalueactivityduration:活动周期定制  一次性（默认），订制固定周期，订制浮动周期
	getkeyvalueactivityintervalduration:间隔周期 每天，每周（默认），每月，每季度，每年
	getkeyvaluecreatemode:创建形式 直接创建活动（默认），通知创建人同意后，活动创建
	getactivityemailduration:发送email周期性
	getsitemessageduration:发送站内信息周期性  无，可用发送email周期性代替
	getjsonactivityplacecategorytop:活动地址顶层类型 
	getjsonactivityplacecategorychild:活动地址类型孩子  如果ID为空，则获取顶层节点
	getactivitycategorysettingsinfo:活动分类
	getkeyvalueactivitykickduration:踢人保护时限
	getkeyvaluebudgeoper:预算执行人员
	getkeyvaluejsonallsignuptype:获取报名方式ID与名字JSON数据
	getkeyvaluejsonallvehicletype:交通方式ID和名字 JSON数据
	getkeyvaluejsonallpaytype:获取付费方式的ID和名字 JSON数据
	getkeyvaluejsonallcarpooltype:获取所有搭车付费ID和名称
	getkeyvaluejsonallautobrand:获取所有汽车品牌ID和名称
	getkeyvaluejsonallautomodelbybrandid:根据品牌ID获取所有汽车型号ID和名称 JSON数据 传入brandid：品牌ID
	getkeyvaluejsonallautomodel:获取所有汽车型号ID和名称 JSON数据
	getkeyvaluejsonalljoinconditions:获取所有加入门槛条件ID和名称 JSON数据  门槛值输入

**************************************************************************************************************
**************************************************************************************************************

作者：王薪杰
时间：2012年3月12日
摘要：
1、更新了个人日志，个人视频页面，及相关js,css,images
2、更新WanerDaoDocuments/type/axd文件映射对应业务工厂维护文档.xls
3、更新 WanerDaoDocuments/Readme/视图存储过程说明/ 存储过程更新说明.xls

2、修改活动周期处理相关代码及处理逻辑
3、修改并更新了活动创建JSON格式说明文档WanerDaoViews\PluginDemo\ActivityCreate\活动创建JSON.doc

**************************************************************************************************************

作者：徐兵
时间：2012年3月11日
摘要：
1、修改增加 活动地址分类多层级处理，活动地址分页查询
2、修改活动周期处理相关代码及处理逻辑
3、修改并更新了活动创建JSON格式说明文档WanerDaoViews\PluginDemo\ActivityCreate\活动创建JSON.doc

**************************************************************************************************************
作者：胥鑫
时间：2012年3月9日
摘要：
     统一上传图片路径。根目录下uploadImage文件夹。
     路径用XML配置。配置文件：WanerDaoWorkDir\paramConfig\paramConfig
     暂时配置有圈子，个人，活动3个文件夹.
     读取方式：WanerDaoFilterReader.GetParam("GroupIamge")

**************************************************************************************************************

作者：徐兵
时间：2012年3月8日
摘要：
1、修改并更新了活动创建JSON格式说明文档WanerDaoViews\PluginDemo\ActivityCreate\活动创建JSON.doc
	
2、编写活动报名JSON格式说明文档 ，提交位置：WanerDaoViews\PluginDemo\ActivitySignup\活动报名JSON格式说明.docx

4、编写活动创建及报名验证业务代码。

5、将部分以前写死的提示信息修改成支持多语言版本的格式。
**************************************************************************************************************
作者：徐兵
时间：2012年3月7日
摘要：
1、同步数据库、同步基础数据
2、提交活动创建未加入和漏掉的前台业务代码，在接口中加入具体方法以及实现
	活动工厂：
	case "getcreateactivitypersonalinfo"://个人信息
	case "getactivitycreatetype"://发起活动者类型 圈子或者个人  ActivityCreateType
	case "getkevaluecreateactivitybygroup"://以圈子名义发起活动获取圈子 
											
	case "getkeyvalueactivityduration"://活动周期定制  一次性（默认），订制固定周期，订制浮动周期
	case "getkeyvalueactivityintervalduration"://间隔周期 每天，每周（默认），每月，每季度，每年
	case "getkeyvaluecreatemode"://创建形式 直接创建活动（默认），通知创建人同意后，活动创建
	case "getactivityemailduration"://发送email周期性  ActivityEmailDuration
	case "getsitemessageduration"://发送站内信息周期性  无，可用发送email周期性代替
	case "getkeyvalueplacecategory"://活动地址类型  ActivityPlaceCategory
	case "getactivitycategorysettingsinfo"://活动分类 ActivityCategorySettings
	case "getkeyvalueactivitykickduration"://踢人保护时限  ActivityKickDuration
	case "getkeyvaluebudgeoper"://预算执行人员
	公共工厂
	case "getactivityplacesearch"://活动地址查询页
	case "getfriendpagiation"://活动地址查询页
	case "getgrouppagiation"://活动地址查询页

3、变更活动创建JSON格式、修改相应各个代码。
4、变更活动报名JSON格式、修改相应各个代码。
5、修改公共文件WanerDao2.0\WanerDaoModule\Json\WanerDaoJSON.cs
	增加方法、（现有不能序列化任意对象，故加入。支持任意对象）
	/// <summary>        
        /// 描述：任意对象返回成功JSON格式信息[result:true;其余信息可以自定义]
        /// 作者：徐兵
        /// 时间：2012-3-6
        /// </summary>
        /// <param name="obj">自定义对象</param>
        /// <returns>JSON格式字符串提示信息</returns>
        public static string GetSuccessJson(object obj)

	/// <summary>        
        /// 描述：任意对象返回失败JSON格式信息[result:false;其余信息可以自定义]
        /// 作者：徐兵
        /// 时间：2012-3-6
        /// </summary>
        /// <param name="obj">自定义对象</param>
        /// <returns>JSON格式字符串提示信息</returns>
        public static string GetFailJson(object obj)

	/// <summary>
        /// 描述：任意对象返回成功否JSON格式信息[result:true|false;其余信息可以自定义]
        /// 作者：徐兵
        /// 时间：2012-3-6
        /// </summary>
        /// <param name="flg"></param>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static string SerializeObject(bool flg, object obj)

6、本次太晚，确保提供的活动创建DEMO和活动报名DEMO都成功，具体JSON格式说明文档明天再提交。
**************************************************************************************************************
作者：王薪杰
时间：2012年3月6日
摘要：更新BLL类  WanerDaoPersonSecurity.cs 修改记录登陆日志代码

**************************************************************************************************************
作者：徐兵
时间：2012年3月5日
摘要：
1、提交了活动创建的所有代码
	1、活动创建
	2、活动创建参数获取
	3、活动模板参数获取
	4、补齐活动创建页面中需要从后台获取的各个选项
	5、提交活动创建DEMO页面（包含JSON格式数据）
2、提交了活动报名的主要代码
	1、提交活动报名各个定义的MODEL
	2、提交活动报名主要代码
	3、提交活动报名DEMO页面（包含JSON格式数据）
3、本次因活动组沟通需要，先将代码潜入。嵌入的代码保证编译通过。具体代码说明及业务参数后续具体提交
**************************************************************************************************************
作者：王薪杰
时间：2012年3月4日
摘要：添加 Scripts/OpenProjectPlugin/jquery.overlay.js 弹出框基础插件

**************************************************************************************************************
作者：徐蓓
时间：2012年3月3日
摘要：添加关注相关实体及业务逻辑
1 在WanerDaoBLL/Follow中添加
WanerDaoPersonalActivityFollow.cs
WanerDaoPersonalFriendsFollow.cs
WanerDaoPersonalGroupFollow.cs
WanerDaoPersonalModule.cs
2 在WanerDaoIBLL/IFollow中添加
IWanerDaoPersonalActivityFollow.cs
IWanerDaoPersonalFriendsFollow.cs
IWanerDaoPersonalGroupFollow.cs
IWanerDaoPersonalModule.cs
3 在WanerDaoModel/Follow中添加
PersonalActivityFollowModal.cs
PersonalFriendsFollowModal.cs
PersonalGroupFollowModal.cs
PersonalModuleFollowModal.cs

**************************************************************************************************************
作者：王薪杰
时间：2012年3月2日
摘要：修改WanerDaoMasterPage.master的布局结构

**************************************************************************************************************
作者：王薪杰
时间：2012年3月2日
摘要：页面多语言提示
添加
Scripts/multipleLanguage/loader.js
Scripts/multipleLanguage/zh-cn.js

 请把中文提示写在 zh-cn.js
 /*中文提示信息*/

 格式：

var zhcnlng = {
    /*公共提示 c*/
    public_00001: '请求失败！',
    public_00002: '请求成功！',

    /* 账号安全*/
    acc_00001: '请输入账号！',
    acc_00002: '请输入密码！',
    acc_00003: '密码长度8-20位！',
    acc_00004: '登录错误,跳转中...',
    acc_00005: '登录成功,跳转中...',
    acc_00006: '注册错误，跳转中...',
    acc_00007: '请求失败,跳转中...！'

    /*活动*/

    /*圈子*/

    /*杂烩*/


}

说明：public_* 的提示为 可以共用的提示
	
   单独模块 的提示请用自己所做模块英文为开头
    例如；acc_* 为账号及登陆注册相关提示

**************************************************************************************************************
作者:金广亮
时间：2012年2月29日 00:04:31
更新时间：2012年2月29日1:47:53
更新摘要：
	根据薪杰的建议重新梳理下多语言核心读取方式，由原来的只读取客户端浏览器语言集合扩展为可以读取用户自行设置语言的cookie
	设计的相关函数修改如下：
	WanerDaoModule\TipInfo\WanerDaoGlobalTip.cs与WanerDaoModule\Config\WanerDaoFilterReader.cs
	 /// <summary>
        /// 描述：获取客户端的用户语言
        /// 作者：金广亮
        /// 时间：2012-2-16
        /// </summary>
        /// <returns>如果获取不到用户客户端语言返回英语，否则返回用户客户端语言集合中的第一个选项</returns>
        public static string GetClientLanguage()
        {
            string tip = string.Empty;
            string lang = GetCookieInternLang();
            if (string.IsNullOrEmpty(lang))
            {
                string[] languages = HttpContext.Current.Request.UserLanguages;
                if (languages == null)
                {
                    tip = "en-us";
                }
                else
                    tip = languages[0].ToLower();
            }
            else
            {
                tip = lang;
            }
            return tip;
        }
        /// <summary>
        /// 描述：通过cookie获取用户自行设置的语言版本
        /// 作者：金广亮
        /// 时间：2012-2-29
        /// </summary>
        /// <returns>如果用户设置语言版本返回其语言信息反之返回string.Empty</returns>
        public static string GetCookieInternLang()
        {
            Dictionary<string, string> dicLang = WanerDaoCookie.GetCookieValues("multiplelang");
            string lang = string.Empty;
            if (dicLang != null)
            {
                lang = dicLang["langid"];
            }
            return lang;
        }
        /// <summary>
        /// 描述：获取TipConfig文件夹下面的对应语言版本信息
        /// 作者：金广亮
        /// 时间：2012-2-29
        /// </summary>
        /// <param name="langid">语言ID(例如中文:zh-cn)</param>
        /// <param name="key">配置文件中的KEY名称</param>
        /// <returns>成功返回结果，否则返回string.Empty</returns>
        private static string GetTipInfo(string langid,string key)
        {
            return WanerDaoConfigReader.GetConfigXml("TipConfig", langid, "Info", key);
        }
		       /// <summary>
        /// 加载帮助信息
        /// </summary>
        public static  void setXML()
        {
            string tip = string.Empty;
            tip = WanerDaoGlobalTip.GetClientLanguage();
            //string[] languages = HttpContext.Current.Request.UserLanguages;
            //if (languages == null)
            //{
            //    tip = "en-us";// WanerDaoConfigReader.GetConfigXml("TipConfig", "en-us", "Info", key);
            //}
            //else
            //    tip = languages[0].ToLower();// WanerDaoConfigReader.GetConfigXml("TipConfig", languages[0].ToLower(), "Info", key);
            //string path = HttpContext.Current.Request.PhysicalApplicationPath;
            
            HttpContext.Current.Application.Add("helpTime", DateTime.Now);
            XmlDocument xmlDoc = GetXmlDocumet(GetPath("helpConfig", tip));
            XmlNode Root_Node = xmlDoc.SelectSingleNode("helpBody");
            if (Root_Node != null)
            {
                foreach (XmlNode item in Root_Node.ChildNodes)
                {
                    HttpContext.Current.Application.Add(item.Name, item.InnerText);
                }
            }

        }
摘要：
	1.WanerDaoBLLFactory\Common\WanerDaoCommonFactory.cs
	1.1修改其中的多语言提示，            if (typestr == string.Empty)
            {
                json = WanerDaoGlobalTip.GetInternationalizationTip("NoDataTypeInfo", WanerDaoResultEnum.Failure);//WanerDaoJSON.GetErrorJson("no operator type or invalid operator!");
            }
            else
            {
                IWanerDaoCommon common = new WanerDao2.WanerDaoBLL.Common.WanerdaoCommon() as IWanerDaoCommon;

                if (common == null)
                {
                    json = WanerDaoGlobalTip.GetInternationalizationTip("NoDataTypeInfo", WanerDaoResultEnum.Failure);// WanerDaoJSON.GetErrorJson("没有对应类型处理!");
                }
	1.2国家省市地区多语言提示并修改其操作码
	                            #region 国家、省州、市县
                            case "country":
                                json = common.WanerDaoCountry();
                                break;
                            case "state":
                                json = common.WanerDaoState(dic);
                                break;
                            case "city":
                                json = common.WanerDaoCity(dic);
                                break;
                            case "area":
                                json = common.WanerDaoArea(dic);
                                break;
                            #endregion

	2.WanerDaoBLL\Common\WanerdaoCommon.cs以及期对应接口
	2.1 修改国家省市地区多语言接口，去除WanerDaoCountry等函数后缀并新增对应的多语言版本判断

	3.WanerDaoModule\TipInfo\WanerDaoGlobalTip.cs
	3.1        /// <summary>
        /// 描述：获取客户端的用户语言
        /// 作者：金广亮
        /// 时间：2012-2-16
        /// </summary>
        /// <returns>如果获取不到用户客户端语言返回英语，否则返回用户客户端语言集合中的第一个选项</returns>
        public static string GetClientLanguage()
        {
            string tip = string.Empty;
            string[] languages = HttpContext.Current.Request.UserLanguages;
            if (languages==null)
            {
                return "enus";
            } 
            else
            {
                return languages[0].ToLower();
            }
        }

	4.WanerDaoDocuments
	4.1新增WanerDaoDocuments\Dlls\AWS SDK for .NET\AWSSDK.dll亚马逊云服务SDK库
	4.2修改DataBaseScript\p_wanerdaoareabyid.txt，根据最新的PDM来多语言适配地区信息

	5.WanerDaoWorkDir
	5.1修改DbConfig\SQL\CommonSQL.xml关于地区相关的SQL
	5.2新增MailConfig文件夹并新增2个XML文件
	5.2.1 WanerDaoMailHtmlConfig.xml所有关于HTML版本的email都存放在此文件里面
	5.2.2 WanerDaoMailTextConfig.xml所有关于文本版本的email都存放在此文件里面
	5.3新增TipConfig\zh-cn.xml一条记录    
	<Info ID="NoDataTypeInfo">
      没有对应类型处理
    </Info>
	5.4 新增XSD\MailConfig.xsd邮件的XML结构约束

	6.WanerDaoEmail
	6.1 使用亚马逊云邮件服务组件重写以前的邮件服务
	6.2 如果调用邮件服务需要注意以下几点
	1）如果使用邮件模版，请在WanerDaoWorkDir\MailConfig\WanerDaoMailHtmlConfig.xml或WanerDaoMailTextConfig.xml
		选择合适的文本，如果没有请自行根据需求添加并在readme中有体现。
	2）调用邮件服务，请使用WanerDaoEmail\WanerDaoMessageQueue.cs定义的SendMail相关函数
**************************************************************************************************************
作者：王渝友
时间：2012年2月28日23:00:00
摘要：1、新增activity_define_main.aspx,activity_item_main.aspx,activity_season_main.aspx 页面的业务逻辑
         js、前台json数据绑定
      2、查找活动数据库表字段active_name, 更改为activity_name
      3、 更新文件：
	WanerDao2.0\WanerDaoBLL\Common\WanerdaoCommon.cs
        WanerDao2.0\WanerDaoBLL\Common\WanerdaoActivty.cs
	WanerDao2.0\WanerDaoIBLL\ICommon\IWanerDaoCommon.cs
	WanerDao2.0\WanerDaoFactory\Activity\WanerDaoActivityFactory.cs
	WanerDao2.0\WanerDaoFactory\Common\WanerDaoCommonFactory.cs
	WanerDao2.0\WanerDaoWorkDir\DbConfig\SQL\ActivitySQL.xml
	WanerDao2.0\WanerDaoWorkDir\DbConfig\SQL\CommonSQL.xml
	WanerDao2.0\WanerDaoViews\Scripts\activity\activity_main.js
	WanerDao2.0\WanerDaoViews\Scripts\activity\aactivity_category_main.js.js
	WanerDao2.0\WanerDaoViews\Scripts\activity\Activity_define_main.aspx
	WanerDao2.0\WanerDaoViews\Scripts\Plugin\SideBar\wanerdao2.sidebar.js
	WanerDao2.0\WanerDaoViews\Activity\Activity_define_main.aspx
	WanerDao2.0\WanerDaoViews\Activity\Activity_item_main.aspx
        WanerDao2.0\WanerDaoViews\Activity\Activity_season_main.aspx
**************************************************************************************************************
作者：王薪杰
时间：2012年2月28日
摘要：更新首页，登陆页，注册页，及相关js,css,images

**************************************************************************************************************
作者：王渝友
时间：2012年2月15日21:00:00
摘要：1、修改活动页面 activity_index.aspx,activity_main.aspx 页面的后台逻辑
      2、修改活动侧栏插件
      3、增加activity_index.aspx,activity_main.aspx 前台页面
更新文件：
	WanerDao2.0\WanerDaoBLL\Common\WanerdaoCommon.cs
	WanerDao2.0\WanerDaoIBLL\ICommon\IWanerDaoCommon.cs
	WanerDao2.0\WanerDaoFactory\Activity\WanerDaoActivityFactory.cs
	WanerDao2.0\WanerDaoFactory\Common\WanerDaoCommonFactory.cs
	WanerDao2.0\WanerDaoWorkDir\DbConfig\SQL\ActivitySQL.xml
	WanerDao2.0\WanerDaoWorkDir\DbConfig\SQL\CommonSQL.xml
	WanerDao2.0\WanerDaoViews\style\layout.css
	WanerDao2.0\WanerDaoViews\style\activity.css
	WanerDao2.0\WanerDaoViews\Scripts\activity\activity_main.js
	WanerDao2.0\WanerDaoViews\Scripts\activity\activity_myhistory_album_view.js
	WanerDao2.0\WanerDaoViews\Scripts\activity\activity_common.js
	WanerDao2.0\WanerDaoViews\Scripts\activity\activity_index.js
	WanerDao2.0\WanerDaoViews\Scripts\Plugin\SideBar\wanerdao2.sidebar.js
	WanerDao2.0\WanerDaoViews\Activity\Activity_myhistory_album_view.aspx
	WanerDao2.0\WanerDaoViews\Activity\Activity_main.aspx
	WanerDao2.0\WanerDaoViews\Activity\Activity_index.aspx



**************************************************************************************************************
作者：王薪杰
时间：2012年2月19日
摘要：
1、添加 style 文件夹用于存放新的css文件，请大家注意切换
2、更新了母版页


**************************************************************************************************************
作者：王渝友
时间：2012年2月15日21:00:00
摘要：修改留言板插件
         (1)所有帖子的回复信息（帖子数据用于分页），回复信息默认显示设定的条数，多余设定的条数异步加载显示/隐藏
         (2)单一个帖子的回复信息(一级回复数据作为分页),下一级回复信息默认显示设定的条数，多余设定的条数异步加载显示/隐藏
更新文件：
WanerDaoFactory\Common\WanerDaoCommonFactory.cs
WanerDaoBLL\Common\WanerdaoCommon.cs
WanerDaoBLL\Activity\WanerDaoActivity.cs
WanerDaoFactory\Activity\WanerDaoActivityFactory.cs
WanerDaoIBLL\ICommon\IWanerDaoCommon.cs
WanerDaoIBLL\IActivity\IWanerDaoActivity.cs
WanerDaoWorkDir\DbConfig\SQL\CommonSQL.xml
WanerDaoWorkDir\DbConfig\SQL\ActivitySQL.xml
WanerDaoViews\Scripts\Plugin\ActivityLeaveMessage\wanerdao2.activityLeaveMessage.js
WanerDaoViews\Scripts\Plugin\ActivityLeaveMessage\wanerdao2.activitySingleLeaveMessage.js
**************************************************************************************************************

作者：徐兵
时间：2012年2月12日20:00
摘要： 所有更改围绕活动
	1、同步了所有最新活动表相关创建的MODLE层的各个.cs文件
	   并且部分MODEL中的字段加入了说明
	2、定义并添加与活动创建的MODLE .cs类文件
		WanerDaoModel/Activity/ActivityCreate/ActivityCreateMain.cs
		WanerDaoModel/Activity/ActivityCreate/activitytags.cs
		WanerDaoModel/Activity/ActivityCreate/budget.cs
		WanerDaoModel/Activity/ActivityCreate/bycarinfo.cs
		WanerDaoModel/Activity/ActivityCreate/groupinvite.cs
		WanerDaoModel/Activity/ActivityCreate/limitcondition.cs
		WanerDaoModel/Activity/ActivityCreate/peopleinvite.cs
		WanerDaoModel/Activity/ActivityCreate/placeset.cs
		WanerDaoModel/Activity/ActivityCreate/plan.cs
		
	3、在框架中加入了事务处理 
		修改位置 WanerDaoDALFactory/WanerDaoDbWrapper.cs
	4、定义了多种活动创建需要的基础表查询，并在活动接口层定义了相应接口
		"getkeyvaluejsonallactivityrole":获取角色ID与名字JSON数据
                "getkeyvaluejsonallsignuptype":获取报名方式ID与名字JSON数据
                "getkeyvaluejsonallvehicletype":交通方式ID和名字 JSON数据
                "getkeyvaluejsonallpaytype":获取付费方式的ID和名字 JSON数据
                "getkeyvaluejsonallcarpooltype":获取所有搭车付费ID和名称 JSON数据
                "getkeyvaluejsonallautobrand":获取所有汽车品牌ID和名称 JSON数据
                "getkeyvaluejsonallautomodelbybrandid":根据品牌ID获取所有汽车型号ID和名称 JSON数据 传入brandid：品牌ID
                "getkeyvaluejsonallautomodel":获取所有汽车型号ID和名称 JSON数据
                "getkeyvaluejsonalljoinconditions":获取所有加入条件ID和名称 JSON数据
	4、定义活动创建业务类型
		"activitycreatepage":活动创建
	5、加入活动创建DEMO及 JSON格式定义说明文档
		WanerDaoViews/PluginDemo/ActivityCreate/ActivityCreate.aspx
		具体参数说明请参见DEMO和说明文档  WanerDaoViews/PluginDemo/ActivityCreate/活动创建JSON.doc
	6、项目中添加了前台JSON对象与JSON格式字符串的转换JS文件
		位置：WanerDaoViews\Scripts\jquery.json-2.3.min.js
	
	7、其他文档更新等“活动创建参数返回、活动报名”完成后一并填写。并再做说明
	
**************************************************************************************************************
作者：杨晓东
时间：2012年2月12日23:28:42
摘要：补充日志共享接口  AddPersonalBlog里面的
**************************************************************************************************************
作者：杨晓东
时间：2012年2月12日1:52:54
摘要：修改多国语言
1 WanerDaoBLL/Person/WanerDaoPersonInfoManager.cs
2 WanerDaoBLL/PersonWanerDaoPersonSecurity.cs
3 WanerDaoBLL/Person/WanerDaoVideoManager.cs
4 WanerDaoBLL/Person/WanerDaoBlogManager.cs
5 WanerDaoBLL/Person/WanerDaoImageManager.cs
6 WanerDaoBLL/Message/WanerDaoMessage.cs
**************************************************************************************************************
作者：徐蓓
时间：2012年2月10日24:00
摘要：增加个人阅读状态实体，增加个人阅读状态业务接口，增加个人阅读状态实现
1 添加个人阅读状态实体WanerDaoModal/Person/PersonalViewRecordModal.cs
2 添加个人阅读状态业务接口WanerDaoIBLL/IPerson/IWanerDaoPersonalViewRecord.cs
3 添加个人阅读状态业务实现WanerDaoBLL/Person/WanerDaoPersonalViewRecord.cs
**************************************************************************************************************
作者：徐蓓
时间：2012年2月10日21:00
摘要：增加杂烩话题业务接口，添加杂烩话题业务实现
1 添加杂烩话题业务接口文件WanerDaoIBLL/IPosts/IWanerDaoTopicCategory.cs
2 添加杂烩话题业务实现文件WanerDaoIBLL/Posts/WanerDaoTopicCategory.cs
**************************************************************************************************************
作者：徐蓓
时间：2012年2月10日21:00
摘要：增加杂烩话题实体，增加杂烩草稿实体，增加杂烩评论实体，增加杂烩关注实体
1 添加杂烩话题实体文件WanerDaoModal/Post/TopicCategoryModal.cs
2 添加杂烩草稿实体文件WanerDaoModal/Post/PersonalPostsDraftModal.cs
3 添加杂烩评论实体文件WanerDaoModal/Post/PostsCommentsModal.cs
4 添加杂烩关注实体文件WanerDaoModal/Post/PersonalPostsFollowModal.cs
**************************************************************************************************************
作者：徐蓓
时间：2012年2月10日22:00
摘要：增加杂烩实体，增加杂烩业务接口，增加杂烩业务实现，增加杂烩SQL文件
1 添加杂烩实体文件WanerDaoModal/Post/PostsModal.cs
2 添加杂烩业务接口文件WanerDaoIBLL/IPosts/IWanerDaoPosts.cs
3 添加杂烩业务实现文件WanerDaoBLL/Posts/WanerDaoPosts.cs
4 添加杂烩SQL文件WanerDaoWorkDir/DbConfig/SQL/PostsSQL.xml
**************************************************************************************************************
作者：王渝友
时间：2012年2月10日21:30
摘要： 1、修改留言板插件（增加用户信息）
更新文件：（1）增加两个查询视图 v_activitycomments，v_activityposts 详见 WanerDao2.0\WanerDaoDocuments\DataBaseScript\view\ v_activitycomments.txt
,v_activityposts.txt
(2)更新 WanerDao2.0\WanerDaoFactory\Common\WanerDaoCommonFactory.cs
    			#region 活动留言板	 
                        case "leavemessage": //所有帖子的回复信息
                          string stTalbeName = "v_activityposts";
                          string stFldname = "id,subject,content,createdate,counter,userlogo,userid,username";
                          string stWhere ="";
                          string stFldSordId ="";
                          string stSort ="";
                          string postTables = "wanerdaoPagination";//映射主表查询sql：如果是全部帖子，映射分页sql（wanerdaoPagination）
                          string stCommentsTable ="activitycomments"; //查询留言回复表的Sql映射 （不同的栏目回复表名称不一样，需要在映射查询Sql中设置）
                          string stPriTbId ="id";//留言板主表主键ID
                          string stSubTbId = "id";//留言板回复表主键ID
                          string stPri_Sub_Id ="active_posts_id";//留言板回复表中字段,关联留言板主表ID，
                          string stCom_Sub_Id ="follow_id";//留言板回复表中字段,关联回复表ID，即回复贴号
                          GetPaginationParams(stTalbeName, stFldname, stWhere, stFldSordId, stSort, ref dic);
                          json = common.WanerDaoLeaveMessage(dic, "all", postTables,stCommentsTable, stPriTbId, stSubTbId, stPri_Sub_Id, stCom_Sub_Id);
                          break;
                        case "leavesinglemessage": //单一个帖子的回复信息
                           postTables = "activitypostsbyid";//映射主表查询sql： 这里是activitypostsbyid
                           stCommentsTable = "activitysinglecomments";
（3）更新WanerDao2.0\WanerDaoWorkDir\DbConfig\SQL\CommonSQL.xml	
                      <!---活动回复表(所有帖子的回复信息)-->
   			 <SQL ID="activitycomments">
    			  SELECT id,follow_id,content,active_posts_id,createdate,userid,username FROM v_activitycomments
    					</SQL>
  			<!---活动回复表(单一个帖子的回复信息)-->
  				<SQL ID="activitysinglecomments">
  					  SELECT  id,follow_id,content,active_posts_id,createdate,userid,username FROM v_activitycomments where active_posts_id=?id
  				</SQL>
  			<!---通过活动主帖表id,获取主帖信息-->
  				<SQL ID="activitypostsbyid">
   					 SELECT id,active_id,active_name,subject,content,createdate,counter,userlogo,userid,username from v_activityposts where id=?id
 				 </SQL>	
**************************************************************************************************************
作者：王渝友
时间：2012年2月10日21:20
摘要： 1、添加个人日志共享到活动留言表中的接口
更新文件：
       （1） WanerDao2.0\WanerDaoIBLL\ICommon\IWanerDaoCommon.cs
			/// <summary>
       			 /// 个人日志共享到活动留言感想表
        		/// </summary>
       			 /// <param name="dic">前台获取数据集合-id:日志表id，active_id:活动id,active_name:活动名,
        		///                     create_id:操作人id,SUBJECT:主题content:内容</param>
        		/// <returns>是否共享成功的提示信息</returns>
         		string personalLogShareToActivity(Dictionary<string, object> dic);
	（2）WanerDao2.0\WanerDaoBLL\Common\WanerdaoCommon.cs
     	       	    /// <summary>
    		    /// 个人日志共享到活动留言感想表
     		   /// </summary>
      		  /// <param name="dic">前台获取数据集合-id:日志表id，active_id:活动id,active_name:活动名,
      		  ///                     create_id:操作人id,SUBJECT:主题content:内容</param>
      		  /// <returns>是否共享成功的提示信息</returns>
        	public string personalLogShareToActivity(Dictionary<string, object> dic)
        （3）WanerDao2.0\WanerDaoFactory\Common\WanerDaoCommonFactory.cs
                  #region 个人日志的感想共享到活动感想表中
                        case "personallogsharetoactivity":
                          json = common.personalLogShareToActivity(dic);
                          break;

                        #endregion
        （4）WanerDao2.0\WanerDaoWorkDir\DbConfig\SQL\ActivitySQL.xml
             <!-- 活动留言，感想表 添加  by 王渝友-->
  			<SQL ID="addActivityposts">
   			 INSERT INTO .activityposts
    			(id,active_id,active_name,create_id,SUBJECT,content,post_date,counter,is_block, active)
   			 VALUES
   			 (?id,?active_id,?active_name,?create_id,?subject,?content,?post_date,?counter,?is_block,?active);
  			</SQL>
  			<!-- 根据id号和活动号查询活动留言，感想表 （个人日志有个共享到活动表的操作，提供id 和活动号） by 王渝友-->
 				 <SQL ID="searchActivitypostsbyIdAndActivityId">
   				 SELECT COUNT(id) FROM  activityposts  WHERE id=?id AND active_id=?active_id
  				</SQL>

**************************************************************************************************************
作者：杨晓东
时间：2012年2月10日0:59:22
摘要：添加照片输入数字排序方法
更新文件：1.WanerDaoBLL\Person\WanerDaoImageManager.cs
         2.WanerDaoIBLL\Person\WanerDaoImageManager.cs
         3.添加存储过程(个人相册-相片输入排序号进行排序)
          p_ImageSortOrderOfInput    WanerDaoDocuments\DataBaseScript\procedure\p_ImageSortOrderOfInput.txt

**************************************************************************************************************
作者：王渝友
时间：2012年2月8日0:30
摘要： 修改留言板方法的一个参数
更新文件：WanerDaoBLL\Common\WanerdaoCommon.cs
 	  WanerDaoIBLL\ICommon\IWanerDaoCommon.cs
          WanerDaoFactory\Common\WanerDaoCommonFactory.cs
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
        /// <param name="SubTbId">留言板回复表主键ID</param>
        /// <param name="Pri_Sub_Id">留言板回复表中的字段,关联主表ID</param>
        /// <param name="Com_Sub_Id">留言板回复表中的字段,关联回复表ID，即回复贴号</param>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据}}</returns>
        string WanerDaoLeaveMessage(Dictionary<string, object> dic,string messagetype,string postTables, string       commentsTable, string PriTbId, string SubTbId, string Pri_Sub_Id, string Com_Sub_Id);



**************************************************************************************************************
作者：王渝友
时间：2012年2月6日20:00
摘要：  活动回复增加单一个帖子的回复信息

1、更新WanerDao2.0\WanerDaoIBLL\ICommon\IWanerDaoCommon.cs
        /// <summary>
        /// 描述：留言板列表
        /// 作者: 王渝友
        /// 时间：2011-11-10
        /// </summary>
        /// <param name="dic"></param>
        ///  <param name="messagetype">回复信息类型：all:全部帖子回复信息，single：单一帖子信息</param>
        /// <param name="commentsTable">映射回复表查询SQL</param>
        /// <param name="PriTbId">留言板主表主键ID</param>
        /// <param name="SubTbId">留言板回复表主键ID</param>
        /// <param name="Pri_Sub_Id">留言板回复表中的字段,关联主表ID</param>
        /// <param name="Com_Sub_Id">留言板回复表中的字段,关联回复表ID，即回复贴号</param>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据}}</returns>
        string WanerDaoLeaveMessage(Dictionary<string, object> dic,string messagetype, string commentsTable, string PriTbId, string SubTbId, string Pri_Sub_Id, string Com_Sub_Id);
2、更新WanerDao2.0\WanerDaoFactory\Common\WanerDaoCommonFactory.cs
       case "leavemessage": //所有帖子的回复信息
				 string stTalbeName = "activityposts";
				 string stFldname ="id,content,post_date";
				 string stWhere ="";
				 string stFldSordId ="";
				 string stSort ="";
				 string stCommentsTable ="activitycomments"; //查询留言回复表的Sql映射 （不同的栏目回复表名称不一样，需要在映射查询Sql中设置）
				 string stPriTbId ="id";//留言板主表主键ID
				 string stSubTbId = "id";//留言板回复表主键ID
				 string stPri_Sub_Id ="active_posts_id";//留言板回复表中字段,关联留言板主表ID，
				 string stCom_Sub_Id ="follow_id";//留言板回复表中字段,关联回复表ID，即回复贴号
				 GetPaginationParams(stTalbeName, stFldname, stWhere, stFldSordId, stSort, ref dic);
				 json = common.WanerDaoLeaveMessage(dic, "all",stCommentsTable, stPriTbId, stSubTbId, stPri_Sub_Id, stCom_Sub_Id);
				 break;
       case "leavesinglemessage": //单一个帖子的回复信息
                               
				  stCommentsTable = "activitysinglecomments"; //查询留言回复表的Sql映射 （不同的栏目回复表名称不一样，需要在映射查询Sql中设置）
				  stPriTbId = "id";//留言板主表主键ID
				  stSubTbId = "id";//留言板回复表主键ID
				  stPri_Sub_Id = "active_posts_id";//留言板回复表中字段,关联留言板主表ID，
				  stCom_Sub_Id = "follow_id";//留言板回复表中字段,关联回复表ID，即回复贴号
				 json = common.WanerDaoLeaveMessage(dic,"singele", stCommentsTable, stPriTbId, stSubTbId, stPri_Sub_Id, stCom_Sub_Id);
				break;
 
 3、更新  WanerDao2.0\WanerDaoBLL\Common\WanerdaoCommon.cs
        /// <summary>
        /// 描述：留言板列表
        /// 作者: 王渝友
        /// 时间：2011-11-10
        /// </summary>
        /// <param name="dic">前台参数集合</param>
        /// <param name="messagetype">回复信息类型：all:全部帖子回复信息，single：单一帖子信息</param>
        /// <param name="commentsTable">映射回复表查询SQL</param>
        /// <param name="PriTbId">留言板主表主键ID</param>
        /// <param name="SubTbId">留言板回复表主键ID</param>
        /// <param name="Pri_Sub_Id">留言板回复表中的字段,关联主表ID</param>
        /// <param name="Com_Sub_Id">留言板回复表中的字段,关联回复表ID，即回复贴号</param>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据}}</returns>
        public string WanerDaoLeaveMessage(Dictionary<string, object> dic, string messagetype, string commentsTable, string PriTbId, string SubTbId, string Pri_Sub_Id, string Com_Sub_Id)
  
  4、新增 WanerDao2.0\WanerDaoViews\Scripts\Plugin\ActivityLeaveMessage\wanerdao2.activitySingleLeaveMessage.js
  5、新增测试demo页面（/单一个帖子的回复信息）：
     WanerDao2.0\WanerDaoViews\PluginDemo\ActivityLeaveMessage\ActivitySingleLeaveMessage.aspx
  6 更新 WanerDao2.0\WanerDaoWorkDir\DbConfig\SQL\CommonSQL.xml
     <!---活动回复表(所有帖子的回复信息)-->
		<SQL ID="activitycomments">
			SELECT id,follow_id,content,active_posts_id FROM activitycomments
		</SQL>
	  <!---活动回复表(单一个帖子的回复信息)-->
	  <SQL ID="activitysinglecomments">
		SELECT id,follow_id,content,active_posts_id FROM activitycomments where active_posts_id=?id
	  </SQL>

**************************************************************************************************************
作者：王渝友
时间：2012年2月6日20:00
摘要： 

      1、 修改活动分类业务逻辑
          更新 WanerDaoFactory\Common\WanerDaoCommonFactory.cs
         case "activitycategorypage":
                            GetPaginationParams("activitysectionpage", "id,section_name as name, logo_path", " and active=1", "sequence", "1", ref dic);
                            json = common.WanerDaoPaginationToImage(dic);
                            break;
      2、 在分页方法中重载：json数据中增加rootimgpath:图片的根路径
          更新 WanerDao2.0\WanerDaoBLL\Common\WanerdaoCommon.cs

 	/// <summary>
        /// 描述：分页函数
        /// 作者:王渝友
        /// 时间：2012-1-18
        /// </summary>
        /// <param name="ds">返回分页后的结果集（结果集中含有图片信息的）</param>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据},rootimgpath:图片的根路径}</returns>
        public string WanerDaoPaginationToImage(DataSet ds)
        {
            string json = string.Empty;
            Dictionary<string, object> result = new Dictionary<string, object>();
            if (ds != null)
            {
                if (ds.Tables.Count > 0 && ds.Tables[0] != null && ds.Tables[1] != null)
                {
                    result.Add("total", ds.Tables[0].Rows[0][0]);
                    result.Add("rows", WanerDaoUtils.DataTableToList(ds.Tables[1]));
                    result.Add("rootimgpath", WannerDaoImageAndFolderManage.GetWebRootImagePath());
                    json = WanerDaoJSON.GetSuccessJson(result);
                }
                else
                {
                    json = WanerDaoJSON.GetErrorJson("无分页信息");
                }
            }
            else
            {
                json = WanerDaoJSON.GetErrorJson("获取分页信息出错！");
            }
            return json;
        }


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
        public string WanerDaoPaginationToImage(Dictionary<string, object> dic)
        {
            return WanerDaoPaginationToImage(WanerDaoPaginationDataSet(dic));
        }
**************************************************************************************************************
作者：王薪杰
时间：2012年1月26日22：45
摘要：1.更新IBll 
	IWanerDaoCommon.cs
	添加
        /// <summary>
        /// 获取当前用户所有自定义权限
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string getAllCustomPermissionForCurUser();

        /// <summary>
        /// 获取自定义权限内容
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string getCustomPermissionById(Dictionary<string, object> dic);

    2.更新Bll，bllFactory
	添加1中接口的实现，与调用
**************************************************************************************************************
作者：王薪杰
时间：2012年1月26日22：45
摘要：1.更新IBll 
添加
        /// <summary>
        /// 添加图片回复
        /// </summary>
        /// <param name="icmodel">图片id（image_id）</param>
        /// <returns></returns>
        string AddImageComments(Dictionary<string, object> dic);

修改 IWanerDaoVideoManager.cs

2.更新BLL
更新WanerDaoImageManager.cs

3.更新Model
修改ImageCommentsModel.cs
VideoCommentsModel.cs

更新属性，为最新数据库字段
  添加默认值
 

**************************************************************************************************************
作者：王薪杰
时间：2012年1月26日22：45
摘要：  
1.更新IBll IWanerDaoVideoManager.cs

2.更新urlconfig/GoURLConfig.xml
添加
	<GotoPath name="login">
		<UrlPath>
			<![CDATA[/account/login.html]]>
		</UrlPath>
	</GotoPath>
	<GotoPath name="index">
		<UrlPath>
			<![CDATA[/index.html]]>
		</UrlPath>
	</GotoPath>

3.更新Model
修改：PersonalVideoModel.cs
添加：PersonalVideoSettingsModel.cs

4.更新Factory
添加：WanerDaoVideoFactory.cs

5.更新BLL  WanerDaoVideoManager.cs

6.更新View web.config
上传 视频全部页面及相关js

7.添加存储过程
P_VideoSort.txt
p_VideoSortByClick.txt
**************************************************************************************************************
作者：王薪杰
时间：2012年1月25日22：45
摘要：  
1.更新了SQL 配置文件 PersonSQL.xml
2.更新
**************************************************************************************************************
作者：王薪杰
时间：2012年1月17日22：45
摘要：  
1.添加工厂类WanerDaoVideoFactory.cs
**************************************************************************************************************
作者：金广亮
时间：2012年1月17日22：45
摘要：  
1、移除WanerDaoWorkDir\PointsConfig文件夹
2、把help.xml从WanerDaoWorkDir\paramConfig移到WanerDaoWorkDir\helpConfig并重新命名为zh-cn.xml
3、修改WanerDaoModule\Config\WanerDaoFilterReader.cs中的/// <summary>
        /// 加载帮助信息
        /// </summary>
        public static  void setXML()
使其可以多语言读取帮助信息
4、添加WanerDaoModule\Utils\WanerDaoUtils.cs关于时间的统一API，以后所有的时间都调用此API，以前对应代码里面的时间请统一修改
/// <summary>
        /// 描述：获取当前时间
        /// 作者：金广亮
        /// 时间：2012-1-17
        /// </summary>
        /// <returns>获取当前时间</returns>
        public static DateTime GetDateTime()
        /// <summary>
        /// 描述：获取格式化的时间字符串
        /// 作者：金广亮
        /// 时间：2012-1-17
        /// </summary>
        /// <param name="formart">符合微软规定的时间字符串格式</param>
        /// <returns>获取格式化的时间字符串</returns>
        public static string GetDateTime(string formart)
        /// <summary>
        /// 描述：获取本地时间
        /// 作者：金广亮
        /// 时间：2012-1-17
        /// </summary>
        /// <returns>获取本地时间</returns>
        public static DateTime GetLocalTime()
        /// <summary>
        /// 描述：获取短日期时间字符串
        /// 作者：金广亮
        /// 时间：2012-1-17
        /// </summary>
        /// <returns>获取短日期时间字符串</returns>
        public static string GetShortDate()
        /// <summary>
        /// 描述：获取长时间时间字符串
        /// 作者：金广亮
        /// 时间：2012-1-17
        /// </summary>
        /// <returns>获取长时间时间字符串</returns>
        public static string GetLongDate()



**************************************************************************************************************
作者：王渝友
时间：2012年1月16日20:00
摘要：  
1、修改WanerDaoCommonFactory 的侧栏插件
   （1）在WanerdaoCommon类中 GetWanerDaoSidebar(Dictionary<string, object> dic)方法中增加下列业务类型	
   		case "friendjoinactivity": //好友参加的活动
                        json = WanerDaoPagination(DbHelperFactory.SingleInstance().GetDataSet("CommonSQL", "myFriendJoinActivity", dic));
                        break;
   		case "newactivity": // 最新创建的活动
                        string strTalbeName = "activity"; 
                        string strFldname = "active_name,begin_datetime,end_datetime,join_member_nbr,max_nbr,title"; //侧栏显示数据的列名
                        string strWhere = "and is_visible=1 and active=1";//查询表的where 条件
                        string strFldSordId = "update_date "; //查询表的排序ID
                        string strSort = "1";
                        json = GetWanerDaoPageParameter(strTalbeName, strFldname, strWhere, strFldSordId, strSort, dic);
                        break;
    	case "interestactivity": //感兴趣的活动
    		      json = WanerDaoPagination(DbHelperFactory.SingleInstance().GetDataSet("CommonSQL", "myInterestActivity", dic));
     （2）增加存储过程p_wanerdaoMyFriendJoinActivity（用于好友参加的活动）、 p_wanerdaoMyInterestActivity（用于感兴趣的活动）
          详见WanerDaoDocuments\DataBaseScript\procedure\p_wanerdaoMyFriendJoinActivity.txt
          详见WanerDaoDocuments\DataBaseScript\procedure\p_wanerdaoMyInterestActivity.txt
	 （3）修改 WanerDao2.0\WanerDaoViews\Scripts\Plugin\SideBar\wanerdao2.sidebar.js
	  (4)修改 WanerDaoViews\PluginDemo\ActivitySideBar\ActivitySideBar.aspx（一期样式demo）
	     增加WanerDao2.0\WanerDaoViews\PluginDemo\ActivitySideBar\SideBarDemo.aspx（二期样式demo）
     （5 修改 WanerDao2.0\WanerDaoWorkDir\DbConfig\SQL\CommonSQL.xml
	     添加SQL 关于侧栏的感兴趣的活动（myInterestActivity）、好友参加的活动（myFriendJoinActivity）
	   

**************************************************************************************************************
作者：王渝友
时间：2012年1月12日20:00
摘要：  
1、修改WanerDaoCommonFactory 业务类型activitycategorypage 中无法获取前台参数的问题。
**************************************************************************************************************
作者：徐兵
时间：2012年1月9日23:00
摘要：  
1、公用
	1、修改文件WanerDao2.0\WanerDaoDALFactory\WanerDaoDbWrapper.cs
		a.增加方法 
			/// <summary>
			/// 描述：返回DataSet格式数据集(根据sql参数反查Dictionary),数据集名字为WanerDao2Ds
			/// 作者:徐兵
			/// 时间：2012-1-5
			/// </summary>
			/// <param name="filename">配置文件名</param>
			/// <param name="sqlKey">脚本ID</param>
			/// <param name="dic">Dictionary</param>
			/// <returns>DataSet格式信息</returns>
			public DataSet GetDataSetBasedOnSql(string filename, string sqlKey, Dictionary<string, object> dic)

			/// <summary>
			/// 描述：返回DataTable(根据sql参数反查Dictionary)
			/// 作者:徐兵
			/// 时间：2012-1-5
			/// </summary>
			/// <param name="filename">配置文件名</param>
			/// <param name="sqlKey">脚本ID</param>
			/// <param name="dic">参数集合</param>
			/// <returns>DataTable</returns>
			public DataTable GetDataTableBasedOnSql(string filename, string sqlKey, Dictionary<string, object> dic)

	
	2、修改文件 WanerDao2.0\WanerDaoModule\Json\WanerDaoJSON.cs 
		a.修改 private static string SerializeObject(Dictionary<string, object> prepareJson) 方法
			增加传入参数为空时的处理
	3、修改文件 WanerDaoModule\Utils\WanerDaoUtils.cs  
		a。增加方法
			/// <summary>
			/// 返回表格首行JSON值
			/// 作者：徐兵
			/// 时间：2012-2-5
			/// </summary>
			/// <param name="dt"></param>
			/// <returns></returns>
			public static string GetJsonFirstRowFromDataTable(DataTable dt)

			/// <summary>
			/// 返回表格首行Dictionary值
			/// 作者：徐兵
			/// 时间：2012-2-5
			/// </summary>
			/// <param name="dt"></param>
			/// <returns></returns>
			public static Dictionary<string, object> GetDicFirstRowFromDataTable(DataTable dt)


2、活动相关
	1、修改活动接口文件WanerDao2.0\WanerDaoIBLL\IActivity\IWanerDaoActivity.cs
		加入以下方法：
			/// <summary>
			/// activity_index页面
			/// </summary>
			/// <param name="dic">包含 id:活动ID</param>
			/// <returns></returns>
			string GetActivityIndexPage(Dictionary<string, object> dic);
			/// <summary>
			/// Activity_define页面
			/// </summary>
			/// <param name="dic">包含 category_id:分类ID</param>
			/// <returns></returns>
			string GetActivityDefineTotalPage(Dictionary<string, object> dic);
	1、修改活动接口文件WanerDao2.0\WanerDaoIBLL\IActivity\IWanerDaoActivity.cs
		加入以下内容：
			case "activitydefinepagesearchactivity"://activitydefinepage页
			case "activitycategorypage":
			case "activitydefinepagesearchactivity"://activitydefinepage页
		修改：
			case "activitycategory":

	2、在 WanerDao2.0\WanerDaoBLL\Activity\WanerDaoActivity.cs 文件中实现上述的各个活动接口及部分公共方法
	3、在 WanerDao2.0\WanerDaoWorkDir\DbConfig\SQL\ActivitySQL.xml 文件中加上活动各个接口访问数据库的SQL。

3、页面对面业务：
	注意：所说的参数都不包括分页的基本参数
	1、activity_index.html
		业务：activityindexpage
		参数：id:活动ID
	2、activity_main.html
		分类业务：activitycategorypage
		参数：无

		活动多条件搜索业务：getactivityimagefolder
		参数：请看考WanerDaoViews/PluginDemo/ActivitySearch/SearchForPagination.aspx DEMO
			WanerDaoViews/PluginDemo/ActivitySearch/SearchForJson.aspx

	3、activity_define_main.html
		相册统计业务：activitydefinetotalpage
		参数：category_id:活动分类ID

		活动查询业务：activitydefinepagesearchactivity
		参数：category_id:活动分类ID

		活动详细业务：searchactivitydetailsinfobyid
		参数：id：活动ID

	4、activity_season_main.html
		相册统计业务：activitydefinetotalpage
		参数：category_id:活动分类ID

		活动查询业务：activitydefinepagesearchactivity
		参数：category_id:活动分类ID

		活动详细业务：searchactivitydetailsinfobyid
		参数：id：活动ID

	4、activity_myhistory_album_view.html
		业务：getactivityimagefolder
		参数：注意，更通用分页参数独立
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


**************************************************************************************************************

**************************************************************************************************************
作者：王渝友
时间：2012年1月9日
摘要：
1.修改了 WanerDaoViews\Scripts\Plugin\Pagination\wanerdao2.pagination.js 分页插件在firefox下不兼容的问题。
*************************************************************************************************************


**************************************************************************************************************
作者：徐兵
时间：2012年1月5日
摘要：
1.修改了相片上传模块，增加了上传相片到新建相册中。之前本来是由调用者实现，现已经在框架中实现了。
	活动的测试可以通过，具体的请查看DEMO
2.更新了活动相册创建方法中参数，之前接收的是Dictionary，用户需要自己构建此Dictionary，并且添加的KEY必须按照要求，
	现在改成接收activityimagefolder MODEL。用户通过activityimagefolder model就很明了该添加的属性值。
3、相片上传中类WannerDaoImageAndFolderManage.cs 中加入了处理上述更新的逻辑。
*************************************************************************************************************
作者：杨晓东
时间：2012年1月5日
摘要：
1.WanerDaoModule\Json\WanerDaoJSON.cs 添加方法        public static string SerializeObject(object modelObject)
2.修改WanerDaoDALFactory\WanerDaoDbWrapper.cs           private DbParameter[] ReflectGeneric(object[] objets)     
                                                        设置属性值添加了CheckIsBool的验证
**************************************************************************************************************
作者：金广亮
时间：2012年1月5日
摘要：
1.更新WanerDaoModule\IO\WanerDaoFileUtils.cs
1.1 新增删除文件删除函数        /// <summary>
        /// 描述：删除文件
        /// 创建者：金广亮
        /// 创建时间：2012-1-5
        /// </summary>
        /// <param name="fileName">文件名</param>
        /// <returns>如果删除成功返回true；否则返回false</returns>
        public static bool DeleteFile(string fileName)
1.2 更新        /// <summary>
        /// 描述：返回文件是否存在
        /// 创建者：金广亮
        /// 创建时间：2011-9-20
        /// </summary>
        /// <param name="filename">文件名</param>
        /// <returns>如果存在返回true；否则返回false</returns>
        public static bool FileExists(string filename)
**************************************************************************************************************
作者：王薪杰
时间：2011年12月28日2:30
摘要：
1.更新WanerDaoIBLL/IWanerDaoPersonInfoManager.cs
新增：
 /// <summary>
        ///     王薪杰
        /// 修改个人基本信息权限
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string UpdatePersonalProfilePermission(Dictionary<string, object> dic);

        /// <summary>
        ///     王薪杰
        /// 是否能被站外搜索
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string UpdateIfCanBeOutManSearch(Dictionary<string, object> dic);

        /// <summary>
        ///     王薪杰
        /// 谁可以给用户发消息
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string UpdateCanMsgToPermission(Dictionary<string, object> dic);

        /// <summary>
        ///     王薪杰
        /// 谁可以向用户发好友申请
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string UpdateCanSendFriendRequestPermission(Dictionary<string, object> dic);
		 /// <summary>
        /// 王薪杰
        /// 修改 当前用户教育权限
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string UpdateEducationPermission(Dictionary<string, object> dic);
		/// <summary>
        /// 王薪杰
        /// 获取当前用户 工作权限
        /// </summary>
        /// <returns></returns>
        string GetWorkPermission();

         /// <summary>
         /// 王薪杰
        /// 修改 当前用户工作权限
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string UpdateWorkPermission(Dictionary<string, object> dic);
		
        /// <summary>
        ///     王薪杰
        /// 修改当前用户兴趣爱好权限
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string UpdateInterestsPermission(Dictionary<string, object> dic);
		/// <summary>
        ///     王薪杰
        /// 修改当前用户联系方式权限
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string UpdateContactPermission(Dictionary<string, object> dic);
2.PersonSQL.xml

<!--隐私设置 王薪杰 添加开始-->
	<SQL ID ="UpdatePersonalProfilePermission">
		update PersonalProfile set permission = ?permission where user_id=?user_id;
	</SQL>
	<SQL ID ="UpdatePersonalContactPermission">
		update personalcontact set permission = ?permission where user_id=?user_id;
	</SQL>
	<SQL ID ="UpdatePersonalInterestsPermission">
		update personalinterests set permission = ?permission where user_id=?user_id;
	</SQL>
	<SQL ID ="UpdatePersonalWorkPermission">
		update personalwork set permission = ?permission where user_id=?user_id;
	</SQL>
	<SQL ID ="UpdatePersonalEducationPermission">
		update personaleducation set permission = ?permission where user_id=?user_id;
	</SQL>
	<SQL ID ="UpdateIfCanBeOutManSearch">
		update PersonalProfile set is_find_me = ?findme where user_id=?user_id;
	</SQL>
	<SQL ID ="UpdateCanMsgToPermission">
		update PersonalProfile set is_msg_me = ?msgme where user_id=?user_id;
	</SQL>
	<SQL ID ="UpdateCanSendFriendRequestPermission">
		update PersonalProfile set friend_request = ?request where user_id=?user_id;
	</SQL>
	<!--隐私设置 王薪杰 结束-->


****************************************************************************************
作者：金广亮
时间：2012年1月2日22：38
摘要：
项目WanerDaoModule
1.更新WanerDaoModule\Config\WanerDaoConfigReader.cs
1.1新增/// <summary>
        /// 描述：读取相对路径下的配置文件
        /// </summary>
        /// <param name="relatePath">相对路径</param>
        /// <param name="fileName">文件名，可以带扩展名也可以不带</param>
        /// <param name="elementname">节点名称</param>
        /// <param name="idname">ID或者其他描述符</param>
        /// <param name="key">ID名称</param>
        /// <returns>成功返回结果，否则返回string.Empty</returns>
        public static string GetConfigXml(string relatePath, string fileName, string elementname, string idname, string key)
1.2新增        /// <summary>
        /// 描述：读取相对路径下的配置文件
        /// </summary>
        /// <param name="relatePath">相对路径</param>
        /// <param name="fileName">文件名，可以带扩展名也可以不带</param>
        /// <param name="elementname">节点名称</param>
        /// <param name="key">ID名称</param>
        /// <returns>成功返回结果，否则返回string.Empty</returns>
        public static string GetConfigXml(string relatePath, string fileName,string elementname, string key)
2.新增Enum文件以及WanerDaoModule\Enum\WanerDaoGlobalEnum.cs
以后全局枚举往这个类里面放
3.新增TipInfo文件以及WanerDaoModule\TipInfo\WanerDaoGlobalTip.cs
3.1/// <summary>
        /// 描述：获取根据浏览器的UserLanguages获取对应地区提示信息
        /// </summary>
        /// <param name="key">配置文件中的KEY名称</param>
        /// <returns>成功返回结果，否则返回string.Empty</returns>
        public static string GetInternationalizationTip(string key)
3.2        /// <summary>
        /// 描述：以JSON格式获取根据浏览器的UserLanguages获取对应地区提示信息
        /// </summary>
        /// <param name="key">配置文件中的KEY名称</param>
        /// <param name="result">成功与否枚举</param>
        /// <returns>以JSON格式返回提示信息</returns>
        public static string GetInternationalizationTip(string key,WanerDaoResultEnum result)
4.从SVN中移除Email与InfoPush文件夹
项目WanerDaoWorkDir
5.重命名TipConfig\zh-cn.xml以及新增en-us.xml全局提示配置文件，以后所有的提示信息都在此处配置
例如：提示信息为'保存成功'，要分别在中文zh-cn.xml和美式英语en-us.xml中写上对应的文本语言
**************************************************************************************************************
作者：徐兵
时间：2012年1月1日20:00
摘要：  
1、公用
	1、修改文件WanerDao2.0\WanerDaoDALFactory\WanerDaoDbWrapper.cs
		a.增加方法 ExecuteNonQueryBasedOnSql<T>(string filename, string sqlKey, T t)
			用于 不带有事物的执行(根据SQL参数反查泛型)
		b.增加方法 public KeyValuePair<string, DbParameter[]> GetNonQueryDBParamBasedOnSql<T>(string filename, string sqlKey, T t)
			用于 获取执行执行参数(根据SQL参数反查泛型)
		c.增加方法 public int ExecuteNonQueryBasedOnSql(string filename, string sqlKey, Dictionary<string, object> dic)
			用于 不带有事物的执行(根据SQL参数反查Dictionary)
		d.增加方法 public KeyValuePair<string, DbParameter[]> GetNonQueryDBParamBasedOnSql(string filename, string sqlKey, Dictionary<string, object> dic)
			用于 获取执行执行参数(根据SQL参数反查Dictionary)
		e.增加方法 public int ExecuteNonQueryForTrans(Dictionary<string, DbParameter[]> dic)
			用于 带有事物的执行（接收多执行语句）
		f.增加方法 private int CommonTransExecuteNonQuery(Dictionary<string,DbParameter[]> Dic)
			用于 带有事物通用执行（同时执行多个自定义组合）
		g.增加方法 private DbParameter[] ReflectGenericBasedOnSql<T>(T t,string sql)
			用于 根据SQL中存储参数及泛型转换为DbParameter[]
		h.增加方法 private DbParameter[] ReflectDictionaryBasedOnSql(Dictionary<string, object> dic,string sql)
			用于 根据SQL中参数转换Dictionary为DbParameter[]
	
	2、修改文件 WanerDao2.0\WanerDaoModule\RegexWrapper\WanerDaoRegex.cs
		a.增加 public static string SqlParams = @"\?\w*"; 
			用于查询SQL语句中参数
		b.增加方法 public static string[] GetSqlParams(string strSql)
			用于 获取SQL中的参数名称（不带问号）
2、增加MODEL
	在WanerDao2.0\WanerDaoModel\Activity\  目录下增加与活动直接关系和简洁关系的model类共41个类（对应41张表）。

3、活动相关
	1、修改活动接口文件WanerDao2.0\WanerDaoIBLL\IActivity\IWanerDaoActivity.cs
		加入以下方法：
			/// 添加活动
			bool AddSimpleActivity(activity activity);
			/// <summary>
			/// 添加活动成员
			bool AddSimpleActivityMember(activitymember activityMember);

			/// <summary>
			/// 添加加入活动条件
			bool AddActivityJoinConditions(activityjoinconditions activityJoinConditions);

			/// <summary>
			/// 添加活动计划
			bool addActivityPlan(activityplan activityPlan);

			/// <summary>
			/// 添加活动多个计划
			bool addActivityPlan(List<activityplan> activityPlan);

			/// <summary>
			/// 添加搭车人
			bool AddAutoCarPool(autocarpool autoCarPool);

			/// 根据角色ID查询角色名称
			string SelectRoleNameById(string id);
			/// <summary>
			/// 根据角色ID查询角色信息
			activityrole SelectActivityRoleById(string id);
			/// <summary>
			/// 查询所有角色信息
			List<activityrole> SelectAllActivityRole(); 

			/// <summary>
			/// 根据报名方式ID查询方式名称
			string SelectSignUpTypeNameById(string id);
			/// <summary>
			/// 根据报名方式ID查询信息
			activitysignuptype SelectSignUpTypeById(string id);
			/// <summary>
			/// 查询所有报名方式信息
			List<activitysignuptype> SelectAllSignUpType();

			/// <summary>
			/// 根据交通方式ID查询交通名称
			string SelectVehicleTypeNameById(string id);
			/// <summary>
			/// 根据交通方式ID查询信息
			activityvehicletype SelectVehicleTypeById(string id);
			/// <summary>
			/// 查询所有交通方式信息
			List<activityvehicletype> SelectAllVehicleType(); 

			/// <summary>
			/// 根据付费方式ID查询付费名称
			string SelectPayTypeNameById(string id);
			/// <summary>
			/// 根据付费方式ID查询信息
			paytype SelectPayTypeById(string id);
			/// <summary>
			/// 查询所有付费方式信息
			List<paytype> SelectAllPayType(); 

			/// <summary>
			/// 根据搭车付费方式ID查询付费名称
			string SelectCarPoolTypeNameById(string id);
			/// <summary>
			/// 根据搭车付费方式ID查询信息
			carpooltype SelectCarPoolTypeById(string id);
			/// <summary>
			/// 查询所有搭车付费方式信息
			List<carpooltype> SelectAllCarPoolType(); 

			/// <summary>
			/// 根据车品牌类型ID查询品牌名称
			string SelectAutoBrandNameById(string id);
			/// <summary>
			/// 根据车品牌类型ID查询信息
			autobrand SelectAutoBrandById(string id);
			/// <summary>
			/// 查询所有车品牌类型信息
			List<autobrand> SelectAllAutoBrand(); 

			/// <summary>
			/// 根据车型号ID查询型号名称
			string SelectAutoModelNameById(string id);
			/// <summary>
			/// 根据车型号ID查询信息
			automodel SelectAutoModelById(string id); 
			/// <summary>
			/// 根据车品牌ID查询所有车型号
			List<automodel> SelectAllAutoModelByBrandId(string id); 
			/// <summary>
			/// 查询所有车型号
			List<automodel> SelectAllAutoModel(); 

			/// <summary>
			/// 查询所有加入条件信息
			string SelectJoinConditionsNameById(string id); 
			/// <summary>
			/// 根据加入条件ID查询信息
			joinconditions SelectJoinConditionsById(string id); 
			/// <summary>
			/// 查询所有加入条件信息
			List<joinconditions> SelectAllJoinConditions();
	2、在 WanerDao2.0\WanerDaoBLL\Activity\WanerDaoActivity.cs 文件中实现上述的各个活动接口及部分公共方法
	3、在 WanerDao2.0\WanerDaoWorkDir\DbConfig\SQL\ActivitySQL.xml 文件中加上活动各个接口访问数据库的SQL。
4、更新相片相册 和本次 活动的相关的接口文档

**************************************************************************************************************
作者：王薪杰
时间：2011年12月28日2:30
摘要：
1.权限公共js:   scripts/common/perimission.js
业务写在commonfactory
**************************************************************************************************************
作者：王薪杰
时间：2011年12月28日2:30
摘要：
1.共享插件：plugin/share/wanerdao2.sharetools.js
	插件css: css/PluginCss/
  demo:plugindemo/share/
  

**************************************************************************************************************
作者：吴志斌
时间：2011年12月26日23:06:00
摘要：
1.增加WanerDaoIBLL\IPerson\IWanerDaoPersonalBookMark.cs 
2.增加WanerDaoIBLL\IPerson\IWanerDaoPersonalNote.cs 
3.增加WanerDaoBLL\Person\WanerDaoPersonalBookMark.cs  
4.增加WanerDaoBLL\Person\WanerDaoPersonalNote.cs 
5.更新WanerDaoWorkDir\DbConfig\SQL\PersonSQL.xml，新增了个人记事本和收藏夹的SQL语句。
6.修正了计算器异常信息中英文显示问题。

**************************************************************************************************************
作者：徐兵
时间：2011年12月23日0:30
摘要：  
1、公用
	a.删除WanerDao2.WanerDaoModule项目队IBLL项目的引用。增加IBLL项目对WanerDao2.WanerDaoModule的引用。
	b.修改文件WanerDaoModule\IO\WanerDaoFileUtils.cs
		增加方法：
			/// 获取当前站点虚拟目录的根路径
			public static string GetSiteUrl_Root()
			/// <summary>
			/// 获取站点的根地址
			public static string GetSiteUrl_ALL()
	c.修改文件WanerDaoModule\Json\WanerDaoJSON.cs
		修改 public static string SerializeObject(bool flg, Dictionary<string, object> prepareJson)，将访问限制private 修改为 public。
	d.修改文件WanerDaoModule\RegexWrapper\WanerDaoRegex.cs
		将 public static string UrlPattern = @"(\w+)=(\w*[\d\/ \d\:]*)";//@"(\w+)=(\w*)";
		修改为 public static string UrlPattern = @"(\w+)=(\w*[\d\/ \d\:,\w]*)";//@"(\w+)=(\w*)";
		增加对URL传参数中值为“,”符号的支持。（此修改在会议上提出过，可以放开。组长说等回来统一考虑，为便于开发，先自行修改了。）

2、上传前台插件修改及后台流程优化
	a.主要修改 王渝友 于2011年12月18日22:20:37 提交的上传插件
		a.修改无需单独建立接受aspx页面接收处理，可以直接传入到工厂业务处理中进行处理。
		b.增加确认上传操作、删除等操作。
		c.定义一些业务处理必备参数。
		d.增加一些生成GUID、回调等JS函数
	b.对上传流程补充及优化
		b.根据上传插件特点，修改后台文件（图片）接收处理。因控件虽然此次同时上传多个文件，但实际是一个接一个的单线程与服务器通宵。
			导致可能同一类上传会每次都查询数据库信息。 先将修改为同一类型上传，只会第一次进行查询。大大减少与数据库的访问。
		c.减少上传控件与服务器的通信次数，只有当用户点击上传和确认两种操作才会与服务器通信，其他的删除等操作无需要与服务器通信。
			JS自行解决。
		d.修改不紧紧支持活动图片上传，而其增加插件及后台对个人相片(图片先可上传，但点击确认后无法保存到个人相片表中，因不熟悉个人相片表结构。个人相册程序员可以加入存储即可完成上传所有操作)的上传,
			并且支持对其他类型图片上传的扩展。
		e.支持用户可以在不确认提交的过程后，在同一页面随意更改相册进行上传操作
		f.支持用户同时开多个页面进行上传。
		g.大大减少上传过程中与数据库交互。去掉点击确认上传操作前所有与数据库的操作。
			只当用户点击确认后，才进行数据库存储。

3、活动
	a.增加了查找当前用户参加的活动分页方法。业务代码：currentuserjoinactivitypage
	b。增加了查找指定用户参加的活动分页方法。业务代码：userjoinactivitypage
4、相片相册：
	a.增加的文件：
		增加了类文件：WanerDaoBLL\Common\WannerDaoImageAndFolderManage.cs，用于集中管理相册和相片。
		增加了类文件：WanerDaoModule\WanerDaoImage\WanerDaoUploadImageResult.cs。用于用户上传图片存储返回信息。
			        /// 图片上传主入口
				public static WanerDaoUploadImageResult MainUploadImageFile(HttpPostedFile httpPosteFile, Dictionary<string, object> dic)
				/// <summary>
				/// 图片文件确认上传
				public static int SubmitUpdateImageActivity(string ids)
				/// <summary>
				/// 插入活动相片逻辑表
				public static bool InsertImageActivity(string id, string create_id, string activity_id, string link_id, string fold_id, string image_name, string image_path, string image_small_path, Double fileSize, int sequence, string description, int is_submit)
				/// <summary>
				/// 插入图片物理存储表
				public static bool InsertImagePythicalLocation(string id, string image_path, string image_small_path, Double fileSize, string user_id)
				/// <summary>
				/// 删除物理相片存储表
				/// </summary>
				public static bool DeleteImagePythicalLocation(string id)
				/// <summary>
				/// 删除活动相片
				public static bool DeleteActivityImage(string imageId)
				/// <summary>
				/// 获取物理相片链接数
				public static int? GetImagePythicalLinkCount(string id)
				/// <summary>
				/// 增加物理图片1个链接数
				public static bool AddOneImagePythicalLink(string id)
				/// <summary>
				/// 减少物理图片1个链接数
				public static bool ReduceOneImagePythicalLink(string id)
				/// <summary>
				/// 增加物理图片指定链接数
				public static bool AddImagePythicalLink(string id, int number)
				/// <summary>
				/// 根据相片ID获取相片信息
				public static DataTable GetActivityImageById(string id)
				/// <summary>
				/// 根据相册ID获取相册信息
				public static DataTable GetActivityImageForlderById(string id)
				/// <summary>
				/// 获取物理相片表数据 根据ID
				public static DataTable GetImagePythicalLocationById(string id)
				/// <summary>
				/// 删除文件
				private static bool DeleteFile(string filePath)
				private static bool DeleteFile(string[] filePaths)
				/// <summary>
				/// 文件存储
				private static bool SaveFile(HttpPostedFile httpPosteFile, String fileSavePath, string fileName)
				 /// <summary>
				/// 获取WEB根目录地址
				public static string GetWebRootImagePath()
				/// <summary>
				/// 获取服务器根目录地址
				public static string GetServerRootImagePath()
				/// <summary>
				/// 获取相片文件存储相对目录
				public static string GetInnerPathByImageType(string useridOrActivityid, string imageFolderid, ImageType imageType)
				/// <summary>
				/// 从Dictionary中获取键值，并且删除键
				public static string GetAndRemoveValue(string key, Dictionary<string, object> dic)
	b.修改文件WanerDaoFactory\Common\WanerDaoCommonFactory.cs；
		增加或者修改业务处理：
			"getactivityimagefolder"://存储过程查询活动相册 可用于分页
			"getactivityimagebyfoldid"://根据相册ID查询相片
			"getactivityimagebyfoldidforpage"://根据相册ID查询相片 分页
			"getactivityimagebycreateid"://根据创建人ID查询相片
			"getactivityimagebyuseridforpage"://根据创建人ID查询相片 分页
			"getactivityimagebyid"://根据相册ID查询相片 分页
			"uploadimagefile"://上传图片 包括个人相册、活动相册
			"submituploadimagefile"://确认相片上传
		只给出了先已经与前台应用的业务代码。其他部分与前台数据通信需要前台提出，然后再此加入业务。
	b.修改文件WanerDaoIBLL\ICommon\IWanerDaoCommon.cs；
		增加或者修改业务处理接口，并在WanerDaoBLL\Common\WanerdaoCommon.cs实现相应方法：
			/// 描述：相片分页函数
			string WanerDaoSearchImagePagination(Dictionary<string, object> dic);
			/// <summary>
			/// 描述 根据创建人查询相片 
			string WanerDaoSearchImageByUserId(Dictionary<string, object> dic);
			/// <summary>
			/// 描述 根据相册ID查询相片
			string WanerDaoSearchImageByFolderId(Dictionary<string, object> dic);
			/// <summary>
			/// 描述 根据相片ID查询相片
			string WanerDaoGetImageById(Dictionary<string, object> dic);

			/// 描述 上传相片（可上传活动图片、个人相片）
			WanerDaoUploadImageResult WanerDaoUploadImageFile(HttpPostedFile postedImageFile, Dictionary<string, object> dic);
			/// <summary>
			/// 描述 确认上传
			string WanerDaoSubmitUploadImageFiles(string imageIds);
			/// <summary>
			/// 创建活动相册
			bool WanerDaoCreateActivityImageFolder(Dictionary<string, object> dic);
			/// <summary>
			/// 修改活动相册
			bool WanerDaoUpdateActivityImageFolder(Dictionary<string, object> dic);
			/// <summary>
			/// 屏蔽相册
			bool WanerDaoBlockActivityImageFolder(string id);
			/// <summary>
			/// 恢复屏蔽相册
			bool WanerDaoRestoreBlockActivityImageFolder(string id);
			/// <summary>
			/// 分享别人的相册(同时分享相片)
			bool WanerDaoShareActivityImageFolder(string id);
			/// <summary>
			/// 分享别人的相册下所有相片到指定相册下面（会自动增加物理连接数）
			bool WanerDaoShareActivityImageFolder(string oldId,string newId);
			/// <summary>
			/// 删除相册
			bool WanerDaoDeleteActivityImageFolder(string id);


			/// <summary>
			/// 屏蔽相片
			bool WanerDaoBlockActivityImage(string id);
			/// <summary>
			/// 恢复屏蔽相片
			bool WanerDaoRestoreBlockActivityImage(string id);
			/// <summary>
			/// 删除相片（会自动减少物理连接数和判断是否删除文件）
			bool WanerDaoDeleteActivityImage(string id); 


*******************************************************
作者：王渝友
时间：2011年12月18日22:20:37
摘要：
1.增加了相册前台页面：
WanerDaoViews\PluginDemo\ActivityAlbum\ActivityAlbumPreview.aspx
WanerDaoViews\PluginDemo\ActivityAlbum\ActivityPhotoPreview.aspx  
WanerDaoViews\PluginDemo\ActivityAlbum\ActivityPhotoView.aspx
WanerDaoViews\PluginDemo\ActivityAlbum\thumbnail.aspx
WanerDaoViews\PluginDemo\ActivityAlbum\upload.aspx
WanerDaoViews\PluginDemo\ActivityAlbum\ActivityPhotoUpload.aspx
WanerDaoViews\Scripts\Plugin\Ablum\activityalbumpreview.js
WanerDaoViews\Scripts\Plugin\Ablum\activityphotopreview.js
WanerDaoViews\Scripts\Plugin\Ablum\activityphotoUpload.js
WanerDaoViews\Scripts\Plugin\Ablum\activityphotoview.js
WanerDaoViews\Scripts\Plugin\Ablum\handlers.js   
WanerDaoViews\Scripts\Plugin\Ablum\swfupload.js  
WanerDaoViews\Scripts\Plugin\Ablum\swfupload.queue.js
WanerDaoViews\Scripts\Plugin\Ablum\swfupload.swf
WanerDaoViews\css\PluginCss\Album\home.css
WanerDaoViews\images\PluginImages\Album\*

*******************************************************
作者：杨晓东
时间：2011年12月17日0:31:48
摘要：  创建了一个获取guid的函数
        CREATE DEFINER = `root`@`localhost` FUNCTION `GetGuid`()
        RETURNS varchar(40)
        BEGIN
        DECLARE id VARCHAR(40);
        SET id=(SELECT Replace(uuid(),'-',''));
        return id;
        END;

*******************************************************

作者：杨晓东
时间：2011年12月12日22:20:37
摘要：
1.修改存储过程   p_GetInboxInviteList.txt    
                p_GetInvitRubbishList.txt
                p_GetSendInvitList.txt
                p_getMsgRubbishList.txt
*******************************************************
作者：杨晓东
时间：2011年12月8日23:37:36
摘要：
1.添加存储过程   p_GetDetailedMessage    站内信,查看消息详情

*******************************************************
作者：徐蓓
时间：2011年12月8日22:42:00
摘要：
1 WanerDaoIBLL/IPerson/IWanerDaoPersonalCalendar.cs增加接口
string CreateSimplePersonalCalendar(PersonalCalendarModal modal);
string UpdateSimplePersonalCalendar(PersonalCalendarModal modal);
2 WanerDaoBLL/Person/WanerDaoPersonalCalendar.cs增加接口实现函数
public string CreateSimplePersonalCalendar(PersonalCalendarModal modal)
public string UpdateSimplePersonalCalendar(PersonalCalendarModal modal)
3 WanerDaoPluginService/IService/IPerson/IPersonalCalendar.cs增加接口
string CreateSimplePersonalCalendar(PersonalCalendarModal modal);
string UpdateSimplePersonalCalendar(PersonalCalendarModal modal);
4 WanerDaoPluginService/Service/Person/PersonalCalendar.cs增加接口实现
public string CreateSimplePersonalCalendar(PersonalCalendarModal modal);
public string UpdateSimplePersonalCalendar(PersonalCalendarModal modal);
5 WanerDaoPluginService/Plugin增加插件fullcalendar

*******************************************************
作者：王渝友
时间：2011年12月7日23:35:00
摘要：
1.增加WanerDaoViews\PluginDemo\ActivityAlbum\ActivityAlbumPreview.aspx 
2.增加WanerDaoViews\PluginDemo\ActivityAlbum\ActivityPhotoPreview.aspx 
3.增加WanerDaoViews\PluginDemo\ActivityAlbum\ActivityPhotoView.aspx 
4.增加WanerDaoViews\PluginDemo\ActivityAlbum\ActivityPhotoUpload.aspx
5.增加WanerDaoViews\images\PluginImages\Album\*
6.增加WanerDaoViews\Scripts\Plugin\Ablum\*

*******************************************************

作者：王薪杰
时间：2011年12月6日
摘要：
1.在wanerdaoutils.js添加
/*        编码 特殊字符*/
String.prototype.escapeSpecialchar = function () {
    return this.replace(/\'/g, ':apos').replace(/\"/g,':quot');
}

/*	解码特殊字符*/
String.prototype.descapeSpecialchar = function () {
    return this.replace(':apos', '\'').replace(':quot', '\"');
}

2.在WanerdaoModule-》string ->WanerDaoString.cs添加了字符串扩展方法 解码特殊字符  DescapeSpecialchar 
public static string DescapeSpecialchar(this string str){
    return str.Replace(":apos", "\'").Replace(":quot", "\"");
}

*******************************************************
作者：杨晓东
时间：2011年12月6日0:53:28
摘要：
1.添加存储过程 p_GetInboxInviteList
2.添加存储过程 p_GetInvitRubbishList
3.添加存储过程 p_getMsgRubbishList
4.添加存储过程 p_GetSendInvitList
5.修改存储过程 p_GetSendInvitList
6.修改存储过程 p_GetSendInvitList

*******************************************************
作者：吴志斌
时间：2011年12月5日20:35:00
摘要：
1.更新WanerDaoBLL\Tool\WanerDaoToolManager.cs 中的接口实现
2.在WanerDaoIBLL\ITool\IWanerDaoToolManager.cs 新增查询接口
3.在WanerDaoPlugInManager\Calculate中新增计算器插件功能类

*******************************************************
作者：吴志斌
时间：2011年12月5日0:14:00
摘要：
1.在设计文档\详细设计\I 接口\I0002 功能接口.xls 增加应用工具接口说明

*******************************************************
作者：王渝友
时间：2011年12月4日23:35:00
摘要：
1.更新WanerDaoBLLFactory\Common\WanerDaoCommonFactory.cs 中的留言板插件参数
2.更新WanerDao2.0\WanerDaoWorkDir\DbConfig\SQL\CommonSQL.xml中留言板回复查询字段
3.更新WanerDaoViews\Scripts\Plugin\LeavMessage\wanerdao2.sidebar.js 侧栏插件参数
*******************************************************

*******************************************************
作者：王渝友
时间：2011年12月4日19:14:00
摘要：
1.更新WanerDaoBLLFactory\Common\WanerDaoCommonFactory.cs 中的侧栏插件参数
2.更新 WanerDao2.WanerDaoBLL.Common\WanerdaoCommon.cs 中的侧栏插件参数
3。更新WanerDaoViews\Scripts\Plugin\SideBar\wanerdao2.sidebar.js 侧栏插件参数
*******************************************************
作者：徐蓓
时间：2011年12月4日13:13:19
摘要：
1.在WanerDaoModel/Person添加个人日历实体PersonalCalendarModal.cs
*******************************************************
作者：王渝友
时间：2011年12月3日0:14:00
摘要：
1.在设计文档\详细设计\I 接口\I0002 功能接口.xls 增加侧栏和留言板接口说明

*******************************************************
作者：徐蓓
时间：2011年12月1日23:01:19
摘要：
1.在WanerDaoIBLL/IPerson添加个人日历接口IWanerDaoPersonalCalendar.cs
2.在WanerDaoBLL/Person里添加个人日历实现WanerDaoPersonalCalendar.cs
*******************************************************
作者：王薪杰
时间：2011年11月30日1:49:19
摘要：
1.添加上传头像插件upload-avatar.js，站内信好友和圈子联想插件fgautocompelte.js
*******************************************************
作者：杨晓东
时间：2011年11月28日0:36:19
摘要：
1.修改存储过程p_GetUserFirends
2.修改PersonSQL  ID="Regeist"  添加向friendsclass默认插入数据
*******************************************************
作者:徐兵
时间:2011年11月27日23:00:00
摘要:
1、更新了存储过程p_wanerdaosearchactivityimagefolder
2、补充并修改了相册相片处理相关的业务处理逻辑（只做修改，没有加入方法或者文件）。
	主要集中在WanerDaoFactory\Common\WanerDaoCommonFactory.cs和WanerDaoIBLL\ICommon\IWanerDaoCommon.cs两个文件。
3、补充完现在相册相片处理业务方法与前台调用说明。
4、加入WanerDaoDocuments\ActivityGroupTempFile文件夹用来活动组内部沟通临时文件存储，并放入了部分沟通文件
*******************************************************
作者:金广亮
时间:2011年11月27日16:54:00
摘要:
1.更新WanDaoMySqlDAL\MySqlDALHelper.cs里面的SQL语句中的单引号转义问题
        public string SqlSafe(string value)
        {
            value = value.Replace("'", "\'");
            // value = value.Replace("%", "'%");
            return value;
        }
2.更新WanerDaoBLLFactory\Common\WanerDaoCommonFactory.cs文件中的demo业务处理，里面包含单引号
3.更新WanerDaoBLL\Common\WanerdaoCommon.cs，新增        /// <summary>
        /// 描述：分页结果集
        /// 作者:金广亮
        /// 时间：2011-11-27
        /// </summary>
        /// <param name="dic">里面包含这些元素：
        /// tablename 表名;fldName 查询字段，如果是多个字段请用英文的“,”分隔;where WHERE条件(不用传入WHERE关键字,可为空);
        /// fldSortId 排序条件(不用传入ORDER BY关键字,可为空);sort 0升序 1倒序;pagecurrent 当前页码;pageSize 每页记录数
        /// </param>
        /// <returns>分页后的结果集(总行数total：ds.Tables[0].Rows[0][0]；rows:{查询的数据}ds.Tables[1])</returns>
        public DataSet WanerDaoPaginationDataSet(Dictionary<string, object> dic)
以及        /// <summary>
        /// 描述：分页函数
        /// 作者:金广亮
        /// 时间：2011-11-27
        /// </summary>
        /// <param name="ds">返回分页后的结果集</param>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据}}</returns>
        public string WanerDaoPagination(DataSet ds)
*******************************************************
作者:徐兵
时间:2011年11月26日21:00:00
摘要:
1、更新WanerDaoFactory\Common\WanerDaoCommonFactory.cs。 
	a.加入相册多种查询
        /// </summary>
        /// <param name="dic">里面包含这些元素: 
        /// p_searchType:查询类型 1*：查询个人相册(11:单个人相册，12：多个人)；
        ///                       2*：根据活动查询相册（21：个人相册+活动相册+好友相册，22：个人相册类型，23：活动相册类型，24：好友相册类型，25：活动的所有相册）
        /// p_userIds:#用户ID,可以多个用英文逗号分隔
        /// activityIds:活动名ID
        /// isSearchBlock:是否显示屏蔽相册 1：是 0：否 2:只显示被屏蔽的
        /// orderByFileds:排序字段，请填返回名称中的一个或者多个，用英文逗号分隔
        /// sort:0升序 1倒序
        /// pagecurrent:当前页
        /// pageSize:每页记录数
	b.加入根据相册ID查询相片，（分页和非分页两种）
	c.根据创建人ID查询相片，（分页和非分页两种）

2、更新WanerDaoIBLL\ICommon\IWanerDaoCommon.cs。 
	加入：a.加入相册多种查询  b.加入根据相册ID查询相片，（分页和非分页两种）   c.根据创建人ID查询相片，（分页和非分页两种）
3、更新WanerDaoIBLL\ICommon\IWanerDaoCommon.cs。 
	加入：a.加入相册多种查询  b.加入根据相册ID查询相片，（分页和非分页两种）   
	      c.根据创建人ID查询相片，（分页和非分页两种）
	      d.组织相片相册JSON返回方法
	      e.相片分页函数WanerDaoSearchImagePagination

4、更新WanerDaoFactory\Common\WanerDaoCommonFactory.cs。加入方法private string GetImageRootPath() 获得相片网页根目录地址

5、更新WanerDaoWorkDir\WanerDaoConfig.xml。加入相片网页根目录地址

6、更新WanerDaoWorkDir\DbConfig\WanerDaoDbConfig.xml。
	加入相册查询、根据相册ID获取相片、根据创建人获取相片sql

7、加入相册多种业务查询存储过程p_wanerdaosearchactivityimagefolder


*******************************************************
作者：金广亮
时间：2011年11月26日0:07:32
摘要：
1.更新WanerDaoModule\Validation\WanerDaoValidation.cs，完善传递参数时候有&符号不能正确解析问题
1.1参数传递时候遇到特殊符合尽量使用实体转义字符表里面的字符
2.新增文件“实体转义字符表.doc”

*******************************************************
作者：杨晓东
时间：2011年11月25日1:32:32
摘要：
1.添加存储过程  p_GetUserFirends   详情(WanerDao2.0\WanerDaoDocuments\DataBaseScript\procedure\p_GetUserFirends.txt)

*******************************************************
作者：杨晓东
时间：2011年11月24日1:15:47
摘要：
1.添加存储过程p_SendInviteMsg  (站内消息,发送邀请) 和  p_SavaSysDrafMsg (站内消息,发送消息系统自动保存).
2.WanerDaoWorkDir\DbConfig\SQL  添加  MessageSQL.xml(站内消息)
3.添加  WanerDaoIBLL\IMessage\IWanerDaoMessage.cs 接口类
4.添加  WanerDaoBLL\Message\WanerDaoMessage.cs 类

*******************************************************
作者：金广亮
时间：2011年11月23日23:16:26
摘要：
1.更新WanerDaoDALFactory\WanerDaoDbWrapper.cs。完善SQL日志功能。记录每一步的SQL操作以及异常操作。
*******************************************************
作者:徐兵
时间:2011年11月23日00:15:26
摘要:
1、更新WanerDaoFactory\Common\WanerDaoCommonFactory.cs。 加入相册、相片分页查询业务处理
2、更新WanerDaoFactory\Common\WanerDaoCommonFactory.cs。加入方法GetAndRemoveValue(string key,Dictionary<string,object> dic)。  用于从Dictionary中获取键值，并且删除键。防止业务数据也用到构建SQL中去。

*******************************************************
作者:杨晓东
时间:2011年11月20日1:27:26
摘要:
1.表draftmessage添加id为索引 UNIQUE
-- ----------------------------
-- Table structure for `draftmessage`
-- ----------------------------
DROP TABLE IF EXISTS `draftmessage`;
ALTER TABLE `draftmessage` (
  `id` varchar(40) NOT NULL,
  `sort_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(40) DEFAULT NULL,
  `send_id` varchar(40) DEFAULT NULL,
  `send_username` varchar(60) DEFAULT NULL,
  `send_email` varchar(60) DEFAULT NULL,
  `subject` varchar(60) DEFAULT NULL,
  `content` varchar(2000) DEFAULT NULL,
  `draft_date` datetime DEFAULT NULL,
  `is_system` tinyint(1) DEFAULT NULL,
  `is_msg` tinyint(1) DEFAULT NULL,
  `is_mark` tinyint(1) DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT NULL,
  `is_delete` tinyint(1) DEFAULT NULL,
  `delete_date` datetime DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`sort_id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='草稿信息';



*******************************************************
作者：王薪杰
时间:2011/11/19
摘要：
1.业务Type维护文档.xls添加了修改密码相关type,找回密码重设并登录type
2.账号编辑页面全部修改完毕，提交

*******************************************************
作者:徐蓓
时间:2011年11月18日00:00:00
摘要:
添加插件框架项目WanerDaoPluginService，具体调用服务的demo写在页面Demo.aspx中。
*******************************************************
作者：金广亮
时间：2011-11-14
摘要：
1.注释掉WanerDaoBLLFactory\Activity\WanerDaoActivityFactory.cs里面所有代码(徐兵存放格式不正确)
2.<add name="wanerdao_activity" path="*_activity.axd"，存放不正确，我说过插件应该使用*_common.axd，而不是另起炉灶
3.创建存储过程p_wanerdaoareabyid用来根据国家ID，省州ID，市ID获取地区信息
4.创建活动分类插件并存放到demo文件里面
5.创建活动景点插件并存放到demo文件里面
6.更新业务Type维护文档.xls
7.在WanerDaoViews项目PluginDemo文件里创建ActivityCategory(活动分类demo，以后要重写)与activitysight(活动景点)DEMO
8.更新WanerDaoWorkDir\DbConfig\SQL\CommonSQL.xml
9.新创建WanerDaoWorkDir\TipConfig(以后为多语言版本适配)\InfoConfig.xml并创建期XSD\InfoConfig.xsd约束
10.根据最新PDM，生成脚本wanerdao220111114.sql，请更新各自数据库
11.WanerDaoBLL\Common\WanerdaoCommon.cs新增4个方法可以通过页面以及后台程序调用分别如下：
        /// <summary>
        /// 描述：英文状态的地区信息
        /// 作者：金广亮
        /// 时间：2011-11-13
        /// </summary>
        /// <param name="cid">国家ID</param>
        /// <param name="sid">州ID</param>
        /// <param name="id">市ID</param>
        /// <returns>JSON格式的数据{result:false or true,country:{id:'222',name:'xxx'},state:{id:'',name:''},city:{id:'',name:''}}</returns>
        string WanerDaoAreaEn(string cid,string sid,string id);

        /// <summary>
        /// 描述：英文状态的地区信息
        /// 作者：金广亮
        /// 时间：2011-11-13
        /// </summary>
        /// <param name="dic">cid:国家ID,sid:州ID,id:市ID</param>
        /// <returns>JSON格式的数据{result:false or true,country:{id:'222',name:'xxx'},state:{id:'',name:''},city:{id:'',name:''}}</returns>
        string WanerDaoAreaEn(Dictionary<string, object> dic);
        /// <summary>
        /// 描述：中文状态的地区信息
        /// 作者：金广亮
        /// 时间：2011-11-13
        /// </summary>
        /// <param name="cid">国家ID</param>
        /// <param name="sid">州ID</param>
        /// <param name="id">市ID</param>
        /// <returns>JSON格式的数据{result:false or true,country:{id:'222',name:'xxx'},state:{id:'',name:''},city:{id:'',name:''}}</returns>
        string WanerDaoAreaCn(string cid, string sid, string id);

        /// <summary>
        /// 描述：中文状态的地区信息
        /// 作者：金广亮
        /// 时间：2011-11-13
        /// </summary>
        /// <param name="dic">cid:国家ID,sid:州ID,id:市ID</param>
        /// <returns>JSON格式的数据{result:false or true,country:{id:'222',name:'xxx'},state:{id:'',name:''},city:{id:'',name:''}}</returns>
        string WanerDaoAreaCn(Dictionary<string, object> dic);
*******************************************************
作者：王渝友
时间：2011-11-15
摘要：
1、在 WanerDao2.WanerDaoModule.Validation 增加了一个Object转换为int类型的方法，方法名是ConvertToInt（）
2、更新了侧栏的说明文档，地址为：wanerdaoViews/PluginDemo_/ActivitySideBar/*
3、上传了留言板插件的功能 demo页面为：wanerdaoViews/PluginDemo_/ctivityLeaveMessage/ActivityLeaveMessage.aspx
4、 svn 新增内容：wanerdaoViews/PluginDemo_/ctivityLeaveMessage/ActivityLeaveMessage.aspx
                 wanerdaoViews/PluginDemo_/ctivityLeaveMessage/留言板插件说明使用手册.txt
				 wanerdaoViews/wanerdaoViews/PluginImages/leavemessage/*
				 wanerdaoViews/css/PluginCss/LeaveMessage/leaveMessage.css
				 wanerdaoViews/Scripts/Plugin/ActivityLeaveMessage/wanerdao2.activityLeaveMessage.js
				 WanerDaoDocuments/Demo/LeaveMessage/说明.txt
   svn更新内容：  wanerdaoViews/PluginDemo_/ActivitySideBar/*
			     WanerDaoBLLFactory/Common/WanerDaoCommonFactory.cs
                 WanerDaoIBLL/ICommon/IWanerDaoCommon.cs
				 WanerDaoModule/Validation/WanerDaoValidation.cs
=======作者：徐兵
时间：2011-11-13
摘要：
1、添加活动搜索显示页面\WanerDaoViews\Activity\Activity_search.aspx.

2、添加活动搜索及分页插件DEMO，位置WanerDaoViews\PluginDemo\ActivitySearch下，请常见其下的 活动查询.txt 文档内容。

3、修改了WanerDaoViews的web.config文件：
	修改活动处理配置为：<add verb="*" path="*_activity.axd" validate="false" type="WanerDao2.WanerDaoBLLFactory.Activity.WanerDaoActivityFactory,WanerDaoBLLFactory" />
	添加活动处理配置：<add name="wanerdao_activity" path="*_activity.axd" verb="*" type="WanerDao2.WanerDaoBLLFactory.Activity.WanerDaoActivityFactory" resourceType="Unspecified" requireAccess="Script" preCondition="integratedMode" />

>>>>>>> .theirs4、修改WanerDaoModule\Json\WanerDaoJSON.cs 类中方法private static string SerializeObject(Dictionary<string, object> prepareJson)下所有 new JProperty(d.Key, d.Value)为new JProperty(d.Key, d.Value.ToString())
	原因：当从数据库获取时间类型经过此JProperty处理后，时间变为非时间格式了（/Date(1318208400000+0800)/）

5、创建了数据库方法f_wanerdaoformatqueryregexp（格式化正则表达式查询）、存储过程p_wanerdaosearcactivity（活动复杂查找）

6、添加活动处理类文件WanerDaoBLLFactory\Activity\WanerDaoActivityFactory.cs

7、添加业务处理类文件WanerDaoBLL\Activity\WanerDaoActivity.cs

8、在WanerDaoCommonFactory.cs 添加了活动搜索控件处理业务类型 searchactivitybymanycondition

*******************************************************
作者：王薪杰
时间：2011-11-12
摘要：
1.新添加了一个首页，
2.添加了personal->index.js


*******************************************************
作者：金广亮
时间：2011-11-12
摘要：
1.在WanerDaoDocuments新增文件夹FrameWorkSpecification，在此
文件夹里面新建文件“框架文字结构.doc”，所有程序都应该看
2.在ProgramStructure文件夹里面新增“P0001 系统架构设计.vsd”，
“P0002 系统详细设计.vsd”，“P0003 内网服务器结构图.docx”，
“P0004 外网服务器结构图.docx”，“P0014 页面设计规范(CSS,HTML).doc”
3.重新整合readme文件夹
4.更新分页demo，允许自定义添加查询条件，并更新其操作说明
*******************************************************

作者:胥鑫
时间:2011年11月11日23:16:11
摘要:
1.添加WanerDaoWorkDir\Integral\IntegralConfig.xml  (经验积分数配置文件)
2.添加WanerDaoComponent\WanerDaoExperience.cs (经验积分接口)


作者:徐兵
时间:2011年11月11日12:16:11
摘要:
1、添加了活动查找组件相应的代码、JS、存取过程和FUNCTION
2、DEMO放入WanerDaoDocuments\Demo\WanerDao2.0(activitySearchDemo).rar

具体如下：

WanerDao2.WanerDaoModule.RegexWapper.WanerDaoRegex
修改：徐兵 @2011-10-23
原内容：public static string UrlPattern = @"(\w+)=(\w*[\d\/ \d\:]*)";//@"(\w+)=(\w*)";
修改为：public static string UrlPattern = @"(\w+)=(\w*[\d\/ \d\:,\w]*)";//@"(\w+)=(\w*)";
说明：URL参数中需要用到“,”符号分隔内容


\WanerDaoModule\Json\WanerDaoJSON.cs
private static string SerializeObject(Dictionary<string, object> prepareJson)
将查询的时间格式化了 如/Date(1318208400000+0800)/，，，需要确认后再决定修改。

需要修改wanerdao2.pagination.js扩展查询方式
将url: 'pagination_common.axd'公开出来defaults.ajax.url,让用户自定义
修改 options = $.extend({}, defaults, opts); 为 options = $.extend( true,{}, defaults, opts);
用于深度复制。可以让用户自定义参数、使用默认值允许用户可以不用某个参数。


注意：以上修改并未更新到最新到服务器版本中。需要确认后在确认。但在提供的DEMO中是都修改好了的。



加入存储过程：活动查找p_wanerdaosearcactivity
-- --------------------------------------------------------------------------------
-- Routine DDL
-- Note: comments before and after the routine body will not be stored by the server
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `p_wanerdaosearcactivity`(
  
  IN p_tableNames VARCHAR(1024),
	/*表名*/    
	IN p_fieldNames VARCHAR(1024),
	/*查询字段*/    
  IN p_userId VARCHAR(1024),
	/*用户ID：过滤掉用户已经参与了的活动，为空表示不过滤*/  
	IN p_activityNames VARCHAR(128),
    /*活动名字串，用“,”分隔*/
  IN p_catygoryNames VARCHAR(128),
    /*类型名字，用“,”分隔*/
	IN p_friendsName VARCHAR(128),
    /*分类名字串，用“,”分隔*/
	IN p_groupNames VARCHAR(128),
    /*圈子名字串，用“,”分隔*/
	IN p_sightNames VARCHAR(128),
    /*景点名字串，用“,”分隔*/
	IN p_countryIds VARCHAR(128),
    /*国家*/
	IN p_provinceIds VARCHAR(128),
    /*省份*/
	IN p_cityIds VARCHAR(128),
    /*城市*/ 
  IN p_ortherWhereSql VARCHAR(128),
    /*其他自定义查询条件，开头不要带where、and */ 
  IN p_fieldSortId VARCHAR(128),
	/*排序字段(不用传入ORDER BY关键字,可为空)*/
	IN p_sort int(2),
	/*0升序 1倒序*/
	IN p_pagecurrent int(8),
	/*当前页*/
	IN p_pageSize  int(8)
	/*每页记录数*/
    
    
	/*OUT total INT ,输出记录总数*/
    
)
    COMMENT '活动查找'
BEGIN
	  /*定义变量*/
	  DECLARE i_beginSize INT ; 
    DECLARE v_limitSql VARCHAR(64) default '';
    declare v_orderSql varchar(128) default '';
    declare v_whereSql varchar(4096) default '';
    
    if p_tableNames='' then
        set p_tableNames='activity';
    end if;
    /*	确保索引正确1	*/
		IF p_pageSize <1 THEN
            SET p_pageSize =100 ;
		END IF ;

		IF p_pagecurrent < 1 THEN
            SET p_pagecurrent = 1 ;
		END IF ;
            SET i_beginSize =(p_pagecurrent - 1)* p_pageSize ;
		SET v_limitSql = CONCAT(
			' LIMIT ',
			i_beginSize,
			', ',
			p_pageSize
		);
        
		IF p_fieldSortId <> '' THEN
            SET v_orderSql = CONCAT(' order by ', p_fieldSortId);
            IF p_sort THEN

            SET v_orderSql = CONCAT(v_orderSql, ' desc ');
            ELSE
            SET v_orderSql = CONCAT(v_orderSql, ' asc ');
            END IF ;
    end if;
     
    set v_whereSql=' where 1=1 '; 
    if p_userId<>'' then
       set v_whereSql= CONCAT( v_whereSql,' and not exists( ', 
                            'select * from ActivityMember where ',
                            'ActivityMember.active_id=activity.id  ',
                            'and ActivityMember.user_id =''',
                            p_userId,
                        ''') ');
    end if;
    
    if p_cityIds<>'' then
        set v_whereSql=CONCAT(v_whereSql, f_wanerdaoformatqueryregexp('city_id',p_cityIds)); 
    elseif p_provinceIds<>'' then
        set v_whereSql=CONCAT(v_whereSql, f_wanerdaoformatqueryregexp('province_id',p_provinceIds)); 
    elseif p_countryIds<>'' then        
        set v_whereSql=CONCAT(v_whereSql, f_wanerdaoformatqueryregexp('country_id',p_countryIds)); 
    end if;
    
    if p_activityNames<>'' then        
        set v_whereSql=CONCAT(v_whereSql, f_wanerdaoformatqueryregexp('active_name',p_activityNames)); 
    end if;    
    
    if p_sightNames<>'' then
        set v_whereSql=CONCAT(v_whereSql, f_wanerdaoformatqueryregexp('sight_name',p_sightNames)); 
    end if;
    
    if p_catygoryNames<>'' then
        set v_whereSql= CONCAT( v_whereSql,' and exists( ',
                                'select * from ActivityCategory where ',
                                'ActivityCategory.activity_id=activity.id ',
                                f_wanerdaoformatqueryregexp('ActivityCategory.category_name',p_catygoryNames),
                            ') ');
    end if;
    if p_friendsName<>'' then
        set v_whereSql= CONCAT( v_whereSql,' and exists( ',
                                'select * from ActivityMember,PersonalProfile where ',
                                'ActivityMember.user_id=PersonalProfile.user_id  ',
                                'and ActivityMember.active_id= activity.id ',
                                f_wanerdaoformatqueryregexp('PersonalProfile.name',p_friendsName),
                            ') ');
    end if;
    
    if p_groupNames<>'' then
         set v_whereSql= CONCAT( v_whereSql,' and exists( ',
                                'select * from GroupInfo where ',
                                'GroupInfo.id=activity.create_id ',
                                'and Activity.create_type_id=1 ',
                                f_wanerdaoformatqueryregexp('GroupInfo.group_name',p_groupNames),
                            ') ');
    end if;
    if p_ortherWhereSql<>'' then
        set v_whereSql=CONCAT(v_whereSql, ' and ',p_ortherWhereSql); 
    end if;    
    
		SET @COUNT_STRING = CONCAT(
			'SELECT COUNT(1) INTO @ROWS_TOTAL FROM ',
      p_tableNames,
      ' ',
			v_whereSql
		);
		SET @MAIN_STRING = CONCAT(
			'SELECT ',
			p_fieldNames,
			' FROM ',
      p_tableNames,
      ' ',
			v_whereSql,
			' ',
			v_orderSql,
      ' ',
			v_limitSql
		); 
    /*预处理 */
		PREPARE count_stmt
		FROM
			@COUNT_STRING ; EXECUTE count_stmt ; DEALLOCATE PREPARE count_stmt ;
		  SELECT @ROWS_TOTAL as ToTal;  
    PREPARE main_stmt
		FROM
			@MAIN_STRING ; EXECUTE main_stmt ; DEALLOCATE PREPARE main_stmt ;
    
END


加入如下数据库的FUNCTION:`f_wanerdaoformatqueryregexp`——格式化正则表达式查询

-- --------------------------------------------------------------------------------
-- Routine DDL
-- Note: comments before and after the routine body will not be stored by the server
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE DEFINER=`root`@`localhost` FUNCTION `f_wanerdaoformatqueryregexp`(
    fieldName varchar(32), /* 字段名*/
    p_conditions varchar(256)) RETURNS varchar(512) CHARSET utf8
    COMMENT '格式化正则表达式查询'
begin
    set p_conditions= replace(trim(',' from trim(replace(replace(p_conditions,'|',''),',,',','))),',','|');
    if p_conditions<>'' then
            return CONCAT(' and ',fieldName,' regexp ''',p_conditions,''''); 
    else
        return '';
    end if;
end



添加测试数据
INSERT INTO `activity` (`id`,`sort_id`,`active_name`,`active_link`,`datetime`,`original_id`,`create_id`,`create_type_id`,`title`,`description`,`create_email`,`create_phone`,`activity_score`,`max_nbr`,`join_member_nbr`,`sight_id`,`sight_name`,`address`,`country_id`,`province_id`,`city_id`,`zip`,`begin_datetime`,`end_datetime`,`report_datetime`,`report_type_id`,`report_pass`,`pay_type_id`,`pay_method`,`prepay_nbr`,`prepay_reason`,`is_kick_protected`,`kick_protected_duration`,`is_balance`,`balance_date`,`balance_type`,`is_public`,`schedule_type`,`counter`,`update_date`,`active`) VALUES ('111114',3,'活动4',NULL,NULL,NULL,'111111',1,NULL,'描述12',NULL,NULL,NULL,NULL,3,NULL,NULL,'address1',NULL,NULL,NULL,NULL,'2011-10-01 09:00:00','2011-10-10 09:00:00','2011-09-01 09:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1);
INSERT INTO `activity` (`id`,`sort_id`,`active_name`,`active_link`,`datetime`,`original_id`,`create_id`,`create_type_id`,`title`,`description`,`create_email`,`create_phone`,`activity_score`,`max_nbr`,`join_member_nbr`,`sight_id`,`sight_name`,`address`,`country_id`,`province_id`,`city_id`,`zip`,`begin_datetime`,`end_datetime`,`report_datetime`,`report_type_id`,`report_pass`,`pay_type_id`,`pay_method`,`prepay_nbr`,`prepay_reason`,`is_kick_protected`,`kick_protected_duration`,`is_balance`,`balance_date`,`balance_type`,`is_public`,`schedule_type`,`counter`,`update_date`,`active`) VALUES ('111115',4,'活动5',NULL,NULL,NULL,'111112',1,NULL,'描述13',NULL,NULL,NULL,NULL,4,NULL,NULL,'address12',NULL,NULL,NULL,NULL,'2011-10-01 09:00:00','2011-10-10 09:00:00','2011-09-01 09:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1);
INSERT INTO `activity` (`id`,`sort_id`,`active_name`,`active_link`,`datetime`,`original_id`,`create_id`,`create_type_id`,`title`,`description`,`create_email`,`create_phone`,`activity_score`,`max_nbr`,`join_member_nbr`,`sight_id`,`sight_name`,`address`,`country_id`,`province_id`,`city_id`,`zip`,`begin_datetime`,`end_datetime`,`report_datetime`,`report_type_id`,`report_pass`,`pay_type_id`,`pay_method`,`prepay_nbr`,`prepay_reason`,`is_kick_protected`,`kick_protected_duration`,`is_balance`,`balance_date`,`balance_type`,`is_public`,`schedule_type`,`counter`,`update_date`,`active`) VALUES ('111116',5,'活动6',NULL,NULL,NULL,'111113',1,NULL,'描述14',NULL,NULL,NULL,NULL,5,NULL,NULL,'address13',NULL,NULL,NULL,NULL,'2011-10-01 09:00:00','2011-10-10 09:00:00','2011-09-01 09:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1);
INSERT INTO `activity` (`id`,`sort_id`,`active_name`,`active_link`,`datetime`,`original_id`,`create_id`,`create_type_id`,`title`,`description`,`create_email`,`create_phone`,`activity_score`,`max_nbr`,`join_member_nbr`,`sight_id`,`sight_name`,`address`,`country_id`,`province_id`,`city_id`,`zip`,`begin_datetime`,`end_datetime`,`report_datetime`,`report_type_id`,`report_pass`,`pay_type_id`,`pay_method`,`prepay_nbr`,`prepay_reason`,`is_kick_protected`,`kick_protected_duration`,`is_balance`,`balance_date`,`balance_type`,`is_public`,`schedule_type`,`counter`,`update_date`,`active`) VALUES ('111111',12,'活动1',NULL,NULL,'111111',NULL,0,NULL,'描述15',NULL,NULL,NULL,NULL,6,NULL,'景点1','address14',NULL,NULL,NULL,NULL,'2011-10-01 09:00:00','2011-10-10 09:00:00','2011-09-01 09:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1);
INSERT INTO `activity` (`id`,`sort_id`,`active_name`,`active_link`,`datetime`,`original_id`,`create_id`,`create_type_id`,`title`,`description`,`create_email`,`create_phone`,`activity_score`,`max_nbr`,`join_member_nbr`,`sight_id`,`sight_name`,`address`,`country_id`,`province_id`,`city_id`,`zip`,`begin_datetime`,`end_datetime`,`report_datetime`,`report_type_id`,`report_pass`,`pay_type_id`,`pay_method`,`prepay_nbr`,`prepay_reason`,`is_kick_protected`,`kick_protected_duration`,`is_balance`,`balance_date`,`balance_type`,`is_public`,`schedule_type`,`counter`,`update_date`,`active`) VALUES ('111112',23,'活动2',NULL,NULL,'111112',NULL,0,NULL,'描述16',NULL,NULL,NULL,NULL,7,NULL,'景点2','address15',NULL,NULL,NULL,NULL,'2011-10-01 09:00:00','2011-10-10 09:00:00','2011-09-01 09:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1);
INSERT INTO `activity` (`id`,`sort_id`,`active_name`,`active_link`,`datetime`,`original_id`,`create_id`,`create_type_id`,`title`,`description`,`create_email`,`create_phone`,`activity_score`,`max_nbr`,`join_member_nbr`,`sight_id`,`sight_name`,`address`,`country_id`,`province_id`,`city_id`,`zip`,`begin_datetime`,`end_datetime`,`report_datetime`,`report_type_id`,`report_pass`,`pay_type_id`,`pay_method`,`prepay_nbr`,`prepay_reason`,`is_kick_protected`,`kick_protected_duration`,`is_balance`,`balance_date`,`balance_type`,`is_public`,`schedule_type`,`counter`,`update_date`,`active`) VALUES ('111113',34,'活动3',NULL,NULL,'111113',NULL,0,NULL,'描述17',NULL,NULL,NULL,NULL,8,NULL,'景点3','address16',NULL,NULL,NULL,NULL,'2011-10-01 09:00:00','2011-10-10 09:00:00','2011-09-01 09:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1);
INSERT INTO `activity` (`id`,`sort_id`,`active_name`,`active_link`,`datetime`,`original_id`,`create_id`,`create_type_id`,`title`,`description`,`create_email`,`create_phone`,`activity_score`,`max_nbr`,`join_member_nbr`,`sight_id`,`sight_name`,`address`,`country_id`,`province_id`,`city_id`,`zip`,`begin_datetime`,`end_datetime`,`report_datetime`,`report_type_id`,`report_pass`,`pay_type_id`,`pay_method`,`prepay_nbr`,`prepay_reason`,`is_kick_protected`,`kick_protected_duration`,`is_balance`,`balance_date`,`balance_type`,`is_public`,`schedule_type`,`counter`,`update_date`,`active`) VALUES ('111117',35,'活动7',NULL,NULL,NULL,NULL,NULL,NULL,'描述18',NULL,NULL,NULL,NULL,9,NULL,NULL,'address17',NULL,NULL,NULL,NULL,'2011-10-01 09:00:00','2011-10-10 09:00:00','2011-09-01 09:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1);

INSERT INTO `groupinfo` (`id`,`sort_id`,`create_id`,`create_date`,`category_id`,`group_name`,`member_nbr`,`group_account`,`summary`,`description`,`activity_score`,`website`,`logo_path`,`templogo_path`,`manage_type_id`,`democracy_rate`,`public_duration`,`vote_pass_rate`,`join_method_id`,`join_fee`,`fee_unit`,`transfer_account`,`transfer_description`,`is_kick_protected`,`kick_protected_duration`,`is_public`,`update_date`,`active`) VALUES ('111111',1,'111111',NULL,NULL,'fuwai',NULL,NULL,NULL,NULL,NULL,NULL,'../content/images/avatar.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1);
INSERT INTO `groupinfo` (`id`,`sort_id`,`create_id`,`create_date`,`category_id`,`group_name`,`member_nbr`,`group_account`,`summary`,`description`,`activity_score`,`website`,`logo_path`,`templogo_path`,`manage_type_id`,`democracy_rate`,`public_duration`,`vote_pass_rate`,`join_method_id`,`join_fee`,`fee_unit`,`transfer_account`,`transfer_description`,`is_kick_protected`,`kick_protected_duration`,`is_public`,`update_date`,`active`) VALUES ('111112',2,'111112',NULL,NULL,'shilei',NULL,NULL,NULL,NULL,NULL,NULL,'../content/images/avatar.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1);
INSERT INTO `groupinfo` (`id`,`sort_id`,`create_id`,`create_date`,`category_id`,`group_name`,`member_nbr`,`group_account`,`summary`,`description`,`activity_score`,`website`,`logo_path`,`templogo_path`,`manage_type_id`,`democracy_rate`,`public_duration`,`vote_pass_rate`,`join_method_id`,`join_fee`,`fee_unit`,`transfer_account`,`transfer_description`,`is_kick_protected`,`kick_protected_duration`,`is_public`,`update_date`,`active`) VALUES ('111113',3,'111113',NULL,NULL,'shuishang',NULL,NULL,NULL,NULL,NULL,NULL,'../content/images/avatar.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1);

INSERT INTO `activitymember` (`id`,`sort_id`,`active_id`,`user_id`,`role_id`,`vehicle_type_id`,`is_auto`,`is_need_carpool`,`is_permit_carpool`,`carpool_type_id`,`carpool_money`,`auto_brand_id`,`auto_model_id`,`auto_year`,`auto_plate`,`carpool_nbr`,`current_carpool_nbr`,`address`,`country_id`,`state_id`,`city_id`,`zip`,`distance`,`phone`,`email`,`pay_status`,`is_authorized`,`report_date`,`join_date`,`like_nbr`,`dislike_nbr`,`soso_nbr`,`active`) VALUES ('111111',111111,'111111','111111',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1);
INSERT INTO `activitymember` (`id`,`sort_id`,`active_id`,`user_id`,`role_id`,`vehicle_type_id`,`is_auto`,`is_need_carpool`,`is_permit_carpool`,`carpool_type_id`,`carpool_money`,`auto_brand_id`,`auto_model_id`,`auto_year`,`auto_plate`,`carpool_nbr`,`current_carpool_nbr`,`address`,`country_id`,`state_id`,`city_id`,`zip`,`distance`,`phone`,`email`,`pay_status`,`is_authorized`,`report_date`,`join_date`,`like_nbr`,`dislike_nbr`,`soso_nbr`,`active`) VALUES ('111112',111112,'111112','111112',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1);
INSERT INTO `activitymember` (`id`,`sort_id`,`active_id`,`user_id`,`role_id`,`vehicle_type_id`,`is_auto`,`is_need_carpool`,`is_permit_carpool`,`carpool_type_id`,`carpool_money`,`auto_brand_id`,`auto_model_id`,`auto_year`,`auto_plate`,`carpool_nbr`,`current_carpool_nbr`,`address`,`country_id`,`state_id`,`city_id`,`zip`,`distance`,`phone`,`email`,`pay_status`,`is_authorized`,`report_date`,`join_date`,`like_nbr`,`dislike_nbr`,`soso_nbr`,`active`) VALUES ('111113',111113,'111113','111113',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1);

INSERT INTO `activityjoinconditions` (`id`,`activity_id`,`activity_name`,`condition_id`,`condition_name`,`value`,`update_date`,`active`) VALUES ('111111','111111','huodong1','111111',11,'有钱',NULL,1);
INSERT INTO `activityjoinconditions` (`id`,`activity_id`,`activity_name`,`condition_id`,`condition_name`,`value`,`update_date`,`active`) VALUES ('111112','111112','活动2','111112',22,'有人',NULL,1);

INSERT INTO `personalprofile` (`user_id`,`sort_id`,`is_online`,`name`,`english_name`,`gender`,`logo_path`,`logo_small_path`,`upload_datetime`,`experience`,`integrity_score`,`activity_score`,`follow_score`,`credit_score`,`gold`,`share_score`,`birthday_year`,`birthday_month`,`birthday_day`,`constellation`,`use_experience`,`current_address`,`current_distinct_id`,`current_zip`,`current_country_id`,`current_state_id`,`current_city_id`,`birth_district`,`birth_country_id`,`birth_state_id`,`birth_city_id`,`is_msg_me`,`friend_request`,`is_find_me`,`permission`,`update_date`,`active`) VALUES ('111111',1,NULL,'xubing',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1);
INSERT INTO `personalprofile` (`user_id`,`sort_id`,`is_online`,`name`,`english_name`,`gender`,`logo_path`,`logo_small_path`,`upload_datetime`,`experience`,`integrity_score`,`activity_score`,`follow_score`,`credit_score`,`gold`,`share_score`,`birthday_year`,`birthday_month`,`birthday_day`,`constellation`,`use_experience`,`current_address`,`current_distinct_id`,`current_zip`,`current_country_id`,`current_state_id`,`current_city_id`,`birth_district`,`birth_country_id`,`birth_state_id`,`birth_city_id`,`is_msg_me`,`friend_request`,`is_find_me`,`permission`,`update_date`,`active`) VALUES ('111112',2,NULL,'wangyuyou',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1);
INSERT INTO `personalprofile` (`user_id`,`sort_id`,`is_online`,`name`,`english_name`,`gender`,`logo_path`,`logo_small_path`,`upload_datetime`,`experience`,`integrity_score`,`activity_score`,`follow_score`,`credit_score`,`gold`,`share_score`,`birthday_year`,`birthday_month`,`birthday_day`,`constellation`,`use_experience`,`current_address`,`current_distinct_id`,`current_zip`,`current_country_id`,`current_state_id`,`current_city_id`,`birth_district`,`birth_country_id`,`birth_state_id`,`birth_city_id`,`is_msg_me`,`friend_request`,`is_find_me`,`permission`,`update_date`,`active`) VALUES ('111113',3,NULL,'jiguangliang',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1);



配置好上述后运行WanerDaoViews\Activity\ActivitySearchDemo下页面或者WanerDaoViews\Activity\Activity_search.aspx 即可看到效果

下面为组件及说明：
引用WanerDaoViews\Scripts\activity\wanerdaosearchactivity.js查询JS组件

页面加入如下示例代码
function searchactivity() {
            wanerdaosearchactivity.searchactivity({
                url: 'search_activity.axd',
                success: createpagedata,
                param: {
                    pagecurrent: 1, //当前页
                    opertype: "searchactivitytype", //业务处理类别
                    pageSize: '3', //页码数
                    activityNames: $("#txt_activityNames").val(), //活动名字串，用“,”分隔
                    catygoryNames: $("#txt_categoryNames").val(), //分类名字串，用“,”分隔
                    friendsName: $("#txt_friendsName").val(), //朋友名字串，用“,”分隔
                    groupNames: $("#txt_groupNames").val(), //圈子名字串，用“,”分隔
                    sightNames: $("#txt_sightNames").val(), //景点名字串，用“,”分隔
                    countryId: "", //国家
                    provinceId: "", //省份
                    cityId: ""//城市
                }
            });
        }


*******************************************************
作者:杨晓东
时间:2011年11月10日21:16:09
摘要:
1.添加Mysql函数GetFullCountryByid  (根据国家州城市id获取对应全名称)

参数:      homecountry varchar(150), homestate varchar(150), homecity varchar(150)

返回类型:  varchar(100)

类型:      FUNCTION

定义: 
           BEGIN
           DECLARE home1 varchar(50);
           DECLARE home2 varchar(50);
           DECLARE home3 varchar(50);
           set home1=(select country_name_en from country where country_id=homecountry);
           SET home2=(
           SELECT state_name_en from state where  state_id=homestate);
           set home3=(SELECT city_name_en  from city where  city_id=homecity);
           return  CONCAT(home1,' ',home2,' ',home3);
           END

*******************************************************

作者：金广亮
时间：2011-11-07
更新列表
1.重新规划了Readme文件夹
2.更新“业务Type维护文档.xls”和“jquery插件描述文档.xls”文件添加对应业务描述
3.新增圈子与好友选择
3.1 新增"WanerDaoViews\PluginDemo\SearchFriend"好友搜索demo页面
3.2	新增"WanerDaoViews\PluginDemo\SearchGroup"圈子搜索demo页面
3.3 新增"WanerDaoViews\Scripts\Plugin\SearchFriend\wanerdao2.searchfriend.js"好友搜索jquery插件
3.4 新增"WanerDaoViews\Scripts\Plugin\SearchGroup\wanerdao2.searchgroup.js"好友搜索jquery插件
4.在"WanerDaoIBLL\ICommon\IWanerDaoCommon.cs"新增好友与圈子搜索接口
/// <summary>
        /// 圈子搜索
        /// </summary>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据(id:'',group_name:'')}</returns>
        string WanerDaoSearchGroup();
        /// <summary>
        /// 好友搜索
        /// </summary>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据(user_id:'',name:'')}}</returns>
        string WanerDaoSearchFriend();

*******************************************************

作者:王薪杰
时间:2011年11月6日11:12:52
摘要: 1.修改WanerDaoDbWrapper.cs
2.修改了WanerDaoString.cs

 public static string RemoveQuotation(string data)
        {
            //return data.Replace("\"", "").Replace("'", "").Trim();
            return data.Trim("\'\"".ToCharArray());
        }
		修改为只移除俩头得引号，解决移除所有引号后，前台无法传递json对象到后台

*******************************************************

作者:杨晓东
时间:2011年11月5日11:12:52
摘要: 1.修改WanerDaoDbWrapper.cs   840行为 dbParameters[i].DbType = getDbType(pis[i].GetValue(t,null).GetType().ToString().ToLower());
2. 添加私有方法CheckIsBool(object o)
3. 修改getDbType方法
        private DbType getDbType(string dbtype)
        {
            DbType str = default(DbType);
            switch (dbtype)
            {
                case "system.string":
                    str = DbType.String;
                    break;
                case "system.boolean":
                    str = DbType.Boolean;
                    break;
                case "system.int32":
                    str = DbType.Int32;
                    break;
            }
            return str;
        }

作者：金广亮
时间：2011-11-05
更新列表：
1.添加CommonSQL.xml地区查询SQL
2.添加IWanerDaoCommon.cs里面的地区接口
3.添加WanerDaoCommon.cs里面的地区接口实现
4.添加WanerDaoCommonFactory.cs里面的地区工厂实现
5.归拢第三方JQUERY开源插件到Scripts\OpenProjectPlugin文件夹下，以后添加任何第三方JQUERY插件请把插件放到OpenProjectPlugin文件夹下
6.css\PluginCss\Area\boxy.css弹出层样式及地区样式
7.images\PluginImages(插件使用图片存放路径，创建各自对应的插件文件夹)\Area(地区)\弹出层及地区插件所用到的图片
8.Plugin(插件js存放目录)\Area(地区js存放目录)\wanerdao2.area.js
9.查看地区插件请到PluginDemo\Area文件夹下任意一个页面
10.Demo\地区插件添加AreaDemo.rar和说明.txt
11.修正分页插件算法，当数据总数为0时分页不正确问题
*******************************************************
作者：王渝友
时间：2011年11月04日
摘要：单独分离侧栏js和增加侧栏控件说明手册至WanerDaoDocuments
1、更新: WanerDaoViews\PluginDemo\Pagination\PaginationDemo.aspx
2、添加: WanerDaoViews\Scripts\common\wanerdaosidebar.js
3、添加: WanerDaoDocuments\Demo\侧栏控件
*******************************************************
 作者：金广亮
时间：2011-11-02
更新列表
1.重新生成数据库脚本位置WanerDao2.0\WanerDaoDocuments\DataBaseScript\wanerdao220111102.sql
请重新生成数据库
 作者：王薪杰
时间：2011年11月01日
内容：
WanerdaoViews下
1.script->common->wanerdaoutils.js
添加方法
equals(obj,,equalsOjb)比较两个对象的值是否完全相等

*******************************************************
作者：王渝友
时间：2011年11月01日20:16:01
摘要：
1. 添加 WanerDaoViews\PluginDemo\ActivitySideBar.aspx（活动侧栏 demo）

测试sql
/*Data for the table `activity` */

insert  into `activity`(`id`,`sort_id`,`active_name`,`active_link`,`datetime`,`original_id`,`create_id`,`create_type_id`,`title`,`description`,`create_email`,`create_phone`,`activity_score`,`max_nbr`,`join_member_nbr`,`sight_id`,`sight_name`,`address`,`country_id`,`province_id`,`city_id`,`zip`,`begin_datetime`,`end_datetime`,`report_datetime`,`report_type_id`,`report_pass`,`pay_type_id`,`pay_method`,`prepay_nbr`,`prepay_reason`,`is_kick_protected`,`kick_protected_duration`,`is_balance`,`balance_date`,`balance_type`,`is_public`,`schedule_type`,`counter`,`active`) values ('1',1,'滑雪',NULL,'2012-01-01 00:00:00',NULL,NULL,NULL,'滑雪',NULL,NULL,NULL,12,118,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2011-11-30 00:00:00','2012-01-29 00:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1),('2',2,'苏州园林',NULL,NULL,NULL,NULL,NULL,'苏州园林',NULL,NULL,NULL,80,800,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2011-12-12 00:00:00','2011-11-30 00:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1),('3',3,'四川九寨沟',NULL,NULL,NULL,NULL,NULL,'四川九寨沟',NULL,NULL,NULL,89,12,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2011-12-19 00:00:00','2011-12-29 00:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1),('4',4,'光棍节',NULL,NULL,NULL,NULL,NULL,'光棍节',NULL,NULL,NULL,52,123,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2011-11-08 00:00:00','2012-03-30 00:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1),('5',5,'圣诞节',NULL,NULL,NULL,NULL,NULL,'圣诞节',NULL,NULL,NULL,30,54,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2011-11-18 00:00:00','2012-01-13 00:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1),('6',6,'圣诞节',NULL,NULL,NULL,NULL,NULL,'圣诞节',NULL,NULL,NULL,10,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2011-11-19 00:00:00','2011-12-30 00:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1),('7',7,'公路自行车',NULL,NULL,NULL,NULL,NULL,'公路自行车',NULL,NULL,NULL,20,20,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2011-11-23 00:00:00','2012-01-20 00:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1),('8',8,'太湖湿地',NULL,NULL,NULL,NULL,NULL,'太湖湿地',NULL,NULL,NULL,136,120,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2011-12-02 00:00:00','2012-11-23 00:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1),('9',9,'相亲会',NULL,NULL,NULL,NULL,NULL,'相亲会',NULL,NULL,NULL,98,43,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2011-11-18 00:00:00','2011-11-23 00:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1),('10',10,'义工敬老院',NULL,NULL,NULL,NULL,NULL,'义工敬老院',NULL,NULL,NULL,428,34,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2011-11-08 00:00:00','2011-11-30 00:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1),('11',11,'足球赛',NULL,NULL,NULL,NULL,NULL,'足球赛',NULL,NULL,NULL,189,100,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2011-11-12 00:00:00','2012-02-02 00:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1),('12',12,'烧烤',NULL,NULL,NULL,NULL,NULL,'烧烤',NULL,NULL,NULL,100,123,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2011-11-18 00:00:00','2012-02-02 00:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1),('12',13,'羽毛球赛',NULL,NULL,NULL,NULL,NULL,'羽毛球赛',NULL,NULL,NULL,65,543,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2011-11-23 00:00:00','2012-01-02 00:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1),('14',14,'音乐会',NULL,NULL,NULL,NULL,NULL,'音乐会',NULL,NULL,NULL,78,654,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2011-11-27 00:00:00','2012-01-02 00:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1),('15',15,'数码团购',NULL,NULL,NULL,NULL,NULL,'数码团购',NULL,NULL,NULL,80,120,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2011-12-03 00:00:00','2012-01-28 00:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1),('16',16,'苏州一日游',NULL,NULL,NULL,NULL,NULL,'苏州一日游',NULL,NULL,NULL,88,48,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2011-12-09 00:00:00','2012-01-31 00:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1),('17',17,'上海一日游',NULL,NULL,NULL,NULL,NULL,'上海一日游',NULL,NULL,NULL,100,200,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2011-12-10 00:00:00','2012-02-02 00:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1),('18',18,'音乐会',NULL,NULL,NULL,NULL,NULL,'音乐会',NULL,NULL,NULL,80,38,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2012-01-13 00:00:00','2012-05-23 00:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1);

		
2.添加WanerDaoViews\images\activity\titleBg.jpg
3.添加WanerDaoViews\css\PluginCss\ActivitySideBar\activitysidebar.css （活动侧栏 样式）
4.更新 WanerDaoViews\Scripts\Plugin\Pagination\wanerdao2.pagination.js，增加是否显示页码属性
5.更新 WanerDaoFactory\Common\WanerDaoCommonFactory.cs 新增操作类型：activitysidebar（活动侧栏）

作者：王薪杰
时间：2011年11月01日
内容：
WanerdaoViews下
1.上传了修改后的登录插件wanerdaologin.js


*******************************************************

作者：王薪杰
时间：2011/10/31
内容：
WanerdaoViews下
1.上传了半完成登录jquery插件(美工没做完),script->person->wanerdaologin.js
2.修改了文件夹名称PersonInfo为Personal ，上传了Personal_Edit.aspx

*******************************************************

作者：王薪杰
时间：2011/10/30
内容：
1.我把文件重命名了，如果更新报错，WanerDaoViews - > PersonSecurity -> 文件不存在，或者什么,
请果断删除本地的，重新更新，正常请省略

*******************************************************
作者：王薪杰
时间：2011/10/29
内容：
1.BLL -> WanerDaoPersonSecurity.cs -> ValidateQuestion 方法 ->
 修改json = WanerDaoJSON.GetSuccessJson("问题回答错误"); 
 为	 json = WanerDaoJSON.GetErrorJson("问题回答错误");
2.IBLL -> IWanerDaoPersonSecurity -> 添加方法 FindAccGetSecurtyEmail ，该法已实现，只是没写到接口
3.BLL -> WanerDaoPersonSecurity.cs -> FindAccGetSecurtyEmail 方法 ->
修改:return HttpContext.Current.Session["findAccountEmail"].ToString();
为： return WanerDaoJSON.GetSuccessJson(HttpContext.Current.Session["findAccountEmail"].ToString());
4.修改了母版页WanerDaoMasterPage.master 添加了jquery1.4.1的引用

*******************************************************

作者：王薪杰
时间：2011/10/28
内容：
1. 业务Type维护文档.xls添加了新的type
2.更新了personscurityfactory类和页面

作者：王薪杰
时间：2011/10/28
内容：
1.修改了业务Type维护文档.xls，增加了找回账号的type

*******************************************************

作者：杨晓东
时间：2011年10月26日23:15:01
摘要：1.删除WanerDaoCompoents类库
2.WanerDaoBLL.Person 添加WanerDaoPersonInfoManager.cs
3.WanerDaoIBLL.IPerson 添加IWanerDaoBlogManager.cs
IWanerDaoImageManager.cs
IWanerDaoPersonConfig.cs
IWanerDaoPersonFind.cs
IWanerDaoPersonInfoManager.cs
IWanerDaoPersonState.cs
IWanerDaoVideoManager.cs

作者：金广亮
时间：2011-10-26
更新列表：
1.分页插件
2.修正薪杰提出的cookie问题
3.新增jquery插件描述文档.xls所有写的jquery插件都用在此处有记录
4.修改分页存储过程，重新生成分页存储过程
5.修改WanerDaoDbWrapper.cs里面的
ReflectDictionary(Dictionary<string, object> dic)
ReflectHashTable(Hashtable ht)
ReflectGeneric<T>(T t)
把mysql参数类型自动反射
6.在WanerDaoDbWrapper.cs里面新增
private DbType getDbType(string dbtype)
        {
            DbType str = default(DbType);
            switch (dbtype)
            {
                case "string":
                    str = DbType.String;
                    break;
                case "boolean":
                    str = DbType.Boolean;
                    break;
                case "int32":
                    str = DbType.Int32;
                    break;
            }
            return str;
        }
7.添加WanerDaoDocuments\Demo\分页插件 请查看说明

作者：王薪杰
时间：
内容：
1.修改了工厂WanerDaoPersonSecurityFactory.cs
2.修改了页面，自己用，这里就不做说明了

*******************************************************

作者：王薪杰
时间：2011-10-23
内容：
1.修改了工厂类：WanerDaoCommonFactory.cs 吧操作类型scrollbutton的操作移动到BLL，在IBLL接口和BLL里添加了方法

*******************************************************

作者：金广亮
时间：2011-10-22
更新列表
1.修改分页存储过程移除/*OUT total INT ,输出记录总数*/参数，最新请见WanerDaoDocuments\DataBaseScript\procedure\wanerdaoprocedure.txt文件
2.更新WanerDaoWorkDir\DbConfig\SQL\CommonSQL.xml文件，添加分页sql
3.更新WanerDaoDALFactory\WanerDaoDbWrapper.cs，新增以下函数：
3.1	GetDataTable<T>(string filename, string sqlKey, T t)
3.2	GetDataSet(string filename, string sqlKey)
3.3 GetDataSet(string filename, string sqlKey, DbParameter[] dbparameters)
3.4 GetDataSet(string filename, string sqlKey, Hashtable ht)
3.5 GetDataSet(string filename, string sqlKey, Dictionary<string, object> dic)
3.6 GetDataSet<T>(string filename, string sqlKey, T t)
4.更新WanerDaoModule\Utils\WanerDaoUtils.cs文件，新增以下函数：
4.1	List<Dictionary<string, object>> DataTableToList(DataTable dt)
5.更新WanerDaoIBLL\ICommon\IWanerDaoCommon.cs文件，新增分页函数接口：
5.1WanerDaoPagination(Dictionary<string, object> dic)
6.更新WanerDaoBLL\Common\WanerdaoCommon.cs文件，新增分页函数接口实现：
6.1WanerDaoPagination(Dictionary<string, object> dic)

*******************************************************

作者：王薪杰
时间：1:03 2011/10/19
摘要：
1.views网站 -> PersonSecurity添加account_find_pass_step1.aspx,account_find_pass_step2.aspx,做了些修改


*******************************************************
作者：金广亮
时间：2011-10-20
更新列表：
1.在DataBaseScript新创建2个文件夹用来保存对应存储过程和视图的脚本
1.1 DataBaseScript\procedure文件夹保存存储过程脚本
1.2 DataBaseScript\view文件夹保存视图脚本
2.更新Readme\视图存储过程插件说明\存储过程更新说明.xls文件添加新增分页存储过程描述

*******************************************************
作者：王薪杰
时间：1:03 2011/10/19
摘要：
1.views网站 -> PersonSecurity添加account_find_pass_step1.aspx,account_find_pass_step2.aspx,account_find_pass_step3.aspx
2.修改了PersonSecurity下的文件，修改Bll工厂类 PersonSecurityFactory.cs
3.修改了security.js
*******************************************************

作者：金广亮
时间：2011-10-17
changelist：
1.修正“作者：徐兵时间：2011-10-14 1、缓存无效。	由于WanerDaoCacheFactory.SingleInstance().GetStrategy(？)始终创建新缓存对象，故使用无效。”提到的问题
2.移除WanerDaoBLLFactory\Activity\ActivityFactory.cs里面的测试代码
*******************************************************
作者：王薪杰
时间：2011年10月16日13:40:41
摘要：
1.添加wanerdaoview->script->person->security.js
2.添加wanerdaoview->PersonSecurity-> Register.aspx,Login.aspx
3.添加Script->scrollbutton->QapTcha.jquery.js,
4.添加css->QapTcha.jquery.css
5.添加修改了操作类型维护xls
6.修改工厂类WanerDaoPersonSecurity.cs
*******************************************************
作者：杨晓东
时间：2011年10月15日12:17:41
摘要：1.WanerDaoBLLFactory添加Person文件夹和WanerDaoPersonSecurityFactory.cs
    2.添加type映射，详情查看axd文件映射对应业务工厂维护文档.xls
    3.修改web.config添加映射个人安全信息 <add verb="*" path="*_personsecurity.axd" validate="false" type="WanerDao2.WanerDaoBLLFactory.Person.WanerDaoPersonSecurityFactory, WanerDaoBLLFactory" />
    4.添加测试项目WanerDaoUnitTest
    5.删除项目WanerDaoTest
*******************************************************
作者：徐兵
时间：2011-10-14
1、缓存无效。
	由于WanerDaoCacheFactory.SingleInstance().GetStrategy(？)始终创建新缓存对象，故使用无效。
2、配置文件读取操作过多
	某些配置文件存的是很多键值关系数据，故可以第一次访问某个配置文件时，将所有的键值对数据全部缓存。而不必每次首次需要某键的值时就去访问文件（导致文件中存在多少键值对时需要打开多少次）。
	建议多用Dictionary<TKey,TValue>,速度优于Hashtable，（可以减少类型间转换）。在需要拆箱和装箱情况下最明显，体现泛型优点。

3、WanerDaoLog4Net中写入日志存在两套方式，容易混淆和误解。

4、记录日志信息时，如果有些信息在正式环境下（Release版本下运行）不需要记录的，但又要在调试中需要记录（或者开发人员需要调试错误信息）时。可以用“ #if (DEBUG) #endif”语法，或者借用Log4Net中的Debug日志类别记录，建议后者（可以通过日志配置管理）。

5、获取数据集时，如果需要返回类型不是DataTable时，建议转换过程中不要经过DataTable（直接用DataRead效率高），

6、数据库底层访问。（多线程问题）
	由于DbConnection及DbCommand等定义的是类属性，而整个系统中数据库底层访问是单列模式，故在WEB多线程下访问数据库可能会导致数据库连接为释放、数据读取缭乱或者异常等。
	autoOpenClose默认为false，如果用户不修改为true，导致取DataRead后即使关闭了DataRead后也未能释放数据库连接。

以上是个人发现问题，当然可能是理解导致并不是问题。希望得到各位解释

作者：王薪杰
时间：00：00 2011/10/15
changelist:
WanerDaoViews添加了Account文件夹及下面的css、images文件夹、Index.aspx页面
WanerDaoViews->Script添加了account文件夹
改变了 以上13号上传文件结构，不存在的已删除
WanerDaoViews->PersonSecurity文件夹->index.aspx
WanerDaoViews->css ->css文件
WanerDaoViews->images ->img文件


*******************************************************

作者：金广亮
时间：2011-10-13
changelist
1.添加母板页，所有前台页面需要使用母板页
2.新增项目WanerDaoEmail，此项目为邮件服务类
作者：王薪杰
时间：14:24 2011/10/13
changelist:
WanerDaoViews的web.config节点appSettings 下
<add key="WorkingDir" value="..\..\WanerDaoWorkDir" />
改成
<add key="WorkingDir" value="..\WanerDaoWorkDir" />



作者：王薪杰
时间：17:42 2011/10/13
changelist:
WanerDaoViews添加了Account文件夹及下面的css、images文件夹、Index.aspx页面
WanerDaoViews->Script添加了account文件夹
*******************************************************
作者：金广亮
时间：2011-10-12
changelist
1.修改“axd文件映射对应业务工厂维护文档.xls”新增公有控件的axd处理程序命名规范
2.在demo文件夹里面新增“亚马逊云demo.rar”
3.规范玩儿道2.0插件或控件书写流程。
	3.1 接口在WanerDaoIBLL\ICommon\IWanerDaoCommon.cs
	3.2 业务在WanerDaoBLL\Common\WanerdaoCommon.cs
	3.3	业务工厂在WanerDaoBLLFactory\Common\WanerDaoCommonFactory.cs
	3.4 调用SQL在WanerDaoWorkDir\DbConfig\SQL\CommonSQL.xml
4.在WanerDaoJSON.cs中的ParseJson方法出新增日志记录功能
5.在WanerDao2.WanDaoIDAL.DbHelper中新增日志记录功能
6.删除wanerdaoviews\log目录
7.新增UrlRewrite.netdll位置在WanerDaoDocuments\Dlls\UrlRewrite.net，改写URL规范为随机8位数字.aspx
8.新增“业务Type维护文档.xls”公有插件及控件的type业务描述
9.每个程序确保每天更新或者上传一次SVN（这是必须的）
10.新增测试项目“WanerDaoTest”，程序可以在此项目中做业务测试
*******************************************************

作者：金广亮
时间：2011-10-11
changelist
1.修改在WanerDaoDbWrapper.cs中行485处，类型转换错误
2.更新”N0001 编码规范.xls“在“数据库对象命名”中添加“视图与存储过程命名规则”并且新增“JQuery插件命名规则”
3.新增“视图存储过程插件说明”文件夹，插件，视图，存储过程更新必须在对应文件中有相应的记录
4.在方法GetScalar中加入异常日志记录
作者：杨晓东
时间：2011年10月11日23:27:06
1.在WanerDaoDbWrapper.cs添加方法public object GetScalar(string filename, string sqlKey, Dictionary<string, object> dic)；
2.添加实体类库Person实体集合
3.添加PsrsonSQL.xml文件
4.IBLL添加IPerson文件夹和IWanerDaoPersonSecurity.cs接口
5.BLL添加Person文件夹和个人安全实现接口WanerDaoPersonSecurity.cs

*******************************************************
作者：金广亮
时间：2011-10-9
changelog
1.在WanerDaoDbWrapper类里面添加6个方法
1.1        /// <summary>
        /// 描述：不带有事物的执行
        /// 创建者：金广亮
        /// 创建时间：2011-10-9
        /// </summary>
        /// <param name="filename">储存SQL脚本文件名(不用加扩展名)</param>
        /// <param name="sqlKey">SQL脚本ID</param>
        /// <param name="objects">类实例集合</param>
        /// <returns>影响行数</returns>
        public int ExecuteNonQuery(string filename, string sqlKey, object[] objects)
1.2        /// <summary>
        /// 描述：带有事物的执行
        /// 创建者：金广亮
        /// 创建时间：2011-10-9
        /// </summary>
        /// <param name="filename">储存SQL脚本文件名(不用加扩展名)</param>
        /// <param name="sqlKey">SQL脚本ID</param>
        /// <param name="objects">类实例集合</param>
        /// <returns>影响行数</returns>
        public int ExecuteNonQueryForTrans(string filename, string sqlKey, object[] objects)
1.3/// <summary>
        /// 描述：返回实体格式数据集
        /// 作者:金广亮
        /// 时间：2011-9-24
        /// </summary>
        /// <typeparam name="T">泛型</typeparam>
        /// <param name="filename">配置文件名</param>
        /// <param name="sqlKey">脚本ID</param>
        /// <returns>返回实体类集合</returns>
        public IList<T> GetGenericModel<T>(string filename, string sqlKey)
1.4/// <summary>
        /// 描述：返回实体集合格式数据集
        /// 作者:金广亮
        /// 时间：2011-9-24
        /// </summary>
        /// <typeparam name="T">泛型</typeparam>
        /// <param name="filename">配置文件名</param>
        /// <param name="sqlKey">脚本ID</param>
        /// <param name="dbparameters">参数集合</param>
        /// <returns>返回实体类集合</returns>
        public IList<T> GetGenericModel<T>(string filename, string sqlKey, DbParameter[] dbparameters)
1.5        /// <summary>
        /// 描述：返回实体集合格式数据集
        /// 作者:金广亮
        /// 时间：2011-9-24
        /// </summary>
        /// <typeparam name="T">泛型</typeparam>
        /// <param name="filename">配置文件名</param>
        /// <param name="sqlKey">脚本ID</param>
        /// <param name="ht">参数集合</param>
        /// <returns>实体集合</returns>
        public IList<T> GetGenericModel<T>(string filename, string sqlKey, Hashtable ht)
1.6        /// <summary>
        /// 描述：返回实体集合格式数据集
        /// 作者:金广亮
        /// 时间：2011-9-24
        /// </summary>
        /// <typeparam name="T">泛型</typeparam>
        /// <param name="filename">配置文件名</param>
        /// <param name="sqlKey">脚本ID</param>
        /// <param name="dic">参数集合</param>
        /// <returns>实体集合</returns>
        public IList<T> GetGenericModel<T>(string filename, string sqlKey, Dictionary<string, object> dic)
2.在WanerDaoDbWrapper类里面添加一个反射方法
        /// <summary>
        /// 描述;反射object实体类集合
        /// 作者：金广亮
        /// 时间：2011-10-9
        /// </summary>
        /// <param name="objets">object实体类集合</param>
        /// <returns>DbParameter[]</returns>
        private DbParameter[] ReflectGeneric(object[] objets)
3.在WanerDaoDbWrapper类里面CommonExecuteNonQuery和CommonTransExecuteNonQuery函数中添加日志记录
4.移植日志从WanerDaoModule到WanerDaoExceptionManager,删除WanerDaoModule项目中的日志记录
5.把WanerDaoWorkDir\WanerDaoConfig.xml    <!--
      描述：日志存放路径
      创建者:金广亮
      创建时间：2011-9-19
    --><!--
    <add key="Log" value="WanerDaoLog\"/>
    --><!--
      描述：日志存放路径目录名，可以自行更改存放路径文件名格式但是必须符合日期格式
      创建者:金广亮
      创建时间：2011-9-19
    --><!--
    <add key="LogDirFormat" value="yyyyMMdd"/>-->注释

*******************************************************
作者：金广亮
时间：2011-10-8
changelog：
1.添加Jquery延迟加载插件可在JQuery\jquery.lazyload查看
2.添加Jquery局部加载信息插件可在JQuery\jQuery.LoadMsg查看
3.添加Jquery封装google map插件可在JQuery\jQuery.Map查看
4.添加Jquery评分插件可在JQuery\jQuery.Rating查看
5.添加Jquery侧栏插件可在JQuery\jQuery.Slide查看
6.添加Jquery信息提示插件可在JQuery\jQuery.Tooltip查看
7.添加Jquery表单效验插件可在JQuery\jquery.validate查看
8.添加JS加密算法可在JQuery\jsCrypto查看
9.添加JS压缩以及格式化.txt
10.添加jQuery.Mark文件夹，以后保留
*******************************************************
                      
作者：杨晓东
时间：2011年10月7日22:55:38
摘要：1.修改 \WanerDao2.0\WanerDaoDALFactory\WanerDaoDbWrapper.cs  461行  添加了if判断
                    if (pis[i].GetValue(t, null) != null)
                 
     2.修改 \WanerDao2.0\WanerDaoIDAL\BaseDbHelper.cs	453行   添加了if判断
                    if (dbParameters[i] != null)
     3.重命名的部分Readme文件名，统一格式
*******************************************************
                      
作者：金广亮
时间：2011-10-06
更新：
1.wanerdaojson类把 public static JObject ParseJson(string json)置为公有，描述：解析JSON字符串为JObject对象

*******************************************************

作者：杨晓东
时间：2011年10月5日3:24:22
摘要：1.WanerDaoExceptionManager添加log4net类WanerDaoLog4Net.cs

*******************************************************

作者：金广亮
时间：2011-11-02
更新列表
1.重新生成数据库脚本位置WanerDao2.0\WanerDaoDocuments\DataBaseScript\wanerdao220111102.sql
请重新生成数据库

*******************************************************

作者：王薪杰
时间：12:23 2011/9/30
摘要：上传滑动按钮技术demo

********************************************************

作者：杨晓东
时间：2011年9月29日23:52:00
摘要：1、添加cookie工具类
          2、WanerDaoModule.Validation.WanerDaoValidation添加验证函数ValidateParameter
          3、WanerDaoDocuments.Dlls添加MySqlData.dll

********************************************************
作者：胥鑫
时间：2011-9-26
1.日志功能提交。在WanerDaoBLLFactory中调用WanerDao2.WanerDaoModule.logs中的静态方法WanerDaoLog4net.writeLogs即可


********************************************************

作者：金广亮
时间：2011-9-26
1.把WanerDaoDALFactory忘记提交的2个文件提交上去了
2.添加2个函数在WanerDao2.WanerDaoModule.Utils.WanerDaoUtils类里
3.使用新框架代码写的DEMO文件放到WanerDaoDocuments\Demo\FrameWorkDemo文件夹里(请注意把压缩文件拷贝出来不要放到玩儿道相关文件夹里面)
4.新增数据库脚本文件可以在DataBaseScript找到
5.更新CodeSpecification\N0001 编码规范.xls文件，添加“玩儿道函数以及js函数命名规则”说明

********************************************************

创建者：金广亮
创建时间：2011-9-25
1.新增配置文件夹
	UrlConfig 用来跳转只用
	FilterConfig	设置非法过滤列表主要用户传递参数上面
2.新增维护文档
3.新增数据库脚本生成文件(注意请统一数据库连接为Server=localhost;Database=wanerdao2;Uid=root;Pwd=123;CharSet=utf8;)
********************************************************
创建者：金广亮
创建时间：2011-9-15

---------------------------------------------------------------------------------------------------
本玩儿道2.0命名空间统一为WanerDao2例如WanerDaoBLLFactory项目的命名空间为WanerDao2.WanerDaoBLLFactory

程序文件类头部注释遵循以下原则：
    /// <summary>
    /// 描述：xxx
    /// 创建者：
    /// 创建时间：
    /// 修改者：
    /// 修改时间：
    /// 修改原因：
    /// </summary>
    public class Class1
    {

    }

函数注释遵循原则：
    /// <summary>
    /// 描述：xxx
    /// 创建者：
    /// 创建时间：
    /// 修改者：
    /// 修改时间：
    /// 修改原因：
    /// </summary>
	public void xx()
        {


        }

函数命名参照'CodeSpecification\N0001 编码规范.xls'以及'设计文档\接口'相应文件夹里面的文档描述

****************************************************************************************

3层调用规则如下：

展现层----jquery使用post或者get操作通过调用不同的axd来调用不同WanerDaoBLLFactory业务工厂--->业务层-----通过WanerDaoDALFactory调用数据访问层--->数据访问层


****************************************************************************************
数据访问层包含以下几个项目：
	1.WanerDaoIDAL				数据访问层接口项目
	2.WanerDaoMySqlDAL          数据访问层具体数据库实现1中所提出来的接口
	3.WanerDaoDALFactory		数据访问层工厂类项目提供给业务层使用
==========================================================================
业务层包含以下几个项目：
	1.WanerDaoModel				业务层实体类
	2.WanerDaoIBLL				业务层接口
	3.WanerDaoBLL				业务层实现类
	4.WanerDaoBLLFactory		业务层工厂类提供给展现层使用使用HTTP处理程序实现工厂模式
								使用文件夹来区分不同业务（例如活动创建文件夹名为activity，
								但命名空间为WanerDao2.WanerDaoBLLFactory）使用type来区分具体操作，
								type维护文档为"Type\业务Type维护文档.xls".
==========================================================================
展现层包含以下项目：
	1.WanerDaoWiews
==========================================================================
异常与日志管理系统项目
	1.WanerDaoExceptionManager
==========================================================================
聊天系统：
	1.WanerDaoChatManager
==========================================================================
插件系统：
	1.WanerDaoPlugInManager
==========================================================================
工具模块：
	1.WanerDaoModule包含以下目录
	1.1	Cookie					Cookie操作
	1.2	Email					Email操作
	1.3	InfoPush				信息推送操作
	1.4	Json					JSon序列化等操作
	1.5	PrintSave				打印保存操作
	1.6	RolePermission			作用于资道或圈子的权限控制
	1.7	Security				加密解密模块
	1.8	Validation				效验模块
	1.9	WanerDaoImage			图片模块
	1.10 IO						IO文本以及目录操作
==========================================================================
工作目录：			主要存放配置文件
	1.WanerDaoWorkDir包含以下目录
	1.1	PointsConfig			积分配置文件
	1.N							稍后添加
==========================================================================
程序文档库：			主要存放程序相关文档以及demo
	1.WanerDaoDocuments
	1.1	Demo					存放JQuery或者相关技术对应Demo，但是请在Demo目录创建下级相应目录存放
	1.2	Dlls					存放第三方控件或者Dlll，在其目录创建下级相应目录存放
	1.3	Type					业务type维护文档
	1.4	CodeSpecification		代码规范
	1.5	ProgramStructure		相对简单的程序架构