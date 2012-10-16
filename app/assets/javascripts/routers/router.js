DescribeMe.Routers.Router = Backbone.Router.extend({
	routes: {
		'profile': 'showProfile',
		'projects': 'showAllProjects',
		'projects/new': 'newProject',
		'' : 'homePage',
		'dashboard': 'showDashboard'
	},
  
	initialize: function() {
		//alert('init');
	},

	getDummy: function() {
		var p1 = new DescribeMe.Models.ProjectItem({title:'Project Title 1', thumbnail: 'http://www.ordnung-statt-chaos.de/wp-content/themes/thesis/rotator/sample-1.jpg'});
		var p2 = new DescribeMe.Models.ProjectItem({title:'Project Title 2', thumbnail: 'http://www.ordnung-statt-chaos.de/wp-content/themes/thesis/rotator/sample-2.jpg'});
		var p3 = new DescribeMe.Models.ProjectItem({title:'Project Title 3', thumbnail: 'http://www.ordnung-statt-chaos.de/wp-content/themes/thesis/rotator/sample-2.jpg'});
		window.projects = new DescribeMe.Collections.ProjectList();
		projects.fetch();
		return projects;
	},

	showProfile: function() {
		var p1 = new DescribeMe.Models.Profile({username:'Mike Nicolas', profilePicture: 'http://a.dryicons.com/images/icon_sets/shine_icon_set/png/256x256/user.png', aboutMe: 'I work on mobile application project, and like to take photograph with my DSLR'});
		var profileShow = new DescribeMe.Views.ProfileShow({model:p1}).render();
	},

	showAllProjects: function() {
		var projects = this.getDummy();
		var projectList = new DescribeMe.Views.ProjectList({model:projects}).render();
	},

	newProject: function() {
		this.projectNewView = (this.projectNewView) ? this.projectNewView : new DescribeMe.Views.ProjectNew();
		this.projectNewView.render();
	},

	homePage: function() {
		//var homeView = new DescribeMe.Views.Home().render();
	},

	showDashboard: function(){
		var profileShow = new DescribeMe.Views.DashboardShow().render();
	}
});
