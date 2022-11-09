<?php

namespace MappCloud\Intelligence\DataLayer;

use MappCloud\Intelligence\Helper;

trait Woocommerce
{
	private $current_product = []; // temporary savepoint for product data during product archive loop

	/**
	 * Writes product data either in dataLayer or in _currentProduct
	 * @param string $datalayer_key Key in dataLayer
	 * @param string|array $data Value for dataLayer
	 * @param boolean $write_to_array stores data in 'currentProduct', in case of loop through product archive
	 * @param boolean $is_collection_child child of product collection
	 */
	private function product_to_datalayer(
		$datalayer_key,
		$data,
		$write_to_array,
		$is_collection_child = false
	) {
		if ($write_to_array) {
			$this->current_product[$datalayer_key] = $data;
		} elseif ($is_collection_child) {
			$this->current_product[$datalayer_key] = $data;
			$this->datalayer[$datalayer_key] =
				$this->datalayer[$datalayer_key] . ";" . $data;
		} else {
			$this->datalayer[$datalayer_key] = $data;
		}
	}

	/**
	 * Writes order info to datalayer
	 */
	public function get_order_info()
	{
		global $wp;
		if ($this->woocommerce_enabled && is_order_received_page()) {
			$order_id = absint($wp->query_vars["order-received"]);
			$order = wc_get_order($order_id);

			// products
			$this->datalayer["shoppingCartStatus"] = "conf";
			$products = $order->get_items();
			$_datalayer_product_index = 0;
			foreach ($products as $product) {
				$product_id =
					$product->get_variation_id() === 0
						? $product->get_product_id()
						: $product->get_variation_id();
				$this->get_product_info(true, $product_id);
				$this->datalayer["products"][$_datalayer_product_index][
					"productQuantity"
				] = $product->get_quantity();
				$this->datalayer["products"][$_datalayer_product_index][
					"productCost"
				] = $product->get_subtotal();
				$_datalayer_product_index++;
			}

			// order
			$this->datalayer["orderId"] = $order_id;
			$this->datalayer["totalOrderValue"] = $order->get_total();
			$this->datalayer["subtotalOrderValue"] = $order->get_subtotal();
			$this->datalayer["taxValue"] = $order->get_tax_totals();
			$this->datalayer["couponValue"] = $order->get_discount_total();
			$this->datalayer["shippingMethod"] = $order->get_shipping_method();
			$this->datalayer["shippingCost"] = $order->get_shipping_total();
			$this->datalayer[
				"paymentMethod"
			] = $order->get_payment_method_title();
			$this->datalayer["currency"] = $order->get_currency();
		}
	}

	/**
	 * Rearrange product info on thank-you page to ; format in client
	 */
	public function mappify_order_items()
	{
		if ($this->woocommerce_enabled && is_order_received_page()) { ?>
                <script>
                    if(window._ti && window._ti.products) {
                        (function(products){
                            var keys = ['Name', 'Cost', 'Id', 'SKU', 'Quantity', 'Category', 'Subcategory'];
                            for (var i = 0; i < keys.length; i++) {
                                var productKey = 'product' + keys[i];
                                var productAmount = products.length;
                                for(var j = 0; j < productAmount; j++) {
                                    var product = products[j];
                                    var newValue = product[productKey] || '';
                                    window._ti[productKey] = window._ti[productKey] || '';
                                    window._ti[productKey] =
                                        window._ti[productKey] + newValue + (j === productAmount - 1 ? '' : ';');
                                }
                            }
                        })(window._ti.products);
                    }
                </script>
                <?php }
	}

