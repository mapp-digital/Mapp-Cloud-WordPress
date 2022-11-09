<?php

namespace MappCloud\Intelligence\DataLayer;


trait User
{
/**
	 * Gets email address of current user and writes MD5 to 'customerId'
	 * Also writes array of user roles to datalayer
	 */
	public function get_user_info()
	{
		$user_id = get_current_user_id();
		if ($user_id !== 0) {
			$user_info = get_userdata($user_id);
			$user_email = $user_info->user_email;
			$this->datalayer["customerId"] = esc_js(md5($user_email));
			$this->datalayer["userRoles"] = $user_info->roles;
		}
	}
}