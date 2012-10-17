DescribeMe.Views.Home = Backbone.View.extend({
	
	el: '#main-content',

	template: JST['main/home'],

	initialize: function () {
	},

	events : {
		
	},

	render: function() {
		$(this.el).html(this.template());
		return this;
	}
});
