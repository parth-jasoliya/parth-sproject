const mongoose = require ('mongoose');
mongoose.connect('mongodb+srv://parth2:parth123@cluster0.bvnks.mongodb.net/pms', {
    useNewUrlParser: true,

    useCreateIndex: true
  });
  var conn = mongoose.Collection;
  var passSchema= mongoose.Schema({
      cat_name:{
          type:String,
          required:true,
                   
      },
      pro_name:{
        type:String,
        required:true
       
    },
    pass_detail:{
        type:String,
        required:true
       
    },

    
      date:{
          type:Date,
          default:Date.now
      }
  }); 
  var passModel =  mongoose.model('password_details',passSchema);
  module.exports=passModel;
