import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// global overloading in header

const option = {
   headers:new HttpHeaders()
}


@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(private http : HttpClient) { 

  }


      // to get token 
  gettoken(){

    const token = JSON.parse(localStorage.getItem('token') || ' ')
    
    let headers = new HttpHeaders()
    
    if(token){
    option.headers = headers.append('access-token' , token)
    }
    return option

  }

        // register
  register(acno:any,uname:any,psw:any) {

    const date = {
      acno , uname , psw 
    }
    return this.http.post('http://localhost:3000/register' , date)
    
  }
          // login
  login(acno:any,psw:any){

    const date = {
      acno , psw 
    }
    return this.http.post('http://localhost:3000/login' , date)
     
    }

  deposit(acno:any,password:any,amount:any){

    const date = {
      acno , password ,amount 
    }
    return this.http.post('http://localhost:3000/deposit' , date , this.gettoken())
     
    }
  

  withdraw(acno:any,password:any,amount:any){


 const date = {
      acno , password ,amount 
    }
    return this.http.post('http://localhost:3000/withdraw' , date , this.gettoken())
     
    }
   
  gettransaction(acno:any){

    const date = {
      acno
    }
    return this.http.post('http://localhost:3000/transaction' , date , this.gettoken())
     
    }

  deleteacc(acno:any){

    return this.http.delete('http://localhost:3000/deleteacc/'+acno , this.gettoken())

  }

  }



