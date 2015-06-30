function StoreCallbacks(tags)
{
	var _tags	=	{};
	var _cbs	=	{};
	var _cbm	=	{};
	var _lang	=	'en';
	var _geoip	=	'';
	
	if(typeof DEFAULT_LANGUAGE != 'undefined')
		_lang	=	DEFAULT_LANGUAGE;
	
	if(typeof geoip_code != 'undefined')
		_geoip	=	geoip_code.toLowerCase();
	
	if(typeof tags == 'undefined')
		tags = [];
	
	if($.isArray(tags))
	{
		for(var i in tags)
		{
			if(!(tags[i] in _tags))
			{
				_tags[tags[i]] = 1;
			}
		}
	}
	
	var objSize = function(obj) {
		var size = 0, key;
		for (key in obj) {
			if (obj.hasOwnProperty(key)) size++;
		}
		return size;
	};
	
	this.setLanguage = function(lang)
	{
	    if(typeof lang != 'undefined')
		_lang	= lang;
	}

	this.setGeoipCode = function(geoip_code)
	{
	    if(typeof geoip_code != 'undefined')
		_geoip	= geoip_code.toLowerCase();
	}
	
	this.registerTags = function(tags)
	{
		if(typeof tags == 'undefined')
			return false;
		
		if($.isArray(tags))
		{
			for(var i in tags)
			{
				if(!(tags[i] in _tags))
				{
					_tags[tags[i]] = 1;
					
					if(objSize(_cbs) > 0)
					{
						var tmp = [];
						var match = 0;
						for(var k in _cbs)
						{
							if(k in _cbm)
								continue;
							
							tmp = k.split('_')[0].split('.');
							match = 0;
							for(var j in tmp)
							{
								if(tmp[j] in _tags)
								{
									match++;
								}
								else
									break;
								
								if(match == tmp.length)
									break;
							}
							
							if(match == tmp.length)
							{
								_cbm[k] = 1;
							}
						}
					}
				}
			}
			
			return true;
		}
		
		return false;
	};
	
	this.registerGlobalTag = function(o)
	{
		/*
			o.tag	-	tag to be set, if tag exists return false
			o.func	-	if true set tag else ignore
		*/
		
		if($.isPlainObject(o))
		{
			if('func' in o)
			{
				if('tag' in o)
				{
					if(!(o.tag in _tags) && o.func() == true)
					{
							_tags[o.tag] = 1;
							
							if(objSize(_cbs) > 0)
							{
								var tmp = [];
								var match = 0;
								for(var i in _cbs)
								{
									if(i in _cbm)
										continue;
									
									tmp = i.split('_')[0].split('.');
									match = 0;
									for(var j in tmp)
									{
										if(tmp[j] in _tags)
										{
											match++;
										}
										else
											break;
										
										if(match == tmp.length)
											break;
									}
									
									if(match == tmp.length)
									{
										_cbm[i] = 1;
									}
								}
							}
							
							return true;
					}
				}
			}
		}
		
		return false;
	};
	
	this.registerCallback = function(o)
	{
		/*
			tags	-	array of tags to be matched ex: ['homepage','av']
			exclude	-	optional, array of tags to be excluded ex: ['media','business']
			lang	-	optional, lang array, ex: ['en','de'], default [] // '*' - all / '-' - exclude mode
			geoip	-	optional, geoip array, ex: ['us','ca'], default [] // '*' - all / '-' - exclude mode
			cb	-	callback function
			
			return true / false
		*/

		if(!$.isPlainObject(o))
			return false;
			
		if(!('cb' in o) || !$.isFunction(o.cb))
			return false;
			
		if(!('tags' in o) || !$.isArray(o.tags) || o.tags.length < 1)
			return false;
		
		if(!('exclude' in o) || !$.isArray(o.exclude))
			o.exclude = [];
		
		if(!('lang' in o) || !$.isArray(o.lang))
			o.lang = [];
			
		if(!('geoip' in o) || !$.isArray(o.geoip))
			o.geoip = [];
		
		if($.inArray('-',o.lang) == -1)
		{
		    if($.inArray(_lang,o.lang) == -1 && $.inArray('*',o.lang) == -1)
			return false;
		}
		else
		{
		    if($.inArray(_lang,o.lang) != -1)
			return false;		
		}
		
		if($.inArray('-',o.geoip) == -1)	
		{
		    if($.inArray(_geoip,o.geoip) == -1 && $.inArray('*',o.geoip) == -1)
			return false;
		}
		else
		{
		    if($.inArray(_geoip,o.geoip) != -1)
			return false;		
		}
		
		var _s = o.tags.join('.')+'_'+o.exclude.join('.');
		
		if(!(_s in _cbs))
			_cbs[_s] = [];
		
		_cbs[_s].push(o);
		
		var _match = 0;
		
		for(i in o.tags)
		{
			if(o.tags[i] in _tags)
			{
				_match++;
			}
			else
				break;
			
			if(_match == o.tags.length)
				break;
		}
		
		if(_match == o.tags.length)
		{
			_cbm[_s] = 1;
		}
	};
	
	this.getCallbacks = function(tags, return_full_objects)
	{
		var _s_tags = {};
		var _s_cbs = {};
		
		if(typeof return_full_objects != 'boolean')
		    return_full_objects = false;
		
		if(typeof tags == 'undefined' || !$.isArray(tags))
			tags = [];
		
		for(var i in _tags)
			if(_tags[i] == 1)
				_s_tags[i] = 1;
			
		for(var i in tags)
			_s_tags[tags[i]] = 1;
		
		var ret = [];
		if(objSize(_cbs) > 0)
		{
			var tmp = [];
			var match = 0;
			for(var i in _cbs)
			{
				if(i in _cbm)
				{
					ret.push(i);
					continue;
				}
				
				tmp = i.split('_')[0].split('.');
				match = 0;
				for(var j in tmp)
				{
					if(tmp[j] in _s_tags)
					{
						match++;
					}
					else
						break;
					
					if(match == tmp.length)
						break;
				}
				
				if(match == tmp.length)
				{
					ret.push(i);
				}
			}
		}
		
		var f_ret = [];
		var match = 0;
		for(var i in ret)
		{
			tmp = _cbs[ret[i]][0]['exclude'];
			
			if(tmp.length > 0)
			{
				match = 0;
				for(var j in tmp)
				{
					if(tmp[j] in _s_tags)
					{	
						match = 1;
						break;
					}
				}
				
				if(match != 0)
					continue;
				else
				{
					for(var k in _cbs[ret[i]])
					{
					    if(return_full_objects != true)
						f_ret.push(_cbs[ret[i]][k].cb);
					    else
						f_ret.push(_cbs[ret[i]][k]);
					}
				}
			}
			else
			{
				for(var k in _cbs[ret[i]])
				    if(return_full_objects != true)
					f_ret.push(_cbs[ret[i]][k].cb);
				    else
					f_ret.push(_cbs[ret[i]][k]);
			}
		}
		
		return f_ret;
	};
	
	this.go = function(ocg, tags)
	{
		var _s_cbs = this.getCallbacks(tags);
		
		for(var i in _s_cbs)
		{
			try
			{
				_s_cbs[i].call(ocg);
			}
			catch(ex)
			{}
		}
	};
	
	this.debug = function(tags)
	{
	    try
	    {
		console.log('Defined Callbacks:');
		
		if(typeof tags != 'undefined')
		{
		    if(!$.isArray(tags))
			tags = [];
		}
		
		var obj = this.getCallbacks(tags,true);
		console.log('/* Active Callbacks */');
		
		for(var i in obj)
		{
		    console.log('---------------- Callback ----------------');
		    console.log('For tags: '+obj[i].tags.join(','));
		    console.log('Excluded tags: '+obj[i].exclude.join(','));
		    console.log('Lang: '+obj[i].lang.join(','));
		    console.log('Geoip: '+obj[i].geoip.join(','));
		    console.log('Function: '+obj[i].cb);
		    console.log('---------------- End Callback ----------------');
		}
		
		console.log('/* Defined Callbacks */');
		
		for(var j in _cbs)
		{
		    var obj = _cbs[j];
		    for(var i in obj)
		    {
			console.log('---------------- Callback ----------------');
			console.log('For tags: '+obj[i].tags.join(','));
			console.log('Excluded tags: '+obj[i].exclude.join(','));
			console.log('Lang: '+obj[i].lang.join(','));
			console.log('Geoip: '+obj[i].geoip.join(','));
			console.log('Function: '+obj[i].cb);
			console.log('---------------- End Callback ----------------');
		    }
		}
	    }
	    catch(ex)
	    {
		console.log(ex.message);
	    }
	}
}