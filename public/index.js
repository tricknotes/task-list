;(function(global) {
  var EventEmitter = global.EventEmitter;

  // model
  var TodoList = function(text) {
    this.text = text;
    this.done = false;
    this.priority = 3;
  };

  TodoList.prototype = new EventEmitter();
  TodoList.prototype.constructor = TodoList;

  TodoList.prototype.set = function (property, value) {
    this[property] = value;
    this.emit('change', property, value);
  };

  TodoList.prototype.get = function (property) {
    return this[property];
  };

  TodoList.__proto__ = new EventEmitter();

  TodoList.create = function() {
    var todoList = new TodoList();
    this.emit('create', todoList);
    return todoList;
  };

  global.TodoList = TodoList;
})(
  'undefined' === typeof window ?
    module.exports :
    window
);
