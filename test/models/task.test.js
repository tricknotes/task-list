
describe('Task', function() {
  describe('#set()', function() {
    var task;
    beforeEach(function() {
      task = new Task();
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
});
