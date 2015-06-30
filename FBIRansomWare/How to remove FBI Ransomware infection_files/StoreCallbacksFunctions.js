try
{
    StoreCBS = new StoreCallbacks(CBSTags);
    StoreCBS.setGeoipCode(CBSGeoip);
}
catch(ex) {}

$(function() {
    try
    {
	/*
	    //home: homepage
	    //listari: solutions,business,premium,downloads
	    //pagini: comparison,productpage
	    //other: initCount:x,theme:THEME,product_alias,product_id,onload,onchange,onchangeusers,onchangeyears

	    
	    o = {
		tags:		[], 
		exclude:	[],
		lang:		[],
		geoip:		[],
		cb:		function() {}
	    };
	    StoreCBS.registerCallback(o);
	*/
	
	
	    o = {
		tags:		['selector'], 
		exclude:	[],
		lang:		['nl'],
		geoip:		['be'],
		cb:		addEptimumLinks
	    };
	    StoreCBS.registerCallback(o);

	    /* Upsell FR */
	    
	    o = {
		tags:		['selector','av'], 
		exclude:	[],
		lang:		['fr'],
		geoip:		['*'],
		cb:		frUpsellOverlay
	    };
	    StoreCBS.registerCallback(o);
	    
	    o = {
		tags:		['selector','is'], 
		exclude:	[],
		lang:		['fr'],
		geoip:		['*'],
		cb:		frUpsellOverlay
	    };
	    StoreCBS.registerCallback(o);
	    
	    /* End Upsell FR */
	
	    /* Product pages Upsell EN, DE */	    
	    o = {
		tags:		['selector','productpage'], 
		exclude:	[],
		lang:		['en','de'],
		geoip:		['*'],
		cb:		productUpsellOverlay
	    };
	    StoreCBS.registerCallback(o);
	    
	    o = {
		tags:		['selector','comparison'], 
		exclude:	[],
		lang:		['en','de'],
		geoip:		['*'],
		cb:		productUpsellOverlay
	    };
	    StoreCBS.registerCallback(o);	    
	    /* End Upsell EN, DE */
    }
    catch(ex) {}
});


function addEptimumLinks()
{
    if(!('buylink' in this.selected_variation))
	return ;

    var ys = this.config.years_class;
    var ln = this.config.buy_class;
    var pc = this.config.price_class;
    
    if(DEFAULT_LANGUAGE == 'fr')					    
    {
	$('.'+ys+' option').filter(function() {
    	    return parseInt($(this).val()) > 1000;
	}).text("abonnement mensuel");
    }
    				    
    $('.'+ln).attr('href',this.selected_variation.buylink);
}

function frUpsellOverlay()
{
    var aclass = this.config.buy_class;
    
    var href = '';
    
    if(DEFAULT_LANGUAGE != 'fr')
	return;
	
	var that = this;
	var ispsic = false;
	$(".with-psic").each(function() {
		if ($(this).is(':checked')) {
			$(".tb_"+aclass).hide();
			$("."+aclass).show();
			ispsic = true;
			return ;
		}
	});
	if (ispsic) return;
    
    if(this.selected_variation.product_id == '2465')
	href = 'http://www.bitdefender.fr/media/html/overlayfr2013/avis.html?var=av-'+this.selected_users+'u-'+this.selected_years+'y;is-'+this.selected_users+'u-'+this.selected_years+'y&height=530&width=732&KeepThis=true&TB_iframe=true';
    else if(this.selected_variation.product_id == '2466')
	href = 'http://www.bitdefender.fr/media/html/overlayfr2013/ists.html?var=ts-'+this.selected_users+'u-'+this.selected_years+'y;is-'+this.selected_users+'u-'+this.selected_years+'y&height=530&width=732&KeepThis=true&TB_iframe=true';
    else
	return;

    
    if($('.tb_'+aclass).length < 1)
    {
	if($('.'+aclass).length < 2)
	{
	    $('.'+aclass).clone().attr("href", href).addClass('thickbox tb_'+aclass).removeClass(aclass).hide().insertAfter('.'+aclass);
	}
	else
	{
	    $('.'+aclass).each(function() {
		$(this).clone().attr("href", href).addClass('thickbox tb_'+aclass).removeClass(aclass).hide().insertAfter(this);
	    });
	}
    }
    else
	$(".tb_"+aclass).attr('href',href);
    
    try
    {
	if(typeof tb_init == 'undefined')
	{
	    $("head").append("<link>");
	    css = $("head").children(":last");
	    css.attr({
    		rel:  "stylesheet",
    		type: "text/css",
    		href: "/media/html/overlayfr2013/thickbox.css"
	    });
    
	    $.getScript("/media/html/overlayfr2013/thickbox.js", function(){});
	}
	else
	{
	    if($.isFunction(tb_init))
	    {
		tb_init('a.thickbox, area.thickbox, input.thickbox');
	    }
	}
    }
    catch(ex) {};
    
    if(this.selected_years <= 3 && !$("#with-psic").is(':checked'))
    {
	$('.'+aclass).hide();
	$('.tb_'+aclass).show();
    }
    else
    {
	$('.'+aclass).show();
	$('.tb_'+aclass).hide();
    }
}


function productUpsellOverlay()
{
    var aclass = this.config.buy_class;
    var svar = this.selected_variation;
    
    $('.'+aclass).unbind('click.productUpsellOverlay');

    if($("#with-psic").is(':checked'))
	return ;
    
    if($("#with-fs").is(':checked'))
		return ;
    
    if('discount' in svar || 'upsell' in svar || 'promotion' in svar)
	return ;
	
    if(!('upsell_info' in svar))
		return ;
	
    var href = svar.upsell_info.url;
    var w = svar.upsell_info.w;
    var h = svar.upsell_info.h;
    
    $('.'+aclass).bind('click.productUpsellOverlay', function(ev){
		
	tagit.addCookie('bd_site_upsell_overlay','1',120);
		
	if (parseInt(svar.upsell_info.display) == 1) {		    
		ev.preventDefault();
		$.fancybox({
	    	'padding' : 0,
	    	'autoScale' : false,
	    	'transitionIn' : 'none',
	    	'transitionOut' : 'none',
	    	'width' : parseInt(w) + 30,
	    	'height' : parseInt(h) + 30,
	    	'href' : href,
	    	'type' : 'iframe',
	    	'showCloseButton' : false,
	    	'closeBtn': false
		});
	} else {
		var olanguage = (DEFAULT_LANGUAGE == "en") ? "us" : DEFAULT_LANGUAGE;
        if (typeof(s) == 'object') {
            	s.clearVars();
            	var _page = olanguage+':content:upsell:'+svar.upsell_info.omniture_info;
            	s.channel = olanguage;
            	oPageName(_page);
            	oSiteHierarchy(olanguage, olanguage+':content', olanguage+':content:upsell');
            	oSiteTeritory(window.location.hostname, 'info.bitdefender.com', 'N/A', geoip_country_code().toLowerCase());
            	var s_code=s.t();
        }
	}
    });
}

