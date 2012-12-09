
describe('TaskView', function() {
  var taskView, task;
  beforeEach(function() {
    task = Task.create();
    taskView = new TaskView({model: task});
  });

  afterEach(function() {
    taskView.remove();
  });

  describe('input.done with click', function() {
    it('should make task done', function(done) {
      task.on('change:done', function() {
        done();
      });
      taskView.render();
      taskView.$el.appendTo('body');
      taskView.$el.find('input.done').trigger('click');
    });
  });

  describe('.delete with click', function() {
    it('should make task destroy', function(done) {
      task.on('destroy', function() {
        done();
      })
      taskView.render();
      taskView.$el.appendTo('body');
      // In mocha-ci-driver, this code is required. Hmm...
      taskView.$el.find('.done').trigger('click');

      taskView.$el.find('.delete').trigger('click');
    });
  });
});
