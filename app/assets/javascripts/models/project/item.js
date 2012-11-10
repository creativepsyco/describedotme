DescribeMe.Models.ProjectItem = Backbone.Model.extend({

    initialize:function () {
    	//this.set({thumbnail:"http://www.ordnung-statt-chaos.de/wp-content/themes/thesis/rotator/sample-2.jpg"});
    },

    urlRoot: '/items'

});

DescribeMe.Models.UserProjectItem = Backbone.Model.extend({

    initialize:function () {
    	//this.set({thumbnail:"http://www.ordnung-statt-chaos.de/wp-content/themes/thesis/rotator/sample-2.jpg"});
    },

    url: function() {
    	return 'users/' + this.uid + '/items/' + this.pid;
    },

	getAttachmentList: function () {
		if(!this.attachmentList)
			this.attachmentList = new DescribeMe.Collections.AttachmentList(this.get('photos'));
			
		return this.attachmentList;
    },
});


