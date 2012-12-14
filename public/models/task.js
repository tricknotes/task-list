;(function(window) {
  var Task = Backbone.Model.extend({
    defaults: {
      done: false
    },

    initialize: function(attrs) {
      var id = attrs && attrs.id || ('task-' + Number(new Date()));
      this.set('id', id);
    },

    destroy: function() {
      this.trigger('destroy', this);
      this.off();
    }
  });

  var TaskList = Backbone.Collection.extend({
    model: Task,

    initialize: function() {
      this.on('destroy', this.remove, this);
    }
  });

  window.Task = Task;
  window.TaskList = TaskList;
})(this);
