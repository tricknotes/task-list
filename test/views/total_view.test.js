
describe('TotalView', function() {
  var taskList, totalView;
  beforeEach(function() {
    taskList = new TaskList();
    totalView = new TotalView({collection: taskList});
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
      taskList.add(task);
      expect(totalView.collection.models).to.eql([task]);
    });

    it('should update self', function() {
      expect(totalView.$el.find('.all-count').text()).to.contain('0 tasks');
      taskList.add(task);
      expect(totalView.$el.find('.all-count').text()).to.contain('1 tasks');
    });
  });

  describe('#removeTask()', function() {
    var task;
    beforeEach(function() {
      task = new Task();
      taskList.add(task);
    });

    it('should remove task', function() {
      taskList.remove(task);
      expect(totalView.collection.models).to.eql([]);
    });

    it('should update self', function() {
      expect(totalView.$el.find('.all-count').text()).to.contain('1 tasks');
      taskList.remove(task);
      expect(totalView.$el.find('.all-count').text()).to.contain('0 tasks');
    });
  });

  describe('#doneTaskCount()', function() {
    var task;
    beforeEach(function() {
      task = new Task({done: false});
      taskList.add(task);
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
      taskList.add({});
      expect(totalView.taskCount()).to.be(1);
    });
  });

  describe('#update()', function() {
    it('should update self when task changed', function() {
      var task = new Task({done: false});
      taskList.add(task);
      expect(totalView.$el.find('.done-count').text()).to.contain('0 tasks');
      task.set('done', true);
      expect(totalView.$el.find('.done-count').text()).to.contain('1 tasks');
    });
  });
});
