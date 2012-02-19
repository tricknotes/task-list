
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

    it('should emit event "change"', function() {
      task.on('change', function() {
        expect(true).to.be.ok();
      });
      task.set('text', 'スープカレーを食べる');
    });

    it('should send property with value as argument for listener', function() {
      task.on('change', function(property, value) {
        expect(property).to.be('text');
        expect(value).to.be('本を買う');
      });
      task.set('text', '本を買う');
    });
  });

  describe('.create()', function() {
    afterEach(function() {
      Task.removeAllListeners('create');
    });

    it('should return instance of Task', function() {
      var task = Task.create();
      expect(task).to.be.a(Task);
    });

    it('should create instance with text', function() {
      var task = Task.create('ワインを買う');
      expect(task.get('text')).to.be('ワインを買う');
    });

    it('should emit event "create"', function() {
      Task.on('create', function(todo) {
        expect(true).to.be.ok();;
      });
      Task.create();
    });

    it('should send instance as argument for listener', function() {
      Task.on('create', function(todo) {
        expect(todo).to.be.a(Task);;
      });
      Task.create();
    });
  });
});
