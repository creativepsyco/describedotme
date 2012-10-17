DescribeMe.Views.ProfileShow = Backbone.View.extend({
	
	el: '#main-content',

	template: JST['user/profile'],

	initialize: function () {
		//this.projects = new DescribeMe.Collections.ProjectList(this.model.get('projects'));
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

		WidgetLoader.addAllWidgets('#addon-container', this.model.get('id') ,null);

		$(this.el).find('#project-container').append($(this.projectList.el));

		return this;
	},

	renderProfile: function() {
		this.userProfileView = new DescribeMe.Views.UserProfile({model: this.profileModel}).render();
		$(this.el).find('#profile-container').append($(this.userProfileView.el));
	},

	renderProject: function() {
		this.projectList = new DescribeMe.Views.ProjectList({model: this.projectsModel}).render();
		$(this.el).find('#project-container').append($(this.projectList.el));
	},
});
