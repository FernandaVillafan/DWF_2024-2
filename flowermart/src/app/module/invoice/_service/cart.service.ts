import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../commons/_dto/api-response';
import { api_dwb_uri } from '../../../shared/uri/api-dwb-uri';
import { DtoCartDetails } from '../_dto/dto-cart-details';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  private source = "/cart";

  constructor(
    private http: HttpClient
  ) { }

  getCart(): Observable<HttpResponse<DtoCartDetails[]>> {
    return this.http.get<DtoCartDetails[]>(api_dwb_uri + this.source, { observe: 'response' });
  }

  addToCart(cart: any): Observable<HttpResponse<ApiResponse>> {
    return this.http.post<ApiResponse>(api_dwb_uri + this.source, cart, { observe: 'response' });
  }

  deleteCart(): Observable<HttpResponse<ApiResponse>> {
    return this.http.delete<ApiResponse>(api_dwb_uri + this.source + "/clear", { observe: 'response' });
  }

  removeFromCart(id_product: number): Observable<HttpResponse<ApiResponse>> {
    return this.http.delete<ApiResponse>(api_dwb_uri + this.source + "/" + id_product, { observe: 'response' });
  }
}