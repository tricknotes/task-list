
describe('TotalView', function() {
  var totalView;
  beforeEach(function() {
    totalView = new TotalView();
    totalView.render();
    totalView.$el.appendTo('body');
  });

  afterEach(function() {
    totalView.remove();
  });

  describe('#addTask()', function() {
    var task;
    beforeEach(function() {
      task = new Task();
    });

    it('should add task', function() {
      totalView.addTask(task);
      expect(totalView.models).to.eql([task]);
    });

    it('should update self', function() {
      expect(totalView.$el.find('.all-count').text()).to.contain('0 tasks');
      totalView.addTask(task);
      expect(totalView.$el.find('.all-count').text()).to.contain('1 tasks');
    });
  });

  describe('#removeTask()', function() {
    var task;
    beforeEach(function() {
      task = new Task();
      totalView.addTask(task);
    });

    it('should remove task', function() {
      totalView.removeTask(task);
      expect(totalView.models).to.eql([]);
    });

    it('should update self', function() {
      expect(totalView.$el.find('.all-count').text()).to.contain('1 tasks');
      totalView.removeTask(task);
      expect(totalView.$el.find('.all-count').text()).to.contain('0 tasks');
    });
  });

  describe('#doneTaskCount()', function() {
    var task;
    beforeEach(function() {
      task = new Task({done: false});
      totalView.addTask(task);
    });

    it('should returns count of done tasks', function() {
      expect(totalView.doneTaskCount()).to.be(0);
      task.set('done', true);
      expect(totalView.doneTaskCount()).to.be(1);
    });
  });

  describe('#taskCount()', function() {
    it('should return count of tasks', function() {
      expect(totalView.taskCount()).to.be(0);
      totalView.addTask(new Task());
      expect(totalView.taskCount()).to.be(1);
    });
  });

  describe('#update()', function() {
    it('should update self when task changed', function() {
      var task = new Task({done: false});
      totalView.addTask(task);
      expect(totalView.$el.find('.done-count').text()).to.contain('0 tasks');
      task.set('done', true);
      expect(totalView.$el.find('.done-count').text()).to.contain('1 tasks');
    });
  });
});
