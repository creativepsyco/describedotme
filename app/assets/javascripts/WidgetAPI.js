/**
 * @author Mohit
 * [WidgetAPI description]
 * @type {Object}
 */
window.WidgetAPI = {
	/**
	 * [currentUserId Current Logged in user]
	 * @type {Number}
	 */
	currentUserId:0,

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
			// TODO: Fix the user
			this.currentUserId = 1;
			return this.currentUserId;
		}
	}
};