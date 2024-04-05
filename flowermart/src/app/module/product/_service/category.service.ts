import { Injectable } from '@angular/core';
import { Category } from '../_model/category/category';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api_dwb_uri } from '../../../shared/uri/api-dwb-uri';

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

  createCategory(category: any): Observable<HttpResponse<any>> {
    return this.http.post(api_dwb_uri + this.source, category, { observe: 'response' });
  }

  getCategory(id_category: number): Observable<HttpResponse<Category>> {
    return this.http.get<Category>(api_dwb_uri + this.source + "/" + id_category, { observe: 'response' });
  }

  updateCategory(id_category: number): Observable<any> {
    return this.http.put(api_dwb_uri + this.source + "/" + id_category, { observe: 'response' });
  }

  deleteCategory(id_category: number): Observable<any> {
    return this.http.delete(api_dwb_uri + this.source + "/" + id_category, { observe: 'response' });
  }

  activeCategory(id_category: number): Observable<any> {
    return this.http.put(api_dwb_uri + this.source + "/" + id_category + "/activate", { observe: 'response' });
  }

  getActiveCategories(): Observable<HttpResponse<Category[]>> {
    return this.http.get<Category[]>(api_dwb_uri + this.source + "/active", { observe: 'response' });
  }
}