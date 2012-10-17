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
		$(this.el).html(this.template());

		return this;
	},

	renderProfile: function() {
		this.userProfileView = new DescribeMe.Views.UserProfile({model: this.profileModel}).render();
		$(this.el).find('#profile-container').append($(this.userProfileView.el));
		// HACK 
		window.id = this.profileModel.get('id');
		
		WidgetLoader.addAllWidgets('#addon-container', this.profileModel.get('id') ,null);
	},

	renderProject: function() {
		this.projectList = new DescribeMe.Views.ProjectList({model: this.projectsModel}).render();
		$(this.el).find('#project-container').append($(this.projectList.el));
	},
});
