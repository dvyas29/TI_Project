const mongoose = require("mongoose");
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

const DishSchema = new mongoose.Schema({
  
   restid :{
       type: mongoose.Schema.ObjectId,
       ref: 'User',
       required: true
   },
   name:{
       type: String,
       required:[true, 'Dish name must be specified!']

   },
   ingredients: {
    type: String,
    required:[true, 'Ingredients of the dish must be specified!'],
   
},
   dishImageUrl: String,
   price :{
    type: SchemaTypes.Double,
    required:[true, 'Price of the dish must be specified!'],
    
},
   description:{
    type: String,
    required:[true, 'Description of the dish must be specified!'],
    
},
   category :{
    type: String,
    required:[true, 'Category of the dish must be specified!'],
    enum:['Appetizer','Salads','Main Course','Desserts','Beverages']
    
},
   type :{
    type: String,
    required:[true, 'Type of the dish must be specified!'],
    enum:['veg', 'non-veg', 'vegan']
   },
   createdAt:{
    type: Date,
    default:Date.now
}
});

module.exports = mongoose.model('Dish', DishSchema);