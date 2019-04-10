$(document).ready(function(){

    $('.users-add__show').on('click', function(ev){
        $('.users-add').slideDown();
        ev.preventDefault();
    });

    $('.users-add__hide').on('click', function(ev){
        $('.users-add').slideUp();
        ev.preventDefault();
    });

    $('.users-list__edit').on('click', function(ev){
        let selId = $(this).attr('data-id');
        $.ajax({
            url: '/adminsection/edit',
            type: 'GET',
            data: {id: selId},
            dataType: 'json',
            success: function(result) {
                if (result) {
                    console.log(result);
                }
            },
            error: function(er){
                console.log('error');
                console.log(er);
            }
        });
        ev.preventDefault();
    });

    $('.users-list__delete').on('click', function(ev){
        let selId = $(this).attr('data-id');
        $.ajax({
            url: '/adminsection/delete',
            type: 'GET',
            data: {id: selId},
            dataType: 'json',
            success: function(result) {
                console.log(result);
                if (result) {
                    let deleting = $('.users-list__item[data-id=' + selId + ']');
                    deleting.remove();
                }
            },
            error: function(er){
                $('.users-add__error').html(er.responseJSON.message);
                setTimeout(function(){$('.users-add__error').fade();}, 5000);
                console.log(er);
            }
        });
        ev.preventDefault();
    });



});
