;(function(global) {
  var $ = global.Zepto;

  Task.on('create', function(task) {
    var taskView = new TaskView(task);
    taskView.render().appendTo('#taskList');
  });

  var totalView = new TotalView();
  totalView.render().appendTo('#total');
  Task.on('create', function(task) {
    totalView.add(task);
    task.on('destroy', function() {
      totalView.remove(task);
    });
  });

  // 
  $('#createForm').on('submit', function() {
    var text = $('#text').val()
      , task = Task.create(text)
    $('#text').val('');
    return false;
  });
})(window);
