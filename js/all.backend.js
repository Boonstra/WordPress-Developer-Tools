/**
 * Developer Tools backend script
 *
 * @author Stefan Boonstra
 * @version 1.0.0
 */
developer_tools_backend_script = function()
{
	var $    = jQuery,
		self = {};

	self.isBackendInitialized = false;

	/**
	 * Called by either jQuery's document ready event or JavaScript's window load event in case document ready fails to
	 * fire.
	 *
	 * Triggers the developerToolsBackendReady on the document to inform all backend scripts they can start.
	 */
	self.init = function()
	{
		if (self.isBackendInitialized)
		{
			return;
		}

		self.isBackendInitialized = true;

		$(document).trigger('developerToolsBackendReady');
	};

	$(document).ready(self.init);

	$(window).load(self.init);

	return self;
}();

// @codekit-append backend/log.js