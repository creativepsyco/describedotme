DescribeMe.Views.Theme = Backbone.View.extend({

	initialize: function () {
		_.bindAll(this, 'applyPhoto', 'applyList', 'applyGreen');
	},

	applyBlueGrid: function() {

	},
	applyBlueList: function() {
		this.applyList();
	},
	applyBluePhoto: function() {
		this.applyPhoto();
	},
	applyGreenGrid: function() {
		this.applyGreen();
	},
	applyGreenList: function() {
		this.applyGreen();
		this.applyList();
	},
	applyGreenPhoto: function() {
		this.applyGreen();
		this.applyPhoto();
	},
	applyGreen: function() {
		$('.navbar-inverse .navbar-inner').css('background-image','-webkit-linear-gradient(top, #064400, #064411)');
		$('.profile-top').css('background','#064400');
		$('.profile-top').css('border-radius','#4px 4px 0 0');
		$('h1, h2, h3, h4, h5').css('color', '#064400');
		$('h1 a, h2 a, h3 a, h4 a, h5 a').css('color', '#064400');
		$('h1, h2, h3, h4, h5').css('font-family','\'Offside\', cursive');
	},
	applyPhoto: function() {
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
	applyList: function() {
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
		if(this.options.theme == "BlueGrid")
			this.applyBlueGrid();
		if(this.options.theme == "GreenGrid")
			this.applyGreenGrid();
		if(this.options.theme == "BluePhoto")
			this.applyBluePhoto();
		if(this.options.theme == "GreenPhoto")
			this.applyGreenPhoto();
		if(this.options.theme == "BlueList")
			this.applyBlueList();
		if(this.options.theme == "GreenList")
			this.applyGreenList();

		return this;
	}

});
