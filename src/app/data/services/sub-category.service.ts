import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_CONSTANTES} from "../../core/constants/API_CONSTANTES";
import {Observable} from "rxjs";
import {Role} from "../models/role";
import {RequestMeta} from "../models/request-meta";

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  private readonly uri = API_CONSTANTES.URI_SUB_CATEGORIES;

  constructor(private http: HttpClient) {}

  getAll(page: number, per_page: number) : Observable<any> {
    return this.http.get(this.uri, {
      params: {
        page: page.toString(),
        per_page: per_page.toString()
      }
    });
  }

  getOne(id: string) : Observable<any>{
    return this.http.get(this.uri + "/" + id );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.uri + "/" + id);
  }

  create(user: any): Observable<any> {
    return this.http.post(this.uri, user);
  }

  search(search: String): Observable<any> {
    return this.http.get(this.uri + "/search/" + search);
  }

  update(id: number, user: any): Observable<any> {
    return this.http.patch(this.uri + "/" + id, user);
  }

  call(meta: RequestMeta): Observable<any> {
    return this.http.get(meta.path!, {
      params: {
        page: meta.current_page.toString(),
        per_page: meta.per_page.toString()
      }
    });

  }



}
