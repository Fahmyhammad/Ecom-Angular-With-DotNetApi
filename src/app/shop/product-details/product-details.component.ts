import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { IProduct } from '../../shared/Models/Product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
   constructor(private shopService:ShopService,private route:ActivatedRoute){}

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

}

