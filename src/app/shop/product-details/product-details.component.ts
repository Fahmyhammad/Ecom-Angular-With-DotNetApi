import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { IProduct } from '../../shared/Models/Product';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
   constructor(private shopService:ShopService,private route:ActivatedRoute,
    private tost:ToastrService,
    private _basketService:BasketService
   ){}
   quantity:number = 1
   poduct:IProduct
   mainImage:string;

   ngOnInit(): void {
    this.loadProduct()
    }
   loadProduct(){
    this.shopService.getproductDetails(parseInt(this.route.snapshot.paramMap.get('id')))
    .subscribe({
      next:((value:IProduct)=>{
        this.poduct=value
        this.mainImage = this.poduct.photos[0].imageName
      })
    }) 
  }
  ReplaceImage(src:string){
    this.mainImage = src
  }
  incrementBasket(){
    if(this.quantity < 10){
      this.quantity++;
      this.tost.success("item has been added to the basket","SUCCESS")
    }else{
      this.tost.warning("you Can't add more than 10 items","Enough")
    }
  }
  DecrementBasket(){
    if(this.quantity > 1){
      this.quantity--;
      this.tost.warning("item has been Decrement","SUCCESS")
    }else{
      this.tost.error("you Can't Decrement more than 1 items","ERROR")
    }
  }
  AddToBasket(){
    this._basketService.addItemToBasket(this.poduct,this.quantity)
  }
  calucateDiscount(oldPrice:number,newPrice):number{
    return parseFloat(
      Math.round(((oldPrice-newPrice)/oldPrice)*100).toFixed(1)
    )
  }
}

