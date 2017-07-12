/*
    好友分组选择弹框
*/
(function () {
    FriendGroupChosen = function (opts) {
        var defaults = {
            _callback: null
        };

        var $f_box;
        opts = $.extend(defaults, opts);
        var $fg_chosen_win = $('<div id="wanerdaofgchosen" class="pop" style="width:360px; margin:10px auto;" ></div>').appendTo(document.body);
        $fg_chosen_win.append('<div class="pop-bg"></div>');
        $fg_chosen_win.append('<div class="pop-container">'
            + '<div class="pop-hd clearfix"><h3>' + wanerdaoLangTip('personal_00084') + '</h3><a href="javascript:;" class="close-3" title="' + wanerdaoLangTip('common_00008') + '"></a></div>'
            + '<div class="pop-bd">'
            + wanerdaoLangTip('personal_00078') + ': <select id="dialog_friendGroup" style="width: 120px;"><option value="">' + wanerdaoLangTip('common_00009') + '</option></select>'
            + '&nbsp;<a href="javascript:;" class="button button1" >' + wanerdaoLangTip('common_00034') + '</a>'
            + '</div></div></div>');
        $('#dialog_friendGroup').chosen();

        /**弹出 模式对话**/
        $f_box = new $.ui.dialog($fg_chosen_win, {
            callback: { hide: function () {
                $('#wanerdaofgchosen').remove();
            }
            },
            widget: {
                hide: '.close-3'
            }
        }).show();

        ajaxfunc('fgroup_friend.axd', "{opertype:'getfriendsgroup'}", function () {
            $('#dialog_friendGroup').html('<option value="">' + wanerdaoLangTip('common_00001') + '</option>');
            $('#dialog_friendGroup').chosen();
        },
        function (data) {
            if (data.result) {
                $('#dialog_friendGroup').empty();
                $.each(data.rows, function (i, v) {
                    $('#dialog_friendGroup').append('<option value="' + v.id + '">' + v.name + '</option>');
                });

                $('#dialog_friendGroup').chosen();

                $fg_chosen_win.find('.button1').click(function () {
                    $f_box.hide();
                    if (opts._callback) opts._callback({ id: $('#dialog_friendGroup').val(), name: $('#dialog_friendGroup').find('option:selected').text() });
                });
            }
        });

    }

})(jQuery);