DescribeMe.Views.FollowingView = Backbone.View.extend({
	
	el: '#main-content',

	template: JST['user/following'],

	initialize: function () {
	},

	add: function(item) {
        console.log(item.toJSON());
        var projectItem = new DescribeMe.Views.FollowingEntry({ model: item});
  
       $(this.el).find('#following-container').append($(projectItem.render().el));
    },

	render: function() {
		var self = this;
		$(this.el).empty();
		$(this.el).html($(this.options.sidebar.el));
		$(this.el).append(this.template());

		this.followings = new DescribeMe.Collections.FollowingList(this.model.get('followings'));

		_.each(this.followings.models, function(item) {
            self.add(item);
        }, this);

		return this;
	},
});
