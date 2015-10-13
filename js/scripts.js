
var itemText_input = document.getElementById('toDoItem');
var toDoList_ul = document.getElementById('toDoList');

var toDoItems = [];

var addItem_button = document.getElementById('addItem');

//TODO remove debug console logs

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

        var li = document.createElement('li');
        li.innerText = item;
        li.setAttribute('class', 'list-group-item col-xs-8');

        var checkBox = document.createElement('input');
        checkBox.setAttribute('type', 'checkbox');
        checkBox.setAttribute('class', 'col-xs-1');

        toDoList_ul.appendChild(li);
        toDoList_ul.appendChild(checkBox);
    }
}