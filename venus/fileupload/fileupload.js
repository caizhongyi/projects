!(function( $ ){

//  processData: false,  // 告诉jQuery不要去处理发送的数据
//  contentType: false   // 告诉jQuery不要去设置Content-Type请求头

    var defaults = {
        $el   : '',
        url   : '',
        preview : '.fileupload-preview',
        uploadBtn : '.fileupload-btn',
        submitBtn : '.fileupload-submit',
        source : [],
        maxCount:  5,
        maxSize : 1024 * 4,
        postParams : {},
        message : function(msg){
            window.alert(msg)
        },
        virtualDelete : true,
        onComplete : function( data ){},
        onError : function( data ){},
        onSuccess : function( data ){},
        onDeleteComplete : function( data ){},
        onDeleteError : function( data ){},
        onDeleteSuccess : function( data ){}
        // callback : function(){}
    }

    /**
     * html5 ajax多文件上传
     * @module jQuery
     * @class FileUpload
     * @params selector {string|object} 元素，选择器
     * @params options
     * @params options.url {string} 提交地址
     * @params options.preview {string} 预览显示容器，选择器
     * @params options.submitBtn {string} 上传按钮，选择器 。
     * @params options.uploadBtn {string} 选择文件按钮，选择器 。 当submitBtn 为空时 uploadBtn
     * @params options.source {array} 初始数据 [{ name : '1.jpg' , src : '1.jpg'}]
     * @params options.onComplete {function} 上传完成，无论成功失败
     * @params options.onError {function} 上传失败
     * @params options.onSuccess {function} 上传成功
     * @params options.onDeleteComplete {function} 删除完成，无论成功失败
     * @params options.onDeleteError {function} 删除失败
     * @params options.onDeleteSuccess {function} 删除成功
     */
    var FileUpload = function( selector , options ){
        this.options = $.extend({} , defaults  , options );
        this.$elem = $(selector);
        this.$preview = $(this.options.preview , this.$elem );
        this.$submit = $(this.options.submitBtn , this.$elem );
        this.selectedFiles = {} ;
        this.uploadedFiles = {} ;
        this.init();
    };

    FileUpload.prototype = {
        constructor : FileUpload,
        init : function(){
            var self = this;
            this.deferred = $.Deferred();

            this.$file = this.$elem.find(':file').off('change.fileupload').on('change.fileupload',function(e){
                var files = {} ;
                for ( var i = 0 ; i < e.target.files.length ; i ++ ){
                    files[ self.guid() ] = { source : e.target.files[i] };
                }
                self.add( files )

            })
            this.$preview.off('click.fileupload').on('click.fileupload','.icon-del',function(e){
                self.deleteFile( $(this).closest('li').data( 'file' ) );
            }).on('click.fileupload','.icon-error',function(e){
                self.uploadFile( $(this).closest('li').data( 'file' ) );
            });
            this.$submit.off('click.fileupload').on('click.fileupload',function(e){
                self.uploadFiles();
            });

            this.defaultFiles( this.options.source );

            return this;
        },
        guid : function(){
            return  parseInt( Math.random() * 1000 + new Date().getTime() ) ;
        },
        getCount : function(){
            var count = 0 ;

            for(var i in this.uploadedFiles ){
                count ++ ;
            }
            for(var i in this.selectedFiles ){
                count ++ ;
            }
            return count ;
        },
        defaultFiles : function( files ){
            for(var i = 0; i < files.length ; i ++ ){
                var id = this.guid();
                this.uploadedFiles[ id ] = files[i] ;
                files[i].uid = id;
                this.render( files[i] );
            }
            return this;
        },
        add: function( files ){
            var self = this;

            for(var i in files ){

                if( this.getCount() > this.options.maxCount - 1 ){
                    this.options.message.call(  self , '上传文件不得超过' + this.options.maxCount + '张');
                    return this ;
                }

                var file = files[i]

                if( file.source.size &&  ( file.source.size / 1024)> this.options.maxSize ){
                    this.options.message.call( self , '上传文件大小不得超过' + (this.options.maxSize / 1024) + 'M');
                    continue;
                }

                self.selectedFiles[i] = file ;
                file.uid = i ;
                this.render( file );
            }

            return this;
        },
        addItem : function( file , img ){
            var $li = $('<li class="fade"/>'),
                $item = $('<div class="fileupload-item"></div>'),
                $loading = $('<div class="uploading"></div>'),
                $progress = $('<div class="progress"><i></i></div>'),
                $complete = $('<i class="icon-success"></i>'),
                $error = $('<a class="icon-error" href="javascript:;">上传失败,点击重新上传</a>'),
                $errorDelete = $('<i class="icon-error-del">删除失败</i>'),
                $input = $('<input type="hidden" name="images">'),
                $del = $('<a href="javascript:;" class="icon-del"></a>');

            $li.append( $item.append( img ))
                .append($del)
                .append($loading)
                .append($complete)
                .append($error)
                .append($errorDelete)
                .append($input)
                .append($progress);

            if( img.width () > img.height() ){
                img.css({
                    "margin-top" : ( $li.height() - img.height()) / 2
                })
            }
            else{
                img.css({
                    height: "100%",
                    width : 'auto'
                })
            }
            $li.appendTo(this.$preview).data( 'file', file );
            if( !file.$elem ) file.$elem = $li ;

            var s = $.extend( {} ,file);
            delete s.$elem;
            $input.val( JSON.stringify( s ) );
            setTimeout(function(){ $li.addClass('in'); },100);
            return this;
        },
        render : function( file ){

            var self = this;

            if( file.source ) {
                if (window.URL) {
                    //File API
                    //alert(files[0].name + "," + files[0].size + " bytes");
                    var $img = $('<img>').attr('src', window.URL.createObjectURL( file.source )).on('load', function () {
                        window.URL.revokeObjectURL(this.src); //图片加载后，释放object URL
                    });
                    this.addItem( file ,$img );
                } else if (window.FileReader) {
                    //opera不支持createObjectURL/revokeObjectURL方法。我们用FileReader对象来处理
                    var reader = new FileReader();
                    reader.readAsDataURL( file.source );
                    reader.onload = function (e) {
                        //alert(files[0].name + "," +e.total + " bytes");
                        var $img = $('<img>').attr('src', this.result);
                        self.addItem( file, $img );
                    }
                }
                if (!this.$submit.length) {
                    this.uploadFile( file );
                }
            }
            else{
                self.addItem( file, $('<img>').attr('src' , file.url ));
                var s = $.extend( {} ,file);
                delete s.$elem;
                file.$elem.find(':hidden').val( JSON.stringify( s ));
            }
        },
        loading : function( file ){
            file.$elem.find('.uploading').addClass('in');
            return this;
        },
        unloading : function( file ){
            file.$elem.find('.uploading').removeClass('in');
            return this;
        },
        post : function( url , data ,callback ){
            var self = this;
            var def = $.Deferred();
            var xhr = new XMLHttpRequest();
            callback = callback || {} ;

            xhr.upload.addEventListener("progress", function(e){
                callback.progress( e );
            }, false);
            xhr.addEventListener("load", function(e){
                var data = JSON.parse(xhr.responseText || "{}" );
                callback.success( data , e );
                def.resolveWith( data , e);
            }, false);
            xhr.addEventListener("error", function(e){
                var data = JSON.parse(xhr.responseText || "{}");
                callback.error( data , e);
                def.rejectWith( data , e);
            }, false);
            xhr.addEventListener("abort", function(e){
                var data = JSON.parse(xhr.responseText || "{}");
                callback.abort( data , e);
                def.rejectWith( data , e);
            }, false);

            xhr.open("POST",  url );
            xhr.send( data );

            return def.promise();
        },
        deleteFile : function( file ){
            var self = this;
            var data = JSON.parse( file.$elem.find(':hidden').val() )

            var fd = new FormData();

            for(var i in data){
                fd.append(i, data[i] );
            }

            if( this.options.virtualDelete ){
                delete self.uploadedFiles[ file.uid ] ;
                delete self.selectedFiles[ file.uid ] ;
                file.$elem.remove();
                self.options.onDeleteSuccess && self.options.onDeleteSuccess.call(self, data);
                self.options.onDeleteComplete && self.options.onDeleteComplete.call(self, data);
                return this;
            }

            this.loading( file );
            return this.post( this.options.url , fd , {
                success : function( data ){
                    if( !data.error  ) {
                        delete self.uploadedFiles[file.uid];
                        delete self.selectedFiles[file.uid];
                        file.$elem.remove();
                        self.options.onDeleteSuccess && self.options.onDeleteSuccess.call(self, data);
                    }
                    else{
                        self.options.onDeleteError && self.options.onDeleteError.call( self ,data );
                    }
                    self.options.onDeleteComplete && self.options.onDeleteComplete.call(self, data);
                    self.unloading( file );
                },
                error : function( data ){
                    self.options.onDeleteError && self.options.onDeleteError.call( self ,data );
                    self.options.onDeleteComplete && self.options.onDeleteComplete.call( self ,data );
                    self.unloading( file );
                },
                progress : function( data , e ){

                },
                abort : function( data , e ){
                    self.options.onDeleteError && self.options.onDeleteError.call( self ,data );
                    self.options.onDeleteComplete && self.options.onDeleteComplete.call( self ,data );
                    self.unloading( file );
                }
            });
        },
        uploadFile : function( file ){
            var self = this;
            var fd = new FormData();
            for(var i in this.options.postParams){
                fd.append(i, this.options.postParams[i] );
            }
            fd.append("file", file.source );
            self.loading( file );
            return this.post( this.options.url , fd , {
                success : function( data ){
                    if( !data.error  ){
                        var s = $.extend( {} ,file);
                        delete s.$elem;

                        data.file = s;
                        self.uploadedFiles[ file.uid ] = self.selectedFiles[ file.uid ];
                        delete self.selectedFiles[file.uid ];

                        file.$elem.find('img').attr('src' , data.url );

                        file.$elem.find(':hidden').val( JSON.stringify( data ) );
                        data.file = file;
                        self.options.onSuccess && self.options.onSuccess.call( self ,data );
                        file.$elem.removeClass('error').addClass('success');
                    }
                    else{
                        file.$elem.addClass('error');
                        self.options.onError && self.options.onError.call( self ,data );
                    }
                    self.options.onComplete && self.options.onComplete.call( self ,data );
                    //self.options.callback && self.options.callback( self ,data );
                    self.unloading( file );
                },
                error : function( data ){
                    file.$elem.addClass('error');
                    self.options.onError && self.options.onError.call( self ,data );
                    self.options.onComplete && self.options.onComplete.call( self ,data );
                    // self.options.callback && self.options.callback( self ,data );
                    self.unloading( file );
                },
                progress : function( e ){
                    var percentComplete = Math.round(e.loaded * 100 / e.total);
                    var $progress = file.$elem.find('.progress i').css('width', percentComplete.toString() + '%');
                    if( percentComplete == 100 )
                        $progress.hide()
                },
                abort : function( data , e ){
                    file.$elem.addClass('error');
                    self.options.onError && self.options.onError.call( self ,data );
                    self.options.onComplete && self.options.onComplete.call( self ,data );
                    // self.options.callback && self.options.callback( self ,data );
                    self.unloading( file );
                }
            });

        },
        uploadFiles : function(){
            for( var i in this.selectedFiles){
                this.uploadFile( this.selectedFiles[i]  );
            }
            return this;
        },
        isCompleted : function(){
            for( var i in this.selectedFiles ){
                if( this.selectedFiles.deferred && this.selectedFiles.deferred.state() != 'resolved')
                    return false;
            }
            return true;
        }
    }


    $.fn.fileUpload = function ( options ) {
        var args = arguments;

        return $( this ).each(function(){
            var data = $(this).data('FileUpload');

            if(!data ){
                data = new FileUpload( this , options );

                $(this).data('FileUpload' , data);
            }

            var g = [];
            for( var i = 1 ; i < args.length ; i ++ ){
                g.push(args[i]);
            }

            // TODO 构造函数
            var fn = new Function( 'data' , 'options' , 'args' ,'return data[ options ](args)');

            options && data[ options ] && fn( data , options , g.join(','));

        })
    }

    $.fn.fileUpload.Constructor =  FileUpload;

    if( typeof module === "object" && typeof module.exports === "object"  ){
        module.exports = FileUpload;
    }
})( jQuery );