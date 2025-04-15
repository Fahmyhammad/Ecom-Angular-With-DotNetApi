import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagnation',
  standalone: false,
  templateUrl: './pagnation.component.html',
  styleUrl: './pagnation.component.scss'
})
export class PagnationComponent {
@Input()PageSize:number
@Input()TotalCount:number
@Output()ChangePage =new EventEmitter()
OnChangePage(ev:any){
  this.ChangePage.emit(ev)
}
}
