(function() {
  var rootNode = document.createElement('div');
  document.body.appendChild(rootNode);
  var scoutUnmounted = true;
    safari.self.addEventListener("message", function(event) {
        switch (event.name) {
            case "onClicked":
                safari.self.tab.dispatchMessage("onClicked", event.message);
                if (scoutUnmounted) {
                    scoutUnmounted = false;
                    ReactDOM.render(React.createElement(Scout, null), rootNode);
                } else {
                    scoutUnmounted = ReactDOM.unmountComponentAtNode(rootNode);
                }
            break;
        }
    }, false);

    // safari.self.tab.dispatchMessage("referralLinkClicked");
})();
