
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
        toDoList_ul.appendChild(li);
    }
}