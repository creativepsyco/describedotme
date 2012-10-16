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
		var self = this;
		var p1 = new DescribeMe.Models.Profile({username:'Mike Nicolas', profilePicture: 'http://500px.com/graphics/userpic.png', aboutMe: 'I work on mobile application project, and like to take photograph with my DSLR'});
		var projects = new DescribeMe.Collections.ProjectList();
		projects.fetch(
		{
    		success: function () {
    			p1.set({projects: projects});
    			if(self.profileShow) {
    				self.profileShow.model = p1;
    			}
    			else {
					self.profileShow = new DescribeMe.Views.ProfileShow({model:p1});
    			}
    			self.profileShow.render();
    		},
    		error: function() {
    			console.log('Unable to load projects!');
    		}
	    });
		
	},

	showAllProjects: function() {
		var self = this;
		//initialize sidebar if it is required for this page.
		this.sidebar = (this.sidebar) ? this.sidebar : new DescribeMe.Views.Sidebar();

		var projects = new DescribeMe.Collections.ProjectList();
		projects.fetch(
		{
    		success: function () {
    			if(self.projectList) {
    				self.projectList.model = projects;
    				console.log(projects.toJSON());
    			}
    			else {
    				self.projectList = new DescribeMe.Views.Organizer({model:projects, sidebar: self.sidebar});
    			}
    			self.projectList.render();
    		},
    		error: function() {
    			console.log('Unable to load projects!');
    		}
	    });
	},

	newProject: function() {
		var self = this;
		//initialize sidebar if it is required for this page.
		this.sidebar = (this.sidebar) ? this.sidebar : new DescribeMe.Views.Sidebar();

		this.projectNewView = (this.projectNewView) ? this.projectNewView : new DescribeMe.Views.ProjectNew({sidebar:self.sidebar});
		this.projectNewView.render();
	},

	homePage: function() {
		//var homeView = new DescribeMe.Views.Home().render();
	},

	showDashboard: function(){
		var self = this;
		this.sidebar = (this.sidebar) ? this.sidebar : new DescribeMe.Views.Sidebar();
		var profileShow = new DescribeMe.Views.DashboardShow({sidebar:self.sidebar}).render();
	}
});
