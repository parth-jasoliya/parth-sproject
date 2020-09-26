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

  router.get('/', function(req, res, next) {
    var loginUser=localStorage.getItem('loginuser');
    if(loginUser){
      res.redirect('./dashboard');
    }else{
    res.render('signup', { title: 'signup',msg: '',errmsg:'' });
    }
  });
  router.post('/',checkMail, function(req, res, next) {
    var username=req.body.username;
    var email=req.body.email;
    var password=req.body.password;
    var cpassword=req.body.cpassword;
    if(password != cpassword){
      res.render('signup', { title: 'signup',msg:'',errmsg:'Password did not match!!!'});
  
    }else{
      password=bcrypt.hashSync(req.body.password,10);
      var userDetails= new userModule({
      username:username,
      email:email,
      password:password
  
    });
    userDetails.save((err,doc)=>{
      if(err) throw err;
      res.render('signup', { title: 'signup',msg:'Register successfully!!',errmsg:'' });
  
    });
  }
  });
  module.exports = router;