
describe('TodoList', function() {
  describe('#set()', function() {
    var todoList;
    beforeEach(function() {
      todoList = TodoList.create();
    });

    it('should set value', function() {
      todoList.set('text', '買い物に行く');
      expect(todoList.get('text')).to.be('買い物に行く');
    });

    it('should emit event "change"', function() {
      todoList.on('change', function() {
        expect(true).to.be.ok();
      });
      todoList.set('text', 'スープカレーを食べる');
    });

    it('should send property with value as argument for listener', function() {
      todoList.on('change', function(property, value) {
        expect(property).to.be('text');
        expect(value).to.be('本を買う');
      });
      todoList.set('text', '本を買う');
    });
  });

  describe('.create()', function() {
    afterEach(function() {
      TodoList.removeAllListeners('create');
    });

    it('should return instance of TodoList', function() {
      var todoList = TodoList.create();
      expect(todoList).to.be.a(TodoList);
    });

    it('should emit event "create"', function() {
      TodoList.on('create', function(todo) {
        expect(true).to.be.ok();;
      });
      TodoList.create();
    });

    it('should send instance as argument for listener', function() {
      TodoList.on('create', function(todo) {
        expect(todo).to.be.a(TodoList);;
      });
      TodoList.create();
    });
  });
});
