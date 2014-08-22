developer_tools_backend_script.log = function()
{
	var $    = jQuery,
		self = { };

	self.isCurrentPage = false;

	/**
	 *
	 */
	self.init = function()
	{
		if (window.pagenow === 'tools_page_developer-tools')
		{
			self.isCurrentPage = true;
		}
	};

	$(document).bind('developerToolsBackendReady', self.init);

	return self;
}();