import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../shared/Models/Product';
import { IPagnation } from '../shared/Models/Pagnation';
import { ICategort } from '../shared/Models/Category';
import { ProductParam } from '../shared/Models/ProductParam';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) {}

  baseURL = 'https://localhost:44314/api/';
  Product: IProduct[];

  getProduct(ProductParam:ProductParam) {
    let Param=new HttpParams;
    if(ProductParam.CategoryId){
      Param=Param.append("categoryId",ProductParam.CategoryId)
    }
    if(ProductParam.sortSelected){
      Param=Param.append("Sort",ProductParam.sortSelected)
    }
    if(ProductParam.search){
      Param=Param.append("Search",ProductParam.search)
    }
    Param=Param.append("PageNumber",ProductParam.PageNumber)
    Param=Param.append("PageSize",ProductParam.PageSize)

    return this.http.get<IPagnation>(this.baseURL+"Products/get-all",{params:Param});
  }
  getCategoty() {
    return this.http.get<ICategort[]>(this.baseURL+"Categories/get-all");
  }
 

}
