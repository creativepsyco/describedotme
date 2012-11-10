DescribeMe.Views.Settings = Backbone.View.extend({

	el: '#main-content',

	template: JST['user/settings'],

	initialize: function () {
		this.themeView = [];
        this.loadThemes();
	},

	events: {
        'dblclick #summary-text' : 'editSummary',
        'dblclick #name-text' : 'editName',
        'click #img_edit_name' : 'editName',
        'click #img_edit_summary' : 'editSummary',
        'click #save-profile' : 'saveProfile',
    },

    editSummary: function() {
		$('#summary-input').css('display','block');
        $('#summary-input').val($('#summary-text').text());
        $('#summary-text').css('display','none');
    },

    editName: function() {
		$('#name-input').css('display','block');
        $('#name-input').val($('#name-text').text());
        $('#name-text').css('display','none');
    },

    saveProfile: function() {
		console.log(this.model.toJSON());
		var name;
		var desc;
		if($('#name-input').val() == "")
		{
			name = $('#name-text').text();
		}
		else
		{
			name = $('#name-input').val();
		}
		if($('#summary-input').val() == "")
		{
			desc = $('#summary-text').text();
		}
		else
		{
			desc = $('#summary-input').val();
		}
		this.model.set({name:name});
		this.model.set({description:desc});
		var selectedTheme;
		for(i=0;i<this.themeView.length;i++) {
			if(this.themeView[i].isSelected)
				selectedTheme = this.themeView[i].model.get('name');
		}
		this.model.set({theme:selectedTheme});
		console.log(this.model.toJSON());
		var self = this;
		this.model.save(null,
		{
			success: function() {
				DescribeMe.router.navigate('#profile',{trigger:true});
			},
			error: function() {
				console.log('Unable to load profile!');
			}
		});
    },

    loadThemes: function() {
		var theme1 = new DescribeMe.Models.Theme({name:'BlueGrid',thumb:'assets/BlueGrid.png'});
		var theme2 = new DescribeMe.Models.Theme({name:'GreenGrid',thumb:'assets/GreenGrid.png'});
		var theme3 = new DescribeMe.Models.Theme({name:'BluePhoto',thumb:'assets/BluePhoto.png'});
		var theme4 = new DescribeMe.Models.Theme({name:'GreenPhoto',thumb:'assets/GreenPhoto.png'});
		var theme5 = new DescribeMe.Models.Theme({name:'BlueList',thumb:'assets/BlueList.png'});
		var theme6 = new DescribeMe.Models.Theme({name:'GreenList',thumb:'assets/GreenList.png'});
		
		var self = this;

		this.themeView.push(new DescribeMe.Views.ThemeItem({model:theme1, parent:self}).render());
		this.themeView.push(new DescribeMe.Views.ThemeItem({model:theme2, parent:self}).render());
		this.themeView.push(new DescribeMe.Views.ThemeItem({model:theme3, parent:self}).render());
		this.themeView.push(new DescribeMe.Views.ThemeItem({model:theme4, parent:self}).render());
		this.themeView.push(new DescribeMe.Views.ThemeItem({model:theme5, parent:self}).render());
		this.themeView.push(new DescribeMe.Views.ThemeItem({model:theme6, parent:self}).render());

    },

	render: function() {
		$(this.el).empty();
		$(this.el).html($(this.options.sidebar.el));
        $(this.el).append(this.template(this.model.toJSON()));
        var sel;
        for(i=0;i<this.themeView.length;i++) {
			$(this.el).find('.themesr').append(this.themeView[i].el);
			if(this.model.get('theme') == this.themeView[i].model.get('name'))
			{
				sel = this.themeView[i];
			}
		}
		sel.clickSelect();
		return this;
	}

});
