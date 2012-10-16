DescribeMe.Views.ProjectItem = Backbone.View.extend({
	
	template: JST['project/item'],

	className: 'span4',

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
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}
});
