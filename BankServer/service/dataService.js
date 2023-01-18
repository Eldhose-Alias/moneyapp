// import db.js

const db = require("./db")

// importing jsonwebtoken

const jwt = require('jsonwebtoken')


// register function using mongodb

register = (acno , uname , psw) => {

  return db.User.findOne({acno}).then(user=>{
      if(user){
        return {
          statusCode:401,
          status:false,
          message:"User Already Exist"
        }
      }
      else{
        const newuser = new db.User({ acno ,
          username:uname ,
          password:psw ,
          balance:0 ,
          transaction: [] })

          newuser.save()
          return {
            statusCode:200,
            status:true,
            message:"Registration Success"
          }
      }
  })
  }

  // login function using mongodb

  
  login = (acno,psw)=> {

   return db.User.findOne({acno , password:psw}).then(user =>{
    if(user){

      const token =jwt.sign({currentAcno:acno},'secretkey123' )

      return {
        statusCode:200,
        status:true,
        message:"Login Success" ,
        currentAcno: acno ,
        currentUser: user.username ,
        token
      }
     }

     else{
      return {
        statusCode:401,
        status:false,
        message:"Incorrect Account no: or Password"
      }
     }
   })
  }

// deposit function using mongodb

deposit = (acno,password,amount) => {
  var amnt=parseInt(amount)

  return db.User.findOne({acno , password}).then(user => {
    if(user){
      user.balance += amnt
      user.transaction.push({type:'CREDIT',amount:amnt})
      user.save()
      return {
        statusCode:200,
        status:true,
        message: `${user.balance}`
      }
    }
    else{
      return {
        statusCode:401,
        status:false,
        message: "Incorrect acno or Password"
    }
    }
  })
}

// withdraw function using mongodb
withdraw = (acno,password,amount)=> {
  var amnt=parseInt(amount)
  return db.User.findOne({acno , password}).then(user =>{
    if(user){
      if(amount>user.balance){
        return{
          statusCode:401,
          status:false,
          message:"insufficient balance"
        }
      }
    else{
    user.balance -= amnt
    user.transaction.push({type:'DEBIT',amount:amnt})
    user.save()
    return {
      statusCode:200,
      status:true,
      message: user.balance
    }
  }
}
  else{
    return{
      statusCode:401,
      status:false,
      message:'incorrect acno or password'
    }
    }
  })
}

  // trasaction histroy in mongodb
  gettransaction = (acno)=> {
    return db.User.findOne({acno}).then(user =>{
      if(user){
        return{
          statusCode:200,
          status:true,
          message: user.transaction
        }
      }
      else{
        return{
          statusCode:401,
          status:false,
          message:'incorrect acno'
          }
      }
  })
  }

  acdelete = (acno)=>{
    return db.User.deleteOne({acno}).then(user=>{
      if(user){
        return {
          statusCode:200,
          status:true,
          message: "account delete"
        }
      }
      else{
        return{
          statusCode:401,
          status:false,
          message:'incorrect acno'
          }
      }
    })
  }

  // exporting contents

  module.exports = {
    register ,
    login ,
    deposit ,
    withdraw ,
    gettransaction ,
    acdelete
  }