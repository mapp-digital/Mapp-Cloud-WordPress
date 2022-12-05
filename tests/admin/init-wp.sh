#!/bin/bash

set -e

# wait for the database to be ready
bash /wait-for-it.sh -t 0 db:3306

function download_woocommerce()
{
  echo "Looking for latest Woocommerce version..."
  WOOV=$(curl -s https://api.github.com/repos/woocommerce/woocommerce/releases/latest | grep -oE '"name":\s"[0-9]\.[0-9]\.[0-9]' | grep -oE '[0-9]\.[0-9]\.[0-9]')
  echo "Latest Woocommerce release is $WOOV!"
  curl -o /var/www/html/.wp-cli/cache/plugin/woocommerce.$WOOV.zip --create-dirs https://downloads.wordpress.org/plugin/woocommerce.$WOOV.zip
  unzip /var/www/html/.wp-cli/cache/plugin/woocommerce.$WOOV.zip -d /var/www/html/wp-content/plugins
}

function wp_delete_post()
{
  IDS=$(wp post list --post_type="$1" --field=ID)
  if [ "$IDS" != "" ]; then
    for ID in $IDS; do
      wp post delete "$ID" --force
    done
  fi
}

function wp_delete_user()
{
  IDS=$(wp user list --role="$1" --field=ID)
  if [ "$IDS" != "" ]; then
    for ID in $IDS; do
      wp user delete "$ID" --yes
    done
  fi
}

function wp_delete_attributes()
{
  # collect list of product attribute ids
  ATTRIBUTE_IDS=$(wp wc product_attribute list --field=id --user=1)
  if [ "$ATTRIBUTE_IDS" != "" ]; then
    for ATTRIBUTE_ID in $ATTRIBUTE_IDS; do
      # collect list of product attribute term ids
      TERM_IDS=$(wp wc product_attribute_term list "$ATTRIBUTE_ID" --field=id --user=1)
      if [ "$TERM_IDS" != "" ]; then
        for TERM_ID in $TERM_IDS; do
          # delete product attribute ($ATTRIBUTE_ID) term id ($TERM_ID)
          wp wc product_attribute_term delete "$ATTRIBUTE_ID" "$TERM_ID" --force=true --user=1
        done
        # delete product attribute ($ATTRIBUTE_ID)
        wp wc product_attribute delete "$ATTRIBUTE_ID" --force=true --user=1
      fi
    done
  fi
}

function wp_delete_menu()
{
  IDS=$(wp menu list --format=ids)
  if [ "$IDS" != "" ]; then
    for ID in $(echo "$IDS" | tr " " "\n"); do
      wp menu delete "$ID"
    done
  fi
}

function wp_update_option()
{
  OPTION_VALUE=$(wp option get "$1")
  if [ "$OPTION_VALUE" != "$2" ]; then
    (
      wp option update "$1" "$2" --autoload="$3"
    )
  fi
}

cd /var/www/html/

echo "install and update wordpress to v$WORDPRESS_VERSION"
echo "with Woocommerce version $WOOCOMMERCE_VERSION"


wp core install --url=http://mapp_e2e_wp.test --title="Mapp Intelligence E2E Test Suite" --admin_user=admin --admin_password=password --admin_email=admin@mapp.com --path=/var/www/html --skip-email
# wp core update --version="$WORDPRESS_VERSION" --locale=en_US --path=/var/www/html --force

wp language core install de_DE

rm -rf /var/www/html/wp-content/plugins/woocommerce/
download_woocommerce
# if [ "$WOOCOMMERCE_VERSION" != "" ]; then
#   wp plugin install woocommerce --version="$WOOCOMMERCE_VERSION"
# else
#   wp plugin install woocommerce
# fi

# sleep 1

wp plugin activate woocommerce

wp plugin install wordpress-importer --activate
wp plugin activate mapp_intelligence
# set default settings for Mapp plugin
wp option set MappIntelligence_mappConfig '{"General":{"v":5,"tiId":"136699033798929","gtmId":"GTM-N2FH826","tiDomain":"responder.wt-safetag.com","filterKeys":"","excludeWpUser":false,"acquire":""}}'

wp theme install twentytwenty --activate

# delete all users with role customer
wp_delete_user customer

# create a new user
wp user create customer customer@mapp.com --user_pass=password --role=customer --path=/var/www/html

# delete all existing pages, posts, products and product variations
wp_delete_post page
wp_delete_post post
wp_delete_post product
wp_delete_post product_variation

# delete woocommerce attributes and terms
wp_delete_attributes

# update woocommerce options
wp_update_option permalink_structure "/%category%/%postname%/" yes
wp_update_option woocommerce_store_address "route 1" yes
wp_update_option woocommerce_store_address_2 "room 1" yes
wp_update_option woocommerce_store_city "Berlin" yes
wp_update_option woocommerce_default_country "DE:*" yes
wp_update_option woocommerce_store_postcode "13359" yes
wp_update_option woocommerce_allowed_countries "all" yes
wp_update_option woocommerce_all_except_countries "" yes
wp_update_option woocommerce_specific_allowed_countries "" yes
wp_update_option woocommerce_ship_to_countries "" yes
wp_update_option woocommerce_specific_ship_to_countries "" yes
wp_update_option woocommerce_default_customer_address "base" yes
wp_update_option woocommerce_calc_taxes "no" yes
wp_update_option woocommerce_enable_coupons "yes" yes
wp_update_option woocommerce_calc_discounts_sequentially "no" no
wp_update_option woocommerce_currency "EUR" yes
wp_update_option woocommerce_currency_pos "left" yes
wp_update_option woocommerce_price_thousand_sep "." yes
wp_update_option woocommerce_price_decimal_sep "," yes
wp_update_option woocommerce_price_num_decimals "2" yes
wp_update_option woocommerce_cart_redirect_after_add "no" yes
wp_update_option woocommerce_enable_ajax_add_to_cart "yes" yes
wp_update_option woocommerce_placeholder_image "5" yes
wp_update_option woocommerce_weight_unit "kg" yes
wp_update_option woocommerce_dimension_unit "cm" yes
wp_update_option woocommerce_enable_reviews "yes" yes
wp_update_option woocommerce_review_rating_verification_label "yes" no
wp_update_option woocommerce_review_rating_verification_required "no" no
wp_update_option woocommerce_enable_review_rating "yes" yes
wp_update_option woocommerce_review_rating_required "yes" no
wp_update_option woocommerce_manage_stock "yes" yes
wp_update_option woocommerce_hold_stock_minutes "60" no
wp_update_option woocommerce_notify_low_stock "yes" no
wp_update_option woocommerce_notify_no_stock "yes" no
wp_update_option woocommerce_stock_email_recipient "admin@local.test" no
wp_update_option woocommerce_notify_low_stock_amount "2" no
wp_update_option woocommerce_notify_no_stock_amount "0" yes
wp_update_option woocommerce_hide_out_of_stock_items "no" yes
wp_update_option woocommerce_stock_format "" yes
wp_update_option woocommerce_file_download_method "force" no
wp_update_option woocommerce_downloads_require_login "no" no
wp_update_option woocommerce_downloads_grant_access_after_payment "yes" no
wp_update_option woocommerce_prices_include_tax "no" yes
wp_update_option woocommerce_tax_based_on "shipping" yes
wp_update_option woocommerce_shipping_tax_class "inherit" yes
wp_update_option woocommerce_tax_round_at_subtotal "no" yes
wp_update_option woocommerce_tax_classes "" yes
wp_update_option woocommerce_tax_display_shop "excl" yes
wp_update_option woocommerce_tax_display_cart "excl" yes
wp_update_option woocommerce_price_display_suffix "" yes
wp_update_option woocommerce_tax_total_display "itemized" no
wp_update_option woocommerce_enable_shipping_calc "yes" no
wp_update_option woocommerce_shipping_cost_requires_address "no" yes
wp_update_option woocommerce_ship_to_destination "billing" no
wp_update_option woocommerce_shipping_debug_mode "no" yes
wp_update_option woocommerce_enable_guest_checkout "yes" no
wp_update_option woocommerce_enable_checkout_login_reminder "no" no
wp_update_option woocommerce_enable_signup_and_login_from_checkout "no" no
wp_update_option woocommerce_enable_myaccount_registration "no" no
wp_update_option woocommerce_registration_generate_username "yes" no
wp_update_option woocommerce_registration_generate_password "yes" no
wp_update_option woocommerce_erasure_request_removes_order_data "no" no
wp_update_option woocommerce_erasure_request_removes_download_data "no" no
wp_update_option woocommerce_allow_bulk_remove_personal_data "no" no
wp_update_option woocommerce_registration_privacy_policy_text "Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our [privacy_policy]." yes
wp_update_option woocommerce_checkout_privacy_policy_text "Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our [privacy_policy]." yes
wp_update_option woocommerce_trash_pending_orders "" no
wp_update_option woocommerce_trash_failed_orders "" no
wp_update_option woocommerce_trash_cancelled_orders "" no
wp_update_option woocommerce_email_from_name "mapp_e2e_wp.test" no
wp_update_option woocommerce_email_from_address "admin@local.test" no
wp_update_option woocommerce_email_header_image "" no
wp_update_option woocommerce_email_footer_text "{site_title} &mdash; Built with {WooCommerce}" no
wp_update_option woocommerce_email_base_color "#96588a" no
wp_update_option woocommerce_email_background_color "#f7f7f7" no
wp_update_option woocommerce_email_body_background_color "#ffffff" no
wp_update_option woocommerce_email_text_color "#3c3c3c" no
wp_update_option woocommerce_terms_page_id "" no
wp_update_option woocommerce_force_ssl_checkout "no" yes
wp_update_option woocommerce_unforce_ssl_checkout "no" yes
wp_update_option woocommerce_checkout_pay_endpoint "order-pay" yes
wp_update_option woocommerce_checkout_order_received_endpoint "order-received" yes
wp_update_option woocommerce_myaccount_add_payment_method_endpoint "add-payment-method" yes
wp_update_option woocommerce_myaccount_delete_payment_method_endpoint "delete-payment-method" yes
wp_update_option woocommerce_myaccount_set_default_payment_method_endpoint "set-default-payment-method" yes
wp_update_option woocommerce_myaccount_orders_endpoint "orders" yes
wp_update_option woocommerce_myaccount_view_order_endpoint "view-order" yes
wp_update_option woocommerce_myaccount_downloads_endpoint "downloads" yes
wp_update_option woocommerce_myaccount_edit_account_endpoint "edit-account" yes
wp_update_option woocommerce_myaccount_edit_address_endpoint "edit-address" yes
wp_update_option woocommerce_myaccount_payment_methods_endpoint "payment-methods" yes
wp_update_option woocommerce_myaccount_lost_password_endpoint "lost-password" yes
wp_update_option woocommerce_logout_endpoint "customer-logout" yes
wp_update_option woocommerce_api_enabled "no" yes
wp_update_option woocommerce_allow_tracking "no" no
wp_update_option woocommerce_show_marketplace_suggestions "yes" no
wp_update_option woocommerce_single_image_width "600" yes
wp_update_option woocommerce_thumbnail_image_width "300" yes
wp_update_option woocommerce_checkout_highlight_required_fields "yes" yes
wp_update_option woocommerce_demo_store "no" no
wp_update_option current_theme_supports_woocommerce "yes" yes
wp_update_option woocommerce_queue_flush_rewrite_rules "no" yes

# activate woocommerce payment methods
wp option update --format=json woocommerce_cod_settings '{"enabled":"yes"}'
wp option update --format=json woocommerce_bacs_settings '{"enabled":"yes"}'
wp option update --format=json woocommerce_cheque_settings '{"enabled":"yes"}'

# create woocommerce attributes and terms
COLOR_ID=$(wp wc product_attribute create --name="Color" --slug="color" --user=1 --porcelain)
wp wc product_attribute_term create "$COLOR_ID" --name="Blue" --slug="blue" --user=1
wp wc product_attribute_term create "$COLOR_ID" --name="Green" --slug="green" --user=1
wp wc product_attribute_term create "$COLOR_ID" --name="Red" --slug="red" --user=1
wp wc product_attribute_term create "$COLOR_ID" --name="Gray" --slug="gray" --user=1
wp wc product_attribute_term create "$COLOR_ID" --name="Yellow" --slug="yellow" --user=1

SIZE_ID=$(wp wc product_attribute create --name="Size" --slug="size" --user=1 --porcelain)
wp wc product_attribute_term create "$SIZE_ID" --name="Large" --slug="large" --user=1
wp wc product_attribute_term create "$SIZE_ID" --name="Medium" --slug="medium" --user=1
wp wc product_attribute_term create "$SIZE_ID" --name="Small" --slug="small" --user=1

# import woocommerce sample products
wp import /var/www/html/wp-content/plugins/woocommerce/sample-data/sample_products.xml --authors=create

# create pages
SAMPLE_PAGE_ID=$(wp post create --porcelain --post_type=page --post_status=publish --post_title='Sample Page' --post_category='' --post_category='' --post_content='<!-- wp:paragraph --><p>This is an example page. Its different from a blog post because it will stay in one place and will show up in your site navigation (in most themes). Most people start with an About page that introduces them to potential site visitors. It might say something like this:</p><!-- /wp:paragraph --><!-- wp:quote --><blockquote class="wp-block-quote"><p>Hi there! Im a bike messenger by day, aspiring actor by night, and this is my website. I live in Los Angeles, have a great dog named Jack, and I like pi&#241;a coladas. (And gettin caught in the rain.)</p></blockquote><!-- /wp:quote --><!-- wp:paragraph --><p>...or something like this:</p><!-- /wp:paragraph --><!-- wp:quote --><blockquote class="wp-block-quote"><p>The XYZ Doohickey Company was founded in 1971, and has been providing quality doohickeys to the public ever since. Located in Gotham City, XYZ employs over 2,000 people and does all kinds of awesome things for the Gotham community.</p></blockquote><!-- /wp:quote --><!-- wp:paragraph --><p>As a new WordPress user, you should go to <a href="http://mapp_e2e_wp.test/wp-admin/">your dashboard</a> to delete this page and create new pages for your content. Have fun!</p><!-- /wp:paragraph -->')
PRIVACY_POLICY_ID=$(wp post create --porcelain --post_type=page --post_status=publish --post_title='Privacy Policy' --post_category='' --post_content='<!-- wp:heading --><h2>Who we are</h2><!-- /wp:heading --><!-- wp:paragraph --><p>Our website address is: http://mapp_e2e_wp.test.</p><!-- /wp:paragraph --><!-- wp:heading --><h2>What personal data we collect and why we collect it</h2><!-- /wp:heading --><!-- wp:heading {"level":3} --><h3>Comments</h3><!-- /wp:heading --><!-- wp:paragraph --><p>When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor&#8217;s IP address and browser user agent string to help spam detection.</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. The Gravatar service privacy policy is available here: https://automattic.com/privacy/. After approval of your comment, your profile picture is visible to the public in the context of your comment.</p><!-- /wp:paragraph --><!-- wp:heading {"level":3} --><h3>Media</h3><!-- /wp:heading --><!-- wp:paragraph --><p>If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.</p><!-- /wp:paragraph --><!-- wp:heading {"level":3} --><h3>Contact forms</h3><!-- /wp:heading --><!-- wp:heading {"level":3} --><h3>Cookies</h3><!-- /wp:heading --><!-- wp:paragraph --><p>If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select &quot;Remember Me&quot;, your login will persist for two weeks. If you log out of your account, the login cookies will be removed.</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.</p><!-- /wp:paragraph --><!-- wp:heading {"level":3} --><h3>Embedded content from other websites</h3><!-- /wp:heading --><!-- wp:paragraph --><p>Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.</p><!-- /wp:paragraph --><!-- wp:heading {"level":3} --><h3>Analytics</h3><!-- /wp:heading --><!-- wp:heading --><h2>Who we share your data with</h2><!-- /wp:heading --><!-- wp:heading --><h2>How long we retain your data</h2><!-- /wp:heading --><!-- wp:paragraph --><p>If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve any follow-up comments automatically instead of holding them in a moderation queue.</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>For users that register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.</p><!-- /wp:paragraph --><!-- wp:heading --><h2>What rights you have over your data</h2><!-- /wp:heading --><!-- wp:paragraph --><p>If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.</p><!-- /wp:paragraph --><!-- wp:heading --><h2>Where we send your data</h2><!-- /wp:heading --><!-- wp:paragraph --><p>Visitor comments may be checked through an automated spam detection service.</p><!-- /wp:paragraph --><!-- wp:heading --><h2>Your contact information</h2><!-- /wp:heading --><!-- wp:heading --><h2>Additional information</h2><!-- /wp:heading --><!-- wp:heading {"level":3} --><h3>How we protect your data</h3><!-- /wp:heading --><!-- wp:heading {"level":3} --><h3>What data breach procedures we have in place</h3><!-- /wp:heading --><!-- wp:heading {"level":3} --><h3>What third parties we receive data from</h3><!-- /wp:heading --><!-- wp:heading {"level":3} --><h3>What automated decision making and/or profiling we do with user data</h3><!-- /wp:heading --><!-- wp:heading {"level":3} --><h3>Industry regulatory disclosure requirements</h3><!-- /wp:heading -->')
SHOP_ID=$(wp post create --porcelain --post_type=page --post_status=publish --post_title='Shop' --post_category='' --post_content='')
CART_ID=$(wp post create --porcelain --post_type=page --post_status=publish --post_title='Cart' --post_category='' --post_content='<!-- wp:shortcode -->[woocommerce_cart]<!-- /wp:shortcode -->')
CHECKOUT_ID=$(wp post create --porcelain --post_type=page --post_status=publish --post_title='Checkout' --post_category='' --post_content='<!-- wp:shortcode -->[woocommerce_checkout]<!-- /wp:shortcode -->')
MY_ACCOUNT_ID=$(wp post create --porcelain --post_type=page --post_status=publish --post_title='My account' --post_category='' --post_content='<!-- wp:shortcode -->[woocommerce_my_account]<!-- /wp:shortcode -->')

# create post
wp post create --post_type=post --post_status=publish --post_title='Mapp Cloud Wordpress/Woocommerce E2E' --post_category='' --post_content='<!-- wp:paragraph --><p>This is the Wordpress dev- and E2E testserver for Wordpress / Woocommerce and Mapp Cloud Integration. Plugin settings are available <a href="http://mapp_e2e_wp.test/wp-admin/plugins.php?page=mapp-intelligence">here</a></p><!-- /wp:paragraph -->'

# update page ids
wp_update_option wp_page_for_privacy_policy "$PRIVACY_POLICY_ID" yes
wp_update_option woocommerce_shop_page_id "$SHOP_ID" yes
wp_update_option woocommerce_cart_page_id "$CART_ID" yes
wp_update_option woocommerce_checkout_page_id "$CHECKOUT_ID" yes
wp_update_option woocommerce_myaccount_page_id "$MY_ACCOUNT_ID" yes

# delete menu
wp_delete_menu

# create new menu
TOP_MENU_ID=$(wp menu create "Top Menu" --porcelain)

# add items to the new menu
wp menu location assign "$TOP_MENU_ID" primary
wp menu item add-post "$TOP_MENU_ID" "$MY_ACCOUNT_ID"
wp menu item add-post "$TOP_MENU_ID" "$CHECKOUT_ID"
wp menu item add-post "$TOP_MENU_ID" "$CART_ID"
wp menu item add-post "$TOP_MENU_ID" "$SHOP_ID"
wp menu item add-post "$TOP_MENU_ID" "$PRIVACY_POLICY_ID"
wp menu item add-post "$TOP_MENU_ID" "$SAMPLE_PAGE_ID"

# update rewrite
wp rewrite structure "/%category%/%postname%/"

# display the current WordPress version
wp core version --extra