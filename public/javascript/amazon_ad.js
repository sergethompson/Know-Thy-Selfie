
function grab_rand_ad(){
	var ad_arr = ["B003B2GTY0;","B008GVXL1A;","B007HR9W44;"]//used amzn_assoc_placement and amzn_assoc_asins
	var rand_ad = Math.floor(Math.random()*ad_arr.length);
	'amzn_assoc_ad_type = "product_link";'
	+'amzn_assoc_tracking_id = "knothysel-20";'
	+'amzn_assoc_marketplace = "amazon";'
	+'amzn_assoc_region = "US";'
	+('amzn_assoc_placement = ' + ad_arr[rand_ad])
	+('amzn_assoc_asins = ' + ad_arr[rand_ad])
	+'amzn_assoc_show_border = true;'
	+'amzn_assoc_link_opens_in_new_window = true;'
};
