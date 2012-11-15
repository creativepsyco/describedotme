/**
 * [getParentFunction description]
 * @param  {[type]} funcName [description]
 * @return {[type]}          [description]
 */

function getParentFunction(funcName) {
  var func = null;
  // Child opened in new window e.g. target="blank"
  if(top.window.opener && !top.window.opener.closed) {
    try {
      func = eval("top.window.opener." + funcName);
    } catch(error) {}
  }
  if(!(func)) {
    // Child opened in IFRAME
    try {
      func = eval("top." + funcName);
    } catch(error) {}
  }
  if(!(func)) {
    throw new Error("function \"" + funcName + "\" is not in parent window.");
  }
  return func;
} /* Exported functions from the widget API */
var WidgetAPI_log = getParentFunction("WidgetAPI.log");
var WidgetAPI_getCurrentUser = getParentFunction("WidgetAPI.getCurrentUser");
var WidgetAPI_getProfileUser = getParentFunction("WidgetAPI.getProfileUser");
var WidgetAPI_getWidgetId = getParentFunction("WidgetAPI.getWidgetId");

// TODO: Remove the above function once it goes into production
//////////////////////////////
//
//
function loadTweets() {
  var URL = '/widgets/' + WidgetAPI_getWidgetId(document.location.pathname) + '/users/' + WidgetAPI_getProfileUser();
  var json = null;
  jQuery.ajax({
    url: URL,
    type: 'GET',
    async: false,
    success: function(data, textStatus, xhr) {
      //called when successful
      WidgetAPI_log(json);
      json = data;
    },
    error: function(xhr, textStatus, errorThrown) {
      //called when there is an error
    }
  });

  var handle =  json.handle;

 // var twitter_dom = '<a class="twitter-timeline" href="https://twitter.com/' + handle + '" data-widget-id="258833292500008961">Tweets by @' + handle + '</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>';
  //$("#twitter-widget-container").html(twitter_dom);
  $('#twitter-widget-container').miniTwitter({username: json.handle, limit: json.max_tweets});
}

$(document).ready(function($) {
  // Stuff to do as soon as the DOM is ready. Use $() w/o colliding with other libs;
  WidgetAPI_log("hello from the widget id = " + WidgetAPI_getWidgetId(document.location.pathname) + "\n For User id  " + WidgetAPI_getProfileUser());

});

function onClickSave() {
  var tweets = $("#max_tweets").val();
  var handle = $("#twitter_handle").val();

  WidgetAPI_log(tweets + " " + handle);

  var jsonStuff = {
    "max_tweets": tweets,
    "handle": handle
  };

  var URL =  '/widgets/' + WidgetAPI_getWidgetId(document.location.pathname) + '/users/' + WidgetAPI_getCurrentUser();
  console.log(URL);

  $.post(URL, {
    "config_json": JSON.stringify(jsonStuff)
  }, function(data, textStatus, xhr) {
    alert("Successfully added widget");
  });
}