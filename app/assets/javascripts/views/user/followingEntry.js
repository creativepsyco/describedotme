DescribeMe.Views.FollowingEntry = Backbone.View.extend({

	template: JST['user/followingEntry'],

	initialize: function () {
		
	},

	events : {
		
	},

	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	},
});
