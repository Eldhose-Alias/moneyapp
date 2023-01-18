import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-deleteconfirm',
  templateUrl: './deleteconfirm.component.html',
  styleUrls: ['./deleteconfirm.component.css']
})
export class DeleteconfirmComponent {


  // parent nn child lek povan - @Input
  @Input() item:String|undefined

   // event creation

  //evnet emitter  : event ne create cheyunath  :event ne oru object ayit create cheynam
  //child nn parent lek povan - @Output
  @Output() onCancel = new EventEmitter()
  // event creation
  @Output() onDelete = new EventEmitter()

  constructor(){ }


// onCancel object ne call chryane cancel() nte ulilu
  cancel(){

     //  event start cheyan vendi kodukunna method anu emit
    this.onCancel.emit()

  }

delete(){

 this.onDelete.emit(this.item)
}
  
}