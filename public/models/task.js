;(function(window) {
  var Task = Backbone.Model.extend({
    defaults: {
      done: false
    },

    initialize: function(attrs) {
      var id = attrs && attrs.id || ('task-' + Number(new Date()))
      this.set('id', id);
    },

    destroy: function() {
      this.trigger('destroy');
      this.off();
    }
  });

  var TaskList = Backbone.Collection.extend({
    model: Task,
  });

  window.Task = Task;
  window.TaskList = TaskList;
})(this);
