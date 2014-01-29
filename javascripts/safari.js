(function() {
    var scout = null;
    safari.self.addEventListener("message", function(event) {
        switch (event.name) {
            case "onClicked":
                safari.self.tab.dispatchMessage("onClicked", event.message);
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
    }, false);

    $('body').on('scout::referral-link', function(event) {
        safari.self.tab.dispatchMessage("referralLinkClicked");
    });
})();