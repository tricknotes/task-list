;(function(global) {
  var TaskView = function(task) {
    this.id = _.uniqueId('task-');
    this.task = task;
  }

  TaskView.prototype.compile = function() {
    return _.template(this.template);
  }

  TaskView.prototype.render = function() {
    var html = $(this.compile()(this));
    this.observe(html);
    return html;
  }

  TaskView.prototype.template = [
      '<li class="task" id="<%= id %>">'
    ,   '<input class="done" type="checkbox" <%= task.get("done") ? "checked=\\"checked\\"" : "" %>" />'
    ,   '<div class="text"><%= task.get("text") %></div>'
    ,   '<input type="button" class="delete" value="×"></input>'
    , '</li>'
  ].join('\n');

  TaskView.prototype.observe = function(root) {
    var self = this
      , task = this.task;

    root.find('.delete').on('click', function() {
      task.destroy();
    });

    task.on('destroy', function() {
      root.remove();
    })
  }

  global.TaskView = TaskView;
})(window);
