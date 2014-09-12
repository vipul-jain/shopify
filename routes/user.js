var express = require('express');
var router = express.Router();
var request = require('request');

var shopifyAPI = require('shopify-node-api');
var config = {
    shop: 'shopifyteststore-11.myshopify.com', // MYSHOP.myshopify.com
    shopify_api_key: '39c135d701e85b561c6b5fe864b879c2', // Your API key
    shopify_shared_secret: 'd3c1715c798d17a1d1ea64f6cd00840e', // Your Shared Secret
    redirect_uri: 'http://localhost:3000/users',
    shopify_scope: 'write_shipping,write_fulfillments,read_orders,write_orders'
};

/* GET users listing. */
router.get('/', function(req, res) {
    console.log("here");
//    console.log(res);
    var Shopify = new shopifyAPI(config), // You need to pass in your config here
        query_params = req.query;

    Shopify.exchange_temporary_token(query_params, function(err, data){
        // This will return successful if the request was authentic from Shopify
        // Otherwise err will be non-null.
        // The module will automatically update your config with the new access token
        // It is also available here as data['access_token']

        console.log("Inside Oauth");
        console.log(data);
        console.log("here i suppose the token");
//        console.log(data['access_token']);
        var accessToken = data['access_token'];
        createCarrierService(accessToken);
    });

  res.send('Welcome');
});

function createCarrierService(accessToken){
    var post_data = {
        "carrier_service": {
            "name": "Shipping WebOsmotic",
            "callback_url": "http://webashlar.com/data.json",
            "format": "json",
            "service_discovery": true
        }
    }

    var headers_data = {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken
    }

    request.post({
        url: 'https://'+ config.shop +'/admin/carrier_services',
        headers: headers_data,
        body:JSON.stringify(post_data)
    }, function(error, response, body){
        console.log("inside")
        console.log(body);
    });
}

module.exports = router;
