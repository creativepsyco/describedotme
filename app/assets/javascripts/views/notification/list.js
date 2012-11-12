DescribeMe.Views.NotificationList = Backbone.View.extend({
	
	el: '.dropdown-menu',

	events : {
		'click li a' : 'resetNotification'
	},

	resetNotification: function() {
		DescribeMe.NotificationCount = this.model.length;
	},

	initialize: function () {
        this.model.bind("reset", this.render, this);
        this.model.bind("add", this.add);
	},

	add: function(item) {
        var self = this;
        var projectItem = new DescribeMe.Views.NotificationItem({ model: item});
        projectItem.editable = this.options.editable;
        projectItem.uid = this.uid;
        $(self.el).append(projectItem.render().el);
    },

    render: function() {
        var self = this;
        $(this.el).empty();
        if(this.model.length === 0) {
			$('.badge').css('display','none');
        }
        else {
			$('.badge').css('display','list');
			$('.badge').text(this.model.length);
        }
        if(DescribeMe.NotificationCount <= this.model.length)
        {
			$('.badge').css('display','none');
        }
        else {
			
        }
        _.each(this.model.models, function(item) {
            self.add(item);
        }, this);

        return this;
    }
});
