DescribeMe.Views.ProjectNew = Backbone.View.extend({
	
	el: '#main-content',

	template: JST['project/new'],

	initialize: function () {
	},

	events : {
		'click .edit' : 'onEditClick',
		'click .delete' : 'onDeleteClick'
	},

	onEditClick: function() {
		
	},

	onDeleteClick: function() {

	},

	render: function() {
		$(this.el).html(this.template());
		return this;
	}
});
