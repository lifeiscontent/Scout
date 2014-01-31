var _gaq = _gaq || [];
var scoutFirstTime = true;

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.sendMessage(tab.id, { name: "onClicked", message: { firstTime: scoutFirstTime }});
    scoutFirstTime = false;
});

chrome.runtime.onMessage.addListener(function(event, sender, sendResponse) {
    switch (event.name) {
        case "onClicked":
            if (event.message.firstTime) {
                _gaq.push(['_setAccount', 'UA-35695570-1']);
                _gaq.push(['_trackPageview']);
                _gaq.push(['_trackEvent', 'chrome', 'loaded']);
                _gaq.push(['_setCustomVar', 1, 'Version', '1.1.6', 2]);
            }
        break;
        case "referralLinkClicked":
            _gaq.push(['_trackEvent', 'referral_link_clicked', 'clicked']);
        break;
    }
});

(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();