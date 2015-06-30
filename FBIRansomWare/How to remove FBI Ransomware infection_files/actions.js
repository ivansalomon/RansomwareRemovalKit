$(window).load(function(){
	//Loading...
	if($('.loadPage').length){
		$('.loadPage').hide();
	}
});


function resizeElements (){
    var viewportWidth = $(window).width();
    var viewportHeight = $(window).height();
	
	$('#companyW').css('height', viewportHeight + 'px');
	$('#companyW').css('width', viewportWidth + 'px');
	$('.slide_co').css('height', viewportHeight + 'px');
	$('.slide_co').css('width', viewportWidth + 'px');
	$('#slidesWrapper').css('height', viewportHeight + 'px');
    //total width #slidesWrapper
 	var totalWidth = 0;
	$('.slide_co').each(function(index) {
	    totalWidth += parseInt($(this).width(), 10);
	});
	$('#slidesWrapper').css('width', totalWidth + 'px');
	//latime lista tari de la job opportunities
    totallengthWidth = 0;
    $('.countries ul li').each(function(index) {
	    totallengthWidth += $(this).outerWidth(true);
	});
	$(".countries ul").width(totallengthWidth);
	//latime lista orase de la job opportunities
	citiesWidth = 0;
    $('#job_city ul li').each(function(index) {
	    citiesWidth += $(this).outerWidth(true);
	});
	$("#job_city ul").width(citiesWidth);
}
$(window).resize(function() {
	resizeElements();
	$('.menu_co a.selected').trigger('click',100)
});

