
var toDoItems = [];

var addItem_input = document.getElementById('enterItem');
var addItem_button = document.getElementById('itemSubmit');

var toDoList_ul = document.getElementById('toDoList');

//TODO remove debug console logs

//TODO add edit for selected tasks
//TODO make item not editable when marked complete

//TODO MAYBE - add theme selector?

addItem_button.addEventListener('click', function (evt) {
    if (addItem_input.value) {
        toDoItems.push(addItem_input.value.trim());

        evt.preventDefault();

        displayToDoItems();
        alert(addItem_input.value + ' has been added to your list!');

        addItem_input.value = '';
    } else {
        evt.preventDefault();
    }
});

function displayToDoItems() {
    toDoList_ul.innerHTML = '';
    for (var i = 0; i < toDoItems.length; i++) {
        var item = toDoItems[i];
        displayItem(item);
    }
    console.log(toDoItems);
}

function displayItem(item) {
    var span = document.createElement('span');
    span.setAttribute('class', 'item-text col-xs-10');
    span.appendChild(document.createTextNode(item));

    var li = document.createElement('li');
    li.appendChild(displayItem.checkbox());
    li.appendChild(span);
    li.setAttribute('class', 'list-group-item list-group-item-danger col-xs-7 col-xs-offset-1');

    var div = document.createElement('div');
    div.setAttribute('class', 'to-do-item');

    div.appendChild(li);
    div.appendChild(displayItem.button('glyphicon glyphicon-edit'));
    div.appendChild(displayItem.button('glyphicon glyphicon-trash'));

    toDoList_ul.appendChild(div);
}

displayItem.checkbox = function() {
    var checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('class', 'big-check col-xs-2');
    return checkBox;
};

displayItem.button = function(buttonType) {
    var span = document.createElement('span');
    span.setAttribute('class', buttonType);
    span.setAttribute('aria-hidden', 'true');

    var btn = document.createElement('button');
    btn.appendChild(span);
    btn.setAttribute('type', 'button');
    btn.setAttribute('class', 'btn btn-default btn-lg col-xs-1');
    return btn;
};

//TODO add short cheer sound on complete item?

toDoList_ul.addEventListener('click', function (evt) {

    if (evt.target.type === 'checkbox') {
        var checkbox = evt.target;
        var li = checkbox.parentNode;
        if (checkbox.checked) {
            styleComplete();
        }
        else if (!checkbox.checked) {
            styleIncomplete();
        }

        function styleComplete() {
            var liCompleted = li;
            liCompleted.setAttribute('class',
                'list-group-item list-group-item-success col-xs-7 col-xs-offset-1');
            liCompleted.querySelector('.item-text').style.textDecoration = 'line-through';
        }

        function styleIncomplete() {
            li.setAttribute('class',
                'list-group-item list-group-item-danger col-xs-7 col-xs-offset-1');
            li.querySelector('.item-text').style.textDecoration = 'none';
        }
    }


    var button = event.target;
    var toDo_div;

    if (buttonClicked()) {
        if (isEditBtn(button)) {
            editToDoItem();
        }
        else if (isTrashBtn(button)) {
            deleteToDoItem();
        }
    }

    function deleteToDoItem() {
        removeItemFromArray();
        displayToDoItems();
    }

    function removeItemFromArray() {
        toDoItems.splice(toDoItems.indexOf(toDo_div.textContent), 1);
    }

    function editToDoItem() {
        makeEntryEditable();
        var text = document.getElementsByClassName('edit-text')[0].value;

        restyleEditBtn();

        function makeEntryEditable() {
            var textInput = document.createElement('input');
            textInput.setAttribute('type', 'text');
            textInput.setAttribute('class', 'edit-text input-normal col-xs-10');

            var itemText = button.parentNode.parentNode.textContent;
            textInput.setAttribute('value', itemText);

            var toDo_li = toDo_div.children[0];
            toDo_li.children[1].remove();
            toDo_li.appendChild(textInput);
        }

        function restyleEditBtn() {
            button.style.color = 'red';
            button.parentNode.style.backgroundColor = 'lawngreen';
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
        return button.classList.contains('glyphicon-edit');
    }

});