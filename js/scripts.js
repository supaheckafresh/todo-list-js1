
var itemText_input = document.getElementById('enterItem');
var toDoList_ul = document.getElementById('toDoList');

var toDoItems = [];

var addItem_button = document.getElementById('itemSubmit');

//TODO remove debug console logs

//TODO add edit for selected tasks

//TODO MAYBE - add theme selector?

addItem_button.addEventListener('click', function (evt) {
    if (itemText_input.value) {
        toDoItems.push(itemText_input.value.trim());

        evt.preventDefault();

        displayToDoItems();
        alert(itemText_input.value + ' has been added to your list!');

        itemText_input.value = '';
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

    var div = document.createElement('div');
    div.setAttribute('class', 'to-do-item');

    var li = document.createElement('li');
    li.appendChild(displayItem.checkbox());
    li.appendChild(span);
    li.setAttribute('class', 'list-group-item list-group-item-danger col-xs-7 col-xs-offset-1');

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
    var btn = document.createElement('button');

    var span = document.createElement('span');
    span.setAttribute('class', buttonType);
    span.setAttribute('aria-hidden', 'true');
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
    var todoLi;

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
        toDoItems.splice(toDoItems.indexOf(todoLi.textContent), 1);
    }

    function editToDoItem() {
        //TODO make this one!
    }

    function buttonClicked() {
        var clicked = false;

        if (evt.target.type === 'button') {
            button = evt.target.firstChild;
            todoLi = evt.target.parentNode;
            clicked = true;
        }
        else if (targetIsTheLittleGlyphicon()) {
            button = evt.target;
            todoLi = button.parentNode.parentNode;
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