
describe('TaskView', function() {
  var taskView, task;
  beforeEach(function() {
    task = Task.create();
    taskView = new TaskView(task);
  });

  afterEach(function() {
    taskView.el.remove();
  });

  describe('input.done with click', function() {
    it('should make task done', function(done) {
      task.on('change', function() {
        done();
      });
      var el = taskView.render();
      el.appendTo('body');
      el.find('input.done').trigger(jQuery.Event('click'));
    });
  });

  describe('.delete with click', function() {
    it('should make task destroy', function() {
      var el = taskView.render();
      el.appendTo('body');
      el.find('.delete').trigger(jQuery.Event('click'));
      expect(task.listeners('.destroy')).to.have.length(0)
    });
  });
});
