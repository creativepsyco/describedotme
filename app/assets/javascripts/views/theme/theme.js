DescribeMe.Factories.ThemeFactory = Backbone.View.extend({
	initialize: function() {

	},

	getTheme: function(themeName) {
		if(themeName == 'BlueGrid')
			return new DescribeMe.Views.BlueGrid();
		if(themeName == 'BluePhoto')
			return new DescribeMe.Views.BluePhoto();
		if(themeName == 'BlueList')
			return new DescribeMe.Views.BlueList();
		if(themeName == 'GreenPhoto')
			return new DescribeMe.Views.GreenPhoto();
		if(themeName == 'GreenGrid')
			return new DescribeMe.Views.GreenGrid();
		if(themeName == 'GreenList')
			return new DescribeMe.Views.GreenList();
	}
});

DescribeMe.ThemeFactory = new DescribeMe.Factories.ThemeFactory();

DescribeMe.Views.Theme = Backbone.View.extend({
});

DescribeMe.Views.BlueGrid = DescribeMe.Views.Theme.extend({
	applyBlue: function() {
		$('.navbar-inverse .navbar-inner').css('background-image','-webkit-linear-gradient(top, #04498C, #033C73)');
		$('.profile-top').css('background','#034482');
		$('.profile-top').css('border-radius','#4px 4px 0 0');
		$('h1, h2, h3, h4, h5').css('color', '#034482');
		$('h1 a, h2 a, h3 a, h4 a, h5 a').css('color', '#034482');
	},
	render: function() {
		this.applyBlue();
	}
});

DescribeMe.Views.GreenGrid = DescribeMe.Views.Theme.extend({
	applyGreen: function() {
		$('.navbar-inverse .navbar-inner').css('background-image','-webkit-linear-gradient(top, #064400, #064411)');
		$('.profile-top').css('background','#064400');
		$('.profile-top').css('border-radius','#4px 4px 0 0');
		$('h1, h2, h3, h4, h5').css('color', '#064400');
		$('h1 a, h2 a, h3 a, h4 a, h5 a').css('color', '#064400');
		$('h1, h2, h3, h4, h5').css('font-family','\'Offside\', cursive');
	},
	render: function() {
		this.applyGreen();
	}
});

DescribeMe.Views.BluePhoto = DescribeMe.Views.Theme.extend({
	applyBlue: function() {
		$('.navbar-inverse .navbar-inner').css('background-image','-webkit-linear-gradient(top, #04498C, #033C73)');
		$('.profile-top').css('background','#034482');
		$('.profile-top').css('border-radius','#4px 4px 0 0');
		$('h1, h2, h3, h4, h5').css('color', '#034482');
		$('h1 a, h2 a, h3 a, h4 a, h5 a').css('color', '#034482');
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
	render: function() {
		this.applyBlue();
		this.applyPhoto();
	}
});

DescribeMe.Views.GreenPhoto = DescribeMe.Views.Theme.extend({
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
	render: function() {
		this.applyGreen();
		this.applyPhoto();
	}
});

DescribeMe.Views.BlueList = DescribeMe.Views.Theme.extend({
	applyBlue: function() {
		$('.navbar-inverse .navbar-inner').css('background-image','-webkit-linear-gradient(top, #04498C, #033C73)');
		$('.profile-top').css('background','#034482');
		$('.profile-top').css('border-radius','#4px 4px 0 0');
		$('h1, h2, h3, h4, h5').css('color', '#034482');
		$('h1 a, h2 a, h3 a, h4 a, h5 a').css('color', '#034482');
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
	render: function() {
		this.applyBlue();
		this.applyList();
	}
});

DescribeMe.Views.GreenList = DescribeMe.Views.Theme.extend({
	applyGreen: function() {
		$('.navbar-inverse .navbar-inner').css('background-image','-webkit-linear-gradient(top, #064400, #064411)');
		$('.profile-top').css('background','#064400');
		$('.profile-top').css('border-radius','#4px 4px 0 0');
		$('h1, h2, h3, h4, h5').css('color', '#064400');
		$('h1 a, h2 a, h3 a, h4 a, h5 a').css('color', '#064400');
		$('h1, h2, h3, h4, h5').css('font-family','\'Offside\', cursive');
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
	render: function() {
		this.applyGreen();
		this.applyList();
	}
});
