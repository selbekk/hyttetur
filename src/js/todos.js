$(function() {

    function itemClicked() {
        $(this).toggleClass('list-group-item-success');
        var ids = getFromDom();
        saveToLocalStorage(ids);
    }

    function getFromDom() {
        var selectedIds = [];
        $('.directions .list-group-item-success').each(function() {
            selectedIds.push($(this).data('item-id'));
        });
        return selectedIds;
    }

    function saveToLocalStorage(ids) {
        if(!localStorage) {
            console.log('no local storage, no fun for you mister!');
            return;
        }

        localStorage.setItem('ids', ids);
    }

    function getFromLocalStorage() {
        if(!localStorage) {
            console.log('no local storage, no fun for you mister!');
            return;
        }

        return localStorage.getItem('ids').split(',').map(Number);
    }

    function setSelected() {
        var ids = getFromLocalStorage();
        if(!ids) {
            return;
        }
        console.log('ids', ids);
        $('.directions .list-group-item').each(function() {
            var $item = $(this);
            if($.inArray($item.data('item-id'), ids) > -1) {
                $item.addClass('list-group-item-success');
            }
        })
    }

    $('.list-group-item').on('click', itemClicked);
    $(document).on('ready', setSelected);
});
