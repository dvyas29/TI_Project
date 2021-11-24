var connection =  new require('./kafka/Connection');
const connectDB = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");


//topics files
//var signin = require('./services/signin.js');
var deliveryAddresses = require('./services/deliveryAddresses.js');
var register = require('./services/register.js');
var getDeliveryAddresses = require("./services/getDeliveryAddresses");
var login = require("./services/login");
var addDish = require("./services/addDish");
var getDishesForARest = require("./services/getDishesForARest");
var addFavs = require("./services/addFavs");
var getFavs = require("./services/getFavs");
var getRestAsFav = require("./services/getRestAsFav");
var removeFavs = require("./services/removeFavs");
var getDish = require("./services/getDish");
var editDish = require("./services/editDish");
var updateDishImage = require("./services/updateDishImage");
var addOrderDetails = require("./services/addOrderDetails");
var getOrderDetails = require("./services/getOrderDetails");
var editDish = require("./services/editDish");
var updateDishImage = require("./services/updateDishImage");
var addOrderDetails = require("./services/addOrderDetails");
var updateOrderDetails = require("./services/updateOrderDetails");
var getAllOrdersCustomer = require("./services/getAllOrdersCustomer");
var getAllOrdersRestaurant = require("./services/getAllOrdersRestaurant");
var filterOrderDetailsRestaurant = require("./services/filterOrderDetailsRestaurant");
var filterOrderDetailsCust = require("./services/filterOrderDetailsCust");
var getAllRest = require("./services/getAllRest");
var getUserProfile = require("./services/getUserProfile");
var updateUserProfile = require("./services/updateUserProfile");
var getUserProfileFromId = require("./services/getUserProfileFromId");
var getUserProfileFromIdPost = require("./services/getUserProfileFromIdPost");getImage
var getImage = require("./services/getImage");
var addImage = require("./services/addImage");
var uploadImageS3 = require("./services/uploadImageS3");


//connect to Db
connectDB();

//handling topic request
function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log("msg value", JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle error------'+err+'after handle response------'+res);
            if(err){
                var payloads = [
                    { topic: data.replyTo,
                        messages:JSON.stringify({
                            correlationId:data.correlationId,
                            data : err,
                            err: true
                        }),
                        partition : 0
                    }
                ];
            }else if(res){
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];}
            producer.send(payloads, function(error, data){
                console.log("data in handle request  ",data);
                console.log("error in handle request  ",error);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("post_deliveryAddresses", deliveryAddresses);
handleTopicRequest("get_deliveryAddresses", getDeliveryAddresses);
handleTopicRequest("post_register", register);
handleTopicRequest("login", login);
handleTopicRequest("post_addDish", addDish);
handleTopicRequest("get_DishesForARest", getDishesForARest);
handleTopicRequest("post_addFavs", addFavs);
handleTopicRequest("get_getFavs", getFavs);
handleTopicRequest("get_getRestAsFav", getRestAsFav);
handleTopicRequest("delete_removeFavs", removeFavs);
handleTopicRequest("post_editDish", editDish);
handleTopicRequest("get_getDish", getDish);
handleTopicRequest("update_updateDishImage", updateDishImage);
handleTopicRequest("post_addOrderDetails", addOrderDetails);
handleTopicRequest("get_getOrderDetails", getOrderDetails);
handleTopicRequest("update_updateOrderDetails", updateOrderDetails);
handleTopicRequest("get_getAllOrdersCustomer", getAllOrdersCustomer);
handleTopicRequest("get_getAllOrdersRestaurant", getAllOrdersRestaurant);
handleTopicRequest("post_filterOrderDetailsRestaurant", filterOrderDetailsRestaurant);
handleTopicRequest("post_filterOrderDetailsCust", filterOrderDetailsCust);
handleTopicRequest("get_getAllRest", getAllRest);
handleTopicRequest("get_getUserProfile", getUserProfile);
handleTopicRequest("update_updateUserProfile", updateUserProfile);
handleTopicRequest("get_getUserProfileFromId", getUserProfileFromId);
handleTopicRequest("post_getUserProfileFromIdPost", getUserProfileFromIdPost);
handleTopicRequest("get_getImage", getImage);//npot working as it doesnt have access to req.user
handleTopicRequest("post_addImage", addImage);
handleTopicRequest("get_uploadImageS3", uploadImageS3);