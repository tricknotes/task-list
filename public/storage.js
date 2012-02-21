;(function(global) {
  var Storage = function(name, storage) {
    this.name = name;
    this.storage = storage;
  }

  Storage.prototype.find = function(fn) {
    var data = this.storage[this.name];
    fn(data ? JSON.parse(data) : undefined);
  }

  Storage.prototype.update = function(fn) {
    var updated;
    this.find(function(data) {
      updated = fn(data);
    });
    this.storage[this.name] = JSON.stringify(updated);
  }

  global.Storage = Storage;
})(
  'undefined' === typeof window ?
    module.exports :
    window
);
