function gotoUrl(ccd) {
	var country_id = ccd;
	var partners = 0;
	if(ccd.indexOf("p_") === 0) {
		country_id = ccd.substr(2);
		partners = 1;
	}
	if (typeof tagit != 'undefined') {
		tagit.addCookie('bdselcid', country_id);
	} else {
		setCookie('bdselcid', country_id, 0, '/', '.bitdefender.com');
	}
	setCookie('country_id', country_id, 0, '/', '.bitdefender.com');
	setTimeout(function() {
		if(partners == 0) {
			window.location.href = languagesURLs[country_id];
		} else {
			window.location.href = planguagesURLs[country_id];
		}
	},500);
	
}
