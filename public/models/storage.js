;(function(window) {
  var Storage = function(name, storage) {
    this.name = name;
    this.storage = storage;
  };

  Storage.prototype.find = function(fn) {
    var data = this.storage[this.name];
    fn(data ? this.restore(data) : undefined);
  };

  Storage.prototype.update = function(fn) {
    var updated;
    this.find(function(data) {
      updated = fn(data);
    });
    this.storage[this.name] = this.dump(updated);
  };

  // API private
  Storage.prototype.dump = function(data) {
    return JSON.stringify(data);
  };

  // API private
  Storage.prototype.restore = function(data) {
    return JSON.parse(data);
  };

  window.Storage = Storage;
})(this);
