$(function () {
    $('.chkall').live('click', function () {
        $('.chkId').attr('checked', $(this).attr('checked'));
        $('.chkall').attr('checked', $(this).attr('checked'));
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