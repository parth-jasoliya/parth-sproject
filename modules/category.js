const mongoose = require ('mongoose');
mongoose.connect('mongodb+srv://parth2:parth123@cluster0.bvnks.mongodb.net/pms', {
    useNewUrlParser: true,
   
    useCreateIndex: true
  });
  var conn = mongoose.Collection;
  var catSchema= mongoose.Schema({
      cat_name:{
          type:String,
          required:true,
          
         
      },

    
      date:{
          type:Date,
          default:Date.now
      }
  }); 
  var pass_catModel =  mongoose.model('password_category',catSchema);
  module.exports=pass_catModel;
