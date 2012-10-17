DescribeMe.Models.WidgetItem = Backbone.Model.extend({

    initialize:function () {
    	this.set({thumbnail:"assets/rails.png"});
    },

    url: function(){
    	return "/widgets";
    }

});