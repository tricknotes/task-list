;(function(window) {

  var TaskView = Backbone.View.extend({
    tagName: 'li',
    className: 'task',

    events: {
      'change .done': 'updateDone',
      'click .delete': 'deleteModel'
    },

    updateDone: function(event) {
      var checked = this.$el.find('.done').attr('checked');
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
      var task = this.model;
      var nodes = $(_.template(this._template)({task: task}));
      this.$el.html(nodes);

      // TODO Use `once`
      task.on('destroy', this.remove, this);

      task.on('change', this.toggleDeletion, this);

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
