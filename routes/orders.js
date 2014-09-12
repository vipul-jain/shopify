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

    var jsonStr = getOrders("bf9de31abce57163640da473075d8ec6", res);
});

function getOrders(accessToken, res){
    var headers_data = {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken
    }

    request.get({
        url: 'https://'+ config.shop +'/admin/orders',
        headers: headers_data
    }, function(error, response, body){
        console.log("inside")
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.send(body);
    });
}


module.exports = router;
