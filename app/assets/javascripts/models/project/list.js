DescribeMe.Collections.ProjectList = Backbone.Collection.extend({

    model: DescribeMe.Models.ProjectItem,

    url: '/users/1/items.json',

});