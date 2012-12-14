;(function(window) {
  var taskList = new TaskList();

  // setup task list
  taskList.on('add', function(task) {
    var taskView = new TaskView({model: task});
    taskView.render();
    taskView.$el.appendTo('#taskList');
  });

  // setup total
  var totalView = new TotalView({collection: taskList});
  totalView.render();
  totalView.$el.appendTo('#total');

  // setup add task form
  var createTaskView = new CreateTaskView({
    el: '#createForm',
    collection: taskList
  });

  // setup storage
  var storage = new Storage('tasklist', localStorage);
  storage.update(function(data) {
    return data || []; // initialize
  });

  taskList.on('destroy', function(task) {
    storage.update(function(data) {
      return _(data).reject(function(attrs) {
        return attrs.id === task.get('id');
      });
    });
  });

  taskList.on('change', function(task) {
    storage.update(function(data) {
      data.forEach(function(attrs) {
        if (attrs.id === task.get('id')) {
          _(attrs).extend(task.toJSON());
        }
      });
      return data;
    });
  });

  // restore tasks
  storage.find(function(data) {
    data.forEach(function(attrs) {
      taskList.add(attrs);
    });
  });

  // save created tasks
  taskList.on('add', function(task) {
    storage.update(function(data) {
      data.push(task.toJSON());
      return data;
    });
  });
})(this);
