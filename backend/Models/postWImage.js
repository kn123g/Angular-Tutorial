const mongoose = require("mongoose");

const postWImageSchema = mongoose.Schema(
  {
    title:
    {type:String,required:true},
    content:
    {type:String,required:true},
    image:
    {type:String,required:true},
    creator : 
    {type:mongoose.Schema.Types.ObjectId,ref : "User",required : true}
  });

  module.exports = mongoose.model('postWImage',postWImageSchema); 

