DescribeMe.Views.Settings = Backbone.View.extend({

	el: '#main-content',

	template: JST['user/settings'],

	initialize: function () {
		this.themeView = [];
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
		this.model.set({name:$('#name-input').val()});
		this.model.set({description:$('#summary-input').val()});
		var selectedTheme;
		for(i=0;i<this.themeView.length;i++) {
			if(this.themeView.isSelected)
				selectedTheme = this.themeView.model.get('name');
		}
		this.model.set({theme:'GreenGrid'});
		console.log(this.model.toJSON());
		//this.model.save();
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

		for(i=0;i<this.themeView.length;i++) {
			$(this.el).find('.themesr').append(this.themeView[i].el);
		}

    },

	render: function() {
		$(this.el).empty();
		$(this.el).html($(this.options.sidebar.el));
        $(this.el).append(this.template(this.model.toJSON()));
        this.loadThemes();
		return this;
	}

});
