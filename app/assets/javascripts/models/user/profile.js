DescribeMe.Models.Profile = Backbone.Model.extend({
    initialize:function () {
    },

    url : '/users/profile',
});

DescribeMe.Models.UserProfile = Backbone.Model.extend({
    initialize:function () {
    },

    urlRoot : '/users',
});