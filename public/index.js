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

    if (!text) { return false; }

    Task.create(text);
    $text.val('');
    return false;
  });

  // setup storage
  var storage = new Storage('tasklist', localStorage);
  storage.update(function(data) {
    return data || []; // initialize
  });

  Task.on('create', function(task) {
    task.on('destroy', function() {
      storage.update(function(tasks) {
        var index = tasks.indexOf(task.get('text'));
        tasks.splice(index, 1);
        return tasks;
      });
    });
  });

  // restore tasks
  storage.find(function(tasks) {
    tasks.forEach(function(task) {
      Task.create(task)
    });
  });

  // save created tasks
  Task.on('create', function(task) {
    storage.update(function(tasks) {
      tasks.push(task.get('text'));
      return tasks;
    });
  });
})(window);
