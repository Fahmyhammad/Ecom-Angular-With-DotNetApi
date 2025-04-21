import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Basket, IBasket, IBasketItem } from '../shared/Models/Basket';
import { error } from 'console';
import { IProduct } from '../shared/Models/Product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private http:HttpClient) { }
  BaseURL = 'https://localhost:44314/api/';
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket = this.basketSource.asObservable();

  
  GetBasket(id:string){
    return this.http.get(this.BaseURL+"Basket/get-basket-item/"+id).pipe(
      map((value:IBasket)=>{
        this.basketSource.next(value)
        return value;
      })
    )
  }
  SetBasket(basket:IBasket){
    return this.http.post(this.BaseURL+"Basket/update-basket",basket).subscribe({
      next:(value:IBasket)=>{
        this.basketSource.next(value);
      },
      error(err){
        console.log(err);
      },
    })
  }
  
  GetCurrentValue(){
    return this.basketSource.value;
  }

  addItemToBasket(product:IProduct,quantity:number=1){
    const itemToAdd:IBasketItem=this.MapProcuctToBasketItem(product,quantity);
    let basket = this.GetCurrentValue()?? this.CreateBasket();
    if(basket.id == null){
      basket = this.CreateBasket(); 
    }
    basket.basketItems = this.AddOrUpade(basket.basketItems,itemToAdd,quantity)
    return this.SetBasket(basket);
  }
   private AddOrUpade(basketItems: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    const index = basketItems.findIndex(i=>i.id === itemToAdd.id);
    if(index == -1){
      itemToAdd.quantity = quantity;
      basketItems.push(itemToAdd);
    }else{
      basketItems[index].quantity+=quantity;
    }
    return basketItems
  }
  private CreateBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basketId',basket.id)
    return basket;
  }
  private MapProcuctToBasketItem(product: IProduct, quantity: number): IBasketItem {
    return {
      id: product.id,
      category: product.categoryName,
      image: product.photos.length > 0 ? product.photos[0].imageName : 'default.jpg',
      name: product.name,
      price: product.newPrice,
      quantity: quantity,
      description:product.description
    };
  }
  
  

}
