//TODO add short cheer sound on complete item?

toDoList_ul.addEventListener('click', function (evt) {

    if (evt.target.type === 'checkbox') {
        var checkbox = evt.target;
        var li = checkbox.parentNode;
        if (checkbox.checked) {
            styleComplete();
            toggleEditBtn('disable');
        }
        else if (!checkbox.checked) {
            styleIncomplete();
            toggleEditBtn('enable');
        }

        function styleComplete() {
            var liCompleted = li;
            liCompleted.classList.remove('list-group-item-danger');
            liCompleted.classList.add('list-group-item-success');
            liCompleted.querySelector('.item-text').style.textDecoration = 'line-through';
        }

        function styleIncomplete() {
            li.classList.remove('list-group-item-success');
            li.classList.add('list-group-item-danger');
            li.querySelector('.item-text').style.textDecoration = 'none';
        }

        function toggleEditBtn(mode) {
            var editBtn = evt.target.parentNode.parentNode.childNodes[1];
            if (mode === 'disable') {
                editBtn.setAttribute('disabled', 'disabled');
                editBtn.childNodes[0].classList.add('disabled');
            }
            if (mode === 'enable') {
                if (editBtn.hasAttribute('disabled')){
                    editBtn.removeAttribute('disabled');
                    editBtn.childNodes[0].classList.remove('disabled');
                }
            }
        }
    }


    var button = event.target;
    var toDo_div;

    if (buttonClicked()) {
        if (isEditBtn(button)) {
            makeEditable();
            toggleCheckbox('disable');
        }
        else if (isTrashBtn(button)) {
            deleteItem();
        }
    }

    function deleteItem() {
        removeItemFromArray();
        displayToDoItems();
    }

    function removeItemFromArray() {
        toDoItems.splice(toDoItems.indexOf(toDo_div.textContent), 1);
    }

    function makeEditable() {

        convertToTextInput();
        var text = document.getElementsByClassName('edit-text')[0].value;

        styleEditBtn('red', 'lawngreen');

        //setTimeout used here to prevent saveEditedItem() from being called on first edit button click.
        setTimeout(function () {
            button.classList.add('edit-mode');
        }, 100);

        function convertToTextInput() {
            var textInput = document.createElement('input');
            textInput.setAttribute('type', 'text');
            textInput.setAttribute('class', 'edit-text input-normal col-xs-10');

            var itemText = button.parentNode.parentNode.textContent;
            textInput.setAttribute('value', itemText);

            var toDo_li = toDo_div.children[0];
            toDo_li.children[1].remove();
            toDo_li.appendChild(textInput);
        }
    }

    function styleEditBtn(glyphiconColor, bgColor) {
        button.style.color = glyphiconColor;
        button.parentNode.style.backgroundColor = bgColor;
    }

    // For the moment, edited item can only be saved by clicking button.
    // hitting enter will not work as I wanted to allow for multiple items to be in edit-mode simultaneously.
    // TODO Should add this functionality (hitting 'enter') later when edit-mode state can be saved in object.
    if (buttonClicked()) {
        if (isEditModeBtn(button)) {
            var text = button.parentNode.parentNode.childNodes[0].childNodes[1]
                .value.trim();
            if (text) {
                saveEditedItem(text);
            } else {
                alert('You didn\'t write anything!');
            }
        }

        function saveEditedItem(text) {
            var span = displayItem.makeSpan(text);

            var toDo_li = toDo_div.children[0];
            toDo_li.children[1].remove();
            toDo_li.appendChild(span);

            button.classList.remove('edit-mode');
            styleEditBtn('black', 'white');

            toggleCheckbox('enable');
        }
    }

    function toggleCheckbox(mode) {
        var checkbox;
        if (evt.target.classList.contains('glyphicon-edit')) {
            checkbox = evt.target.parentNode.parentNode.childNodes[0].childNodes[0];
        } else {
            checkbox = evt.target.parentNode.childNodes[0].childNodes[0];
        }
        if (mode === 'disable') {
            checkbox.setAttribute('disabled', 'disabled');
        }
        if (mode === 'enable') {
            if (checkbox.hasAttribute('disabled')){
                checkbox.removeAttribute('disabled');
            }
        }
    }

    function buttonClicked() {
        var clicked = false;

        if (evt.target.type === 'button') {
            button = evt.target.firstChild;
            toDo_div = evt.target.parentNode;
            clicked = true;
        }
        else if (targetIsTheLittleGlyphicon()) {
            button = evt.target;
            toDo_div = button.parentNode.parentNode;
            clicked = true;
        }
        return clicked;

        function targetIsTheLittleGlyphicon() {
            return evt.target.parentElement.type === 'button';
        }
    }

    function isTrashBtn(button) {
        return button.classList.contains('glyphicon-trash');
    }

    function isEditBtn(button) {
        return button.classList.contains('glyphicon-edit')
            && !button.classList.contains('edit-mode')
            && !button.classList.contains('disabled');
    }

    function isEditModeBtn(button) {
        return button.classList.contains('edit-mode');
    }
});
