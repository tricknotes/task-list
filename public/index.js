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

    Task.create({text: text});
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
      storage.update(function(data) {
        return _(data).reject(function(attrs) {
          return _.isEqual(attrs, task.data());
        });
      });
    });

    task.on('change', function(property, value) {
      storage.update(function(data) {
        _(data).each(function(attrs) {
          if (attrs.id === task.get('id')) {
            attrs[property] = value;
          };
        });
        return data;
      });
    });
  });

  // restore tasks
  storage.find(function(data) {
    data.forEach(function(attrs) {
      Task.create(attrs);
    });
  });

  // save created tasks
  Task.on('create', function(task) {
    storage.update(function(data) {
      data.push(task.data());
      return data;
    });
  });
})(window);
