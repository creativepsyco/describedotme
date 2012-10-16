DescribeMe.Views.Sidebar = Backbone.View.extend({
	
	className: 'span3',

	template: JST['layout/sidebar'],

	initialize: function () {
		this.render();
	},

	render: function() {
		$(this.el).html(this.template());
		return this;
	}
});
