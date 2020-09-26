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
    var perPage = 3;
    var page = req.params.page || 1;
    pass_del.skip((perPage * page) - perPage)
           .limit(perPage).exec(function(err,data){
         if(err) throw err;
         passModel.countDocuments({}).exec((err,count)=>{
           res.render('allpassword', { title: 'category',loginUser:loginUser,records: data,
           current: page,
           pages: Math.ceil(count / perPage)});
         });
    });
   
  });
  router.get('/:page', checkloginUser,function(req, res, next) {
    var loginUser=localStorage.getItem('loginuser');
    var perPage = 3;
    var page = req.params.page || 1;
    pass_del.skip((perPage * page) - perPage)
           .limit(perPage).exec(function(err,data){
         if(err) throw err;
         passModel.countDocuments({}).exec((err,count)=>{
           res.render('allpassword', { title: 'category',loginUser:loginUser,records: data,
           current: page,
           pages: Math.ceil(count / perPage)});
         });
    });
   
  });
  module.exports = router;