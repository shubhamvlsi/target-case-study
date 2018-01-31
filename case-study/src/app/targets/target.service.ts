import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
@Injectable()
export class TargetService {

  constructor(private http: Http) { }

  public getBookDetails(): Observable<any> {
    return this.http.get('../assets/targets-info.json')
    .map((response: any) => {
      return response.json();
    });
  }

}
