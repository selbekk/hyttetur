$(function() {

    function itemClicked() {
        $(this).toggleClass('list-group-item-success');
    }

    $('.list-group-item').on('click', itemClicked);
});
