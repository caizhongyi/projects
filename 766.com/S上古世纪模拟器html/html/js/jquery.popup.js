$(document).ready(function(){
	//��ʼ�����Ƿ���DIV�������ڹ���
	//0 ��ʾ����; 1 ��ʾ������;
	var popupStatus = 0;
	//ʹ��Jquery���ص��� 
	function loadPopup(){   
	//���ڿ�����־popupStatusΪ0������¼���  
	if(popupStatus==0){   
		$("#backgroundPopup").css({   
			"opacity": "0.7"  
		});   
		$("#backgroundPopup").fadeIn("slow");   
		$("#popupContact").fadeIn("slow");   
		popupStatus = 1;   
		}   
	}  
	//ʹ��Jqueryȥ������Ч�� 
	function disablePopup(){   
	//���ڿ�����־popupStatusΪ1�������ȥ��
		if(popupStatus==1){   
				$("#backgroundPopup").fadeOut("slow");   
				$("#popupContact").fadeOut("slow");   
				popupStatus = 0;   
			}   
	} 
	//���������ڶ�λ����Ļ������
	function centerPopup(){   
	//��ȡϵͳ����
		var windowWidth = document.documentElement.clientWidth;   
		var windowHeight = document.documentElement.clientHeight;   
		var popupHeight = $("#popupContact").height();   
		var popupWidth = $("#popupContact").width();   
		//��������   
		$("#popupContact").css({   
			"top": windowHeight/2-popupHeight/2,   
			"left": windowWidth/2-popupWidth/2   
		});   
		//���´������IE6����Ч
		  
		$("#backgroundPopup").css({   
			"height": $(document).height()   
		});   

		var	$backToTopEle = $('#popupContact'), 
			$backToTopFun = function() {
			var st = $(document).scrollTop();
			//IE6�µĶ�λ
			if (!window.XMLHttpRequest) {
				$backToTopEle.css("top", st + windowHeight/2-popupHeight/2);
			}
		};
		$(window).bind("scroll", $backToTopFun);

	}

	//��������ڴ�С�ı�ʱ 
	$(window).resize(function() { centerPopup()	});
	
	//�򿪵�������   
	//��ť����¼�!
	$("#button").click(function(){   
		//���ú������д���
		centerPopup();   
		//���ú������ش���
		loadPopup();   
	});
	//�رյ�������   
	//���"X"���������¼�
	$("#popupContactClose").click(function(){   
			disablePopup();   
	});   
	//����������ⱳ���������Ĺرմ����¼�!
	$("#backgroundPopup").click(function(){   
		disablePopup();   
	});   
	//���̰���ESCʱ�رմ���!
	$(document).keypress(function(e){   
		if(e.keyCode==27 && popupStatus==1){   
			disablePopup();   
		}   
	});  


});

