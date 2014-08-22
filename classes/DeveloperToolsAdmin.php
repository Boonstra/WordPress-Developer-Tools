<?php
/**
 * @since 1.0.0
 * @author Stefan Boonstra
 */
class DeveloperToolsAdmin
{
	/**
	 * @since 1.0.0
	 */
	static function init()
	{
		add_action('admin_menu', array(__CLASS__, 'addMenuItems'));
	}

	/**
	 * @since 1.0.0
	 */
	static function addMenuItems()
	{
		add_submenu_page(
			'tools.php',
			__('Developer Tools', 'developer-tools'),
			__('Developer Tools', 'developer-tools'),
			'manage_options',
			'developer-tools',
			array(__CLASS__, 'renderDeveloperToolsPage')
		);
	}

	/**
	 * @since 1.0.0
	 */
	static function renderDeveloperToolsPage()
	{
		DeveloperTools::outputView('admin-page.php');
	}
}