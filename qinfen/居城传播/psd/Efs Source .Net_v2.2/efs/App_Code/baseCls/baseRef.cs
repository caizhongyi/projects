using System;
using System.Xml;
using System.Data;
using System.Web;
using Efsframe.cn.db;
using Efsframe.cn.declare;
using Efsframe.cn.func;
using Efsframe.cn.baseCls;
using Efsframe.cn.baseManage;
using Efsframe.cn.person;

namespace Efsframe.cn.baseCls
{
  /// <summary>
  /// 基础反射执行类
  /// 用于统一处理各种异步(Ajax)交互请求
  /// </summary>
  public class baseRef : System.Web.UI.Page
  {


      public string dealWithXml(HttpRequest Request, HttpResponse Response)
      {
          return Operation.dealWithXml(Request["txtXML"]);
      }
  
    /// <summary>
    /// 查询用户权限
    /// </summary>
    /// <returns></returns>
    public string getUserRightTree(HttpRequest Request, HttpResponse Response)
    {
      UserSession userInfo = (UserSession)Session["RoleUser"];
      string strTree = userInfo.getUserRightsByUserID();
      return strTree;
    }
    
    /// <summary>
    /// 获得事件类表
    /// </summary>
    /// <param name="Request"></param>
    /// <param name="Response"></param>
    /// <returns></returns>
    public string affairTypeList(HttpRequest Request, HttpResponse Response)
    {
      string strXML = Request["txtXML"];
      return AffairType.affairTypeList(strXML);
    }


    public string affairTypeDel(HttpRequest Request, HttpResponse Response)
    {
      string strAffairtypeID = Request["txtXML"];
      return AffairType.drop(strAffairtypeID);
    }

      public string eventTypeDel(HttpRequest Request, HttpResponse Response)
      {
          string strEventtypeID = Request["txtXML"];
          return EventType.drop(strEventtypeID);
      }

    /// <summary>
    /// 获得字典列表
    /// </summary>
    /// <param name="Request"></param>
    /// <param name="Response"></param>
    /// <returns></returns>
    public string QryDicList(HttpRequest Request, HttpResponse Response)
    {
      string strXML = Request["txtXML"];
      return Dic.dicList(strXML);
    }

    /// <summary>
    /// 获得字典条目列表
    /// </summary>
    /// <param name="Request"></param>
    /// <param name="Response"></param>
    /// <returns></returns>
    public string QryDicDataList(HttpRequest Request, HttpResponse Response)
    {
      string strXML = Request["txtXML"];
      string strDicName = XmlFun.getNodeValue(strXML, "//QUERYCONDITION/@dicname");

      return Dic.dicDataList(strXML, strDicName);
    }

    /// <summary>
    /// 查询用户详细信息
    /// </summary>
    /// <param name="Request"></param>
    /// <param name="Response"></param>
    /// <returns></returns>
    public string QryUserDetail(HttpRequest Request, HttpResponse Response)
    {
      string strUserID = Request["txtUserID"];

      return UserOb.userDetail(strUserID);
    }
      /// <summary>
      /// 
      /// </summary>
      /// <returns></returns>
      public string affairTypeDetail(HttpRequest Request, HttpResponse Response)
      {
          string strAffairTypeID = Request["txtXML"];

          return AffairType.affairTypeDetail(strAffairTypeID);
      }

    /// <summary>
    /// 查询用户列表
    /// </summary>
    /// <param name="Request"></param>
    /// <param name="Response"></param>
    /// <returns></returns>
    public string QryUserList(HttpRequest Request, HttpResponse Response)
    {
      string strXML = Request["txtXML"];
      return UserOb.userList(strXML);
    }

    /// <summary>
    /// 查询角色包含的权限
    /// </summary>
    /// <param name="Request"></param>
    /// <param name="Response"></param>
    /// <returns></returns>
    public string QryRoleRightList(HttpRequest Request, HttpResponse Response)
    {
      string strRoleID = Request["txtXML"];

      return RoleBO.roleRightList(strRoleID);
    }

