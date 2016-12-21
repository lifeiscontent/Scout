(function() {
    var rootNode = document.createElement('div');
    document.body.appendChild(rootNode);
    var scoutUnmounted = true;
    chrome.runtime.onMessage.addListener(function(event, sender, sendResponse) {
      console.log(scoutUnmounted);
        switch (event.name) {
            case "onClicked":
                chrome.runtime.sendMessage(event);
                if (scoutUnmounted) {
                    scoutUnmounted = false;
                    ReactDOM.render(React.createElement(Scout, null), rootNode);
                } else {
                    scoutUnmounted = ReactDOM.unmountComponentAtNode(rootNode);
                }
            break;
        }
    });

    // chrome.runtime.sendMessage({event: "referralLinkClicked"});
})();
