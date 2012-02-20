;(function(global) {
  var EventEmitter = global.EventEmitter;

  // model
  var Task = function(text) {
    EventEmitter.call(this);
    this.text = text;
    this.done = false;
  };

  Task.prototype = new EventEmitter();
  Task.prototype.constructor = Task;

  Task.prototype.set = function (property, value) {
    this[property] = value;
    this.emit('change', property, value);
  };

  Task.prototype.get = function (property) {
    return this[property];
  };

  Task.prototype.data = function() {
    return {
        text: this.get('text')
      , done: this.get('done')
    };
  };

  Task.prototype.destroy = function () {
    this.emit('destroy');
    this.removeAllListeners();
  };

  Task.__proto__ = new EventEmitter();

  Task.create = function(text) {
    var task = new Task(text);
    this.emit('create', task);
    return task;
  };

  global.Task = Task;
})(
  'undefined' === typeof window ?
    module.exports :
    window
);
