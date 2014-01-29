(function() {
    var scout = null;
    chrome.runtime.onMessage.addListener(function(event, sender, sendResponse) {
        switch (event.name) {
            case "onClicked":
                chrome.runtime.sendMessage(event);
                if (!scout) {
                    scout = new Scout();
                }
                if (scout.initialized) {
                    scout.destroy();
                } else {
                    scout.initialize();
                }
            break;
        }
    });

    $('body').on('scout::referral-link', function(event) {
        chrome.runtime.sendMessage({event: "referralLinkClicked"});
    });
})();