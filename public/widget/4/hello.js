/**
 * [getParentFunction description]
 * @param  {[type]} funcName [description]
 * @return {[type]}          [description]
 */
function getParentFunction(funcName) {
  var func = null;
  // Child opened in new window e.g. target="blank"
  if (top.window.opener && !top.window.opener.closed) {
    try { func = eval("top.window.opener."+funcName); } catch (error) {}
  }
  if (!(func)) {
    // Child opened in IFRAME
    try { func = eval("top."+funcName); } catch (error) { }
  }
  if (!(func)) {
    throw new Error("function \""+funcName+"\" is not in parent window.");
  }
  return func; 
}
// TODO: Remove the above function once it goes into production
//////////////////////////////
//

var WidgetAPI_log = getParentFunction("WidgetAPI.log");

$(document).ready(function($) {
	// Stuff to do as soon as the DOM is ready. Use $() w/o colliding with other libs;
	WidgetAPI_log("hello from the widget");
});
