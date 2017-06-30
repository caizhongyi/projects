(function(wgt){
    var wgt = wgt || {};
    var carousel = null;
    wgt.hotMobile = {
        init:function(){
            var self = this;
            self.$pro_select_title = $(".pro_select_title");
            self.$bbxq = $("#bbxq");
            self.$bbxq_goTop = $("#bbxq_goTop");
            self.$bbpl = $("#bbpl");
            self.$bbpl_goTop = $("#bbpl_goTop");
            self.$pro_intro = $("#pro_intro");
            self.$window = $(window);

            self.$pic_list = $("#pic_list");
            self.$pro_title = $("#pro_title");
            self.$pro_intro = $("#pro_intro"); 
            self.$pro_price = $("#pro_price");
            self.$numberPrice = $("#numberPrice");
            self.$pro_sales = $("#pro_sales");
            self.$changeColor = $("#changeColor");
            self.$pro_video_pic = $("#pro_video_pic");
            self.$pro_video_link = $("#pro_video_link");
            self.$hyjh_list = $("#hyjh_list");
            self.$hyxx = $("#hyxx");
            self.$hyxx_title = $("#hyxx_title");
            self.$number_types = $("#number_types");
            self.$video_play_bg = $("#video_play_bg");
            self.$btn_wydp = $("#btn_wydp");
            self.detailImage = "";
            self.compareInfo = "";
            self.lastTime = "";
            self.getphoneurl = $("#getphoneurl");

            

            self.loadDetails = false;
            self.loadComment = false;
            self.commentHasNextPage = true;

            self.searchData = wgt.getSearch(); //对象

			self.commentPage = {
		        "pageSupport.pagesize" : 5,
		        "pageSupport.page" : 1,
           		"phoneId" : self.searchData.id
		    }
		    
            self.bind();
            self.getData();
        },
        ajaxGET:function (url, data, fn) {
            $.ajax({type:"GET", dataType:'json', context:this, url:url, data:data, success:fn});
        },
        ajaxPOST:function (url, data, fn) {
            $.ajax({type:"POST", dataType:'json', context:this, url: common.getAbsPath(url), data:data, success:fn});
        },
        getPrestorePrice: function(){
        	var self = this;
        	var prestore = 0;
        	
        	if($("#number_list [name='number']:checked").length == 0 || self.$number_types.find("a.cur").length == 0){
        		return prestore;
        	}
	        prestore = parseInt(self.$number_types.find("a.cur").attr("prestore"));


           	self.cntPhone.price = parseInt(self.$pro_price.attr("price")) + prestore;
           	return prestore;
        },
        
        bind:function(){
            var self = this;
            self.$pro_select_title.click(function(){
                var $this = $(this);

                if(this.id == "bbxq_title" && !self.loadDetails){
                    self.getDetails();
                    return;
                }

                if(this.id == "bbpl_title" && !self.loadComment){
                    self.searchComments(true, true);
                    return;
                }
                
                if($this.next("div").is(":hidden")){
                    $this.next("div").slideDown("fast");
                    $this.addClass("opened");
                }else{
                    $this.next("div").slideUp("fast");
                    $this.removeClass("opened");
                }
                self.scrollToHere($this);

            });
            
            $("#publishComment").click(function(){
            	var params = {};
            	params.author = $.trim($("#author").val());
            	params.content = $.trim($("#content").val());
            	if(!params.author){
            		$.error_pop("温馨提示","评论名字不能为空!",function(){
            			$("#author").focus();
            		});
            		return false;
            	}
            	if(!params.content){
            		$.error_pop("温馨提示","评论内容不能为空!",function(){
            			$("#content").focus();
            		});
            		return false;
            	} else if(common.getStrLength(params.content) > 300){
            		$.error_pop("温馨提示","评论内容不能超出300个字符!",function(){
            			$("#content").focus();
            		});
            		return false;
            	}
            	params.content
                self.ajaxPublishComment && self.ajaxPublishComment.abort();
            	//self.ajaxGetDetails = self.ajaxPOST("data/details.json", self.searchData, function(data){
            	params = $.extend(params, self.commentPage, {"pageSupport.page": 1});
				self.ajaxPublishComment = self.ajaxPOST ('/comment/commentAction!save.action', params, function(json){
					//alert(json.success);
					if(json.success){
            			$("#author").val("");
            			$("#content").val("");
						self.commentPage["pageSupport.page"] = 1;
                        $("#comment_list").html("");
						self.fillComment(json);
	                    $.error_pop("温馨提示","评论发布成功", function(){
							$("#dp").hide();
                			self.scrollToHere($("#bbpl_title"));
	                    });
					}
				});
            });
            
            $("#number_list [name='number']").live("change", function(){
            	var prestore = self.getPrestorePrice();
            	self.cntPhone.price = parseInt(self.$pro_price.attr("price")) + prestore;
            	self.$numberPrice.html("（加上了号码费用"+prestore+"元）");
			    self.$pro_price.html(self.cntPhone.price);
            });

            $.merge(self.$bbxq_goTop, self.$bbpl_goTop).click(function(event){
                event.preventDefault();
                $(this).fadeOut("fast");
                $(this).parent().siblings(".pro_select_title").click();
            });
            
            var timer = 0;
            self.$window.scroll(function(){
                if(!timer) {
                    timer = setTimeout(function(){
                        self.checkBbxqScrollPosition();
                        self.checkBbplScrollPosition();
                        //$("div.header").css("top", "0px");
                        //alert($("div.header").css("top"));
                        /*
                        if($(window).scrollTop() < 100){
	            			$("#author,#content").blur();
	            			alert(123);
                        }
                        */
                        timer = 0;
                    },10);
                }
            });

            $("#number_types>a").live("click",function(){
            	var $this = $(this);
                if(self.searchData.prestore == $(this).attr("prestore")){
                    return;
                }
                self.searchData.prestore = $(this).attr("prestore");
                $(this).addClass("cur").siblings().removeClass("cur");
                self.getNumber();
                //console.log(1);
            });

            $("#btn_change_number").click(function(){
                self.getNumber();
            });

            $("#hyjh_list input").live("click",function(){
                var value = $(this).val();
                if(self.searchData.hyjh == value){
                    return;
                }
                self.searchData.hyjh = value;
                self.getHyxx(this);//获取合约信息
                //console.log(self.searchData.hyjh);
                //console.log(1);
            });
            
            

            $("#changeColor>a").live("click",function(event){
                event.preventDefault();
                /* if(self.searchData.id == this.id){
                    return;
                };*/
                $(this).addClass("cur").siblings().removeClass("cur");
                $(".pro_select_title").removeClass("opened");
                $(".pro_select_main").slideUp("fast");
                self.loadDetails = false;
                self.searchData.prestore = "";
                self.searchData.hyjh = "";
                self.searchData.id = this.id;
                self.commentPage["phoneId"] = this.id;
                self.music_play = false;
                self.$video_play_bg.removeClass("pause");
                $("#comment_list").html("");
                self.loadComment = false;//已加载详情
                self.getData();
                //console.log(1);
            })
            
            /*购买验证*/
            $("#submitBtn").click(function(event){
                event.preventDefault();
                self.addOrder();
            });
            
            /*添加到购物车*/
            $("#addShopcartBtn").click(function(event){
                self.addOrder();
            });

            self.$pro_video_link.click(function(){
                if(!self.music_play){
                    self.music_play = true;
                    self.$video_play_bg.addClass("pause");
                    $("#player").find("audio")[0].play();
                }else{
                    self.music_play = false;
                    self.$video_play_bg.removeClass("pause");
                    $("#player").find("audio")[0].pause();
                }
            });

            self.$btn_wydp.click(function(){
				$("#dp").show();
                $("#author").focus();
            });
            $("#author").live("focus",function(){
                self.scrollToHere($("#dp"));
            });
            $("#content").live("focus",function(){
                self.scrollToHere($("#dp"));
            });
            
            $("#btn_more").click(function(){
            	if(self.commentHasNextPage === true){
					self.commentPage["pageSupport.page"]++;
					self.searchComments(false);
            	}
            });

        },
        
        addOrder: function(isAddCart){
        	var self = this;
        	var orderInfo = new Object();
            var hyjh = '';
            if(!$("#hyjh_list input").is(":checked")){
                 $.error_pop("温馨提示","请选择合约计划",function(){
                     self.scrollToHere($("#hyjh_title"));
                 });
                 return;
             }

             if(!$("#number_list input").is(":checked")){
                 $.error_pop("温馨提示","请选择号码",function(){
                     self.scrollToHere($("#hmxz_title"));
                 });
                 return;
             }
            var hyjh = $("#hyjh_list input:checked").val();//合约id
            var phone = $("#number_list input:checked").val();//电话号码
            var color = $("#changeColor").find(".cur").text();//颜色
            var count = 1;
            var id = $("#id").val();
            var token = $("#token").val();
            var submit = 1;
            var phone_price = parseInt(self.$number_types.find("a.cur").attr("prestore"));

        	// 参入后台的参数对象
    		var params = new Object();
            params.hyjh = hyjh;
            params.phone = phone;
            params.color = color;
            params.count = 1;
            params.token = token;
            params.submit = "1";
            params.id = id;
            params.phone_price = phone_price;
            var car_url = $('#car_url').val();
            var pay_url = $('#pay_url').val();

        	self.ajaxPOST(car_url, params, function(json){
            	if (json.type="success") {
            		window.location.href=pay_url;
            	} else {
            		$.error_pop("温馨提示", json.message);
            	}
        	});
        },
        
        scrollToHere:function($obj){
            var self = this;
			$("html,body").animate({"scrollTop":$obj.offset().top - 45},"fast");
        },
        checkBbxqScrollPosition:function(){
            var self = this;
            if($("#bbxq_title").hasClass("opened") && self.$window.scrollTop() > self.$bbxq.offset().top) {
                self.$bbxq_goTop.show();
                if(self.$window.scrollTop() > self.$bbxq.offset().top - self.$window.height() + self.$bbxq.height() + 24){
                    self.$bbxq_goTop.css({"position":"absolute","right":"10px"});
                }else{
                    self.$bbxq_goTop.css({"position":"fixed","right":"11px"});
                }
            }else{
                self.$bbxq_goTop.hide();
            }
            
        },
        checkBbplScrollPosition: function(){
            var self = this;
                        
            if($("#bbpl_title").hasClass("opened") && self.$window.scrollTop() > self.$bbpl.offset().top) {
            	//console.log(3);
            	
                self.$bbpl_goTop.show();
                //alert(1);
                if(self.$window.scrollTop() > self.$bbpl.offset().top - self.$window.height() + self.$bbpl.height() + 24){
                	//alert(3);
                	//console.log(5);
                    self.$bbpl_goTop.css({"position":"absolute","right":"10px"});
                }else{
                	//alert(6);
                	//console.log(6);
                    self.$bbpl_goTop.css({"position":"fixed","right":"11px"});
                }
            }else{
            //console.log(4);
                self.$bbpl_goTop.hide();
                //alert(2);
            }
        },
        check_pro_intro:function(){
            var self = this;
            var intro_width = self.$pro_intro.width();
            var intro_parent_width = self.$pro_intro.parent().width();
        },
        getData:function(){
            var self = this;
            self.cntPhone = {};
            self.ajaxGetData && self.ajaxGetData.abort();
            self.ajaxGetData = self.ajaxPOST('/hotModel/hotModelManage!searchCntPhoneDetail.action', self.searchData, function(json){
        		if(!json.success){
        			return false;
        		}
                var data = json.data;
                /*轮换图片填充开始*/
                var pic_list_html = "";
 	            $.each(json.data, function(i, cntPhoneCarImage){
 	                pic_list_html += '<li class="pic"><img src="'+ util.getWebRoot() + cntPhoneCarImage.url + '" alt="" /></li>';
 	            });
                /*轮换图片填充结束*/
                self.$pic_list.html(pic_list_html);//填充滚动图片内容

 	            var pro_colors_html = "";
 	           $.each(json.data1, function(i, cntPhone){
 	            	if (cntPhone.phoneId == self.searchData.id) {
 	            		self.cntPhone = cntPhone;
 			           	self.$pro_title.html(cntPhone.name + " " + cntPhone.color);
 			           	self.compareInfo = cntPhone.compareInfo;
 			           	self.lastTime = cntPhone.lastTime;
 			            self.$pro_intro.html(cntPhone.dec);
 			            self.$pro_price.html(cntPhone.price);
 			            self.$pro_price.attr("phonePrice", cntPhone.price);
 			            self.$pro_price.attr("price", cntPhone.price);
 			            self.$numberPrice.html("");
 			            self.$pro_sales.html(cntPhone.sales);
 			            
		                //初始化图片展示=============
		                //carousel = new Carousel('picWrap')

                        // ========================
		                if(cntPhone.girlImage && cntPhone.oggIntroPath){
	                		self.$pro_video_pic.attr("src",util.getWebRoot() + cntPhone.girlImage).show();
			                $("#player").html("").append('<audio controls="controls" id="pro_video_play">\
			                    <source src="' + util.getWebRoot() + cntPhone.oggIntroPath + '" type="audio/ogg">\
			                    <source src="' + util.getWebRoot() + cntPhone.mp3IntroPath + '" type="audio/mpeg">\
			                    </audio>');
		                	$("#pro_video_link").show();
			                $("#player").find("audio")[0].load();
		                }else{
		                	$("#pro_video_link").hide();
		                }

		                self.$pro_video_play = $("#pro_video_play");
		                self.$pro_video_play.bind("ended",function(){
		                    self.music_play = false;//当视频播放完触发该事件
		                    self.$video_play_bg.removeClass("pause");
		                });
		                
						self.detailImage = util.getWebRoot() + cntPhone.detailImage;
 	            	}
 	            	var color_html = '<a href="javascript:;" class="' 
 	                				+ (cntPhone.phoneId == self.searchData.id ? 'cur' : '') 
 	                				+ '" id="' + cntPhone.phoneId +'">' 
 	                				+ cntPhone.color + '<i></i></a>';
          			//var color_html = '<a href="#" class="' + (cntPhone.phoneId == self.searchData.id ? 'cur' : '') +'" id="' + cntPhone.phoneId +'">' + data["pro_colors"][i]["pro_colors_name"] + '<i></i></a>';
 	                pro_colors_html += color_html;
 	            });
                /*
                self.$pro_title.html(data.pro_name_title);//填充标题
                self.$pro_intro.html(data.pro_name_info);//填充副标题
                self.$pro_price.html(data.pro_price);//填充价格
                self.$pro_sales.html(data.pro_sales);//填充销量*/

                /*颜色列表填充*/
                self.$changeColor.html(pro_colors_html);
                /*颜色列表结束*/

                var hyjh_list_html = "";
                var count = 0;
				$.each(json.data2, function(i, list){
					//hyjh_list_html += '<li><label><input type="radio" dealMoeny="'+list.dealMoeny+'" compareImage="' + (list.compareImage ? list.compareImage : "") + '" agreedPeriod="' + list.agreedPeriod + '" value="' + list.ofrName+"  "+ list.contractDec+","+list.contractId+","+list.ofrId+","+'月租(元)：'+list.price+","+'国内通话时长(分钟)：'+list.freeTalkTime+","+'国内上网流量(M)：'+list.freeInternetTraffic+","+'国内短信(条)：'+list.freeSms+","+'国内WIFI上网时长(分钟)：'+list.freeWifiDuration+","+'超出套餐之外的国内通话收费标准(元/分钟)：'+list.afterCalls+","+'超出流量后的流量收费标准(元/M)：'+list.afterTraffic+","+'超出套餐之外的短信收费标准(元/条)：'+list.afterSms+',赠送话费(元)：'+list.givingMoney+',首月返还(元)：'+list.firstMonthReturn+',每月返还(元)：'+list.monthlyReturn +(list.contractRedundance1 ? ',第24个月送费(元)：'+list.contractRedundance1 : "") +'" name="tc">' +list.ofrName+"  "+ list.price +'元 <br/>合约期'+list.agreedPeriod+'个月</label></li>';
					//hyjh_list_html += '<li><label><input type="radio" dealMoeny="'+list.dealMoeny+'" compareImage="' + (list.compareImage ? list.compareImage : "") + '" agreedPeriod="' + list.agreedPeriod + '" value="' + list.ofrName+"  "+ list.contractDec+","+list.contractId+","+list.ofrId+","+'月租(元)：'+list.price+","+'国内通话时长(分钟)：'+list.freeTalkTime+","+'国内上网流量(M)：'+list.freeInternetTraffic+","+'国内短信(条)：'+list.freeSms+","+'国内WIFI上网时长(分钟)：'+list.freeWifiDuration+","+'超出套餐之外的国内通话收费标准(元/分钟)：'+list.afterCalls+","+'超出流量后的流量收费标准(元/M)：'+list.afterTraffic+","+'超出套餐之外的短信收费标准(元/条)：'+list.afterSms+',赠送话费(元)：'+list.givingMoney+',首月返还(元)：'+list.firstMonthReturn+',每月返还(元)：'+list.monthlyReturn +'" name="tc">' +list.ofrName+"  "+ list.price +'元 <br/>合约期'+list.agreedPeriod+'个月</label></li>';
					if(list.phoneId == 2 || list.phoneId == 3){
						hyjh_list_html += '<li><label><input type="radio" dealMoeny="'+list.dealMoeny+'" compareImage="' + (list.compareImage ? list.compareImage : "") + '" agreedPeriod="' + list.agreedPeriod + '" value="' + list.ofrName+"  "+ list.contractDec+","+list.contractId+","+list.ofrId+","+'月租(元)：'+list.price+","+'国内通话时长(分钟)：'+list.freeTalkTime+","+'国内上网流量(M)：'+list.freeInternetTraffic+","+'国内短信(条)：'+list.freeSms+","+'国内WIFI上网时长(分钟)：'+list.freeWifiDuration+","+'超出套餐之外的国内通话收费标准(元/分钟)：'+list.afterCalls+","+'超出流量后的流量收费标准(元/M)：'+list.afterTraffic+","+'超出套餐之外的短信收费标准(元/条)：'+list.afterSms+',优惠购机价(元)：2988,预存话费(元)：1400,补贴金额（代金券）(元)：1200,竣工当月返还(元)：200,24个月每月返还(元)：50" name="tc">' +list.ofrName+"  "+ list.price +'元 <br/>合约期'+list.agreedPeriod+'个月</label></li>';
					}else{
						if(list.contractRedundance1){
							hyjh_list_html += '<li><label><input type="radio" dealMoeny="'+list.dealMoeny+'" compareImage="' + (list.compareImage ? list.compareImage : "") + '" agreedPeriod="' + list.agreedPeriod + '" value="' + list.ofrName+"  "+ list.contractDec+","+list.contractId+","+list.ofrId+","+'月租(元)：'+list.price+","+'国内通话时长(分钟)：'+list.freeTalkTime+","+'国内上网流量(M)：'+list.freeInternetTraffic+","+'国内短信(条)：'+list.freeSms+","+'国内WIFI上网时长(分钟)：'+list.freeWifiDuration+","+'超出套餐之外的国内通话收费标准(元/分钟)：'+list.afterCalls+","+'超出流量后的流量收费标准(元/M)：'+list.afterTraffic+","+'超出套餐之外的短信收费标准(元/条)：'+list.afterSms+',赠送话费(元)：'+list.givingMoney+',前3个月送费(元)：'+list.firstMonthReturn+',第4-23个月送费(元)：'+list.monthlyReturn + ',第24个月送费(元)：'+list.contractRedundance1 +'" name="tc">' +list.ofrName+"  "+ list.price +'元 <br/>合约期'+list.agreedPeriod+'个月</label></li>';
						}else{
							hyjh_list_html += '<li><label><input type="radio" dealMoeny="'+list.dealMoeny+'" compareImage="' + (list.compareImage ? list.compareImage : "") + '" agreedPeriod="' + list.agreedPeriod + '" value="' + list.ofrName+"  "+ list.contractDec+","+list.contractId+","+list.ofrId+","+'月租(元)：'+list.price+","+'国内通话时长(分钟)：'+list.freeTalkTime+","+'国内上网流量(M)：'+list.freeInternetTraffic+","+'国内短信(条)：'+list.freeSms+","+'国内WIFI上网时长(分钟)：'+list.freeWifiDuration+","+'超出套餐之外的国内通话收费标准(元/分钟)：'+list.afterCalls+","+'超出流量后的流量收费标准(元/M)：'+list.afterTraffic+","+'超出套餐之外的短信收费标准(元/条)：'+list.afterSms+',赠送话费(元)：'+list.givingMoney+',首月返还(元)：'+list.firstMonthReturn+',每月返还(元)：'+list.monthlyReturn +'" name="tc">' +list.ofrName+"  "+ list.price +'元 <br/>合约期'+list.agreedPeriod+'个月</label></li>';
						}
					}
					count = i;
				});
				if(count % 2 != 1){
					hyjh_list_html += '<li></li>';
				}
                self.$hyjh_list.html(hyjh_list_html);
                
                /*合约计划列表填充开始*/
                /*
                var hyjh_list_html = "";
                var heyue_list = data["heyue"];
                for(var i= 0, len = heyue_list.length; i<len; i++){
                    hyjh_list_html += '<li><label><input type="radio" value="' + heyue_list[i] +'" name="tc">' + heyue_list[i] +'</label></li>';
                };
                self.$hyjh_list.html(hyjh_list_html);*/
                /*合约计划列表填充结束*/

                self.check_pro_intro();   //检查副标题是否需要向左边滚动，如果一行显示不完就滚动，

                /*填充号码选择类别开始*/
                var number_types_html = "";
                var prestores = [50,200,400,800,1200];
                var minConsumes = ["无限制", "39元", "59元", "89元", "129元"];
                for(var i= 0, len = prestores.length; i<len; i++){
                	var prestore = prestores[i];
                	if(i === 0){
                		prestore = 0;
                	}
                    number_types_html += '<a href="javascript:;" minConsume="' + minConsumes[i] +'" prestore="'+ prestore +'">预存' + prestores[i] +'</a>';
                };
                self.$number_types.html(number_types_html).find("a").eq(0).click();
                /*填充号码选择类别结束*/
            })
        },
        getNumber: function(){
            var self = this;
            var curType = $("#number_types>a.cur");
            var numberPageCur;
            if(!curType.attr("numberPageCur")){
            	numberPageCur = parseInt(Math.random() * 1000);
            }else{
            	numberPageCur = parseInt(curType.attr("numberPageCur"));
            }
            curType.attr("numberPageCur", numberPageCur + 1);
            self.searchData.numberPageCur = numberPageCur;
            self.searchData.phoneid = curType.attr("phoneid");
            self.ajaxGetNumber && self.ajaxGetNumber.abort();
            self.searchData.do="getphone"
             self.ajaxGetNumber = self.ajaxPOST (self.getphoneurl.val(), self.searchData, function(json){
            //self.ajaxGetNumber = self.ajaxPOST("data/number.json", self.searchData, function(data){
                /*号码列表填充开始*/
				if(json.data.length>0){
					var minConsume = $("#number_types a.cur").attr("minConsume");
					if(minConsume == "无限制"){
						$("#minConsume").html("<span class='minConsume0'>每月最低消费无限制</span>");//设置号码最低消费
					}else{
						$("#minConsume").html("现在下单，预存话费减半！<br/>每月最低消费<b id='min_consume'>" + minConsume + "</b>");//设置号码最低消费
					}
               		
                	var number_list_html = "";
	            	for(var i=0;i<json.data.length;i++){
	                    number_list_html += '<li><label><input type="radio" name="number" value="' + json.data[i]["number"] +'">' + json.data[i]["number"] +'</label></li>';
	                    //NO_list_html += '<li><span class="list_select_NO_input"><input type="radio" value="' + json.data[t]["number"] +'" name="NO"></span><span class="list_select_NO">' + json.data[t]["number"] +'</span><span class="list_select_money">' + '暂无优惠' +'</span></li>'
	                };
	                if(json.data.length % 2 != 0){
		                number_list_html += '<li></li>';
	                }
	                $("#number_list").html(number_list_html);
	                /*号码列表填充结束*/
                }else{
                 	$("#number_list").html("");
                 	$("#minConsume").html("当前预存项暂时没有号码");//设置号码最低消费
                }
            })
        },
        
        searchComments: function(isClean, open){
			
            var self = this;
            self.ajaxGetComments && self.ajaxGetComments.abort();
            self.ajaxGetComments = self.ajaxPOST ('/comment/commentAction!listComments.action', self.commentPage, function(json){
                self.loadComment = true;//已加载详情
				if(isClean === true){
            		$("#comment_list").html("");
				}
				self.fillComment(json);
				if(open === true){
	                $("#bbpl_title").addClass("opened");
	                $("#bbpl").slideDown("fast");
	                self.scrollToHere($("#bbpl_title"));
				}
            });
        },
        
        fillComment: function(json){
        	var self = this;
	        $("#total").html(json.total);
	        if (json.success) {
                /*填充评论开始*/
	        	var comment_list_html = "";
	            var comment_list = json.data;
	            for(var i= 0, len = comment_list.length; i<len; i++){
	                comment_list_html += '<li '+(i == 0 && self.commentPage["pageSupport.page"] == 1 ? "class='first'" : "")+'>\
	                                            <h3>' + comment_list[i]["content"] +'</h3>\
	                                            <h4>\
	                                                <span class="pl_form">来自：<b>' + comment_list[i]["author"] +'</b></span>\
	                                            </h4>\
	                                        </li>'
	            };
            	$("#comment_list").append(comment_list_html);
				var totalPage = json.total % self.commentPage["pageSupport.pagesize"] == 0 
	           					? json.total / self.commentPage["pageSupport.pagesize"] 
	           					: parseInt(json.total / self.commentPage["pageSupport.pagesize"] + 1);
	            if (self.commentPage["pageSupport.page"] >= totalPage) {
	                self.commentHasNextPage = false;
	                $("#btn_more").addClass("cancelBtn");
	            }else{
	                self.commentHasNextPage = true;
	                $("#btn_more").removeClass("cancelBtn");
	            }
                /*填充评论结束*/
			}
        },
        
        getDetails:function(){
            //console.log(2);
            var self = this;
            self.ajaxGetDetails && self.ajaxGetDetails.abort();
            self.loadDetails = true;//已加载详情
            //self.ajaxGetDetails = self.ajaxPOST("data/details.json", self.searchData, function(data){
			/*self.ajaxPOST ('/hotModel/hotModelManage!heyuejiJson.action', self.searchData, function(json){

             self.loadDetails = true;//已加载详情

             $("#details_pic").attr("src",self.detailImage);//详情图片
             *//*填充参数列表开始*//*
             var tbody_html = "";
             var tr_key = "<tr>";
             var tr_val = "<tr>";
             var index = 0;
             $.each(json,function(i,list){
             index ++;
             if(i == "上市时间"){
             list = self.lastTime;
             }
             tr_key += "<td>" + i + "</td>";
             tr_val += "<td>" + list+ "</td>";
             if(index % 3 == 0){
             tbody_html += tr_key + "</tr>" + tr_val + "</tr>";
             tr_key = "<tr>";
             tr_val = "<tr>";
             }
             });
             switch(index%3){
             case 1:
             tr_key += "<td></td><td></td>";
             tr_val += "<td></td><td></td>";
             tbody_html += tr_key + "</tr>" + tr_val + "</tr>";
             break;
             case 2:
             tr_key += "<td></td>";
             tr_val += "<td></td>";
             tbody_html += tr_key + "</tr>" + tr_val + "</tr>";
             break;
             default:
             }
             $("#details_list").html(tbody_html);

             $("#bbxq_title").addClass("opened");
             $("#bbxq").slideDown("fast");
             self.scrollToHere($("#bbxq_title"));
             });*/
            $("#bbxq_title").addClass("opened");
            $("#bbxq").slideDown("fast");
            self.scrollToHere($("#bbxq_title"));

        },
        getHyxx:function(radio){
            var self = this;
            //self.ajaxGetDetails && self.ajaxGetDetails.abort();
           // self.ajaxGetDetails = self.ajaxPOST("data/hyxx.json", self.searchData, function(data){
            var tbody_html = "";
            var tr_key = "<tr>";
            var tr_val = "<tr>";
            var index = 0;
            var arr = radio.value.split(",");
            var hyxx_title_html = $(radio).parent().text();
            for(var k=3;k<arr.length;k++){
            	 index ++;
                 tr_key += "<td>" + arr[k].split("：")[0] + "</td>";
                 tr_val += "<td>" + arr[k].split("：")[1] + "</td>";
                 if(index % 4 == 0){
                     tbody_html += tr_key + "</tr>" + tr_val + "</tr>";
                     tr_key = "<tr>";
                     tr_val = "<tr>";
                 }
            }
            /*$.each(value,function(i,list){
                index ++;
                tr_key += "<td>" + list.ofrName + "</td>";
                tr_val += "<td>" + list.contractDec + "</td>";
                if(index % 4 == 0){
                    tbody_html += tr_key + "</tr>" + tr_val + "</tr>";
                    tr_key = "<tr>";
                    tr_val = "<tr>";
                }
            });*/
            switch(index%4){
                case 1:
                    tr_key += "<td></td><td></td><td></td>";
                    tr_val += "<td></td><td></td><td></td>";
                    tbody_html += tr_key + "</tr>" + tr_val + "</tr>";
                    break;
                case 2:
                    tr_key += "<td></td><td></td>";
                    tr_val += "<td></td><td></td>";
                    tbody_html += tr_key + "</tr>" + tr_val + "</tr>";
                    break;
                case 3:
                    tr_key += "<td></td>";
                    tr_val += "<td></td>";
                    tbody_html += tr_key + "</tr>" + tr_val + "</tr>";
                    break;
                default:
            }
            if($(radio).attr("dealMoeny") && $(radio).attr("dealMoeny") != "0"){
            	self.$pro_price.attr("price", $(radio).attr("dealMoeny"));
            }else{
            	self.$pro_price.attr("price", self.$pro_price.attr("phonePrice"));
            }
            var prestore = self.getPrestorePrice();
	        self.$pro_price.html(parseInt(self.$pro_price.attr("price")) + prestore);
            
            $("#hyxx").html('<h2 id="heiyue_name">合约信息：<span>' + hyxx_title_html +'</span></h2>\
                    <table width="100%" cellspacing="0" cellpadding="0" border="0" class="table_border table_4d">\
                    <tbody>' + tbody_html +'</tbody>\
                    </table>' + 
                ($(radio).attr("compareImage") ? "<h3><img src=\"" + util.getWebRoot() + $(radio).attr("compareImage") + "\" alt='' /></h3>" : "")
                +(self.compareInfo ? "<div class='compareInfo'>" + self.compareInfo +"</div>" : ""));
                //$("#heyue_datails").html(tbody_html);
                /*填充合约信息结束*/
            //})
            /*判断合约信息是否已经展开，如果是关闭，则手动展开它*/
            if(self.$hyxx.is(":hidden")){
                self.$hyxx_title.addClass("opened");
                self.$hyxx.slideDown("fast");
            }
            
        }
    };

    $(function(){
        wgt.hotMobile.init();
    })

}(wgt))
