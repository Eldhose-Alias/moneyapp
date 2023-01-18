// import cors 
const cors = require('cors')

// import dataService folder
const dataService = require('./service/dataService')

// import json web token
const jwt = require('jsonwebtoken')

// impoting express
const express = require('express')
const { json } = require('express')

// create app
const app = express()

// connect frontend 
app.use(cors({origin :'http://localhost:4200'}))

// to covert jsons datas
app.use(express.json())

// creating middlewares for verify token
const jwtmiddleware = (req , res , next)=> {
  console.log("....router specefic middleware....");
  // runtym error checking 
  try{
    const token = req.headers['access-token']
    const data = jwt.verify(token , "secretkey123")
    console.log(data);
    next()
  }
  catch{
    res.status(422).json({
      statusCode :422 ,
      staus :false ,
      message :"please login first"
    })
  }
}

// 2.POST    register         request   responce
app.post('/register' , (req , res)=>{

   dataService.register(req.body.acno , req.body.uname , req.body.psw).then(result=>{
    res.status(result.statusCode).json(result)
  })
   
   })

//    login

app.post('/login' , (req , res)=>{

    dataService.login(req.body.acno , req.body.psw).then(result =>{
      res.status(result.statusCode).json(result)
    })
     
     })
  

    //  deposit           calling middleware 
    app.post('/deposit' , jwtmiddleware , (req , res)=>{

        dataService.deposit(req.body.acno , req.body.password , req.body.amount).then(result =>{
          res.status(result.statusCode).json(result)
        })
         
         })

        //  withdraw
    app.post('/withdraw' ,jwtmiddleware , (req , res)=>{

        dataService.withdraw(req.body.acno , req.body.password , req.body.amount).then(result =>{
          res.status(result.statusCode).json(result)
         })
             })

            //  transaction histroy
    app.post('/transaction' ,jwtmiddleware , (req , res)=>{

         dataService.gettransaction(req.body.acno).then(result =>{
          res.status(result.statusCode).json(result)
         })

           })

            // delete
    app.delete('/deleteacc/:acno' , jwtmiddleware , (req,res)=>{
      // body de ullilu kodukan pattilla ayin pagaram 'params' kodukum
      dataService.acdelete(req.params.acno).then(result=>{
        res.status(result.statusCode).json(result)
      })
    })

// set port
app.listen(3000,()=>{
    console.log("server started at port number 3000");
})