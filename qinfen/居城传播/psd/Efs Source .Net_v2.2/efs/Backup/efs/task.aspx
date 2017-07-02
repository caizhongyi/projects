<%@ Page Language="C#" AutoEventWireup="true" CodeFile="task.aspx.cs" Inherits="task" %>
<!--#include file="checkLog.inc" -->
<HTML>
<HEAD>
<TITLE> 任务首页 </TITLE>
<link rel="stylesheet" type="text/css" href="css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="css/efs-all.css" />
<script type="text/javascript" src="js/efs-all.js"></script>
<style>
td,div {
  font-size:9pt;
  line-height:160%;
}

</style>
</HEAD>

<BODY>
<div region="center" xtype="panel" title="Efs框架整体说明" autoScroll="true">
<TABLE>
<TR>
  <TD>&nbsp;</TD>
  <TD>

<img src="images/main.gif" align="right">
&nbsp;&nbsp;&nbsp;&nbsp;Efs是一套整体的企业级开发解决方案，整个框架体系中包含了Web表现层开发包，组件开发包，基础数据库设计一整套完整的基于B/S架构应用程序设计开发的完整解决方案。<br>
&nbsp;&nbsp;&nbsp;&nbsp;Efs框架从研发到时间，历时近10年，积累了大量实战软件工程专家、数学专家的心血不断完善而成，已应用的大大小小的项目几十个，从小项目的开发管理维护设计到大项目的负载均衡设计，Efs逐渐形成了一整套完整的基于B/S架构的设计解决方案。<br>

&nbsp;&nbsp;&nbsp;&nbsp;<B>Efs框架设计目标：</B><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;l、 整体提升企业的项目管理水平；<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、 整体提升企业的研发人员的研发水平；<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、 整体提升企业的项目研发效率；<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4、 整体提升企业的项目研发的健壮性；<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5、 最大限度减少企业的项目维护成本；<br>

&nbsp;&nbsp;&nbsp;&nbsp;<B>Efs框架特点如下：</B><br>
&nbsp;&nbsp;&nbsp;&nbsp;<B>1、完善的Web表现层开发包：</B>为企业Web表现层开发人员提供的一套完整、高效、美观的B/S结构设计表现层解决方案，简单易学。<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a) 极大提高企业的项目Web表现层的开发效率；<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b) 统一企业的项目UI设计，统一的框架结构，能迅速规范企业的Web表现层代码设计规范，最大限度的减轻企业后期的项目管理、维护、升级成本；<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c) 减少企业Web表现层开发人员的培训投入；<br>
&nbsp;<br>
&nbsp;&nbsp;&nbsp;&nbsp;<B>2、完善的组件开发包：</B>为企业组件开发人员提供的一套完整、稳定、高效的B/S结构设计业务逻辑层解决方案。<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a) 极大提高企业的项目业务逻辑层组件开发效率；<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b) 统一的接口规范，能迅速规范企业的业务逻辑层组件代码设计规范，最大限度的减轻企业后期项目管理、维护升级成本；<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c) 减少企业业务逻辑层组件开发人员的培训投入；<br>
&nbsp;<br>
&nbsp;&nbsp;&nbsp;<B>3、分层结构设计：</B>Efs框架严格按照MVC模式设计开发。<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a) 能帮助企业迅速发挥团队开发优势，合理分工协作（能迅速将Web表现层开发，业务逻辑组件开发，系统设计合理分离）。<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b) 标准的三层结构模型，为系统的稳定、高效运行打下坚实基础。<br>
&nbsp;<br>
&nbsp;&nbsp;&nbsp;<B>4、完善的基础数据库设计：</B> <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 完整的事务、事件管理、用户、单位、角色、权限管理设计，能快速帮助企业在不同的项目中快速完成用户、单位、角色、权限的分配，迅速投入到项目本身的业务系统开发中。<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b) 完整的字典管理功能，能方便的对业务系统的全部字典文件进行维护。<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c) 分页查询存储过程设计，为业务系统开发过程中的分页查询提升效率。<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;d) 编码分配设计，只需要通过配置即可快速实现可满足各种要求的唯一编码。<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e) 汉字拼音管理，收录了常用的3万多汉字的全拼与简拼，能迅速完成对汉字的全拼与简拼的翻译处理。


  </TD>
</TR>
</TABLE>
</div>
<div region="east" xtype="panel" title="" autoScroll="true" width="240">
  <div region="center" xtyple="panel" title="Efs框架的适用开发平台">
  
  <table cellpadding=0 cellspacing=0 width="100%" height="100%" bgcolor="#DEECFD">
    <tr height=50>
    <td>&nbsp;</td>
    <td align="left" style="font-size:9pt;color:red" valign="top">
Efs框架应用平台解决方案包含：<br>
<DIV><FONT color=#ff0000>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1、<U>基于Java环境的 Jsp + Java中间组件 + Oracle/SQL Server/MySql 应用模型；</U></FONT></DIV>
<DIV><FONT color=#ff0000>&nbsp;&nbsp;&nbsp; &nbsp; 2、<U>基于Windows平台的 .Net(C#) + SQL Server 应用模型；</U></FONT></DIV>
<DIV>&nbsp; &nbsp;&nbsp;&nbsp; <FONT color=#ff0000>3、<U>基于PHP环境的 Php + MySQL 应用模型；</U></FONT></DIV>
<DIV>其他应用平台组合，我们可为您快速定制开发。</DIV>
<img src="images/.net.gif">&nbsp;<img src="images/java.gif">&nbsp;<img src="images/php.gif"><br>
<img src="images/mssql.gif">&nbsp;<img src="images/oracle.gif"><br>
<img src="images/mysql.gif"><br>
    </td>
    </tr>
    </table>
  
  </div>
  <div region="south" xtype="panel" title="技术支持" height="140" collapsible="true">
    <table cellpadding=0 cellspacing=0 width="100%" height="100%" bgcolor="#DEECFD">
      <tr height=50>
        <td>&nbsp;</td>
        <td align="left" style="font-size:9pt;">
        更多帮助，请参考相关帮助文档<br>
          网址：<a href="http://www.efsframe.cn/" target="_blank">http://www.efsframe.cn/</a></br>
          邮箱：<a href="mailto:enjsky@163.com">enjsky@163.com</a></br>
          电话：027-87176370</br>
        </td>
      </tr>
    </table>
    
  </div>
</div>
</BODY>
</HTML>
