import { Injectable, Inject } from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    // @ts-ignore
    @Inject('apiUrl') private apiUrl,
    private http: HttpClient
  ) { }

  getAllTodos(){
    return  this.http.get(this.apiUrl);
  }
}
