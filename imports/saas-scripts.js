// window.addEventListener('WebComponentsReady', function(e) {

  // only after webcomponents are finished start loading other
  // externals scripts & apis which are very slow to load

  // console.log('webcomponents ready');
  // CRISP_WEBSITE_ID = "e814fea1-2e1d-436b-b042-84b989dec750";
  // (function(){
  //   d=document;
  //   s=d.createElement("script");
  //   s.src="https://client.crisp.im/l.js";
  //   s.async=1;
  //   d.getElementsByTagName("head")[0].appendChild(s);
  // })();
  //
  // window._urq = window._urq || [];
  // _urq.push(['initSite', 'dfcde2cd-6c6d-4d0a-a4c3-cce340dfd149']);
  // (function() {
  //   var ur = document.createElement('script'); ur.type = 'text/javascript'; ur.async = true;
  //   ur.src = ('https:' == document.location.protocol ? 'https://cdn.userreport.com/userreport.js' : 'http://cdn.userreport.com/userreport.js');
  //   var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ur, s);
  // })();



  (function(){
    d=document;s=d.createElement("script");
    s.src="https://cdn.onesignal.com/sdks/OneSignalSDK.js";
    s.async=1;
    d.getElementsByTagName("head")[0].appendChild(s);
  })();


  var OneSignal = OneSignal || [];
  OneSignal.push(["init", {
      appId: "747d7b85-5f75-42a4-a888-cd7c5d6c6fa5",
      autoRegister: true,
      notifyButton: {
      enable: true /* Set to false to hide */
    }
  }]);


  // importScripts('https://cdn.onesignal.com/sdks/OneSignalSDK.js');
  // importScripts('https://cdn.onesignal.com/sdks/OneSignalSDK.js');


  // hotjar
  (function(h,o,t,j,a,r){
      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
      h._hjSettings={hjid:233036,hjsv:5};
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
  })(window,document,'//static.hotjar.com/c/hotjar-','.js?sv=');



  (function(e,b){if(!b.__SV){var a,f,i,g;window.mixpanel=b;b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
  for(g=0;g<i.length;g++)f(c,i[g]);b._i.push([a,e,d])};b.__SV=1.2;a=e.createElement("script");a.type="text/javascript";a.async=!0;a.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===e.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";f=e.getElementsByTagName("script")[0];f.parentNode.insertBefore(a,f)}})(document,window.mixpanel||[]);
  mixpanel.init("94b58665ac1566d80c71cd218370772b");
  // mixpanel.track("WebcomponentsSupported", {
  //     "customElements": 'registerElement' in document,
  //     "imports": 'imports' in document.createElement('link'),
  //     "templates": 'content' in document.createElement('template')
  // });

  mixpanel.track("webcomponentsCustomElements", {
    "customElements": 'registerElement' in document
  });
  mixpanel.track("webcomponentsImports", {
    "imports": 'imports' in document.createElement('link')
  });
  mixpanel.track("webcomponentsTemplates", {
    "templates": 'content' in document.createElement('template')
  });


  // google analytics
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-79447264-1', 'auto');
  // ga('set', 'webcomponents1', 'Level 1');
  ga('send', 'pageview');
  // ga('send', 'pageview', {
  //   'webcomponents1':  'My Custom Dimension'
  //   'metric5': 'custom metric data'
  //
  // });


// });
