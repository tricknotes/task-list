;(function(global) {
  var TaskView = function(task) {
    ViewBase.call(this);
    this.task = task;
  }

  TaskView.prototype = new ViewBase();
  TaskView.prototype.constructor = TaskView;

  TaskView.prototype.template = [
      '<li class="task">'
    ,   '<label>'
    ,     '<input class="done" type="checkbox" <%- task.get("done") ? "checked=\\"checked\\"" : "" %> />'
    ,     '<span class="text"><%- task.get("text") %></span>'
    ,   '</label>'
    ,   '<a class="delete">'
    ,     '<img src="./images/delete.png" />'
    ,   '</a>'
    , '</li>'
  ].join('\n');

  TaskView.prototype.observe = function(root) {
    var task = this.task;

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

    task.on('change', function() {
      var done = task.get('done');
      root.find('.text').css('text-decoration', done ? 'line-through' : 'none');
    });
  }

  global.TaskView = TaskView;
})(window);
