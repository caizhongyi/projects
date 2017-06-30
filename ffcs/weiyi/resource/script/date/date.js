$(function() {
    $('#date-range').daterangepicker({
        format: 'YYYY-MM-DD HH:mm:ss',
        startDate: $(':hidden[name=start]').val(),
        endDate: $(':hidden[name=end]').val(),
        locale: {
            applyLabel: '确定',
            cancelLabel: '取消',
            fromLabel: '从',
            toLabel: '至',
            weekLabel: '周',
            customRangeLabel: '日期范围',
            daysOfWeek: moment()._lang._weekdaysMin.slice(),
            monthNames: moment()._lang._monthsShort.slice(),
            firstDay: 0
        },
        timePicker:true,
        timePickerIncrement: 1,
        timePicker12Hour : false,
        buttonClasses : ['btn', 'btn-sm']
    }, function(start, end){
        $('#date-range .date-title').html(start.format('YYYY-MM-DD HH:mm:ss') + ' 至 ' + end.format('YYYY-MM-DD HH:mm:ss'));
        $(':hidden[name=start]').val(start.format('YYYY-MM-DD HH:mm:ss'));
        $(':hidden[name=end]').val(end.format('YYYY-MM-DD HH:mm:ss'));
    });
});
function range(days) {
    var start = moment().add('days', 0 - days).format('YYYY-MM-DD HH:mm:ss');
    var end = moment().format('YYYY-MM-DD HH:mm:ss');
    $('#date-range .date-title').html(start + ' 至 ' + end);
    $(':hidden[name=start]').val(start);
    $(':hidden[name=end]').val(end);
    $('form[method=get]')[0].submit();
}