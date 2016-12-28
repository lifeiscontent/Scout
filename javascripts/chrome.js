(function() {
  var rootNode = document.createElement('div');
  document.body.appendChild(rootNode);

  function handleDocumentKeydown(event) {
    let key = event.which || event.keyCode || 0;
    if (key === 27) {
      chrome.runtime.sendMessage({type: 'unmount'});
    }
  }

  function handleDocumentClick(event) {
    if(event.target.href === "https://hired.com/x/On0PYI") {
      chrome.runtime.sendMessage({
        type: 'google-analytics',
        payload: ['_trackEvent', 'referral_link', 'clicked']
      });
    }
  }

  chrome.runtime.onMessage.addListener(function(event, sender, sendResponse) {
    switch (event.type) {
      case 'mount':
        ReactDOM.render(React.createElement(Scout, null), rootNode);
        document.addEventListener('keydown', handleDocumentKeydown, false);
        document.addEventListener('click', handleDocumentClick, false);
      break;
      case 'unmount':
        ReactDOM.unmountComponentAtNode(rootNode);
        document.removeEventListener('keydown', handleDocumentKeydown, false);
        document.removeEventListener('click', handleDocumentClick, false);
      break;
      case 'google-analytics':
        chrome.runtime.sendMessage(event);
      break;
    }
  });
})();
