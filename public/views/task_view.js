;(function(window) {
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
      var checked = !!$(this).filter(':checked').length;
      task.set('done', checked);
    });

    root.find('.delete').on('click', function() {
      task.destroy();
    });

    // TODO Use `once`
    task.on('destroy', function() {
      root.remove();
    });

    var toggleDeletion = function() {
      var done = task.get('done');
      root.find('.text').css('text-decoration', done ? 'line-through' : 'none');
    }

    task.on('change', toggleDeletion);

    toggleDeletion();
  }

  window.TaskView = TaskView;
})(this);
