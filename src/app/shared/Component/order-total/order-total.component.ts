import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../../basket/basket.service';
import { IBasketTotal } from '../../Models/Basket';

@Component({
  selector: 'app-order-total',
  standalone: false,
  templateUrl: './order-total.component.html',
  styleUrl: './order-total.component.scss'
})
export class OrderTotalComponent implements OnInit {
 constructor(private _service:BasketService){}
   basketTotal:IBasketTotal
  ngOnInit(): void {
    this._service.basketTotal$.subscribe({
      next:(value)=>{
        this.basketTotal = value;
      },
      error(err){
        console.log(err);
      }
    })
  }

}
