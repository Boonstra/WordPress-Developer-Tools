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
		if (window.pagenow !== 'tools_page_developer-tools')
		{
			return
		}

		self.isCurrentPage = true;

		self.totalNumberOfNewNotifcations = 0;
		self.notificationCycleTimer       = null;
		self.notificationResetTimer       = null;
		self.originalTitle                = document.title;

		self.$logger           = $('.developer-tools-logger');
		self.$tableBody        = self.$logger.find('table tbody');
		self.$templates        = self.$logger.find('.templates');
		self.$noEntriesMessage = self.$templates.find('.no-entries-message');
		self.$entryTemplate    = self.$templates.find('.entry');

		self.showNoEntriesMessage();

		setInterval(function()
		{
			self.updateLog();
		}, 2000);

		self.updateLog();

		$(window).focus(function(){ self.totalNumberOfNewNotifcations = 0; });
	};

	/**
	 * Updates the log table with the results retrieved from the AJAX request.
	 */
	self.updateLog = function()
	{
		$.post(ajaxurl, { action: 'developer_tools_pop_log' }, function(data)
		{
			var entries = JSON.parse(data),
				$entry,
				entry,
				date,
				numberOfNewNotifications = entries.length;

			// Return when no entries were received
			if (numberOfNewNotifications <= 0)
			{
				return;
			}

			self.$tableBody.find('.no-entries-message').remove();

			for (entry in entries)
			{
				if (!entries.hasOwnProperty(entry))
				{
					continue;
				}

				entry = entries[entry];

				date = new Date(entry['timestamp']);

				$entry = self.$entryTemplate.clone(true, true);

				$entry.find('.column-content').html(entry['content']);
				$entry.find('.column-backtrace').html(entry['backtrace']);
				$entry.find('.column-time').html(
					date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() + '<br />' +
					date.getHours() + ':' + date.getMinutes() + ':' + date.getMinutes() + '.' + date.getMilliseconds()
				);

				self.$tableBody.append($entry);
			}

			if (document.hasFocus())
			{
				self.totalNumberOfNewNotifcations = numberOfNewNotifications;
			}
			else
			{
				self.totalNumberOfNewNotifcations += numberOfNewNotifications;
			}

			self.showNotificationInTitle(['(' + self.totalNumberOfNewNotifcations + ') ' + self.originalTitle], true, -1, 2000);
		})
	};

	/**
	 * Shows the "No log entries available" message in the table body.
	 */
	self.showNoEntriesMessage = function()
	{
		self.$tableBody.html(self.$noEntriesMessage.clone(true, true));
	};

	/**
	 * Show a notification in the title of the website. This function expects a string or an array of string to be
	 * passed through the messages parameter. Multiple messages will be cycled through using the value from the
	 * cycleTime parameter.
	 *
	 * If the original title should be restored when the website gains focus again, the resetFocus parameter should be
	 * set to true.
	 *
	 * If the original title should be restored after a certain time, the resetTime parameter should be set to a
	 * positive integer. The passed integer will be interpreted as milliseconds. When no resetTime should be set, set
	 * the parameter to -1.
	 *
	 * The cycleTime parameter is expected to be an integer and will be interpreted as milliseconds.
	 *
	 * @param messages
	 * @param resetOnFocus (Optional, defaults to true)
	 * @param resetTime    (Optional, defaults to 10000)
	 * @param cycleTime    (Optional, defaults to 2000)
	 */
	self.showNotificationInTitle = function(messages, resetOnFocus, resetTime, cycleTime)
	{
		var resetFunction,
			notificationCycleFunction;

		resetFunction = function()
		{
			clearInterval(self.notificationCycleTimer);
			clearTimeout(self.notificationResetTimer);

			document.title = self.originalTitle;
		};

		// Reset title before starting another notification sequence
		resetFunction();

		// Wrap strings in an array
		if (!$.isArray(messages))
		{
			if (typeof(messages) === 'string')
			{
				messages = [messages];
			}
			else
			{
				return;
			}
		}

		if (messages.length <= 0)
		{
			return;
		}

		// Defaults
		resetOnFocus = resetOnFocus || true;
		resetTime    = resetTime    || 10000;
		cycleTime    = cycleTime    || 2000;

		notificationCycleFunction = function()
		{
			var message = messages.splice(0, 1)[0];

			messages.push(message);

			document.title = message;
		};

		self.notificationCycleTimer = setInterval(notificationCycleFunction, cycleTime);
		notificationCycleFunction();

		if (resetOnFocus)
		{
			$(window).focus(resetFunction);
		}

		if (resetTime >= 0)
		{
			self.notificationResetTimer = setTimeout(resetFunction, resetTime);
		}
	};

	$(document).bind('developerToolsBackendReady', self.init);

	return self;
}();