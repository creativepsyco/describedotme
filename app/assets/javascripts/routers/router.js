DescribeMe.Routers.Router = Backbone.Router.extend({
	routes: {
		'projects': 'showAllProjects',
		'projects/new': 'newProject',
		'' : 'homePage'
	},
  
	initialize: function() {
		//alert('init');
	},

	getDummy: function() {
		var p1 = new DescribeMe.Models.ProjectItem({title:'Project Title 1', thumbnail: 'http://www.ordnung-statt-chaos.de/wp-content/themes/thesis/rotator/sample-1.jpg'});
		var p2 = new DescribeMe.Models.ProjectItem({title:'Project Title 2', thumbnail: 'http://www.ordnung-statt-chaos.de/wp-content/themes/thesis/rotator/sample-2.jpg'});
		var p3 = new DescribeMe.Models.ProjectItem({title:'Project Title 3', thumbnail: 'http://www.ordnung-statt-chaos.de/wp-content/themes/thesis/rotator/sample-2.jpg'});
		var projects = new DescribeMe.Collections.ProjectList([p1,p2, p3]);
		return projects;
	},

	showAllProjects: function() {
		var projects = this.getDummy();
		var projectList = new DescribeMe.Views.ProjectList({model:projects}).render();
	},

	newProject: function() {
		var newProject = new DescribeMe.Views.ProjectNew().render();
	},

	homePage: function() {
		// code to display home page view.
	} 
});
