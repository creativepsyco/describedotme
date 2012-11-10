DescribeMe.Views.ThemeItem = Backbone.View.extend({
	
	template: JST['project/themeItem'],

	initialize: function() {
		this.allView = this.options.parent.themeView;
	},
	events: {
		'click .select' : 'clickSelect'
	},

	clickSelect: function() {
		
		for(i=0;i<this.allView.length;i++)
		{
			this.allView[i].unselect();
		}
		this.item.css('overflow','hidden');
		this.item.css('border','2px solid #080');
		this.isSelected = true;
		
	},

	unselect: function() {
		this.item.css('overflow','hidden');
		this.item.css('border','0px solid #080');
		this.isSelected = false;
	},

	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		this.item = $(this.el).find('.theme-item');
		return this;
	}
});
