
var itemText_input = document.getElementById('enterItem');
var toDoList_ul = document.getElementById('toDoList');

var toDoItems = [];

var addItem_button = document.getElementById('itemSubmit');

//TODO remove debug console logs

//TODO add edit, delete, and complete for selected tasks

//TODO also need edit and delete next to each item

//TODO MAYBE - add theme selector?

addItem_button.addEventListener('click', function (evt) {
    if (itemText_input.value) {
        toDoItems.push(itemText_input.value);

        evt.preventDefault();

        console.log(toDoItems);

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