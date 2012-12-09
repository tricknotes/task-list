;(function(window) {
  var $ = window.jQuery;

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
  $('#createForm').on('submit', function() {
    var $text = $('#text')
      , text = $text.val()

    if (!text) { return false; }

    taskList.add({text: text});
    $text.val('');
    return false;
  });

  // setup storage
  var storage = new Storage('tasklist', localStorage);
  storage.update(function(data) {
    return data || []; // initialize
  });

  taskList.on('add', function(task) {
    task.on('destroy', function() {
      storage.update(function(data) {
        return _(data).reject(function(attrs) {
          return _.isEqual(attrs.id, task.get('id'));
        });
      });
    });

    task.on('change', function(task, updated) {
      storage.update(function(data) {
        data.forEach(function(attrs) {
          if (attrs.id === task.get('id')) {
            _(attrs).extend(task.toJSON());
          };
        });
        return data;
      });
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
