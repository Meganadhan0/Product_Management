import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl="http://localhost:8080/api/products";
  constructor(private httpClient:HttpClient) { }

  createProduct(newProduct:Product):Observable<Product>{
    return this.httpClient.post<Product>(this.apiUrl,newProduct);
  }
  getAllProduct():Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.apiUrl);
  }
  updateProduct(productId:number, updatedProduct:Product):Observable<Product>{
    return this.httpClient.put<Product>(this.apiUrl+'/'+productId, updatedProduct)
  }
  deleteProduct(productId:number){
    return this.httpClient.delete(this.apiUrl+'/'+productId);
  }
}
