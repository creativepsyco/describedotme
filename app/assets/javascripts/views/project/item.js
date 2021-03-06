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
		this.model.destroy(
		{
			success: function(model, response) {
				DescribeMe.router.showAllProjects();
			}
  		});
	},

	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));

		if(!this.editable){
			$(this.el).find('#controls a').css("display", "none");
			$(this.el).find('#projectLink').attr("href", "#project/" + this.uid + "/" + this.model.get('id'));
		}
		return this;
	}
});
