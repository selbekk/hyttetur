(function() {
    $('#debug').on('click', function(e) {
        e.preventDefault();
        $('body').toggleClass('debug');
        $('#debug').toggleClass('on');
    })
})();
