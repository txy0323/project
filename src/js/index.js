// 引入zepto-modules模块
var $ = require('zepto-modules/zepto');

require('zepto-modules/event');
require('zepto-modules/ajax');
require('zepto-modules/form');
require('zepto-modules/ie');
require('zepto-modules/touch');

module.exports = $;

$("#mainContent").hide();

// 引入swiper模块
var Swiper = require('./components/swiper/swiper.min.js');
var swiperAnimate = require('./components/swiper/swiper.animate1.0.2.min.js');


var swiper = new Swiper('.swiper-container',{
    onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
        swiperAnimate.swiperAnimateCache(swiper); //隐藏动画元素 
        swiperAnimate.swiperAnimate(swiper); //初始化完成开始动画
      },
    onSlideChangeEnd: function(swiper){ 
        swiperAnimate.swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
      } 
});

var IScroll = require('./components/iscroll/iscroll.js');

$('#enter').click(function(){
  $(".swiper-container").hide();
  $("#mainContent").show();

  $("#skill").tap(function(){
		$.ajax({
			type: 'GET',
			url: '/api/skill.php',
			dataType:'json',
			success: function(data) {
			    var html = "";
			  	for (var i = 0; i < data.length; i++) {
			  		html += "<li>" + "<p>" + data[i].category +  "<span>" + data[i].level + "</span>" + "</p>" + "<p>" + data[i].name + 
		"</p>" + "</li>";
			  	};
			$("#scroller ul").html(html);
			console.log(data);
			}
		});
	});

  	$("#work").tap(function(){
		$.ajax({
			type: 'GET',
			url: '/api/work.php',
			success: function(data) {
			    var html = "";
			  	for (var i = 0; i < data.length; i++) {
			  		html += "<li>" + "<p>" + data[i].category +  "<span>" + data[i].level + "</span>" + "</p>" + "<p>" + data[i].name + 
		"</p>" + "</li>";
			  	};
			$("#scroller ul").html(html);
			console.log(data);
			}
		});
	});


	$("#project").tap(function(){
		$.ajax({
			type: 'GET',
			url: '/api/project.php',
			success: function(data) {
			    var html = "";
			  	for (var i = 0; i < data.length; i++) {
			  		html += "<li>" + "<p>" + data[i].category +  "<span>" + data[i].level + "</span>" + "</p>" + "<p>" + data[i].name + 
		"</p>" + "</li>";
			  	};
			$("#scroller ul").html(html);
			console.log(data);
			}
		});
	});

	myScroll = new IScroll('#wrapper', { mouseWheel: true });
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

});
/*
var media = $("#media");
$("#audio_btn").tap(function () {
	$(this).removeClass("off");

	if($(this).hasClass("off")){
		media.onplay();
	}else{
		media.onpause();
	}
});
*/

/*$("#footer div").tap(function(){
	var apiTarget = $(this).attr("id");
	var apiUrl = "/api/" + apiTarget + ".php";

	$.ajax({
	  type: 'GET',
	  url: apiUrl,
	  success: function(data) {
	  	var html = "";
	  	
	  	for (var i = 0; i < data.length; i++) {
	  		html += "<li>" + "<p>" + data[i].category +  "<span>" + data[i].level + "</span>" + "</p>" + "<p>" + data[i].name + 
"</p>" + "</li>";
	  	};

	  	$("#scroller ul").html(html);
	    console.log(data);
	  }
	});

})*/

/*$("#skill").tap(function(){
	$.ajax({
	  type: 'GET',
	  url: 'http://localhost:3000/users/api',
	  success: function(data) {
	    var html = "";
	  	for (var i = 0; i < data.length; i++) {
	  		html += "<li>" + "<p>" + data[i].category +  "<span>" + data[i].level + "</span>" + "</p>" + "<p>" + data[i].name + 
"</p>" + "</li>";
	  	};
	  	$("#scroller ul").html(html);
	    console.log(data);
	  }
	});
})*/