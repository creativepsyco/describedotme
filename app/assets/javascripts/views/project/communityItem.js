DescribeMe.Views.CommunityItem = Backbone.View.extend({
	
	template: JST['project/communityItem'],

	className: 'span4',

	initialize: function () {
	},

	events : {
	},

	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}
});
