const mongoose = require ('mongoose');
mongoose.connect('mongodb+srv://parth2:parth123@cluster0.bvnks.mongodb.net/pms', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
  var conn = mongoose.Collection;
  var userSchema= mongoose.Schema({
      username:{
          type:String,
          required:true,
          index:{
              unique:true
          }
      },
      email:{
        type:String,
        required:true,
        index:{
            unique:true
        }

      },
      password:{
          type:String,
          required:true
      },
      date:{
          type:Date,
          default:Date.now
      }
  }); 
  var userModel =  mongoose.model('users',userSchema);
  module.exports=userModel;
