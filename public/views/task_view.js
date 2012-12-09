;(function(window) {

  var TaskView = Backbone.View.extend({
    tagName: 'li',
    className: 'task',
    render: function() {
      // TODO Extract events
      var task = this.model;
      var root = $(_.template(this._template)({task: task}));

      this.$el.html(root);

      this.$el.find('.done').on('change', function() {
        var checked = !!$(this).filter(':checked').length;
        task.set('done', checked);
      });

      this.$el.find('.delete').on('click', function() {
        task.destroy();
      });

      // TODO Use `once`
      task.on('destroy', function() {
        this.$el.remove();
      }.bind(this));

      var toggleDeletion = function() {
        var done = task.get('done');
        this.$el.find('.text').css('text-decoration', done ? 'line-through' : 'none');
      }.bind(this);

      task.on('change', toggleDeletion);

      toggleDeletion();

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
