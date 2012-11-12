DescribeMe.Views.CommunityProjectList = Backbone.View.extend({

    el: '#main-content',

	template: JST['layout/community'],

	initialize: function () {
	},

	add: function(item) {
      var self = this;
      $(self.el).find('#project-container').append(new DescribeMe.Views.CommunityItem({ model: item }).render().el);
  },

  render: function() {
      var self = this;
      $(this.el).html($(this.options.sidebar.el));
      $(this.el).append(this.template());

      _.each(this.model.models, function(item) {
          self.add(item);
      }, this);

      return this;
  }
});
