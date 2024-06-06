import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map, catchError, of, delay } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { Cachestore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = "https://restcountries.com/v3.1";
  public cacheStore: Cachestore = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  }

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage()
  }

  private saveToLocalStorage(): void{
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage(): void{
    if(!localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  private getCountriesRequest(url: string): Observable<Country[]>{
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(()=>of([])),
        delay(2000)
      )
  }

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
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries=> this.cacheStore.byCapital = {term, countries}),
        tap( () => this.saveToLocalStorage() )
      )
    // return this.http.get<Country[]>( url )

    // return this.http.get<Country[]>( url )
    //   .pipe(
    //     //tap es para efectos secundarios
    //     // tap(countries => console.log('Paso por el tap', countries)),
    //     //map es para transformar a la respuesta antes de su lectura
    //     // map(countries=>[]),
    //     // tap(countries => console.log('Paso por el tap', countries))
    //     catchError(error=> {
    //       console.log(error);
    //       // of se usa para mockear un observable con el dato que le proporciones
    //       return of([])
    //     })
    //   );
  }

  searchCountry(term: string): Observable<Country[]>{
    const url = `${this.apiUrl}/name/${term}`
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries=> this.cacheStore.byCountry = {term, countries}),
        tap( () => this.saveToLocalStorage() )
      )
    // return this.http.get<Country[]>( url )
    //   .pipe(
    //     //tap es para efectos secundarios
    //     // tap(countries => console.log('Paso por el tap', countries)),
    //     //map es para transformar a la respuesta antes de su lectura
    //     // map(countries=>[]),
    //     // tap(countries => console.log('Paso por el tap', countries))
    //     catchError(error=> {
    //       console.log(error);
    //       // of se usa para mockear un observable con el dato que le proporciones
    //       return of([])
    //     })
    //   );
  }

  searchRegion(region: Region): Observable<Country[]>{
    const url = `${this.apiUrl}/region/${region}`
    return this.getCountriesRequest(url)
    .pipe(
      tap(countries=> this.cacheStore.byRegion = {region, countries}),
      tap( () => this.saveToLocalStorage() )
    )
    // return this.http.get<Country[]>( url )
    //   .pipe(
    //     //tap es para efectos secundarios
    //     // tap(countries => console.log('Paso por el tap', countries)),
    //     //map es para transformar a la respuesta antes de su lectura
    //     // map(countries=>[]),
    //     // tap(countries => console.log('Paso por el tap', countries))
    //     catchError(error=> {
    //       console.log(error);
    //       // of se usa para mockear un observable con el dato que le proporciones
    //       return of([])
    //     })
    //   );
  }

  // saveRegionToStore(region: Region) {
  //   this.cacheStore.byRegion.region = region;
  // }

  // saveCountriesRegionToStore(countries: Country[]) {
  //   this.cacheStore.byRegion.countries = countries;
  // }

}
