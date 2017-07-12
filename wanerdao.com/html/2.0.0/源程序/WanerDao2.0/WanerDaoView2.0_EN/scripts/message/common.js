$(function () {
    $('.chkAll').live('click', function () {
        if ($(this).attr('checked')) {
            $('.chkId').attr('checked', true);
            $('.chkAll').attr('checked', true);
        } else {
            $('.chkId').attr('checked', false);
            $('.chkAll').attr('checked', false);
        }
    });
});

function chkIdClick() {

    $('.chkId').click(function () {
        if ($(this).attr('checked')) {
            var chk = true;
            $('.chkId').each(function () {
                if (!$(this).attr('checked')) {
                    chk = false;
                }
            });
            $('.chkall').attr('checked', chk);
        }
        else {
            $('.chkall').attr('checked', false);
        }
    });
}