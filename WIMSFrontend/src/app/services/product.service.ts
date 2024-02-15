import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private basUrl = 'http://localhost:8080/warehouse/getProducts';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this.http.get(this.basUrl);
  }
}
