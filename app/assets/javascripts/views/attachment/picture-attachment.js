DescribeMe.Views.PictureAttachment = Backbone.View.extend({
	
	template: JST['attachment/picture-attachment'],

	initialize: function () {
	},

	events : {
	},

	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}
});
