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
        console.log('mail sent', e);
    }

    function mailFailed(a, b, c) {
        console.log('mail failed to send', a, b, c);

    }

    $('#idea-form').on('submit', submitForm);
    $('#idea-submit').on('click', submitForm);
})();
