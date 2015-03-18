(function() {

    var $menu = $('#main-header');
    var $trigger = $('.trigger-menu');

    function toggleMenu() {
        $menu.toggleClass('active');
        $trigger.find('span').toggleClass('glyphicon-menu-hamburger glyphicon-chevron-left');
    }

    $trigger.on('click', toggleMenu);
})();