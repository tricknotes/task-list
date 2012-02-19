;(function(global) {
  var $ = global.Zepto;

  Task.on('create', function(task) {
    var taskView = new TaskView(task);
    taskView.render().appendTo('#taskList');
  });

  // 
  $('#createForm').on('submit', function() {
    var text = $('#text').val()
      , task = Task.create(text)
    return false;
  });


})(window);