	/**
	 * Writes general product information to dataLayer.
	 * @param bool $write_to_array default false, should be set to true if used in item archive loop
	 * @param integer $product_id (optional) if not given, id of post is used
	 * @param bool $is_collection_child
	 */
	public function get_product_info(
		$write_to_array = false,
		$product_id = 0,
		$is_collection_child = false
	) {
		if (
			($this->woocommerce_enabled && is_shop()) ||
			is_product_category() ||
			is_product_tag() ||
			is_product() ||
			is_order_received_page()
		) {
			// handling beginning of loop loop in case of product archive
			if ($write_to_array) {
				$this->current_product = [];
			}

			if ($product_id === 0) {
				$product = wc_get_product(get_the_ID());
			} else {
				$product = wc_get_product($product_id);
			}

			if ($product !== false) {
				$product_id = $product->get_id();
				$this->product_to_datalayer(
					"productName",
					$product->get_title(),
					$write_to_array,
					$is_collection_child
				);
				$this->product_to_datalayer(
					"productCost",
					$product->get_price(),
					$write_to_array,
					$is_collection_child
				);
				$this->product_to_datalayer(
					"productId",
					strval($product_id),
					$write_to_array,
					$is_collection_child
				);
				$this->product_to_datalayer(
					"productSKU",
					$product->get_sku(),
					$write_to_array,
					$is_collection_child
				);
				$this->datalayer["currency"] = get_woocommerce_currency();
				$this->product_to_datalayer(
					"productQuantity",
					"1",
					$write_to_array,
					$is_collection_child
				);

				// stock
				$stock = $product->get_stock_status();
				if ($stock === "outofstock") {
					$this->product_to_datalayer(
						"productSoldOut",
						"1",
						$write_to_array,
						$is_collection_child
					);
				}

				// attributes for variable products
				if ($product->get_type() === "variation") {
					$attributes = $product->get_attributes();
					if (count($attributes) > 0) {
						$this->product_to_datalayer(
							"productAttributes",
							$attributes,
							$write_to_array,
							$is_collection_child
						);
					}
				}
			}

			// handling end of loop in case of product archive or product collection child
			if ($write_to_array || $is_collection_child) {
				$this->datalayer["products"] = isset(
					$this->datalayer["products"]
				)
					? $this->datalayer["products"]
					: [];
				$this->current_product["taxonomies"] = Helper::get_taxonomies(
					$product_id
				);
				array_push(
					$this->datalayer["products"],
					$this->current_product
				);
				$this->current_product = [];
			}

			// handling Product collection
			if (
				$is_collection_child === false &&
				isset($this->datalayer["taxonomies"]["product_type"][0]) &&
				$this->datalayer["taxonomies"]["product_type"][0] === "grouped"
			) {
				$children = $product->get_children();
				foreach ($children as $child) {
					$this->get_product_info(false, $child, true);
				}
				// set the right price for collection product (sum of all products)
				$corrected_price = 0;
				if (isset($this->datalayer["products"])) {
					foreach ($this->datalayer["products"] as $product) {
						$corrected_price += $product["productCost"];
					}
					$this->datalayer["productCost"] = preg_replace(
						"/^\d+;/",
						$corrected_price . ";",
						$this->datalayer["productCost"]
					);
					// setting taxonomies
					$this->handle_multiple_product_taxonomies();
				}
			}
		}
	}

	// Product helper methods

	/**
	 * Sets the product category keys if data is available
	 * @param $object  array dataLayer or product in products array
	 */
	private function add_product_categories_based_on_taxonomies_helper(&$object)
	{
		if (isset($object["taxonomies"]["product_cat"])) {
			$object["productCategories"] = $object["taxonomies"]["product_cat"];
			if (isset($object["taxonomies"]["product_cat"][0])) {
				$object["productCategory"] =
					$object["taxonomies"]["product_cat"][0];
			}
			if (isset($object["taxonomies"]["product_cat"][1])) {
				$object["productSubcategory"] =
					$object["taxonomies"]["product_cat"][1];
			}
		}
	}

	/**
	 * Creates productCategory dataLayer keys based in data in taxonomy key.
	 * Therefore it needs to be executed after woo item loop.
	 */
	public function add_product_categories_based_on_taxonomies()
	{
		if (isset($this->datalayer["taxonomies"]["product_cat"])) {
			$this->add_product_categories_based_on_taxonomies_helper(
				$this->datalayer
			);
		}
		if (isset($this->datalayer["products"])) {
			foreach ($this->datalayer["products"] as &$product) {
				$this->add_product_categories_based_on_taxonomies_helper(
					$product
				);
			}
		}
	}

