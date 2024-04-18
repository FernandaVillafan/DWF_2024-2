import { Injectable } from '@angular/core';
import { Category } from '../_model/category/category';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api_dwb_uri } from '../../../shared/uri/api-dwb-uri';
import { ApiResponse } from '../../commons/_dto/api-response';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  private source = "/category";

  constructor(
    private http: HttpClient
  ) { }

  getCategories(): Observable<HttpResponse<Category[]>> {
    return this.http.get<Category[]>(api_dwb_uri + this.source, { observe: 'response' });
  }

  createCategory(category: any): Observable<HttpResponse<ApiResponse>> {
    return this.http.post<ApiResponse>(api_dwb_uri + this.source, category, { observe: 'response' });
  }

  getCategory(id_category: number): Observable<HttpResponse<Category>> {
    return this.http.get<Category>(api_dwb_uri + this.source + "/" + id_category, { observe: 'response' });
  }

  updateCategory(category: any, id_category: number): Observable<HttpResponse<ApiResponse>> {
    return this.http.put<ApiResponse>(api_dwb_uri + this.source + "/" + id_category, category, { observe: 'response' });
  }

  getActiveCategories(): Observable<HttpResponse<Category[]>> {
    return this.http.get<Category[]>(api_dwb_uri + this.source + "/active", { observe: 'response' });
  }

  disableCategory(id_category: number): Observable<HttpResponse<ApiResponse>> {
    return this.http.delete<ApiResponse>(api_dwb_uri + this.source + "/" + id_category, { observe: 'response' });
  }

  enableCategory(id_category: number): Observable<HttpResponse<ApiResponse>> {
    return this.http.put<ApiResponse>(api_dwb_uri + this.source + "/" + id_category + "/activate", null, { observe: 'response' });
  }
}