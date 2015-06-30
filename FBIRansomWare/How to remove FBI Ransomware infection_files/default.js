/*************************************************** GENERAL ******************************************************/
//functii cu caracter general
function General(){}
//elimina spatiile de la inceput si de la sfarsit
General.trimAll = function(sString) 
{
    if(sString.length == 0)
	return '';
    while (sString.substring(0,1) == ' ')
	sString = sString.substring(1, sString.length);
    while (sString.substring(sString.length-1, sString.length) == ' ')
	sString = sString.substring(0,sString.length-1);
    return sString;
}

General.isEmail = function(login)
{
    if(!login.match(/^[a-zA-Z\._\-0-9]{1,}@[a-zA-Z0-9\-_\.]{1,}\.[a-zA-Z]{2,}$/))
		return false;
    return true;
}

General.isKey = function(serial_str)
{
    if(!serial_str.match(/^[a-fA-F0-9\- ]{20,}$/) &&  !serial_str.match(/^[a-zA-Z0-9\- ]{7,}$/))
		return false;
    return true;
}

//verifica daca este intreg sau nu
General.isNumeric = function(sText)
{
   if(sText.length == 0)
	return false;
   var ValidChars = "0123456789";//mie imi trebuie intreg
   var Char;
   var i;
   for (i = 0; i < sText.length; i++)
   { 
	Char = sText.charAt(i); 
	if (ValidChars.indexOf(Char) == -1) 
	    return false;
   }
   return true;					     
}

//verifica daca este intreg sau nu
General.isReal = function(sText)
{   
    if(sText.length == 0)
            return false;
    var ValidChars = "0123456789.";
    //mie imi trebuie intreg   
    var Char;   
    var i;   
    for (i = 0; i < sText.length; i++)   
    {        
	Char = sText.charAt(i);        
	if (ValidChars.indexOf(Char) == -1)
	            return false;   
    }   
    return true;
}

//imi intoarce un array cu numerele de zile din luna
General.DaysArray = function(n)
{
  for (var i = 1; i <= n; i++)
  {
      this[i] = 31 ;
      if (i == 4 || i == 6 || i == 9 || i == 11)
      {
	this[i] = 30;
      }
      if (i == 2)
      {
	this[i] = 29;
      }
  }
  return this;
}

