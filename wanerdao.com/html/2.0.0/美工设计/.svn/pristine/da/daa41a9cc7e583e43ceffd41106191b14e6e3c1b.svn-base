/*
  公共库
 */
(function(){

    var path = location.href;

        path=path.substring(0,path.lastIndexOf("/html/") + 6);
       // path=path.substring(0,path.length-2);
       // path=path.substring(0,path.lastIndexOf("/")+1);
     var root = path + '/scripts/';
      var libs = [
       // 'global.js',
        'jquery-ui-1.8.11.custom.min.js',
      //  'jquery.ui.core.min.js',
        'jquery.core.js',
        'jquery.center.js',
       // 'jquery.ui.draggable.js',
        'jquery.ui.overlay.js',
        'jquery.ui.dialog.js',
        'jquery.ui.tabs.js',
        'jquery.ui.accordion.js',
        'jquery.switchover.js',
        'jquery.floatbox.js',
        'gotop.js',
          //'jquery.ui.datepicker.js',
        'jquery.chosen/jquery.chosen.js',
        'pop.js'
      ]

    for(var i = 0 ; i< libs.length ; i++){
        document.write('<script type="text/javascript" src="'+ root + libs[i] +'"><\/script>');
    }

})()