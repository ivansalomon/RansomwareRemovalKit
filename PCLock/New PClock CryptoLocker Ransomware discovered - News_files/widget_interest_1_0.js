;(function init(window, undefined){
  var ldWidgetSelector = document.querySelectorAll('.lockerdome-js-lite').length ?
    '.lockerdome-js-lite':
    '#lockerdome-js-lite';
  var domain, cdnDomain;
  try {
    cdnDomain = document.querySelector(ldWidgetSelector).src.split('/').slice(0,3).join('/');
    var isIE = false;
    /*@cc_on isIE = @_jscript_version;@*/
    var forceHttps = isIE === 9 && /(cdn2\.)?lockerdome\.com/.test(cdnDomain.split('/')[2]);
    if (forceHttps) cdnDomain = cdnDomain.replace(/^https?/,"https");
  } catch(e) {cdnDomain = 'https://cdn2.lockerdome.com'; }
  domain = /^http(s?)\:\/\/cdn2\.lockerdome\.com/.test(cdnDomain) ?  cdnDomain.replace('cdn2.','') : cdnDomain;
  var addListener = window.addEventListener ? 'addEventListener' : 'attachEvent';
  var removeListener = window.removeEventListener ? 'removeEventListener' : 'detachEvent';
  function action(type) { return (window.addEventListener ? type : 'on' + type); }

  function createWidget(widget_element) {
    widget_element.setAttribute('data-fingerprint', window.LDWidget.fingerPrint);
    window.LDWidget.fingerPrint +=1;

    //Shim for old querystrings
    var element_has_src = widget_element.nodeName === "SCRIPT";
    if (element_has_src) {
      var qsString = widget_element.getAttribute('src').split('?').slice(1).join('?').split('&');
      for (i=0; i<qsString.length; i++) {
        var prop = qsString[i].split('=');
        if (prop[1] && prop[1] !== 'none') widget_element.setAttribute('data-' + prop[0], prop[1]);
      }
    }

    var data = {box: '', size: '', size_specifics: '', width: '', style: '', follow_up: '', follow_up_specifics: '', fingerprint: '', custom: '', href: ''};
    for (var key in data) data[key] = widget_element.getAttribute('data-' + key);

    var parent = widget_element.parentNode;
    var frameContainer = document.createElement('div');
    frameContainer.className ='ld-interest-widget-cntnr';
    if (data.width === 'fixed-width') frameContainer.style.cssText = 'width: 1px; height: 1px; overflow: hidden;';
    else frameContainer.style.cssText = 'height: 0; overflow: hidden;';
    parent.insertBefore(frameContainer, widget_element.nextSibling);

    var iframes = {interest: 'ld-interest'};
    if (data.follow_up) {
      var ex_class = ['style','box','width'];
      iframes[data.follow_up] = 'ld-follow-up closed ' + data.size;
      for (var i=0;i<ex_class.length; i++) if (data[ex_class[i]]) iframes[data.follow_up] += ' ' + data[ex_class[i]];
    }

    for (var frame in iframes) {
      if ( (!isNaN(frame) && !window.LDWidget.onSiteFrame) || isNaN(frame) ) {
        if (data.href && /[\<\>\ ]/.test(data.href)) continue;
        var newFrame = document.createElement('iframe');
        newFrame.className = iframes[frame];
        if ( !isNaN(frame) && !window.LDWidget.onSiteFrame ) {
          window.LDWidget.onSiteFrame = newFrame;
        } else if ( isNaN(frame) ) {
          newFrame.src = domain + '/widgets/' + frame + '.html' +
          '?fingerprint=' + data.fingerprint +
          ( data.custom ? '&css=' + data.custom : '') +
          '&url=' + encodeURIComponent( data.href ? data.href : document.URL );
          frameContainer.appendChild(newFrame);
        }
      }
    }
  }

  function replaceCssText(el, prop, val) {
    var boxStyle =el.style.cssText.replace(/overflow\ ?\:\ ?hidden;/, '');
    var replacer = new RegExp('(?:' + prop + '\\:\\ *)(\\d+)');
    el.style.cssText = boxStyle.indexOf(prop) !== -1 ?
      boxStyle.replace(replacer, prop + ":" + val) :
      boxStyle + prop + ":" + val + "px;";
  }

  function handleMessage(event){
    if ( /^http(s?)\:\/\/((\w+\.)*)?lockerdome.com((:\d+)?)/.test(event.origin) ) {
      var data = false;
      try { data = JSON.parse(event.data); } catch(ignore) {}
      if (!data) return;
      var selector = ldWidgetSelector + '[data-fingerprint="' + data.fingerprint + '"]';
      var intScript = document.querySelector(selector);
      var intData =  {available: '', box: '', size: '', size_specifics: '', width: '', style: '', follow_up: '', follow_up_specifics: '', fingerprint: '', custom: ''};
      if (intScript) {
        for (var key in intData)
          intData[key] = intScript.getAttribute('data-' + key);
      }
      var followUp = document.querySelector(selector + '+div.ld-interest-widget-cntnr .ld-follow-up');
      var followData =  {known_content: '', pending: ''};
      if (followUp) {
        for (var key in followData)
          followData[key] = followUp.getAttribute('data-' + key);
      }

      if (data.action === 'ask_for_style') {
        event.source.postMessage(JSON.stringify({action: 'tell_style', specifics: intData}), domain);
      }
      else if (data.action === 'set') {
        var element = data.button === 'interest' ?
          document.querySelector( selector + '+div.ld-interest-widget-cntnr' )
          : followUp;
        replaceCssText(element, data.specifics.property, data.specifics.value);
      }

      if (!!intData.follow_up && intData.follow_up !== 'none') {
        var followUpHeight = document.querySelector(selector + '+div.ld-interest-widget-cntnr').offsetHeight;
        if (!!followUp) {
          if ((data.action === 'open_follow_up' || data.action === 'tell_active') && (isNaN(intData.follow_up) || intData.available === 'true')) {
            if(intData.follow_up !== 'share' || followData.known_content === 'true') {
              window.LDWidget.LDjQ.removeClass(selector + '+div.ld-interest-widget-cntnr .ld-follow-up', 'closed');
            } else if (intData.follow_up === 'share') followUp.setAttribute('data-pending', 'true');
            followUp.contentWindow.postMessage(event.data, domain);
          }
          else if (data.action === 'close_follow_up') {
            window.LDWidget.LDjQ.addClass(selector + '+div.ld-interest-widget-cntnr .ld-follow-up', 'closed');
            followUp.contentWindow.postMessage(event.data, domain);
          }
          else if (data.action === 'confirm_follow_up') {
            intScript.setAttribute('data-available', 'true');
            window.LDWidget.LDjQ.removeClass(selector + '+div.ld-interest-widget-cntnr .ld-follow-up', 'closed');
          }
          else if (data.action === 'disable_follow_up') {
            intScript.setAttribute('data-available', 'false');
            window.LDWidget.LDjQ.addClass(selector + '+div.ld-interest-widget-cntnr .ld-follow-up', 'closed');
          }
          else if (data.action === 'tell_content') {
            followUp.setAttribute('data-known_content', 'true');
            if(intData.follow_up === 'share' && followData.pending === 'true') {
              window.LDWidget.LDjQ.removeClass(selector + '+div.ld-interest-widget-cntnr .ld-follow-up', 'closed');
            }
            followUp.contentWindow.postMessage(event.data, domain);
          }
          else if (data.action === 'set' && data.button === 'interest' && data.specifics.property === 'height') {
            replaceCssText(followUp, 'top', parseInt(followUpHeight) - (intData.box === 'box-on' ? 15 : 0));
          }
        } else {
          if (data.action === 'open_follow_up' || data.action === 'tell_active') {
            var siteWidget = window.LDWidget.onSiteFrame;
            if (siteWidget.parentNode) siteWidget.parentNode.removeChild(siteWidget);
            siteWidget.src = domain + '/embed/' + intData.follow_up + '/' +
            intData.follow_up_specifics + '?fingerprint=' + intData.fingerprint +
            ( intData.custom ? '&stylesheet=' + encodeURIComponent('/css/css/embeds/' + intData.custom + '.css') : '');
            document.querySelector(selector + '+div.ld-interest-widget-cntnr').appendChild(siteWidget);
            if (followUpHeight) replaceCssText(siteWidget, 'top', parseInt(followUpHeight) - (intData.box === 'box-on' ? 15 : 0));
            else {
              var followUpHeightCheck = setInterval(function(){
                var heightValue = document.querySelector(selector + '+div.ld-interest-widget-cntnr').offsetHeight;
                if (!heightValue) return;
                clearInterval(followUpHeightCheck);
                replaceCssText(siteWidget, 'top', parseInt(heightValue) - (intData.box === 'box-on' ? 15 : 0));
              }, 100);
            }
          }
        }
      }
    }
  }

  if (!window.LDWidget) {
    window.LDWidget = {};
    window.LDWidget.onSiteFrame = null;
    window.LDWidget.fingerPrint = 1000;
    window.LDWidget.LDjQ = {
      hasClass : function(css, className) {
        var result, el = document.querySelector(css);
        if (el && el.classList) result = el.classList.contains(className);
        else if (el && el.className) result = new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
        else result = null;
        return result;
      },
      addClass : function(css, className) {
        var el = document.querySelector(css);
        if (el && el.classList) el.classList.add(className);
        else if (el && el.className) el.className += ' ' + className;
      },
      removeClass : function (css, className) {
        var el = document.querySelector(css);
        if (el && el.classList) el.classList.remove(className);
        else if (el && el.className) el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      }
    };
    window[addListener](action("message"), handleMessage, false);
    var style = document.createElement("link");
    style.setAttribute("rel", "stylesheet");
    style.setAttribute("type", "text/css");
    style.setAttribute("href", domain + "/css/css/embeds/native-iframe-controls.css");
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  var widgets = document.querySelectorAll(ldWidgetSelector);
  for (var i=0;i<widgets.length;i++){
    var check = widgets[i].getAttribute('data-fingerprint');
    if (!check) createWidget(widgets[i]);
  }
  if (window.opener) window.opener.postMessage('ask_for_active', domain);
}(this));
