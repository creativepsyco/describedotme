DescribeMe.Views.WidgetItem = Backbone.View.extend({

	template: JST['widget/widgetMarketplaceItem'],

	initialize: function() {},

	events: {
		'click .add': 'onAddClick'
	},

	onAddClick: function() {
		var aConfigModel = new DescribeMe.Models.WidgetConfig({
			id: this.model.get('id'),
			name: this.model.get('name'),
			location: this.model.get('location')
		});
		var xConfigView = new DescribeMe.Views.WidgetConfig({
			model: aConfigModel
		}).render();
	},

	onDeleteClick: function() {

	},

	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		var arr = WidgetLoader.getEnabledWidgets(window.CurrentUser);
		for(i = 0; i < arr.length; i++) {
			console.log(arr[i], this.model.get('id'), arr[i].id);
			if(this.model.get('id') == arr[i].id) {
				var tick = $(this.el).find('.add i');
				tick.removeClass('icon-plus');
				tick.addClass('icon-ok');
			} else {
				var tick = $(this.el).find('.add i');
				tick.removeClass('icon-ok');
				tick.addClass('icon-plus');
			}
		}
		return this;
	}
});