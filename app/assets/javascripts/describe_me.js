window.DescribeMe = {
  Models: {},
  Collections: {},
  Views: {},
  Factories: {},
  Routers: {},
  init: function() {
    	DescribeMe.router = new DescribeMe.Routers.Router();
    	Backbone.history.start();
  }
};

$(document).ready(function(){
  DescribeMe.init();
});