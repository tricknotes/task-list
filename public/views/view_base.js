;(function(global) {
  var ViewBase = function() {}

  ViewBase.prototype.template = '';

  ViewBase.prototype.observe = function(root) {}

  ViewBase.prototype.compile = function() {
    return _.template(this.template);
  }

  ViewBase.prototype.render = function() {
    var html = $(this.compile()(this));
    this.observe(html);
    return html;
  }

  global.ViewBase = ViewBase;
})(window);
