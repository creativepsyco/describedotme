DescribeMe.Models.Follow = Backbone.Model.extend({
    initialize:function () {
    },

    url: function(){
    	return '/users/' + this.uid + "/follows";
    },
});