	/**
	 * Rewrites taxonomies and product-categories in ;-syntax,
	 * solely based on data in dataLayer.
	 * The 1st product will be the group product, and the child products are
	 * saved in products array by now. We just need to enrich the group
	 * product data here with the data from the products.
	 */
	private function handle_multiple_product_taxonomies()
	{
		$product_count = substr_count($this->datalayer["productId"], ";"); // excluding group product
		$all_taxonomies = array_keys($this->datalayer["taxonomies"]); // init with group product taxes
		foreach ($this->datalayer["products"] as $product) {
			// get all taxonomy keys from all products
			$all_taxonomies = array_merge(
				$all_taxonomies,
				array_keys($product["taxonomies"])
			);
		}
		$all_taxonomies = array_unique($all_taxonomies);
		// get the max. count of each taxonomy in all products
		$max_tax_value_count = [];
		foreach ($all_taxonomies as $taxonomy) {
			//init based on group product
			$max_tax_value_count[$taxonomy] = isset(
				$this->datalayer["taxonomies"][$taxonomy]
			)
				? count($this->datalayer["taxonomies"][$taxonomy])
				: 0;
		}
		foreach ($this->datalayer["products"] as $product) {
			foreach ($product["taxonomies"] as $key => $value) {
				if (count($value) > $max_tax_value_count[$key]) {
					$max_tax_value_count[$key] = count($value);
				}
			}
		}
		// mutate taxonomy prop in dataLayer
		for ($i = 0; $i < $product_count; $i++) {
			// the child products are the first ones in product array
			$product = $this->datalayer["products"][$i];
			foreach (
				$max_tax_value_count
				as $taxonomy_name => $taxonomy_values
			) {
				for ($j = 0; $j < $max_tax_value_count[$taxonomy_name]; $j++) {
					$additional_value = isset(
						$product["taxonomies"][$taxonomy_name][$j]
					)
						? $product["taxonomies"][$taxonomy_name][$j]
						: "";
					$current_value = isset(
						$this->datalayer["taxonomies"][$taxonomy_name][$j]
					)
						? $this->datalayer["taxonomies"][$taxonomy_name][$j]
						: "";
					$this->datalayer["taxonomies"][$taxonomy_name][$j] =
						$current_value . ";" . $additional_value;
				}
			}
		}
	}

	/**
	 * Sets product status in dataLayer
	 * @param string $status  view | add | conf
	 */
	public function get_product_status($status)
	{
		$this->datalayer["shoppingCartStatus"] = $status;
	}

	/**
	 * Creates productCollection key in dataLayer,
	 * based on product type: grouped => 1, other => 0
	 */
	public function create_is_collection_info()
	{
		$output = "";
		foreach (
			explode(";", $this->datalayer["taxonomies"]["product_type"][0])
			as $item
		) {
			$output .= ($item === "grouped" ? "1" : "0") . ";";
		}
		$this->datalayer["productCollection"] = preg_replace(
			'/;$/',
			"",
			$output
		);
	}

	/**
	 * Adds JS-eventListener on product pages to track 'adding products to cart'
	 * @param $is_ti boolean
	 */
	public function track_add_product_single($is_ti)
	{
		if ($this->woocommerce_enabled && is_product()) { ?>
                <script>
                    jQuery( document ).on( 'click', '.single_add_to_cart_button', function(event) {
						if(event.target.classList.contains('disabled')) {
							return;
						}

						var productGroupQtyInputs = document.querySelectorAll('form.grouped_form input.qty');
						var quantity = document.querySelector('input[name="quantity"]');
						var productQuantity, getProductCost;
						if(quantity) {
							productQuantity = quantity.value;
							getProductCost = function(data){return productQuantity * data.productCost};
						} else if(productGroupQtyInputs) {
							var isAllZero = true;
							var count =  productGroupQtyInputs.length;
							for(var i = 0; i < count; i++){
								if(productGroupQtyInputs[i].value > 0) {
									isAllZero = false;
								}
								productQuantity =
									(productQuantity ? productQuantity : '1') + ';' + productGroupQtyInputs[i].value;
							}
							if(isAllZero) {
								return;
							}

							getProductCost = function(data){
								var output = '';
								var sum = 0;
								var r = /([0-9]+?)(?:;|$)/g;
								var costs = [];
								var match;
								while((match = r.exec(data.productCost)) !== null) {
									costs.push(match[1]);
								}

								for(var i = 0; i < count; i++){
									var addedCost = productGroupQtyInputs[i].value * costs[i + 1];
									output += ';' +  addedCost;
									sum += addedCost;
								}
								return sum + output;
							};
						}

                    	<?php if ($is_ti) { ?>
                        window._ti.shoppingCartStatus = 'add';
                        var backup = JSON.stringify(window._ti);

						window._ti.productQuantity = productQuantity;
						window._ti.productCost = getProductCost(window._ti);

                        if (window.wts) {
                            window.wts.push(['send', 'pageupdate']);
                        }
                        window._ti = JSON.parse(backup);
                        <?php } else { ?>
						var GTMId = (function() {
							if (window.google_tag_manager) {
								var gtmRegex = /^GTM-[A-Z0-9]{1,7}$/;
								for(var gtmProp in window.google_tag_manager){
									if(window.google_tag_manager.hasOwnProperty(gtmProp) && gtmRegex.test(gtmProp)) {
										return gtmProp;
									}
								}
								return false;
							} else {
								return false;
							}
						})();

						if(GTMId) {
							(function(){
								var mappData = window.google_tag_manager[GTMId].dataLayer.get('mapp');
								var productCost = getProductCost(mappData);
								var gtm_backup = JSON.stringify(mappData);
								mappData.shoppingCartStatus = 'basket';
								mappData['gtmProductArray'][0]['status'] = 'basket';
								if (productQuantity) {
									mappData.productQuantity = productQuantity;
									mappData.productCost = productCost;
									mappData['gtmProductArray'][0]['quantity'] = productQuantity;
									mappData['gtmProductArray'][0]['cost'] = productCost;
								}
								window.dataLayer = window.dataLayer || [];
								window.dataLayer.push({
									event: 'mapp.load',
									mapp: mappData
								});
								window.dataLayer.push({
									event: 'mapp.restore',
									mapp: JSON.parse(gtm_backup)
								});
							}());
						}

						<?php } ?>
                    });
                </script>
                <?php }
	}

