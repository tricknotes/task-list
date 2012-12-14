;(function(window) {
  var CreateTaskView = Backbone.View.extend({
    events: {
      'submit form': 'onSubmit'
    },

    onSubmit: function() {
      var $text = this.$el.find('#text'),
          text = $text.val();
      if (!text) { return false; }

      this.createTask(text);
      $text.val('');
      return false;
    },

    createTask: function(text) {
      this.collection.add({text: text});
    }
  });

  window.CreateTaskView = CreateTaskView;
})(this);
