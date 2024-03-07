import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../entities/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private basUrl = 'http://localhost:8083/warehouse';

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

  getAllOrders(): Observable<any> {
    return this.http.get(`${this.basUrl}/getOrders`);
  }

  shipOrder(orderId: number): Observable<any> {
    return this.http.put(`${this.basUrl}/setShipped/${orderId}`, orderId)
  }
}
