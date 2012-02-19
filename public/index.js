;(function(global) {
  var $ = global.Zepto;

  // setup task list
  Task.on('create', function(task) {
    var taskView = new TaskView(task);
    taskView.render().appendTo('#taskList');
  });

  // setup total
  var totalView = new TotalView();
  totalView.render().appendTo('#total');
  Task.on('create', function(task) {
    totalView.add(task);
    task.on('destroy', function() {
      totalView.remove(task);
    });
  });

  // setup add task form
  $('#createForm').on('submit', function() {
    var $text = $('#text')
      , text = $text.val()

    Task.create(text);
    $text.val('');
    return false;
  });
})(window);
