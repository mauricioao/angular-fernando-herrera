import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map, catchError, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = "https://restcountries.com/v3.1";

  constructor(private http: HttpClient) { }

  searchCountryByAlphaCode(code: string): Observable<Country | null>{
    const url = `${this.apiUrl}/alpha/${code}`
    return this.http.get<Country[]>( url )
      .pipe(
        map( countries => countries.length > 0 ? countries[0] : null),
        catchError(()=> of(null))
      );
  }

  searchCapital(term: string): Observable<Country[]>{
    const url = `${this.apiUrl}/capital/${term}`
    return this.http.get<Country[]>( url )
      .pipe(
        //tap es para efectos secundarios
        // tap(countries => console.log('Paso por el tap', countries)),
        //map es para transformar a la respuesta antes de su lectura
        // map(countries=>[]),
        // tap(countries => console.log('Paso por el tap', countries))
        catchError(error=> {
          console.log(error);
          // of se usa para mockear un observable con el dato que le proporciones
          return of([])
        })
      );
  }

  searchCountry(term: string): Observable<Country[]>{
    const url = `${this.apiUrl}/name/${term}`
    return this.http.get<Country[]>( url )
      .pipe(
        //tap es para efectos secundarios
        // tap(countries => console.log('Paso por el tap', countries)),
        //map es para transformar a la respuesta antes de su lectura
        // map(countries=>[]),
        // tap(countries => console.log('Paso por el tap', countries))
        catchError(error=> {
          console.log(error);
          // of se usa para mockear un observable con el dato que le proporciones
          return of([])
        })
      );
  }

  searchRegion(term: string): Observable<Country[]>{
    const url = `${this.apiUrl}/region/${term}`
    return this.http.get<Country[]>( url )
      .pipe(
        //tap es para efectos secundarios
        // tap(countries => console.log('Paso por el tap', countries)),
        //map es para transformar a la respuesta antes de su lectura
        // map(countries=>[]),
        // tap(countries => console.log('Paso por el tap', countries))
        catchError(error=> {
          console.log(error);
          // of se usa para mockear un observable con el dato que le proporciones
          return of([])
        })
      );
  }

}
