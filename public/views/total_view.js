;(function(window) {
  var TotalView = Backbone.View.extend({
    tagName: 'div',
    className: 'total',

    initialize: function() {
      this.models = [];
    },

    add: function(model) {
      model.on('change', this.render, this);
      this.models.push(model);
      this.render();
    },

    remove: function(model) {
      var index = this.models.indexOf(model)
      model.off('change', this.render, this);
      this.models.splice(index, 1);
      this.render();
    },

    doneTaskCount: function() {
      return _(this.models).select(function(model) {
        return model.get('done');
      }).length;
    },

    taskCount: function() {
      return this.models.length;
    },

    render: function() {
      var nodes = $(_.template(this._template)(this));
      this.$el.html(nodes);
      return this;
    },

    _template: [
      , '<span class="all-count"><%- taskCount() %> tasks</span>'
      , '<span class="done-count">(done: <%- doneTaskCount() %> tasks)</span>'
    ].join('\n')
  });

  window.TotalView = TotalView;
})(this);
