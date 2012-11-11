DescribeMe.Views.DashboardShow = Backbone.View.extend({
	
	el: '#main-content',

	template: JST['user/dashboard'],

	initialize: function () {
	},

	events : {
		
	},

	render: function() {
		$(this.el).empty();
		$(this.el).html($(this.options.sidebar.el));
		$(this.el).append(this.template());
		return this;
	}
});
