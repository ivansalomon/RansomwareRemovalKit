$.each(["show", "toggle", "toggleClass", "addClass", "removeClass"], function(){
    var _oldFn = $.fn[this]; 
    $.fn[this] = function(){
        var hidden = this.find(":hidden").add(this.filter(":hidden"));
        var result = _oldFn.apply(this, arguments);
        hidden.filter(":visible").each(function(){
            $(this).triggerHandler("show");
        });
        return result;
    }
});
(function($){
	$.cartWidget = function(element) {
		this.init = function(element) {
			 buildWidget(element);
		};

		this.init(element);
	}

	$.fn.cartWidget = function(options) {
		options = options || {};
		$.fn.cartWidget.settings = $.extend({},$.fn.cartWidget.settings,options);
		if (typeof tagit == 'object') {
			$("#"+$.fn.cartWidget.settings.countId).hide();
			$.fn.cartWidget.settings.elements = this;
			tagit.getCartSnapshot('','$.fn.cartWidget.setCart');
		}
	};

	$.fn.cartWidget.setCart = function(status,data) {
		$.fn.cartWidget.settings.status = parseInt(status);
		$.fn.cartWidget.settings.cartData = data;

		return $.fn.cartWidget.settings.elements.each(function() {
       		(new $.cartWidget($(this)));
    	});
		return true;
	};

	function buildWidget(element) {
		var data = $.fn.cartWidget.settings.cartData;
		var count = 0;

		if (data.contents != undefined && data.contents.products.length != 0) {
			$('#shopcart').fadeIn(300).css('display','inline-block');
		}

		if ($.fn.cartWidget.settings.status == 0) {
			$("#"+$.fn.cartWidget.settings.countId).text(data.contents.products.length);

			$(element).html('<div class="triangle"></div>').append($("<div/>").attr("id","shopInnerHead").addClass('col-xs-12 col-md-12')
			 	.append($("<h4/>").addClass('col-xs-6 col-md-6').text(_("Your Cart")))
			 	.append($("<a/>").addClass('col-xs-6 col-md-6').attr("id","viewCartLink").attr("href",data.checkout_url).attr('target','_blank').text(_("View cart")))
			);

			$.each(data.contents.products, function(i, p) {
				var greyClass = (i % 2 != 0) ? "" : "grey";
				$(element).append($("<div/>").addClass("shopRow").addClass('col-xs-12 col-md-12').addClass("row_"+p.id)
					.append($("<div/>").addClass("shopProdImage img-responsive col-xs-3 col-sm-3 col-md-3 nopadding").html('&nbsp;'))
					.append($("<span/>").addClass("shopProductName col-xs-9 col-sm-9 col-md-9 nopadding").html(p.name + '<br/>' + translateVariation(p.variation)))
					.append($("<span/>").addClass("shopPrice col-xs-12 col-md-12 nopadding").html(formatPrice((p.unitPrice*p.qty),data.currency)))
				);
				if (p.unitDiscount > 0) {
					var discountName = (typeof p.discountName != 'undefined' && p.discountName != "") ? p.discountName : _("Discount");
					$(element).append($("<div/>").addClass("discountZone").addClass('col-xs-12 col-sm-12 col-md-12').css('white-space','normal')
						.append($("<span/>").addClass("shopProductName").text(discountName).addClass('col-xs-8 col-sm-8 col-md-8'))
						.append($("<span/>").addClass("shopPrice").text("-"+formatPrice((p.unitDiscount*p.qty),data.currency)).addClass('col-xs-4 col-sm-4 col-md-4'))
					);
				}
				if (typeof p.image != 'undefined' && p.image != '') {
					$(".row_"+p.id+" .shopProdImage").html('').append($("<img/>").attr("src",p.image).css('max-height','60px'));
				}
			});

			$(element).append($("<div/>").addClass("total col-xs-12 col-md-12")
				.append($("<span/>").addClass("left col-xs-5 col-md-5").text(_("TOTAL")+":"))
				.append($("<span/>").addClass("right col-xs-6 col-md-6").text(formatPrice(data.contents.total_value,data.currency)))
			).append($("<button/>").attr("id","checkOut").addClass("btn btn-sm btn-success col-xs-12 col-md-12").text(_("CHECKOUT")));

			$(element).on('click','#viewCartLink', function(e) {
				e.preventDefault();
				tagit.addCookie('bdsh_page','1'); // session
				tagit.addCookie('refcw','1',60); // only 60 sec
				_link = $(this).attr('href');
				setTimeout(function() {
					window.location = _link;
				},400);
			});

			$(element).on('click',"#checkOut",{url:data.checkout_url},function(e) {
				e.preventDefault();
				tagit.addCookie('bdsh_page','2'); // only 60 sec
				tagit.addCookie('refcw','1',60); // only 60 sec
				setTimeout(function() {
					window.location = e.data.url;
				},400);
				return false;
			});

			$(element).on('show', function(e) {
				setTimeout(function() {
					$(element).find(".shopRow").each(function(i) {
						$(this).find(".shopProductName:first").css('margin-top',Math.round(($(this).height()-$(this).find('.shopProductName:first').height())/2)+"px");
						$(this).find(".shopPrice:first").css('margin-top',Math.round(($(this).height()-$(this).find('.shopPrice:first').height())/2)+"px");
					});
					$(element).find(".discountZone").each(function(i) {
						$(this).find(".shopProductName:first").css('margin-top',Math.round(($(this).height()-$(this).find('.shopProductName:first').height())/2)+"px");
					});
				},400);

				if (typeof s == 'object') {
					var section = DEFAULT_LANGUAGE || 'us';
					section = (section == 'en') ? 'us' : section;

					s.clearVars();
					s.prop11 = window.location.hostname;
					oPageName(section + ':store:shopping cart:cart widget');
					oSiteHierarchy(section, section + ':store', section + ':store:cart widget');
					oSiteTeritory(window.location.hostname, 'info.bitdefender.com', 'N/A', DEFAULT_LANGUAGE);

					var s_code=s.t();
				}
			});

			if (data.contents.products.length > 0) {
				var nrProducts = data.contents.products.length;
				/*if (nrProducts == 1 || nrProducts == 2) {
					$("#favicon").remove();
					var link = document.createElement('link');
					link.id = 'favicon';
					link.type = 'image/x-ico';
					link.rel = 'shortcut icon';
					link.href = 'http://download.bitdefender.com/resources/themes/red/images/favico_' + nrProducts + '.ico';
					document.getElementsByTagName('head')[0].appendChild(link);
				}*/
				$("#"+$.fn.cartWidget.settings.countId).show();
				$('#shopContainer').show();
				
				if (typeof s == 'object') {
					var section = DEFAULT_LANGUAGE || 'us';
					section = (section == 'en') ? 'us' : section;

					s.clearVars();
					s.prop11 = window.location.hostname;
					oPageName(section + ':store:shopping cart:cart widget:present');
					oSiteHierarchy(section, section + ':store', section + ':store:cart widget:present');
					oSiteTeritory(window.location.hostname, 'info.bitdefender.com', 'N/A', DEFAULT_LANGUAGE);

					var s_code=s.t();
				}
			}

		} else {
			$("#"+$.fn.cartWidget.settings.countId).text('0');
			$(element).html('').append($("<div/>").attr("id","shopInnerHead").addClass('col-xs-12 col-md-12').html('<center>'+_('Your cart is empty.')+'</center>'));
		}
	};

	function translateVariation(text) {
		text = text.replace('PC',_('PC')).replace('PCs',_('PCs'));
		text = text.replace('Year',_('Year')).replace('Years',_('Years'));
		text = text.replace('Intervention',_('Intervention')).replace('Interventions',_('Interventions'));

		return text;
	};

	function _(text) {
		if ($.fn.cartWidget.settings.texts.hasOwnProperty(text)) {
			return $.fn.cartWidget.settings.texts[text];
		}
		return text;
	};

	function formatPrice(value,currency) {
		var value = value.toFixed(2);
		var price = value + ' ' + currency;
		if (currency == 'USD') {
			price = '$'+value;
		}
		return price;
	};

	function cookie(name, value, options) {
	    if (typeof value != 'undefined') { // name and value given, set cookie
	        options = options || {};
	        if (value === null) {
	            value = '';
	            options.expires = -1;
	        }
	        var expires = '';
	        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
	            var date;
	            if (typeof options.expires == 'number') { // seconds
	                date = new Date();
	                date.setTime(date.getTime() + (options.expires * 1000));
	            } else {
	                date = options.expires;
	            }
	            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
	        }
	        // CAUTION: Needed to parenathesize options.path and options.domain
	        // in the following expressions, otherwise they evaluate to undefined
	        // in the packed version for some reason...
	        var path = options.path ? '; path=' + (options.path) : '';
	        var domain = options.domain ? '; domain=' + (options.domain) : '';
	        var secure = options.secure ? '; secure' : '';
	        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	    } else { // only name given, get cookie
	        var cookieValue = null;
	        if (document.cookie && document.cookie != '') {
	            var cookies = document.cookie.split(';');
	            for (var i = 0; i < cookies.length; i++) {
	                //var cookie = jQuery.trim(cookies[i]);
	                var cookie = cookies[i].replace(/^\s+|\s+$/g,"");;
	                // Does this cookie string begin with the name we want?
	                if (cookie.substring(0, name.length + 1) == (name + '=')) {
	                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	                    break;
	                }
	            }
	        }
	        return cookieValue;
	    }
	};

	$.fn.cartWidget.settings = {
		countId: 'shopNotif',
		texts: {}
	};
})(jQuery);