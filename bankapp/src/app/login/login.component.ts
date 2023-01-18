import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  aim="Your Perfect Banking partner"
  data="Account number"
  // acno=''
  // password=''
  userDetails:any={
    1000:{acnumber:1000,username:"anna",password:123,balance:0},
    1001:{acnumber:1001,username:"anu",password:1234,balance:0},
    1002:{acnumber:1002,username:"manu",password:1235,balance:0},
    1003:{acnumber:1003,username:"arun",password:1236,balance:0}
  }

  constructor(private router:Router ,private ds:DataService ,private fb:FormBuilder){
  
  }

  loginForm=this.fb.group({acno:['',[Validators.required ,Validators.pattern('[0-9]+')]],
                          password:['',[Validators.required ,Validators.pattern('[a-zA-Z0-9]+')]]
                        })

  login(){
   var acno=this.loginForm.value.acno
   var psw=this.loginForm.value.password
   if(this.loginForm.valid){

    this.ds.login(acno,psw).subscribe((result :any)=>{

      localStorage.setItem('currentacno' , JSON.stringify(result.currentAcno))
      localStorage.setItem('currentuser',JSON.stringify(result.currentUser))
      localStorage.setItem('token' , JSON.stringify(result.token))

      alert(result.message)
      this.router.navigateByUrl('dashborad')
    } ,
    result =>{
      alert(result.error.message)
    }
    )
    
    }
    else{
      alert('incorrect username or password')
    }
 
}

   }
   

