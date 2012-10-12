DescribeMe.Collections.ProjectList = Backbone.Collection.extend({

    model: DescribeMe.Models.ProjectItem,

    url: '/assets/items.json',

});