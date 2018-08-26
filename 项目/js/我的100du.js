// JavaScript Document

$(function(){
	//search栏切换
	(function(){
		var arrText = [
			"例如：荷棠鱼坊烧鱼 或 樱花日本料理",
			"例如：昌平区育新站龙旗广场2号楼609室",
			"例如：万达影院双人情侣券",
			"例如：东莞出事了，大老虎是谁？",
			"例如：北京初春降雪，天气变幻莫测",
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
	//update滚动
	(function(){
		var oUl = $(".update ul");
		var arrData = [
			{ 'name':'黄JJ', 'time':4, 'title':'我的那些风流趣事', 'url':'http://www.baidu.com' },
			{ 'name':'小黄', 'time':5, 'title':'广东3天抓获涉黄疑犯', 'url':'http://www.baidu.com' },
			{ 'name':'小白', 'time':6, 'title':'国台办回应王郁琦', 'url':'http://www.baidu.com' },
			{ 'name':'阿猫', 'time':7, 'title':'那些灿烂华美的瞬间', 'url':'http://www.baidu.com' },
			{ 'name':'阿狗', 'time':8, 'title':'随便写点啥', 'url':'http://www.baidu.com' },
			{ 'name':'畅畅', 'time':9, 'title':'广东3天抓获涉黄疑犯', 'url':'http://www.baidu.com' },
			{ 'name':'萱萱', 'time':10, 'title':'国台办回应王郁琦', 'url':'http://www.baidu.com' },
			{ 'name':'佩奇', 'time':11, 'title':'那些灿烂华美的瞬间', 'url':'http://www.baidu.com' }
		];
		var str = "";
		var oBtnUp = $("#updateUpBtn");
		var oBtnDown = $("#updateDownBtn");
		var iNow = 0;
		var num = -1;
		var timer = null;
		for(i=0;i<arrData.length;i++){
			str += '<li><a href="'+ arrData[i].url +'"><strong>'+arrData[i].name+"</strong><span>"+arrData[i].time+"分钟前</span>写了一篇新文章："+arrData[i].title+"</a></li>"
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
	//选项卡切换
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
	//焦点图轮播
	(function(){
		var oDiv = $("#fade");
		var oulLi = $("#fade").find("ul li");
		var oolLi = $("#fade").find("ol li");
		var oP = $("#fade").find("p");
		var iNow = 0;
		var timer = null;
		var arrData = [
			"爸爸去哪儿",
			"人像摄影中的光影感",
			"娇柔妩媚，美艳大方"
		];
		fnFade();//初始化
		
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
	//BBS论坛移入移出效果
	(function(){
		var bbsLi = $(".bbs ol li");
		bbsLi.hover(function(){
			bbsLi.removeClass("active");
			bbsLi.eq($(this).index()).addClass("active");
		});
	})();
	//日历显示部分
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
	//红人烧客鼠标效果
	(function(){
		var arr = [
		"",
		"用户1<br/>人气1",
		"用户名：性感宝贝<br/>区域：朝阳CBD<br/>人气：124987",
		"用户3<br/>人气3",
		"用户4<br/>人气4",
		"用户5<br/>人气5",
		"用户6<br/>人气6",
		"用户7<br/>人气7",
		"用户8<br/>人气8",
		"用户9<br/>人气9",
		"用户10<br/>人气10"
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
	//知道分子输入框
	(function(){
		var otext = $(".soso .text");
		otext.val("百度一下，你就不知道");
		otext.focus(function(){
			$(this).val("");
		});
		otext.blur(function(){
			$(this).val("百度一下，你就不知道");
		});
	})();
});