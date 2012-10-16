DescribeMe.Views.ProfileShow = Backbone.View.extend({
	
	el: '#main-content',

	template: JST['user/profile'],

	initialize: function () {
		//this.projects = new DescribeMe.Collections.ProjectList(this.model.get('projects'));
		this.projectList = new DescribeMe.Views.ProjectList({model: this.model.get('projects')}).render();
	},

	events : {
		
	},

	onEditClick: function() {
		
	},

	onDeleteClick: function() {

	},

	render: function() {
		$(this.el).empty();
		$(this.el).html(this.template(this.model.toJSON()));

		WidgetLoader.addAllWidgets('#addon-container', null);

		$(this.el).find('#project-container').append($(this.projectList.el));
		return this;
	}
});
