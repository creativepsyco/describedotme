DescribeMe.Collections.ProjectList = Backbone.Collection.extend({

    model: DescribeMe.Models.ProjectItem,

    url: '/items',

});
DescribeMe.Collections.UserProjectList = Backbone.Collection.extend({

    model: DescribeMe.Models.ProjectItem,

    url: function() {
    	return 'users/' + this.userid + '/items';
    } 

});

