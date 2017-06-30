var User = {
	showWindow: function() {
		$('#user-window').dialog('open');
	},

	add: function() {
		$.ajax({
			url: 'action/add.jsp',
			type: 'get',
			success: function(data) {
				$.messager.alert('操作提示', "添加成功", 'info');

				$('#user-window').dialog('close');
				$('#user-geid').datagrid("reload");
				$.messager.alert('错误提示', "添加失败", 'error', function() {
					alert("点击了失败后的按钮");
				});
			}
		});

		/*$('#user-form').form('submit', {
			url: 'action/add.jsp',
			onSubmit : function() {
				return $(this).form('validate');
			},
			success : function(data) {
				alert(data);
			}
		});*/
	},

	query: function() {
		$('#user-geid').datagrid("reload", {id: 1, name: "aaa"});
	}
};

$(function() {
/*	$('#easyui-datagrid').datagrid({
        view : detailview,
		url: "data/grid.json",
        detailFormatter:function(index,row){
            return '<div id="ddv-' + index + '" style="padding:5px 0"></div>';
        },
        onExpandRow: function(index,row){
            $('#ddv-'+index).panel({
                height:80,
                border:false,
                cache:false,
                href:'datagrid21_getdetail.php?itemid='+row.itemid,
                onLoad:function(){
                    $('#easyui-datagrid').datagrid('fixDetailRowHeight',index);
                }
            });
            $('#easyui-datagrid').datagrid('fixDetailRowHeight',index);
        }
    });

	$('#display-div').css("display", "block");*/
});