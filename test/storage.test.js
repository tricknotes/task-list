
describe('Storage', function() {
  var storage, db;
  beforeEach(function() {
    db = {};
    storage = new Storage('test-storage', db);
  });
  
  describe('#find()', function() {
    beforeEach(function() {
      db['test-storage'] = JSON.stringify('found!');
    });

    it('should access to data', function() {
      storage.find(function(data) {
        expect(data).to.be('found!');
      });
    });
  })

  describe('#update()', function() {
    it('should update data', function() {
      storage.update(function(data) {
        return ['ok'];
      });
      expect(JSON.parse(db['test-storage'])).to.eql(['ok']);
    });
  });
});
