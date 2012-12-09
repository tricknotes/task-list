;(function(window) {
  var Task = Backbone.Model.extend({
    defaults: {
      done: false
    },

    initialize: function(attrs) {
      this.id = attrs && attrs.id || ('task-' + Number(new Date()));
    },

    data: function() {
      return this.toJSON();
    },

    destroy: function() {
      this.trigger('destroy');
      this.off();
    }
  });

  // TODO Mode to Collection
  Task.create = function(attrs) {
    var task = new Task(attrs);
    this.trigger('create', task);
    return task;
  };

  // TODO Use Collection
  _.extend(Task, Backbone.Events);

  window.Task = Task;
})(this);