$(document).ready(function() {
	//Only DEV
	// $("#includeMenu").load("newMenu.html"); 

	// company area
	resizeElements();
   	//open company area
   	$('#open_co_area').on('click', function(){
		$('#companyW').slideDown(600,'easeInOutCirc');
		$(".countries ul").resize();
        disable_scroll();
        	
	});
	//close company area
	$('.close_company_area').on('click', function(){
		$('#companyW').slideUp(600,'easeOutCirc')
		enable_scroll();	
	});
	//menu company area scroll to div
	$('.menu_co a').on('click', function (e) {
        var elemId = $(this).attr("rel"); 
        switch (e.target.id) {
        case "nav1":
            elemId = "#co_slide01";
            break;
        case "nav2":
            elemId = "#co_slide02";
            break;
        case "nav3":
            elemId = "#co_slide03";
            break;
        case "nav4":
            elemId = "#co_slide04";
            break;
        }
        $('#companyW').animate(
        	{ scrollLeft: $(elemId).parent().scrollLeft() + $(elemId).offset().left - $(elemId).parent().offset().left}, 
        	{duration: 1000, specialEasing:{width: 'easeOutBounce',height: 'linear'}
        });
        $('#companyW').find('a.current').removeClass('selected');
        $(elemId).find('a.current').addClass('selected')
        e.preventDefault();
    });
    // job listing
	var maxScroll = $(".countries ul").width() - $(".countries").width();
    // //don't show arrows for cities
    // if ($(".countries ul").width() = $(".countries").width()) {
    // 	$('#job_country .fa-chevron-right').css('display','none');
    // 	$('#job_country .fa-chevron-left').css('display','none');	
    // };
    // click arrow right
    $('#job_country .fa-chevron-right').on('click',function () {
        $('.countries ul').animate({ 'left':maxScroll+'%'});
        $('#job_country .fa-chevron-left').css('display','block');
        $(this).hide()
    });    
  	// click arrow left
    $('#job_country .fa-chevron-left').on('click',function () {
        $('.countries ul').animate({'left': '0%'});
        $('#job_country .fa-chevron-right').css('display','block');
        $(this).hide()
    });   	
    var maxScrollCities = $("#job_city ul").width() - $(".cities").width();
    // //don't show arrows for cities
    // if ($("#job_city ul").width() <= $(".cities").width()) {
    // 	$('#job_city .fa-chevron-right').css('display','none');
    // 	$('#job_city .fa-chevron-left').css('display','none');	
    // };
    $('#job_city .fa-chevron-right').on('click',function () {
        $('#job_city ul').animate({ 'left':maxScrollCities+'%'});
        $('#job_city .fa-chevron-left').css('display','block');
        $(this).hide()
    });    
    
    $('#job_city .fa-chevron-left').on('click',function () {
        $('#job_city ul').animate({'left': '0%'});
        $('#job_city .fa-chevron-right').css('display','block');
        $(this).hide()
    });   	
	// system requirements show / hide
	$('#aSysReq').click(function() {
		$('#sysReq').slideDown('slow');
		$('#colapseaSysReq').show();
		$(this).hide();
	});
	$('#colapseaSysReq').click(function() {
		$('#sysReq').slideUp('slow');
		$(this).hide();
		$('#aSysReq').show();
	});
	$('#aSysReqPC').click(function() {
		$('#sysReqPC').slideToggle('slow')
	});
	$('#aSysReqEnd').click(function() {
		$('#sysReqEnd').slideToggle('slow')
	});
	$('#aSysReqMob').click(function() {
		$('#sysReqMob').slideToggle('slow')
	});
	// plus features show / hide
	$('#aplusFeat').click(function() {
		$('#plusFeat').slideDown();
		$('#colapseaplusFeat').show();
		$(this).hide();
	});
	$('#colapseaplusFeat').click(function() {
		$('#plusFeat').slideUp('slow');
		$(this).hide();
		$('#aplusFeat').show();
	});
	// pc, mac, android features show
	$('#sphFtrs ul.hidFtrs li:nth-child(3n)').next().css('clear','left')
	$('#sphFtrs ul.first li:nth-child(2n)').next().css('clear','left')
	$('.hidFtrs li').hide()
	$('#sphFtrs2 ul.hidFtrs2 li:nth-child(3n)').next().css('clear','left')
	$('#sphFtrs2 ul.first li:nth-child(2n)').next().css('clear','left')
	$('.hidFtrs2 li').hide()
	$('#showpc2').click(function() {
		if ($('.pcFtrs2 li:first').is(':hidden')) {
			$('.pcFtrs2 li').show('slow')//:nth-child(-n+6)
			
		}
		else {
			$('.pcFtrs2').find("li:visible:last").nextAll(':lt(6)').show('slow')
		}
		$(function(){
			var sizeli = $('.pcFtrs2 li').length;
			var sizelivi = $('.pcFtrs2 li:visible').length;
			if(sizeli == sizelivi) {
				$('#showpc2').hide();	
				$('#clpsftrsPC2').show('fast').css('display','inline-block');
			}
		});
	});
	$('#showmac').click(function() {
		if ($('.macFtrs li:first').is(':hidden')) {
			$('.macFtrs li:nth-child(-n+3)').show('slow')
		}
		else {
			$('.macFtrs').find("li:visible:last").nextAll(':lt(3)').show('slow')
		}
		$(function(){
			var sizeli = $('.macFtrs li').length;
			var sizelivi = $('.macFtrs li:visible').length;
			if(sizeli == sizelivi) {
				$('#showmac').hide();	
				$('#clpsftrsMAC').show('fast').css('display','inline-block');
			}
		});
	});
	$('#showand').click(function() {
		if ($('.andFtrs li:first').is(':hidden')) {
			$('.andFtrs li:nth-child(-n+3)').show('slow')
		}
		else {
			$('.andFtrs').find("li:visible:last").nextAll(':lt(3)').show('slow')
		}
		$(function(){
			var sizeli = $('.andFtrs li').length;
			var sizelivi = $('.andFtrs li:visible').length;
			if(sizeli == sizelivi) {
				$('#showand').hide();	
				$('#clpsftrsAND').show('fast').css('display','inline-block');
			}
		});
	});
	$('#showand2').click(function() {
		if ($('.andFtrs2 li:first').is(':hidden')) {
			$('.andFtrs2 li:nth-child(-n+3)').show('slow')
		}
		else {
			$('.andFtrs2').find("li:visible:last").nextAll(':lt(3)').show('slow')
		}
		$(function(){
			var sizeli = $('.andFtrs2 li').length;
			var sizelivi = $('.andFtrs2 li:visible').length;
			if(sizeli == sizelivi) {
				$('#showand2').hide();	
				$('#clpsftrsAND2').show('fast').css('display','inline-block');
			}
		});
	});
	//pc, mac, android hide features
	$('#clpsftrsPC').click(function() {
			$('.pcFtrs li').hide();
			$(this).hide();
			$('#showpc').show();
		});
	$('#clpsftrsPC2').click(function() {
			$('.pcFtrs2 li').hide();
			$(this).hide();
			$('#showpc2').show();
		});
	$('#clpsftrsMAC').click(function() {
			$('.macFtrs li').hide();
			$(this).hide();
			$('#showmac').show();
		});
	$('#clpsftrsAND').click(function() {
			$('.andFtrs li').hide();
			$(this).hide();
			$('#showand').show();
		});
	$('#clpsftrsAND2').click(function() {
			$('.andFtrs2 li').hide();
			$(this).hide();
			$('#showand2').show();
		});
	// hide top parte of the menu
	var navH = $('nav').height();
	var sNavH = $('#secondnav').height();
	// if($('#firstnav').length){
		// $('body').css({'padding-top':104});
	// }
    $(window).scroll(function () {
			fixMenu();
			// $(window).resize(function(){
				// fixMenu();
			// });
	});
	
	// View More Button
	$('.viewMoreBtn').click(function(){
		var that = $(this);
		var finVal = that.attr('data-finVal');
		var showItm = that.attr('data-showItem');
		$('.'+showItm).slideToggle();
		if(that.hasClass('isOn')){
			var initVal = that.attr('data-initVal');
			that.html(initVal);
		}else{
			var initVal = that.html();
			that.attr('data-initVal',initVal);
			that.html(finVal);
		}
		that.toggleClass('isOn');
	});

	function fixMenu(){
		if($(window).width() > 1023){
			if ($(this).scrollTop() > 400) {
				// $('#secondnav').slideUp('100');
				$('.navbarMain').addClass('active');
				$('#scdLogoNav').show('100');
				$('#lang_ddown').css('top','48px');
			} else {
				$('.navbarMain').removeClass('active');
				// $('#secondnav').slideDown('100');
				$('#scdLogoNav').hide('100');
				$('#lang_ddown').css('top','101px');
			}
		}
	}


    // drop down language select
    // $('#langsel').click(function() {
        // $('#lang_ddown').slideToggle('400');
    // });
	//tooltip product comparison 
	$("#prodComparison .nopadding").delegate('div.cell','mouseover mouseleave', function(e) {
	    if (e.type == 'mouseover') {
	      $(this).parent().addClass("hover");
	      spanW = $(this).children('span').outerWidth()/2;
	      console.log(spanW)
	      $(this).find('span').css({'display':'block','margin-left':-spanW})
	    }
	    else {
	      $(this).parent().removeClass("hover");
	      $(this).find('span').css('display','none')
	    }
	});
	//show hide virus info
	$('.vname a').click(function() {
		$(this).parent().siblings('.vinfo').slideToggle('slow')
		$(this).parents('.virus').toggleClass('selected')
		$(this).parents('.virus').siblings().removeClass('selected')
		$(this).parents('.virus').siblings().children('.vinfo').slideUp('fast')
	});
	$('.vinfo a.fmore').click(function() {
		$(this).parents().siblings('.moreInfo').slideDown('fast');
		$(this).hide()
		$(this).siblings('.sless').show().css('display','inline-block');
		$(this).parents('.virus').siblings().find('.moreInfo').slideUp('fast')

	});
	$('.vinfo a.sless').click(function() {
		$(this).parents().siblings('.moreInfo').slideUp('fast');
		$(this).hide()
		$(this).siblings('.fmore').show().css('display','inline-block');
	});
	//close banner
	$('.close_banner').click(function(){
		$(this).parent().closest("section").hide();
	})
	// close self help anunt
	$('.close_anunt').click(function(){
		$(this).parent().closest(".anunt").hide();
	})

	//wizard tech assist show radio buttons for license yes/now
	$('#first_step input').click(function(){ 
    	if($('#instalerr').is(':checked')){
			$('#haveLicense').slideDown('fast')
    	}else{
    		$('#haveLicense').slideUp('fast')
    	}
	});
	//hide wizard first step
	$('#first_step a.btn').click(function(){
		$(this).parents('#first_step').hide().siblings().hide();
		$('#second_step').show().css('display','block');
		$('#people_2step').show().css('display','block');
	});
	//activate second option
	$.fn.activateimg = function() {
		var src = $(this).attr("src").replace(".png", "_active.png");
		$(this).attr("src", src); 
	};
	$.fn.deactivateimg = function() {
		var src = $(this).attr("src").replace("_active.png", ".png");
		$(this).attr("src", src);
	};
	$('#second_step input[type=checkbox]').click(function(){
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
	if ($('.service input[type=checkbox]').prop('checked') == true) {
		var chkbox = $('input[type=checkbox]:checked');
		$(chkbox).parents('.service').css('background','#f9f9f9')
	}
	// badges tooltip tech assist
	$('#badgesInfo img').on('mouseenter',function(){
		$(this).next('p.badge_hover').show()
		console.log($(this).offset())
	})
	$('#badgesInfo img').on('mouseleave',function(){
		$(this).next('p.badge_hover').hide()
	})
	$('.badgesInfo img').on('mouseenter',function(){
		$(this).next('p.badge_hover').show()
		console.log($(this).offset())
	})
	$('.badgesInfo img').on('mouseleave',function(){
		$(this).next('p.badge_hover').hide()
	})
	//slider user reviews
	$("#reviewsWrapper > div:gt(0)").hide();
	setInterval(function() { 
  		$('#reviewsWrapper > div:first')
	    .fadeOut(1000,'easeOutBack')
	    .next()
	    .fadeIn(1000,'easeInCirc')
	    .end()
	    .appendTo('#reviewsWrapper');
	},  5000);
	//features over
	$('#feats .noPadding').on('mouseenter', function(){
		$(this).children('.over').stop().slideDown(300);
	})
	$('#feats .noPadding').on('mouseleave', function(){
		$(this).children('.over').stop().slideUp(300);
	});
	//disable screen shots automatic slide
	if ($('.modal .carousel').length) {
		$('.modal .carousel').carousel({interval: false})
	}

	// SMB Index Navigation
	$('#smbSelectNav li').click(function () {
		if($(this).hasClass('active'))
			{
				$(this).removeClass('active');
			} 
		else { 
			$(this).addClass('active');
		}
		if($('#smbSelectNav li:eq(0)').hasClass('active'))
			{ $('.text-left  li:first-of-type').addClass('active')} 
		else {$('.text-left  li:nth-of-type(1)').removeClass('active')};
		
		if($('#smbSelectNav li:eq(1)').hasClass('active'))
			{$('.text-left  li:nth-of-type(2)').addClass('active')} 
		else {$('.text-left  li:nth-of-type(2)').removeClass('active')};
		
		if($('#smbSelectNav li:eq(2)').hasClass('active'))
			{ $('.text-left  li:nth-of-type(3)').addClass('active')} 
		else {$('.text-left  li:nth-of-type(3)').removeClass('active')};
		
		if($('#smbSelectNav li:eq(3)').hasClass('active')) 
			{ $('.text-left  li:nth-of-type(4)').addClass('active')}
		else {$('.text-left  li:nth-of-type(4)').removeClass('active')};
		if($('#smbSelectNav li:eq(0)').hasClass('active') && $('#smbSelectNav li:eq(1)').hasClass('active') ) 
			{ 
				$('.text-left  li').removeClass('active');
				$('#onthesamec  li:lt(2)').addClass('active');
				$('div.col-xs-5ths').removeClass('console-grey');
				$('div.col-xs-5ths').addClass('console-green');
				$('div.col-xs-5ths span').removeClass('triangle-grey')
				$('div.col-xs-5ths span').addClass('triangle-green')
			}
		else {
				$('div.col-xs-5ths').addClass('console-grey');
				$('div.col-xs-5ths').removeClass('console-green');
				$('div.col-xs-5ths span').addClass('triangle-grey')
				$('div.col-xs-5ths span').removeClass('triangle-green')
		};
		if($('#smbSelectNav li:eq(0)').hasClass('active') && $('#smbSelectNav li:eq(2)').hasClass('active') ) 
			{ 
				$('.text-left  li').removeClass('active');
				$('#onthesamec  li:nth-child(1),#onthesamec  li:nth-child(3) ').addClass('active');
				$('div.col-xs-5ths').removeClass('console-grey');
				$('div.col-xs-5ths').addClass('console-green');
				$('div.col-xs-5ths span').removeClass('triangle-grey')
				$('div.col-xs-5ths span').addClass('triangle-green')

			}
		if($('#smbSelectNav li:eq(1)').hasClass('active') && $('#smbSelectNav li:eq(2)').hasClass('active') ) 
			{ 
				$('.text-left  li').removeClass('active');
				$('#onthesamec  li:nth-child(2),#onthesamec  li:nth-child(3) ').addClass('active');
				$('div.col-xs-5ths').removeClass('console-grey');
				$('div.col-xs-5ths').addClass('console-green');
				$('div.col-xs-5ths span').removeClass('triangle-grey')
				$('div.col-xs-5ths span').addClass('triangle-green')

			}
		if($('#smbSelectNav li:eq(0)').hasClass('active') && $('#smbSelectNav li:eq(1)').hasClass('active') && $('#smbSelectNav li:eq(2)').hasClass('active')) 
			{ 
				$('.text-left  li').removeClass('active');
				$('#onthesamec  li:lt(3)').addClass('active');
				$('div.col-xs-5ths').removeClass('console-grey');
				$('div.col-xs-5ths').addClass('console-green');
				$('div.col-xs-5ths span').removeClass('triangle-grey')
				$('div.col-xs-5ths span').addClass('triangle-green')
			}
		if($('#smbSelectNav li:eq(0)').hasClass('active') && $('#smbSelectNav li:eq(2)').hasClass('active') && $('#smbSelectNav li:eq(3)').hasClass('active')) 
			{ 
				$('.text-left  li').removeClass('active');
				$('.text-left  li:nth-of-type(4)').addClass('active')
				$('#onthesamec  li:nth-child(1),#onthesamec  li:nth-child(3) ').addClass('active');
				$('div.col-xs-5ths').removeClass('console-grey');
				$('div.col-xs-5ths').addClass('console-green');
				$('div.col-xs-5ths span').removeClass('triangle-grey')
				$('div.col-xs-5ths span').addClass('triangle-green')
			}
		if($('#smbSelectNav li:eq(1)').hasClass('active') && $('#smbSelectNav li:eq(2)').hasClass('active') && $('#smbSelectNav li:eq(3)').hasClass('active')) 
			{ 
				$('.text-left  li').removeClass('active');
				$('.text-left  li:nth-of-type(4)').addClass('active')
				$('#onthesamec  li:nth-child(2),#onthesamec  li:nth-child(3) ').addClass('active');
				$('div.col-xs-5ths').removeClass('console-grey');
				$('div.col-xs-5ths').addClass('console-green');
				$('div.col-xs-5ths span').removeClass('triangle-grey')
				$('div.col-xs-5ths span').addClass('triangle-green')
			}
		if($('#smbSelectNav li:eq(0)').hasClass('active') && $('#smbSelectNav li:eq(1)').hasClass('active') && $('#smbSelectNav li:eq(3)').hasClass('active')) 
			{ 
				$('.text-left  li').removeClass('active');
				$('.text-left  li:nth-of-type(4)').addClass('active')
				$('#onthesamec  li:lt(2)').addClass('active');
				$('div.col-xs-5ths').removeClass('console-grey');
				$('div.col-xs-5ths').addClass('console-green');
				$('div.col-xs-5ths span').removeClass('triangle-grey')
				$('div.col-xs-5ths span').addClass('triangle-green')
			}
    
	    if($('#smbSelectNav li.active').length == 4) {
	    	$('.text-left  li').removeClass('active');
			$('#onthesamec  li:lt(3)').addClass('active')
			$('.text-left  li:nth-of-type(4)').addClass('active')
	    }
	    return false;
	});
	$('#smbSelectNav li:eq(4)').click(function () {
		$('#SMBcateg1').hide()
		$('#SMBcateg2').show()
		$('#smbSelectNav li:eq(4)').siblings().removeClass('active')
	});
	$('#smbSelectNav li:lt(4)').click(function () {
		$('#SMBcateg2').hide()
		$('#SMBcateg1').show()
		$('#smbSelectNav li:eq(4)').removeClass('active')
	});
	$('.SMBcateg li').mouseenter(function(){
		$(this).children('.hvr_tooltip').css('display','block')
	})
	$('.SMBcateg li').mouseleave(function(){
		$(this).children('.hvr_tooltip').css('display','none')
	})
	// detect mobile or tablet device
	// if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
		// {
			if($("#owl-example").length){
				$("#owl-example").owlCarousel();
			}

		// }
	// LP Clutter Cleanup Parallax
	function clutterParallax(){
		$CLclutterRight = 0;
		$CLclutterRightDate = 166;
		if($(document).width() < 1300){
			$CLclutterRight = -10;
			$CLclutterRightDate = 26;
		}
		$CLclutterScroll = $(this).scrollTop();
		$CLclutterPrlx = $CLclutterScroll*0.05 + 6;
		$CLclutterDate = $CLclutterScroll*0.05 + 34.7;
		$('#LPcleanup').css({'background-position':'right '+$CLclutterRight+'em top ' + $CLclutterPrlx+'em'});
		$('.currentDate').css({top: $CLclutterDate+'em', right: $CLclutterRightDate+'px'});
	}
	clutterParallax();
	$(window).scroll(clutterParallax);
	$(window).resize(clutterParallax)
	// LP Clutter Cleanup Stage Animation
	$('.character').hover(function(){
		if($(this).attr('id') == 'clutterSkywalker') return;
		$('.talk.'+$(this).attr('id')).fadeIn(100);
		$(this).animate({top: "-=10"},200);
	},function(){
		if($(this).attr('id') == 'clutterSkywalker') return;
		$('.talk.'+$(this).attr('id')).fadeOut(100);
		$(this).animate({top: "+=10"},200);
	});
	$('.character').click(function(){
		scrollToElm('.LPcleanupDrawing.'+$(this).attr('id'));
	});
	// LP Clutter Cleanup Current Date
	var newDate = new Date();
	var clutterMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var clutterDay = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];
	$('#LPCmonth').html(clutterMonth[newDate.getMonth()]);
	$('#LPCday').html(clutterDay[newDate.getDay()]);
	$('#LPCdate').html(newDate.getDate());
	// Partner Location Filters
	$('#showPartFilt').click(function(){
		if($(this).hasClass('active')){
			$(this).html('<i class="fa fa-angle-double-down"></i>SHOW');
			$('.partnerFilters').slideUp('fast');
			$(this).removeClass('active');
		}else{
			$(this).html('<i class="fa fa-angle-double-up"></i>HIDE');
			$('.partnerFilters').slideDown('fast');
			$(this).addClass('active');
		}
	});
	$(window).resize(function(){
		if($(window).width() > 767 ){
			$('.partnerFilters').show();
		}else{
			$('.partnerFilters').hide();
			$('#showPartFilt').html('<i class="fa fa-angle-double-down"></i>SHOW');
			$('.partnerFilters').slideUp('fast');
			$('#showPartFilt').removeClass('active');
		}
	});
	
	// #prodFtrs Parallax
	$(window).scroll(function(){
		if($('#prodFtrs').length){
			var scrollFromTop = $(window).scrollTop();
			var prodFtrsTop = $('#prodFtrs').offset().top;
			var prodFtrsH = $('#prodFtrs').height();
			var prodFtrsBg1 = scrollFromTop-prodFtrsTop;
			var prodFtrsBg2 = prodFtrsBg1*1.1;
			var BLeftPos = 0;
			if($(window).width() >= 768){
				if($(window).width() < 1556){
					BLeftPos = -80;
					if($(window).width() < 1300){
						BLeftPos = -260;
					}
				}else{
					BLeftPos = 0;
				}
				if(prodFtrsBg1 < -539){
					$('#prodFtrs').css({'background-position':'center top ' + prodFtrsBg1 + 'px, right '+ BLeftPos +'px top ' + prodFtrsBg2 + 'px'});
				} else {
					$('#prodFtrs').css({'background-position':'center top -539px, right '+ BLeftPos +'px top ' + prodFtrsBg2 + 'px'});
				}
			}else{
				$('#prodFtrs').css({'background-position':'center top, right -1000px top'});
			}
		}
	});
	
	if($('.alignMid').length && $('.alignMidWrap').length){
			var alignMidWrap = $('.alignMidWrap').height();
			$('.alignMid').each(function(){
				$(this).css({'margin-top': (alignMidWrap-$(this).height())/2});
			});
	}
	
	// Check OS : Windows Mac iOS Android
	var OSName="Unknown OS";
	if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
	if (navigator.appVersion.indexOf("Mac")!=-1) OSName="Mac";
	if (navigator.platform.match(/(iPhone|iPod|iPad)/i)) OSName="iOS";
	if (navigator.userAgent.toLowerCase().indexOf("android") !=-1) OSName = "Android";
	
	if($('#FPprodFtrs').length){
		if(OSName == "Android"){
			$('#FPprodFtrs .sliderContainer .slide01').css({left: '-200%'});
			$('#FPprodFtrs .sliderContainer .slide02').css({left: '-100%'});
			$('#FPprodFtrs .sliderContainer .slide03').css({left: '0%'});
			$('#FPprodFtrs .slideNav a').removeClass('active');
			$('#FPprodFtrs2 .slideNav a').removeClass('active');
			$('#FPprodFtrs .slideNav a[data-fpslide="3"]').addClass('active');
			$('#FPprodFtrs2 .slideNav a[data-fpslide="3"]').addClass('active');
			$('#FPprodFtrs .prodDetails').css({left: '-198%'});
			$('#FPprodFtrs .slideNav #navSelector').attr('class','col-md-2 col-sm-3 col-xs-4 col-sm-push-8 col-md-push-7 col-xs-push-8');
			$('#FPprodFtrs2 .slideNav #navSelector2').attr('class','navSelector2 col-md-4 col-sm-4 col-xs-4 col-sm-push-8 col-md-push-8 col-xs-push-8');
			$('#FPprodFtrs2 .prodDetails').css({left: '-198%'});
		}
		if((OSName == "iOS") || (OSName == "Mac")){
			$('#FPprodFtrs .sliderContainer .slide01').css({left: '-100%'});
			$('#FPprodFtrs .sliderContainer .slide02').css({left: '0%'});
			$('#FPprodFtrs .sliderContainer .slide03').css({left: '100%'});
			$('#FPprodFtrs .slideNav a').removeClass('active');
			$('#FPprodFtrs2 .slideNav a').removeClass('active');
			$('#FPprodFtrs .slideNav a[data-fpslide="2"]').addClass('active');
			$('#FPprodFtrs2 .slideNav a[data-fpslide="2"]').addClass('active');
			$('#FPprodFtrs .prodDetails').css({left: '-99%'});
			$('#FPprodFtrs .slideNav #navSelector').attr('class','col-md-2 col-sm-3 col-xs-4 col-sm-push-5 col-md-push-5 col-xs-push-4');
			$('#FPprodFtrs2 .slideNav #navSelector2').attr('class','navSelector2 col-md-4 col-sm-4 col-xs-4 col-sm-push-4 col-md-push-4 col-xs-push-4');
			$('#FPprodFtrs2 .prodDetails').css({left: '-99%'});
		}
	}
	
	
	
	// Mobile Menu
	function menuH(){
		// var xsMenuH = $('#xsMenu').height();
		// $('.menuWrapper').height(xsMenuH);
		// $('#overlayMenu_1').height(xsMenuH);
		// $('#overlayMenu_2').height(xsMenuH);
	}
	function triggerMenu(){
	// if($('button[data-trigger="openXSMenu"]').length){
			// menuH();
			// $(window).resize(function(){
				// menuH();
			// });
			$('button[data-trigger="openXSMenu"]').click(function(){
				$('#xsMenu').stop().toggleClass('mActive');
				$('body').stop().toggleClass('mActive');
				$('#menuOverlay').stop().toggleClass('mActive');
				$(this).stop().toggleClass('active');
			});
			$('#menuOverlay').click(function(){
				$('body').removeClass('mActive');
				$('#xsMenu').removeClass('mActive');
				$(this).removeClass('mActive');
				$('button[data-trigger="openXSMenu"]').removeClass('active');
			});
			$('.menuWrapper a.menuLink').click(function(){
				var subMenu = $(this).attr('data-subMenu');
				if (typeof subMenu != 'undefined'){
					$('#overlayMenu_1').addClass('mActive');
					$('.menuWrapper.subMenu'+subMenu).addClass('active');
				}
			});
			$('.menuWrapper.level_2 h3').click(function(){
				var lvl2 = $(this).attr('data-open');
				if(lvl2 == 'back'){
					$('#overlayMenu_1').removeClass('mActive');
					$('.menuWrapper.level_2').removeClass('active');
				}else{
					$('#overlayMenu_2').addClass('mActive');
					$('.menuWrapper.level_2 h3').removeClass('active');
					$(this).addClass('active');
					$('.menuWrapper.level_3').removeClass('active');
					$('.menuWrapper.level_3.'+lvl2).addClass('active');
				}
			});
			$('.menuWrapper.level_3 h3').click(function(){
				var lvl3 = $(this).attr('data-open');
				if(lvl3 == 'back'){
					$('.menuWrapper.level_3').removeClass('active');
					$('#overlayMenu_2').removeClass('mActive');
				}
			});
			$('#overlayMenu_1').click(function(){
				$('.menuWrapper.level_2').removeClass('active');
				$('.menuWrapper.level_3').removeClass('active');
				$('#overlayMenu_1').removeClass('mActive');
				$('#overlayMenu_2').removeClass('mActive');
			});
			$('#overlayMenu_2').click(function(){
				$('.menuWrapper.level_3').removeClass('active');
				$('#overlayMenu_2').removeClass('mActive');
			});
		// }
	}
	triggerMenu();
	// $(window).resize(function(){
		// triggerMenu();
	// });


	/* New Menu v2 */
	newMenuV2();
});

	function newMenuV2(){
		$('.mobileMenuTrigger .navbar-toggle').on('click', function(){
			$('nav#mainNav').stop().toggleClass('open');
			$('.navFade').stop().fadeToggle();
		});
		$('.navFade').on('click', function(){
			$('nav#mainNav').stop().toggleClass('open');
			$('.navFade').stop().fadeToggle();
		});

		$('#mainNav .nextLevel').on('click', function(){
			if($(this).hasClass('level_1')){
				if($(this).hasClass('active')){
					$(this).toggleClass('active');
					$(this).parent('.mainLink').siblings('.dropdown-menu').stop().slideToggle();
				}else{
					$('#mainNav .nextLevel.level_1').removeClass('active');
					$(this).addClass('active');
					$('#mainNav .dropdown-menu').stop().slideUp();
					$(this).parent('.mainLink').siblings('.dropdown-menu').stop().slideDown();
				}
			}else{
				if($(this).hasClass('active')){
					$(this).toggleClass('active');
					$(this).parent('h3').next().stop().slideToggle();
				}else{
					$('#mainNav h3 .nextLevel').removeClass('active');
					$(this).addClass('active');
					$('#mainNav .dropdown-menu .col ul').stop().slideUp();
					$(this).parent('h3').next().stop().slideDown();
				}
			}
		});
		
		$('#mainNav #langsel').on('click', function(){
			$('nav#mainNav #lang_down').stop().slideToggle();
		});

		$(window).scroll(function(){
			menuSkrl = $(window).scrollTop();
			if (menuSkrl > 200) {
				$('#mainNav').addClass('active');
				$('nav#mainNav #bigLogo').parent().addClass('col-md-2');
				$('nav#mainNav #bigLogo').addClass('col-md-12');
				$('nav#mainNav .mainLinks').addClass('col-md-push-2');
				$('nav#mainNav .mainLinks').removeClass('col-md-push-0');
			} else {
				$('#mainNav').removeClass('active');
				$('nav#mainNav #bigLogo').addClass('col-md-12');
				$('nav#mainNav #bigLogo').parent().removeClass('col-md-2');
				$('nav#mainNav .mainLinks').removeClass('col-md-push-2');
				$('nav#mainNav .mainLinks').addClass('col-md-push-0');
			}
		});
	}


//Scroll to an Element in 1000 ms
function scrollToElm(scrlElm){
	$('html, body').animate({
		scrollTop: $(scrlElm).offset().top
	}, 1000);
}
//Back to top arrow
$(function() {
	// hide #back-top first
	$(".backTop").hide();
	// fade in #back-top
	$(function () {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$('.backTop').fadeIn();
			} else {
				$('.backTop').fadeOut();
			}
		});
		// scroll body to 0px on click
		$('.backTop a').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	});
});
//disable scroll functions
var keys = [37, 38, 39, 40, 32, 33, 34, 35, 36];
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}
function keydown(e) {
    for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
        }
    }
}
function wheel(e) {
  preventDefault(e);
}
function disable_scroll() {
	$('body').css('overflow','hidden')
  	if (window.addEventListener) {
		window.addEventListener('DOMMouseScroll', wheel, false);
  	}
  window.onmousewheel = document.onmousewheel = wheel;
  document.onkeydown = keydown;
}
function enable_scroll() {
    $('body').css('overflow','auto')	
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;  
}