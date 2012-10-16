DescribeMe.Views.WidgetItem = Backbone.View.extend({
	
	template: JST['widget/widgetMarketplaceItem'],

	initialize: function () {
	},

	events : {
		'click .add' : 'onAddClick'
	},

	onAddClick: function() {
		
	},

	onDeleteClick: function() {

	},

	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}
});
