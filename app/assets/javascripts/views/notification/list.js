DescribeMe.Views.NotificationList = Backbone.View.extend({
	
	el: '.dropdown-menu',

	events : {
		'click li a' : 'resetNotification'
	},

	resetNotification: function() {
		DescribeMe.NotificationCount = this.count;
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
        this.count = 0;
        _.each(this.model.models, function(item) {
			if(item.get('type') != 'ITEM_CREATED')
			{	
				self.count++;
				self.add(item);
			}
        }, this);
        if(this.count === 0) {
			$('.badge').css('display','none');
        }
        else {
			$('.badge').css('display','list');
			$('.badge').text(this.count);
        }
        if(DescribeMe.NotificationCount <= this.count)
        {
			$('.badge').css('display','none');
        }
        else {
			
        }
        return this;
    }
});
