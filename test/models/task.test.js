
describe('Task', function() {
  describe('#set()', function() {
    var task;
    beforeEach(function() {
      task = Task.create();
    });

    it('should set value', function() {
      task.set('text', '買い物に行く');
      expect(task.get('text')).to.be('買い物に行く');
    });

    it('should trigger event "change"', function(done) {
      task.on('change', function() {
        expect(true).to.be.ok();
        done();
      });
      task.set('text', 'スープカレーを食べる');
    });

    it('should send property with value as argument for listener', function(done) {
      task.on('change:text', function(task, change) {
        expect(change).to.be('本を買う');
        done();
      });
      task.set('text', '本を買う');
    });
  });

  describe('#destroy', function() {
    it('should trigger event "destroy"', function(done) {
      var task = new Task();
      task.on('destroy', function() {
        expect(true).to.be.ok();
        done();
      });
      task.destroy();
    });

    it('should remove all listeners', function() {
      var task = new Task();
      task.on('change', function() {});
      task.destroy();
      expect(task._callbacks).to.be(undefined);
    });
  });

  describe('#data()', function() {
    it('should returns task data', function() {
      var task = new Task();
      task.set('id', 'task-1');
      task.set('text', '洗濯をする');
      task.set('done', true);
      expect(task.data()).to.be.eql({
          id: 'task-1'
        , text: '洗濯をする'
        , done: true
      })
    });
  });

  describe('.create()', function() {
    afterEach(function() {
      Task.off('create');
    });

    it('should return instance of Task', function() {
      var task = Task.create();
      expect(task).to.be.a(Task);
    });

    it('should create instance with text', function() {
      var task = Task.create({text: 'ワインを買う'});
      expect(task.get('text')).to.be('ワインを買う');
    });

    it('should create instance with done', function() {
      var task = Task.create({done: true});
      expect(task.get('done')).to.be(true);
    });

    it('should trigger event "create"', function(done) {
      Task.on('create', function(task) {
        expect(true).to.be.ok();
        done();
      });
      Task.create();
    });

    it('should send instance as argument for listener', function() {
      Task.on('create', function(task) {
        expect(task).to.be.a(Task);
      });
      Task.create();
    });
  });
});
