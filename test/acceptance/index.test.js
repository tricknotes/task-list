require('coffee-script')

var app = require('../../')
  , expect = require('expect.js')
  , Browser = require("zombie")

describe('Task List', function() {
  var browser = new Browser()
    , port = 13000

  beforeEach(function() {
    app.listen(++port);
  });

  afterEach(function(){
    app.close();
  });

  it('should add task with input text', function(done) {
    browser.visit('http://localhost:'+port, function() {
      browser
        .fill('task-text', 'Eat SoupCurry')
        .fire('submit', browser.$$('form#createForm'), function() {
          expect(browser.queryAll('.task')).to.have.length(1);
          expect(browser.text('.task')).to.contain('Eat SoupCurry');
          expect(browser.text('.total .all-count')).to.contain('1 tasks');
          expect(browser.text('.total .done-count')).to.contain('0 tasks');
          done();
        });
    });
  });

  it('should remove task when delete link clicked', function(done) {
    browser.visit('http://localhost:'+port, function() {
      var Task = browser.evaluate('Task');
      Task.create();

      expect(browser.queryAll('.task')).to.have.length(1);
      browser.clickLink('.delete', function() {
        expect(browser.queryAll('.task')).to.have.length(0);
        expect(browser.text('.total .all-count')).to.contain('0 tasks');
        done();
      });
    });
  });

  it('should make task done when checkbox clicked', function(done) {
    browser.visit('http://localhost:'+port, function() {
      var Task = browser.evaluate('Task');
      Task.create();

      expect(browser.text('.total .done-count')).to.contain('0 tasks');
      browser.check('.done', function() {
        expect(browser.text('.total .done-count')).to.contain('1 tasks');
        done();
      });
    });
  });
});
