;(function(global) {
  var TaskView = function(task) {
    ViewBase.call(this);
    this.task = task;
  }

  TaskView.prototype = new ViewBase();
  TaskView.prototype.constructor = TaskView;

  TaskView.prototype.template = [
      '<li class="task">'
    ,   '<input class="done" type="checkbox" <%- task.get("done") ? "checked=\\"checked\\"" : "" %>" />'
    ,   '<span class="text"><%- task.get("text") %></span>'
    ,   '<input type="button" class="delete" value="×"></input>'
    , '</li>'
  ].join('\n');

  TaskView.prototype.observe = function(root) {
    var self = this
      , task = this.task;

    root.find('.done').on('change', function() {
      var checked = $(this).attr('checked');
      task.set('done', checked);
    });

    root.find('.delete').on('click', function() {
      task.destroy();
    });

    task.once('destroy', function() {
      root.remove();
    });
  }

  global.TaskView = TaskView;
})(window);
