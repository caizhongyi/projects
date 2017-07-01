$.fn.reponseTable = function (data, type) {
    var content = '';

    switch (type) {
        case 'fun'     :
            content += '<caption>参数列表</caption><tr><th>参数名</th><th>参数类型</th><th>默认值</th><th>说明</th></tr>';
            break;
        case 'setting' :
            content += '<caption>方法</caption><tr><th>方法名</th><th>参数类型</th><th>默认值</th><th>说明</th></tr>';
            break;
        case 'event'   :
            content += '<caption>事件</caption><tr><th>事件名</th><th>参数</th><th>说明</th></tr>';
            break;
        case 'attr'   :
            content += '<caption>输入框标签属性</caption><tr>名称<th></th><th>值</th><th>说明</th></tr>';
            break;
        default  :
            content += type;
            break;
    }

    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        content += '<tr>';
        for (var j = 0; j < item.length; j++) {
            var cell = item[j];
            content += '<td>' + cell + '</td>';
        }
        content += '</tr>';
    }
    return  $(this).html('<table class="table table-bordered">' + content + '</table>');
}

$(function () {
    $('.code-example').each(function () {
        var html = $(this).html().escapeHTML();
        $('<pre class="prettyprint linenums">' + html + '</pre>').appendTo(this);
    })
    window.prettyPrint && prettyPrint();

    /*  $('<div style="margin:10px;"><select id="base-script" class="input"><option value="jQuery">jQuery</option><option value="Zepto">Zepto</option></select></div>').on('change',function(){
     window.jQuery = $(this).val();
     }).prependTo('body').val('Zepto').change();
     */
    /*$(document).on('click','[data-controling-text]',function(){
     $(this).attr('disabled').val(($(this).attr('data-controling-text') || 'loading') + '...');
     });*/
});

