import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.prod";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private _baseUrl = environment.base_url;

  constructor(private http: HttpClient) { }

  public getNews(type: boolean): Observable<any>{
    return this.http.get<any>(`${this._baseUrl}/news/${type}`);
  }

  public archivedNews(id: string): Observable<any>{
    let data = {
      id : id,
      archiveDate: new Date()
    }
    return this.http.patch<any>(`${this._baseUrl}/news/`, data);
  }

  public deleteNews(id: string): Observable<any>{
    return this.http.delete<any>(`${this._baseUrl}/news/${id}`);
  }
}
