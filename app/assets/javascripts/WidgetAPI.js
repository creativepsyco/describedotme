/**
 * @author Mohit
 * 
 * [ WidgetAPI provides storage API for widgets to be able to write to the server
 *  About the storage - storage is in the form of a JSON file/string stored to the
 *  database by means of a Widget Controller.]
 *  
 * @type {window.prototype}
 */
window.WidgetAPI = {
	/**
	 * [currentUserId Current Logged in user]
	 * @type {Number}
	 */
	currentUserId:0,
	widgetid: 0,

	/**
	 * [fetchUserConfig User config for a paticular type of app]
	 * @param  {[type]} userid   [description]
	 * @param  {[type]} widgetid [description]
	 * @return {[type]}          [description]
	 */
	fetchUserConfig: function widget_api_fuc (userid, widgetid) {
		// body...
		// TODO: do the real user fetch
	},

	/**
	 * [postUserConfig ]
	 * @param  {[type]} userid     [description]
	 * @param  {[type]} widgetid   [description]
	 * @param  {[type]} configJson [description]
	 * @return {[type]}            [description]
	 */
	postUserConfig: function widget_api_post (userid, widgetid, configJson) {
		// body...		
		// TODO: do the real post
	},

	/**
	 * [getCurrentUser current logged in user get function]
	 * @return {[type]} [description]
	 */
	getCurrentUser: function widget_api_current_user () {
		// body...
		if (this.currentUserId) {
			return this.currentUserId;
		} else {
			// Get the user
			this.currentUserId = window.CurrentUser;
			return this.currentUserId;
		}
	},

	getWidgetId: function widget_api_widget_id (location) {
		if (this.widgetid) {
			return this.widgetid;
		} else {
			var index = location.indexOf('/widgets/');
			var s = location.substring(index+9, location.length);
			index = s.indexOf('/');
			var id = s.substring(0, index);
			this.widgetid = id;
			return id;
		}
	},

	getProfileUser: function widget_api_widget_id() {
		var profileString = document.location.pathname;
		var index = profileString.indexOf("#profile/");
		var str = profileString.substring(index+9, profileString.length);
		if (str.length)
			return str; 
		else 
			return window.WidgetAPI.getCurrentUser();
	},

	/**
	 * [log description]
	 * @param  {[string]} message [Message to put]
	 * @return {[type]}         [description]
	 */
	log: function widget_api_log(message) {
		console.log(message);
	},

	/**
	 * [logError description]
	 * @param  {[type]} errorMessage [description]
	 * @return {[type]}              [description]
	 */
	logError: function widget_api_logError(errorMessage) {
		// TODO: Possibly send error to server
		// for now just write to the console.log
		this.log(errorMessage);
	}
};