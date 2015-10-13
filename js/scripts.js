
var itemText_input = document.getElementById('toDoItem');
var toDoList_ul = document.getElementById('toDoList');

var toDoItems = [];

var addItem_button = document.getElementById('addItem');

addItem_button.addEventListener('click', function (evt) {
    toDoItems.push(itemText_input.value);
    evt.preventDefault();

    console.log(toDoItems);
    displayToDoItems();
});

function displayToDoItems() {
    toDoList_ul.innerHTML = '';
    for (var i = 0; i < toDoItems.length; i++) {
        var item = toDoItems[i];

        var li = document.createElement('li');
        li.innerText = item;
        li.setAttribute('class', 'list-group-item col-xs-6 col-xs-offset-2');

        var checkBox = document.createElement('input');
        checkBox.setAttribute('type', 'checkbox');
        checkBox.setAttribute('class', 'col-xs-2');

        toDoList_ul.appendChild(li);
        toDoList_ul.appendChild(checkBox);
    }
}