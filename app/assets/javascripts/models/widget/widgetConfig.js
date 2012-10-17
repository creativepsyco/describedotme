DescribeMe.Models.WidgetConfig = Backbone.Model.extend({

    initialize:function () {
    	this.set({iframeSource:"/widget/hello/index.html"});
    },

    defaults: function() {
    	iframeSource: "/widget/hello/index.html"
    },

    url: function(){
    }

});