	/**
	 * Adds JS-eventListener on product archive pages to track 'adding products to cart'
	 * @param $is_ti boolean
	 */
	public function track_add_product_archive($is_ti)
	{
		if (
			$this->woocommerce_enabled &&
			(is_shop() ||
				is_product_category() ||
				is_product_tag() ||
				is_product())
		) { ?>
                <script>
                    jQuery( document ).on( 'added_to_cart', function(_, __, ___, el) {

                        var a = jQuery(el[0]).data();
                        var findProduct = false;
                        findProduct = function(id, products) {
                            for (var i = 0; i < products.length; i++) {
                                if(products[i].productId == id) { // will compare int with string!
                                    return i;
                                }
                            }
                        };
                        	<?php if ($is_ti) { ?>
								// --- TI ---
							var productIndex = findProduct(a.product_id, _ti.products);
							if(productIndex!== false) { // needs to be specific because it can be 0
								//backup
								var oldProduct = JSON.stringify(window._ti);

								// add product
								for (var key in window._ti.products[productIndex]) {
									if(window._ti.products[productIndex].hasOwnProperty(key)) {
										window._ti[key] = window._ti.products[productIndex][key];
									}
								}
								window._ti.productValue = window._ti.products[productIndex]['productCost'] * a.quantity;

								if (window.wts) {
									window._ti.shoppingCartStatus = 'view';
									window._ti.pageRequestType = "virtual";
									window.wts.push(['send', 'pageupdate']);
									setTimeout(function(){
										window._ti.shoppingCartStatus = 'add';
										window.wts.push(['send', 'pageupdate']);
										// restore
										window._ti = JSON.parse(oldProduct);
									}, 0);
								}
							}
							<?php } else { ?>
								// --- GTM ---
								var GTMId = (function() {

									if (window.google_tag_manager) {
										var gtmRegex = /^GTM-[A-Z0-9]{1,7}$/;
										for(var gtmProp in window.google_tag_manager){
											if(window.google_tag_manager.hasOwnProperty(gtmProp) && gtmRegex.test(gtmProp)) {
												return gtmProp;
											}
										}
										return false;
									} else {
										return false;
									}
								})();

								if(GTMId) {

									var mappData = window.google_tag_manager[GTMId].dataLayer.get('mapp');
									mappData['gtmProductArray'] = [{}];
									var gtmProductIndex = findProduct(a.product_id, mappData.products);
									if(gtmProductIndex !== false) { // needs to be specific because it can be 0
										// backup
										var backup = JSON.stringify(mappData);
										// add product
										var pickedProduct = mappData.products[gtmProductIndex];

										for (var key_ in pickedProduct) {
											if(pickedProduct.hasOwnProperty(key_)) {
												mappData[key_] = pickedProduct[key_];
											}
										}

										mappData['gtmProductArray'][0]['id'] = pickedProduct.productId + ' - ' +  pickedProduct.productName;
										mappData['gtmProductArray'][0]['id_only'] = pickedProduct.productId;
										mappData['gtmProductArray'][0]['name'] = pickedProduct.productName;
										mappData['gtmProductArray'][0]['sku'] = pickedProduct.productSKU;

										if(pickedProduct.productSoldOut) {
											mappData['gtmProductArray'][0]['soldOut'] = pickedProduct.productSoldOut === "1";
										}

										if(pickedProduct.taxonomies) {
											for (var taxonomieName in pickedProduct.taxonomies) {
												if(pickedProduct.taxonomies.hasOwnProperty(taxonomieName)) {
													var taxValues = pickedProduct.taxonomies[taxonomieName].reverse();
													for(var i = 0; i < taxValues.length; i++) {
														mappData['gtmProductArray'][0][taxonomieName + '_' + i] = taxValues[i];
													}
												}
											}
										}

										mappData.productValue = pickedProduct['productCost'] * a.quantity;
										mappData['gtmProductArray'][0]['cost'] = pickedProduct['productCost'] * a.quantity;
										mappData['gtmProductArray'][0]['quantity'] = a.quantity;

										window.dataLayer = window.dataLayer || [];
										mappData.shoppingCartStatus = 'view';
										mappData['gtmProductArray'][0]['status'] = 'view';
										mappData.pageRequestType = "virtual";
										window.dataLayer.push({ event: 'mapp.load', mapp: mappData });

										setTimeout(function(){
											mappData.shoppingCartStatus = 'basket';
											mappData['gtmProductArray'][0]['status'] = 'basket';
											window.dataLayer.push({ event: 'mapp.load', mapp: mappData });
											// restore
											mappData = JSON.parse(backup);
											window.dataLayer.push({ event: 'mapp.restore', mapp: mappData });
										}, 0);
									}
								}
							<?php } ?>

                    });
                </script>
                <?php }
	}

