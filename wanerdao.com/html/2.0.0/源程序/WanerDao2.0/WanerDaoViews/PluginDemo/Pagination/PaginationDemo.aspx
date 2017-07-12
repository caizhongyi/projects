<%@ Page Language="C#" AutoEventWireup="true" CodeFile="PaginationDemo.aspx.cs" Inherits="PluginDemo_PaginationDemo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>    
    <title>分页插件Demo</title>
<link rel="stylesheet" type="text/css" href="../../css/PluginCss/Pagination/Pagination.css" />
<script src="../../Scripts/jquery-1.4.1.js" type="text/javascript"></script>
<script src="../../Scripts/Plugin/Pagination/wanerdao2.pagination.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {

            $("#pageid").myPagination({
                currPage: 1,
                pageCount: 10,
                pageSize: 4,
                callback: test,
                toolbar: [{ text: '全选', cls: 'checkbox', type: 'checkbox', handler: function () {
                    alert("全选");
                }
                },
                { text: '提醒缴费', cls: '', type: 'button', handler: function () {
                    alert("提醒缴费");
                }
                }],
                ajax: {
                    param: {
                        pageSize: 3,
                        opertype: 'demopagiation'
                    }

                }
            });
            //更改样式
            function test(data) {
                //debugger;
                $('#content').html("");
                var pagecontent = $('<ul></ul>').appendTo("#content");
                $.each(data.rows, function (i, msg) {
                    //alert(msg.unit_name);
                    $('<li>' + msg.unit_name + '</li>').appendTo(pagecontent);
                });
            }
        })
    </script>
</head>
<body>
    
    <div id="content">
    </div>
    <div id="pageid">
    
    </div>
</body>
</html>
