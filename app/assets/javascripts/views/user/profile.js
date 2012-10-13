DescribeMe.Views.ProfileShow = Backbone.View.extend({
	
	el: '#main-content',

	template: JST['user/profile'],

	initialize: function () {
	},

	events : {
		
	},

	onEditClick: function() {
		
	},

	onDeleteClick: function() {

	},

	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}
});
