import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'shop', loadChildren : ()=> import('./shop/shop.module')
    .then(x=>x.ShopModule)
  },
  {path:'basket', loadChildren : ()=> import('./basket/basket.module')
    .then(x=>x.BasketModule)
  },
  {path:'checkout', loadChildren : ()=> import('./checkout/checkout.module')
    .then(x=>x.CheckoutModule)
  },
  {path:'**',redirectTo:'',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
