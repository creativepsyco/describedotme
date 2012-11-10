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
		this.item.text('Selected');
		this.item.addClass('btn-success');
		this.isSelected = true;
		
	},

	unselect: function() {
		this.item.text('Select');
		this.item.removeClass('btn-success');
		this.isSelected = false;
	},

	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		this.item = $(this.el).find('.select');
		return this;
	}
});
