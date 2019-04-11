let DragndropHandler = function(initParams){

    let self = this;
    let dragObject = {};
    let draggableClass = initParams.drag;
    let droppableClass = initParams.drop;

    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', on MouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseDown (ev) {
        if (ev.which != 1) {
            return;
        }
        let elem = ev.target.closest('.'+draggableClass);
        if (!elem) {
            return;
        }
        dragObject.elem = elem;
        dragObject.downX = ev.pageX;
        dragObject.downY = ev.pageY;
    };

    function onMouseMove(ev) {
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

    function onMouseUp(ev) {
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

        // Отмена переноса
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
        document.body.appendChild(dragObject.avatar);
        dragObject.avatar.classList.add('moving');
    }

    function getCoords(elem) {
        let box = elem.getBoundingClientRect();
        return {
            left: box.left + pageXOffset,
            top: box.top + pageYOffset,
        };
    }

    function finishDrag(ev) {
        let dropElem = findDroppable(ev);
        if (dropElem) {

            let xx = ev.pageX;
            let yy = ev.pageY;

            let lis = dropElem.querySelectorAll('.'+draggableClass);
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
        return elem.closest('.'+droppableClass);
    }

    function clearSelection() {
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        } else { // IE
            document.selection.empty();
        }
    }

};
