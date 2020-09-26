var express = require('express');
var router = express.Router();
router.use(express.static(__dirname+'./public'));
var userModule=require('../modules/user');
var pass_catModel=require('../modules/category')
var passModel=require('../modules/add_password')


var bcrypt = require('bcrypt');
var jwt =require('jsonwebtoken');
const { render } = require('ejs');
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
var getPass_cat=pass_catModel.find({});
var pass_del=passModel.find({});


/* GET home page. */
/* checklogin middleware*/
function checkloginUser(req,res,next){
  try {
    var usertoken=localStorage.getItem('usertoken');
    var decoded = jwt.verify(usertoken, 'loginToken');
  } catch(err) {
    res.redirect('/');
  }
  next();
}
/* check mail Middleware */
function checkMail(req,res,next){
  var email=req.body.email;
  var checkmail=userModule.findOne({email:email});
  checkmail.exec((err,data)=>{
    if(err) throw err;
    if(data){
      return res.render('signup', { title: 'signup',msg:'',errmsg:'Email already exist...' });
    }
    next();
  });
}
/* ------ */
router.get('/', checkloginUser,function(req, res, next) {
    var loginUser=localStorage.getItem('loginuser');
   
    res.render('addcategory', { title: 'category',loginUser:loginUser,msg:'',errmsg:'' });
  
  
  });
  router.post('/', checkloginUser,function(req, res, next) {
    var loginUser=localStorage.getItem('loginuser');
    var cat_name=req.body.category;
    var pass_catDetails = new pass_catModel({
      cat_name:cat_name
    });
    pass_catDetails.save(function(err,doc){
      if(err) throw err;
      res.render('addcategory', { title: 'category',loginUser:loginUser,msg:'Category added successfully!',errmsg:'' });
    });
    
   
  });
  module.exports = router;