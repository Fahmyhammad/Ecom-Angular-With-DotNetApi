import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Basket, IBasket, IBasketItem, IBasketTotal } from '../shared/Models/Basket';
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
  private basketSourceTotal = new BehaviorSubject<IBasketTotal>(null);
  basketTotal$=this.basketSourceTotal.asObservable();


  clacualteTotal(){
    const basket = this.GetCurrentValue();
    const shipping=0;
    const subtotal = basket.basketItems.reduce((a,c)=>{
      return (c.price*c.quantity)+a
    },0)
    const total = shipping+subtotal;
    this.basketSourceTotal.next({shipping,subtotal,total})
  }


  GetBasket(id:string){
    return this.http.get(this.BaseURL+"Basket/get-basket-item/"+id).pipe(
      map((value:IBasket)=>{
        this.basketSource.next(value)
        this.clacualteTotal()
        return value;
      })
    )
  }
  SetBasket(basket:IBasket){
    return this.http.post(this.BaseURL+"Basket/update-basket",basket).subscribe({
      next:(value:IBasket)=>{
        this.basketSource.next(value);
        this.clacualteTotal()
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
  
  incrementBasketItemQuantity(item:IBasketItem){
    const basket=this.GetCurrentValue();
    const itemIndex=basket.basketItems.findIndex(x=>x.id===item.id);
    basket.basketItems[itemIndex].quantity++;
    this.SetBasket(basket);
  }
  DecrementBasketItemQuantity(item:IBasketItem){
    const basket=this.GetCurrentValue();
    const itemIndex=basket.basketItems.findIndex(x=>x.id===item.id);
   if( basket.basketItems[itemIndex].quantity > 1){
    basket.basketItems[itemIndex].quantity--;
    this.SetBasket(basket);
   }else{

    this.removeItemFromBasket(item);

   }
  }
  removeItemFromBasket(item: IBasketItem) {
    const basket=this.GetCurrentValue();
     if(basket.basketItems.some(i=>i.id === item.id)){
      basket.basketItems=basket.basketItems.filter(x=>x.id !== item.id);
      if(basket.basketItems.length>0){
        this.SetBasket(basket);
      }else{
        this.DeleteBasketItem(basket);
      }
     }
  }
  DeleteBasketItem(basket: IBasket) {
    return this.http.delete(this.BaseURL+"Basket/delete-basket-item/"+basket.id)
    .subscribe({
      next:(value)=>{
        this.basketSource.next(null);
        localStorage.removeItem('basketId');
      },
      error(err){
        console.log(err);
      }
    })
  }
  
  
  

}
