;(function(window) {

  var TaskView = Backbone.View.extend({
    tagName: 'li',
    className: 'task',

    initialize: function() {
      // TODO Use `once`
      this.model.on('destroy', this.remove, this);
      this.model.on('change', this.toggleDeletion, this);
    },

    events: {
      'change .done': 'updateDone',
      'click .delete': 'deleteModel'
    },

    updateDone: function(event) {
      var checked = !!this.$el.find('.done').is(':checked');
      this.model.set('done', checked);
    },

    deleteModel: function() {
      this.model.destroy();
    },

    toggleDeletion: function() {
      var done = this.model.get('done');
      this.$el.find('.text').css('text-decoration', done ? 'line-through' : 'none');
    },

    render: function() {
      var nodes = $(_.template(this._template)({task: this.model}));
      this.$el.html(nodes);
      this.toggleDeletion();
      return this;
    },

    _template: [
        '<label>'
      ,   '<input class="done" type="checkbox" <%- task.get("done") ? "checked=\\"checked\\"" : "" %> />'
      ,   '<span class="text"><%- task.get("text") %></span>'
      , '</label>'
      , '<a class="delete">'
      ,   '<img src="./images/delete.png" />'
      , '</a>'
    ].join('\n')
  });

  window.TaskView = TaskView;
})(this);
