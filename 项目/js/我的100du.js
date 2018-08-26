// JavaScript Document

$(function(){
	//search���л�
	(function(){
		var arrText = [
			"���磺�����㷻���� �� ӣ���ձ�����",
			"���磺��ƽ������վ����㳡2��¥609��",
			"���磺���ӰԺ˫������ȯ",
			"���磺��ݸ�����ˣ����ϻ���˭��",
			"���磺����������ѩ���������Ī��",
		];
		var aLi = $("#menu li");
		var oText = $(".bar .text");
		var iNow = 0;
		oText.val(arrText[iNow]);
		aLi.each(function(index){
			$(this).click(function(){
				aLi.attr("class","");
				$(this).attr("class","active");
				oText.val(arrText[index]);
				iNow = index;
			});
		});
		oText.focus(function(){
			if(oText.val()==arrText[iNow]){
			oText.val("");
			}
		});
		oText.blur(function(){
			if(oText.val()==""){
			oText.val(arrText[iNow]);
			}
		});
	})();	
	//update����
	(function(){
		var oUl = $(".update ul");
		var arrData = [
			{ 'name':'��JJ', 'time':4, 'title':'�ҵ���Щ����Ȥ��', 'url':'http://www.baidu.com' },
			{ 'name':'С��', 'time':5, 'title':'�㶫3��ץ������ɷ�', 'url':'http://www.baidu.com' },
			{ 'name':'С��', 'time':6, 'title':'��̨���Ӧ������', 'url':'http://www.baidu.com' },
			{ 'name':'��è', 'time':7, 'title':'��Щ���û�����˲��', 'url':'http://www.baidu.com' },
			{ 'name':'����', 'time':8, 'title':'���д��ɶ', 'url':'http://www.baidu.com' },
			{ 'name':'����', 'time':9, 'title':'�㶫3��ץ������ɷ�', 'url':'http://www.baidu.com' },
			{ 'name':'����', 'time':10, 'title':'��̨���Ӧ������', 'url':'http://www.baidu.com' },
			{ 'name':'����', 'time':11, 'title':'��Щ���û�����˲��', 'url':'http://www.baidu.com' }
		];
		var str = "";
		var oBtnUp = $("#updateUpBtn");
		var oBtnDown = $("#updateDownBtn");
		var iNow = 0;
		var num = -1;
		var timer = null;
		for(i=0;i<arrData.length;i++){
			str += '<li><a href="'+ arrData[i].url +'"><strong>'+arrData[i].name+"</strong><span>"+arrData[i].time+"����ǰ</span>д��һƪ�����£�"+arrData[i].title+"</a></li>"
		}
		oUl.html(str);
		var iH = oUl.find("li").height();
		function autoplay(){
			timer=setInterval(function(){
				iNow += num;
				if(-iNow>arrData.length-1){
					iNow = 0;
				}
				oUl.stop().animate({"top":iH*iNow},1500,"elasticOut");
			},3500)};
		autoplay();
		oBtnDown.click(function(){
			iNow += num;
			if(-iNow>arrData.length-1){
				iNow = 0;
			}
			oUl.stop().animate({"top":iH*iNow},1500,"elasticOut");
		});
		oBtnUp.click(function(){
			iNow += 1;
			if(iNow>0){
				iNow = -(arrData.length-1);
			}
			oUl.stop().animate({"top":iH*iNow},1500,"elasticOut");
		});
		$(".update").hover(function(){clearInterval(timer)},autoplay);	
	})();
	//ѡ��л�
	(function(){
		fnTab($(".tabNav1"),$(".tabCon1"),"click");
		fnTab($(".tabNav2"),$(".tabCon2"),"click");
		fnTab($(".tabNav3"),$(".tabCon3"),"mouseover");
		fnTab($(".tabNav4"),$(".tabCon4"),"mouseover");
		function fnTab(navs,cons,events){
			var nav = navs.find("li");
			var con = cons;
			con.hide().eq(0).show();
			nav.each(function(index){
				$(this).on(events,(function(){
					nav.addClass("gradient").removeClass("active");
					$(this).addClass("active");
					con.hide();
					con.eq(index).show();
					nav.find("a").addClass("triangle_down_gray").removeClass("triangle_down_red");
					$(this).find("a").addClass("triangle_down_red").removeClass("triangle_down_gray");
				}));
			});
		};
	})();
	//����ͼ�ֲ�
	(function(){
		var oDiv = $("#fade");
		var oulLi = $("#fade").find("ul li");
		var oolLi = $("#fade").find("ol li");
		var oP = $("#fade").find("p");
		var iNow = 0;
		var timer = null;
		var arrData = [
			"�ְ�ȥ�Ķ�",
			"������Ӱ�еĹ�Ӱ��",
			"�������ģ����޴�"
		];
		fnFade();//��ʼ��
		
		oolLi.each(function(i){
			$(this).click(function(){
				iNow = i;
				fnFade();
			});		
		});
		
		function fnFade(){
			oolLi.removeClass("active");
			oolLi.eq(iNow).addClass("active");
			oP.text(arrData[iNow]);
			oulLi.stop().fadeOut();
			oulLi.eq(iNow).stop().fadeIn().css("zIndex",1);
		}
		function autoPlay(){
			timer = setInterval(function(){
				iNow++;
				iNow%=oulLi.length;
				fnFade();
			},2000);
		}
		oDiv.hover(function(){clearInterval(timer)},autoPlay);
		autoPlay();
	})();
	//BBS��̳�����Ƴ�Ч��
	(function(){
		var bbsLi = $(".bbs ol li");
		bbsLi.hover(function(){
			bbsLi.removeClass("active");
			bbsLi.eq($(this).index()).addClass("active");
		});
	})();
	//������ʾ����
	(function(){
		var infoImg = $(".today_info img");
		var infoP = $(".today_info .text p");
		var infoStrong = $(".today_info .text strong");
		var oToday = $(".calendar .today_info");
		var oLi = $(".calendar ol li");
		var oImg = $(".calendar ol li .img");
		var oSpan = $(".gradient_top span");
		var oTop = 0;
		var oLeft = 0;

		oImg.mouseover(function(){
			oTop = $(this).parent().position().top - 30;
			oLeft = $(this).parent().position().left + 50;
			oToday.css({"top":oTop,"left":oLeft,"zIndex":2});
			infoImg.attr("src",$(this).attr("src"));
			infoP.text($(this).attr("info"));
			var index = $(this).parent().index()%oSpan.length;
			infoStrong.text(oSpan.eq(index).text());
			oToday.show();
		});
		oImg.mouseout(function(){
			oToday.hide();
		});	
	})();
	//�����տ����Ч��
	(function(){
		var arr = [
		"",
		"�û�1<br/>����1",
		"�û������Ըб���<br/>���򣺳���CBD<br/>������124987",
		"�û�3<br/>����3",
		"�û�4<br/>����4",
		"�û�5<br/>����5",
		"�û�6<br/>����6",
		"�û�7<br/>����7",
		"�û�8<br/>����8",
		"�û�9<br/>����9",
		"�û�10<br/>����10"
		];
		var hotLi = $(".hot_area li");
		var hotP = $(".hot_area li p");
		hotLi.hover(function(){
			var liWidth = $(this).width();
			var liHeight = $(this).height();
			hotP.remove();
			if($(this).index()==0)return;
			$(this).append("<p style=width:"+ (liWidth-11) +"px;height:"+ (liHeight-9) +"px;>"+ arr[$(this).index()] +"</p>");
			
		},function(){
			$(this).find("p").remove();
		});
	})();
	//֪�����������
	(function(){
		var otext = $(".soso .text");
		otext.val("�ٶ�һ�£���Ͳ�֪��");
		otext.focus(function(){
			$(this).val("");
		});
		otext.blur(function(){
			$(this).val("�ٶ�һ�£���Ͳ�֪��");
		});
	})();
});