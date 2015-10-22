var Todo = function(item) {
    this.item = item;
    this.completed = false;
};

Todo.prototype.complete = function () {
    this.completed = true;
};

