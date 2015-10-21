
var todoItems = JSON.parse(localStorage.getItem('todoList') || null) || [];
var addItem_input = document.getElementById('enterItem');
var addItem_button = document.getElementById('itemSubmit');
var todoList_ul = document.getElementById('todoList');

//TODO fix completed style and disable edit for completed items on page load.
//TODO MAYBE - add theme selector?

function displayTodoItems() {
    todoList_ul.innerHTML = '';
    for (var i = 0; i < todoItems.length; i++) {
        var item = todoItems[i].item;
        displayItem(item, i);
    }
    console.log(todoItems);
}

function displayItem(item, index) {
    var span = displayItem.makeSpan(item);

    var li = document.createElement('li');
    li.appendChild(displayItem.checkbox(index));
    li.appendChild(span);
    li.setAttribute('class', 'list-group-item list-group-item-danger col-xs-7 col-xs-offset-1');

    var div = document.createElement('div');
    div.setAttribute('class', 'to-do-item');
    div.setAttribute('id', index);

    div.appendChild(li);
    div.appendChild(displayItem.button('glyphicon glyphicon-edit'));
    div.appendChild(displayItem.button('glyphicon glyphicon-trash'));

    todoList_ul.appendChild(div);
}

displayItem.makeSpan = function (item) {
    var span = document.createElement('span');
    span.setAttribute('class', 'item-text col-xs-10');
    span.appendChild(document.createTextNode(item));
    return span;
};

displayItem.checkbox = function (index) {
    var checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('class', 'big-check col-xs-2');
    if (todoItems[index].completed === true) {
        checkBox.setAttribute('checked', 'true');
    }
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

displayTodoItems();