    /// <summary>
    /// 查询角色包含的用户列表
    /// </summary>
    /// <param name="Request"></param>
    /// <param name="Response"></param>
    /// <returns></returns>
    public string QryRoleUserList(HttpRequest Request, HttpResponse Response)
    {
      string strRoleID = Request["txtXML"];

      return RoleBO.roleUserList(strRoleID);
    }

      /// <summary>
      /// 查询角色详细信息
      /// </summary>
      /// <param name="Request"></param>
      /// <param name="Response"></param>
      /// <returns></returns>
      public string RoleDetail(HttpRequest Request, HttpResponse Response)
      {
          string strRoleID = Request["txtXML"];
          return RoleBO.roleDetail(strRoleID);
      }

    /// <summary>
    /// 查询不属于该角色的事件
    /// </summary>
    /// <param name="Request"></param>
    /// <param name="Response"></param>
    /// <returns></returns>
    public string getEventTypeList_AddToRole(HttpRequest Request, HttpResponse Response)
    {
      string strRoleID = Request["txtXML"];

      return RoleBO.eventTypeList_AddToRole(strRoleID);
    }



    /// <summary>
    /// 添加人员
    /// </summary>
    /// <param name="Request"></param>
    /// <param name="Response"></param>
    /// <returns></returns>
    public string userAdd(HttpRequest Request, HttpResponse Response)
    {
      string strXml = Request["txtXML"];
      UserSession userSession = ((UserSession)Session["RoleUser"]);

      strXml = PageCommon.setOpDocXML(strXml, userSession);

      return UserOb.addNew(strXml);
    }

    /// <summary>
    /// 删除用户
    /// </summary>
    /// <param name="Request"></param>
    /// <param name="Response"></param>
    /// <returns></returns>
    public string userDrop(HttpRequest Request, HttpResponse Response)
    {
      string strUserID = Request["txtXML"];
      return UserOb.dropUser(strUserID);
    }

    /// <summary>
    /// 查询不属于该角色的用户
    /// </summary>
    /// <param name="Request"></param>
    /// <param name="Response"></param>
    /// <returns></returns>
    public string userList_AddToRole(HttpRequest Request, HttpResponse Response)
    {
      string strRoleID = Request["txtXML"];

      return RoleBO.userList_AddToRole(strRoleID);
    }


    /// <summary>
    /// 查询角色列表
    /// </summary>
    /// <param name="Request"></param>
    /// <param name="Response"></param>
    /// <returns></returns>
    public string QryRoleList(HttpRequest Request, HttpResponse Response)
    {
      string strXML = Request["txtXML"];
      return RoleBO.roleList(strXML);
    }


    /// <summary>
    /// 添加角色
    /// </summary>
    /// <param name="Request"></param>
    /// <param name="Response"></param>
    /// <returns></returns>
    public string RoleAdd(HttpRequest Request, HttpResponse Response)
    {
      string strXml = Request["txtXML"];

      UserSession userSession = ((UserSession)Session["RoleUser"]);

      strXml = PageCommon.setOpDocXML(strXml, userSession);

      return RoleBO.addRole(strXml);
    }


    /// <summary>
    /// 删除角色
    /// </summary>
    /// <param name="Request"></param>
    /// <param name="Response"></param>
    /// <returns></returns>
    public string DropRole(HttpRequest Request, HttpResponse Response)
    {
      string strRoleID = Request["txtXML"];
      return RoleBO.DropRole(strRoleID);
    }

    /// <summary>
    /// 查询编码列表
    /// </summary>
    /// <param name="Request"></param>
    /// <param name="Response"></param>
    /// <returns></returns>
    public string QryMaxIDTypeList(HttpRequest Request, HttpResponse Response)
    {
      string strXML = Request["txtXML"];
      return MaxIDType.maxidtypeList(strXML);
    }

    /// <summary>
    /// 查询已分配的编码
    /// </summary>
    /// <param name="Request"></param>
    /// <param name="Response"></param>
    /// <returns></returns>
    public string QryMaxList(HttpRequest Request, HttpResponse Response)
    {
      string strMaxIDType = Request["txtXML"];
      return MaxIDType.maxidList(strMaxIDType);
    }

