<?php
namespace MappCloud\Intelligence;

use MappCloud\Intelligence\Helper;

class Loader
{
	public static function ti_loader($config)
	{
		$tiId = $config["General"]["tiId"];
		$tiDomain =
			isset($config["General"]["tiDomain"]) &&
			strlen($config["General"]["tiDomain"]) > 1
				? $config["General"]["tiDomain"]
				: "responder.wt-safetag.com";
		echo "<script>", "\n";
		echo "window._tiConfig = window._tiConfig || {", "\n";
		echo "tiDomain: '" . $tiDomain . "',", "\n";
		echo "tiId: '" . $tiId . "',", "\n";
		echo "option: {}\n";
		echo "};", "\n";
		echo '(function(a,d,c,f){a.wts=a.wts||[];var g=function(b){var a="";b.customDomain&&b.customPath?a=b.customDomain+"/"+b.customPath:b.tiDomain&&b.tiId&&(a=b.tiDomain+"/resp/api/get/"+b.tiId+"?url="+encodeURIComponent("https://"+d.location.host+"/")+"&v=5");if(b.option)for(var c in b.option)a+="&"+c+"="+encodeURIComponent(b.option[c]);return a};if(-1===d.cookie.indexOf("wt_r=1")){var e=d.getElementsByTagName(c)[0];c=d.createElement(c);c.async=!0;c.onload=function(){if("undefined"!==typeof a.wt_r&&!isNaN(a.wt_r)){var b=';
		echo 'new Date,c=b.getTime()+1E3*parseInt(a.wt_r);b.setTime(c);d.cookie="wt_r=1;path=/;expires="+b.toUTCString()}};c.onerror=function(){"undefined"!==typeof a.wt_mcp_hide&&"function"===typeof a.wt_mcp_hide.show&&(a.wt_mcp_hide.show(),a.wt_mcp_hide.show=function(){})};c.src="//"+g(f);e.parentNode.insertBefore(c,e)}})(window,document,"script",_tiConfig);window.wts=window.wts||[];window.wts.push(["_ps", 1024, "' .
			Helper::$version .
			'"])';
		echo "</script>", "\n";
	}

	public static function smartpixel_loader()
	{
		$smartPixelPath = str_replace("src/Intelligence/", "", plugin_dir_url(__FILE__)) . "js/smart-pixel.min.js";
		echo "<script type=\"text/javascript\" src=\"" . $smartPixelPath . "\"></script>";
	}

	public static function gtm_loader($id)
	{
		?>
		<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
					new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
				j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
				'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
			})(window,document,'script','dataLayer','<?php echo $id; ?>');</script>
		<?php
	}

	public static function smartpixel_push($config, $dataLayer)
	{
		$dataLayer->create_gtm_product_array(); ?>
		<script type="text/javascript">
			var wtSmartSearch = setInterval(function(){
				if(window.wtSmart) {
					clearInterval(wtSmartSearch);
                    window.wtSmart._ps && wtSmart._ps(1024, '<?php echo Helper::$version; ?>');
					window.dataLayer = window.dataLayer || [];
					(function(){
						var _tmp = {event: 'mapp.load'};
						_tmp.mapp = <?php echo json_encode($dataLayer->create_datalayer($config)); ?>;
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
