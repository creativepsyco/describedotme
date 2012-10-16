DescribeMe.Views.WidgetConfig = Backbone.View.extend({
	el: '#widget-config-container',

	model: DescribeMe.Models.WidgetConfig,

	template: JST['widget/widgetConfig'],

	initialize: function () {
	},

	events: {
	},

	onAddClick: function() {
		
	},

	onDeleteClick: function() {

	},

	render: function() {
		console.log(this.model);
		this.widgetConfigContainer = $(this.el);
		this.widgetConfigContainer.empty();
		$(this.widgetConfigContainer).html(this.template(this.model.toJSON()));
		$(this.widgetConfigContainer).modal('show');
		//$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}
});
