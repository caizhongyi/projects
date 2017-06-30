(function($) {
    $.fn.initList = function( options ){
        var defaults = {
            _data: null,
            _k1: null,
            _k2: null
        }
        var opts = $.extend( defaults,options );
        var cms_images = [];

        if( opts._data ){
            for( o in opts._data ){
                var _img = {};
                _img.thumb = opts._data[o].smallImgPath;
                _img.image = opts._data[o].bigImgPath;
                _img.alt = opts._data[o].description;
                _img.url = opts._data[o].bigImgPath;
                _img.title = opts._data[o].title;
                _img.id = opts._data[o].id;

                cms_images[o] = _img;
            };

            if( opts._k1 ){
                var str = '';
                for( i = cms_images.length-1; i >= 0; i-- ){
                    str += '<li><a hidefocus="true" picid=' + cms_images[i].id + ' href="' + cms_images[i].image + '*' + cms_images[i].url + '" title="' + cms_images[i].title + '"><img src="' + cms_images[i].thumb + '"  title="' + cms_images[i].alt + '"  /><span>' + (cms_images.length-i) + '/' + (cms_images.length) + '</span></a></li>';
                };
                str += '<li><a hidefocus="true" href="http://i3.static.olcdn.com/js/grouppic2013129/more.gif"><img src="http://i3.static.olcdn.com/js/grouppic2013129/more.gif" width="78" height="58"  /><span></span></a></li>';

                $( 'ul.ad-thumb-list' ).html( str );
            };

            if( opts._k2 ){
                var str = '';
                for(  i = cms_images.length-1; i >= 0; i-- ){
                    str += '<div class="ad-item findgame clearfix">';
                    str += '      <div class="findgamepic"><img src="' + cms_images[i].thumb + '" width="120" height="160" /></div>';
                    str += '      <div class="findgamelist fs12"><a href="' + cms_images[i].url + '" title="' + cms_images[i].title + '">' + cms_images[i].alt + '</a></div>';
                    str += '    </div>';
                };
                $( '.picall' ).html( str );
            };

            $('.ad-gallery').adGallery_modify({
                lastdiv:'.ad-lookpic',
                ckpic:'.ad-chakan',
                showList:{
                    btnHD:'#btn-hd',
                    btnLB:'#btn-lb',
                    listCNT:'.ad-list-wrapper',
                    listItem:'.ad-item',
                    itemON:'findgame_on',
                    itemOFF:''
                }
            });
        };

        if( opts._k2 ) {
            if( imageGroup ){
                var emptypic = 'http://i3.static.olcdn.com/js/grouppic2013129/y0712wydgtj02.jpg';
                var emptyurl = '';

                $( '.news-tul-pic a' ).attr( {href:( (imageGroup.infoPreImgGrpUrl==null || imageGroup.infoPreImgGrpUrl=='')?emptyurl:imageGroup.infoPreImgGrpUrl)} );
                $( '.news-tul-pic img' ).attr( {src:((imageGroup.infoPreCoverImg==null || imageGroup.infoPreCoverImg=='')?emptypic:imageGroup.infoPreCoverImg)} );
                $( '.news-tur-pic a' ).attr( {href:((imageGroup.infoNextImgGrpUrl==null || imageGroup.infoNextImgGrpUrl=='')?emptyurl:imageGroup.infoNextImgGrpUrl)} );
                $( '.news-tur-pic img' ).attr( {src:((imageGroup.infoNextCoverImg==null || imageGroup.infoNextCoverImg=='')?emptypic:imageGroup.infoNextCoverImg)} );

                $('#share_params').val( 'charset=gbk&channelId=' + imageGroup.channelId + '&shareType=1&newsId=' + imageGroup.newsId );
             //   $( '#btn-commments').attr( {href:'http://comment1.news.17173.com/v2/f/comment/view/10009.html?id='+imageGroup.infoCommentHref.split('#')[2]} );
            };

            new $.fn.comments();
        }
    };

    $.fn.comments = function( options ){
        var defaults = {
            cmmURL: '',
            subURL: '',
            tid:null || imageGroup.infoCommentHref.split('#')[2]
        }
        var opts = $.extend( defaults,options );
        this.init( opts );
    }

    $.fn.comments.prototype = {
        init: function( opts ){
            var $this = $( this );
            $.ajax({
                type: "GET",
                url: opts.cmmURL,
                data: {callback:'?',topicId:opts.tid,pageNo:'1',pageSize:'10',templateType:'moblie'},
                dataType:'jsonp',
                success: function( msg ){
                    //var json = eval( '(' + msg + ')' );
                    $( '#btn-commments strong' ).html( msg.topic.commentCount );
                }
            });

            $( '.btn-pl' ).click( function(){
                $( '.fbpl-c-1' ).hide();
                $( '.fbpl-c-2' ).show();
                var cont = document.all? $('textarea.textareaf').text():$('textarea.textareaf').val();
                $.ajax({
                    type: "GET",
                    url: opts.subURL,
                    data: {callback:'?',topicId:opts.tid,content:cont},
                    dataType:'jsonp',
                    success: function(msg){
                        $( '#btn-commments strong' ).html( parseInt( $( '#btn-commments strong' ).text())+1 );
                        $( '.fbpl-c-1' ).show();
                        $( '.fbpl-c-2' ).hide();
                        alert( '\u63d0\u4ea4\u6210\u529f' );
                      //  window.open('http://comment1.news.17173.com/v2/f/comment/view/10009.html?id='+opts.tid,'_blank');
                    },
                    error: function(t){
                        $( '.fbpl-c-1' ).show();
                        $( '.fbpl-c-2' ).hide();
                        alert( '\u63d0\u4ea4\u5931\u8d25' );
                    }
                });

                return false;
            } );

            $( '#btn-commments' ).hover( function(){
                $( '.fbpl' ).show();
            },function(){
                $( '.fbpl' ).hide();
            } );

            $( '.fbpl' ).hover( function(){
                $( '.fbpl' ).show();
            },function(){
                $( '.fbpl' ).hide();
            } );
        }
    };
})(jQuery);