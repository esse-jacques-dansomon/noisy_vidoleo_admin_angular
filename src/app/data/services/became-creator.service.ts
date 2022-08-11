import { Injectable } from '@angular/core';
import {API_CONSTANTES} from "../../core/constants/API_CONSTANTES";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RequestMeta} from "../models/request-meta";
import {PaginationService} from "./pagination.service";

@Injectable({
  providedIn: 'root'
})
export class BecameCreatorService {

  private readonly uri = API_CONSTANTES.URI_BECAME_CREATOR;

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

  search(search: string): Observable<any> {
    return this.http.get(this.uri + "/search/" + search);
  }

  update(id: number, user: any): Observable<any> {
    return this.http.patch(this.uri + "/" + id, user);
  }

  status(status: string) :Observable<any>{
    return this.http.get(this.uri + "/status/" + status);
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
