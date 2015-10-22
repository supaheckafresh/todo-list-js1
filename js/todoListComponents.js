
var todoItems = JSON.parse(localStorage.getItem('todoList') || null) || [];
var addItem_input = document.getElementById('enterItem');
var addItem_button = document.getElementById('itemSubmit');
var todoList_ul = document.getElementById('todoList');

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
    var checkBox = displayItem.makeCheckbox(index);
    var itemText_span = displayItem.makeSpan(item);
    var editBtn = makeBtn('glyphicon glyphicon-edit');
    var deleteBtn = makeBtn('glyphicon glyphicon-trash');

    li.setAttribute('class', 'list-group-item list-group-item-danger col-xs-7 col-xs-offset-1');
    li.appendChild(checkBox);
    li.appendChild(itemText_span);

    div.setAttribute('class', 'to-do-item');
    div.setAttribute('id', index);
    div.appendChild(li);
    div.appendChild(editBtn);
    div.appendChild(deleteBtn);

    todoList_ul.appendChild(div);

    li.styleComplete = function () {
        this.classList.remove('list-group-item-danger');
        this.classList.add('list-group-item-success');
        this.querySelector('.item-text').style.textDecoration = 'line-through';
    };

    li.styleIncomplete = function () {
        this.classList.remove('list-group-item-success');
        this.classList.add('list-group-item-danger');
        this.querySelector('.item-text').style.textDecoration = 'none';
    };

    editBtn.toggleEnabled = function (mode) {
        if (mode === 'disable') {
            this.setAttribute('disabled', 'disabled');
            this.childNodes[0].classList.add('disabled');
        }
        if (mode === 'enable') {
            if (this.hasAttribute('disabled')){
                this.removeAttribute('disabled');
                this.childNodes[0].classList.remove('disabled');
            }
        }
    };

    if (checkBox.checked) {
        li.styleComplete();
        editBtn.toggleEnabled('disable');
    }
}

displayItem.makeSpan = function (item) {
    var span = document.createElement('span');
    span.setAttribute('class', 'item-text col-xs-10');
    span.appendChild(document.createTextNode(item));
    return span;
};

displayItem.makeCheckbox = function (index) {
    var checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('class', 'big-check col-xs-2');
    if (todoItems[index].completed === true) {
        checkBox.setAttribute('checked', 'true');
    }
    return checkBox;
};

function makeBtn(buttonType) {
    var btn = document.createElement('button');
    var span = document.createElement('span');

    span.setAttribute('class', buttonType);
    span.setAttribute('aria-hidden', 'true');

    btn.appendChild(span);
    btn.setAttribute('type', 'button');
    btn.setAttribute('class', 'btn btn-default btn-lg col-xs-1');
    return btn;
}

displayTodoItems();
