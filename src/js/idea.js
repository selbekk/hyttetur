(function() {

    function submitForm(e) {
        e.preventDefault();
        e.stopPropagation();
        var $form = $('#idea-form');

        var opts = {
            method: 'post',
            url: 'mail.php',
            data: $form.serialize()
        };

        $.when($.ajax(opts))
            .then(mailSent, mailFailed);
    }

    function mailSent(e) {
        var template = '<div class="mail-response mail-response-success">' +
                            '<span class="feedback glyphicon glyphicon-ok shake"></span>' +
                            '<h2>Takk for forslaget!</h2>' +
                            '<p>Det skal vi <em>virkelig vurdere</em></p>' +
                        '</div>';

        updateView(template);
    }

    function mailFailed(a, b, c) {
        console.log('mail failed to send', a, b, c);
        var template = '<div class="mail-response mail-response-error">' +
                            '<span class="feedback glyphicon glyphicon-thumbs-down shake"></span>' +
                            '<h2>Kjipern!</h2>' +
                            '<p>Noe gikk feil! Da driter vi i idéen din. Sikkert ikke no bra uansett.</p>' +
                        '</div>';

        updateView(template);
    }

    function updateView(template) {
        var form = $('#idea-form');
        form.fadeOut(500, function() {
            form.html(template).fadeIn(500);
        });
    }

    $('#idea-form').on('submit', submitForm);
    $('#idea-submit').on('click', submitForm);
})();
