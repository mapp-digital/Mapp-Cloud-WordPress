<?php

namespace MappCloud\Intelligence;

class Helper
{
	public static $slug = "mapp-intelligence";
	public static $version = "1.2.1";

	/**
	 * returns false if plugin setting 'track wp users' is not checked and
	 * user is logged in and has one of the employeeRoles
	 * @return bool
	 */
	public static function shall_user_be_tracked($config)
	{
		if (
			!isset($config["General"]["excludeWpUser"]) ||
			$config["General"]["excludeWpUser"] === false
		) {
			return true;
		} else {
			// case user not logged in
			$id = get_current_user_id();
			if ($id === 0) {
				return true;
			} else {
				// user logged in as one of those roles
				$employeeRoles = [
					"administrator",
					"editor",
					"author",
					"contributor",
					"shop_manager",
				];
				$userRoles = get_userdata($id)->roles;
				for ($i = 0; $i < count($userRoles); $i++) {
					if (in_array($userRoles[$i], $employeeRoles)) {
						return false;
					}
				}
				return true; // user logged in as other role
			}
		}
	}

	public static function get_taxonomies($post_id)
	{
		$post_type = get_post_type($post_id);
		$child = 0;
		if ($post_type === "product_variation") {
			// variations don't have taxonomies, but their parents have
			$child = $post_id;
			$post_id = wc_get_product($post_id)->get_parent_id();
			$post_type = "product";
		}
		$taxonomies = [];
		$taxes = get_object_taxonomies($post_type);
		foreach ($taxes as $t_name) {
			$post_taxonomy_values = get_the_terms($post_id, $t_name);
			if (is_array($post_taxonomy_values)) {
				$taxonomies[$t_name] = [];
				foreach ($post_taxonomy_values as $one_taxonomy_value) {
					$taxonomies[$t_name][] = $one_taxonomy_value->name;
				}
			}
		}

		// merge product variation attributes into taxonomies
		if ($child > 0) {
			$attributes = wc_get_product($child)->get_attributes();
			foreach ($attributes as &$value) {
				$value = [$value];
			}
			$taxonomies = array_merge($taxonomies, $attributes);
		}

		// reverse order
		foreach ($taxonomies as &$value) {
			$value = array_reverse($value);
		}

		return $taxonomies;
	}
}
