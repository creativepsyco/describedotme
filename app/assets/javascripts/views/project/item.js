DescribeMe.Views.ProjectItem = Backbone.View.extend({
	
	template: JST['project/item'],

	className: 'span4',

	initialize: function () {
	},

	events : {
		'click .edit' : 'onEditClick',
		'click .delete' : 'onDeleteClick',
	},

	onEditClick: function() {
		alert("Editting");
	},

	onDeleteClick: function() {
		alert("Attempt to delete");

		this.model.destroy(
		{
			success: function(model, response) {
				alert("Deleted");
			}
  		});
	},

	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}
});
