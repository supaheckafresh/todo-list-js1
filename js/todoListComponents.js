
var todoItems = [];

var addItem_input = document.getElementById('enterItem');
var addItem_button = document.getElementById('itemSubmit');

var todoList_ul = document.getElementById('todoList');

//TODO remove debug console logs

//TODO make todoList and todo items objects
//TODO MAYBE - add theme selector?

addItem_button.addEventListener('click', function (evt) {
    if (addItem_input.value) {
        todoItems.push(addItem_input.value.trim());

        evt.preventDefault();

        displayTodoItems();
        alert(addItem_input.value + ' has been added to your list!');

        addItem_input.value = '';
    } else {
        evt.preventDefault();
    }
});

function displayTodoItems() {

    todoList_ul.innerHTML = '';
    for (var i = 0; i < todoItems.length; i++) {
        var item = todoItems[i];
        displayItem(item);
    }
    console.log(todoItems);
}

function displayItem(item) {
    var span = displayItem.makeSpan(item);

    var li = document.createElement('li');
    li.appendChild(displayItem.checkbox());
    li.appendChild(span);
    li.setAttribute('class', 'list-group-item list-group-item-danger col-xs-7 col-xs-offset-1');

    var div = document.createElement('div');
    div.setAttribute('class', 'to-do-item');

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

displayItem.checkbox = function () {
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
