(function() {
    $('.parallax').panelSnap({
        $menu: $('.navigation-links'),
        panelSelector: '.parallax-group',
        directionThreshold: 200,
        easing: 'swing',
        keyboardNavigation: {
            enabled: true
        }
    });
})();
