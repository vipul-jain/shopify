var express = require('express');
var router = express.Router();
var shopifyAPI = require('shopify-node-api');
var config = {
    shop: 'shopifyteststore-11.myshopify.com', // MYSHOP.myshopify.com
    shopify_api_key: '39c135d701e85b561c6b5fe864b879c2', // Your API key
    shopify_shared_secret: 'd3c1715c798d17a1d1ea64f6cd00840e', // Your Shared Secret
    redirect_uri: 'http://localhost:3000/users',
    shopify_scope: 'write_shipping,write_fulfillments,read_orders,write_orders'
};
var Shopify = new shopifyAPI(config);
var auth_url = Shopify.buildAuthURL();


/* GET home page. */
router.get('/', function(req, res) {
    res.redirect(auth_url);
  //res.render('index', { title: 'Express' });
});

module.exports = router;
