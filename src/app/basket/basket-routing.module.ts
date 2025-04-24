import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './basket/basket.component';
import { ProductDetailsComponent } from '../shop/product-details/product-details.component';

const routes: Routes = [
  {path:'',component:BasketComponent},
  {path:'product-details/:id',component:ProductDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasketRoutingModule { }
