DescribeMe.Views.WidgetConfig = Backbone.View.extend({
	el: '#widget-config-container',

	template: JST['widget/widgetConfig'],

	initialize: function () {
		// GET JSON from server
		
	},

	events: {
		'click .widgetAdd' : 'onWidgetAdd'
	},

	onWidgetAdd: function() {
		// POST JSON to server
		var widget_id = this.model.get('id');
		console.log(widget_id);

		var user_id = window.id;

		var URL = '/widgets/' + widget_id + '/users/' + user_id;
		console.log(URL);

		var sample_JSON = '{}';
		jQuery.post(URL, {config_json: sample_JSON}, 
			function(data, textStatus, xhr) {
				alert("Successfully added widget");
		});
	},

	onAddClick: function() {
		
	},

	onDeleteClick: function() {

	},

	render: function() {
		console.log(this.model);
		var url = "/widgets/" + this.model.get('id') + '/config.html';
		this.model.set('iframeSource', url); 
		this.widgetConfigContainer = $(this.el);
		this.widgetConfigContainer.empty();
		$(this.widgetConfigContainer).html(this.template(this.model.toJSON()));
		$(this.widgetConfigContainer).modal('show');
		//$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}
});
