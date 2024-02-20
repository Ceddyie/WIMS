import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../entities/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private basUrl = 'http://localhost:8080/warehouse';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this.http.get(`${this.basUrl}/getProducts`);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`${this.basUrl}/deleteProduct/${productId}`)
  }

  addProduct(product: Product) {
    return this.http.post('${this.basUrl}/addProduct', product);
  }
}
