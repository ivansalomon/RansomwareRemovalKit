jQuery(function($){
	$(document).ready(function(){
		
		/*tipsy*/
		$('.office-tooltip').tipsy({
			fade: false,
			gravity: 's'
		});
		
		/*give top bar opacity*/
		$(window).scroll(function () {
			if ($(this).scrollTop() > 45) {
				$('.top-bar-fixed').css({
					opacity: "0.98"
				});
			} else {
				$('#top-bar').css({
					opacity: "1"
				});
			}
		});
		
		/* superFish*/
		$("ul.sf-menu").superfish({ 
			autoArrows: true,
			delay: 100,
			animation: {opacity:'show',height:'show'},
			speed: 'fast'
		});

		/* back to top*/
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$('a[href=#toplink]').fadeIn();
			} else {
				$('a[href=#toplink]').fadeOut();
			}
		});
		$('a[href=#toplink]').on('click', function(){
			$('html, body').animate({scrollTop:0}, 'fast');
			return false;
		});
		
		/* portfolio hover*/
		$('.portfolio-item').hover(function(){
			$(this).find('img').stop(true, true).animate({opacity: 0.8},200) }
			,function(){
			$(this).find('img').stop(true, true).animate({opacity: 1},200)
		});
		
		/* PrettyPhoto*/
		if ($(window).width() > 767) {
			
			$(".prettyphoto-link").prettyPhoto({
				theme: 'pp_default',
				animation_speed:'normal',
				allow_resize: true,
				keyboard_shortcuts: true,
				show_title: false,
				social_tools: false,
				slideshow: false,
				autoplay_slideshow: false
			});
			
			$("a[rel^='prettyPhoto']").prettyPhoto({
				theme: 'pp_default',
				animation_speed:'normal',
				allow_resize: true,
				keyboard_shortcuts: true,
				show_title: false,
				slideshow: 5000,
				social_tools: false,
				autoplay_slideshow: true,
				overlay_gallery: true
			});
			
		}
		
		/*opacity animations*/
		$('.home-entry img, .gallery-photo img, .loop-entry-thumbnail img, .post-thumbnail img').hover(function(){
			$(this).stop(true, true).animate({opacity: 0.8},500) }
			,function(){
			$(this).stop(true, true).animate({opacity: 1},500)
		});
		
		/* Equal Heights*/
		function equalHeight(group) {
			var tallest = 0;
			group.each(function() {
				var thisHeight = $(this).height();
				if(thisHeight > tallest) {
					tallest = thisHeight;
				}
			});
			group.height(tallest);
		}
		equalHeight($(".pricing-content li"));
		equalHeight($(".pricing-header"));
	
	}); /* END doc ready*/
}); /* END function*/