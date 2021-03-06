// GLOBAL VARS
var widgetForUseURL = "/widgets/users/";
var isDebug = true;
/**
 *
 * [WidgetLoader description]
 * @type {Object}
 * @author Mohit
 *
 */
var WidgetLoader = {
	initialize: function() {

	},

	/**
	 * [addWidget actual loading of the widgets]
	 * @param {[type]} dom_element [description]
	 */
	addWidget: function(dom_element, src, options) {
		ifrm = document.createElement("iframe");
		ifrm.setAttribute("src", src);
		ifrm.style.width = options.width + "px";
		ifrm.style.height = options.height + "px";

		$(dom_element).append(ifrm);
	},

	/**
	 * [addAllWidgets description]
	 * @param {[type]}   dom_element [description]
	 * @param {[type]}   user_id     [description]
	 * @param {Function} callback    [description]
	 */
	addAllWidgets: function(dom_element, user_id, callback) {
		if(!user_id) {
			user_id = WidgetAPI.getCurrentUser();
		}

		var error_message = null;

		/*	Remove all the add-ons from the container */
		$(dom_element).empty();

		// Gets the enabled widgets
		// Do not add multiple times
		var enabledWidgetsObject = this.getEnabledWidgets(user_id);
		var enabled_widgets = enabledWidgetsObject;
		//var enabled_widgets = JSON.parse(enabledWidgetsObject);
		console.log("[addAllWidgets] Enabled Widgets" + enabled_widgets);

		var this_ = this;
		enabled_widgets.forEach(function(widget) {
			// FIX: Remove Hard code
			var path_of_config = "/widgets/" + widget.id + "/config.json";
			var config_json_string = null;
			
			jQuery.ajax({
				url: path_of_config,
				type: 'GET',
				async: 'false',
				complete: function(xhr, textStatus) {
					//called when complete
				},
				success: function(data, textStatus, xhr) {
					//called when successful
					config_json_string = data;
					// Assumption : File is alright
					//1. Load the start page
					var src = "/widgets/" + widget.id + "/index.html";
					//2. Load with default options
					var options = {
						width: config_json_string.default_width,
						height: config_json_string.default_height
					};
					this_.addWidget(dom_element, src, options);
				},
				error: function(xhr, textStatus, errorThrown) {
					//called when there is an error
					console.log(textStatus, errorThrown);
				}
			});


			$.getJSON(path_of_config, function(data) {
				// config_json_string = data;
				// // Assumption : File is alright
				// // TODO: implement a check
				// console.log(config_json_string);
				// //1. Load the start page
				// var src = "/widget/" + widget.id + "/index.html";
				// //2. Load with default options
				// var options = {
				// 	width: config_json_string.default_width,
				// 	height: config_json_string.default_height
				// };
				// this_.addWidget(dom_element, src, options);
			});
		});

		// Handle errors if any
		if(!error_message) {
			error_message = "All Plugins loaded!!";
			console.log(error_message);
		} else {
			// Do something when there is error
			console.log("[WidgetLoader] Error occured during loading of widget");
		}
		// invoke callback
		if(callback) {
			callback(error_message);
		}
	},

	/**
	 * [getEnabledWidgets description]
	 * @param  {[type]} user_id [description]
	 * @return {[type]}         [description]
	 */
	getEnabledWidgets: function(user_id) {
		// make a GET request
		// Get the enabled add-ons
		// Synchronous AJAX
		var theData = null;
		$.ajax({
			url: widgetForUseURL + user_id + '.json',
			async: false,
			success: function(data) {
				console.log("[getEnabledWidgets] " + data);
				theData = data;
			}
		});
		if(isDebug) {
			console.log("[Total widgets]" + theData.length);
			console.log("[Widgets]", theData);
		}
		return theData;
	}
}