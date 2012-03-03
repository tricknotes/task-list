;(function(window) {
  var ViewBase = function() {
    this.el = null;
  }

  ViewBase.prototype.template = '';

  ViewBase.prototype.observe = function(root) {}

  ViewBase.prototype.compile = function() {
    return _.template(this.template);
  }

  ViewBase.prototype.render = function() {
    var el = this.el = $(this.compile()(this));
    this.observe(el);
    return el;
  }

  window.ViewBase = ViewBase;
})(this);
