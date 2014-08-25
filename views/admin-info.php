<div class="wrap developer-tools-logger">

	<h3><?php _e('Developer Tools', 'developer-tools'); ?></h3>

	<h4><?php _e('Logging', 'developer-tools'); ?></h4>

	<p>
		<?php _e('To write a variable to the Developer Tools log, use one of the following PHP functions:', 'developer-tools'); ?>
	</p>

	<ul>
		<li><code>l($variable);</code></li>
		<li><code>dtlog($variable);</code></li>
		<li><code>do_action('dtlog', $variable);</code></li>
	</ul>

	<h4><?php _e('Exceptions', 'developer-tools'); ?></h4>

	<p>
		<?php _e('Exceptions of any level will automatically be written to the log.', 'developer-tools'); ?>
	</p>
</div>