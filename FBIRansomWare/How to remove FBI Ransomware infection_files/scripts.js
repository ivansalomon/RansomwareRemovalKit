$(document).ready(function(){
	$('.second_step input[type=checkbox]').click(function(){
		if ($(this).prop('checked') == true) {
			$(this).parents('.service').css('background','#f9f9f9');
			$(this).parents('.service').addClass('active');
			$(this).parents('.noPadding').siblings('.imgW').children('img').activateimg()
		} 
		else {
			$(this).parents('.service').css('background','#fff');
			$(this).parents('.service').removeClass('active')
			$(this).parents('.noPadding').siblings('.imgW').children('img').deactivateimg()
		}
	});
	
	//Features show and hide, family-pack
	$('#fpShowPc ul.hidFtrs li:nth-child(3n)').next().css('clear','left')
	$('#fpShowPc ul.first li:nth-child(2n)').next().css('clear','left')
	$('.hidFtrs li').hide();
	$('#fpPcHidePc').hide();
	$('#fpShowPc').click(function() {
		if ($('.featShowPc li:first').is(':hidden')) {
			$('.featShowPc li').show('slow')//:nth-child(-n+6)
			
		}
		else {
			$('.featShowPc').find("li:visible:last").nextAll(':lt(6)').show('slow')
		}
		$(function(){
			var sizeli = $('.featShowPc li').length;
			var sizelivi = $('.featShowPc li:visible').length;
			if(sizeli == sizelivi) {
				$('#fpShowPc').hide();	
				$('#fpPcHidePc').show('fast').css('display','inline-block');
			}
		});
	});
	
	$('#fpPcHidePc').click(function(){
		$('#fpShowPc').show();	
		$('#fpPcHidePc').hide();
		$('.hidFtrs li').hide('slow')
	});
	
	$('#fpShowMac ul.hidFtrs li:nth-child(3n)').next().css('clear','left')
	$('#fpShowMac ul.first li:nth-child(2n)').next().css('clear','left');
	$('#fpPcHideMac').hide();
	$('#fpShowMac').click(function() {
		if ($('.featShowMac li:first').is(':hidden')) {
			$('.featShowMac li').show('slow')//:nth-child(-n+6)
			
		}
		else {
			$('.featShowMac').find("li:visible:last").nextAll(':lt(6)').show('slow')
		}
		$(function(){
			var sizeli = $('.featShowMac li').length;
			var sizelivi = $('.featShowMac li:visible').length;
			if(sizeli == sizelivi) {
				$('#fpShowMac').hide();	
				$('#fpPcHideMac').show('fast').css('display','inline-block');
			}
		});
	});
	
	$('#fpPcHideMac').click(function(){
		$('#fpShowMac').show();	
		$('#fpPcHideMac').hide();
		$('.hidFtrs li').hide('slow')
	});
	
	$('#fpShowAndroid ul.hidFtrs li:nth-child(3n)').next().css('clear','left')
	$('#fpShowAndroid ul.first li:nth-child(2n)').next().css('clear','left');
	$('#fpPcHideAndroid').hide();
	$('#fpShowAndroid').click(function() {
		if ($('.featShowAndroid li:first').is(':hidden')) {
			$('.featShowAndroid li').show('slow')//:nth-child(-n+6)
			
		}
		else {
			$('.featShowAndroid').find("li:visible:last").nextAll(':lt(6)').show('slow')
		}
		$(function(){
			var sizeli = $('.featShowAndroid li').length;
			var sizelivi = $('.featShowAndroid li:visible').length;
			if(sizeli == sizelivi) {
				$('#fpShowAndroid').hide();	
				$('#fpPcHideAndroid').show('fast').css('display','inline-block');
			}
		});
	});
	
	$('#fpPcHideAndroid').click(function(){
		$('#fpShowAndroid').show();	
		$('#fpPcHideAndroid').hide();
		$('.hidFtrs li').hide('slow')
	});
});

function onBrowserClose(time_in_seconds, when, function_test, message){
	var start = new Date().getTime();
	window.onbeforeunload = function () {
		var end = new Date().getTime();
		var time = parseInt((end - start) / 1000);
		
		if(when == 'before'){
			if(time < time_in_seconds){
				function_test();
				return;
			}
		} else if(when == 'at'){
			if(time == time_in_seconds){
				function_test();
				return message
			}
		} else if(when == 'after'){
			if(time > time_in_seconds){
				function_test();
				return message
			}
		} else if(when == 'before-at'){
			if(time <= time_in_seconds){
				function_test();
				return message
			}
		} else if(when == 'at-after'){
			if(time >= time_in_seconds){
				function_test();
				return message
			}
		} else if(when == 'forever'){
			function_test();
			return message
		}
	};
}