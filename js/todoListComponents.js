
var todoItems = JSON.parse(localStorage.getItem('todoList') || null) || [];
var addItem_input = document.getElementById('enterItem');
var addItem_button = document.getElementById('itemSubmit');
var todoList_ul = document.getElementById('todoList');

//TODO MAYBE - add theme selector?

function displayTodoItems() {
    todoList_ul.innerHTML = '';
    for (var i = 0; i < todoItems.length; i++) {
        todoItems[i].__proto__ = Todo.prototype;
        var item = todoItems[i].item;
        displayItem(item, i);
    }
    console.log(todoItems);
}

function displayItem(item, index) {
    var div = document.createElement('div');
    var li = document.createElement('li');
    var checkBox = displayItem.checkbox(index);
    var span = displayItem.makeSpan(item);
    var editBtn = displayItem.button('glyphicon glyphicon-edit');
    var deleteBtn = displayItem.button('glyphicon glyphicon-trash');

    li.appendChild(checkBox);
    li.appendChild(span);
    li.setAttribute('class', 'list-group-item list-group-item-danger col-xs-7 col-xs-offset-1');

    if (checkBox.checked) {
        // below is duplicate code from styleComplete() and toggleEditBtn() inside of the ul event listener.
        // TODO: fix this duplicate code.
        li.classList.remove('list-group-item-danger');
        li.classList.add('list-group-item-success');
        li.querySelector('.item-text').style.textDecoration = 'line-through';

        editBtn.setAttribute('disabled', 'disabled');
        editBtn.childNodes[0].classList.add('disabled');
    }

    div.setAttribute('class', 'to-do-item');
    div.setAttribute('id', index);

    div.appendChild(li);
    div.appendChild(editBtn);
    div.appendChild(deleteBtn);

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

displayItem.button = function (buttonType) {
    var btn = document.createElement('button');
    var span = document.createElement('span');

    span.setAttribute('class', buttonType);
    span.setAttribute('aria-hidden', 'true');

    btn.appendChild(span);
    btn.setAttribute('type', 'button');
    btn.setAttribute('class', 'btn btn-default btn-lg col-xs-1');
    return btn;
};

displayTodoItems();
