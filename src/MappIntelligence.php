<?php


include_once('MappIntelligenceLifeCycle.php');


class MappIntelligence extends MappIntelligenceLifeCycle
{

    /**
     * @return array of option meta data.
     */
    public function getOptionMetaData()
    {
        return array(
            'mappConfig' => array(__('Mapp configuration', 'mapp'))
        );
    }

    protected function initOptions()
    {
		$this->addOption('mappConfig', '{"General":{"v":5}}');
    }

    public function getPluginDisplayName()
    {
        return 'Mapp Cloud';
    }

    protected function getMainPluginFileName()
    {
        return 'mapp_intelligence.php';
    }

    // Get the configuration from database
    private function getConfiguration()
    {
        $mappConfig = $this->getOption('mappConfig', '{"General":{"v":5}}');
        return json_decode(stripslashes($mappConfig), true);
    }
    private $config = array();

    public function __construct()
    {
        $this->config = $this->getConfiguration();
    }

    /**
     * returns false if plugin setting 'track wp users' is not checked and
     * user is logged in and has one of the employeeRoles
     * @return bool
     */
    private function shall_user_be_tracked()
    {
        if (!isset($this->config["General"]["excludeWpUser"]) || $this->config["General"]["excludeWpUser"] === false) {
            return true;
        } else { // case user not logged in
            $id = get_current_user_id();
            if ($id === 0) {
                return true;
            } else { // user logged in as one of those roles
                $employeeRoles = array('administrator', 'editor', 'author', 'contributor', 'shop_manager');
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

    public function addActionsAndFilters()
    {

        // Add options administration page
        add_action('admin_menu', array(&$this, 'addSettingsSubMenuPage'));

        // Add Actions & Filters
        add_action('wp_head', array(&$this, 'wp_head_actions'));
        add_action('woocommerce_after_shop_loop_item', array(&$this, 'woo_item_loop_actions'));
        add_action('woocommerce_before_single_product', array(&$this, 'woo_single_product'));
        add_action('woocommerce_thankyou', array(&$this, 'woo_after_order_actions'));
        add_action('wp_footer', array(&$this, 'wp_footer_actions'));
//        if(isset($this->config["General"]) && $this->config['General']['v'] === 6 ) {
//			add_action('wp_enqueue_scripts', array(&$this, 'smartpixel_enqueue'));
//		}
    }

    public function wp_head_actions()
    {
    	if($this->config['General']['v'] === 6) {
            $this->smartpixel_loader();
            if(isset($this->config['General']['gtmId'])) {
				$this->gtm_loader($this->config['General']['gtmId']);
			}
		}
    	$this->get_404_info();
        $this->get_page_info();
        $this->get_search_info();
        $this->get_user_info();
    }

    public function woo_single_product()
    {
        $this->get_product_info();
        $this->get_product_status('view');
        $this->create_is_collection_info();
    }

    public function woo_after_order_actions()
    {
        $this->get_order_info();
    }

    public function wp_footer_actions()
    {
        if($this->shall_user_be_tracked()) {
        	if(defined('WC_VERSION')) {
				$this->add_product_categories_based_on_taxonomies();
			}
			if ($this->config['General']['v'] === 5) {
				$this->create_datalayer($this->config);
				$this->mappify_order_items();
				$this->ti_loader();
				$this->track_add_product_single(true);
				$this->track_add_product_archive(true);
				$this->product_variant_events(true);
			}
			elseif ($this->config['General']['v'] === 6) {
				$this->smartpixel_push();
				$this->track_add_product_single(false);
				$this->track_add_product_archive(false);
				$this->product_variant_events(false);
			}
			if(key_exists('acquire',  $this->config['General'])) {
				if(preg_match('/id=(\d+?)&m=(\d+?)\D/', $this->config['General']['acquire'], $ids))
				{
					$link = 'https://c.flx1.com/' . $ids[2] . '-' . $ids[1] .'.js?id=' . $ids[1] . '&m=' . $ids[2];
					echo '<script>(function(e){var t=document,n=t.createElement("script");n.async=!0,n.defer=!0,';
					echo 'n.src=e,t.getElementsByTagName("head")[0].appendChild(n)})("' . $link . '")</script>';
				}
			}
		}

    }

    public function woo_item_loop_actions()
    {
        $this->get_product_info(true);
    }

    private function get_version()
    {
        $path = WP_PLUGIN_DIR . '/mapp-intelligence/mapp_intelligence.php';
        $file = file_get_contents($path);
        preg_match('/Version.+?([0-9]+.[0-9]+.[0-9]+)/', $file, $matches);
        return $matches[1];
    }

    private function ti_loader()
    {
        $tiId =  $this->config['General']['tiId'];
        $tiDomain = isset($this->config['General']['tiDomain']) ? $this->config['General']['tiDomain'] : 'responder.wt-safetag.com' ;
        echo '<script>',"\n";
        echo "window._tiConfig = window._tiConfig || {","\n";
        echo "tiDomain: '" . $tiDomain . "',","\n";
        echo "tiId: '" . $tiId . "',","\n";
        echo "option: {}\n";
        echo "};","\n";
        echo '(function(a,d,c,f){a.wts=a.wts||[];var g=function(b){var a="";b.customDomain&&b.customPath?a=b.customDomain+"/"+b.customPath:b.tiDomain&&b.tiId&&(a=b.tiDomain+"/resp/api/get/"+b.tiId+"?url="+encodeURIComponent("https://"+d.location.host+"/")+"&v=5");if(b.option)for(var c in b.option)a+="&"+c+"="+encodeURIComponent(b.option[c]);return a};if(-1===d.cookie.indexOf("wt_r=1")){var e=d.getElementsByTagName(c)[0];c=d.createElement(c);c.async=!0;c.onload=function(){if("undefined"!==typeof a.wt_r&&!isNaN(a.wt_r)){var b=';
        echo 'new Date,c=b.getTime()+1E3*parseInt(a.wt_r);b.setTime(c);d.cookie="wt_r=1;path=/;expires="+b.toUTCString()}};c.onerror=function(){"undefined"!==typeof a.wt_mcp_hide&&"function"===typeof a.wt_mcp_hide.show&&(a.wt_mcp_hide.show(),a.wt_mcp_hide.show=function(){})};c.src="//"+g(f);e.parentNode.insertBefore(c,e)}})(window,document,"script",_tiConfig);window.wts=window.wts||[];window.wts.push(["_ps", 1024, "'. $this->get_version() .'"])';
        echo '</script>',"\n";
    }

    private function gtm_loader($id)
	{
		?>
		<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
					new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
				j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
				'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
			})(window,document,'script','dataLayer','<?php echo $id?>');</script>
		<?php
	}

	public function smartpixel_loader()
	{
        ?>
        <script>
            window.loaderConfig_ = window.loaderConfig_ || {
                domain: '',
                path: '<?php echo plugin_dir_url(__FILE__) . '../js/' ?>',
                file: 'smart-pixel.min.js'
            };

            (function(f,c,a,b){function d(){}var e=c.getElementsByTagName(a)[0];a=c.createElement(a);a.async=!0;a.onload=d;a.onerror=d;if(-1!==c.cookie.indexOf("wtstp_debug=1")||-1!==f.location.hash.indexOf("wtstp_debug"))b.file=b.file.replace(/\.min\./,".debug.");a.src=(""!==b.domain?"//"+b.domain:"")+b.path+b.file;e.parentNode.insertBefore(a,e)})(window,document,"script",window.loaderConfig_||{});
        </script>
        <?php
	}

	public function smartpixel_push()
	{
		$this->create_gtm_product_array();
		?>
		<script type="text/javascript">
			var wtSmartSearch = setInterval(function(){
				if(window.wtSmart) {
					clearInterval(wtSmartSearch);
                    window.wtSmart._ps && wtSmart._ps(1024, '<?php echo $this->get_version() ?>');
					window.dataLayer = window.dataLayer || [];
					(function(){
						var _tmp = {event: 'mapp.load'};
						_tmp.mapp = <?php echo json_encode($this->create_datalayer($this->config));?>;
						_tmp.mapp.pageName = location.host + location.pathname;
						if(_tmp.mapp.shoppingCartStatus === 'conf') {
							_tmp.mapp.shoppingCartStatus = 'confirmation';
						}
						window.dataLayer.push(_tmp);
					})();
				}
			}, 500);
		</script>
		<?php
	}
}
