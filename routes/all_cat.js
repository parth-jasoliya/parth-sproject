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
router.get('/',checkloginUser, function(req, res, next) {
    var loginUser=localStorage.getItem('loginuser');
    var perPage = 3;
    var page = req.params.page || 1;
    getPass_cat.skip((perPage * page) - perPage)
           .limit(perPage).exec(function(err,data){
      if(err) throw err;
       pass_catModel.countDocuments({}).exec((err,count)=>{
      res.render('category', { title: 'category',loginUser:loginUser,msg:'',errmsg:'',records:data,current: page,
           pana: Math.ceil(count / perPage) });
      });
       });    
   
  });
router.get('/:page',checkloginUser, function(req, res, next) {
    var loginUser=localStorage.getItem('loginuser');
    var perPage = 3;
    var page = req.params.page || 1;
    getPass_cat.skip((perPage * page) - perPage)
           .limit(perPage).exec(function(err,data){
      if(err) throw err;
       pass_catModel.countDocuments({}).exec((err,count)=>{
      res.render('category', { title: 'category',loginUser:loginUser,msg:'',errmsg:'',records:data,current: page,
           pana: Math.ceil(count / perPage) });
      });
       });    
   
  });
  router.get('/delete/:id',checkloginUser, function(req, res, next) {
    var loginUser=localStorage.getItem('loginuser');
    var getCat_id = req.params.id;
   var det_cat = pass_catModel.findByIdAndDelete(getCat_id);
    
   det_cat.exec(function(err){
      if(err) throw err;
      res.redirect('/category'); 
      });
    
   
  });
  router.get('/edit/:id',checkloginUser, function(req, res, next) {
    var loginUser=localStorage.getItem('loginuser');
    var getCat_id = req.params.id;
   var get_cat = pass_catModel.findById(getCat_id);
    
   get_cat.exec(function(err,data){
      if(err) throw err;
      res.render('edit_cat', { title: 'category',loginUser:loginUser,msg:'',errmsg:'',records:data,id:getCat_id});
      
      });
    
   
  });
  router.post('/edit',checkloginUser, function(req, res, next) {
    var loginUser=localStorage.getItem('loginuser');
    var getCat_id = req.body.id;
    var new_cat=req.body.editcategory;
   var update_cat = pass_catModel.findByIdAndUpdate(getCat_id,{cat_name:new_cat});
    
   update_cat.exec(function(err,data){
      if(err) throw err;
      res.redirect('/category');
      
      });
    
   
  });
  
  module.exports = router;