/*
����:
<script type="text/javascript" src="../js/jquery/jquery-1.5.js"></script>
*/
;(function ($) {

    $.fn.fun = function (options) {
	
        var self=this;   //���������Ψһ������
        var defaults=
        {
             //����
        };

        if (options) {
            $.extend(defaults, options);
        };
        
		//����
       
        return this;
    }


})(jQuery);