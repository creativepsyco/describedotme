DescribeMe.Views.VideoAttachment = Backbone.View.extend({
	
	template: JST['attachment/video-attachment'],

	initialize: function () {
	},

	events : {
	},

	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}
});
