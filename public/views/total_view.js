;(function(window) {
  var TotalView = Backbone.View.extend({
    tagName: 'div',
    className: 'total',

    initialize: function() {
      this.collection.on('add', this.render, this);
      this.collection.on('remove', this.render, this);
      this.collection.on('change', this.render, this);
    },

    doneTaskCount: function() {
      return this.collection.select(function(model) {
        return model.get('done');
      }).length;
    },

    taskCount: function() {
      return this.collection.length;
    },

    render: function() {
      var nodes = $(_.template(this.template)(this));
      this.$el.html(nodes);
      return this;
    },

    template: [
        '<span class="all-count"><%- taskCount() %> tasks</span>'
      , '<span class="done-count">(done: <%- doneTaskCount() %> tasks)</span>'
    ].join('\n')
  });

  window.TotalView = TotalView;
})(this);
