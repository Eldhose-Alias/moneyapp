import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {

  acno:any
  transaction:any

  constructor(private ds:DataService){ 

   this.acno= JSON.parse(localStorage.getItem('currentacno') || " ")

   this.ds.gettransaction(this.acno).subscribe((result :any)=>{
    this.transaction = result.message
  } ,
  (result :any)=>{
    alert(result.error.message)
  })

  }



}
