DescribeMe.Models.Kudos = Backbone.Model.extend({

    initialize:function () {
    	//this.set({thumbnail:"http://www.ordnung-statt-chaos.de/wp-content/themes/thesis/rotator/sample-2.jpg"});
    },

    url: function() {
    	return '/items/' + this.pid + '/kudos';
    } 

});