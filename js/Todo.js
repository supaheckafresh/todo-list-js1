var Todo = function(item) {
    this.item = item;
    this.completed = false;
};

//Todo.prototype = {
//    complete: function complete() {
//        return this.completed = true;
//    }
//};

Todo.prototype.complete = function () {
    console.log(this);
    this.completed = true;
};