jQuery(function($){
	$(document).ready(function(){
		$(".gallery a").prettyPhoto({
			theme: 'pp_default',
			animation_speed:'normal',
			allow_resize: true,
			keyboard_shortcuts: true,
			show_title: false,
			slideshow: 5000,
			social_tools: false,
			autoplay_slideshow: false,
			overlay_gallery: true
		});
	});
});