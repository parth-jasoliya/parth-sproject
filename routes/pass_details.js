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
    res.redirect('/dashboard');
  });
  router.get('/edit/:id', checkloginUser,function(req, res, next) {
    var loginUser=localStorage.getItem('loginuser');
    var id=req.params.id;
   var getpass_details= passModel.findById({_id:id})
   getpass_details.exec((err,data)=>{
      if(err) throw err;
      getPass_cat.exec(function(err,data1){
      res.render('edit_details', { title: 'edit details',loginUser:loginUser,reco:data1,records:data,msg:'',errmsg:''});
    });
    });
   
  });
  router.post('/edit/:id', checkloginUser,function(req, res, next) {
    var loginUser=localStorage.getItem('loginuser');
    var id=req.params.id;
    var new_cat=req.body.password_cat;
    var new_pronamet=req.body.project_name;
    var new_details=req.body.password_details;
    passModel.findByIdAndUpdate(id,{cat_name:new_cat,pro_name:new_pronamet,pass_detail:new_details}).exec(function(err,doc){
   var getpass_details= passModel.findById({_id:id})
   getpass_details.exec((err,data)=>{
      if(err) throw err;
      getPass_cat.exec(function(err,data1){
      res.render('edit_details', { title: 'edit details',loginUser:loginUser,reco:data1,records:data,msg:'data updated successfully!',errmsg:''});
    });
    });
  });
   
  });
  router.get('/delete/:id', checkloginUser,function(req, res, next) {
    var loginUser=localStorage.getItem('loginuser');
    var id=req.params.id;
   var getpass_delete= passModel.findByIdAndDelete(id)
   getpass_delete.exec((err)=>{
      if(err) throw err;
     
      res.redirect('/allpassword');
    });
   
   
  });
  module.exports = router;