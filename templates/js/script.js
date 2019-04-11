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
            class: 'users-list__item draggable',
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


    /*
            DRAG'N'DROP
     */

    let dragObject = {};

    document.onmousedown = function(ev) {
        if (ev.which != 1) {
            return;
        }
        let elem = ev.target.closest('.draggable');
        if (!elem) {
            return;
        }
        dragObject.elem = elem;
        dragObject.downX = ev.pageX;
        dragObject.downY = ev.pageY;
    };

    document.onmousemove = function(ev) {

        if (!dragObject.elem) {
            return;
        }

        if (!dragObject.avatar) {
            clearSelection();

            let moveX = ev.pageX - dragObject.downX;
            let moveY = ev.pageY - dragObject.downY;
            if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
                return;
            }

            dragObject.avatar = createAvatar(ev); // захватить элемент
            if (!dragObject.avatar) {
                dragObject = {};
            }

            let coords = getCoords(dragObject.avatar);
            dragObject.shiftX = dragObject.downX - coords.left;
            dragObject.shiftY = dragObject.downY - coords.top;
            startDrag(ev); // отобразить начало переноса
        }

        dragObject.avatar.style.left = ev.pageX - dragObject.shiftX + 'px';
        dragObject.avatar.style.top = ev.pageY - dragObject.shiftY + 'px';
        return false;
    };

    document.onmouseup = function(ev) {
        if (dragObject.avatar) {
            finishDrag(ev);
        }
        dragObject = {};
    };


    function createAvatar(ev) {
        let avatar = dragObject.elem;
        let temp = dragObject.elem.getBoundingClientRect();
        temp = (temp.right - temp.left - 8);
        avatar.setAttribute("style","width:"+temp+"px");

        let old = {
            parent: avatar.parentNode,
            nextSibling: avatar.nextSibling,
        };

        // функция для отмены переноса
        avatar.rollback = function() {
            old.parent.insertBefore(avatar, old.nextSibling);
            avatar.classList.remove('moving');
            avatar.removeAttribute('style');
        };

        // Вставка на новое место
        avatar.insertIntoNewPlace = function(container, target, direction) {
            if ('prev' == direction) {
                container.insertBefore(avatar, target);
            } else if ('next' == direction) {
                container.insertBefore(avatar, target.nextSibling);
            }
            avatar.classList.remove('moving');
            avatar.removeAttribute('style');
        };

        return avatar;
    }

    function startDrag(ev) {
        let avatar = dragObject.avatar;

        //Вырезаем переносимый элемент
        document.body.appendChild(avatar);
        avatar.classList.add('moving');
    }

    function getCoords(elem) {
        let box = elem.getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }

    function finishDrag(ev) {
        let dropElem = findDroppable(ev);
        if (dropElem) {

            let xx = ev.pageX;
            let yy = ev.pageY;

            let lis = dropElem.querySelectorAll('.draggable');
            let targetItem;
            let direction;

            for (let i = 0; i < lis.length; i++) {
                let coords = lis[i].getBoundingClientRect();
                if (yy > coords.top && yy <= coords.bottom) {
                    targetItem = lis[i];
                    //Опеределяем, в нижнюю или верхнюю часть элемента попали
                    let center = coords.top + ( coords.bottom - coords.top ) / 2;
                    if (yy < center) {
                        direction = 'prev';
                    } else {
                        direction = 'next';
                    }
                }
            }
            dragObject.avatar.insertIntoNewPlace(dropElem, targetItem, direction);
        }
        else {
            dragObject.avatar.rollback();
        }
    }

    function findDroppable(event) {

        // спрячем переносимый элемент
        dragObject.avatar.style.display = 'none';

        // получить самый вложенный элемент под курсором мыши
        let elem = document.elementFromPoint(event.clientX, event.clientY);

        // показать переносимый элемент обратно
        dragObject.avatar.style.display = 'flex';
        if (elem == null) {
            return null;
        }

        return elem.closest('.droppable');
    }

    function clearSelection() {
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        } else { // старый IE
            document.selection.empty();
        }
    }

});
