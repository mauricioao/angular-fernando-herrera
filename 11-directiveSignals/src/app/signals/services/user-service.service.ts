import { Injectable, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { SingleUserResponse, User } from '../interfaces/user-request.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor() { }

  private http = inject( HttpClient );

  private baseUrl = 'https://reqres.in/api/users/';

  getUserById( id: number ): Observable<User> {
    return this.http.get<SingleUserResponse>(`${this.baseUrl}${id}`)
      .pipe(
        map( reponse => reponse.data ),
        tap( console.log ),
      )
  }
}
