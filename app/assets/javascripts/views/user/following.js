DescribeMe.Views.FollowingView = Backbone.View.extend({
	
	el: '#main-content',

	template: JST['user/following'],

	initialize: function () {
		this.model.set('photo_url', "http://500px.com/graphics/userpic.png");
    	this.model.set('name', "Test1");
    	this.model.set('id', "1");
	},

	add: function(item) {
        var self = this;
        var projectItem = new DescribeMe.Views.FollowingEntry({ model: item});
  
       $(this.el).find('#following-container').append($(projectItem.render().el));
    },

	render: function() {
		$(this.el).empty();
		$(this.el).html($(this.options.sidebar.el));
		$(this.el).append(this.template());

		/*
		_.each(this.model.models, function(item) {
            self.add(item);
        }, this);*/
		this.add(this.model);
		this.add(this.model);

		return this;
	},
});
