jQuery(function($){
	$(document).ready(function(){
		
		$("<select />").appendTo("#navigation");
		$("<option />", {
		   "selected": "selected",
		   "value" : "",
		    "text" : responsiveLocalize.text
		}).appendTo("#navigation select");

		$("#navigation a").each(function() {
			var el = $(this);
			if(el.parents('.sub-menu .sub-menu').length >= 1) {
				$('<option />', {
				 'value' : el.attr('href'),
				 'text' : '-- ' + el.text()
				}).appendTo("#navigation select");
			}
			else if(el.parents('.sub-menu').length >= 1) {
				$('<option />', {
				 'value' : el.attr("href"),
				 'text' : '- ' + el.text()
				}).appendTo("#navigation select");
			}
			else {
				$('<option />', {
				 'value' : el.attr('href'),
				 'text' : el.text()
				}).appendTo("#navigation select");
			}
		});

		$("#navigation select").change(function() {
		  window.location = $(this).find("option:selected").val();
		});
		
		$(".fitvids").fitVids();		
		$("#navigation select").uniform();
	
	});
});