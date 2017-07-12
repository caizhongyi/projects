

*******************************************************



*******************************************************


*******************************************************

*******************************************************



*******************************************************


*******************************************************

*******************************************************



*******************************************************


*******************************************************

*******************************************************



*******************************************************


*******************************************************

*******************************************************



*******************************************************


*******************************************************

*******************************************************


作者：胥鑫
时间：2012-2-24
通用打印方法。
摘要：可以执行printDemo.aspx页面查看。
1.配置打印模板：demo路径：WanerDaoWorkDir\printConfig\demo.xml
打印模板统一放在printConfig文件夹下，打印模板中每个节点名（比如demo.xml中的test1\test2）对应传入参数名（后面有介绍），动态字段数据用$WDXXX$WD代替，$WD为标示符号。XXX为SQL查询出的字段名，用于数据替换匹配
2.调用方法：Common/print.aspx?jsonparam={opertype:'print',printfile:'demo', printdatafile: 'GroupSQL', printdata_test1: 'Select_GroupNormalManage', printdata_test2: 'Select_GroupKickDuration', group_id: 123456, role_name: 'user',language_id:'xxx' }
opertype统一设置'print';printfile为打印模板名称；printdatafile: 打印数据来源，SQL配置文件名；printdata_test1，printdata_test2: 打印SQL，prrintdata固定参数，test1\test2于打印模板节点名配置，该参数对于SQL查出的数据对应绑定到该打印模板节点
后面的就全是SQL查询的参数，
*******************************************************
作者：胥鑫
时间：2012-2-11
摘要：
1.日志、杂烩发帖分享到圈子的方法说明说明。
路径WanerDaoIBLL\IRelatio\IWanerDaoGroup.cs 方法：add_GroupDiscuss
参数为：group_id：圈子ID，post_id：发表人ID，post_name：发表人名,subject:主题，content：内容
*******************************************************
作者：胥鑫
时间：2012-1-07
摘要：
1.权限添加修改方法说明。路径WanerDaoComponent\WanerDaoPropertyPermission.cs 方法：add_propertyPermission
该方法将返回业务逻辑存储用权限ID

当为修改时，oldperimissionID不为空，当为新增时，oldperimissionID必须为空，newperimissionID可为空可不为空
allowObj为允许的对象，规则：对象为好友分组时：Friends--XXX(分组ID)对象为圈子时：Group--XXX(圈子ID)，对象为个人时：User--XXX(用户ID)。各对象组之间用-,-隔开
refuseObj为拒绝对象。规则：User--XXX(用户ID)。各对象组之间用-,-隔开

*******************************************************
作者：徐兵
时间：2011-11-13
摘要：
1、添加活动搜索显示页面\WanerDaoViews\Activity\Activity_search.aspx.

2、添加活动搜索及分页插件DEMO，位置WanerDaoViews\PluginDemo\ActivitySearch下，请常见其下的 活动查询.txt 文档内容。

3、修改了WanerDaoViews的web.config文件：
	修改活动处理配置为：<add verb="*" path="*_activity.axd" validate="false" type="WanerDao2.WanerDaoBLLFactory.Activity.WanerDaoActivityFactory,WanerDaoBLLFactory" />
	添加活动处理配置：<add name="wanerdao_activity" path="*_activity.axd" verb="*" type="WanerDao2.WanerDaoBLLFactory.Activity.WanerDaoActivityFactory" resourceType="Unspecified" requireAccess="Script" preCondition="integratedMode" />

4、修改WanerDaoModule\Json\WanerDaoJSON.cs 类中方法private static string SerializeObject(Dictionary<string, object> prepareJson)下所有 new JProperty(d.Key, d.Value)为new JProperty(d.Key, d.Value.ToString())
	原因：当从数据库获取时间类型经过此JProperty处理后，时间变为非时间格式了（/Date(1318208400000+0800)/）

5、创建了数据库方法f_wanerdaoformatqueryregexp（格式化正则表达式查询）、存储过程p_wanerdaosearcactivity（活动复杂查找）

6、添加活动处理类文件WanerDaoBLLFactory\Activity\WanerDaoActivityFactory.cs

7、添加业务处理类文件WanerDaoBLL\Activity\WanerDaoActivity.cs

8、在WanerDaoCommonFactory.cs 添加了活动搜索控件处理业务类型 searchactivitybymanycondition

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