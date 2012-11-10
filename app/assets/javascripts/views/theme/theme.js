DescribeMe.Views.Theme = Backbone.View.extend({

	initialize: function () {
		$('.navbar-inverse .navbar-inner').css('background-image','-webkit-linear-gradient(top, #064400, #064411)');
		_.bindAll(this, 'applyColors', 'projectsLook');
	},

	applyColors: function() {
		$('.profile-top').css('background','#064400');
		$('.profile-top').css('border-radius','#4px 4px 0 0');
		$('h1, h2, h3, h4, h5').css('color', '#064400');
		$('h1, h2, h3, h4, h5').css('font-family','\'Offside\', cursive');
	},

	projectsLook: function() {
		$('.span4').addClass('span11');
		$('.span11').removeClass('span4');
		$('.thmb').css('height','400px');
		$('.panel_foot').css('height','11px');
		$('.panel_foot').css('background','url("http://static.tumblr.com/lhq9par/amal8m74b/sprites_v1.5.png") 0 -141px no-repeat');
		$('.panel_foot').css('background-size','100%');
		$('.project-item').css('-webkit-box-shadow', '0px 0px 0px 0px #999');
		$('.project-item').css('box-shadow', '0px 0px 0px 0px #999');
		$('.panel_foot').css('margin', '0px -4px');
	},

	projectsLook2: function() {
		$('.span4').addClass('span11');
		$('.span11').removeClass('span4');
		$('.thmb').css('height','152px');
		$('.thmb').css('margin-top','20px');
		$('.desc').css('display','block');
		$('.desc').css('width','50%');
		$('.desc').css('float','right');
		$('.title').css('width','50%');
		$('.title').css('float','right');
		$('.controls').css('width','50%');
		$('.controls').css('float','right');
		$('.controls').css('margin-top','-45px');
	},

	render: function() {
		this.applyColors();
		this.projectsLook();
		return this;
	}

});
