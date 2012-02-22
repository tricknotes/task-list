;(function(global) {
  var TotalView = function() {
    ViewBase.call(this);
    this.tasks = [];

    var self = this;
    this.update = function() {
      self.el.replaceWith(self.render())
    }
  }

  TotalView.prototype = new ViewBase();
  TotalView.prototype.constructor = TotalView;

  TotalView.prototype.template = [
      '<div class="total">'
    ,   '<span class="all-count"><%- tasks.length %> tasks</span>'
    ,   '<span class="done-count">(done: <%- doneTasks() %> tasks)</span>'
    , '</div>'
  ].join('\n');

  TotalView.prototype.add = function(task) {
    task.on('change', this.update);
    this.tasks.push(task);

    this.update();
  }

  TotalView.prototype.remove = function(task) {
    var index = this.tasks.indexOf(task)

    task.removeListener('change', this.update);
    this.tasks.splice(index, 1);

    this.update();
  }

  TotalView.prototype.doneTasks = function() {
    var i = 0;
    this.tasks.forEach(function(task) {
      if (task.get('done')) {
        i += 1;
      }
    });
    return i;
  }

  global.TotalView = TotalView;
})(window);
