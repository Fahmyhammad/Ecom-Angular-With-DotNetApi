import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShopService } from './shop.service';
import { IPagnation } from '../shared/Models/Pagnation';
import { IProduct } from '../shared/Models/Product';
import { ICategort } from '../shared/Models/Category';
import { ProductParam } from '../shared/Models/ProductParam';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shop',
  standalone: false,
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  constructor(private shopService: ShopService,private _toast:ToastrService) {}

  product: IProduct[];
  category: ICategort[];
  TotalCount:number
  ProductParam= new ProductParam();
  ngOnInit(): void {
    this.ProductParam.sortSelected = this.SortingOption[0].value;
    this.getAllProduct();
    this.getCategory();
  }

  // Grt Product
  getAllProduct() {
    this.shopService
      .getProduct(this.ProductParam)
      .subscribe({
        next: (valu: IPagnation) => {
          this.product = valu.daTa;
          this.TotalCount=valu.totalCount
          this.ProductParam.PageNumber=valu.pageNumber
          this.ProductParam.PageSize=valu.pageSize
          this._toast.success("product Loaded Successfully","SUCCESS")
        },
      });
  }
  OnChangePage(event:any){
    this.ProductParam.PageNumber = event
    this.getAllProduct()
  }

  //Get Category
  getCategory() {
    this.shopService.getCategoty().subscribe({
      next: (value) => {
        this.category = value;
      },
    });
  }

  SeletedId(categoryId: number) {
    this.ProductParam.CategoryId = categoryId;
    this.getAllProduct();
  }
  // Sorting by Price
  SortingOption = [
    { name: 'Price', value: 'Name' },
    { name: 'Price:min-max', value: 'PriceAce' },
    { name: 'Price:max-min', value: 'PriceDce' },
  ];
  SortByPrice(sort: Event) {
    this.ProductParam.sortSelected = (sort.target as HTMLInputElement).value;
    this.getAllProduct();
  }

  // filtering by word

  OnSearch(Search: string) {
    this.ProductParam.search = Search;
    this.getAllProduct();
  }

  @ViewChild('search') searchInput: ElementRef;
  @ViewChild('SortSelected') selected: ElementRef;

  ResetValue() {
    this.ProductParam.search = '';
    this.ProductParam.CategoryId = 0;

    this.searchInput.nativeElement.value = '';

    this.selected.nativeElement.selectedIndex = 0;

    this.getAllProduct();
  }
}
