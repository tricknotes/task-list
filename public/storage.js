;(function(global) {
  var Storage = function(name, storage) {
    this.name = name;
    this.storage = storage;
  }

  Storage.prototype.find = function(fn) {
    var data = this.storage[this.name];
    return fn(data ? JSON.parse(data) : null);
  }

  Storage.prototype.update = function(fn) {
    this.storage[this.name] = JSON.stringify(this.find(fn));
  }

  global.Storage = Storage;
})(
  'undefined' === typeof window ?
    module.exports :
    window
);