	/**
	 * Adds JS eventListener when a product variation is selected, sends product view of variation
	 * @param $is_ti boolean
	 */
	public function product_variant_events($is_ti)
	{
		if ($this->woocommerce_enabled && is_product()) { ?>
                <script>
                    jQuery( document ).on( 'found_variation', function( event, product_variation ) {
                    	<?php if ($is_ti) { ?>
							window.wts = window.wts || [];
							if(window._ti) {
								for(var attribute in product_variation.attributes) {
									if(product_variation.attributes.hasOwnProperty(attribute)) {
										var newKey = attribute.replace('attribute_','');
										window._ti.taxonomies[newKey] = [product_variation.attributes[attribute]];
									}
								}
								window._ti.productCost = product_variation.display_price + "";
								window._ti.productId = product_variation.variation_id + "";
								window._ti.productSKU = product_variation.sku;
								if(!product_variation.is_in_stock) {
									window._ti.productSoldOut = '1';
								}
								window.wts.push(['send', 'pageupdate']);
							}
						<?php } else { ?>
							(function(){
								window.dataLayer = window.dataLayer || [];
								var _tmp = {};
								_tmp['gtmProductArray'] = [{}];
								_tmp['taxonomies'] = {};
								for(var attribute in product_variation.attributes){
									if(product_variation.attributes.hasOwnProperty(attribute)) {
										var newKey = attribute.replace('attribute_','');
										_tmp['gtmProductArray'][0][newKey + '_0'] = product_variation.attributes[attribute];
										_tmp['taxonomies'][newKey] = [product_variation.attributes[attribute]];
									}
								}
								var productName = document.querySelector('.product_title').innerText;
								if(productName) {
									_tmp.productName = productName;
									_tmp['gtmProductArray'][0]['name'] = productName;
									_tmp['gtmProductArray'][0]['id'] = product_variation.variation_id + " - " + productName;
								} else {
									_tmp['gtmProductArray'][0]['id'] = product_variation.variation_id + "";
								}
								_tmp['gtmProductArray'][0]['cost'] = product_variation.display_price + "";
								_tmp.productCost = product_variation.display_price + "";
								_tmp['gtmProductArray'][0]['id_only'] = product_variation.variation_id + "";
								_tmp.productId = product_variation.variation_id + "";
								_tmp['gtmProductArray'][0]['sku'] = product_variation.sku;
								_tmp.productSKU = product_variation.sku;
								if(!product_variation.is_in_stock) {
									_tmp['gtmProductArray'][0]['soldOut'] = '1';
									_tmp.productSoldOut = '1';
								}
								_tmp['gtmProductArray'][0]['status'] = 'view';
								window.dataLayer.push({
									event: 'mapp.load',
									mapp: _tmp
								});
							}());
						<?php } ?>
                    })
                </script>
                <?php }
	}

