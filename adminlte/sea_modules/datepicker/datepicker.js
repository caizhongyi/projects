/**
 */
define(function (require, exports, module) {
    require('sea_modules/datepicker/jqui/external/jquery/jquery.js');
    //require('sea_modules/jquery/1.9.1/jquery.js');
    require('sea_modules/datepicker/jqui/jquery-ui.js');

    $('input[date-trigger="datepicker"]').datepicker({
        dateFormat: 'yy-mm-dd',
        inline: true
    });
});