    /// <summary>
    /// 查询编码详细信息
    /// </summary>
    /// <param name="Request"></param>
    /// <param name="Response"></param>
    /// <returns></returns>
    public string QryMaxTypeDetail(HttpRequest Request, HttpResponse Response)
    {
      string strMaxIDType = Request["txtMaxIDType"];
      return MaxIDType.maxidtypeDetail(strMaxIDType);
    }

    /// <summary>
    /// 查询日志列表
    /// </summary>
    /// <param name="Request"></param>
    /// <param name="Response"></param>
    /// <returns></returns>
    public string QrySysLogList(HttpRequest Request, HttpResponse Response)
    {
      string strXml = Request["txtXML"];
      return SysLog.sysLogList(strXml);
    }

    //单位列表
    public string QryUnitList(HttpRequest Request, HttpResponse Response)
    {
      string strXml = Request["txtXML"];
      return ManageUnit.munitList(strXml);
    }

    /// <summary>
    /// 单位详细信息
    /// </summary>
    /// <param name="Request"></param>
    /// <param name="Response"></param>
    /// <returns></returns>
    public string QryUnitDetail(HttpRequest Request, HttpResponse Response)
    {
      string strUnitID = Request["txtUnitID"];
      return ManageUnit.munitDetail(strUnitID);
    }

    /// <summary>
    /// 生成字典文件
    /// </summary>
    /// <param name="Request"></param>
    /// <param name="Response"></param>
    /// <returns></returns>
    public string CreateDicFile(HttpRequest Request, HttpResponse Response)
    {
      string strDicName = Request["txtXML"];

      ReturnDoc obj_ReturnDoc = new ReturnDoc();
      try
      {
        General.CreateDicFile(strDicName);
        obj_ReturnDoc.setErrorResult(Common.SRT_SUCCESS);
      }
      catch (Exception ep)
      {
        obj_ReturnDoc.addErrorResult(ep.Message);
        obj_ReturnDoc.setFuncErrorInfo(Common.SRT_FUNCERROR);
      }

      return obj_ReturnDoc.getXml();
    }

    /// <summary>
    /// 查询拼音列表
    /// </summary>
    /// <param name="Request"></param>
    /// <param name="Response"></param>
    /// <returns></returns>
    public string QrySpellList(HttpRequest Request, HttpResponse Response)
    {
      string strXML = Request["txtXML"];
      return SpellBO.spellList(strXML);
    }

    /// <summary>
    /// 查询错误日志信息
    /// </summary>
    /// <param name="Request"></param>
    /// <param name="Response"></param>
    /// <returns></returns>
    public string QryErrLogList(HttpRequest Request, HttpResponse Response)
    {
      string strXML = Request["txtXML"];
      return ErrLog.ErrLogList(strXML);
    }


      public string personAdd(HttpRequest Request, HttpResponse Response)
      {
          string strXml = Request["txtXML"];
          UserSession userSession = ((UserSession)Session["RoleUser"]);

          strXml = PageCommon.setOpDocXML(strXml, userSession);

          return person.person.addNew2(strXml);
      }


      public string personList(HttpRequest Request, HttpResponse Response)
      {
          string strXML = Request["txtXML"];
          return person.person.personList(strXML);
      }



      public string personDetail(HttpRequest Request, HttpResponse Response)
      {
          string strPersonID = Request["txtXML"];
          return person.person.personDetail(strPersonID);
      }


      public string personDel(HttpRequest Request, HttpResponse Response)
      {
          string strPersonID = Request["txtXML"];
          return person.person.psnDel(strPersonID);
      }

      //
      public string ClassAdd(HttpRequest Request, HttpResponse Response)
      {
          return person.StuClass.ClassAdd(Request["txtXML"]);
      }


      public string ClassEditOrDel(HttpRequest Request, HttpResponse Response)
      {
          return person.StuClass.ClassEditOrDel(Request["txtXML"]);
      }


      public string stuClassList(HttpRequest Request, HttpResponse Response)
      {
          string strXML = Request["txtXML"];
          return person.StuClass.stuClassList(strXML);
      }

      public string stuClassDetail(HttpRequest Request, HttpResponse Response)
      {
          string strClassID = Request["txtXML"];
          return person.StuClass.stuClassDetail(strClassID);
      }

  }
}
