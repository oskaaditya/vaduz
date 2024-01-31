function isOpenInWebView() {
    // Array of common WebView user agent strings
    const webViewUserAgents = [
      
      'Instagram',
      'Facebook',
      'FB',
      'LinkedInApp'
      // Add any other WebView user agent strings you want to check for
    ];
  
    const userAgent = window.navigator.userAgent;
    //document.getElementById("text-1page").innerText = String(userAgent);
  
    // Check if the user agent string contains any WebView identifier
    for (let i = 0; i < webViewUserAgents.length; i++) {
      if (userAgent.indexOf(webViewUserAgents[i]) !== -1) {
        return true;
      }
    }
  
    return false;
  }
  
  function openInNativeBrowser(url) {
    if (isOpenInWebView()) {
      // User is in a WebView, open the native browser
      //window.open(url, '_system');

      window.alert("Aprire la pagina nel browser.");
    } else {
      // User is not in a WebView, continue as usual
      //window.location.href = url;
    }

    
  }
  openInNativeBrowser(window.location.href);