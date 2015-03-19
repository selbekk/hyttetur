(function() {
    var mailResponseTemplate = '<div class="mail-response mail-response-{{status}}">' +
        '<span class="glyphicon glyphicon-{{glyphicon}} glyphicon-mega glyphicon-{{status}} shake"></span>' +
        '<h2>{{header}}</h2>' +
        '<p>{{body}}</p>' +
        '</div>';

    var ideaTemplate = '<li class="suggestion">' +
                            '<h3>{{idea}}</h3>'+
                            '<p class="name">av {{name}}</p>'+
                        '</li>';

    function getIdeasFromServer() {
        $.getJSON('data/ideas.json')
            .done(dataFetched)
            .fail(dataFetchFailed);
    }

    function dataFetched(suggestions) {
        var html = '';
        $.each(suggestions, function(i, idea) {
            html += ideaTemplate.replace('{{idea}}', idea.idea)
                                .replace('{{name}}', idea.name);
        });
        $('.suggestions').html(html);
    }

    function dataFetchFailed(a, b, c) {
        var html = '<div class="panel panel-danger">' +
                    '<div class="panel-heading"><h3 class="panel-title">Åh faen..</h3></div>' +
                    '<div class="panel-body">'+
                        'Sorry bro, fikk ikke henta forslag. Gi\'re 5 min.<br/>' +
                        '<span class="glyphicon glyphicon-thumbs-down glyphicon-mega glyphicon-error shake"></span>' +
                    '</div>' +
                  '</div>';
        $('.suggestions').html(html);
    }

    function submitForm(e) {
        e.preventDefault();
        e.stopPropagation();
        var $form = $('#idea-form');

        var opts = {
            method: 'post',
            url: 'mail.php',
            data: $form.serialize()
        };

        $.ajax(opts)
            .done(mailSent)
            .fail(mailFailed);
    }

    function mailSent(e) {
        var template =  mailResponseTemplate.replace('{{status}}', 'success')
                                             .replace('{{status}}', 'success')
                                             .replace('{{glyphicon}}', 'ok')
                                             .replace('{{header}}', 'Takk for forslaget')
                                             .replace('{{body}}', 'Det skal vi <em>virkelig vurdere</em>');

        updateView(template);
    }

    function mailFailed(a, b, c) {
        var template = mailResponseTemplate.replace('{{status}}', 'error')
                                            .replace('{{status}}', 'error')
                                            .replace('{{glyphicon}}', 'thumbs-down')
                                            .replace('{{header}}', 'Kjipern!')
                                            .replace('{{body}}', 'Noe gikk feil! Da driter vi i idéen din. Sikkert ikke no bra uansett.');

        updateView(template);
    }

    function updateView(template) {
        var form = $('#idea-form');
        form.fadeOut(300, function() {
            form.html(template).fadeIn(300);
        });
    }

    $('#idea-form').on('submit', submitForm);
    $('#idea-submit').on('click', submitForm);

    getIdeasFromServer();
})();
