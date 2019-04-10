$(document).ready(function(){

    $('.users-add__show').on('click', function(ev){
        $('.users-add').slideDown();
        ev.preventDefault();
    });

    $('.users__hide--add').on('click', function(ev){
        $('.users-add').slideUp();
        ev.preventDefault();
    });

    $('.users__hide--edit').on('click', function(ev){
        $('.modal__edit').hide();
        $('.overlay').hide();
        ev.preventDefault();
    });

    $('.users-list__edit').on('click', function(ev){
        //Открываем форму
        let selId = $(this).attr('data-id');
        $('.users-edit__item[name=name]').val($('.users-list__item[data-id=' + selId + '] .users-list__text--name').html());
        $('.users-edit__item[name=email]').val($('.users-list__item[data-id=' + selId + '] .users-list__text--email').html());
        $('.users-edit__item[name=address]').val($('.users-list__item[data-id=' + selId + '] .users-list__text--address').html());
        $('.users-edit__button').attr('data-id', selId);

        $('.modal__edit').show();
        $('.overlay').show();

        ev.preventDefault();
    });

    $('.users-edit__button').on('click', function(ev){
        let selId = $(this).attr('data-id');
        $.ajax({
            url: '/adminsection/edit',
            type: 'POST',
            data: {
                id: selId,
                name: $('.users-edit__item[name=name]').val(),
                email: $('.users-edit__item[name=email]').val(),
                address: $('.users-edit__item[name=address]').val(),
            },
            dataType: 'json',
            success: function(result) {
                if (result) {
                    //Меняем измененные значения
                    $('.users-list__item[data-id=' + selId + '] .users-list__text--name').html(result.user_data.name);
                    $('.users-list__item[data-id=' + selId + '] .users-list__text--email').html(result.user_data.email);
                    $('.users-list__item[data-id=' + selId + '] .users-list__text--address').html(result.user_data.address);

                    $('.modal__edit').hide();
                    $('.overlay').hide();
                    $('.users-edit__item').val('');
                }
            },
            error: function(er){
                $('.users-list__error').html(er.responseJSON.message).fadeIn();
                setTimeout(function(){$('.users-list__error').fadeOut();}, 5000);
                console.log(er);
            }
        });

        ev.preventDefault();
    });


    $('.users-list__delete').on('click', function(ev){
        let deleting = $('.users-list__checkbox:checked');
        if (deleting) {
            deleting.each(function(){

                let selId = $(this).attr('data-id');
                $.ajax({
                    url: '/adminsection/delete',
                    type: 'GET',
                    data: {id: selId},
                    dataType: 'json',
                    success: function(result) {
                        if (result) {
                            let deleted = $('.users-list__item[data-id=' + selId + ']');
                            deleted.remove();
                        }
                    },
                    error: function(er){
                        $('.users-list__error').html(er.responseJSON.message).fadeIn();
                        setTimeout(function(){$('.users-list__error').fadeOut();}, 5000);
                        console.log(er);
                    }
                });
            });
        };

        ev.preventDefault();
    });

    $('.users-add__button').on('click', function(ev){
        let userName = $('.users-add__item[name=name]').val();
        let userEmail = $('.users-add__item[name=email]').val();
        let userAddress = $('.users-add__item[name=address]').val();

        $.ajax({
            url: '/adminsection/add',
            type: 'POST',
            data: {
                name: userName,
                email: userEmail,
                address: userAddress,
            },
            dataType: 'json',
            success: function(result) {
                //Очищаем форму
                $('.users-add__item').val('');

                //Создаем новую строку
                let newLi = createUserLi(
                    result.user_data.id,
                    result.user_data.name,
                    result.user_data.email,
                    result.user_data.address,
                );
                //Добавляем в контейнер
                $('.users-list').append(newLi);
            },
            error: function(er){
                $('.users-list__error').html(er.responseJSON.message);
                setTimeout(function(){$('.users-list__error').hide();}, 5000);
                console.log(er);
            }
        });
        ev.preventDefault();
    });

    function createUserLi(id, name, email, address){
        let newLi = $('<li>', {
            class: 'users-list__item',
            attr: {
                'data-id': id,
            }
        });

        let newCheckboxDiv = $('<div>', {
            class: 'users-list__checkbox-wrapper',
        });
        let tempCheckbox = $('<input>', {
            class: 'users-list__checkbox',
            type: 'checkbox',
            attr: {'data-id': id},
        });
        newCheckboxDiv.append(tempCheckbox);

        let newListWrapper = $('<div>', {class: 'users-list__wrapper'});

        let newPName = $('<p>', {
            class: 'users-list__text',
        });
        let tempB = $('<b>', {text: 'Имя:'});
        newPName.append(tempB).append(' ' + name);

        let newPEmail = $('<p>', {
            class: 'users-list__text',
        });
        tempB = $('<b>', {text: 'Email:'});
        newPEmail.append(tempB).append(' ' + email);

        let newPPassword = $('<p>', {
            class: 'users-list__text',
        });
        tempB = $('<b>', {text: 'Адрес:'});
        newPPassword.append(tempB).append(' ' + address);

        let newPButtons = $('<div>', {class: 'users-list__links'});
        let tempBEdit = $('<a>', {
            class: 'button users-list__edit',
            attr: {
                'data-id': id,
            },
            href: '/adminsection/edit/id=' + id,
            text: 'Редактировать',
        });
        newPButtons.append(tempBEdit);

        newLi.append(newCheckboxDiv);
        newListWrapper.append(newPName);
        newListWrapper.append(newPEmail);
        newListWrapper.append(newPPassword);
        newLi.append(newListWrapper);
        newLi.append(newPButtons);

        return newLi;
    };

    $('.overlay').on('click', function(){
        $('.modal__edit').hide();
        $('.overlay').hide();
    });
});
