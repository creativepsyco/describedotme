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
 	 	ifrm.style.width = options.width+"px"; 
 	 	ifrm.style.height = options.height+"px"; 

 	 	$(dom_element).append(ifrm);
 	 },

 	/**
 	 * [addAllWidgets description]
 	 * @param {[type]}   dom_element [description]
 	 * @param {Function} callback    [description]
 	 */
 	 addAllWidgets: function(dom_element, callback) {
 	 	var error_message = null;
 	 	/*	Remove all the add-ons from the container */
 	 	$(dom_element).empty();

 		// Gets the enabled widgets
 		// Do not add multiple times
 		// FIX: possible security hole.
 		var enabledWidgetsObject = this.getEnabledWidgets(WidgetAPI.getCurrentUser()); 
 		
 		var enabled_widgets = JSON.parse(enabledWidgetsObject);
 		console.log("[addAllWidgets] Enabled Widgets" + enabled_widgets);
 		
 		var this_ = this;
 		enabled_widgets.enabled_widgets.forEach(function (widget) {
 			var path_of_config = "/widget/" + widget + "/config.json";
 			var config_json_string = null;

 			$.getJSON(path_of_config, function(data){
 				config_json_string = data;
 				// Assumption : File is alright
 				// TODO: implement a check
 				console.log(config_json_string);
 				// Create the iframe and put stuff
 				//1. Load the start page
 				var src = config_json_string.location + "/index.html";
 				//2. Load with default options
 				var options = {
 					width: config_json_string.default_width,
 					height: config_json_string.default_height
 				};
 				this_.addWidget(dom_element, src, options);
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
 	 getEnabledWidgets: function (user_id) {
 		// make a GET request
 		// Get the enabled add-ons
 		// 
 		// TODO: Fix the call, call the server 
 		var sample = '{"enabled_widgets": ["hello", "hello"]}';
 		return sample;
 	}
 }