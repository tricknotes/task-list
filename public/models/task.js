;(function(window) {
  var EventEmitter = window.EventEmitter;

  var Task = function(attrs) {
    EventEmitter.call(this);
    this.id   = attrs && attrs.id || ('task-' + Number(new Date()));
    this.text = attrs && attrs.text;
    this.done = attrs && attrs.done || false;
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
        id:   this.get('id')
      , text: this.get('text')
      , done: this.get('done')
    };
  };

  Task.prototype.destroy = function () {
    this.emit('destroy');
    this.removeAllListeners();
  };

  Task.__proto__ = new EventEmitter();

  Task.create = function(attrs) {
    var task = new Task(attrs);
    this.emit('create', task);
    return task;
  };

  window.Task = Task;
})(this);
