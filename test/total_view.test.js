
describe('TotalView', function() {
  var totalView;
  beforeEach(function() {
    totalView = new TotalView();
    var el = totalView.render();
    el.appendTo('body');
  });

  afterEach(function() {
    totalView.el.remove();
  });

  describe('#add()', function() {
    var task;
    beforeEach(function() {
      task = Task.create();
    });

    it('should add task', function() {
      totalView.add(task);
      expect(totalView.tasks).to.eql([task]);
    });

    it('should update self', function() {
      expect(totalView.el.find('.all-count').text()).to.contain('0 tasks');
      totalView.add(task);
      expect(totalView.el.find('.all-count').text()).to.contain('1 tasks');
    });
  });

  describe('#remove()', function() {
    var task;
    beforeEach(function() {
      task = Task.create();
      totalView.add(task);
    });

    it('should remove task', function() {
      totalView.remove(task);
      expect(totalView.tasks).to.eql([]);
    });

    it('should update self', function() {
      expect(totalView.el.find('.all-count').text()).to.contain('1 tasks');
      totalView.remove(task);
      expect(totalView.el.find('.all-count').text()).to.contain('0 tasks');
    });
  });

  describe('#doneTaskCount()', function() {
    var task;
    beforeEach(function() {
      task = Task.create({done: false});
      totalView.add(task);
    });

    it('should returns count of done tasks', function() {
      expect(totalView.doneTaskCount()).to.be(0);
      task.set('done', true);
      expect(totalView.doneTaskCount()).to.be(1);
    });
  });

  describe('#update()', function() {
    it('should update self when task changed', function() {
      var task = Task.create({done: false});
      totalView.add(task);
      expect(totalView.el.find('.done-count').text()).to.contain('0 tasks');
      task.set('done', true);
      expect(totalView.el.find('.done-count').text()).to.contain('1 tasks');
    });
  });
});
