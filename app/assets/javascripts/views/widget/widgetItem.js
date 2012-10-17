DescribeMe.Views.WidgetItem = Backbone.View.extend({
	
	template: JST['widget/widgetMarketplaceItem'],

	initialize: function () {
	},

	events : {
		'click .add' : 'onAddClick'
	},

	onAddClick: function() {
		var aConfigModel = new DescribeMe.Models.WidgetConfig({id: this.model.get('id')});
		var xConfigView = new DescribeMe.Views.WidgetConfig({model:aConfigModel}).render();
	},

	onDeleteClick: function() {

	},

	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}
});