	public function create_gtm_product_array()
	{
		if (
			$this->woocommerce_enabled &&
			(is_shop() ||
				is_product_category() ||
				is_product_tag() ||
				is_product() ||
				is_order_received_page())
		) {
			$gtm_array_key = "gtmProductArray";

			if (
				is_order_received_page() &&
				isset($this->datalayer["products"])
			) {
				$this->datalayer[$gtm_array_key] = [];
				for ($i = 0; $i < count($this->datalayer["products"]); $i++) {
					array_push(
						$this->datalayer[$gtm_array_key],
						$this->gtm_product_parser(
							$this->datalayer["products"][$i]
						)
					);
				}
			} else {
				$this->datalayer[$gtm_array_key] = [
					$this->gtm_product_parser($this->datalayer),
				];
			}
		}
	}

	private function gtm_product_parser($product_entry)
	{
		$gtm_product_array = [];
		$keys = ["id", "cost", "quantity", "name", "collection"];

		foreach ($keys as $key) {
			$this->create_gtm_product_entry(
				$gtm_product_array,
				$product_entry,
				$key
			);
		}
		if (isset($product_entry["productSoldOut"])) {
			$gtm_product_array["soldOut"] =
				$product_entry["productSoldOut"] === "1";
		}

		if (isset($product_entry["shoppingCartStatus"])) {
			$gtm_product_array["status"] = $product_entry["shoppingCartStatus"];
		} elseif (isset($this->datalayer["shoppingCartStatus"])) {
			$gtm_product_array["status"] =
				$this->datalayer["shoppingCartStatus"];
		}
		if (isset($gtm_product_array["status"])) {
			if ($gtm_product_array["status"] === "conf") {
				$gtm_product_array["status"] = "confirmation";
			} elseif ($gtm_product_array["status"] === "add") {
				$gtm_product_array["status"] = "basket";
			}
		}

		if (
			isset($product_entry["productId"]) &&
			isset($product_entry["productName"])
		) {
			if (preg_match("/;/", $product_entry["productId"])) {
				// product collections
				preg_match_all(
					"/([0-9]+?)(?:;|$)/",
					$product_entry["productId"],
					$ids
				);
				$ids = $ids[1];
				preg_match_all(
					"/(.+?)(?:;|$)/",
					$product_entry["productName"],
					$names
				);
				$names = $names[1];
				$gtm_product_array["id"] = "";
				for ($i = 0; $i < count($ids); $i++) {
					$gtm_product_array["id"] =
						$gtm_product_array["id"] .
						";" .
						$ids[$i] .
						" - " .
						$names[$i];
				}
				$gtm_product_array["id"] = substr($gtm_product_array["id"], 1);
			} else {
				$gtm_product_array["id"] =
					$product_entry["productId"] .
					" - " .
					$product_entry["productName"];
			}
			$gtm_product_array["id_only"] = $product_entry["productId"];
		}
		if (isset($product_entry["productSKU"])) {
			$gtm_product_array["sku"] = $product_entry["productSKU"];
		}

		if (isset($product_entry["taxonomies"])) {
			foreach ($product_entry["taxonomies"] as $tax_name => $tax_values) {
				//					$reversed_tax_values = array_reverse($tax_values);
				for ($i = 0; $i < count($tax_values); $i++) {
					$gtm_product_array[$tax_name . "_" . $i] = $tax_values[$i];
				}
			}
		}

		if (isset($product_entry["productAttributes"])) {
			foreach (
				$product_entry["productAttributes"]
				as $attribute_name => $attribute_value
			) {
				$gtm_product_array[
					"attribute_" . $attribute_name
				] = $attribute_value;
			}
		}

		return $gtm_product_array;
	}

	private function create_gtm_product_entry(
		&$product_array,
		&$product_entry,
		$key
	) {
		$property_name = "product" . ucwords($key);
		if (isset($product_entry[$property_name])) {
			$product_array[$key] = $product_entry[$property_name];
		}
	}
}
