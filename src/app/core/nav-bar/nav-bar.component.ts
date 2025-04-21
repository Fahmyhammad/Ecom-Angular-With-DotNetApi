import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../basket/basket.service';
import { Observable } from 'rxjs';
import { IBasket } from '../../shared/Models/Basket';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {
  constructor(private _service:BasketService){}
  count:Observable<IBasket>
  ngOnInit(): void {
    const basketId = localStorage.getItem('basketId')
     this._service.GetBasket(basketId).subscribe({
      next:(value) =>{
        console.log(value);
        this.count= this._service.basket
      },
      error(err){
        console.log(err);
      }
     })
  }
 visibale:boolean=false
  ToggleDropDown(){
this.visibale=!this.visibale
  }
}
