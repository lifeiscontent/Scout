var _gaq = _gaq || [];
var lastTabId = -1;

chrome.browserAction.onClicked.addListener(function(tab) {
  lastTabId = tab.id;
  chrome.browserAction.getBadgeText({}, function(response) {
    if (response === 'ON') {
      chrome.browserAction.setBadgeText({text: ''});
      chrome.tabs.sendMessage(tab.id, {type: 'unmount'});
    } else {
      chrome.browserAction.setBadgeText({text: 'ON'});
      chrome.tabs.sendMessage(tab.id, {type: 'mount'});
      chrome.tabs.sendMessage(tab.id, {
        type: 'google-analytics',
        payload: ['_setAccount', 'UA-35695570-1']
      });
      chrome.tabs.sendMessage(tab.id, {
        type: 'google-analytics',
        payload: ['_trackPageview']
      });
      chrome.tabs.sendMessage(tab.id, {
        type: 'google-analytics',
        payload: ['_setCustomVar', 1, 'Version', '2.0.0', 2]
      });
    }
  });
});

chrome.runtime.onMessage.addListener(function(event, sender, sendResponse) {
  switch(event.type) {
    case 'unmount':
      chrome.browserAction.setBadgeText({text: ''});
      chrome.tabs.sendMessage(lastTabId, {type: 'unmount'});
    break;
    case 'google-analytics':
      _gaq.push(event.payload);
    break;
  }
  sendResponse(event.type);
});

(function() {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();
