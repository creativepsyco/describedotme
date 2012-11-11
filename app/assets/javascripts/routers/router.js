DescribeMe.Routers.Router = Backbone.Router.extend({
	routes: {
		'marketplace': 'showMarketplace',
		'widget/upload' : 'addWidget',
		'following': 'showFollowingUsers',
		'profile': 'showProfile',
		'profile/:id': 'showUserProfile',
		'profile/preview/:id': 'previewTheme',
		'projects': 'showAllProjects',
		'project/:pid': 'showMyProjectDetail',
		'project/:uid/:pid': 'showProjectDetail',
		'projects/new': 'newProject',
		'dashboard' : 'homePage',
		'': 'showDashboard',
		'settings': 'showSettings',
		'community': 'communityProjects',
	},
  
	initialize: function() {
		//alert('init');
	},

	previewTheme: function(theme) {
		this.routeTriggered();
		var self = this;
		var profile = new DescribeMe.Models.Profile();
		// , username:'Mike Nicolas', profilePicture: 'http://500px.com/graphics/userpic.png', aboutMe: 'I work on mobile application project, and like to take photograph with my DSLR'}
		var projects = new DescribeMe.Collections.ProjectList();

		if(!this.profileShow){
			this.profileShow = new DescribeMe.Views.ProfileShow({theme:theme, myProfile:true});
		}
		else{
			this.profileShow.options.theme = theme;
			this.profileShow.options.myProfile = true;
		}
		this.profileShow.render();

		profile.fetch(
		{
			success: function() {
				if(self.profileShow) {
    				self.profileShow.profileModel = profile;
    			}

    			self.profileShow.renderProfile();
    			projects.fetch(
				{
		    		success: function () {
		    			if(self.profileShow) {
		    				self.profileShow.projectsModel = projects;
		    			}

		    			self.profileShow.renderProject();
		    		},
		    		error: function() {
		    			console.log('Unable to load projects!');
		    		}
			    });
			},
			error: function() {
				console.log('Unable to load profile!');
			}
		});
		
	},

	getDummy: function() {
		var p1 = new DescribeMe.Models.ProjectItem({title:'Project Title 1', thumbnail: 'http://www.ordnung-statt-chaos.de/wp-content/themes/thesis/rotator/sample-1.jpg'});
		var p2 = new DescribeMe.Models.ProjectItem({title:'Project Title 2', thumbnail: 'http://www.ordnung-statt-chaos.de/wp-content/themes/thesis/rotator/sample-2.jpg'});
		var p3 = new DescribeMe.Models.ProjectItem({title:'Project Title 3', thumbnail: 'http://www.ordnung-statt-chaos.de/wp-content/themes/thesis/rotator/sample-2.jpg'});
		window.projects = new DescribeMe.Collections.ProjectList();
		projects.fetch();
		return projects;
	},

	routeTriggered: function() {
		$('.navbar-inverse .navbar-inner').css('background-image','-webkit-linear-gradient(top, #04498C, #033C73)');
	},

	showProfile: function() {
		this.routeTriggered();
		var self = this;
		var profile = new DescribeMe.Models.Profile();
		var projects = new DescribeMe.Collections.ProjectList();

		if(!this.profileShow){
			this.profileShow = new DescribeMe.Views.ProfileShow({myProfile: true});
		}
		else{
			this.profileShow.options.myProfile = true;
		}
		this.profileShow.render();

		profile.fetch(
		{
			success: function() {
				if(self.profileShow) {
    				self.profileShow.profileModel = profile;
    			}

				self.profileShow.renderProfile();

		    	projects.fetch(
				{
		    		success: function () {
		    			if(self.profileShow) {
		    				self.profileShow.projectsModel = projects;
		    			}
		    			self.profileShow.renderProject();
		    		},
		    		error: function() {
		    			console.log('Unable to load projects!');
		    		}
			    });
			},
			error: function() {
				console.log('Unable to load profile!');
			}
		});		
	},

	showAllProjects: function() {
		this.routeTriggered();
		var self = this;
		//initialize sidebar if it is required for this page.
		this.sidebar = (this.sidebar) ? this.sidebar : new DescribeMe.Views.Sidebar();

		var projects = new DescribeMe.Collections.ProjectList();
		var profile = new DescribeMe.Models.Profile();

		profile.fetch(
		{
			success: function() {
				projects.fetch(
				{
		    		success: function () {
		    			if(self.projectList) {
		    				self.projectList.model = projects;
		    			}
		    			else {
		    				self.projectList = new DescribeMe.Views.Organizer({model:projects, sidebar: self.sidebar, editable:true});
		    			}
		    			self.projectList.profile = profile;
		    			self.projectList.render();
		    		},
		    		error: function() {
		    			console.log('Unable to load projects!');
		    		}
			    });	
			},
			error: function() {
				console.log('Unable to load profile!');
			}
		});
	},

	communityProjects: function(){
		this.routeTriggered();
		var self = this;
		this.sidebar = (this.sidebar) ? this.sidebar : new DescribeMe.Views.Sidebar();

		var projects = new DescribeMe.Collections.ProjectList();
		projects.url = '/featured_items.json';
		projects.fetch(
		{
    		success: function () {
    			if(self.communityProjectList) {
    				self.communityProjectList.model = projects;
    			}
    			else {
    				self.communityProjectList = new DescribeMe.Views.CommunityProjectList({model:projects, sidebar:self.sidebar});
    			}
    			self.communityProjectList.render();
    		},
    		error: function() {
    			console.log('Unable to load projects!');
    		}
	    });
	},

	showUserProfile: function(id) {
		this.routeTriggered();
		var self = this;
		var profile = new DescribeMe.Models.UserProfile({id:id});
		var projects = new DescribeMe.Collections.UserProjectList();
		projects.userid = id;

		if(!this.profileShow){
			this.profileShow = new DescribeMe.Views.ProfileShow({myProfile: false});
		}
		else{
			this.profileShow.options.myProfile = false;
		}
		this.profileShow.render();

		// Check whether if this user has follow this user
		var following = new DescribeMe.Models.Following();

		profile.fetch(
		{
			success: function() {
				if(self.profileShow) {
    				self.profileShow.profileModel = profile;
    			}

    			self.profileShow.renderProfile();

				following.fetch({
					success:function(){
						var followings = new DescribeMe.Collections.FollowingList(following.get('followings'));

						self.profileShow.isFollowed(false);

						_.each(followings.models, function(item) {
				            if(id == item.get('id')){
				            	self.profileShow.isFollowed(true);
				            }
				        }, this);
					}
				});

    			projects.fetch(
				{
		    		success: function () {
		    			if(self.profileShow) {
		    				self.profileShow.projectsModel = projects;
		    			}
		    			self.profileShow.renderProject();
		    		},
		    		error: function() {
		    			console.log('Unable to load projects!');
		    		}
			    });
			},
			error: function() {
				console.log('Unable to load profile!');
			}
		});		
	},

	showSettings: function() {
		this.routeTriggered();
		var self = this;
		var profile = new DescribeMe.Models.Profile();

		this.sidebar = (this.sidebar) ? this.sidebar : new DescribeMe.Views.Sidebar();
		profile.fetch(
		{
			success: function() {
				if(self.Settings) {
    				self.Settings.profileModel = profile;
    			}
    			else {
					self.Settings = new DescribeMe.Views.Settings({model:profile, sidebar:self.sidebar});
    			}
    			self.Settings.render();
			},
			error: function() {
				console.log('Unable to load profile!');
			}
		});
	},

	showMyProjectDetail: function(pid){
		var self = this;
		var profile = new DescribeMe.Models.Profile();
		var project = new DescribeMe.Models.ProjectItem({id:pid});

		this.projectDetail = new DescribeMe.Views.ProjectDetail({myProfile:true});

		project.fetch(
		{
			success: function() {
				if(self.projectDetail) {
    				self.projectDetail.model = project;
    			}
    			self.projectDetail.render();

    			profile.fetch(
				{
					success: function() {
						if(self.projectDetail) {
		    				self.projectDetail.profileModel = profile;
		    			}
		    			self.projectDetail.renderProfile();
					},
					error: function() {
						console.log('Unable to load profile!');
					}
				});
			},
			error: function() {
				console.log('Unable to load project!');
			}
		});
	},

	showFollowingUsers: function(){
		var self = this;
		this.sidebar = (this.sidebar) ? this.sidebar : new DescribeMe.Views.Sidebar();
		var followingModel = new DescribeMe.Models.Following();

		if(!this.followingView){
			this.followingView = new DescribeMe.Views.FollowingView({sidebar:self.sidebar});
		}

		followingModel.fetch(
		{
			success: function() {
				if(self.followingView) {
    				self.followingView.model = followingModel;
    			}
    			self.followingView.render();
			},
			error: function() {
				console.log('Unable to load project!');
			}
		});
	},

	showProjectDetail: function(uid, pid) {
		var self = this;
		var myProfile = new DescribeMe.Models.Profile();
		var profile = new DescribeMe.Models.UserProfile({id:uid});
		var project = new DescribeMe.Models.UserProjectItem();
		project.uid = uid;
		project.pid  = pid;

		// Check whether if this user has follow this user
		var following = new DescribeMe.Models.Following();

		myProfile.fetch(
		{
			success: function() {
				var myId = myProfile.get('id');

				if(!self.projectDetail)
					if(myId == uid){
						self.projectDetail = new DescribeMe.Views.ProjectDetail({myProfile:true});
					}
					else{
						self.projectDetail = new DescribeMe.Views.ProjectDetail({myProfile:false});
					}
				else
					if(myId == uid){
						self.projectDetail.options.myProfile = true;
					}
					else{
						self.projectDetail.options.myProfile = false;
					}

				self.projectDetail.uid = uid;

				project.fetch(
				{
					success: function() {
						if(self.projectDetail) {
		    				self.projectDetail.model = project;
		    			}
		    			self.projectDetail.render();

		    			following.fetch({
							success:function(){
								var followings = new DescribeMe.Collections.FollowingList(following.get('followings'));

								self.projectDetail.isFollowed(false);
								
								_.each(followings.models, function(item) {
						            if(uid == item.get('id')){
						            	self.projectDetail.isFollowed(true);
						            }
						        }, this);
							}
						});

		    			profile.fetch(
						{
							success: function() {
								if(self.projectDetail) {
				    				self.projectDetail.profileModel = profile;
				    			}
				    			self.projectDetail.renderProfile();
							},
							error: function() {
								console.log('Unable to load profile!');
							}
						});
					},
					error: function() {
						console.log('Unable to load project!');
					}
				});
			},
			error: function() {
				console.log('Unable to load profile!');
			}
		});
	},


	newProject: function() {
		this.routeTriggered();
		var self = this;
		//initialize sidebar if it is required for this page.
		this.sidebar = (this.sidebar) ? this.sidebar : new DescribeMe.Views.Sidebar();

		this.projectNewView = (this.projectNewView) ? this.projectNewView : new DescribeMe.Views.ProjectNew({sidebar:self.sidebar});
		this.projectNewView.render();
	},

	homePage: function() {
		// code to display home page view.
		//var homeView = new DescribeMe.Views.Home().render();
	},

	/**
	 * [showMarketplace Basically Show All Widgets]
	 * @return {[type]} [description]
	 */
	showMarketplace: function() {
		this.routeTriggered();
		var self = this;
		this.sidebar = (this.sidebar) ? this.sidebar : new DescribeMe.Views.Sidebar();
		var widgets = new DescribeMe.Collections.WidgetList();
		widgets.fetch({
			success: function () {
    			if(self.marketplace) {
    				self.marketplace.model = widgets;
    			}
    			else {
    				self.marketplace = new DescribeMe.Views.WidgetList({model:widgets, sidebar: self.sidebar});
    			}
    			self.marketplace.render();
    		},
    		error: function() {
    			console.log('Unable to load marketplace!');
    		}
    	});
	},

	addWidget: function() {
		this.routeTriggered();
		this.sidebar = (this.sidebar) ? this.sidebar : new DescribeMe.Views.Sidebar();
		var aWidget = new DescribeMe.Models.WidgetItem();
		var uploadWidget = new DescribeMe.Views.WidgetUpload({model: aWidget, sidebar:this.sidebar}).render();
	},

	showDashboard: function(){
		this.routeTriggered();
		var self = this;
		this.sidebar = (this.sidebar) ? this.sidebar : new DescribeMe.Views.Sidebar();
		
		var dashboardShow = new DescribeMe.Views.DashboardShow({sidebar:self.sidebar}).render();
	}
});
