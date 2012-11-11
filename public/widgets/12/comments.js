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
var commentJSON = null;

function loadComments() {
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
      alert("Cannot retrieve data");
    }
  });

  WidgetAPI_log(json.comments.length);
    commentJSON = json;

    $("#comment-widget-desc").html(commentJSON.desc);

    function writeComment(element, index, array) {
      var theComment = element.comment;
      var theUser = element.name;

      var html = '<div class="comment"> <div class="user">' + theUser + '</div> <div class="comment_text"><p>' + theComment + '</p></div></div>';
      $("#comment-widget-container").append(html);
    }
    commentJSON.comments.forEach(writeComment);
}

$(document).ready(function($) {
  // Stuff to do as soon as the DOM is ready. Use $() w/o colliding with other libs;
  WidgetAPI_log("hello from the widget id = " + WidgetAPI_getWidgetId(document.location.pathname) + "\n For User id  " + WidgetAPI_getProfileUser());

});

function onCommentSave() {
  var comment = $("#comment_desc").val();
  var author = $("#author").val();

  var jsonStuff = {
    "comment": comment,
    "name": author
  };
  commentJSON.comments.push(jsonStuff);

  var URL = '/widgets/' + WidgetAPI_getWidgetId(document.location.pathname) + '/users/' + WidgetAPI_getProfileUser();
  console.log(URL);

  $.post(URL, {
    "config_json": JSON.stringify(commentJSON)
  }, function(data, textStatus, xhr) {
    alert("Comment Successfully Made");
  });
}

function onClickSave() {
  var desc = $("#description").val();

  var jsonStuff = {
    "desc": desc,
    "comments": []
  };

  var URL = '/widgets/' + WidgetAPI_getWidgetId(document.location.pathname) + '/users/' + WidgetAPI_getCurrentUser();
  console.log(URL);

  $.post(URL, {
    "config_json": JSON.stringify(jsonStuff)
  }, function(data, textStatus, xhr) {
    alert("Successfully added widget");
  });
}