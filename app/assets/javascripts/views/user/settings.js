DescribeMe.Views.Settings = Backbone.View.extend({

	el: '#main-content',

	template: JST['user/settings'],

	initialize: function () {
	},

	events: {
            'dblclick #summary-text' : 'editSummary',
            'dblclick #name-text' : 'editName',
            'click #img_edit_name' : 'editName',
            'click #img_edit_summary' : 'editSummary',
            'click #save-profile' : 'saveProfile'
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

    },


	render: function() {
		$(this.el).empty();
		$(this.el).html($(this.options.sidebar.el));
        $(this.el).append(this.template(this.model.toJSON()));
		return this;
	}

});