//imi intoarce numarul de zile din luna februarie in functie de an
General.daysInFebruary = function(year)
{
  // February has 29 days in any year evenly divisible by four,
  // EXCEPT for centurial years which are not also divisible by 400.
  return (((year % 4 == 0) && ((!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28);
}

//verifica o data
General.checkDate = function(day,month,year)
{
    nrDays = General.DaysArray(12);
    //an bisect
    if(month == 2 && day > General.daysInFebruary(year))
            return false;
	
    if(day > nrDays[month])
        return false;
    return true;																    
}

General.OpenScanWindow = function(url, name)
{
    var day = new Date();
    var parameters = '';
    var pageName = name ? name : day.getTime(); 
    if (screen.height < 525) 
	    parameters = 'scrollbars=yes,status=no,width=746,height=525,menubar=no,left=50,top=50,location=no,resizable=no,directories=no';
    else
	    parameters = 'scrollbars=no,status=no,width=746,height=525,menubar=no,left=50,top=50,location=no,resizable=no,directories=no';

    eval("bitdefender"+pageName+" = window.open('"+url+"','"+pageName+"','"+parameters+"')");
    if (eval("bitdefender"+pageName) && window.focus)
	    eval("bitdefender"+pageName).focus();
}

General.CheckSearchForm = function(form)
{
	var query = form.elements["query"].value;
	
	if (query.length < 3)
	{
		alert("Search Query is too short.");
		return false;
	}
	if (query == "enter query here ...")
	{
		alert("Please enter your search query.");
		return false;
	}	
	return true;
}



/* *******************************   COOKIES    ************************* */
General.GetCookie = function(name) 
{
    var start = document.cookie.indexOf(name+"=");
    var len = start+name.length+1;
    if ((!start) && (name != document.cookie.substring(0,name.length))) return null;
    if (start == -1) return null;
    var end = document.cookie.indexOf(";",len);
    if (end == -1) end = document.cookie.length;
    return unescape(document.cookie.substring(len,end));
}

General.SetCookie = function(name,value,expires2,path,domain) 
{
    var expires = new Date();
    expires.setTime(expires.getTime() + 24*60*60*90*1000);

    document.cookie = name + "=" + escape(value) + "; expires=0" +
        //((expires) ? "; expires=0" : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "");
}

General.DeleteCookie = function(name,path,domain) 
{
    if (General.GetCookie(name)) document.cookie = name + "=" +
       ( (path) ? ";path=" + path : "") +
       ( (domain) ? ";domain=" + domain : "") +
       ";expires=Thu, 01-Jan-70 00:00:01 GMT";
}

//echivalentul str_replace din php
General.str_replace = function(search, replace, subject)
{
    var temp = subject.split(search);
    return temp.join(replace);
}

General.setReferenceID = function(buttonID)
{
	return true;
	var referenceID = General.GetCookie("referenceID");
	var buyOnlineLink = document.getElementById(buttonID);

	/** referenceID is available only on DigitalRiver */
	if(!buyOnlineLink.href.match('digitalriver'))
	    return false;
	
	/** verify id referenceID is already included or not */
	if(buyOnlineLink.href.match('referenceID'))
	    return false;
	
	/** is cookie set & well formatted ? */
	if(referenceID == null || referenceID.length != 32)
	    return false;
	
	/** add referenceID to buy link */
	var lastChar = buyOnlineLink.href.substring(buyOnlineLink.href.length-1, buyOnlineLink.href.length);
	if(lastChar != "/")
	    buyOnlineLink.href = buyOnlineLink.href + "/";	
	buyOnlineLink.href = buyOnlineLink.href + "referenceID." + referenceID;
	
	return true;
}


function popUpPage(url, parameters, name)
{
    var day = new Date();
    var pageName = name ? name : day.getTime();
	
    eval("bitdefender"+pageName+" = window.open('"+url+"','"+pageName+"','"+parameters+"')");
	    
    if (eval("bitdefender"+pageName) && window.focus) eval("bitdefender"+pageName).focus();
}

function formCheckAdminModifyAccount(form)
{
        var status = form.elements["nfo[user_status]"].value;
        var status_actual = form.elements["nfo[user_status_actual]"].value;
        var message = form.elements["nfo[user_message]"].value;
	
        if(status != status_actual && message == "")
        {
		alert("Please write a message to user.");
		return false;
	}
	return true;
}


// left menu
/*  Script made by Martial Boissonneault ) 2001-2003 http://getElementById.com/ */
function SwitchMenu(obj)
{
    if(document.getElementById)
    {
	    var el = document.getElementById(obj);
	    var ar = document.getElementById("cont").getElementsByTagName("DIV");
	    if(el.style.display == "none")
	    {
		for (var i=0; i<ar.length; i++)
		{
		    ar[i].style.display = "none";
		}
		el.style.display = "block";
	    }
	    else
	    {
		el.style.display = "none";
	    }
    }
}


// Site vechi 
function ShowDate(){
        this_month = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

        var today = new Date();

        var day   = today.getDate();
        var month = today.getMonth();
        var year  = today.getYear();
        if (year < 1900){
               year += 1900;
        }
          return(this_month[month]+" "+day+", " +year);
}

function ShowDateRo(){
        this_month = new Array("Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie");

        var today = new Date();

        var day   = today.getDate();
        var month = today.getMonth();
        var year  = today.getYear();
        if (year < 1900){
               year += 1900;
        }
          return(day+" "+this_month[month]+" "+year);
}

// ################################################

var countrySelect_URLs = new Array();

countrySelect_URLs[0]="http://www1.bitdefender.com/site/";
countrySelect_URLs[1]="http://www1.bitdefender.fr/site/";
countrySelect_URLs[2]="http://www1.bitdefender.de/site/";
countrySelect_URLs[3]="http://www1.bitdefender.ro/site/";
countrySelect_URLs[4]="http://www1.bitdefender.es/site/";
countrySelect_URLs[5]="http://www1.bitdefender.com/en/";


function jumpToURL(formName,menuName) 
{
    var obj = document.getElementById("countrySelect");
    var index = obj.selectedIndex;
    var url = eval(menuName + "_URLs[" + index + "]") + formName;
    // alert (url); return;
    document.title = url;
    location.href = url;
} // END FUNCTION
// ###############################################################

function setCookie(name, value, expires2, path, domain)
{
	var expires = new Date();
	expires.setTime(expires.getTime() + 24*60*60*90*1000);
	            
	document.cookie= name + "=" + escape(value) +
	    ((expires) ? "; expires=" + expires.toGMTString() : "") +
	    ((path) ? "; path=" + path : "") +
	    ((domain) ? "; domain=" + domain : ""); 
 }


// ###############################################################

// SEO
General.getSEOInfo = function(form,BASE_URI, title_id, description_id)
{
    
	var fromTitle = document.getElementById (title_id);
	var fromDescription = document.getElementById (description_id);
	var fromContent = document.getElementById ('content');

	var fromKeywords = General.getKeywords(fromContent.value + fromTitle.value + fromDescription.value);

	var title = document.getElementById ("seo_title");
	var description = document.getElementById ("seo_description");
	var keywords = document.getElementById ("seo_keywords");

	title.value = fromTitle.value;
	description.value = fromDescription.value;
	keywords.value = fromKeywords;

	return true;
}

General.getKeywords  = function(text)
{

	text = text.replace(/;/g, ' ');
	text = text.replace(/:/g, ' ');
	text = text.replace(/\./g, ' ');
	text = text.replace(/-/g, ' ');
	text = text.replace(/\,/g, ' ');
	text = text.replace(/\?/g, ' ');
	


	var keyword_array = text.split(" ");
	var new_arr = new Array();
	var keywords_string = "";

	var i = 0;
	var counter = 1;
	var element = "";
	var next_element = "";


	//keyword_array.sort();
	var common_words_string = common_words.join("--");
	for (n = 0; n < keyword_array.length; n++)
	{
		element = keyword_array[n];
		//check if word is long enough, contains alphabetic characters
		if (element.match(/^[a-zA-Z_\-0-9]{3,}$/) && (common_words_string.lastIndexOf(element.toLowerCase()) == -1))
		{
			// to eliminate/count multiple instance of words
			if (n != keyword_array.length)
				next_element = keyword_array[n+1];
			else
				next_element = "zzzzzzzzzzzzzz";
			
			if (next_element != element)
                	{
				/*
				if (eregi("^(-|\\\')(.*)", $element, $regs))
                                                $element = $regs[2];

				if (eregi("(.*)(\\\'|-)$", $element, $regs))
					$element = $regs[1];
				*/

				new_arr[i] = new Array();
				new_arr[i][1] = element;
				new_arr[i][2] = counter;
				element = keyword_array[n+1];
				i++;
				counter = 1;
			}
			else
			{
                        	if (counter < 50)
                                	counter++;
			}
		}
		else
			element = keyword_array[n+1];
	}
	
	for (i = 0; i < new_arr.length; i++)
        {
		var temp = new_arr[i];
		
		if (temp[2] >= 3 || 1==1)
		{
			keywords_string = keywords_string + temp[1] + ",";	
		}
	}
	// remove last ,
	if(keywords_string.length > 3)
	{
		keywords_string = keywords_string.slice(0, keywords_string.length-1);
	}

	return keywords_string;
}

function EnableStates(value)
{
//    alert(value);
    
	if(value == 2){
    	    document.getElementById('state_sel').style.display = 'block';
	    document.getElementById('state_sel1').style.display = 'block';
	    document.getElementById('city').style.display = 'block';
	    document.getElementById('city_mall').style.display = 'block';
					
	}
	else{
	    document.getElementById('state_sel').style.display = 'none';
	    document.getElementById('state_sel1').style.display = 'none';
	    document.getElementById('city').style.display = 'none';
	    document.getElementById('city_mall').style.display = 'none';
										
	}
}

//crearea unui obiect XMLHttpRequest
General.getXMLHttpRequestObject = function() 
{
    var xmlobj;
    // check for existing requests
    if(xmlobj!=null && xmlobj.readyState!=0 && xmlobj.readyState!=4)
    {
        xmlobj.abort();
    }
    
    try {
	// instantiate object for Mozilla, Nestcape, etc.
        xmlobj=new XMLHttpRequest();
    }
    catch(e){
        try{
            // instantiate object for Internet Explorer
            xmlobj=new ActiveXObject('Microsoft.XMLHTTP');
        }
        catch(e){
            // Ajax is not supported by the browser
            xmlobj=null;
            return false;
        }
    }
    return xmlobj;
}

General.getUrlVars = function()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
                                            
    return vars;
}
General.in_array=function(array,val) {
    for (i=0;i<array.length;i++) {
	if (array[i]==val) return i;
    }
    return -1;
}

General.trackQuickRenew = function(buttonID)
{
	var buyOnlineLink = document.getElementById(buttonID);

	if(buyOnlineLink.href.match('upSellGate') || buyOnlineLink.href.match('upsellDe'))
	{
	    var lastChar = buyOnlineLink.href.substring(buyOnlineLink.href.length-1, buyOnlineLink.href.length);
	    if(lastChar != "/")
		buyOnlineLink.href = buyOnlineLink.href + "/";	
	    buyOnlineLink.href = buyOnlineLink.href + "qr/"
	}
	
	if(buyOnlineLink.href.match('store.bitdefender.com') || buyOnlineLink.href.match('avangate.com'))
	{
	    //daca am un "?" in link, apendez &SRC=RENEW_QUICK&REF=RENEW_QUICK, altfel, apendez ?SRC=...&REF=...
	    if(buyOnlineLink.href.indexOf('?') > 0)
		buyOnlineLink.href = buyOnlineLink.href + "&SRC=RENEW_QUICK&REF=RENEW_QUICK";
	    else
		buyOnlineLink.href = buyOnlineLink.href + "?SRC=RENEW_QUICK&REF=RENEW_QUICK";
	    
	}
	return true;
}
